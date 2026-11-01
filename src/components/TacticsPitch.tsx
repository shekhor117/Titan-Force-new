import React, { useState } from 'react';
import { PLAYERS_DATA, Player } from '../data/clubData';
import { 
  TACTICAL_FORMATS_DATA, 
  PlayerCount, 
  TacticalFormation, 
  FormationPlayerNode 
} from '../data/tacticalFormationsData';
import { 
  Crosshair, Award, Shield, Sparkles, ChevronRight, 
  TrendingUp, Users, Compass, Eye, CheckCircle2, AlertTriangle, ArrowRight, Activity
} from 'lucide-react';

interface TacticsPitchProps {
  lang: 'en' | 'bn';
  onSelectPlayer: (player: Player) => void;
}

export const TacticsPitch: React.FC<TacticsPitchProps> = ({ lang, onSelectPlayer }) => {
  // Player Count selection (5, 6, 7, 8, 9, 10, 11)
  const [selectedCount, setSelectedCount] = useState<PlayerCount>(7); // Default to 7 (Daudpur Tournament Winning Format)
  
  // Format group
  const currentFormatGroup = TACTICAL_FORMATS_DATA[selectedCount];
  
  // Active formation id within that group
  const [selectedFormationId, setSelectedFormationId] = useState<string>(
    currentFormatGroup.formations[0].id
  );

  // Inspector card: hovered or clicked player
  const [hoveredPlayer, setHoveredPlayer] = useState<Player | null>(null);
  
  // Strategy tab: 'doctrine' | 'captain' | 'metrics'
  const [strategyTab, setStrategyTab] = useState<'doctrine' | 'captain' | 'metrics'>('doctrine');

  // Handle format count switch
  const handleSelectCount = (count: PlayerCount) => {
    setSelectedCount(count);
    const newGroup = TACTICAL_FORMATS_DATA[count];
    if (newGroup && newGroup.formations.length > 0) {
      setSelectedFormationId(newGroup.formations[0].id);
    }
  };

  // Find the active formation object
  const activeFormation: TacticalFormation = 
    currentFormatGroup.formations.find(f => f.id === selectedFormationId) ||
    currentFormatGroup.formations[0];

  // Resolve starting players on pitch and bench substitutes
  const startingPlayerNums = activeFormation.startingXI;
  const startersOnPitch: { player: Player; node: FormationPlayerNode }[] = [];
  const substitutesOnBench: Player[] = [];

  PLAYERS_DATA.forEach((player) => {
    const node = activeFormation.positions.find(p => p.playerNum === player.num);
    if (node && startingPlayerNums.includes(player.num)) {
      startersOnPitch.push({ player, node });
    } else {
      substitutesOnBench.push(player);
    }
  });

  const playerCountTabs: PlayerCount[] = [5, 6, 7, 8, 9, 10, 11];

  return (
    <section id="tactics" className="py-12 sm:py-20 bg-neutral-950 border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ========================================================
            1. SECTION HEADER
            ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-rose-500 flex items-center gap-2">
              <Crosshair className="w-4 h-4" />
              <span>{lang === 'en' ? 'Tactical Command & Formation Engine' : 'রণকৌশল ও ফর্মেশন ইঞ্জিন'}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-amber-400 font-mono text-[11px]">5 TO 11 PLAYERS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              {lang === 'en' ? 'Matchday Strategy & Pitch Formations' : 'মাঠের রণকৌশল ও ফর্মেশন সেটআপ'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
              {lang === 'en'
                ? 'Dynamic tactical deployments engineered by Captain Shekhor Mohan Roy. Switch between 5-a-side futsal, tournament 7s, and full 11-a-side matches with realistic player placements from the official 12-man squad.'
                : 'অধিনায়ক শেখর মোহন রায়ের প্রণীত রণকৌশল। ৫ জনের মিনি পিচ, ৭ জনের টুর্নামেন্ট চ্যাম্পিয়নশিপ থেকে ১১ জনের পূর্ণাঙ্গ ফুটবল ম্যাচ পর্যন্ত কৌশল দেখুন।'}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center gap-4 text-xs shrink-0 shadow-sm">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-bold block">{lang === 'en' ? 'Active Squad' : 'স্কোয়াড'}</span>
              <span className="font-display font-black text-white text-base">12 {lang === 'en' ? 'Registered' : 'জন'}</span>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-bold block">{lang === 'en' ? 'On Pitch' : 'মাঠে'}</span>
              <span className="font-display font-black text-rose-500 text-base">{selectedCount} {lang === 'en' ? 'Starters' : 'জন'}</span>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-bold block">{lang === 'en' ? 'Bench Reserves' : 'বেঞ্চে'}</span>
              <span className="font-display font-black text-neutral-300 text-base">{12 - selectedCount} {lang === 'en' ? 'Subs' : 'জন'}</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. PLAYER COUNT SELECTOR (5 to 11 PLAYERS)
            ======================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider px-1">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-rose-500" />
              <span>{lang === 'en' ? 'Select Match Format / Player Count:' : 'ম্যাচ ফরম্যাট ও খেলোয়াড় সংখ্যা নির্বাচন:'}</span>
            </span>
            <span className="text-neutral-500 text-[11px] font-mono">
              {currentFormatGroup.recommendedPitchEn}
            </span>
          </div>

          {/* Horizontal Segmented Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {playerCountTabs.map((count) => {
              const isSelected = selectedCount === count;
              const isTournament = count === 7;
              const isFullXI = count === 11;

              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => handleSelectCount(count)}
                  className={`relative p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-rose-600/15 border-rose-500 text-white shadow-lg ring-1 ring-rose-500/50'
                      : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  {/* Badge indicator */}
                  {isTournament && (
                    <span className="absolute -top-2 right-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-500 text-neutral-950 shadow">
                      🏆 2026 Cup
                    </span>
                  )}
                  {isFullXI && (
                    <span className="absolute -top-2 right-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-rose-600 text-white shadow">
                      Full XI
                    </span>
                  )}

                  <div className="flex items-baseline justify-between">
                    <span className="font-display font-black text-xl text-white">
                      {count} <span className="text-xs font-normal text-neutral-400">{lang === 'en' ? 'Players' : 'জন'}</span>
                    </span>
                  </div>

                  <div className="text-[11px] font-semibold text-neutral-300 truncate mt-1">
                    {count === 5 ? (lang === 'en' ? 'Futsal 5s' : 'ফুটসাল ৫') :
                     count === 6 ? (lang === 'en' ? 'Arena 6s' : 'অ্যারেনা ৬') :
                     count === 7 ? (lang === 'en' ? 'Tournament 7s' : 'টুর্নামেন্ট ৭') :
                     count === 8 ? (lang === 'en' ? 'Midfield 8s' : 'মিডফিল্ড ৮') :
                     count === 9 ? (lang === 'en' ? 'Open 9s' : 'উন্মুক্ত ৯') :
                     count === 10 ? (lang === 'en' ? 'Tactical 10s' : 'ট্যাকটিক্যাল ১০') :
                     (lang === 'en' ? 'Full Match 11s' : 'পূর্ণ একাদশ ১১')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            3. SPECIFIC FORMATION TOGGLE FOR SELECTED COUNT
            ======================================================== */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span>{lang === 'en' ? currentFormatGroup.nameEn : currentFormatGroup.nameBn}</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-300">
              {lang === 'en' ? currentFormatGroup.subtitleEn : currentFormatGroup.subtitleBn}
            </div>
          </div>

          {/* Formations button group */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase text-neutral-500 mr-1">
              {lang === 'en' ? 'Shape:' : 'গঠন:'}
            </span>
            {currentFormatGroup.formations.map((fmt) => {
              const isActive = selectedFormationId === fmt.id;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setSelectedFormationId(fmt.id)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-lg ring-1 ring-rose-400 font-black'
                      : 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span className="font-mono">{fmt.code}</span>
                  <span className="hidden sm:inline text-[11px] opacity-80">{fmt.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            4. TACTICAL PITCH (LEFT) & STRATEGY / SPOTLIGHT (RIGHT)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tactical Pitch (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* The Pitch Container with User's Uploaded Tactical Board Background */}
            <div className="relative w-full max-w-[580px] mx-auto aspect-[3/4] rounded-3xl bg-[#1b3d27] border-2 border-emerald-800/80 shadow-2xl overflow-hidden select-none">
              
              {/* Tactical Board Background Image */}
              <img 
                src="/assets/aistudio/tactical-board__1__4dfcd60c.png" 
                alt="Tactical Board Pitch Background" 
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
              />

              {/* Watermark Crest in Center Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
                <img 
                  src="/logos/titanforce-logo.svg" 
                  alt="Titan Force" 
                  className="w-24 sm:w-28 h-24 sm:h-28 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Active Formation Banner Tag on Top Left of Pitch */}
              <div className="absolute top-3 left-4 z-10 flex items-center gap-2 bg-neutral-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-700/80 shadow">
                <span className="font-display font-black text-rose-500 text-sm">{activeFormation.code}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-[11px] font-bold text-white uppercase">{selectedCount} {lang === 'en' ? 'Players' : 'জন'}</span>
                <span className="hidden sm:inline text-neutral-500">·</span>
                <span className="hidden sm:inline text-[10px] text-amber-400 font-semibold">{activeFormation.categoryTag}</span>
              </div>

              {/* Player Tokens Placed on Pitch (Exactly N Players) */}
              {startersOnPitch.map(({ player, node }) => {
                const isHovered = hoveredPlayer?.id === player.id;
                const isCaptain = player.num === 17;
                const isGK = node.role === 'GK';

                return (
                  <div
                    key={player.id}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onClick={() => {
                      onSelectPlayer(player);
                      setHoveredPlayer(player);
                    }}
                    onMouseEnter={() => setHoveredPlayer(player)}
                    onMouseLeave={() => setHoveredPlayer(null)}
                    className="absolute z-20 cursor-pointer group flex flex-col items-center"
                  >
                    {/* Glowing circular player badge */}
                    <div
                      className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center shadow-2xl transition-all duration-200 group-hover:scale-125 ${
                        isCaptain
                          ? 'bg-rose-600 border-amber-400 ring-2 ring-amber-400/50 text-white'
                          : isGK
                          ? 'bg-amber-600 border-white text-white ring-2 ring-white/30'
                          : 'bg-neutral-950 border-rose-500 text-white'
                      } ${isHovered ? 'scale-125 ring-4 ring-rose-400' : ''}`}
                    >
                      <span className="font-display font-black text-xs sm:text-base tabular-nums">
                        #{player.num}
                      </span>
                      
                      {/* Captain 'C' Badge */}
                      {isCaptain && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-neutral-950 font-black text-[9px] rounded-full flex items-center justify-center shadow border border-amber-200">
                          C
                        </span>
                      )}

                      {/* Small Tactical Role Chip */}
                      <span className="absolute -bottom-1 text-[8px] font-black px-1 rounded bg-neutral-950 text-rose-400 border border-neutral-700">
                        {node.role}
                      </span>
                    </div>

                    {/* Compact Name Label */}
                    <div className="mt-1.5 px-2 py-0.5 rounded bg-neutral-950/90 backdrop-blur-sm border border-neutral-700/90 text-[10px] sm:text-xs font-bold text-white shadow uppercase max-w-[85px] sm:max-w-[105px] truncate text-center group-hover:bg-rose-600 group-hover:border-rose-500 transition-colors">
                      {player.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pitch Legend */}
            <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 px-2 gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 border border-amber-400 inline-block" />
                  <span>Captain Shekhor (#17)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 border border-white inline-block" />
                  <span>Goalkeeper (#1)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-rose-500 inline-block" />
                  <span>Starters ({selectedCount} On Pitch)</span>
                </span>
              </div>
              <span className="text-neutral-500 font-mono text-[11px]">
                Ground: Mulikandi High School
              </span>
            </div>

            {/* ========================================================
                TACTICAL SUBSTITUTES & RESERVES BENCH (12 - N PLAYERS)
                ======================================================== */}
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span className="font-bold uppercase tracking-wider text-neutral-200 text-xs">
                    {lang === 'en' ? 'Tactical Substitutes & Bench Reserves' : 'বিকল্প খেলোয়াড় ও বেঞ্চ রিজার্ভ'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-neutral-800 text-amber-400 font-bold">
                    {substitutesOnBench.length} {lang === 'en' ? 'Players' : 'জন'}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-500 font-mono">
                  {lang === 'en' ? 'Official 12-Man Squad' : 'অফিশিয়াল ১২ জনের দল'}
                </span>
              </div>

              {substitutesOnBench.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                  {substitutesOnBench.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        onSelectPlayer(sub);
                        setHoveredPlayer(sub);
                      }}
                      onMouseEnter={() => setHoveredPlayer(sub)}
                      onMouseLeave={() => setHoveredPlayer(null)}
                      className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-rose-500 text-left transition-all cursor-pointer group flex items-center gap-2.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center font-display font-black text-rose-500 text-sm shrink-0 border border-neutral-800 group-hover:border-rose-500">
                        #{sub.num}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-white group-hover:text-rose-400 truncate">
                          {sub.name}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                          <span className="px-1 py-0.2 rounded bg-neutral-900 text-neutral-300 font-bold">
                            {sub.primaryPosition}
                          </span>
                          <span className="text-emerald-400 font-semibold">{lang === 'en' ? 'Ready' : 'প্রস্তুত'}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-neutral-400 text-center py-2 italic">
                  {lang === 'en' ? 'All available outfield squad players are deployed in this formation.' : 'এই ফরমেশনে স্কোয়াডের সবাই মাঠে সক্রিয়।'}
                </div>
              )}
            </div>

          </div>

          {/* Right Column (4 Columns): Player Spotlight / Tactical Strategy Hub */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* 1. Tactical Inspector Card (Hover or Click) */}
            {hoveredPlayer ? (
              <div className="p-6 rounded-2xl bg-neutral-900 border border-rose-600/70 shadow-2xl space-y-4 transition-all animate-fadeIn">
                <div className="flex items-center justify-between text-[11px] font-bold text-rose-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Player Tactical Dossier' : 'খেলোয়াড় ট্যাকটিক্যাল ডসিয়ার'}</span>
                  </span>
                  <span className="font-mono text-neutral-400">
                    {hoveredPlayer.num === 17 ? 'CAPTAIN' : hoveredPlayer.category}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden flex items-center justify-center shrink-0 shadow">
                    <img 
                      src={hoveredPlayer.photoUrl} 
                      alt={hoveredPlayer.fullName} 
                      className="w-full h-full object-contain object-bottom"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-2xl font-black text-rose-500 tabular-nums">
                        #{hoveredPlayer.num}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-black bg-[#ff001e] text-white shadow">
                        {hoveredPlayer.primaryPosition}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold uppercase text-white mt-1">
                      {hoveredPlayer.fullName}
                    </h3>
                  </div>
                </div>

                {/* Specific Role Instruction in this formation */}
                {(() => {
                  const node = activeFormation.positions.find(p => p.playerNum === hoveredPlayer.num);
                  if (node) {
                    return (
                      <div className="p-3 rounded-xl bg-neutral-950 border border-rose-900/40 space-y-1">
                        <div className="text-[10px] font-bold uppercase text-amber-400 flex items-center justify-between">
                          <span>{lang === 'en' ? `Role in ${activeFormation.code}:` : `${activeFormation.code} এ দায়িত্ব:`}</span>
                          <span className="text-white font-mono">{node.roleNameEn}</span>
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {lang === 'en' ? node.tacticalInstructionEn : node.tacticalInstructionBn}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-amber-400">
                      {lang === 'en' 
                        ? 'Tactical bench reserve. Ready to come on as an impact game-changer.' 
                        : 'কৌশলগত বেঞ্চ রিজার্ভ। ম্যাচের যেকোনো মুহূর্তে নামার জন্য প্রস্তুত।'}
                    </div>
                  );
                })()}

                {/* Player Quick Stats */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase block">Pace</span>
                    <strong className="font-mono text-white text-sm">{hoveredPlayer.stats.pace}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase block">Passing</span>
                    <strong className="font-mono text-rose-400 text-sm">{hoveredPlayer.stats.passing}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase block">Physical</span>
                    <strong className="font-mono text-white text-sm">{hoveredPlayer.stats.physical}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlayer(hoveredPlayer)}
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow"
                >
                  <span>{lang === 'en' ? 'Open Full Scouting Profile' : 'পূর্ণাঙ্গ প্রোফাইল দেখুন'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : null}

            {/* 2. Tactical Strategy Master Doctrine Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    {lang === 'en' ? 'Tactical Playbook' : 'কৌশলগত প্লেবুক'}
                  </span>
                </div>
                <span className="font-mono text-xs font-black text-rose-500 px-2 py-0.5 rounded bg-rose-950/40 border border-rose-900/40">
                  {activeFormation.code}
                </span>
              </div>

              {/* Title & Style */}
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white leading-tight">
                  {lang === 'en' ? activeFormation.formationStyleEn : activeFormation.formationStyleBn}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {lang === 'en' ? activeFormation.summaryEn : activeFormation.summaryBn}
                </p>
              </div>

              {/* Strategy Segmented Tabs */}
              <div className="flex items-center p-1 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setStrategyTab('doctrine')}
                  className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                    strategyTab === 'doctrine' ? 'bg-rose-600 text-white shadow' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'Phases' : 'পর্যায়'}
                </button>
                <button
                  type="button"
                  onClick={() => setStrategyTab('captain')}
                  className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                    strategyTab === 'captain' ? 'bg-rose-600 text-white shadow' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'Captain Orders' : 'অধিনায়কের আদেশ'}
                </button>
                <button
                  type="button"
                  onClick={() => setStrategyTab('metrics')}
                  className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                    strategyTab === 'metrics' ? 'bg-rose-600 text-white shadow' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'Radar' : 'মেট্রিক্স'}
                </button>
              </div>

              {/* TAB 1: PHASES (Attack, Defense, Transition) */}
              {strategyTab === 'doctrine' && (
                <div className="space-y-3.5 text-xs text-neutral-300">
                  {/* Attack */}
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <div className="font-bold uppercase text-[10px] tracking-wider text-rose-400 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Attacking Phase' : 'আক্রমণ পর্যায়'}</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed text-[11px]">
                      {lang === 'en' ? activeFormation.strategy.attackEn : activeFormation.strategy.attackBn}
                    </p>
                  </div>

                  {/* Defense */}
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <div className="font-bold uppercase text-[10px] tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Defensive Organization' : 'রক্ষণ সংগঠন'}</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed text-[11px]">
                      {lang === 'en' ? activeFormation.strategy.defenseEn : activeFormation.strategy.defenseBn}
                    </p>
                  </div>

                  {/* Transition */}
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                    <div className="font-bold uppercase text-[10px] tracking-wider text-sky-400 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Counter & Transition' : 'কাউন্টার ও ট্রানজিশন'}</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed text-[11px]">
                      {lang === 'en' ? activeFormation.strategy.transitionEn : activeFormation.strategy.transitionBn}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: CAPTAIN'S DIRECTIVE */}
              {strategyTab === 'captain' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-black uppercase text-amber-400">
                        {lang === 'en' ? 'Official Directive from Captain Shekhor' : 'অধিনায়ক শেখরের ট্যাকটিক্যাল নির্দেশ'}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-200 italic leading-relaxed">
                      {lang === 'en' 
                        ? activeFormation.strategy.captainDirectiveEn 
                        : activeFormation.strategy.captainDirectiveBn}
                    </p>
                    <div className="text-[10px] text-neutral-500 font-mono">
                      Shekhor Mohan Roy (#17) · Club Captain & Tactical Orchestrator
                    </div>
                  </div>

                  {/* Strengths & Watchouts */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Tactical Strengths:' : 'কৌশলগত শক্তি:'}</span>
                    </div>
                    <ul className="text-xs text-neutral-300 space-y-1 pl-4 list-disc">
                      {(lang === 'en' ? activeFormation.strategy.strengthsEn : activeFormation.strategy.strengthsBn).map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-neutral-800">
                    <div className="text-[10px] font-bold uppercase text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Coach Watchouts:' : 'সতর্কতা:'}</span>
                    </div>
                    <ul className="text-xs text-neutral-400 space-y-1 pl-4 list-disc">
                      {(lang === 'en' ? activeFormation.strategy.watchoutsEn : activeFormation.strategy.watchoutsBn).map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 3: RADAR / METRICS */}
              {strategyTab === 'metrics' && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Tactical Efficiency Indexes' : 'কৌশলগত কার্যকারিতা সূচক'}
                  </div>

                  {Object.entries(activeFormation.strategy.metrics).map(([key, val]) => {
                    const label = 
                      key === 'pressing' ? (lang === 'en' ? 'Pressing Intensity' : 'প্রেসিং তীব্রতা') :
                      key === 'possession' ? (lang === 'en' ? 'Possession Control' : 'বল দখল') :
                      key === 'counterAttack' ? (lang === 'en' ? 'Counter-Attack Threat' : 'কাউন্টার হুমকি') :
                      key === 'compactness' ? (lang === 'en' ? 'Defensive Compactness' : 'রক্ষণ জমাটবদ্ধতা') :
                      (lang === 'en' ? 'Pitch Width Spread' : 'মাঠের বিস্তার');

                    return (
                      <div key={key} className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-400 font-semibold">{label}</span>
                          <span className="font-mono font-bold text-white tabular-nums">{val}%</span>
                        </div>
                        <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full transition-all duration-500"
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
