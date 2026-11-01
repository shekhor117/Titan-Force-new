import React, { useState } from 'react';
import { Player } from '../data/clubData';
import { getTacticalPosition, TacticalPositionDef } from '../data/tacticalPositions';
import { Shield, Sparkles, Info, CheckCircle2 } from 'lucide-react';

interface PlayerPositionCardProps {
  player: Player;
  lang: 'en' | 'bn';
  className?: string;
  onSelectPosition?: (pos: TacticalPositionDef) => void;
}

export const PlayerPositionCard: React.FC<PlayerPositionCardProps> = ({
  player,
  lang,
  className = '',
  onSelectPosition,
}) => {
  const primaryPosDef = getTacticalPosition(player.primaryPosition || 'CB');
  const secondaryList = player.secondaryPositions || [];
  const secondaryPosDefs = secondaryList.map(code => getTacticalPosition(code));

  // Active / hovered position for interactive tooltip
  const [activePos, setActivePos] = useState<TacticalPositionDef | null>(null);

  const handleBadgeClick = (def: TacticalPositionDef) => {
    setActivePos(prev => (prev?.code === def.code ? null : def));
    if (onSelectPosition) {
      onSelectPosition(def);
    }
  };

  return (
    <div 
      className={`rounded-2xl sm:rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 p-5 sm:p-7 shadow-lg shadow-black/5 transition-colors ${className}`}
    >
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-black text-sm sm:text-base uppercase tracking-wider text-neutral-900 dark:text-white">
          {lang === 'en' ? 'POSITION' : 'মাঠের পজিশন'}
        </h3>
        <span className="text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
          {primaryPosDef.roleGroup}
        </span>
      </div>

      {/* PRIMARY Position */}
      <div className="mt-4">
        <div className="text-[11px] font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
          {lang === 'en' ? 'PRIMARY' : 'প্রধান'}
        </div>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="font-display text-xl sm:text-2xl font-black text-neutral-950 dark:text-white tracking-tight">
            {primaryPosDef.code}
          </span>
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 truncate">
            {lang === 'en' ? `· ${primaryPosDef.name}` : `· ${primaryPosDef.nameBn}`}
          </span>
        </div>
      </div>

      {/* OTHERS Position list */}
      <div className="mt-3">
        <div className="text-[11px] font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
          {lang === 'en' ? 'OTHERS' : 'অন্যান্য'}
        </div>
        <div className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 mt-0.5 tracking-wide">
          {secondaryList.length > 0 ? secondaryList.join(', ') : (lang === 'en' ? 'None' : 'নেই')}
        </div>
      </div>

      {/* TACTICAL PITCH GRAPHIC CONTAINER (Matches Reference Image) */}
      <div className="relative mt-5 w-full aspect-[4/5] sm:aspect-[3/4] max-h-[500px] rounded-2xl bg-[#3c3c3c] dark:bg-[#343434] border border-neutral-700/80 dark:border-neutral-700/60 shadow-inner overflow-hidden select-none p-3 sm:p-4 flex items-center justify-center">
        
        {/* Real Football Pitch SVG Linework */}
        <svg 
          viewBox="0 0 100 130" 
          className="w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Outer Boundary Line */}
          <rect 
            x="4" 
            y="4" 
            width="92" 
            height="122" 
            rx="4"
            fill="none" 
            stroke="rgba(255, 255, 255, 0.12)" 
            strokeWidth="1.2" 
          />

          {/* Halfway Line */}
          <line 
            x1="4" 
            y1="65" 
            x2="96" 
            y2="65" 
            stroke="rgba(255, 255, 255, 0.14)" 
            strokeWidth="1.2" 
          />

          {/* Center Circle */}
          <circle 
            cx="50" 
            cy="65" 
            r="16" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.14)" 
            strokeWidth="1.2" 
          />

          {/* Center Spot */}
          <circle 
            cx="50" 
            cy="65" 
            r="1.8" 
            fill="rgba(255, 255, 255, 0.28)" 
          />

          {/* TOP (Opponent) Penalty Area */}
          <rect 
            x="20" 
            y="4" 
            width="60" 
            height="26" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.12)" 
            strokeWidth="1.2" 
          />

          {/* TOP Goal Area (6-yard box) */}
          <rect 
            x="34" 
            y="4" 
            width="32" 
            height="10" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.12)" 
            strokeWidth="1.2" 
          />

          {/* BOTTOM (Own) Penalty Area */}
          <rect 
            x="20" 
            y="100" 
            width="60" 
            height="26" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.12)" 
            strokeWidth="1.2" 
          />

          {/* BOTTOM Goal Area (6-yard box) */}
          <rect 
            x="34" 
            y="116" 
            width="32" 
            height="10" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.12)" 
            strokeWidth="1.2" 
          />

          {/* Bottom Penalty Spot */}
          <circle 
            cx="50" 
            cy="110" 
            r="1.2" 
            fill="rgba(255, 255, 255, 0.25)" 
          />

          {/* Top Penalty Spot */}
          <circle 
            cx="50" 
            cy="20" 
            r="1.2" 
            fill="rgba(255, 255, 255, 0.25)" 
          />
        </svg>

        {/* SECONDARY POSITIONS BADGES (Slate-blue pills) */}
        {secondaryPosDefs.map((def) => {
          const isSelected = activePos?.code === def.code;
          return (
            <button
              key={def.code}
              type="button"
              onClick={() => handleBadgeClick(def)}
              onMouseEnter={() => setActivePos(def)}
              onMouseLeave={() => setActivePos(prev => (prev?.code === def.code ? null : prev))}
              style={{
                left: `${def.x}%`,
                top: `${def.y}%`,
              }}
              aria-label={`Position: ${def.code} - ${def.name}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 min-w-[28px] sm:min-w-[32px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-bold text-[10px] sm:text-xs text-white shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                isSelected
                  ? 'bg-sky-600 ring-2 ring-white scale-110 shadow-lg'
                  : 'bg-[#485366] hover:bg-[#58667c] hover:scale-105 active:scale-95'
              }`}
            >
              {def.code}
            </button>
          );
        })}

        {/* PRIMARY POSITION BADGE (Vivid red pill matching screenshot) */}
        <button
          type="button"
          onClick={() => handleBadgeClick(primaryPosDef)}
          onMouseEnter={() => setActivePos(primaryPosDef)}
          onMouseLeave={() => setActivePos(prev => (prev?.code === primaryPosDef.code ? null : prev))}
          style={{
            left: `${primaryPosDef.x}%`,
            top: `${primaryPosDef.y}%`,
          }}
          aria-label={`Primary Position: ${primaryPosDef.code} - ${primaryPosDef.name}`}
          className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 min-w-[32px] sm:min-w-[36px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-black text-[11px] sm:text-xs text-white shadow-xl transition-all duration-200 cursor-pointer ring-1 ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            activePos?.code === primaryPosDef.code
              ? 'bg-rose-500 ring-2 ring-white scale-115'
              : 'bg-[#ff001e] hover:bg-[#e0001a] hover:scale-110 active:scale-95'
          }`}
        >
          {primaryPosDef.code}
        </button>

        {/* FLOATING HOVER / ACTIVE POPUP TOOLTIP */}
        {activePos && (
          <div 
            className="absolute bottom-3 left-3 right-3 z-30 bg-neutral-900/95 backdrop-blur-md border border-neutral-700 text-white rounded-xl p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150 pointer-events-auto"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span 
                  className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                    activePos.code === primaryPosDef.code 
                      ? 'bg-rose-600 text-white' 
                      : 'bg-slate-700 text-neutral-200'
                  }`}
                >
                  {activePos.code}
                </span>
                <span className="font-bold text-xs text-white">
                  {lang === 'en' ? activePos.name : activePos.nameBn}
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-semibold uppercase">
                {activePos.code === primaryPosDef.code 
                  ? (lang === 'en' ? 'Primary Role' : 'প্রধান ভূমিকা') 
                  : (lang === 'en' ? 'Secondary Role' : 'বিকল্প ভূমিকা')}
              </span>
            </div>
            <p className="text-[11px] text-neutral-300 mt-1 leading-relaxed">
              {lang === 'en' ? activePos.description : activePos.descriptionBn}
            </p>
          </div>
        )}

      </div>

      {/* Position Breakdown Footer Bar */}
      <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff001e] shrink-0" />
          <span className="font-medium">{lang === 'en' ? 'Primary' : 'প্রধান'}</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#485366] shrink-0 ml-2" />
          <span className="font-medium">{lang === 'en' ? 'Playable' : 'বিকল্প'}</span>
        </div>
        <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
          {1 + secondaryList.length} {lang === 'en' ? 'Positions' : 'পজিশন'}
        </span>
      </div>
    </div>
  );
};
