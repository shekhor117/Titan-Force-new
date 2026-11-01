import { useState, useEffect } from 'react';
import { Match } from '../data/clubData';

export interface CountdownResult {
  days: number;
  hours: number;
  mins: number;
  secs: number;
  totalMs: number;
  isPast: boolean;
  isLive: boolean;
  formattedTarget: string;
}

/**
 * Parses match date (YYYY-MM-DD) and time (e.g. "16:00 BST", "17:30 BST", "19:00")
 * into a Date object representing the kickoff time in Bangladesh Standard Time (UTC+6).
 */
export function parseMatchKickoff(match: Pick<Match, 'date' | 'time'>): Date {
  if (!match || !match.date) {
    return new Date();
  }

  const dateParts = match.date.split('-');
  if (dateParts.length !== 3) {
    const parsed = new Date(match.date);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);

  let hours = 16; // default 4 PM
  let mins = 0;

  if (match.time) {
    const timeMatch = match.time.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      hours = parseInt(timeMatch[1], 10);
      mins = parseInt(timeMatch[2], 10);

      // Handle 12-hour format if AM/PM is present
      if (/pm/i.test(match.time) && hours < 12) {
        hours += 12;
      } else if (/am/i.test(match.time) && hours === 12) {
        hours = 0;
      }
    }
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  // BST is Bangladesh Standard Time (UTC+6)
  const isoWithBst = `${year}-${pad(month)}-${pad(day)}T${pad(hours)}:${pad(mins)}:00+06:00`;
  const bstDate = new Date(isoWithBst);

  if (!isNaN(bstDate.getTime())) {
    return bstDate;
  }

  // Fallback to local constructor
  return new Date(year, month - 1, day, hours, mins, 0);
}

/**
 * Calculates remaining time until target date accurately.
 */
export function calculateKickoffCountdown(target: Date | string | number): CountdownResult {
  const targetDate = target instanceof Date ? target : new Date(target);
  const targetMs = targetDate.getTime();
  const nowMs = Date.now();
  const diffMs = targetMs - nowMs;

  const isPast = diffMs <= 0;
  // Football match typically lasts around 110-120 minutes including stoppage time
  const isLive = isPast && Math.abs(diffMs) < 120 * 60 * 1000;

  const safeDiff = Math.max(0, diffMs);

  const days = Math.floor(safeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((safeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((safeDiff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    mins,
    secs,
    totalMs: safeDiff,
    isPast,
    isLive,
    formattedTarget: targetDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
}

/**
 * Returns the true next upcoming match from a list of matches.
 */
export function getNextUpcomingMatch(matches: Match[]): Match | undefined {
  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  if (upcomingMatches.length === 0) return undefined;

  const now = Date.now();
  // Find first upcoming match whose kickoff has not finished yet
  const futureMatch = upcomingMatches.find(m => {
    const kickoff = parseMatchKickoff(m);
    // Allow up to 2 hours after kickoff as still active
    return kickoff.getTime() + 120 * 60 * 1000 > now;
  });

  return futureMatch || upcomingMatches[0];
}

/**
 * React hook for live match kickoff countdown.
 * Updates accurately every second and stays in sync without timer drift.
 */
export function useMatchCountdown(match?: Match | null): CountdownResult & { kickoffDate: Date } {
  const kickoffDate = match ? parseMatchKickoff(match) : new Date(Date.now() + 15 * 86400 * 1000);

  const [countdown, setCountdown] = useState<CountdownResult>(() =>
    calculateKickoffCountdown(kickoffDate)
  );

  useEffect(() => {
    // Initial immediate calculation
    setCountdown(calculateKickoffCountdown(kickoffDate));

    const interval = setInterval(() => {
      setCountdown(calculateKickoffCountdown(kickoffDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [match?.id, match?.date, match?.time]);

  return {
    ...countdown,
    kickoffDate
  };
}
