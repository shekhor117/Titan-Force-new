import React, { useEffect } from 'react';
import { 
  X, Home, Users, Calendar, Crosshair, Trophy, 
  Newspaper, Info, Phone, ShoppingBag, CreditCard, 
  Sun, Moon, Globe, MapPin, ChevronRight, Sparkles, 
  Flame, ExternalLink, ShieldCheck 
} from 'lucide-react';
import { TRANSLATIONS, MATCHES_DATA, CLUB_INFO } from '../data/clubData';
import { PageView } from './PageHeaderBanner';
import { getNextUpcomingMatch, calculateKickoffCountdown, parseMatchKickoff } from '../utils/countdown';

interface ClubSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentView: PageView;
  onNavigate: (view: PageView) => void;
}

export const ClubSidebar: React.FC<ClubSidebarProps> = ({
  isOpen,
  onClose,
  lang,
  setLang,
  theme,
  toggleTheme,
  currentView,
  onNavigate
}) => {
  const t = TRANSLATIONS[lang];
  const upcomingMatch = getNextUpcomingMatch(MATCHES_DATA) || MATCHES_DATA[7];
  const matchCountdown = calculateKickoffCountdown(parseMatchKickoff(upcomingMatch));

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleLinkClick = (id: PageView) => {
    onNavigate(id);
    onClose();
  };

  const navGroups: {
    titleEn: string;
    titleBn: string;
    links: { id: PageView; labelEn: string; labelBn: string; icon: React.ReactNode; badge?: string }[];
  }[] = [
    {
      titleEn: 'Football & Squad',
      titleBn: 'ফুটবল ও স্কোয়াড',
      links: [
        { id: 'home', labelEn: 'Club Home', labelBn: 'হোম পেজ', icon: <Home className="w-4 h-4" /> },
        { id: 'squad', labelEn: 'First Team Squad', labelBn: 'ফার্স্ট টিম স্কোয়াড', icon: <Users className="w-4 h-4" />, badge: '12 Players' },
        { id: 'matches', labelEn: 'Match Centre & Fixtures', labelBn: 'ম্যাচ সেন্টার ও সূচি', icon: <Calendar className="w-4 h-4" />, badge: '8 Wins' },
        { id: 'tactics', labelEn: 'Tactical Board (4-3-3)', labelBn: 'রণকৌশল বোর্ড (৪-৩-৩)', icon: <Crosshair className="w-4 h-4" /> },
        { id: 'standings', labelEn: 'League Table & Standings', labelBn: 'পয়েন্ট টেবিল ও গোলস্কোরার', icon: <Trophy className="w-4 h-4" />, badge: '1st Place' },
        { id: 'trophies', labelEn: 'Honours & Trophy Cabinet', labelBn: 'ট্রফি ও সম্মাননা গ্যালারি', icon: <Trophy className="w-4 h-4 text-amber-400" />, badge: '2026 Champion' },
      ]
    },
    {
      titleEn: 'Official Store & Fans',
      titleBn: 'অফিশিয়াল স্টোর ও সমর্থক',
      links: [
        { id: 'store', labelEn: 'Kit 17 Shekhor Jersey', labelBn: 'কিট ১৭ শেখর জার্সি স্টোর', icon: <ShoppingBag className="w-4 h-4 text-rose-500" />, badge: '499 ৳' },
        { id: 'member-pass', labelEn: 'Digital Supporter Pass', labelBn: 'ডিজিটাল ফ্যান মেম্বারশিপ পাস', icon: <CreditCard className="w-4 h-4 text-purple-400" />, badge: 'Card ID' },
      ]
    },
    {
      titleEn: 'Club & Community',
      titleBn: 'ক্লাব ও যোগাযোগ',
      links: [
        { id: 'news', labelEn: 'Club News & Match Reports', labelBn: 'ক্লাব সংবাদ ও খবর', icon: <Newspaper className="w-4 h-4" /> },
        { id: 'about', labelEn: 'About Club & Mulikandi Ground', labelBn: 'ক্লাব ও মুলিকান্দি মাঠের ইতিহাস', icon: <Info className="w-4 h-4" /> },
        { id: 'contact', labelEn: 'Contact Desk & Inquiries', labelBn: 'যোগাযোগ ও ম্যাচ আমন্ত্রণ', icon: <Phone className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm z-[998] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Slide-over Sidebar Drawer */}
      <aside 
        className={`fixed inset-y-0 right-0 z-[999] w-full sm:w-[420px] max-w-full bg-neutral-950 border-l border-neutral-800 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Club Navigation Sidebar"
      >
        
        {/* Top Header Bar inside Sidebar */}
        <div className="p-4 sm:p-5 border-b border-neutral-800/90 flex items-center justify-between gap-3 bg-neutral-900/60 backdrop-blur-md">
          
          {/* Brand Crest & Title */}
          <button 
            type="button"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <img 
              src="/logos/titanforce-logo.svg" 
              alt="Titan Force Crest" 
              className="w-10 h-10 object-contain drop-shadow group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="font-display text-xl font-black uppercase text-white group-hover:text-rose-500 transition-colors tracking-wider leading-none">
                TITAN FORCE
              </div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-rose-500 uppercase mt-0.5">
                MULIKANDI · EST. 2025
              </div>
            </div>
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200 text-neutral-200" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-6">
          
          {/* Next Match Highlight Pill Box */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-rose-500">
                <span className={`w-2 h-2 rounded-full ${matchCountdown.isLive ? 'bg-rose-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
                <span>{matchCountdown.isLive ? (lang === 'en' ? 'Live Match' : 'লাইভ খেলা') : (lang === 'en' ? 'Next Matchday' : 'পরবর্তী ম্যাচ')}</span>
              </span>
              <span className="text-neutral-400 font-mono text-[10px]">
                {matchCountdown.isLive 
                  ? (lang === 'en' ? 'LIVE NOW' : 'সরাসরি লাইভ')
                  : matchCountdown.days > 0 
                    ? (lang === 'en' ? `${matchCountdown.days}d to kickoff` : `${matchCountdown.days} দিন বাকি`)
                    : (lang === 'en' ? `${matchCountdown.hours}h ${matchCountdown.mins}m` : `${matchCountdown.hours}ঘণ্টা ${matchCountdown.mins}মি`)}
              </span>
            </div>
            
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-display font-black uppercase text-white truncate max-w-[42%]">{upcomingMatch.homeTeam}</span>
              <span className="font-display text-[11px] font-black text-rose-500 px-1.5 py-0.5 rounded bg-neutral-950 shrink-0">VS</span>
              <span className="font-display font-black uppercase text-neutral-300 truncate max-w-[42%]">{upcomingMatch.awayTeam}</span>
            </div>

            <button
              type="button"
              onClick={() => handleLinkClick('matches')}
              className="w-full mt-1 py-1.5 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{lang === 'en' ? 'View Match Details' : 'ম্যাচ বিবরণী দেখুন'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-rose-500" />
            </button>
          </div>

          {/* Navigation Groups */}
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-1">
                {lang === 'en' ? group.titleEn : group.titleBn}
              </div>

              <div className="space-y-1">
                {group.links.map((link) => {
                  const isActive = currentView === link.id;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => handleLinkClick(link.id)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all flex items-center justify-between cursor-pointer group ${
                        isActive
                          ? 'bg-rose-600 text-white shadow-md font-black ring-1 ring-rose-400'
                          : 'bg-neutral-900/60 hover:bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-800/80 hover:border-neutral-700'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={isActive ? 'text-white' : 'text-neutral-400 group-hover:text-rose-500 transition-colors'}>
                          {link.icon}
                        </span>
                        <span>{lang === 'en' ? link.labelEn : link.labelBn}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {link.badge && (
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                          }`}>
                            {link.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                          isActive ? 'text-white' : 'text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Settings: Theme & Language */}
          <div className="space-y-2 pt-2 border-t border-neutral-800/80">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-1">
              {lang === 'en' ? 'Display Preferences' : 'থিম ও ভাষা পছন্দ'}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">
                    {lang === 'en' ? 'Theme' : 'থিম'}
                  </span>
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-rose-500" />}
                </div>
                <div className="text-xs font-bold text-white mt-1">
                  {theme === 'dark' 
                    ? (lang === 'en' ? 'Dark Mode' : 'ডার্ক মোড') 
                    : (lang === 'en' ? 'Vibrant Light' : 'ভাইব্রেন্ট লাইট')}
                </div>
              </button>

              {/* Language Switch */}
              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
                className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">
                    {lang === 'en' ? 'Language' : 'ভাষা'}
                  </span>
                  <Globe className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-xs font-bold text-white mt-1">
                  {lang === 'en' ? 'বাংলা সংস্করণ' : 'English'}
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar Footer with Hotline & Ground Address */}
        <div className="p-4 sm:p-5 border-t border-neutral-800/90 bg-neutral-900/60 backdrop-blur-md space-y-2 text-xs">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Mulikandi High School Ground</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-neutral-400">Official Club Hotline:</span>
            <a 
              href="tel:+8809697377938" 
              className="font-mono font-bold text-white hover:text-rose-400 transition-colors"
            >
              +8809697377938
            </a>
          </div>

          <div className="pt-2 text-[10px] text-center text-neutral-400 border-t border-neutral-800/60">
            © 2025–2026 TITAN FORCE MULIKANDI FC · DAUDPUR CHAMPIONS
          </div>
        </div>

      </aside>
    </>
  );
};
