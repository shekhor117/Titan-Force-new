import React, { useState, useEffect } from 'react';
import { Player, PLAYERS_DATA, TRANSLATIONS, MATCHES_DATA } from '../data/clubData';
import { PlayerPositionCard } from './PlayerPositionCard';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, Share2, Award, Shield, 
  Activity, Star, Heart, Calendar, MapPin, Footprints, Target, 
  Clock, Check, Sparkles, MessageSquare, ShoppingBag, Download,
  ExternalLink, Trophy, Flame, UserCheck, BarChart3, TrendingUp
} from 'lucide-react';

interface PlayerProfilePageProps {
  player: Player;
  lang: 'en' | 'bn';
  onBackToSquad: () => void;
  onSelectPlayer: (p: Player) => void;
  onOpenStore: () => void;
  onNavigateToMatch: (matchId: string) => void;
}

export const PlayerProfilePage: React.FC<PlayerProfilePageProps> = ({
  player,
  lang,
  onBackToSquad,
  onSelectPlayer,
  onOpenStore,
  onNavigateToMatch,
}) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'attributes' | 'matches' | 'honours' | 'fan'>('bio');
  const [copiedLink, setCopiedLink] = useState(false);
  const [fanVoteRating, setFanVoteRating] = useState<number>(9.5);
  const [hasVoted, setHasVoted] = useState(false);
  const [fanMessage, setFanMessage] = useState('');
  const [messagesList, setMessagesList] = useState<Array<{ name: string; text: string; time: string }>>([
    { name: 'Tanvir Ahmed (Zakigonj)', text: 'Best player in the tournament! Proud of Mulikandi!', time: '2 hours ago' },
    { name: 'Raju Roy', text: 'Masterclass performance in the Daudpur final!', time: '1 day ago' },
    { name: 'Sylhet Football Fanatics', text: 'True leader on and off the pitch. Captain fantastic!', time: '3 days ago' },
  ]);

  const t = TRANSLATIONS[lang];

  // Scroll to top when player changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCopiedLink(false);
    setHasVoted(false);
  }, [player.id]);

  // Find previous and next player for quick cyclical navigation
  const currentIndex = PLAYERS_DATA.findIndex(p => p.id === player.id);
  const prevPlayer = PLAYERS_DATA[(currentIndex - 1 + PLAYERS_DATA.length) % PLAYERS_DATA.length];
  const nextPlayer = PLAYERS_DATA[(currentIndex + 1) % PLAYERS_DATA.length];

  // Keyboard navigation for fast scouting workflow (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowLeft') {
        onSelectPlayer(prevPlayer);
      } else if (e.key === 'ArrowRight') {
        onSelectPlayer(nextPlayer);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevPlayer, nextPlayer, onSelectPlayer]);

  const handleShare = async () => {
    const url = window.location.origin + window.location.pathname + `#player/${player.num}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${player.fullName} (#${player.num}) | Titan Force Mulikandi`,
          text: `Check out ${player.fullName}'s official player profile and stats for Titan Force Mulikandi FC!`,
          url: url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleFanVoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasVoted(true);
  };

  const handleFanMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fanMessage.trim()) return;
    setMessagesList(prev => [
      { name: 'You (Supporter)', text: fanMessage.trim(), time: 'Just now' },
      ...prev
    ]);
    setFanMessage('');
  };

  // Helper for attribute color
  const getRatingColor = (val: number) => {
    if (val >= 85) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (val >= 75) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  };

  const getBarColor = (val: number) => {
    if (val >= 85) return 'bg-emerald-500';
    if (val >= 75) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-20">
      
      {/* Breadcrumb & Navigation Sub-Header */}
      <div className="sticky top-20 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back button & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSquad}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-rose-500" />
              <span>{lang === 'en' ? 'Back to Squad' : 'স্কোয়াডে ফিরুন'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-neutral-600">/</span>
              <span>{lang === 'en' ? 'Squad Roster' : 'দলের তালিকা'}</span>
              <span className="text-neutral-600">/</span>
              <span className="text-white font-semibold truncate max-w-[200px]">
                {player.fullName} (#{player.num})
              </span>
            </div>
          </div>

          {/* Quick Prev / Next Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectPlayer(prevPlayer)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
              title={`Previous: #${prevPlayer.num} ${prevPlayer.name}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden md:inline">#{prevPlayer.num} {prevPlayer.name}</span>
            </button>

            <button
              onClick={() => onSelectPlayer(nextPlayer)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
              title={`Next: #${nextPlayer.num} ${nextPlayer.name}`}
            >
              <span className="hidden md:inline">#{nextPlayer.num} {nextPlayer.name}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Hero Showcase Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-900/60 to-neutral-950 border-b border-neutral-800 pt-10 pb-12 sm:pt-16 sm:pb-16">
        
        {/* Massive Squad Number Watermark */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none select-none absolute right-2 sm:right-10 top-0 font-display font-black text-[120px] sm:text-[220px] lg:text-[280px] leading-none text-white/[0.03] tracking-tighter"
        >
          {player.num}
        </div>

        {/* Ambient Glows */}
        <div className="pointer-events-none absolute top-10 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl -z-10" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-12">
            
            {/* Player Portrait with Captain/Position Badge */}
            <div className="relative shrink-0 group">
              <div className="w-48 h-60 sm:w-64 sm:h-80 rounded-2xl overflow-hidden bg-neutral-950 border-2 border-neutral-700 shadow-2xl relative">
                <img
                  src={player.photoUrl}
                  alt={player.fullName}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/logos/titanforce-logo.svg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                
                {/* Number Badge */}
                <div className="absolute top-3 left-3 bg-rose-600 text-white font-display text-2xl font-black px-3 py-1 rounded-lg shadow-lg border border-rose-400/40">
                  #{player.num}
                </div>

                {/* Role / Captain Tag */}
                {player.num === 17 && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 font-black text-[11px] uppercase tracking-wider px-2.5 py-1 rounded shadow-md flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>CAPTAIN</span>
                  </div>
                )}

                {/* Category & Tactical Position Badge at bottom of photo */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-neutral-900/90 backdrop-blur border border-neutral-700/80 shadow-md">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">{player.category}</span>
                    <span className="text-neutral-600">·</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-[#ff001e] text-white">
                      {player.primaryPosition}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-neutral-300 truncate max-w-[140px]" title={player.position}>
                    {player.position}
                  </span>
                </div>
              </div>
            </div>

            {/* Core Info & Title */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5" />
                <span>TITAN FORCE MULIKANDI FC</span>
                <span className="text-neutral-600">·</span>
                <span>EST. 2025</span>
              </div>

              <div>
                <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none">
                  {player.fullName}
                </h1>
                <p className="text-lg sm:text-xl text-rose-400 font-medium mt-1">
                  {player.squadRole}
                </p>
              </div>

              {/* Bio summary */}
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {player.bio}
              </p>

              {/* Physical Profile Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 text-left">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                    {lang === 'en' ? 'Age / DOB' : 'বয়স / জন্ম'}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {player.age} yrs <span className="text-xs text-neutral-400">({player.dateOfBirth.split(',')[0]})</span>
                  </div>
                </div>

                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 text-left">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                    {lang === 'en' ? 'Height & Weight' : 'উচ্চতা ও ওজন'}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {player.height.split('(')[0]} · {player.weight}
                  </div>
                </div>

                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 text-left">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                    {lang === 'en' ? 'Preferred Foot' : 'পছন্দের পা'}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {player.foot} Footed
                  </div>
                </div>

                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3 text-left">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                    {lang === 'en' ? 'Hometown' : 'নিজ এলাকা'}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5 truncate" title={player.hometown}>
                    Zakigonj, Sylhet
                  </div>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                {player.num === 17 && (
                  <button
                    onClick={onOpenStore}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-900/30 transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Order Kit 17 Shekhor (499 ৳)' : 'জার্সি কিনুন (৪৯৯ ৳)'}</span>
                  </button>
                )}

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-200 hover:text-white font-semibold text-xs transition-colors"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-neutral-400" />}
                  <span>{copiedLink ? (lang === 'en' ? 'Link Copied!' : 'লিঙ্ক কপি হয়েছে!') : (lang === 'en' ? 'Share Profile' : 'শেয়ার করুন')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('fan')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-rose-500 text-neutral-200 hover:text-white font-semibold text-xs transition-colors"
                >
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'en' ? 'Rate Player' : 'রেটিং দিন'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Season 2026 KPI Stats Ribbon */}
      <section className="bg-neutral-900/90 border-b border-neutral-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            
            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-3.5 text-center">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                {lang === 'en' ? 'Matches' : 'ম্যাচ'}
              </div>
              <div className="font-display text-3xl font-black text-white mt-1 tabular-nums">
                {player.appearances}
              </div>
              <div className="text-[10px] text-neutral-400">
                {player.minutesPlayed} {lang === 'en' ? 'mins' : 'মিনিট'}
              </div>
            </div>

            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-3.5 text-center">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                {lang === 'en' ? 'Goals' : 'গোল'}
              </div>
              <div className="font-display text-3xl font-black text-rose-500 mt-1 tabular-nums">
                {player.goals}
              </div>
              <div className="text-[10px] text-neutral-400">
                {lang === 'en' ? '2026 Season' : '২০২৬ মৌসুম'}
              </div>
            </div>

            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-3.5 text-center">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                {lang === 'en' ? 'Assists' : 'অ্যাসিস্ট'}
              </div>
              <div className="font-display text-3xl font-black text-white mt-1 tabular-nums">
                {player.assists}
              </div>
              <div className="text-[10px] text-neutral-400">
                {lang === 'en' ? 'Key passes' : 'কি পাস'}
              </div>
            </div>

            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-3.5 text-center">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                {player.category === 'GK' ? (lang === 'en' ? 'Saves' : 'সেভ') : (lang === 'en' ? 'Pass Acc.' : 'পাস নির্ভুলতা')}
              </div>
              <div className="font-display text-3xl font-black text-white mt-1 tabular-nums">
                {player.category === 'GK' ? player.saves || 28 : `${player.passAccuracy}%`}
              </div>
              <div className="text-[10px] text-neutral-400">
                {player.category === 'GK' ? 'Crucial stops' : 'Distribution'}
              </div>
            </div>

            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-3.5 text-center">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                {player.category === 'GK' ? (lang === 'en' ? 'Clean Sheets' : 'ক্লিন শিট') : (lang === 'en' ? 'Tackles Won' : 'ট্যাকল জয়')}
              </div>
              <div className="font-display text-3xl font-black text-white mt-1 tabular-nums">
                {player.category === 'GK' ? player.cleanSheets || 4 : player.tacklesWon}
              </div>
              <div className="text-[10px] text-neutral-400">
                {player.category === 'GK' ? 'Shutouts' : `${player.interceptions} Int.`}
              </div>
            </div>

            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-3.5 text-center">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                {lang === 'en' ? 'MOTM Awards' : 'সেরা খেলোয়াড়'}
              </div>
              <div className="font-display text-3xl font-black text-amber-400 mt-1 tabular-nums flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-amber-400" />
                <span>{player.motmAwards}</span>
              </div>
              <div className="text-[10px] text-neutral-400">
                {lang === 'en' ? 'Match Winner' : 'ম্যাচ উইনার'}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 border-b border-neutral-800 overflow-x-auto pb-2 scrollbar-none">
          
          <button
            onClick={() => setActiveTab('bio')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'bio'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{lang === 'en' ? 'Biography & Style' : 'জীবনী ও খেলার ধরন'}</span>
          </button>

          <button
            onClick={() => setActiveTab('attributes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'attributes'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{lang === 'en' ? 'Technical Attributes' : 'দক্ষতা ও রেটিং'}</span>
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'matches'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{lang === 'en' ? 'Match Log (2026)' : 'ম্যাচ লগ (২০২৬)'}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-neutral-800 text-neutral-300">
              {player.recentMatches.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('honours')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'honours'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>{lang === 'en' ? 'Trophies & Honours' : 'শিরোপা ও সম্মাননা'}</span>
          </button>

          <button
            onClick={() => setActiveTab('fan')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'fan'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>{lang === 'en' ? 'Fan Zone & Cheer' : 'ফ্যান জোন ও শুভেচ্ছা'}</span>
          </button>

        </div>
      </section>

      {/* Tab Contents */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: BIOGRAPHY & SCOUTING REPORT */}
        {activeTab === 'bio' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Scouting story & narrative */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-widest">
                  <Flame className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Player Profile & Background' : 'খেলোয়াড়ের পরিচিতি ও প্রেক্ষাপট'}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  {lang === 'en' ? `The Journey of ${player.fullName}` : `${player.fullName}-এর ফুটবল যাত্রা`}
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {player.bio}
                </p>

                <div className="border-l-4 border-rose-600 pl-4 py-1 italic text-neutral-300 text-sm bg-neutral-950/40 rounded-r-xl p-3">
                  "{player.num === 17 
                    ? 'Football in Zakigonj is not just a game; it is our identity. Every time we step onto the pitch with Titan Force, we fight for our community and our home.' 
                    : `Giving 100% commitment for Titan Force Mulikandi and making our supporters proud in Sylhet.`}"
                  <div className="not-italic font-bold text-xs text-rose-400 mt-2">
                    — {player.fullName} (#{player.num})
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    {lang === 'en' ? 'Scout Analysis & Tactical Strengths' : 'স্কাউট মূল্যায়ন ও ট্যাকটিক্যাল শক্তি'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block">
                          {player.category === 'DEF' ? 'Defensive Leadership & Timing' : player.category === 'MID' ? 'Vision & Tempo Control' : player.category === 'GK' ? 'Reflexes & Command of Area' : 'Finishing & Pressing'}
                        </span>
                        <span className="text-neutral-400">
                          {player.category === 'DEF' ? 'Exceptional spatial awareness and crucial block percentage in high-pressure tournaments.' : 'Consistent distribution rate and quick transition from defense to attack.'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block">
                          {lang === 'en' ? 'Physical Stamina' : 'শারীরিক সক্ষমতা'}
                        </span>
                        <span className="text-neutral-400">
                          {lang === 'en' ? `Maintains peak sprint intensity through all ${player.minutesPlayed} minutes played this season.` : `পুরো ৯০ মিনিট মাঠ জুড়ে লড়াই করার অদম্য শক্তি ও উদ্যম।`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Club Records & Milestones */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h4 className="font-display text-xl font-black uppercase text-white tracking-wide flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>{lang === 'en' ? 'Milestones & Club Honours' : 'মাইলফলক ও অর্জন'}</span>
                </h4>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                        🏆
                      </div>
                      <div>
                        <div className="font-bold text-white">Daudpur Tournament 2026 Champion</div>
                        <div className="text-neutral-400">August 4, 2026 · Daudpur Stadium Final (1-0 vs Rising Titans)</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-amber-500/10 text-amber-400">
                      Trophy
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-bold">
                        ⭐
                      </div>
                      <div>
                        <div className="font-bold text-white">Founding Squad Member 2025</div>
                        <div className="text-neutral-400">Joined at club inauguration in Mulikandi, Zakigonj</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-rose-500/10 text-rose-400">
                      Inaugural
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Col: Pitch Position Heatmap & Quick Bio Box */}
            <div className="space-y-6">
              
              {/* Sofascore-style Real Football Tactical Position Card */}
              <PlayerPositionCard player={player} lang={lang} />

              {/* Fast Bio Summary */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {lang === 'en' ? 'Registration Data' : 'নিবন্ধন তথ্য'}
                </h4>
                
                <div className="divide-y divide-neutral-800 text-xs">
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-400">{lang === 'en' ? 'Club Status' : 'ক্লাব মর্যাদা'}</span>
                    <span className="text-white font-medium">{player.squadRole}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-400">{lang === 'en' ? 'Contract Joined' : 'যোগদানের সময়'}</span>
                    <span className="text-white font-medium">{player.joinedDate}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-400">{lang === 'en' ? 'Discipline' : 'কার্ড'}</span>
                    <span className="text-white font-medium">
                      {player.yellowCards} 🟨 · {player.redCards} 🟥
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-400">{lang === 'en' ? 'Home Venue' : 'ঘরোয়া মাঠ'}</span>
                    <span className="text-white font-medium">Mulikandi High School Ground</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: TECHNICAL ATTRIBUTES & DETAILED STATS */}
        {activeTab === 'attributes' && (
          <div className="space-y-8">
            
            {/* Top 6 Core FIFA-Style Attributes */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    {lang === 'en' ? 'Core Athletic & Technical Attributes' : 'মূল অ্যাথলেটিক ও ট্যাকটিক্যাল সক্ষমতা'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    {lang === 'en' ? 'Scouted ratings based on competitive 2026 tournament performance' : '২০২৬ মৌসুমের পারফরম্যান্সের ভিত্তিতে স্কাউটিং রেটিং'}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-semibold text-neutral-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 85+ Elite
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ml-2" /> 75+ Strong
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Pace */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-300">
                      {lang === 'en' ? 'Pace & Speed' : 'গতি ও ক্ষিপ্রতা (PAC)'}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-bold border ${getRatingColor(player.stats.pace)}`}>
                      {player.stats.pace}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(player.stats.pace)}`} style={{ width: `${player.stats.pace}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-400 pt-1">
                    <span>Acceleration: {player.detailedStats.acceleration}</span>
                    <span>Sprint: {player.detailedStats.sprintSpeed}</span>
                  </div>
                </div>

                {/* Shooting */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-300">
                      {lang === 'en' ? 'Shooting & Finishing' : 'শুটিং ও ফিনিশিং (SHO)'}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-bold border ${getRatingColor(player.stats.shooting)}`}>
                      {player.stats.shooting}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(player.stats.shooting)}`} style={{ width: `${player.stats.shooting}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-400 pt-1">
                    <span>Finishing: {player.detailedStats.finishing}</span>
                    <span>Shot Power: {player.detailedStats.shotPower}</span>
                  </div>
                </div>

                {/* Passing */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-300">
                      {lang === 'en' ? 'Passing & Vision' : 'পাসিং ও ভিশন (PAS)'}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-bold border ${getRatingColor(player.stats.passing)}`}>
                      {player.stats.passing}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(player.stats.passing)}`} style={{ width: `${player.stats.passing}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-400 pt-1">
                    <span>Vision: {player.detailedStats.vision}</span>
                    <span>Short Pass: {player.detailedStats.shortPassing}</span>
                  </div>
                </div>

                {/* Dribbling */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-300">
                      {lang === 'en' ? 'Dribbling & Agility' : 'ড্রিবলিং ও নিয়ন্ত্রণ (DRI)'}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-bold border ${getRatingColor(player.stats.dribbling)}`}>
                      {player.stats.dribbling}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(player.stats.dribbling)}`} style={{ width: `${player.stats.dribbling}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-400 pt-1">
                    <span>Ball Control: {player.detailedStats.ballControl}</span>
                    <span>Agility: {player.detailedStats.agility}</span>
                  </div>
                </div>

                {/* Defending */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-300">
                      {lang === 'en' ? 'Defending & Tackling' : 'রক্ষণভাগ ও ট্যাকলিং (DEF)'}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-bold border ${getRatingColor(player.stats.defending)}`}>
                      {player.stats.defending}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(player.stats.defending)}`} style={{ width: `${player.stats.defending}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-400 pt-1">
                    <span>Tackle: {player.detailedStats.standingTackle}</span>
                    <span>Interception: {player.detailedStats.interceptions}</span>
                  </div>
                </div>

                {/* Physical */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-300">
                      {lang === 'en' ? 'Physicality & Stamina' : 'শারীরিক শক্তি ও দম (PHY)'}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-bold border ${getRatingColor(player.stats.physical)}`}>
                      {player.stats.physical}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(player.stats.physical)}`} style={{ width: `${player.stats.physical}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-400 pt-1">
                    <span>Stamina: {player.detailedStats.stamina}</span>
                    <span>Strength: {player.detailedStats.strength}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* 12 Sub-Attributes Detailed Matrix */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h4 className="font-display text-xl font-black uppercase text-white tracking-wide">
                {lang === 'en' ? 'Detailed Technical Matrix (12 Parameters)' : 'বিস্তারিত ১২টি ট্যাকটিক্যাল সূচক'}
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
                {Object.entries(player.detailedStats).map(([key, val]) => {
                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-3 flex items-center justify-between">
                      <span className="text-neutral-400">{formattedKey}</span>
                      <span className={`font-bold font-mono px-2 py-0.5 rounded ${getRatingColor(val)}`}>
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: MATCH-BY-MATCH LOG (WITH DIRECT LINKS TO MATCH DETAILS) */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    {lang === 'en' ? '2026 Competitive Match Log' : '২০২৬ মৌসুমের ম্যাচ লগ'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    {lang === 'en' 
                      ? 'Detailed breakdown of appearances, ratings, and decisive match moments. Click any match to view full match details.' 
                      : 'প্রতিটি ম্যাচের পারফরম্যান্স, মিনিট ও রেটিং। বিস্তারিত দেখতে যেকোনো ম্যাচে ক্লিক করুন।'}
                  </p>
                </div>
                <div className="text-xs text-neutral-400 font-semibold">
                  {player.recentMatches.length} {lang === 'en' ? 'Matches Logged' : 'ম্যাচ খেলা হয়েছে'}
                </div>
              </div>

              {/* Responsive Match Log Table */}
              <div className="overflow-x-auto rounded-xl border border-neutral-800">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-950 text-neutral-400 font-bold uppercase tracking-wider text-[11px] border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">{lang === 'en' ? 'Date' : 'তারিখ'}</th>
                      <th className="py-3 px-4">{lang === 'en' ? 'Opponent & Event' : 'প্রতিপক্ষ ও খেলা'}</th>
                      <th className="py-3 px-4 text-center">{lang === 'en' ? 'Score' : 'ফলাফল'}</th>
                      <th className="py-3 px-4 text-center">{lang === 'en' ? 'Mins' : 'মিনিট'}</th>
                      <th className="py-3 px-4 text-center">{lang === 'en' ? 'G / A' : 'গোল/অ্যাসিস্ট'}</th>
                      <th className="py-3 px-4 text-center">{lang === 'en' ? 'Rating' : 'রেটিং'}</th>
                      <th className="py-3 px-4">{lang === 'en' ? 'Scout Performance Notes' : 'মন্তব্য'}</th>
                      <th className="py-3 px-4 text-right">{lang === 'en' ? 'Action' : 'অ্যাকশন'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80 bg-neutral-900/60 font-medium">
                    {player.recentMatches.map((m, idx) => {
                      // Attempt to link with matched MATCHES_DATA
                      const matchedGame = MATCHES_DATA.find(game => 
                        game.date === m.date || 
                        game.awayTeam.toLowerCase().includes(m.opponent.toLowerCase()) ||
                        m.opponent.toLowerCase().includes(game.awayTeam.toLowerCase())
                      );

                      return (
                        <tr 
                          key={idx}
                          className="hover:bg-neutral-800/50 transition-colors group cursor-pointer"
                          onClick={() => {
                            if (matchedGame) onNavigateToMatch(matchedGame.id);
                            else onNavigateToMatch('m4'); // default championship final
                          }}
                        >
                          <td className="py-3.5 px-4 whitespace-nowrap text-neutral-400 font-mono">
                            {m.date}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                            vs {m.opponent}
                          </td>
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-mono">
                              {m.score}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono">
                            {m.minutes}'
                          </td>
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span className="font-bold text-white">{m.goals}G</span> / <span className="text-neutral-400">{m.assists}A</span>
                          </td>
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span className="font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono">
                              ★ {m.rating.toFixed(1)}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-neutral-300 max-w-xs truncate" title={m.notes}>
                            {m.notes}
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 font-bold group-hover:underline">
                              <span>{lang === 'en' ? 'Details' : 'বিস্তারিত'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: HONOURS & TROPHIES */}
        {activeTab === 'honours' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Daudpur Champions Showcase */}
            <div className="bg-gradient-to-br from-amber-950/40 via-neutral-900 to-neutral-950 border border-amber-600/30 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl">
                🏆
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Major Honours
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Daudpur Tournament 2026 Champion
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {player.num === 17
                  ? 'Led Titan Force Mulikandi as Captain and playmaker through an undefeated tournament run, sealing the 1-0 Grand Final victory at Daudpur Stadium with a decisive assist.'
                  : `Played a pivotal role in Titan Force's historic tournament triumph in Daudpur, anchoring the team to victory in front of 3,500 supporters.`}
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-neutral-400">
                <span>August 4, 2026</span>
                <span>·</span>
                <span>Daudpur Stadium</span>
              </div>
            </div>

            {/* Individual Accolades */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-3xl">
                ⭐
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Individual Accolades
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                {player.motmAwards}x Man of the Match Awards
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Voted official Man of the Match in competitive tournament fixtures for outstanding playmaking, decisive goals, and defensive stewardship.
              </p>
              <div className="pt-2 text-xs text-neutral-400">
                Season 2026 Official DFA Recognitions
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: FAN ZONE & CHEER WALL */}
        {activeTab === 'fan' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Community Rating Box */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-500">
                  {lang === 'en' ? 'Fan Power Index' : 'ফ্যান পাওয়ার রেটিং'}
                </div>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                  {lang === 'en' ? `Rate ${player.name}'s Season` : `${player.name}-কে রেটিং দিন`}
                </h3>
                <p className="text-xs text-neutral-400">
                  {lang === 'en' ? 'Your rating contributes to the official Titan Supporter Index.' : 'আপনার মূল্যবান রেটিং ক্লাবের অফিশিয়াল সূচকে যুক্ত হবে।'}
                </p>
              </div>

              {hasVoted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <div className="text-3xl">🎉</div>
                  <div className="font-bold text-white text-base">
                    {lang === 'en' ? 'Vote Recorded!' : 'ভোট সফলভাবে জমা হয়েছে!'}
                  </div>
                  <div className="text-xs text-emerald-400">
                    {lang === 'en' ? `You awarded ${player.name} a ${fanVoteRating}/10 rating.` : `আপনি ${player.name}-কে ১০ এ ${fanVoteRating} রেটিং দিয়েছেন।`}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFanVoteSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-300 font-medium">{lang === 'en' ? 'Select Rating' : 'রেটিং নির্বাচন করুন'}:</span>
                      <span className="font-display text-2xl font-black text-amber-400">
                        {fanVoteRating} <span className="text-xs text-neutral-400">/ 10</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min="7.0"
                      max="10.0"
                      step="0.1"
                      value={fanVoteRating}
                      onChange={(e) => setFanVoteRating(parseFloat(e.target.value))}
                      className="w-full accent-rose-600 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-500">
                      <span>7.0 Good</span>
                      <span>8.5 Great</span>
                      <span>10.0 World-Class</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-colors"
                  >
                    {lang === 'en' ? 'Submit Official Fan Rating' : 'রেটিং জমা দিন'}
                  </button>
                </form>
              )}

              {/* Fan Wall Message Form */}
              <div className="pt-4 border-t border-neutral-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  {lang === 'en' ? `Send a Message of Support to #${player.num}` : `#${player.num}-এর জন্য শুভেচ্ছা বার্তা`}
                </h4>

                <form onSubmit={handleFanMessageSubmit} className="space-y-3">
                  <textarea
                    value={fanMessage}
                    onChange={(e) => setFanMessage(e.target.value)}
                    placeholder={lang === 'en' ? `Write an encouraging message to ${player.name}...` : `${player.name}-এর জন্য একটি অনুপ্রেরণাদায়ক বার্তা লিখুন...`}
                    rows={3}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-rose-500 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={!fanMessage.trim()}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
                    <span>{lang === 'en' ? 'Post Message' : 'বার্তা পোস্ট করুন'}</span>
                  </button>
                </form>
              </div>

            </div>

            {/* Supporter Cheers Wall */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-xl font-black uppercase text-white tracking-wide">
                  {lang === 'en' ? 'Supporters Cheer Wall' : 'সমর্থকদের ওয়াল'}
                </h4>
                <span className="text-xs text-rose-400 font-semibold">
                  {messagesList.length} {lang === 'en' ? 'Messages' : 'বার্তা'}
                </span>
              </div>

              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin">
                {messagesList.map((msg, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{msg.name}</span>
                      <span className="text-[10px] text-neutral-400">{msg.time}</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      "{msg.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </section>

      {/* Explore Rest of Squad Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-neutral-800 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-500">
              {lang === 'en' ? 'Team Roster' : 'দলীয় সদস্য'}
            </div>
            <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
              {lang === 'en' ? 'Explore Other Squad Members' : 'অন্যান্য খেলোয়াড়দের প্রোফাইল'}
            </h3>
          </div>
          <button
            onClick={onBackToSquad}
            className="text-xs font-bold text-neutral-400 hover:text-white transition-colors"
          >
            {lang === 'en' ? 'View All (10) →' : 'সবগুলো দেখুন (১০) →'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {PLAYERS_DATA.filter(p => p.id !== player.id).slice(0, 5).map((other) => (
            <div
              key={other.id}
              onClick={() => onSelectPlayer(other)}
              className="group bg-neutral-900 border border-neutral-800 hover:border-rose-600 rounded-xl p-3 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-neutral-950 relative mb-2">
                <img
                  src={other.photoUrl}
                  alt={other.fullName}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/logos/titanforce-logo.svg';
                  }}
                />
                <div className="absolute top-1.5 left-1.5 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  #{other.num}
                </div>
              </div>
              <div className="font-bold text-white text-xs truncate group-hover:text-rose-400 transition-colors">
                {other.fullName}
              </div>
              <div className="text-[10px] text-neutral-400">
                {other.position}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
