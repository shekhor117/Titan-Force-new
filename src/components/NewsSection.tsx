import React, { useState } from 'react';
import { NEWS_DATA, TRANSLATIONS, NewsItem } from '../data/clubData';
import { Newspaper, Clock, Calendar, ArrowRight, Heart, Flame, Trophy } from 'lucide-react';

interface NewsSectionProps {
  lang: 'en' | 'bn';
}

export const NewsSection: React.FC<NewsSectionProps> = ({ lang }) => {
  const [reactions, setReactions] = useState<Record<string, { fire: number; trophy: number; clap: number }>>({
    n1: { fire: 42, trophy: 88, clap: 35 },
    n2: { fire: 29, trophy: 14, clap: 64 },
    n3: { fire: 51, trophy: 19, clap: 22 }
  });

  const [selectedStory, setSelectedStory] = useState<NewsItem | null>(null);

  const handleReaction = (newsId: string, type: 'fire' | 'trophy' | 'clap') => {
    setReactions(prev => ({
      ...prev,
      [newsId]: {
        ...prev[newsId],
        [type]: (prev[newsId]?.[type] || 0) + 1
      }
    }));
  };

  return (
    <section className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 pb-10 border-b border-neutral-800">
          <div className="text-xs font-bold uppercase tracking-widest text-rose-500 flex items-center gap-2">
            <Newspaper className="w-4 h-4" />
            <span>{lang === 'en' ? 'Club News & Bulletin' : 'ক্লাব সংবাদ ও আপডেট'}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {lang === 'en' ? 'Match Reports & Club Wire' : 'ম্যাচ রিপোর্ট ও ক্লাবের খবর'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
            {lang === 'en' 
              ? 'Stay informed with matchday analysis, trophy updates, and official club bulletins.'
              : 'খেলার সর্বশেষ ফলাফল, টুর্নামেন্ট আপডেট এবং ক্লাবের গুরুত্বপূর্ণ খবরাখবর।'}
          </p>
        </div>

        {/* News Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_DATA.map((item) => {
            const rx = reactions[item.id] || { fire: 0, trophy: 0, clap: 0 };

            return (
              <div
                key={item.id}
                onClick={() => setSelectedStory(item)}
                className="group rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                {/* Image Frame */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-neutral-950/80 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Date and Read Time (Unboxed Metadata) */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                      <span>{item.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.readTime}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold uppercase text-white group-hover:text-rose-400 transition-colors line-clamp-2 leading-tight">
                      {lang === 'en' ? item.title : item.titleBn}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {lang === 'en' ? item.summary : item.summaryBn}
                    </p>
                  </div>

                  {/* Reaction Bar */}
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleReaction(item.id, 'fire')}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-950 hover:bg-neutral-800 text-neutral-300 transition-colors"
                        title="React Fire"
                      >
                        <span>🔥</span>
                        <span className="font-mono tabular-nums text-[11px]">{rx.fire}</span>
                      </button>

                      <button
                        onClick={() => handleReaction(item.id, 'trophy')}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-950 hover:bg-neutral-800 text-neutral-300 transition-colors"
                        title="React Trophy"
                      >
                        <span>🏆</span>
                        <span className="font-mono tabular-nums text-[11px]">{rx.trophy}</span>
                      </button>

                      <button
                        onClick={() => handleReaction(item.id, 'clap')}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-950 hover:bg-neutral-800 text-neutral-300 transition-colors"
                        title="React Claps"
                      >
                        <span>👏</span>
                        <span className="font-mono tabular-nums text-[11px]">{rx.clap}</span>
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-rose-500 group-hover:underline">
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Full Article View */}
        {selectedStory && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-3 sm:p-6"
            onClick={() => setSelectedStory(null)}
          >
            <div className="flex min-h-full items-center justify-center py-4">
              <div
                className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-800"
                >
                  ✕
                </button>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                    {selectedStory.category} · {selectedStory.date}
                  </span>
                  <h3 className="font-display text-2xl font-black uppercase text-white leading-tight">
                    {lang === 'en' ? selectedStory.title : selectedStory.titleBn}
                  </h3>
                </div>

                <div className="h-56 w-full rounded-xl overflow-hidden bg-neutral-950">
                  <img
                    src={selectedStory.imageUrl}
                    alt={selectedStory.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  <p className="font-semibold text-white">
                    {lang === 'en' ? selectedStory.summary : selectedStory.summaryBn}
                  </p>
                  <p>
                    Titan Force Mulikandi continues to set high benchmarks across Sylhet regional football. With unmatched discipline and unwavering backing from our village supporters, the club moves forward with determination into upcoming competitions.
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="px-5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white uppercase"
                  >
                    Close
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
