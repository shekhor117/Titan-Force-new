import React, { useState } from 'react';
import { Player, PLAYERS_DATA, TRANSLATIONS } from '../data/clubData';
import { PlayerPositionCard } from './PlayerPositionCard';
import { 
  X, Heart, Shield, Award, Activity, User, Calendar, MapPin, 
  TrendingUp, Star, Footprints, Target, Clock, MessageSquare, Check, Sparkles 
} from 'lucide-react';

interface SquadSectionProps {
  lang: 'en' | 'bn';
  externalSelectedPlayer?: Player | null;
  onClearExternalSelectedPlayer?: () => void;
  onViewFullProfile?: (player: Player) => void;
}

export const SquadSection: React.FC<SquadSectionProps> = ({ 
  lang, 
  externalSelectedPlayer, 
  onClearExternalSelectedPlayer,
  onViewFullProfile
}) => {
  const [filter, setFilter] = useState<'ALL' | 'GK' | 'DEF' | 'MID' | 'FWD'>('ALL');
  const [internalSelectedPlayer, setInternalSelectedPlayer] = useState<Player | null>(null);
  const [profileTab, setProfileTab] = useState<'overview' | 'stats' | 'attributes' | 'matches' | 'fan'>('overview');
  
  // Interactive Fan features state
  const [votedPlayers, setVotedPlayers] = useState<Record<number, boolean>>({});
  const [fanRatings, setFanRatings] = useState<Record<number, number>>({
    10: 9.8,
    1: 9.5,
    6: 9.2,
    7: 9.4,
    8: 9.6,
    9: 8.9,
    2: 9.0,
    3: 8.8,
    4: 9.1,
    5: 9.2
  });
  const [fanCheer, setFanCheer] = useState('');
  const [cheerSent, setCheerSent] = useState(false);
  const [playerVoteCounts, setPlayerVoteCounts] = useState<Record<number, number>>({
    10: 164, // Shekhor Mohan Roy
    1: 102,  // Shuronjit
    8: 94,   // Sajon
    6: 88,   // Shuvo
    5: 67,   // Sujon
    9: 71,   // Kourov
    7: 59,   // Sojib
    2: 56,   // Srijon
    4: 51,   // Akash
    3: 47,   // Akash
    11: 62,  // Tanvir Ahmed
    12: 45   // Joy Roy
  });

  const selectedPlayer = externalSelectedPlayer || internalSelectedPlayer;

  // Close modal on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    if (selectedPlayer) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPlayer]);

  const handleCloseModal = () => {
    setInternalSelectedPlayer(null);
    if (onClearExternalSelectedPlayer) {
      onClearExternalSelectedPlayer();
    }
    setProfileTab('overview');
    setCheerSent(false);
    setFanCheer('');
  };

  const t = TRANSLATIONS[lang];

  const filteredPlayers = filter === 'ALL' 
    ? PLAYERS_DATA 
    : PLAYERS_DATA.filter(p => p.category === filter);

  const handleVote = (playerId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (votedPlayers[playerId]) return;

    setVotedPlayers(prev => ({ ...prev, [playerId]: true }));
    setPlayerVoteCounts(prev => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + 1
    }));
  };

  const handleSendCheer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fanCheer.trim()) return;
    setCheerSent(true);
    setTimeout(() => {
      setFanCheer('');
    }, 2000);
  };

  return (
    <section id="squad" className="scroll-mt-28 sm:scroll-mt-32 py-16 sm:py-20 bg-neutral-950 border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-800">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-rose-500">
              {lang === 'en' ? 'First Team Squad · 2026 Campaign' : 'প্রথম একাদশ স্কোয়াড · ২০২৬ সিজন'}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              {t.squad.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
              {t.squad.subtitle}
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="inline-flex p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            {(['ALL', 'GK', 'DEF', 'MID', 'FWD'] as const).map((cat) => {
              const label = cat === 'ALL' 
                ? t.squad.filterAll 
                : cat === 'GK' ? t.squad.filterGk
                : cat === 'DEF' ? t.squad.filterDef
                : cat === 'MID' ? t.squad.filterMid
                : t.squad.filterFwd;

              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                    filter === cat
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Players Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => {
            const isVoted = votedPlayers[player.id];
            const voteCount = playerVoteCounts[player.id] || 0;
            const isCaptain = player.num === 17;

            return (
              <div
                key={player.id}
                onClick={() => {
                  if (onViewFullProfile) {
                    onViewFullProfile(player);
                  } else {
                    setInternalSelectedPlayer(player);
                  }
                }}
                className="group relative rounded-2xl bg-neutral-900/90 border border-neutral-800 card-interactive-glow overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                {/* Top Card Bar with Number & Role */}
                <div className="p-4 flex items-center justify-between border-b border-neutral-800/80 z-10 bg-neutral-900/60 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-2xl font-black text-rose-500 tabular-nums">
                      #{player.num}
                    </span>
                    {isCaptain && (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {lang === 'en' ? 'Captain' : 'অধিনায়ক'}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold tracking-wider uppercase text-neutral-300">
                    {player.category}
                  </span>
                </div>

                {/* Player Photo Frame */}
                <div className="relative h-64 w-full bg-gradient-to-b from-neutral-900 to-neutral-950 flex items-center justify-center overflow-hidden">
                  <img
                    src={player.photoUrl}
                    alt={player.fullName}
                    className="h-full w-auto object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-900 to-transparent" />
                </div>

                {/* Player Info Body */}
                <div className="p-4 space-y-3 bg-neutral-900/95 z-10">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white group-hover:text-rose-400 transition-colors truncate">
                        {player.fullName}
                      </h3>
                      {/* Real Football Primary Tactical Badge */}
                      <span 
                        title={`Primary Position: ${player.primaryPosition}`}
                        className="px-2 py-0.5 rounded text-[11px] font-black bg-[#ff001e] text-white shadow shrink-0"
                      >
                        {player.primaryPosition}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <p className="text-xs text-neutral-400 line-clamp-1">
                        {player.position}
                      </p>
                    </div>
                  </div>

                  {/* Clean Performance Metrics */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800 font-mono">
                    <div>
                      <span>Apps: </span>
                      <strong className="text-white tabular-nums">{player.appearances}</strong>
                    </div>
                    <span aria-hidden="true">·</span>
                    <div>
                      <span>Goals: </span>
                      <strong className="text-rose-400 tabular-nums">{player.goals}</strong>
                    </div>
                    <span aria-hidden="true">·</span>
                    <div>
                      <span>Ast: </span>
                      <strong className="text-white tabular-nums">{player.assists}</strong>
                    </div>
                  </div>

                  {/* Action & Vote Row */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onViewFullProfile) onViewFullProfile(player);
                        else setInternalSelectedPlayer(player);
                      }}
                      className="text-xs font-bold text-rose-500 hover:text-rose-400 transition-colors flex items-center gap-1 group-hover:translate-x-0.5 duration-200"
                    >
                      <span>{lang === 'en' ? 'Full Profile & Stats' : 'পূর্ণ প্রোফাইল ও তথ্য'}</span>
                      <span aria-hidden="true">→</span>
                    </button>

                    <button
                      onClick={(e) => handleVote(player.id, e)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                        isVoted
                          ? 'bg-rose-950/60 text-rose-400 border border-rose-800'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                      }`}
                      title="Vote Player"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isVoted ? 'fill-rose-500 text-rose-500' : 'text-neutral-400'}`} />
                      <span className="tabular-nums font-mono text-[11px]">{voteCount}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* ULTRA-PROFESSIONAL FULL DETAILS PLAYER PROFILE MODAL      */}
        {/* ========================================================= */}
        {selectedPlayer && (
          <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6"
            onClick={handleCloseModal}
          >
            <div className="flex min-h-full items-center justify-center py-4">
              <div 
                className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
              {/* Modal Top Banner with Close Button */}
              <div className="relative bg-gradient-to-r from-rose-950/80 via-neutral-900 to-neutral-950 p-6 sm:p-8 border-b border-neutral-800 shrink-0">
                <div className="absolute top-5 right-5 flex items-center gap-2 z-20">
                  {onViewFullProfile && (
                    <button
                      onClick={() => {
                        handleCloseModal();
                        onViewFullProfile(selectedPlayer);
                      }}
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                    >
                      <span>{lang === 'en' ? 'Open Full Profile Page' : 'পূর্ণ পাতা খুলুন'}</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  )}
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-neutral-400 hover:text-white rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 transition-colors"
                    aria-label="Close Profile"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                  {/* High-Res Player Portrait Frame */}
                  <div className="relative w-32 h-40 sm:w-36 sm:h-44 bg-neutral-950 rounded-2xl border-2 border-neutral-800 overflow-hidden flex items-center justify-center shrink-0 shadow-2xl">
                    <img
                      src={selectedPlayer.photoUrl}
                      alt={selectedPlayer.fullName}
                      className="w-full h-full object-contain object-bottom"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 font-display text-2xl font-black text-rose-500 drop-shadow">
                      #{selectedPlayer.num}
                    </div>
                  </div>

                  {/* Header Title & Role */}
                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
                      <span className="font-bold uppercase tracking-wider text-rose-500 bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/20">
                        {selectedPlayer.category}
                      </span>
                      <span className="font-semibold text-neutral-300">
                        {selectedPlayer.squadRole}
                      </span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-neutral-400 font-mono">Titan Force FC</span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
                      {selectedPlayer.fullName}
                    </h3>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-neutral-400 font-medium pt-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        {selectedPlayer.hometown}
                      </span>
                      <span>Foot: <strong className="text-white">{selectedPlayer.foot}</strong></span>
                      <span>Age: <strong className="text-white font-mono">{selectedPlayer.age}</strong></span>
                      <span>Joined: <strong className="text-white">{selectedPlayer.joinedDate}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Modal Sub-Navigation Tabs */}
                <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-neutral-800/80">
                  {[
                    { id: 'overview', label: 'Overview & Bio' },
                    { id: 'stats', label: '2026 Match Stats' },
                    { id: 'attributes', label: 'Technical Attributes' },
                    { id: 'matches', label: 'Match Log' },
                    { id: 'fan', label: 'Fan Zone & Rating' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setProfileTab(tab.id as any)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        profileTab === tab.id
                          ? 'bg-rose-600 text-white shadow'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Tab Content Body */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
                
                {/* TAB 1: OVERVIEW & BIOGRAPHICAL DOSSIER */}
                {profileTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Bio Paragraph */}
                    <div className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-2">
                      <div className="font-bold text-white uppercase text-xs tracking-wider flex items-center gap-2">
                        <User className="w-4 h-4 text-rose-500" />
                        <span>Player Biography & Tactical Profile</span>
                      </div>
                      <p>{selectedPlayer.bio}</p>
                    </div>

                    {/* Dossier Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
                        <div className="text-neutral-500 uppercase text-[10px] font-semibold">Height</div>
                        <div className="font-bold text-white font-mono">{selectedPlayer.height}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
                        <div className="text-neutral-500 uppercase text-[10px] font-semibold">Weight</div>
                        <div className="font-bold text-white font-mono">{selectedPlayer.weight}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
                        <div className="text-neutral-500 uppercase text-[10px] font-semibold">Date of Birth</div>
                        <div className="font-bold text-white">{selectedPlayer.dateOfBirth}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
                        <div className="text-neutral-500 uppercase text-[10px] font-semibold">Contract / Role</div>
                        <div className="font-bold text-rose-400 truncate">{selectedPlayer.position}</div>
                      </div>
                    </div>

                    {/* Real Football Sofascore-style Tactical Position Card */}
                    <PlayerPositionCard player={selectedPlayer} lang={lang} />

                    {/* Primary FIFA Style Hexagon Attribute Bars */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                        Primary Athletic Index (EA FC Pro Attributes)
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Object.entries(selectedPlayer.stats).map(([k, v]) => (
                          <div key={k} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="uppercase text-neutral-400 font-semibold">{k}</span>
                              <span className="font-mono font-bold text-white tabular-nums">{v}</span>
                            </div>
                            <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-rose-600 rounded-full"
                                style={{ width: `${v}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: DEEP PERFORMANCE STATS */}
                {profileTab === 'stats' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                        <div className="text-neutral-500 text-xs font-semibold uppercase">Matches</div>
                        <div className="font-display text-3xl font-black text-white font-mono tabular-nums">
                          {selectedPlayer.appearances}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                        <div className="text-neutral-500 text-xs font-semibold uppercase">Minutes</div>
                        <div className="font-display text-3xl font-black text-white font-mono tabular-nums">
                          {selectedPlayer.minutesPlayed}'
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                        <div className="text-neutral-500 text-xs font-semibold uppercase">Goals</div>
                        <div className="font-display text-3xl font-black text-rose-500 font-mono tabular-nums">
                          {selectedPlayer.goals}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                        <div className="text-neutral-500 text-xs font-semibold uppercase">Assists</div>
                        <div className="font-display text-3xl font-black text-white font-mono tabular-nums">
                          {selectedPlayer.assists}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                        <h5 className="font-bold text-white uppercase">Passing & Possession</h5>
                        <div className="flex justify-between py-1 border-b border-neutral-800">
                          <span className="text-neutral-400">Pass Completion Rate:</span>
                          <strong className="text-white font-mono">{selectedPlayer.passAccuracy}%</strong>
                        </div>
                        <div className="flex justify-between py-1 border-b border-neutral-800">
                          <span className="text-neutral-400">Key Passes / Match:</span>
                          <strong className="text-white font-mono">{(selectedPlayer.assists * 1.8).toFixed(1)}</strong>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-neutral-400">MOTM Awards:</span>
                          <strong className="text-amber-400 font-mono">{selectedPlayer.motmAwards} 🏆</strong>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                        <h5 className="font-bold text-white uppercase">Defensive Work & Fair Play</h5>
                        <div className="flex justify-between py-1 border-b border-neutral-800">
                          <span className="text-neutral-400">Tackles Won:</span>
                          <strong className="text-white font-mono">{selectedPlayer.tacklesWon}</strong>
                        </div>
                        <div className="flex justify-between py-1 border-b border-neutral-800">
                          <span className="text-neutral-400">Interceptions:</span>
                          <strong className="text-white font-mono">{selectedPlayer.interceptions}</strong>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-neutral-400">Discipline:</span>
                          <strong className="text-neutral-200 font-mono">
                            {selectedPlayer.yellowCards} 🟨 · {selectedPlayer.redCards} 🟥
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: DETAILED ATTRIBUTES BREAKDOWN */}
                {profileTab === 'attributes' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Sub-Attribute Micro Breakdown
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(selectedPlayer.detailedStats).map(([key, val]) => (
                        <div key={key} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/90 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="capitalize text-neutral-400 text-[11px] truncate">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <span className="font-mono font-bold text-white tabular-nums">{val}</span>
                          </div>
                          <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${val >= 85 ? 'bg-emerald-500' : val >= 75 ? 'bg-rose-500' : 'bg-neutral-600'}`}
                              style={{ width: `${val}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: MATCH LOG */}
                {profileTab === 'matches' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Recent Match Performance Log
                    </h4>

                    <div className="space-y-3">
                      {selectedPlayer.recentMatches.map((match, idx) => (
                        <div 
                          key={idx}
                          className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{match.opponent}</span>
                              <span className="font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                                {match.score}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-400 font-mono text-[11px]">
                              <span>{match.date}</span>
                              <span>·</span>
                              <span>{match.minutes}' mins</span>
                              <span>·</span>
                              <span className="text-amber-400 font-bold">★ {match.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs text-neutral-400 italic">
                            "{match.notes}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 5: FAN ZONE & CHEER */}
                {profileTab === 'fan' && (
                  <div className="space-y-6">
                    {/* Live Fan Rating */}
                    <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-bold text-white text-xs uppercase">
                            Fan Rating Consensus
                          </h5>
                          <p className="text-xs text-neutral-400">
                            Based on community ratings across Sylhet supporters
                          </p>
                        </div>
                        <div className="font-display text-3xl font-black text-amber-400 font-mono tabular-nums">
                          ★ {(fanRatings[selectedPlayer.id] || 9.2).toFixed(1)} / 10
                        </div>
                      </div>

                      {/* Interactive Slider */}
                      <div className="space-y-1 pt-2">
                        <label className="text-xs text-neutral-300 font-semibold flex justify-between">
                          <span>Submit Your Matchday Rating:</span>
                          <span className="text-rose-400 font-mono font-bold">
                            {(fanRatings[selectedPlayer.id] || 9.2).toFixed(1)} Stars
                          </span>
                        </label>
                        <input
                          type="range"
                          min="7.0"
                          max="10.0"
                          step="0.1"
                          value={fanRatings[selectedPlayer.id] || 9.2}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setFanRatings(prev => ({ ...prev, [selectedPlayer.id]: val }));
                          }}
                          className="w-full accent-rose-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Send Cheer Form */}
                    <form onSubmit={handleSendCheer} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                      <h5 className="font-bold text-white text-xs uppercase flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-rose-500" />
                        <span>Send Cheer Message to {selectedPlayer.name}</span>
                      </h5>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={fanCheer}
                          onChange={(e) => setFanCheer(e.target.value)}
                          placeholder="e.g. Keep dominating the midfield, Captain!"
                          className="flex-1 px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:border-rose-600 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase transition-colors shrink-0"
                        >
                          Send Cheer
                        </button>
                      </div>

                      {cheerSent && (
                        <div className="p-2.5 rounded bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          <span>Cheer posted to Titan Force dressing room wall!</span>
                        </div>
                      )}
                    </form>
                  </div>
                )}
              </div>

              {/* Modal Fixed Footer with Vote CTA */}
              <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Daudpur 2026 Gold Medalist</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleVote(selectedPlayer.id)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      votedPlayers[selectedPlayer.id]
                        ? 'bg-rose-950/80 text-rose-400 border border-rose-800'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>
                      {votedPlayers[selectedPlayer.id] ? t.squad.voted : t.squad.votePlayer} (
                      <span className="font-mono tabular-nums">{playerVoteCounts[selectedPlayer.id] || 0}</span>
                      )
                    </span>
                  </button>

                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold uppercase"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </section>
  );
};
