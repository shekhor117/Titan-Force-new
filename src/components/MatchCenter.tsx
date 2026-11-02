import React, { useState } from 'react';
import { Match, MATCHES_DATA, TRANSLATIONS, MatchTimelineEvent } from '../data/clubData';
import { parseMatchKickoff, calculateKickoffCountdown } from '../utils/countdown';
import { 
  Calendar, MapPin, Trophy, Star, Users, X, Clock, ChevronRight, 
  ShieldCheck, Activity, Award, User, Flame, ArrowUpRight 
} from 'lucide-react';

interface MatchCenterProps {
  lang: 'en' | 'bn';
  onViewFullMatch?: (match: Match) => void;
}

export const MatchCenter: React.FC<MatchCenterProps> = ({ lang, onViewFullMatch }) => {
  const [activeTab, setActiveTab] = useState<'completed' | 'upcoming'>('completed');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [matchModalTab, setMatchModalTab] = useState<'timeline' | 'stats' | 'lineups' | 'recap'>('recap');

  const t = TRANSLATIONS[lang];
  const filteredMatches = MATCHES_DATA.filter(m => m.status === activeTab);

  const getEventIcon = (type: MatchTimelineEvent['type']) => {
    switch (type) {
      case 'goal': return '⚽';
      case 'save': return '🧤';
      case 'card': return '🟨';
      case 'sub': return '🔄';
      case 'whistle': return '⏱️';
      case 'chance': return '💥';
      default: return '📍';
    }
  };

  return (
    <section id="matches" className="scroll-mt-28 sm:scroll-mt-32 py-16 sm:py-20 bg-neutral-950 border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-neutral-800">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-rose-500">
              {lang === 'en' ? 'Official Matchday Hub & Broadcast' : 'অফিশিয়াল ম্যাচ সেন্টার ও ফলাফল'}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              {t.matches.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
              {t.matches.subtitle}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeTab === 'completed'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.matches.tabRecent} ({MATCHES_DATA.filter(m => m.status === 'completed').length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeTab === 'upcoming'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.matches.tabUpcoming} ({MATCHES_DATA.filter(m => m.status === 'upcoming').length})
            </button>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => {
            const isWin = match.result === 'W';
            const isLoss = match.result === 'L';
            const isDraw = match.result === 'D';

            return (
              <div
                key={match.id}
                onClick={() => {
                  if (onViewFullMatch) {
                    onViewFullMatch(match);
                  } else {
                    setSelectedMatch(match);
                    setMatchModalTab(match.editorialReport ? 'recap' : match.timeline ? 'timeline' : 'stats');
                  }
                }}
                className="group relative rounded-2xl bg-neutral-900/90 border border-neutral-800 card-interactive-glow p-5 flex flex-col justify-between cursor-pointer space-y-4"
              >
                {/* Match Header: League & Date */}
                <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-1.5 font-bold text-rose-400 uppercase">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{match.league}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono tabular-nums text-neutral-400">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{match.date}</span>
                  </div>
                </div>

                {/* Scoreboard Block */}
                <div className="py-2 space-y-3">
                  {/* Home Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center p-1">
                        <img 
                          src="/logos/titanforce-logo.svg" 
                          alt="TF" 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors">
                        {match.homeTeam}
                      </span>
                    </div>
                    {match.homeScore !== undefined ? (
                      <span className="font-display text-2xl font-black text-white tabular-nums">
                        {match.homeScore}
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-neutral-500">TBD</span>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-[11px] font-black text-neutral-400">
                        {match.awayTeam.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-sm text-neutral-300">
                        {match.awayTeam}
                      </span>
                    </div>
                    {match.awayScore !== undefined ? (
                      <span className="font-display text-2xl font-black text-neutral-300 tabular-nums">
                        {match.awayScore}
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-neutral-500">TBD</span>
                    )}
                  </div>
                </div>

                {/* Venue & Result Badge */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-neutral-400 truncate max-w-[190px]">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span className="truncate">{match.venue}</span>
                  </div>

                  {match.status === 'completed' && match.result && (
                    <div className="flex items-center gap-1.5 font-bold uppercase">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          isWin
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                            : isLoss
                            ? 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        {isWin ? 'Win' : isLoss ? 'Loss' : 'Draw'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  )}

                  {match.status === 'upcoming' && (() => {
                    const cd = calculateKickoffCountdown(parseMatchKickoff(match));
                    return (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold text-rose-400">
                          {match.time}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-950/60 text-rose-400 border border-rose-900/60">
                          {cd.isLive 
                            ? (lang === 'en' ? 'LIVE NOW' : 'লাইভ') 
                            : cd.days > 0 
                              ? (lang === 'en' ? `${cd.days}d to kickoff` : `${cd.days} দিন বাকি`)
                              : (lang === 'en' ? `${cd.hours}h ${cd.mins}m left` : `${cd.hours}ঘ ${cd.mins}মি বাকি`)}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* ULTRA-PROFESSIONAL FULL DETAILS MATCH DETAIL MODAL         */}
        {/* ========================================================= */}
        {selectedMatch && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setSelectedMatch(null)}
          >
            <div className="flex min-h-full items-center justify-center py-4">
              <div
                className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
              {/* Modal Match Header Banner */}
              <div className="relative bg-gradient-to-r from-rose-950/80 via-neutral-900 to-neutral-950 p-6 sm:p-8 border-b border-neutral-800 shrink-0">
                <div className="absolute top-5 right-5 flex items-center gap-2 z-20">
                  {onViewFullMatch && (
                    <button
                      onClick={() => {
                        const m = selectedMatch;
                        setSelectedMatch(null);
                        onViewFullMatch(m);
                      }}
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                    >
                      <span>{lang === 'en' ? 'Open Full Match Page' : 'পূর্ণ পাতা খুলুন'}</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedMatch(null)}
                    className="p-2 text-neutral-400 hover:text-white rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 transition-colors"
                    aria-label="Close Match Details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Match Tournament Stage & Logistics */}
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
                    <span className="font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                      {selectedMatch.league}
                    </span>
                    {selectedMatch.stage && (
                      <span className="text-neutral-300 font-semibold">
                        {selectedMatch.stage}
                      </span>
                    )}
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="text-neutral-400 font-mono">{selectedMatch.date}</span>
                  </div>

                  {/* Main Scoreboard Display */}
                  <div className="py-4 flex items-center justify-around text-center">
                    {/* Home Team */}
                    <div className="space-y-1 w-5/12">
                      <div className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                        {selectedMatch.homeTeam}
                      </div>
                      <div className="text-xs text-rose-400 font-semibold">
                        Mulikandi, Zakigonj
                      </div>
                    </div>

                    {/* Big Score / Kickoff Countdown Box */}
                    {selectedMatch.status === 'completed' ? (
                      <div className="px-5 py-2.5 rounded-2xl bg-neutral-950/90 border border-neutral-800 flex items-center gap-4">
                        <span className="font-display text-4xl sm:text-5xl font-black text-white tabular-nums">
                          {selectedMatch.homeScore ?? '-'}
                        </span>
                        <span className="text-xs font-bold uppercase text-neutral-500 font-mono">
                          FT
                        </span>
                        <span className="font-display text-4xl sm:text-5xl font-black text-neutral-300 tabular-nums">
                          {selectedMatch.awayScore ?? '-'}
                        </span>
                      </div>
                    ) : (() => {
                      const cd = calculateKickoffCountdown(parseMatchKickoff(selectedMatch));
                      return (
                        <div className="px-5 py-3 rounded-2xl bg-neutral-950/95 border border-neutral-800 text-center space-y-1 min-w-[130px]">
                          <span className="font-display text-3xl font-black text-rose-500">VS</span>
                          <span className="block text-[11px] font-mono text-neutral-300 font-semibold">{selectedMatch.time}</span>
                          <div className="pt-1 border-t border-neutral-800/80 text-[10px] font-mono font-bold text-rose-400">
                            {cd.isLive 
                              ? (lang === 'en' ? 'LIVE IN PLAY' : 'লাইভ খেলা চলছে') 
                              : (lang === 'en' ? `${cd.days}d ${cd.hours}h ${cd.mins}m left` : `${cd.days} দিন ${cd.hours} ঘণ্টা বাকি`)}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Away Team */}
                    <div className="space-y-1 w-5/12">
                      <div className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                        {selectedMatch.awayTeam}
                      </div>
                      <div className="text-xs text-neutral-400 font-semibold">
                        Opposition
                      </div>
                    </div>
                  </div>

                  {/* Goal Scorers Kicker */}
                  {selectedMatch.goals && selectedMatch.goals.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-300 pt-2 border-t border-neutral-800/80">
                      {selectedMatch.goals.map((g, idx) => (
                        <span key={idx} className="flex items-center gap-1.5 font-medium">
                          <span>⚽ {g.scorer}</span>
                          <span className="font-mono text-neutral-400">({g.minute}')</span>
                          {g.assist && <span className="text-neutral-500 text-[11px]">(Ast: {g.assist})</span>}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Match Facts Strip */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-neutral-400 pt-3">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      {selectedMatch.venue}
                    </span>
                    {selectedMatch.attendance && (
                      <span className="flex items-center gap-1.5 font-mono">
                        <Users className="w-3.5 h-3.5 text-neutral-500" />
                        {selectedMatch.attendance}
                      </span>
                    )}
                    {selectedMatch.referee && (
                      <span>Referee: <strong className="text-neutral-300">{selectedMatch.referee}</strong></span>
                    )}
                    {selectedMatch.weather && (
                      <span>Weather: <strong className="text-neutral-300">{selectedMatch.weather}</strong></span>
                    )}
                  </div>
                </div>

                {/* Sub Navigation Tabs */}
                <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-neutral-800/80">
                  <button
                    onClick={() => setMatchModalTab('recap')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      matchModalTab === 'recap'
                        ? 'bg-rose-600 text-white shadow'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Editorial Recap
                  </button>
                  {selectedMatch.timeline && (
                    <button
                      onClick={() => setMatchModalTab('timeline')}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        matchModalTab === 'timeline'
                          ? 'bg-rose-600 text-white shadow'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      Minute-by-Minute Timeline
                    </button>
                  )}
                  {selectedMatch.stats && (
                    <button
                      onClick={() => setMatchModalTab('stats')}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        matchModalTab === 'stats'
                          ? 'bg-rose-600 text-white shadow'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      Detailed Pro Stats
                    </button>
                  )}
                  {selectedMatch.homeLineup && (
                    <button
                      onClick={() => setMatchModalTab('lineups')}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        matchModalTab === 'lineups'
                          ? 'bg-rose-600 text-white shadow'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      Confirmed Lineups
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
                
                {/* TAB 1: EDITORIAL RECAP & SUMMARY */}
                {matchModalTab === 'recap' && (
                  <div className="space-y-6">
                    {selectedMatch.editorialReport ? (
                      <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                        <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                          <Activity className="w-4 h-4" />
                          <span>Official Match Report & Analysis</span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                          {selectedMatch.editorialReport}
                        </p>
                      </div>
                    ) : (
                      <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                        <div className="font-bold text-white text-xs uppercase">
                          Match Summary
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-300">
                          {selectedMatch.notes}
                        </p>
                      </div>
                    )}

                    {/* Man of the Match Spotlight */}
                    {selectedMatch.manOfTheMatch && (
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-neutral-950 to-neutral-950 border border-amber-500/30 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            <Star className="w-6 h-6 fill-amber-400" />
                          </div>
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                              Official Man of the Match
                            </div>
                            <div className="font-display text-2xl font-black uppercase text-white">
                              {selectedMatch.manOfTheMatch}
                            </div>
                          </div>
                        </div>

                        <div className="text-right text-xs text-neutral-400">
                          <span className="block font-bold text-amber-400">Voted by Match Panel</span>
                          <span>Sylhet District Football</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: MINUTE-BY-MINUTE TIMELINE */}
                {matchModalTab === 'timeline' && selectedMatch.timeline && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Match Event Sequence
                    </h4>

                    <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-800">
                      {selectedMatch.timeline.map((ev, idx) => (
                        <div key={idx} className="relative flex items-start gap-4">
                          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-xs">
                            {getEventIcon(ev.type)}
                          </div>

                          <div className="flex-1 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/90 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">{ev.title}</span>
                              <span className="font-mono font-bold text-rose-500 tabular-nums">{ev.minute}'</span>
                            </div>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                              {ev.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: PRO MATCH STATS COMPARISON */}
                {matchModalTab === 'stats' && selectedMatch.stats && (
                  <div className="space-y-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Comparative Match Analytics
                    </h4>

                    <div className="space-y-4 text-xs font-mono">
                      {[
                        { label: 'Possession %', key: 'possession', isPct: true },
                        { label: 'Total Shots', key: 'shots' },
                        { label: 'Shots on Target', key: 'shotsOnTarget' },
                        { label: 'Expected Goals (xG)', key: 'xg' },
                        { label: 'Corner Kicks', key: 'corners' },
                        { label: 'Pass Accuracy %', key: 'passAccuracy', isPct: true },
                        { label: 'Fouls Committed', key: 'fouls' },
                        { label: 'Goalkeeper Saves', key: 'saves' }
                      ].map((item) => {
                        const [homeVal, awayVal] = (selectedMatch.stats as any)[item.key];
                        const total = homeVal + awayVal || 1;
                        const homePct = (homeVal / total) * 100;

                        return (
                          <div key={item.key} className="space-y-1">
                            <div className="flex justify-between text-xs font-sans font-semibold">
                              <span className="text-rose-400 font-bold font-mono">{homeVal}{item.isPct ? '%' : ''}</span>
                              <span className="text-neutral-300 uppercase text-[11px]">{item.label}</span>
                              <span className="text-neutral-400 font-bold font-mono">{awayVal}{item.isPct ? '%' : ''}</span>
                            </div>

                            <div className="h-2 w-full bg-neutral-950 rounded-full flex overflow-hidden border border-neutral-800">
                              <div
                                className="h-full bg-rose-600 transition-all duration-500"
                                style={{ width: `${homePct}%` }}
                              />
                              <div
                                className="h-full bg-neutral-700 transition-all duration-500"
                                style={{ width: `${100 - homePct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 4: CONFIRMED LINEUPS */}
                {matchModalTab === 'lineups' && selectedMatch.homeLineup && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Home Team Lineup */}
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                        <div>
                          <div className="font-bold text-white uppercase text-xs">
                            {selectedMatch.homeTeam}
                          </div>
                          <span className="text-[11px] text-rose-500 font-mono">
                            {selectedMatch.homeLineup.formation}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-400">
                          Starting XI
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        {selectedMatch.homeLineup.starters.map((p) => (
                          <div key={p.num} className="flex items-center justify-between py-1 border-b border-neutral-900">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-rose-500 w-5">#{p.num}</span>
                              <span className="text-white font-medium">{p.name}</span>
                            </div>
                            <span className="font-mono text-neutral-400 text-[11px]">{p.pos}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Away Team Lineup */}
                    {selectedMatch.awayLineup && (
                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                          <div>
                            <div className="font-bold text-white uppercase text-xs">
                              {selectedMatch.awayTeam}
                            </div>
                            <span className="text-[11px] text-neutral-400 font-mono">
                              {selectedMatch.awayLineup.formation}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                            Starting XI
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          {selectedMatch.awayLineup.starters.map((p) => (
                            <div key={p.num} className="flex items-center justify-between py-1 border-b border-neutral-900">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-neutral-400 w-5">#{p.num}</span>
                                <span className="text-neutral-200 font-medium">{p.name}</span>
                              </div>
                              <span className="font-mono text-neutral-500 text-[11px]">{p.pos}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 shrink-0">
                <span>Daudpur Tournament & Sylhet League Official Records</span>
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold uppercase"
                >
                  Close Match Center
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </section>
  );
};
