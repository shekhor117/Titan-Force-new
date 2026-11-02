import React, { useState, useEffect } from 'react';
import { 
  Users, Crosshair, Calendar, Trophy, ShoppingBag, 
  CreditCard, Newspaper, Info, Phone, ArrowUp, Sparkles, Layers 
} from 'lucide-react';
import { PageView } from './PageHeaderBanner';

interface ClubNavStripProps {
  lang: 'en' | 'bn';
  activeSection: string;
  onNavigateSection: (sectionId: PageView) => void;
  viewMode: 'full' | 'focused';
  onToggleViewMode: () => void;
}

export const ClubNavStrip: React.FC<ClubNavStripProps> = ({
  lang,
  activeSection,
  onNavigateSection,
  viewMode,
  onToggleViewMode
}) => {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageView; labelEn: string; labelBn: string; icon: React.ReactNode }[] = [
    { id: 'squad', labelEn: 'Squad (12)', labelBn: 'স্কোয়াড (১২)', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'tactics', labelEn: 'Tactics (5–11)', labelBn: 'রণকৌশল (৫–১১)', icon: <Crosshair className="w-3.5 h-3.5" /> },
    { id: 'matches', labelEn: 'Matches', labelBn: 'ম্যাচ সূচি', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'standings', labelEn: 'Standings', labelBn: 'পয়েন্ট টেবিল', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'trophies', labelEn: 'Trophies', labelBn: 'ট্রফি রুম', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'store', labelEn: 'Kit 17 Store', labelBn: 'জার্সি স্টোর', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'member-pass', labelEn: 'Fan Pass', labelBn: 'ফ্যান পাস', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'news', labelEn: 'News', labelBn: 'সংবাদ', icon: <Newspaper className="w-3.5 h-3.5" /> },
    { id: 'about', labelEn: 'About', labelBn: 'ক্লাব ঐতিহ্য', icon: <Info className="w-3.5 h-3.5" /> },
    { id: 'contact', labelEn: 'Contact', labelBn: 'যোগাযোগ', icon: <Phone className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className={`sticky top-16 sm:top-20 z-40 transition-all duration-300 ${
      scrolledPastHero ? 'bg-neutral-950/95 backdrop-blur-md shadow-xl border-b border-neutral-800' : 'bg-neutral-950 border-b border-neutral-800'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-2.5">
          
          {/* Scrollable Horizontal Pill List */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigateSection(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-md ring-1 ring-rose-400 font-black'
                      : 'bg-neutral-900/80 hover:bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-neutral-400'}>
                    {item.icon}
                  </span>
                  <span>{lang === 'en' ? item.labelEn : item.labelBn}</span>
                </button>
              );
            })}
          </div>

          {/* Right Quick Switch: View Mode Toggle */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-neutral-800 shrink-0">
            <button
              type="button"
              onClick={onToggleViewMode}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title={viewMode === 'full' ? (lang === 'en' ? 'Switch to Isolated Single Section View' : 'একক সেকশন ভিউতে যান') : (lang === 'en' ? 'Switch to Continuous Full Page' : 'পূর্ণাঙ্গ পেজে ফিরে যান')}
            >
              <Layers className="w-3.5 h-3.5 text-rose-500" />
              <span>
                {viewMode === 'full' 
                  ? (lang === 'en' ? 'All Sections' : 'পুরো পেজ')
                  : (lang === 'en' ? 'Single View' : 'একক ভিউ')}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
