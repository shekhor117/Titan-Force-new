import React from 'react';
import { Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import { PageView } from './PageHeaderBanner';

interface ClubHighlightsStripProps {
  lang: 'en' | 'bn';
  onNavigate: (view: PageView) => void;
  onNavigateToPlayer?: (player: any) => void;
  onNavigateToMatch?: (match: any) => void;
}

export const ClubHighlightsStrip: React.FC<ClubHighlightsStripProps> = ({
  lang,
  onNavigate
}) => {
  return (
    <div className="relative bg-neutral-950 border-b border-neutral-800/80 py-5 sm:py-7 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Athletic Metric Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-lg">
          
          <button
            type="button"
            onClick={() => onNavigate('trophies')}
            className="space-y-0.5 text-center sm:text-left hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-amber-400 transition-colors">
              {lang === 'en' ? 'Championship Title' : 'অফিশিয়াল শিরোপা'}
            </span>
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-display font-black text-lg sm:text-xl text-white">
                Daudpur 2026
              </span>
            </div>
            <span className="text-[10px] text-amber-400/90 font-medium block">
              {lang === 'en' ? 'Undefeated Champions' : 'অপরাজিত চ্যাম্পিয়ন দল'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('matches')}
            className="space-y-0.5 text-center sm:text-left border-l border-neutral-800/80 pl-3 sm:pl-5 hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-emerald-400 transition-colors">
              {lang === 'en' ? 'Tournament Record' : 'টুর্নামেন্ট রেকর্ড'}
            </span>
            <div className="font-display font-black text-lg sm:text-xl text-emerald-400">
              8W · 1D · 0L
            </div>
            <span className="text-[10px] text-neutral-400 font-medium block">
              {lang === 'en' ? '88.9% Win Rate (24 Pts)' : '৮৮.৯% উইন রেট (২৪ পয়েন্ট)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('standings')}
            className="space-y-0.5 text-center sm:text-left border-l border-neutral-800/80 pl-3 sm:pl-5 hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-rose-400 transition-colors">
              {lang === 'en' ? 'Goal Difference' : 'গোল ব্যবধান'}
            </span>
            <div className="font-display font-black text-lg sm:text-xl text-rose-500">
              +19 GD
            </div>
            <span className="text-[10px] text-neutral-400 font-medium block">
              {lang === 'en' ? '23 Scored · 4 Conceded' : '২৩ গোল করেছে · ৪ হজম'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('squad')}
            className="space-y-0.5 text-center sm:text-left border-l border-neutral-800/80 pl-3 sm:pl-5 hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-sky-400 transition-colors">
              {lang === 'en' ? 'Defensive Wall' : 'ডিফেন্সিভ প্রাচীর'}
            </span>
            <div className="font-display font-black text-lg sm:text-xl text-sky-400 flex items-center justify-center sm:justify-start gap-1">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>4 Clean Sheets</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-medium block">
              {lang === 'en' ? 'Shuronjit & Back 4' : 'সুরঞ্জিত ও ব্যাকফোর দেয়াল'}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};

