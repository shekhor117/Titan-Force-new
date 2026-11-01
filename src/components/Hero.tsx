import React from 'react';
import { 
  ArrowRight, Trophy, ShieldCheck, Calendar, Clock, 
  Crosshair, Sparkles, ShoppingBag, Users, MapPin, 
  Activity, Star, ChevronRight 
} from 'lucide-react';
import { TRANSLATIONS, MATCHES_DATA, Match } from '../data/clubData';
import { PageView } from './PageHeaderBanner';
import { useMatchCountdown, getNextUpcomingMatch } from '../utils/countdown';

interface HeroProps {
  lang: 'en' | 'bn';
  onScrollToSquad?: () => void;
  onOpenStore?: () => void;
  onNavigate?: (view: PageView) => void;
  onViewMatch?: (match: Match) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  lang, 
  onScrollToSquad, 
  onOpenStore,
  onNavigate,
  onViewMatch
}) => {
  const t = TRANSLATIONS[lang];
  const upcomingMatch = getNextUpcomingMatch(MATCHES_DATA) || MATCHES_DATA[7];

  // Live Accurate Matchday Countdown Timer
  const timeLeft = useMatchCountdown(upcomingMatch);

  const handleGoToSquad = () => {
    if (onNavigate) {
      onNavigate('squad');
    } else if (onScrollToSquad) {
      onScrollToSquad();
    }
  };

  const handleGoToStore = () => {
    if (onNavigate) {
      onNavigate('store');
    } else if (onOpenStore) {
      onOpenStore();
    }
  };

  const handleGoToMatches = () => {
    if (onNavigate) {
      onNavigate('matches');
    }
  };

  const handleGoToTactics = () => {
    if (onNavigate) {
      onNavigate('tactics');
    }
  };

  const handleGoToTrophies = () => {
    if (onNavigate) {
      onNavigate('trophies');
    }
  };

  const handleGoToAbout = () => {
    if (onNavigate) {
      onNavigate('about');
    }
  };

  return (
    <section className="relative overflow-hidden bg-neutral-950 border-b border-neutral-800 pt-8 pb-16 lg:pt-16 lg:pb-24 transition-colors">
      
      {/* 1. Atmospheric Stadium Background with Radiant Ambient Wash */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-bg-soccer.jpg"
          alt="Titan Force Football Stadium"
          className="hero-bg-img w-full h-full object-cover object-center opacity-30 brightness-75 scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic gradient overlays for seamless readability in both Dark and Light modes */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
        
        {/* Subtle decorative athletic light beams */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 2. Top Kicker Badge Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-800/80">
          <button
            type="button"
            onClick={handleGoToTrophies}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/60 transition-all text-left cursor-pointer group shadow-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <Trophy className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-200 group-hover:text-amber-400 transition-colors">
              {lang === 'en' 
                ? 'DAUDPUR 2026 UNDEFEATED TOURNAMENT CHAMPIONS' 
                : 'দাউদপুর ফুটবল টুর্নামেন্ট ২০২৬ অপরাজিত চ্যাম্পিয়ন'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-neutral-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Mulikandi, Zakigonj, Sylhet</span>
            </span>
            <span className="text-neutral-700" aria-hidden="true">·</span>
            <span className="text-neutral-300 font-mono">EST. 2025</span>
          </div>
        </div>

        {/* 3. Hero Split Grid: Left Authority Column + Right Matchday Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Command & Identity */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-rose-500">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                <span>{lang === 'en' ? 'OFFICIAL FOOTBALL CLUB' : 'অফিশিয়াল ফুটবল ক্লাব'}</span>
                <span className="text-neutral-600" aria-hidden="true">·</span>
                <span className="text-amber-400 font-semibold">{lang === 'en' ? 'FIRST TEAM' : 'ফার্স্ট টিম'}</span>
              </div>

              {/* Master Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white uppercase text-balance leading-[0.92]">
                {lang === 'en' ? (
                  <>
                    TITAN FORCE <br />
                    <span className="text-rose-500">MULIKANDI FC</span>
                  </>
                ) : (
                  <>
                    টাইটান ফোর্স <br />
                    <span className="text-rose-500">মুলিকান্দি এফসি</span>
                  </>
                )}
              </h1>

              {/* Club Tagline / Motto */}
              <div className="text-base sm:text-lg font-bold text-neutral-200 tracking-wide uppercase font-display">
                {lang === 'en'
                  ? 'Pride of Zakigonj · Unbeaten Champions of Daudpur'
                  : 'জকিগঞ্জের গৌরব · দাউদপুর টুর্নামেন্টের অজেয় চ্যাম্পিয়ন'}
              </div>
            </div>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-normal leading-relaxed">
              {lang === 'en'
                ? 'Home fortress at Mulikandi High School Ground. Led by Captain Shekhor Mohan Roy with an undefeated 88.9% tournament win rate and 4 clean sheets in 5 championship matches. Grassroots passion, elite football brotherhood.'
                : 'মুলিকান্দি হাই স্কুল মাঠের অজেয় দুর্গ। অধিনায়ক শেখর মোহন রায়ের নেতৃত্বে ৮৮.৯% জয়ের অবিস্মরণীয় রেকর্ড ও অপরাজিত ট্রফি বিজয়ী টাইটানরা। তৃণমূল ফুটবল ঐতিহ্যের বিশ্বস্ত প্রতীক।'}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleGoToSquad}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl shadow-rose-950/50 hover:shadow-rose-600/30 active:scale-95 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>{lang === 'en' ? 'Explore Squad Roster' : 'ফার্স্ট টিম স্কোয়াড'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleGoToMatches}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-neutral-200 font-semibold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'en' ? 'Match Center & Schedule' : 'ম্যাচ সেন্টার ও সূচি'}</span>
              </button>

              <button
                type="button"
                onClick={handleGoToTactics}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Crosshair className="w-4 h-4 text-rose-500" />
                <span>{lang === 'en' ? 'Tactics' : 'রণকৌশল'}</span>
              </button>

              <button
                type="button"
                onClick={handleGoToStore}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-rose-900/40 hover:border-rose-600 text-rose-400 hover:text-rose-300 font-semibold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{lang === 'en' ? 'Kit 17 Store' : 'কিট ১৭ স্টোর'}</span>
              </button>
            </div>

            {/* Proof Points Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-neutral-400 border-t border-neutral-800/80">
              <button 
                type="button"
                onClick={handleGoToTrophies}
                className="flex items-center gap-1.5 text-amber-400 font-bold hover:underline cursor-pointer"
              >
                <Trophy className="w-4 h-4 shrink-0" />
                <span>Daudpur 2026 Champions</span>
              </button>
              <span aria-hidden="true" className="text-neutral-700">|</span>
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>88.9% Win Rate (8W · 1D)</span>
              </div>
              <span aria-hidden="true" className="text-neutral-700">|</span>
              <button 
                type="button"
                onClick={handleGoToAbout}
                className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Mulikandi High School Ground</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Matchday Broadcast Center Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-neutral-900/95 border border-neutral-800 p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-6 hover:border-neutral-700 transition-all">
              
              {/* Header with Live Ticker */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                    {lang === 'en' ? 'Next Official Matchday' : 'পরবর্তী ম্যাচ কাউন্টডাউন'}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-rose-500 px-2 py-0.5 rounded bg-rose-950/40 border border-rose-900/40">
                  {upcomingMatch.league}
                </span>
              </div>

              {/* Countdown Ticker Box */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 text-center space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-rose-500" />
                    <span>{lang === 'en' ? 'Kickoff Countdown' : 'কিক-অফ কাউন্টডাউন'}</span>
                  </span>
                  {timeLeft.isLive ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {lang === 'en' ? 'LIVE NOW' : 'সরাসরি লাইভ'}
                    </span>
                  ) : (
                    <span className="text-neutral-500 font-mono text-[9px] tracking-normal">
                      BST (UTC+6)
                    </span>
                  )}
                </div>

                {timeLeft.isLive ? (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-center space-y-1">
                    <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wide">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>{lang === 'en' ? 'Matchday Kicked Off · Live Now' : 'খেলা শুরু হয়েছে · সরাসরি মাঠে'}</span>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {upcomingMatch.venue}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2 font-mono tabular-nums">
                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800/80">
                      <span className="font-display text-2xl sm:text-3xl font-black text-white">
                        {String(timeLeft.days).padStart(2, '0')}
                      </span>
                      <span className="block text-[9px] uppercase text-neutral-500 mt-0.5">
                        {lang === 'en' ? 'Days' : 'দিন'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800/80">
                      <span className="font-display text-2xl sm:text-3xl font-black text-white">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="block text-[9px] uppercase text-neutral-500 mt-0.5">
                        {lang === 'en' ? 'Hours' : 'ঘণ্টা'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800/80">
                      <span className="font-display text-2xl sm:text-3xl font-black text-white">
                        {String(timeLeft.mins).padStart(2, '0')}
                      </span>
                      <span className="block text-[9px] uppercase text-neutral-500 mt-0.5">
                        {lang === 'en' ? 'Mins' : 'মিনিট'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800/80">
                      <span className="font-display text-2xl sm:text-3xl font-black text-rose-500 animate-pulse">
                        {String(timeLeft.secs).padStart(2, '0')}
                      </span>
                      <span className="block text-[9px] uppercase text-rose-400 mt-0.5">
                        {lang === 'en' ? 'Secs' : 'সেকেন্ড'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Match Teams Face-off */}
              <div className="flex items-center justify-around py-1 text-center">
                {/* Home Team */}
                <div className="space-y-1.5 w-5/12">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-950 border border-neutral-800 p-2.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    {upcomingMatch.homeTeam.includes('Titan Force') ? (
                      <img
                        src="/logos/titanforce-logo.svg"
                        alt="Titan Force"
                        className="w-12 h-12 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="font-display font-black text-xl text-neutral-300">
                        {upcomingMatch.homeTeam.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="font-display font-black text-sm uppercase text-white tracking-wide truncate">
                    {upcomingMatch.homeTeam}
                  </div>
                  <div className="text-[11px] text-rose-400 font-semibold truncate">
                    {upcomingMatch.homeTeam.includes('Titan Force') ? 'Mulikandi · Home' : 'Home'}
                  </div>
                </div>

                {/* VS Badge */}
                <div className="space-y-1 px-2">
                  <span className="font-display text-3xl font-black text-rose-500">VS</span>
                  <span className="block text-[10px] font-mono font-semibold text-neutral-300 px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 whitespace-nowrap">
                    {upcomingMatch.time}
                  </span>
                </div>

                {/* Away Team */}
                <div className="space-y-1.5 w-5/12">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center font-display font-black text-xl text-neutral-300 shadow-lg">
                    {upcomingMatch.awayTeam.includes('Titan Force') ? (
                      <img
                        src="/logos/titanforce-logo.svg"
                        alt="Titan Force"
                        className="w-12 h-12 object-contain p-2"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="font-display font-black text-xl text-neutral-300">
                        {upcomingMatch.awayTeam.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="font-display font-black text-sm uppercase text-white tracking-wide truncate">
                    {upcomingMatch.awayTeam}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate">
                    {upcomingMatch.awayTeam.includes('Titan Force') ? 'Mulikandi · Away' : 'Away'}
                  </div>
                </div>
              </div>

              {/* Match Logistics */}
              <div className="pt-3 border-t border-neutral-800 space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Match Venue:</span>
                  </span>
                  <span className="text-white font-medium">{upcomingMatch.venue}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Match Date:</span>
                  </span>
                  <span className="text-white font-mono font-semibold">{upcomingMatch.date}</span>
                </div>
              </div>

              {/* Match CTA Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onViewMatch) {
                      onViewMatch(upcomingMatch);
                    } else if (onNavigate) {
                      onNavigate('matches');
                    }
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md shadow-rose-950/40 cursor-pointer active:scale-95"
                >
                  <span>{lang === 'en' ? 'Match Preview & Lineups' : 'ম্যাচ প্রিভিউ ও লাইনআপ'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleGoToMatches}
                  className="py-2.5 px-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
                  title="View All Matches"
                >
                  {lang === 'en' ? 'All Fixtures' : 'সব ফিক্সচার'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom 4-Column KPI Performance Strip */}
        <div className="pt-8 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          
          <button 
            type="button"
            onClick={handleGoToMatches}
            className="space-y-1 text-left p-4 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white tabular-nums group-hover:text-rose-500 transition-colors">
              09
            </div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
              <span>{t.stats.matches}</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          <button 
            type="button"
            onClick={handleGoToMatches}
            className="space-y-1 text-left p-4 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="font-display text-4xl sm:text-5xl font-black tracking-tight text-rose-500 tabular-nums">
              08
            </div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
              <span>{t.stats.wins}</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          <button 
            type="button"
            onClick={() => onNavigate?.('standings')}
            className="space-y-1 text-left p-4 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white tabular-nums group-hover:text-emerald-400 transition-colors">
              88.9%
            </div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
              <span>{t.stats.winRate}</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          <button 
            type="button"
            onClick={handleGoToTrophies}
            className="space-y-1 text-left p-4 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-amber-500/40 transition-all cursor-pointer group shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="font-display text-4xl sm:text-5xl font-black tracking-tight text-amber-400 tabular-nums">
              01 🏆
            </div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
              <span>{t.stats.trophyCount} (Daudpur)</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};
