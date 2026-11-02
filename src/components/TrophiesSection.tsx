import React, { useState } from 'react';
import { Trophy as TrophyIcon, Award, Shield, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { TROPHIES_DATA, TRANSLATIONS } from '../data/clubData';

interface TrophiesSectionProps {
  lang: 'en' | 'bn';
}

export const TrophiesSection: React.FC<TrophiesSectionProps> = ({ lang }) => {
  const [showStoryModal, setShowStoryModal] = useState(false);
  const trophy = TROPHIES_DATA[0];
  const t = TRANSLATIONS[lang];

  return (
    <section id="trophies" className="scroll-mt-28 sm:scroll-mt-32 py-16 sm:py-20 bg-neutral-950 border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 pb-10 border-b border-neutral-800">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
            <TrophyIcon className="w-4 h-4" />
            <span>{lang === 'en' ? 'Club Honours & Glory' : 'ক্লাব ট্রফি ও সম্মাননা'}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {t.trophy.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
            {t.trophy.subtitle}
          </p>
        </div>

        {/* Feature Bento Card: Championship Showcase */}
        <div className="mt-12 rounded-2xl bg-neutral-900/90 border border-neutral-800 overflow-hidden shadow-2xl card-interactive-glow-amber">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Left 5 Cols: High-Fidelity Trophy Celebration Image */}
            <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full">
              <img
                src="/src/assets/images/titan_trophy_celebration_1792594584475.jpg"
                alt="Daudpur Tournament Trophy 2026"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-900" />
              
              {/* Overlay Year Badge */}
              <div className="absolute top-4 left-4 font-display text-3xl font-black tracking-wider text-amber-400 drop-shadow">
                2026 CHAMPIONS
              </div>
            </div>

            {/* Right 7 Cols: Trophy Details, Tournament Path & Story */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Award className="w-4 h-4" />
                  <span>{trophy.category}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span className="text-neutral-400">{trophy.venue}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  {trophy.name}
                </h3>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {lang === 'en' ? trophy.description : trophy.descriptionBn}
                </p>

                {/* Tournament Run Proof Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1">
                    <div className="text-xs text-neutral-400 font-medium">Grand Final Result</div>
                    <div className="font-display text-xl font-black text-rose-500 tabular-nums">
                      TF Mulikandi 1 - 0 Rising Titans
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1">
                    <div className="text-xs text-neutral-400 font-medium">Tournament Defensive Record</div>
                    <div className="font-display text-xl font-black text-emerald-400 tabular-nums">
                      4 Clean Sheets in 5 Matches
                    </div>
                  </div>
                </div>

                {/* Highlight Quote */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-200">
                  <span className="font-semibold">{trophy.highlight}</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">
                  Mulikandi Legacy · Est. 2025
                </span>

                <button
                  onClick={() => setShowStoryModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <span>{t.trophy.viewStory}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Story of the Championship */}
        {showStoryModal && (
          <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setShowStoryModal(false)}
          >
            <div className="flex min-h-full items-center justify-center py-4">
              <div 
                className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-amber-400">Road to the Trophy</span>
                    <h3 className="font-display text-2xl font-black uppercase text-white">
                      The 2026 Daudpur Triumph
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowStoryModal(false)}
                    className="p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-800"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  <p>
                    Entering the tournament as spirited underdogs, Titan Force Mulikandi showcased an iron-clad defense anchored by captain Shekhor Mohan Roy and goalkeeper Shuronjit Biswas.
                  </p>
                  <div className="space-y-2 py-2">
                    <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between items-center text-xs">
                      <span>Quarter-Final vs Mijarchok</span>
                      <strong className="text-emerald-400 font-mono">1 - 0 Win</strong>
                    </div>
                    <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between items-center text-xs">
                      <span>Semi-Final vs Wasar FC</span>
                      <strong className="text-emerald-400 font-mono">2 - 0 Win</strong>
                    </div>
                    <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between items-center text-xs">
                      <span>Grand Final vs Daudpur Rising Titans</span>
                      <strong className="text-amber-400 font-mono">1 - 0 Win 🏆</strong>
                    </div>
                  </div>
                  <p>
                    When the final whistle blew in Daudpur, the traveling Mulikandi supporters erupted in pride. The trophy now sits proudly in Mulikandi as proof of what grassroots passion and disciplined teamwork can achieve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
