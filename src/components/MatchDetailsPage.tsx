import React, { useState, useEffect } from 'react';
import { Match, MATCHES_DATA, MatchTimelineEvent, TRANSLATIONS, PLAYERS_DATA, Player } from '../data/clubData';
import { useMatchCountdown } from '../utils/countdown';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, Share2, Calendar, MapPin, 
  Trophy, Star, Users, Clock, ShieldCheck, Activity, Award, User, 
  Flame, Check, ExternalLink, Flag, Compass, CloudSun, Eye
} from 'lucide-react';

interface MatchDetailsPageProps {
  match: Match;
  lang: 'en' | 'bn';
  onBackToMatches: () => void;
  onSelectMatch: (m: Match) => void;
  onNavigateToPlayer: (player: Player) => void;
}

export const MatchDetailsPage: React.FC<MatchDetailsPageProps> = ({
  match,
  lang,
  onBackToMatches,
  onSelectMatch,
  onNavigateToPlayer,
}) => {
  const [activeTab, setActiveTab] = useState<'recap' | 'timeline' | 'stats' | 'lineups' | 'gallery'>('recap');
  const [copiedLink, setCopiedLink] = useState(false);
  const kickoffCountdown = useMatchCountdown(match.status === 'upcoming' ? match : null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCopiedLink(false);
  }, [match.id]);

  const currentIndex = MATCHES_DATA.findIndex(m => m.id === match.id);
  const prevMatch = MATCHES_DATA[(currentIndex - 1 + MATCHES_DATA.length) % MATCHES_DATA.length];
  const nextMatch = MATCHES_DATA[(currentIndex + 1) % MATCHES_DATA.length];

  const handleShare = async () => {
    const url = window.location.origin + window.location.pathname + `#match/${match.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${match.homeTeam} vs ${match.awayTeam} | Titan Force Mulikandi`,
          text: `Check out match details: ${match.homeTeam} vs ${match.awayTeam} (${match.homeScore ?? '-'} - ${match.awayScore ?? '-'})`,
          url: url,
        });
        return;
      } catch {
        // Fallback
      }
    }
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

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

  // Find player by name from timeline or MOTM
  const findPlayerByName = (nameStr?: string): Player | undefined => {
    if (!nameStr) return undefined;
    return PLAYERS_DATA.find(p => 
      nameStr.toLowerCase().includes(p.name.toLowerCase()) || 
      nameStr.toLowerCase().includes(p.fullName.toLowerCase()) ||
      nameStr.includes(`#${p.num}`)
    );
  };

  const motmPlayer = findPlayerByName(match.manOfTheMatch);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-20">
      
      {/* Breadcrumb & Navigation Sub-Header */}
      <div className="bg-neutral-900/95 border-b border-neutral-800 px-4 sm:px-6 lg:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMatches}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-rose-500" />
              <span>{lang === 'en' ? 'Back to Matches' : 'ম্যাচ সেন্টারে ফিরুন'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-neutral-600">/</span>
              <span>{lang === 'en' ? 'Fixtures & Results' : 'ফলাফল ও সময়সূচি'}</span>
              <span className="text-neutral-600">/</span>
              <span className="text-white font-semibold truncate max-w-[220px]">
                {match.homeTeam} vs {match.awayTeam}
              </span>
            </div>
          </div>

          {/* Quick Prev / Next Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectMatch(prevMatch)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
              title={`Previous Match`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden md:inline">{lang === 'en' ? 'Prev Match' : 'পূর্ববর্তী ম্যাচ'}</span>
            </button>

            <button
              onClick={() => onSelectMatch(nextMatch)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
              title={`Next Match`}
            >
              <span className="hidden md:inline">{lang === 'en' ? 'Next Match' : 'পরবর্তী ম্যাচ'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Broadcast Score Banner Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-900/80 to-neutral-950 border-b border-neutral-800 py-10 sm:py-14">
        
        {/* Subtle field background lighting */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/20 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Competition Meta Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>{match.league}</span>
            </span>

            {match.stage && (
              <span className="px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-semibold">
                {match.stage}
              </span>
            )}

            <span className={`px-2.5 py-0.5 rounded text-xs font-black tracking-wider uppercase ${
              match.status === 'completed'
                ? match.result === 'W' ? 'bg-emerald-600 text-white' : match.result === 'D' ? 'bg-amber-600 text-white' : 'bg-neutral-700 text-neutral-200'
                : 'bg-rose-600 text-white animate-pulse'
            }`}>
              {match.status === 'completed' ? (match.result === 'W' ? 'FULL TIME · WIN' : match.result === 'D' ? 'FULL TIME · DRAW' : 'FULL TIME') : 'UPCOMING MATCH'}
            </span>
          </div>

          {/* Broadcast Scoreboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 py-4">
            
            {/* Home Team */}
            <div className="flex flex-col md:flex-row items-center md:justify-end gap-4 text-center md:text-right">
              <div className="order-2 md:order-1 space-y-1">
                <div className="text-xs uppercase tracking-wider text-rose-500 font-bold">HOME TEAM</div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight">
                  {match.homeTeam}
                </h2>
                <div className="text-xs text-neutral-400">
                  {match.homeTeam.includes('Titan Force') ? 'Mulikandi, Zakigonj' : 'Sylhet DFA'}
                </div>
              </div>
              <div className="order-1 md:order-2 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center p-2.5 shadow-xl shrink-0">
                {match.homeTeam.includes('Titan Force') ? (
                  <img 
                    src="/logos/titanforce-logo.svg" 
                    alt={match.homeTeam} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-neutral-800 flex items-center justify-center text-xl font-black text-neutral-300">
                    {match.homeTeam.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Score Centerpiece */}
            <div className="flex flex-col items-center justify-center text-center">
              {match.status === 'completed' ? (
                <div className="flex items-center gap-4 sm:gap-6 bg-neutral-950/80 px-6 sm:px-8 py-3 rounded-2xl border border-neutral-800 shadow-2xl">
                  <span className="font-display text-5xl sm:text-7xl font-black text-white tabular-nums">
                    {match.homeScore}
                  </span>
                  <span className="text-neutral-600 font-display text-4xl sm:text-5xl font-light">-</span>
                  <span className="font-display text-5xl sm:text-7xl font-black text-neutral-300 tabular-nums">
                    {match.awayScore}
                  </span>
                </div>
              ) : (
                <div className="px-6 py-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 text-center space-y-2.5 shadow-xl max-w-sm w-full">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-display text-3xl font-black text-rose-500 uppercase tracking-wider">
                      VS
                    </span>
                  </div>
                  <div className="text-xs text-neutral-300 font-mono font-medium">
                    {match.date} · {match.time}
                  </div>

                  {/* Kickoff Countdown Ticker */}
                  <div className="pt-2 border-t border-neutral-800/80">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5 flex items-center justify-center gap-1.5">
                      <Clock className="w-3 h-3 text-rose-500" />
                      <span>{lang === 'en' ? 'Kickoff Countdown' : 'কিক-অফ কাউন্টডাউন'}</span>
                    </div>

                    {kickoffCountdown.isLive ? (
                      <div className="py-2 px-3 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>{lang === 'en' ? 'MATCH IN PROGRESS · LIVE' : 'সরাসরি মাঠে খেলা চলছে'}</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-1.5 font-mono text-center tabular-nums">
                        <div className="bg-neutral-900/90 px-2 py-1.5 rounded-lg border border-neutral-800">
                          <span className="block text-base sm:text-lg font-black text-white">
                            {String(kickoffCountdown.days).padStart(2, '0')}
                          </span>
                          <span className="block text-[8px] uppercase text-neutral-500 font-sans">
                            {lang === 'en' ? 'Days' : 'দিন'}
                          </span>
                        </div>
                        <div className="bg-neutral-900/90 px-2 py-1.5 rounded-lg border border-neutral-800">
                          <span className="block text-base sm:text-lg font-black text-white">
                            {String(kickoffCountdown.hours).padStart(2, '0')}
                          </span>
                          <span className="block text-[8px] uppercase text-neutral-500 font-sans">
                            {lang === 'en' ? 'Hrs' : 'ঘণ্টা'}
                          </span>
                        </div>
                        <div className="bg-neutral-900/90 px-2 py-1.5 rounded-lg border border-neutral-800">
                          <span className="block text-base sm:text-lg font-black text-white">
                            {String(kickoffCountdown.mins).padStart(2, '0')}
                          </span>
                          <span className="block text-[8px] uppercase text-neutral-500 font-sans">
                            {lang === 'en' ? 'Mins' : 'মিনিট'}
                          </span>
                        </div>
                        <div className="bg-neutral-900/90 px-2 py-1.5 rounded-lg border border-neutral-800">
                          <span className="block text-base sm:text-lg font-black text-rose-500 animate-pulse">
                            {String(kickoffCountdown.secs).padStart(2, '0')}
                          </span>
                          <span className="block text-[8px] uppercase text-rose-400 font-sans">
                            {lang === 'en' ? 'Secs' : 'সেকেন্ড'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Goal Scorers breakdown */}
              {match.goals && match.goals.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-md">
                  {match.goals.map((g, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                    >
                      <span>⚽ {g.scorer} {g.minute}'</span>
                      {g.assist && <span className="text-neutral-500 text-[10px]">({g.assist})</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col md:flex-row items-center md:justify-start gap-4 text-center md:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center p-2.5 shadow-xl shrink-0">
                {match.awayTeam.includes('Titan Force') ? (
                  <img 
                    src="/logos/titanforce-logo.svg" 
                    alt={match.awayTeam} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-neutral-800 flex items-center justify-center text-xl font-black text-neutral-300">
                    {match.awayTeam.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-neutral-500 font-bold">AWAY TEAM</div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight">
                  {match.awayTeam}
                </h2>
                <div className="text-xs text-neutral-400">
                  {match.awayTeam.includes('Titan Force') ? 'Mulikandi, Zakigonj' : 'Sylhet DFA League'}
                </div>
              </div>
            </div>

          </div>

          {/* Match Conditions Info Bar */}
          <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-rose-500" />
                <span>{match.date} · {match.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span className="font-medium text-neutral-200">{match.venue}</span>
              </div>
              {match.attendance && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-neutral-400" />
                  <span>{match.attendance} Fans</span>
                </div>
              )}
              {match.referee && (
                <div className="hidden md:flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-neutral-400" />
                  <span>Ref: {match.referee}</span>
                </div>
              )}
              {match.weather && (
                <div className="hidden lg:flex items-center gap-1.5">
                  <CloudSun className="w-4 h-4 text-amber-400" />
                  <span>{match.weather}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-200 hover:text-white font-medium transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Match'}</span>
            </button>
          </div>

        </div>

      </section>

      {/* MOTM Spotlight Strip (if present) */}
      {match.manOfTheMatch && (
        <section className="bg-gradient-to-r from-amber-950/30 via-neutral-900 to-neutral-950 border-b border-amber-600/20 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  {lang === 'en' ? 'Official Man of the Match' : 'অফিশিয়াল সেরা খেলোয়াড়'}
                </div>
                <div className="font-display text-lg font-black uppercase text-white">
                  {match.manOfTheMatch}
                </div>
              </div>
            </div>

            {motmPlayer && (
              <button
                onClick={() => onNavigateToPlayer(motmPlayer)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-bold transition-colors"
              >
                <span>{lang === 'en' ? 'View Player Profile' : 'খেলোয়াড় প্রোফাইল দেখুন'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

          </div>
        </section>
      )}

      {/* Tabs Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 border-b border-neutral-800 overflow-x-auto pb-2 scrollbar-none">
          
          <button
            onClick={() => setActiveTab('recap')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'recap'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{lang === 'en' ? 'Editorial Recap' : 'ম্যাচ বিবরণী'}</span>
          </button>

          {match.timeline && (
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === 'timeline'
                  ? 'bg-rose-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{lang === 'en' ? 'Minute Timeline' : 'লাইভ টাইমলাইন'}</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-neutral-800 text-neutral-300">
                {match.timeline.length}
              </span>
            </button>
          )}

          {match.stats && (
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === 'stats'
                  ? 'bg-rose-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>{lang === 'en' ? 'Match Analytics' : 'ম্যাচ অ্যানালিটিক্স'}</span>
            </button>
          )}

          {(match.homeLineup || match.awayLineup) && (
            <button
              onClick={() => setActiveTab('lineups')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === 'lineups'
                  ? 'bg-rose-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{lang === 'en' ? 'Tactical Lineups' : 'দলের একাদশ'}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'gallery'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{lang === 'en' ? 'Gallery & Notes' : 'গ্যালারি ও তথ্য'}</span>
          </button>

        </div>
      </section>

      {/* Tab Contents */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: EDITORIAL RECAP */}
        {activeTab === 'recap' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Story column */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-widest">
                  <Activity className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Official Matchday Report' : 'ম্যাচ রিভিউ ও বিশ্লেষণ'}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  {match.stage 
                    ? `${match.stage}: ${match.homeTeam} vs ${match.awayTeam}` 
                    : `${match.homeTeam} vs ${match.awayTeam}`}
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {match.editorialReport || match.notes || (
                    lang === 'en' 
                      ? 'Titan Force Mulikandi produced a resolute competitive performance characterized by defensive solidity and dynamic counter-attacks, backed by strong vocal support from the Mulikandi community.'
                      : 'টাইটান ফোর্স মুলিকান্দি পুরো ম্যাচ জুড়ে চমৎকার পাসিং ও রক্ষণভাগের দৃঢ়তা প্রদর্শন করেছে।'
                  )}
                </p>

                {/* Match Highlights quote */}
                <div className="border-l-4 border-rose-600 pl-4 py-2 bg-neutral-950/40 rounded-r-xl italic text-neutral-300 text-sm">
                  "{match.notes || 'A proud day for Titan Force football club and all our supporters in Zakigonj.'}"
                  <div className="not-italic font-bold text-xs text-rose-400 mt-2">
                    — Titan Force Mulikandi Matchday Desk
                  </div>
                </div>

                {/* Key Match Takeaways */}
                <div className="pt-4 border-t border-neutral-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    {lang === 'en' ? 'Tactical Takeaways' : 'ট্যাকটিক্যাল গুরুত্বপূর্ণ দিক'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-neutral-950 border border-neutral-800 p-3.5 rounded-xl space-y-1">
                      <div className="font-bold text-white flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Defensive Organisation</span>
                      </div>
                      <p className="text-neutral-400">
                        {match.homeScore !== undefined && match.awayScore === 0 
                          ? 'Zero goals conceded with rock-solid central defensive coordination.'
                          : 'Disciplined zonal marking limiting opposition shots from dangerous areas.'}
                      </p>
                    </div>

                    <div className="bg-neutral-950 border border-neutral-800 p-3.5 rounded-xl space-y-1">
                      <div className="font-bold text-white flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Midfield Dominance</span>
                      </div>
                      <p className="text-neutral-400">
                        Controlled the tempo of play through high pass accuracy and rapid counter-pressing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Matchday Details sidebar */}
            <div className="space-y-6">
              
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h4 className="font-display text-lg font-black uppercase text-white tracking-wide">
                  {lang === 'en' ? 'Fixture Information' : 'ম্যাচের তথ্যাবলী'}
                </h4>

                <div className="divide-y divide-neutral-800 text-xs">
                  <div className="flex justify-between py-2.5">
                    <span className="text-neutral-400">Tournament</span>
                    <span className="text-white font-semibold text-right">{match.league}</span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-neutral-400">Stage</span>
                    <span className="text-white font-semibold text-right">{match.stage || 'Regular Round'}</span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-neutral-400">Stadium</span>
                    <span className="text-white font-semibold text-right">{match.venue}</span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-neutral-400">Date & Time</span>
                    <span className="text-white font-semibold text-right">{match.date} · {match.time}</span>
                  </div>
                  {match.attendance && (
                    <div className="flex justify-between py-2.5">
                      <span className="text-neutral-400">Crowd</span>
                      <span className="text-white font-semibold text-right">{match.attendance} spectators</span>
                    </div>
                  )}
                  {match.referee && (
                    <div className="flex justify-between py-2.5">
                      <span className="text-neutral-400">Match Referee</span>
                      <span className="text-white font-semibold text-right">{match.referee}</span>
                    </div>
                  )}
                  {match.pitchCondition && (
                    <div className="flex justify-between py-2.5">
                      <span className="text-neutral-400">Surface</span>
                      <span className="text-white font-semibold text-right">{match.pitchCondition}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Home Ground Banner */}
              <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 relative p-5 space-y-2">
                <div className="text-xs uppercase tracking-wider text-rose-500 font-bold">
                  {lang === 'en' ? 'Mulikandi Football Fortress' : 'মুলিকান্দি ফুটবল ময়দান'}
                </div>
                <div className="text-sm font-bold text-white">
                  Mulikandi High School Ground, Zakigonj
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Home of Titan Force Mulikandi FC where local talent trains and competes against the best teams across Sylhet district.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: MINUTE-BY-MINUTE TIMELINE */}
        {activeTab === 'timeline' && match.timeline && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                    {lang === 'en' ? 'Live Minute-by-Minute Action' : 'ম্যাচের পূর্ণ টাইমলাইন'}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {lang === 'en' ? 'Click on tagged players to view their full player profile.' : 'খেলোয়াড়ের প্রোফাইল দেখতে নামের উপর ক্লিক করুন।'}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 font-mono">
                  {match.timeline.length} Events
                </span>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-neutral-800 space-y-6 my-4">
                {match.timeline.map((event, idx) => {
                  const eventPlayer = findPlayerByName(event.player);

                  return (
                    <div key={idx} className="relative group">
                      
                      {/* Timeline Dot Indicator */}
                      <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-neutral-950 border-2 border-neutral-700 flex items-center justify-center text-xs group-hover:border-rose-500 transition-colors">
                        <span>{getEventIcon(event.type)}</span>
                      </div>

                      {/* Event Box */}
                      <div className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-4 space-y-1.5 hover:border-neutral-700 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-rose-500">
                            {event.minute}' MINUTE
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            event.team === 'home' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : event.team === 'away' ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-900 text-neutral-500'
                          }`}>
                            {event.team === 'home' ? match.homeTeam : event.team === 'away' ? match.awayTeam : 'Match Official'}
                          </span>
                        </div>

                        <div className="font-bold text-white text-sm">
                          {event.title}
                        </div>

                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Clickable Player Tag */}
                        {event.player && eventPlayer && (
                          <div className="pt-2">
                            <button
                              onClick={() => onNavigateToPlayer(eventPlayer)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-semibold text-rose-400 hover:text-white transition-colors"
                            >
                              <User className="w-3 h-3" />
                              <span>View #{eventPlayer.num} {eventPlayer.fullName}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: MATCH ANALYTICS */}
        {activeTab === 'stats' && match.stats && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-600" />
                  <span className="font-display text-lg font-black uppercase text-white">
                    {match.homeTeam}
                  </span>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  HEAD-TO-HEAD ANALYTICS
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-black uppercase text-neutral-400">
                    {match.awayTeam}
                  </span>
                  <div className="w-3 h-3 rounded-full bg-neutral-600" />
                </div>
              </div>

              {/* Comparative Stats Bars */}
              <div className="space-y-5">
                {[
                  { label: 'Ball Possession', home: `${match.stats.possession[0]}%`, away: `${match.stats.possession[1]}%`, homeVal: match.stats.possession[0], awayVal: match.stats.possession[1] },
                  { label: 'Expected Goals (xG)', home: match.stats.xg[0], away: match.stats.xg[1], homeVal: match.stats.xg[0] * 50, awayVal: match.stats.xg[1] * 50 },
                  { label: 'Total Shots', home: match.stats.shots[0], away: match.stats.shots[1], homeVal: match.stats.shots[0], awayVal: match.stats.shots[1] },
                  { label: 'Shots on Target', home: match.stats.shotsOnTarget[0], away: match.stats.shotsOnTarget[1], homeVal: match.stats.shotsOnTarget[0], awayVal: match.stats.shotsOnTarget[1] },
                  { label: 'Corner Kicks', home: match.stats.corners[0], away: match.stats.corners[1], homeVal: match.stats.corners[0], awayVal: match.stats.corners[1] },
                  { label: 'Pass Accuracy', home: `${match.stats.passAccuracy[0]}%`, away: `${match.stats.passAccuracy[1]}%`, homeVal: match.stats.passAccuracy[0], awayVal: match.stats.passAccuracy[1] },
                  { label: 'Fouls Committed', home: match.stats.fouls[0], away: match.stats.fouls[1], homeVal: match.stats.fouls[0], awayVal: match.stats.fouls[1] },
                  { label: 'Goalkeeper Saves', home: match.stats.saves[0], away: match.stats.saves[1], homeVal: match.stats.saves[0], awayVal: match.stats.saves[1] },
                  { label: 'Yellow Cards', home: match.stats.yellowCards[0], away: match.stats.yellowCards[1], homeVal: match.stats.yellowCards[0], awayVal: match.stats.yellowCards[1] },
                ].map((stat, i) => {
                  const total = (typeof stat.homeVal === 'number' && typeof stat.awayVal === 'number' && stat.homeVal + stat.awayVal > 0) 
                    ? stat.homeVal + stat.awayVal 
                    : 1;
                  const homePercent = Math.round((Number(stat.homeVal) / total) * 100);

                  return (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-rose-400 text-sm">{stat.home}</span>
                        <span className="font-semibold text-neutral-300 uppercase tracking-wider">{stat.label}</span>
                        <span className="font-mono font-bold text-neutral-400 text-sm">{stat.away}</span>
                      </div>
                      <div className="w-full bg-neutral-950 h-2.5 rounded-full overflow-hidden flex border border-neutral-800">
                        <div className="bg-rose-600 h-full transition-all duration-500" style={{ width: `${homePercent}%` }} />
                        <div className="bg-neutral-700 h-full transition-all duration-500" style={{ width: `${100 - homePercent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: TACTICAL FORMATION & LINEUPS */}
        {activeTab === 'lineups' && (
          <div className="space-y-8">
            
            {/* Visual Tactical Pitch */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                    {lang === 'en' ? 'Matchday Tactical Formations' : 'মাঠের একাদশ ও রণকৌশল'}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {match.homeTeam}: {match.homeLineup?.formation || '4-3-3'} vs {match.awayTeam}: {match.awayLineup?.formation || '4-4-2'}
                  </p>
                </div>
                <div className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-lg border border-rose-500/20">
                  Click any player to view their profile
                </div>
              </div>

              {/* Pitch Visual */}
              <div className="relative w-full aspect-[16/9] min-h-[300px] rounded-2xl bg-emerald-950/70 border-2 border-emerald-800/80 overflow-hidden shadow-2xl flex items-center justify-between p-4 sm:p-8">
                
                {/* Grass stripes and pitch markings */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_50%,transparent_50%)] bg-[length:10%_100%]" />
                <div className="absolute inset-4 border border-emerald-500/30 rounded-lg pointer-events-none" />
                <div className="absolute top-4 bottom-4 left-1/2 w-px bg-emerald-500/30 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-emerald-500/30 pointer-events-none" />

                {/* Left side (Titan Force starters) */}
                <div className="relative z-10 w-1/2 h-full flex flex-col justify-around py-2">
                  <div className="text-[10px] font-black uppercase tracking-wider text-rose-400 mb-1">
                    {match.homeTeam}
                  </div>
                  <div className="flex-1 flex flex-wrap content-around gap-2 sm:gap-4 pr-4">
                    {match.homeLineup?.starters.map((starter) => {
                      const squadPlayer = PLAYERS_DATA.find(p => p.num === starter.num || p.name.toLowerCase() === starter.name.toLowerCase());

                      return (
                        <div
                          key={starter.num}
                          onClick={() => squadPlayer && onNavigateToPlayer(squadPlayer)}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded-lg bg-neutral-950/90 border border-neutral-700/80 shadow-md transition-all ${
                            squadPlayer ? 'cursor-pointer hover:border-rose-500 hover:scale-105' : ''
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center">
                            {starter.num}
                          </span>
                          <span className="text-[11px] font-bold text-white whitespace-nowrap">
                            {starter.name.split(' ')[0]}
                          </span>
                          <span className="text-[9px] text-neutral-400 font-mono">
                            {starter.pos}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right side (Opponent Starters) */}
                <div className="relative z-10 w-1/2 h-full flex flex-col justify-around py-2 pl-4 border-l border-emerald-600/20">
                  <div className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-1 text-right">
                    {match.awayTeam}
                  </div>
                  <div className="flex-1 flex flex-wrap content-around justify-end gap-2 sm:gap-4">
                    {match.awayLineup?.starters.map((starter) => (
                      <div
                        key={starter.num}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-neutral-900/90 border border-neutral-800 shadow-md"
                      >
                        <span className="text-[9px] text-neutral-400 font-mono">
                          {starter.pos}
                        </span>
                        <span className="text-[11px] font-bold text-neutral-200 whitespace-nowrap">
                          {starter.name.split(' ')[0]}
                        </span>
                        <span className="w-5 h-5 rounded-full bg-neutral-700 text-neutral-200 font-bold text-[10px] flex items-center justify-center">
                          {starter.num}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Complete Lineup Rosters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Home Team Squad Roster */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div>
                    <h4 className="font-display text-lg font-black uppercase text-white">
                      {match.homeTeam}
                    </h4>
                    <span className="text-xs text-rose-400 font-mono">
                      Formation: {match.homeLineup?.formation || '4-3-3 Attacking'}
                    </span>
                  </div>
                  <img src="/logos/titanforce-logo.svg" alt="Titan Force" className="w-8 h-8 object-contain" />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Starting Eleven
                  </div>
                  <div className="divide-y divide-neutral-800/80 text-xs">
                    {match.homeLineup?.starters.map((p) => {
                      const squadPlayer = PLAYERS_DATA.find(sp => sp.num === p.num);
                      return (
                        <div 
                          key={p.num} 
                          onClick={() => squadPlayer && onNavigateToPlayer(squadPlayer)}
                          className={`flex items-center justify-between py-2 transition-colors ${
                            squadPlayer ? 'cursor-pointer hover:text-rose-400' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded bg-neutral-950 font-mono text-[11px] font-bold text-white flex items-center justify-center border border-neutral-800">
                              #{p.num}
                            </span>
                            <span className="font-bold text-white">{p.name}</span>
                          </div>
                          <span className="font-mono text-neutral-400 text-[11px]">{p.pos}</span>
                        </div>
                      );
                    })}
                  </div>

                  {match.homeLineup?.bench && match.homeLineup.bench.length > 0 && (
                    <div className="pt-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                        Substitutes Bench
                      </div>
                      <div className="divide-y divide-neutral-800/80 text-xs">
                        {match.homeLineup.bench.map((p) => (
                          <div key={p.num} className="flex items-center justify-between py-1.5 text-neutral-400">
                            <span>#{p.num} {p.name}</span>
                            <span className="font-mono text-[11px]">{p.pos}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Away Team Squad Roster */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div>
                    <h4 className="font-display text-lg font-black uppercase text-white">
                      {match.awayTeam}
                    </h4>
                    <span className="text-xs text-neutral-400 font-mono">
                      Formation: {match.awayLineup?.formation || '4-4-2 Traditional'}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center font-bold text-xs text-neutral-300">
                    {match.awayTeam.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Starting Eleven
                  </div>
                  <div className="divide-y divide-neutral-800/80 text-xs">
                    {match.awayLineup?.starters.map((p) => (
                      <div key={p.num} className="flex items-center justify-between py-2 text-neutral-300">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded bg-neutral-950 font-mono text-[11px] font-bold text-neutral-300 flex items-center justify-center border border-neutral-800">
                            #{p.num}
                          </span>
                          <span className="font-medium text-white">{p.name}</span>
                        </div>
                        <span className="font-mono text-neutral-400 text-[11px]">{p.pos}</span>
                      </div>
                    ))}
                  </div>

                  {match.awayLineup?.bench && match.awayLineup.bench.length > 0 && (
                    <div className="pt-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                        Substitutes Bench
                      </div>
                      <div className="divide-y divide-neutral-800/80 text-xs">
                        {match.awayLineup.bench.map((p) => (
                          <div key={p.num} className="flex items-center justify-between py-1.5 text-neutral-400">
                            <span>#{p.num} {p.name}</span>
                            <span className="font-mono text-[11px]">{p.pos}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: GALLERY & MATCH NOTES */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                  {lang === 'en' ? 'Matchday Gallery & Atmosphere' : 'ম্যাচের ছবি ও আবহ'}
                </h3>
                <p className="text-xs text-neutral-400">
                  Floodlit action, crowd passion, and trophy celebrations from Sylhet football grounds.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 relative group">
                  <img
                    src="/src/assets/images/titan_match_action_1792594583613.jpg"
                    alt="Match action"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.src = '/images/hero-bg-soccer.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 text-xs font-bold text-white">
                    Competitive Duel on the Pitch
                  </div>
                </div>

                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 relative group">
                  <img
                    src="/src/assets/images/titan_stadium_fans_1792594584092.jpg"
                    alt="Fans cheering"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.src = '/images/hero-bg-soccer.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 text-xs font-bold text-white">
                    Vocal Mulikandi Supporters
                  </div>
                </div>

                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 relative group">
                  <img
                    src="/src/assets/images/titan_trophy_celebration_1792594584475.jpg"
                    alt="Trophy Celebration"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.src = '/images/hero-bg-soccer.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 text-xs font-bold text-white">
                    Daudpur 2026 Champion Celebration
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* Related Matches Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-neutral-800 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-500">
              {lang === 'en' ? 'Fixtures Calendar' : 'অন্যান্য ম্যাচ'}
            </div>
            <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
              {lang === 'en' ? 'Other Tournament Fixtures' : 'অন্যান্য টুর্নামেন্ট ম্যাচ'}
            </h3>
          </div>
          <button
            onClick={onBackToMatches}
            className="text-xs font-bold text-neutral-400 hover:text-white transition-colors"
          >
            {lang === 'en' ? 'All Matches (9) →' : 'সবগুলো দেখুন (৯) →'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {MATCHES_DATA.filter(m => m.id !== match.id).slice(0, 4).map((other) => (
            <div
              key={other.id}
              onClick={() => onSelectMatch(other)}
              className="bg-neutral-900 border border-neutral-800 hover:border-rose-600 rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between space-y-3"
            >
              <div className="flex justify-between items-center text-[10px] text-neutral-400">
                <span>{other.date}</span>
                <span className="font-bold text-rose-400">{other.league}</span>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-white text-xs truncate">
                  {other.homeTeam}
                </div>
                <div className="font-bold text-neutral-400 text-xs truncate">
                  vs {other.awayTeam}
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-neutral-800 text-xs">
                <span className="font-mono font-bold text-white">
                  {other.status === 'completed' ? `${other.homeScore} - ${other.awayScore}` : other.time}
                </span>
                <span className="text-[10px] font-bold text-rose-500 uppercase">
                  {other.status === 'completed' ? 'RESULT' : 'UPCOMING'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
