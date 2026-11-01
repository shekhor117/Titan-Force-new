import React, { useState } from 'react';
import { STANDINGS_DATA, PLAYERS_DATA } from '../data/clubData';
import { Trophy, TrendingUp, Award, Flame, Star, ShieldCheck } from 'lucide-react';

interface StandingsSectionProps {
  lang: 'en' | 'bn';
}

export const StandingsSection: React.FC<StandingsSectionProps> = ({ lang }) => {
  const [activeLeaderboard, setActiveLeaderboard] = useState<'goals' | 'assists'>('goals');

  // Sorted players for leaderboards
  const topScorers = [...PLAYERS_DATA].sort((a, b) => b.goals - a.goals).slice(0, 4);
  const topAssists = [...PLAYERS_DATA].sort((a, b) => b.assists - a.assists).slice(0, 4);

  return (
    <section id="standings" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 pb-10 border-b border-neutral-800">
          <div className="text-xs font-bold uppercase tracking-widest text-rose-500 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{lang === 'en' ? 'Official Championship Table' : 'অফিশিয়াল পয়েন্ট টেবিল ও লিডারবোর্ড'}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {lang === 'en' ? 'Standings & Player Honours' : 'পয়েন্ট টেবিল ও শীর্ষ স্কোরার'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
            {lang === 'en' 
              ? 'Titan Force Mulikandi leads the regional campaign in top spot, holding 24 points from 9 competitive matches.'
              : '৯ ম্যাচে ৮ জয়ে ২৪ পয়েন্ট নিয়ে টেবিলের শীর্ষে অবস্থান করছে টাইটান ফোর্স মুলিকান্দি।'}
          </p>
        </div>

        {/* Content Split: Standings Table (8 Cols) / Leaderboard (4 Cols) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Standings Table Card (8 Columns) */}
          <div className="lg:col-span-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold uppercase text-white">
                  Daudpur & Sylhet Regional League
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  2026 Season
                </span>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                Matchday 9 of 10
              </span>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium min-w-[560px]">
                <thead className="bg-neutral-950/70 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-800">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold text-center w-12">#</th>
                    <th className="py-3.5 px-4 font-semibold">Club</th>
                    <th className="py-3.5 px-3 font-semibold text-center font-mono">P</th>
                    <th className="py-3.5 px-3 font-semibold text-center font-mono">W</th>
                    <th className="py-3.5 px-3 font-semibold text-center font-mono">D</th>
                    <th className="py-3.5 px-3 font-semibold text-center font-mono">L</th>
                    <th className="py-3.5 px-3 font-semibold text-center font-mono">GD</th>
                    <th className="py-3.5 px-4 font-semibold text-center font-mono text-white">PTS</th>
                    <th className="py-3.5 px-4 font-semibold text-center hidden sm:table-cell">Recent Form</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80">
                  {STANDINGS_DATA.map((row) => {
                    const isTitanForce = row.team.includes('Titan Force');

                    return (
                      <tr
                        key={row.pos}
                        className={`transition-colors ${
                          isTitanForce 
                            ? 'bg-rose-950/20 hover:bg-rose-950/30 font-semibold' 
                            : 'hover:bg-neutral-800/40 text-neutral-300'
                        }`}
                      >
                        <td className="py-3 px-4 text-center font-mono tabular-nums">
                          {row.pos === 1 ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[11px]">
                              1
                            </span>
                          ) : (
                            row.pos
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            {isTitanForce && (
                              <img 
                                src="/logos/titanforce-logo.svg" 
                                alt="Crest" 
                                className="w-5 h-5 object-contain"
                                referrerPolicy="no-referrer"
                              />
                            )}
                            <span className={isTitanForce ? 'text-white font-bold' : ''}>
                              {row.team}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-3 text-center font-mono tabular-nums">{row.p}</td>
                        <td className="py-3 px-3 text-center font-mono tabular-nums text-emerald-400">{row.w}</td>
                        <td className="py-3 px-3 text-center font-mono tabular-nums text-neutral-400">{row.d}</td>
                        <td className="py-3 px-3 text-center font-mono tabular-nums text-neutral-400">{row.l}</td>
                        <td className="py-3 px-3 text-center font-mono tabular-nums">
                          <span className={row.gd > 0 ? 'text-emerald-400' : row.gd < 0 ? 'text-rose-400' : ''}>
                            {row.gd > 0 ? `+${row.gd}` : row.gd}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono tabular-nums font-bold text-sm text-white">
                          {row.pts}
                        </td>

                        <td className="py-3 px-4 text-center hidden sm:table-cell">
                          <div className="flex items-center justify-center gap-1">
                            {row.form.map((res, idx) => (
                              <span
                                key={idx}
                                className={`w-4 h-4 rounded text-[9px] font-bold font-mono flex items-center justify-center ${
                                  res === 'W'
                                    ? 'bg-emerald-600 text-white'
                                    : res === 'D'
                                    ? 'bg-neutral-700 text-neutral-200'
                                    : 'bg-rose-700 text-white'
                                }`}
                              >
                                {res}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footnote */}
            <div className="p-3 bg-neutral-950/50 border-t border-neutral-800 text-[11px] text-neutral-500 flex items-center justify-between px-4">
              <span>Top position awards Daudpur Championship & Sylhet Super Cup qualification.</span>
              <span className="text-amber-400 font-semibold">Titan Force: 8-0-1 Record</span>
            </div>
          </div>

          {/* Player Leaderboard (4 Columns) */}
          <div className="lg:col-span-4 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="font-display text-xl font-bold uppercase text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>Player Honors</span>
              </h3>

              {/* Segmented Switcher */}
              <div className="inline-flex p-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs">
                <button
                  onClick={() => setActiveLeaderboard('goals')}
                  className={`px-3 py-1 font-semibold rounded ${
                    activeLeaderboard === 'goals'
                      ? 'bg-rose-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Goals
                </button>
                <button
                  onClick={() => setActiveLeaderboard('assists')}
                  className={`px-3 py-1 font-semibold rounded ${
                    activeLeaderboard === 'assists'
                      ? 'bg-rose-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Assists
                </button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              {(activeLeaderboard === 'goals' ? topScorers : topAssists).map((player, idx) => (
                <div
                  key={player.id}
                  className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/90 flex items-center justify-between gap-3 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg font-black text-neutral-500 w-5 tabular-nums">
                      0{idx + 1}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 overflow-hidden flex items-center justify-center shrink-0 border border-neutral-800">
                      <img
                        src={player.photoUrl}
                        alt={player.fullName}
                        className="w-full h-full object-contain object-bottom"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">
                        {player.fullName}
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        #{player.num} · {player.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-display text-2xl font-black text-rose-500 tabular-nums">
                      {activeLeaderboard === 'goals' ? player.goals : player.assists}
                    </span>
                    <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                      {activeLeaderboard === 'goals' ? 'Goals' : 'Assists'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Clean Proof Callout */}
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Golden Glove Spotlight</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                #1 Shuronjit Biswas leads all goalkeepers with 7 clean sheets from 9 official starts (77.8% shutout rate).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
