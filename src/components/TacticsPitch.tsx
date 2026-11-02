import React, { useState, useRef } from 'react';
import { PLAYERS_DATA, Player } from '../data/clubData';
import { 
  TACTICAL_FORMATS_DATA, 
  PlayerCount, 
  TacticalFormation, 
  FormationPlayerNode 
} from '../data/tacticalFormationsData';
import { 
  Crosshair, Award, Shield, Sparkles, ChevronRight, 
  TrendingUp, Users, CheckCircle2, AlertTriangle, ArrowRight, Activity,
  Download, ArrowLeftRight, RotateCcw, Check, X, Loader2, ArrowUpRight,
  SlidersHorizontal, ImageDown
} from 'lucide-react';
import { 
  generateTacticalPosterCanvas, 
  generatePitchOnlyCanvas, 
  triggerFileDownload 
} from '../utils/formationImageExport';

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

  // Custom Lineups state: mapped by formation ID -> array of playerNum in order of position nodes
  const [customLineups, setCustomLineups] = useState<Record<string, number[]>>({});

  // Inspector card: hovered or clicked player
  const [hoveredPlayer, setHoveredPlayer] = useState<Player | null>(null);
  
  // Strategy tab: 'doctrine' | 'captain' | 'metrics'
  const [strategyTab, setStrategyTab] = useState<'doctrine' | 'captain' | 'metrics'>('doctrine');

  // Modal states for Starting Player Changes
  const [isLineupManagerOpen, setIsLineupManagerOpen] = useState(false);
  const [swapTargetSlot, setSwapTargetSlot] = useState<number | null>(null);
  const [benchPlayerToSub, setBenchPlayerToSub] = useState<Player | null>(null);

  // Modal & state for Formation Image Download
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadMode, setDownloadMode] = useState<'poster' | 'pitch'>('poster');
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'jpeg'>('png');
  const [isDownloading, setIsDownloading] = useState(false);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  // Pitch element container ref for snapshot exports
  const pitchContainerRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle format count switch
  const handleSelectCount = (count: PlayerCount) => {
    setSelectedCount(count);
    const newGroup = TACTICAL_FORMATS_DATA[count];
    if (newGroup && newGroup.formations.length > 0) {
      setSelectedFormationId(newGroup.formations[0].id);
    }
    setHoveredPlayer(null);
    setSwapTargetSlot(null);
    setBenchPlayerToSub(null);
  };

  // Find the active formation object
  const activeFormation: TacticalFormation = 
    currentFormatGroup.formations.find(f => f.id === selectedFormationId) ||
    currentFormatGroup.formations[0];

  // Starting players resolution with custom changes
  const defaultStarterNums = activeFormation.positions.map(p => p.playerNum);
  const currentStarterNums = customLineups[selectedFormationId] || defaultStarterNums;

  // Determine if active formation currently has customized starting lineup
  const isLineupCustomized = Boolean(
    customLineups[selectedFormationId] &&
    JSON.stringify(customLineups[selectedFormationId]) !== JSON.stringify(defaultStarterNums)
  );

  // Resolve starters on pitch (mapped to their tactical position nodes)
  const startersOnPitch: { player: Player; node: FormationPlayerNode; slotIndex: number }[] = [];
  currentStarterNums.forEach((playerNum, idx) => {
    const node = activeFormation.positions[idx] || activeFormation.positions[0];
    const player = PLAYERS_DATA.find(p => p.num === playerNum) || PLAYERS_DATA[0];
    startersOnPitch.push({ player, node, slotIndex: idx });
  });

  // Resolve bench substitutes (all squad players not currently on pitch)
  const substitutesOnBench = PLAYERS_DATA.filter(
    player => !currentStarterNums.includes(player.num)
  );

  /**
   * Assigns or swaps a player into a specific slotIndex on the pitch.
   */
  const handleAssignPlayerToSlot = (slotIndex: number, newPlayerNum: number) => {
    const updatedLineup = [...currentStarterNums];
    const oldPlayerNum = updatedLineup[slotIndex];

    if (oldPlayerNum === newPlayerNum) {
      setSwapTargetSlot(null);
      setBenchPlayerToSub(null);
      return;
    }

    const existingSlotIndex = updatedLineup.indexOf(newPlayerNum);
    if (existingSlotIndex !== -1) {
      // Both players are on pitch: swap their slots!
      updatedLineup[slotIndex] = newPlayerNum;
      updatedLineup[existingSlotIndex] = oldPlayerNum;
    } else {
      // Bench player comes onto pitch, old player goes to bench
      updatedLineup[slotIndex] = newPlayerNum;
    }

    setCustomLineups(prev => ({
      ...prev,
      [selectedFormationId]: updatedLineup
    }));

    const oldP = PLAYERS_DATA.find(p => p.num === oldPlayerNum);
    const newP = PLAYERS_DATA.find(p => p.num === newPlayerNum);
    const roleCode = activeFormation.positions[slotIndex]?.role || 'Tactical Slot';

    showToast(
      lang === 'en'
        ? `🔄 Substituted: ${newP?.name} (#${newP?.num}) in for ${oldP?.name} (#${oldP?.num}) at ${roleCode}!`
        : `🔄 খেলোয়াড় পরিবর্তন: ${roleCode} পজিশনে ${oldP?.name}-এর স্থানে মাঠে নামলেন ${newP?.name}!`
    );

    setSwapTargetSlot(null);
    setBenchPlayerToSub(null);
  };

  /**
   * Resets active formation's starting squad to captain's default.
   */
  const handleResetLineup = () => {
    setCustomLineups(prev => {
      const next = { ...prev };
      delete next[selectedFormationId];
      return next;
    });

    showToast(
      lang === 'en'
        ? `↺ Restored Captain Shekhor's default starting lineup for ${activeFormation.code}.`
        : `↺ ${activeFormation.code} এর জন্য ক্যাপ্টেন শেখরের মূল একাদশ পুনর্বহাল করা হয়েছে।`
    );
  };

  /**
   * Triggers formation image generation and download.
   */
  const handleDownloadImage = async () => {
    try {
      setIsDownloading(true);
      const filenameBase = `TitanForce_${activeFormation.code.replace(/[^a-zA-Z0-9-]/g, '_')}_${selectedCount}players`;
      let dataUrl: string;
      if (downloadMode === 'pitch') {
        dataUrl = await generatePitchOnlyCanvas({
          formation: activeFormation,
          starters: startersOnPitch,
          playerCount: selectedCount,
          format: downloadFormat
        });
        triggerFileDownload(dataUrl, `${filenameBase}_pitch.${downloadFormat}`);
      } else {
        // High-res tactical matchday poster canvas
        dataUrl = await generateTacticalPosterCanvas({
          formation: activeFormation,
          starters: startersOnPitch,
          substitutes: substitutesOnBench,
          playerCount: selectedCount,
          lang,
          format: downloadFormat
        });
        triggerFileDownload(dataUrl, `${filenameBase}_matchday.${downloadFormat}`);
      }

      showToast(
        lang === 'en'
          ? `✓ Formation image downloaded successfully!`
          : `✓ ফর্মেশনের ছবি সফলভাবে ডাউনলোড হয়েছে!`
      );
      setIsDownloadModalOpen(false);
    } catch (err) {
      console.error('Error generating formation image:', err);
      showToast(
        lang === 'en'
          ? `Failed to generate image. Please try again.`
          : `ছবি তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const playerCountTabs: PlayerCount[] = [5, 6, 7, 8, 9, 10, 11];

  return (
    <section id="tactics" className="py-12 sm:py-20 bg-neutral-950 border-b border-neutral-800 transition-colors relative">
      
      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-900 border border-rose-500/80 shadow-2xl text-white text-xs sm:text-sm font-semibold backdrop-blur-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-neutral-400 hover:text-white p-1 rounded transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

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
                ? 'Dynamic tactical deployments engineered by Captain Shekhor Mohan Roy. Customize your starting players, swap tactical roles, and download high-resolution formation match sheets.'
                : 'অধিনায়ক শেখর মোহন রায়ের প্রণীত রণকৌশল। স্টার্টিং একাদশ বদল করুন, পজিশন সাজান এবং হাই-রেজোলিউশন ফর্মেশনের ছবি ডাউনলোড করুন।'}
            </p>
          </div>

          {/* Quick Stats & Action Hub */}
          <div className="flex flex-wrap items-center gap-3">
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
                <span className="text-[10px] text-neutral-500 uppercase font-bold block">{lang === 'en' ? 'Bench' : 'বেঞ্চে'}</span>
                <span className="font-display font-black text-neutral-300 text-base">{12 - selectedCount} {lang === 'en' ? 'Subs' : 'জন'}</span>
              </div>
            </div>

            {/* Prominent Formation Image Download Button */}
            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-lg shadow-rose-900/40 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{lang === 'en' ? 'Download Image' : 'ছবি ডাউনলোড'}</span>
            </button>
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
            3. SPECIFIC FORMATION TOGGLE & STARTING LINEUP CONTROLS
            ======================================================== */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span>{lang === 'en' ? currentFormatGroup.nameEn : currentFormatGroup.nameBn}</span>
              {isLineupCustomized && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                  {lang === 'en' ? 'Custom Lineup Active' : 'কাস্টম একাদশ সক্রিয়'}
                </span>
              )}
            </div>
            <div className="text-xs sm:text-sm text-neutral-300">
              {lang === 'en' ? currentFormatGroup.subtitleEn : currentFormatGroup.subtitleBn}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Shape selection buttons */}
            <div className="flex flex-wrap items-center gap-1.5 mr-2">
              <span className="text-[11px] font-bold uppercase text-neutral-500 mr-1">
                {lang === 'en' ? 'Shape:' : 'গঠন:'}
              </span>
              {currentFormatGroup.formations.map((fmt) => {
                const isActive = selectedFormationId === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => {
                      setSelectedFormationId(fmt.id);
                      setHoveredPlayer(null);
                      setSwapTargetSlot(null);
                      setBenchPlayerToSub(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
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

            {/* Formation Starting Player Change Option Button */}
            <button
              type="button"
              onClick={() => setIsLineupManagerOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:border-rose-500"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-rose-500" />
              <span>{lang === 'en' ? 'Change Starting Lineup' : 'স্টার্টিং একাদশ বদল'}</span>
            </button>

            {/* Reset to Default Button if Customized */}
            {isLineupCustomized && (
              <button
                type="button"
                onClick={handleResetLineup}
                title={lang === 'en' ? 'Reset to Default Lineup' : 'ডিফল্ট একাদশে ফিরে যান'}
                className="px-2.5 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 border border-neutral-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'en' ? 'Reset' : 'রিসেট'}</span>
              </button>
            )}

            {/* Formation Image Download Option Button */}
            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-950 hover:bg-rose-950/60 text-white border border-rose-500/60 hover:border-rose-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-rose-400" />
              <span>{lang === 'en' ? 'Export Formation' : 'ইমেজ এক্সপোর্ট'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            4. TACTICAL PITCH (LEFT) & STRATEGY / SPOTLIGHT (RIGHT)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tactical Pitch (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* The Pitch Container with User's Uploaded Tactical Board Background */}
            <div 
              ref={pitchContainerRef}
              className="relative w-full max-w-[580px] mx-auto aspect-[3/4] rounded-3xl bg-[#1b3d27] border-2 border-emerald-800/80 shadow-2xl overflow-hidden select-none"
            >
              
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
                <span className="text-[11px] font-bold text-white uppercase">{selectedCount} {lang === 'en' ? 'Starters' : 'জন'}</span>
                {isLineupCustomized && (
                  <>
                    <span className="text-neutral-500">·</span>
                    <span className="text-[10px] text-amber-400 font-bold uppercase">Customized</span>
                  </>
                )}
              </div>

              {/* Pitch Quick Action Tools on Top Right */}
              <div className="absolute top-3 right-4 z-10 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsLineupManagerOpen(true)}
                  title={lang === 'en' ? 'Change Starting Lineup' : 'স্টার্টিং একাদশ বদল'}
                  className="px-2.5 py-1.5 rounded-xl bg-neutral-950/85 backdrop-blur-md hover:bg-neutral-900 border border-neutral-700 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow cursor-pointer transition-colors"
                >
                  <ArrowLeftRight className="w-3 h-3 text-rose-400" />
                  <span className="hidden sm:inline">{lang === 'en' ? 'Change Starters' : 'একাদশ বদল'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsDownloadModalOpen(true)}
                  title={lang === 'en' ? 'Download Formation Image' : 'ছবি ডাউনলোড'}
                  className="p-1.5 rounded-xl bg-rose-600/90 backdrop-blur-md hover:bg-rose-500 text-white text-[10px] font-bold shadow cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Player Tokens Placed on Pitch (Exactly N Players) */}
              {startersOnPitch.map(({ player, node, slotIndex }) => {
                const isHovered = hoveredPlayer?.id === player.id;
                const isCaptain = player.num === 17;
                const isGK = node.role === 'GK';

                return (
                  <div
                    key={`${player.id}-${slotIndex}`}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="absolute z-20 group flex flex-col items-center"
                  >
                    {/* Glowing circular player badge */}
                    <div
                      onClick={() => {
                        onSelectPlayer(player);
                        setHoveredPlayer(player);
                      }}
                      onMouseEnter={() => setHoveredPlayer(player)}
                      className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center shadow-2xl transition-all duration-200 cursor-pointer group-hover:scale-125 ${
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

                      {/* Quick Swap Starter Icon on Hover */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSwapTargetSlot(slotIndex);
                        }}
                        title={lang === 'en' ? `Swap ${player.name} (${node.role})` : `${player.name}-কে বদল করুন`}
                        className="absolute -top-2 -left-2 w-5 h-5 bg-neutral-900 border border-rose-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 hover:scale-125 transition-all cursor-pointer z-30"
                      >
                        <ArrowLeftRight className="w-2.5 h-2.5 text-rose-400" />
                      </button>
                    </div>

                    {/* Compact Name Label */}
                    <div 
                      onClick={() => {
                        onSelectPlayer(player);
                        setHoveredPlayer(player);
                      }}
                      className="mt-1.5 px-2 py-0.5 rounded bg-neutral-950/90 backdrop-blur-sm border border-neutral-700/90 text-[10px] sm:text-xs font-bold text-white shadow uppercase max-w-[85px] sm:max-w-[105px] truncate text-center group-hover:bg-rose-600 group-hover:border-rose-500 transition-colors cursor-pointer"
                    >
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span className="font-bold uppercase tracking-wider text-neutral-200 text-xs">
                    {lang === 'en' ? 'Tactical Substitutes & Bench Reserves' : 'বিকল্প খেলোয়াড় ও বেঞ্চ রিজার্ভ'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-neutral-800 text-amber-400 font-bold">
                    {substitutesOnBench.length} {lang === 'en' ? 'Players' : 'জন'}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 flex items-center gap-2">
                  <span className="text-rose-400 font-semibold">{lang === 'en' ? 'Tap "Sub In" to deploy onto pitch' : 'মাঠে নামাতে "Sub In" চাপুন'}</span>
                </div>
              </div>

              {substitutesOnBench.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {substitutesOnBench.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 card-interactive-glow text-left flex items-center justify-between gap-2"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onSelectPlayer(sub);
                          setHoveredPlayer(sub);
                        }}
                        className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer group"
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

                      {/* Interactive Sub-In Action Button */}
                      <button
                        type="button"
                        onClick={() => setBenchPlayerToSub(sub)}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 hover:border-rose-500 text-rose-400 hover:text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Sub In' : 'নামান'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-neutral-400 text-center py-2 italic">
                  {lang === 'en' ? 'All available squad players are deployed in this formation.' : 'এই ফরমেশনে স্কোয়াডের সবাই মাঠে সক্রিয়।'}
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

                {/* Specific Role Instruction or Bench Status */}
                {(() => {
                  const assignedStarter = startersOnPitch.find(s => s.player.num === hoveredPlayer.num);
                  if (assignedStarter) {
                    return (
                      <div className="p-3 rounded-xl bg-neutral-950 border border-rose-900/40 space-y-2">
                        <div className="text-[10px] font-bold uppercase text-amber-400 flex items-center justify-between">
                          <span>{lang === 'en' ? `Role in ${activeFormation.code}:` : `${activeFormation.code} এ দায়িত্ব:`}</span>
                          <span className="text-white font-mono">{assignedStarter.node.roleNameEn} ({assignedStarter.node.role})</span>
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {lang === 'en' ? assignedStarter.node.tacticalInstructionEn : assignedStarter.node.tacticalInstructionBn}
                        </p>
                        
                        {/* Quick Swap button on inspector card */}
                        <button
                          type="button"
                          onClick={() => setSwapTargetSlot(assignedStarter.slotIndex)}
                          className="w-full py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-rose-500 text-rose-400 hover:text-white text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5" />
                          <span>{lang === 'en' ? `Substitute ${hoveredPlayer.name}` : `${hoveredPlayer.name}-কে পরিবর্তন করুন`}</span>
                        </button>
                      </div>
                    );
                  }
                  return (
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="text-xs text-amber-400">
                        {lang === 'en' 
                          ? 'Tactical bench reserve. Ready to come on as an impact game-changer.' 
                          : 'কৌশলগত বেঞ্চ রিজার্ভ। ম্যাচের যেকোনো মুহূর্তে নামার জন্য প্রস্তুত।'}
                      </div>
                      <button
                        type="button"
                        onClick={() => setBenchPlayerToSub(hoveredPlayer)}
                        className="w-full py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? `Sub ${hoveredPlayer.name} Onto Pitch` : `${hoveredPlayer.name}-কে মাঠে নামান`}</span>
                      </button>
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

      {/* ========================================================
          MODAL 1: FORMATION STARTING LINEUP MANAGER
          ======================================================== */}
      {isLineupManagerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-500">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-black uppercase text-white">
                    {lang === 'en' ? 'Manage Starting Lineup' : 'স্টার্টিং একাদশ পরিচালনা'}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {activeFormation.code} · {selectedCount} {lang === 'en' ? 'Starting Positions on Pitch' : 'জন মাঠে শুরু করবেন'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLineupManagerOpen(false)}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Position Slots List with Player Dropdown */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800/80">
                <span>{lang === 'en' ? 'Tactical Position & Assigned Starter' : 'ট্যাকটিক্যাল পজিশন ও দায়িত্বপ্রাপ্ত খেলোয়াড়'}</span>
                {isLineupCustomized && (
                  <button
                    type="button"
                    onClick={handleResetLineup}
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Reset to Default Lineup' : 'ডিফল্ট একাদশে রিসেট'}</span>
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {startersOnPitch.map(({ player, node, slotIndex }) => {
                  return (
                    <div
                      key={slotIndex}
                      className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      {/* Slot info */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[10px] font-black text-rose-500 font-mono">{node.role}</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{node.roleNameEn}</span>
                            {player.num === 17 && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-400 text-neutral-950 font-black text-[9px]">CAPTAIN</span>
                            )}
                          </div>
                          <div className="text-[11px] text-neutral-400 truncate max-w-[280px]">
                            {lang === 'en' ? node.tacticalInstructionEn : node.tacticalInstructionBn}
                          </div>
                        </div>
                      </div>

                      {/* Player Select Dropdown for this Slot */}
                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={player.num}
                          onChange={(e) => handleAssignPlayerToSlot(slotIndex, Number(e.target.value))}
                          className="bg-neutral-900 border border-neutral-700 hover:border-rose-500 text-white text-xs font-bold rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                          {PLAYERS_DATA.map((p) => {
                            const isStarting = currentStarterNums.includes(p.num);
                            const isCurrent = p.num === player.num;
                            return (
                              <option key={p.id} value={p.num} className="bg-neutral-900 text-white">
                                #{p.num} {p.name} ({p.primaryPosition}) {isCurrent ? '★ Current' : isStarting ? '⇄ On Pitch' : '· Bench'}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-mono">
                {substitutesOnBench.length} {lang === 'en' ? 'Substitutes on Bench' : 'জন খেলোয়াড় বেঞ্চে রিজার্ভ'}
              </span>
              <button
                type="button"
                onClick={() => setIsLineupManagerOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow"
              >
                {lang === 'en' ? 'Apply Lineup' : 'সম্পন্ন করুন'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: DIRECT STARTER SWAP (FOR SPECIFIC POSITION)
          ======================================================== */}
      {swapTargetSlot !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            {(() => {
              const currentSlot = startersOnPitch[swapTargetSlot];
              if (!currentSlot) return null;

              return (
                <>
                  <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Change Starting Player' : 'স্টার্টিং খেলোয়াড় বদল'}</span>
                      </div>
                      <h3 className="font-display text-lg font-black uppercase text-white mt-0.5">
                        {currentSlot.node.roleNameEn} ({currentSlot.node.role})
                      </h3>
                      <p className="text-xs text-neutral-400">
                        {lang === 'en' ? 'Currently starting: ' : 'বর্তমানে মাঠে: '}
                        <span className="text-white font-bold">#{currentSlot.player.num} {currentSlot.player.fullName}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSwapTargetSlot(null)}
                      className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Body: Select Replacement Player */}
                  <div className="p-5 overflow-y-auto space-y-4 flex-1">
                    
                    {/* 1. Bench Reserves (Direct Sub-In) */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase text-amber-400 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Bench Reserves (Sub In to Pitch)' : 'বেঞ্চ রিজার্ভ (মাঠে নামান)'}</span>
                      </div>

                      {substitutesOnBench.length > 0 ? (
                        <div className="space-y-2">
                          {substitutesOnBench.map((sub) => (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleAssignPlayerToSlot(swapTargetSlot, sub.num)}
                              className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-rose-500 hover:bg-neutral-900 transition-all text-left flex items-center justify-between group cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-display font-black text-rose-500 text-sm group-hover:border-rose-500">
                                  #{sub.num}
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-white group-hover:text-rose-400">
                                    {sub.fullName}
                                  </div>
                                  <div className="text-[10px] text-neutral-400 font-mono">
                                    {sub.primaryPosition} · Age {sub.age} · Pace {sub.stats.pace}
                                  </div>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 rounded-lg bg-rose-600/20 text-rose-400 group-hover:bg-rose-600 group-hover:text-white text-[11px] font-bold uppercase tracking-wider transition-colors">
                                {lang === 'en' ? 'Sub In' : 'নামান'}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-neutral-500 italic p-2">
                          {lang === 'en' ? 'No substitutes remaining on bench.' : 'বেঞ্চে কোনো বিকল্প খেলোয়াড় নেই।'}
                        </div>
                      )}
                    </div>

                    {/* 2. Other Starters (Swap Position on Pitch) */}
                    <div className="space-y-2 pt-3 border-t border-neutral-800">
                      <div className="text-[11px] font-bold uppercase text-neutral-400 flex items-center gap-1.5">
                        <ArrowLeftRight className="w-3.5 h-3.5 text-sky-400" />
                        <span>{lang === 'en' ? 'Swap Position with Another Starter' : 'মাঠের অন্য খেলোয়াড়ের সাথে স্থান বদল'}</span>
                      </div>

                      <div className="space-y-2">
                        {startersOnPitch
                          .filter(s => s.slotIndex !== swapTargetSlot)
                          .map(({ player: otherP, node: otherNode }) => (
                            <button
                              key={otherP.id}
                              type="button"
                              onClick={() => handleAssignPlayerToSlot(swapTargetSlot, otherP.num)}
                              className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-sky-500 hover:bg-neutral-900 transition-all text-left flex items-center justify-between group cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-display font-black text-sky-400 text-xs">
                                  #{otherP.num}
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-white group-hover:text-sky-400">
                                    {otherP.name} <span className="text-neutral-500 font-normal">({otherNode.role})</span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-[10px] text-sky-400 font-bold uppercase">
                                {lang === 'en' ? 'Swap' : 'বদল'}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>

                  </div>
                </>
              );
            })()}

          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: BENCH PLAYER SUB-IN SELECTOR
          ======================================================== */}
      {benchPlayerToSub !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center font-display font-black text-rose-500 text-base">
                  #{benchPlayerToSub.num}
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                    {lang === 'en' ? 'Deploy Reserve Onto Pitch' : 'বিকল্প খেলোয়াড়কে মাঠে নামান'}
                  </div>
                  <h3 className="font-display text-lg font-black uppercase text-white">
                    {benchPlayerToSub.fullName} ({benchPlayerToSub.primaryPosition})
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBenchPlayerToSub(null)}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prompt List: Choose which starter to replace */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              <p className="text-xs text-neutral-400">
                {lang === 'en' 
                  ? `Select which starter ${benchPlayerToSub.name} will replace in the active formation:` 
                  : `${benchPlayerToSub.name}-কে কোন খেলোয়াড়ের পরিবর্তে মাঠে নামাতে চান নির্বাচন করুন:`}
              </p>

              <div className="space-y-2">
                {startersOnPitch.map(({ player: starterP, node, slotIndex }) => (
                  <button
                    key={slotIndex}
                    type="button"
                    onClick={() => handleAssignPlayerToSlot(slotIndex, benchPlayerToSub.num)}
                    className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-rose-500 hover:bg-neutral-900 transition-all text-left flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-display font-black text-rose-500 text-sm group-hover:border-rose-500">
                        #{starterP.num}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-rose-400 flex items-center gap-2">
                          <span>{starterP.fullName}</span>
                          <span className="px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300 font-mono text-[9px] font-bold">
                            {node.role}
                          </span>
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {node.roleNameEn}
                        </div>
                      </div>
                    </div>

                    <span className="px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-400 group-hover:bg-rose-600 group-hover:text-white text-xs font-bold uppercase transition-colors">
                      {lang === 'en' ? 'Replace' : 'বদলান'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 4: FORMATION IMAGE DOWNLOAD MODAL
          ======================================================== */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-500">
                  <ImageDown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-black uppercase text-white">
                    {lang === 'en' ? 'Download Formation Image' : 'ফর্মেশন ইমেজ ডাউনলোড'}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {activeFormation.code} · {selectedCount} {lang === 'en' ? 'Players Tactical Sheet' : 'জনের রণকৌশল চিত্র'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDownloadModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              
              {/* Formation Snapshot Preview Card */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-white">{lang === 'en' ? 'Active Squad Lineup' : 'সক্রিয় একাদশ'}</span>
                  <span className="text-rose-500 font-mono">{activeFormation.code}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {startersOnPitch.map(({ player, node }) => (
                    <span 
                      key={player.id} 
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        player.num === 17 
                          ? 'bg-rose-600 text-white' 
                          : node.role === 'GK'
                          ? 'bg-amber-600 text-white'
                          : 'bg-neutral-900 text-neutral-300 border border-neutral-800'
                      }`}
                    >
                      #{player.num} {player.name}
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-neutral-500 pt-1 font-mono">
                  Ground: Mulikandi High School · Zakigonj, Sylhet
                </div>
              </div>

              {/* Mode Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400 block">
                  {lang === 'en' ? 'Select Image Style:' : 'ছবির ফরম্যাট শৈলী:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDownloadMode('poster')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      downloadMode === 'poster'
                        ? 'bg-rose-600/15 border-rose-500 text-white ring-1 ring-rose-500'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{lang === 'en' ? 'Matchday Poster (HD)' : 'ম্যাচডে পোস্টার (HD)'}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{lang === 'en' ? 'Pitch, reserves & captain doctrine' : 'পিচ, রিজার্ভ ও রণকৌশল কোট'}</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDownloadMode('pitch')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      downloadMode === 'pitch'
                        ? 'bg-rose-600/15 border-rose-500 text-white ring-1 ring-rose-500'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{lang === 'en' ? 'Pitch Only (HD)' : 'কেবল পিচ (HD)'}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{lang === 'en' ? 'Direct tactical pitch board' : 'সরাসরি রণকৌশল পিচ বোর্ড'}</div>
                  </button>
                </div>
              </div>

              {/* Format selection: PNG vs JPEG */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400 block">
                  {lang === 'en' ? 'File Format:' : 'ফাইল ফরম্যাট:'}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDownloadFormat('png')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      downloadFormat === 'png'
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    PNG (Recommended · Ultra Crisp)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDownloadFormat('jpeg')}
                    className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      downloadFormat === 'jpeg'
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    JPEG
                  </button>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDownloadModalOpen(false)}
                disabled={isDownloading}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs uppercase cursor-pointer"
              >
                {lang === 'en' ? 'Cancel' : 'বাতিল'}
              </button>
              <button
                type="button"
                onClick={handleDownloadImage}
                disabled={isDownloading}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{lang === 'en' ? 'Generating...' : 'তৈরি হচ্ছে...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Download File' : 'ডাউনলোড করুন'}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
