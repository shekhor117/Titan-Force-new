import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ShoppingBag, Globe, Trophy, Shield, 
  Flame, Sparkles, Users, Crosshair, Calendar, 
  CreditCard, Newspaper, Info, Phone, Home, ChevronRight,
  Sun, Moon, ArrowRight, MapPin, Star, Layers
} from 'lucide-react';
import { TRANSLATIONS } from '../data/clubData';
import { PageView } from './PageHeaderBanner';

interface HeaderProps {
  lang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
  onOpenStore: () => void;
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  lang, 
  setLang, 
  onOpenStore, 
  currentView,
  onNavigate,
  theme,
  toggleTheme
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  // Close sidebar drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when sidebar drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const navLinks: { 
    id: PageView; 
    label: string; 
    icon: React.ReactNode; 
    group: 'football' | 'fan' | 'club';
    badge?: string;
  }[] = [
    { id: 'home', label: lang === 'en' ? 'Home' : 'হোম', icon: <Home className="w-4 h-4" />, group: 'football' },
    { id: 'squad', label: t.nav.squad, icon: <Users className="w-4 h-4" />, group: 'football', badge: '12 Players' },
    { id: 'matches', label: t.nav.fixtures, icon: <Calendar className="w-4 h-4" />, group: 'football', badge: 'Nov 15' },
    { id: 'tactics', label: lang === 'en' ? 'Tactics' : 'রণকৌশল', icon: <Crosshair className="w-4 h-4" />, group: 'football', badge: '5–11s' },
    { id: 'standings', label: lang === 'en' ? 'Standings' : 'পয়েন্ট টেবিল', icon: <Trophy className="w-4 h-4" />, group: 'football', badge: '1st' },
    { id: 'trophies', label: t.nav.trophies, icon: <Trophy className="w-4 h-4" />, group: 'football', badge: '2026 🏆' },
    { id: 'store', label: t.nav.store, icon: <ShoppingBag className="w-4 h-4" />, group: 'fan', badge: '499 ৳' },
    { id: 'member-pass', label: lang === 'en' ? 'Fan Pass' : 'ফ্যান পাস', icon: <CreditCard className="w-4 h-4" />, group: 'fan', badge: 'Free ID' },
    { id: 'news', label: lang === 'en' ? 'News' : 'সংবাদ', icon: <Newspaper className="w-4 h-4" />, group: 'club', badge: 'Latest' },
    { id: 'about', label: t.nav.about, icon: <Info className="w-4 h-4" />, group: 'club' },
    { id: 'contact', label: t.nav.contact, icon: <Phone className="w-4 h-4" />, group: 'club' },
  ];

  const handleLinkClick = (id: PageView) => {
    onNavigate(id);
    setSidebarOpen(false);
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 transition-colors">
        
        {/* 1. Top Utility Announcement Ribbon */}
        <div className="top-ribbon bg-neutral-900 border-b border-neutral-800/80 px-3 sm:px-4 py-1.5 text-[10px] sm:text-[11px] text-neutral-400 font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            
            {/* Ticker / Announcement Message */}
            <button 
              type="button"
              onClick={() => handleLinkClick('trophies')}
              className="flex items-center gap-2 truncate text-left hover:text-white transition-colors cursor-pointer group"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-rose-600 shrink-0 animate-pulse" />
              <span className="font-semibold text-white tracking-wide truncate group-hover:text-rose-400 transition-colors">
                {lang === 'en'
                  ? 'DAUDPUR TOURNAMENT 2026 CHAMPIONS · NEXT MATCH: NOV 15 vs ZAKIGONJ UNITED (MULIKANDI HIGH SCHOOL)'
                  : 'দাউদপুর টুর্নামেন্ট ২০২৬ চ্যাম্পিয়ন · পরবর্তী ম্যাচ: ১৫ নভেম্বর বনাম জকিগঞ্জ ইউনাইটেড (মুলিকান্দি মাঠ)'}
              </span>
            </button>

            {/* Right Utility Proof & Contact */}
            <div className="hidden md:flex items-center gap-3 shrink-0 text-neutral-400">
              <button
                type="button"
                onClick={() => handleLinkClick('trophies')}
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold cursor-pointer transition-colors"
              >
                <Trophy className="w-3 h-3" />
                <span>Daudpur Cup 2026</span>
              </button>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <a 
                href="tel:+8809697377938" 
                className="hover:text-white transition-colors font-mono"
                title="Club Hotline"
              >
                +8809697377938
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main Header Row */}
        <header className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 h-16 sm:h-20">
            
            {/* Zone 1: Official Crest & Club Identity */}
            <button 
              type="button"
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-2.5 sm:gap-3.5 whitespace-nowrap shrink-0 group text-left cursor-pointer focus:outline-none"
            >
              <img 
                src="/logos/titanforce-logo.svg" 
                alt="Titan Force Crest" 
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow group-hover:scale-105 transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-white group-hover:text-rose-500 transition-colors uppercase leading-none">
                  TITAN FORCE
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-rose-500 uppercase mt-0.5">
                  MULIKANDI · EST. 2025
                </span>
              </div>
            </button>

            {/* Zone 2: Desktop Navigation Links (Responsive from lg: 1024px+) */}
            <nav className="hidden lg:flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-neutral-300">
              {navLinks.filter(l => l.id !== 'store' && l.id !== 'member-pass').map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-2 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-rose-600/20 text-rose-400 font-black shadow-sm ring-1 ring-rose-500/40' 
                        : 'hover:bg-neutral-900 hover:text-white text-neutral-300'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-rose-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions + Theme Toggle + Language Toggle + Prominent SIDEBAR Button */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              
              {/* Theme Toggle Button (Dark / Vibrant Light) */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-bold rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-200 hover:text-white transition-all cursor-pointer group shadow-sm active:scale-95"
                title={theme === 'dark' ? (lang === 'en' ? 'Switch to Vibrant Light Mode' : 'লাইট মোডে পরিবর্তন করুন') : (lang === 'en' ? 'Switch to Dark Mode' : 'ডার্ক মোডে পরিবর্তন করুন')}
                aria-label="Toggle Theme Mode"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
                    <span className="hidden sm:inline font-semibold">{lang === 'en' ? 'Light' : 'লাইট'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-rose-500 group-hover:-rotate-12 transition-transform duration-300" />
                    <span className="hidden sm:inline font-semibold">{lang === 'en' ? 'Dark' : 'ডার্ক'}</span>
                  </>
                )}
              </button>

              {/* Language Switcher Button */}
              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-bold rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-200 hover:text-white transition-colors cursor-pointer"
                title="Toggle Language (English / বাংলা)"
              >
                <Globe className="w-3.5 h-3.5 text-rose-500" />
                <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
              </button>

              {/* Primary Action Button: Kit 17 Store */}
              <button
                type="button"
                onClick={() => handleLinkClick('store')}
                className={`hidden md:inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg shadow transition-all whitespace-nowrap shrink-0 active:scale-95 cursor-pointer ${
                  currentView === 'store'
                    ? 'bg-rose-500 text-white ring-2 ring-rose-400'
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/40'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Kit 17 Store' : 'জার্সি কিনুন'}</span>
              </button>

              {/* SIDEBAR TOGGLE BUTTON (Icon Only with tactile smooth press) */}
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="relative p-2 sm:p-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 hover:border-rose-500/60 shadow-sm transition-all duration-200 cursor-pointer group active:scale-90 active:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                title={lang === 'en' ? 'Open Navigation Menu' : 'মেনু খুলুন'}
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-rose-500 group-hover:scale-110 group-hover:rotate-6 group-active:rotate-90 transition-transform duration-300" />
              </button>

            </div>
          </div>
        </header>
      </div>

      {/* 3. Backdrop Overlay for Slide-Over Sidebar (Smooth Opacity & Blur Fade) */}
      <div 
        aria-hidden={!sidebarOpen}
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm z-[998] transition-all duration-350 ease-out cursor-pointer ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 4. Full-Height Slide-Over Sidebar Drawer (Hardware-accelerated Smooth Slide) */}
      <aside 
        className={`fixed top-0 right-0 bottom-0 w-[88vw] sm:w-[400px] max-w-full z-[999] bg-neutral-950/98 backdrop-blur-2xl border-l border-neutral-800/80 flex flex-col justify-between transform-gpu will-change-transform transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          sidebarOpen 
            ? 'translate-x-0 shadow-[-20px_0_60px_rgba(0,0,0,0.85)] opacity-100' 
            : 'translate-x-full pointer-events-none shadow-none opacity-90'
        }`}
        aria-label="Club Navigation Sidebar"
      >
        
        {/* Sidebar Header Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src="/logos/titanforce-logo.svg" 
              alt="Titan Force Crest" 
              className="w-10 h-10 object-contain drop-shadow"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="font-display text-xl font-black uppercase text-white tracking-wider leading-none">
                TITAN FORCE
              </div>
              <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-0.5">
                {lang === 'en' ? 'OFFICIAL CLUB SIDEBAR' : 'অফিশিয়াল ক্লাব সাইডবার'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-xl bg-neutral-950 hover:bg-rose-500/10 text-neutral-400 hover:text-rose-500 border border-neutral-800 hover:border-rose-500/30 transition-all duration-200 cursor-pointer active:scale-90 group focus:outline-none"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5 text-rose-500 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          
          {/* Quick Utility Switcher Strip */}
          <div className="grid grid-cols-2 gap-2 p-2 rounded-2xl bg-neutral-900/80 border border-neutral-800">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-xs font-bold transition-colors cursor-pointer text-neutral-200"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'en' ? 'Light Mode' : 'লাইট মোড'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-rose-500" />
                  <span>{lang === 'en' ? 'Dark Mode' : 'ডার্ক মোড'}</span>
                </>
              )}
            </button>

            {/* Language Toggle */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-xs font-bold transition-colors cursor-pointer text-neutral-200"
            >
              <Globe className="w-4 h-4 text-rose-500" />
              <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
          </div>

          {/* Group 1: Team & Football */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-1">
              <span>{lang === 'en' ? 'Team & Tournament' : 'দল ও টুর্নামেন্ট'}</span>
              <span className="text-[10px] text-rose-500 font-mono">6 PAGES</span>
            </div>
            <div className="space-y-1.5">
              {navLinks.filter(l => l.group === 'football').map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all flex items-center justify-between cursor-pointer group ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-lg font-black ring-1 ring-rose-400'
                        : 'bg-neutral-900/70 text-neutral-200 hover:bg-neutral-900 hover:text-white border border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`p-1.5 rounded-lg ${isActive ? 'bg-rose-700 text-white' : 'bg-neutral-950 text-neutral-400 group-hover:text-rose-500'}`}>
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {link.badge && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                          isActive 
                            ? 'bg-rose-800 text-white' 
                            : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-600 group-hover:text-neutral-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Supporters & Official Store */}
          <div className="space-y-2 pt-2 border-t border-neutral-800/80">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-1">
              <span>{lang === 'en' ? 'Supporters & Merchandise' : 'সমর্থক ও মার্চেন্ডাইজ'}</span>
              <span className="text-[10px] text-amber-400 font-mono">OFFICIAL</span>
            </div>
            <div className="space-y-1.5">
              {navLinks.filter(l => l.group === 'fan').map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all flex items-center justify-between cursor-pointer group ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-lg font-black ring-1 ring-rose-400'
                        : 'bg-neutral-900/70 text-neutral-200 hover:bg-neutral-900 hover:text-white border border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`p-1.5 rounded-lg ${isActive ? 'bg-rose-700 text-white' : 'bg-neutral-950 text-neutral-400 group-hover:text-rose-500'}`}>
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {link.badge && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                          isActive 
                            ? 'bg-rose-800 text-white' 
                            : 'bg-neutral-950 text-amber-400 border border-neutral-800'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-600 group-hover:text-neutral-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Media & Club Heritage */}
          <div className="space-y-2 pt-2 border-t border-neutral-800/80">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-1">
              <span>{lang === 'en' ? 'Club & Media' : 'ক্লাব ও মিডিয়া'}</span>
              <span className="text-[10px] text-neutral-500 font-mono">MULIKANDI</span>
            </div>
            <div className="space-y-1.5">
              {navLinks.filter(l => l.group === 'club').map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all flex items-center justify-between cursor-pointer group ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-lg font-black ring-1 ring-rose-400'
                        : 'bg-neutral-900/70 text-neutral-200 hover:bg-neutral-900 hover:text-white border border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`p-1.5 rounded-lg ${isActive ? 'bg-rose-700 text-white' : 'bg-neutral-950 text-neutral-400 group-hover:text-rose-500'}`}>
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {link.badge && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                          isActive 
                            ? 'bg-rose-800 text-white' 
                            : 'bg-neutral-950 text-teal-400 border border-neutral-800'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-600 group-hover:text-neutral-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Captain Spotlight Mini Card inside Sidebar */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img 
                src="/players/player-17.png" 
                alt="Captain Shekhor Mohan Roy" 
                className="w-11 h-11 rounded-xl object-cover object-top border border-rose-500/50 shadow"
              />
              <div>
                <div className="text-xs font-bold text-white uppercase">
                  Shekhor Mohan Roy
                </div>
                <div className="text-[10px] text-rose-500 font-semibold uppercase">
                  #17 · Team Captain & Top Scorer
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.hash = 'player/17';
                setSidebarOpen(false);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold uppercase transition-colors shrink-0 cursor-pointer"
            >
              {lang === 'en' ? 'Profile' : 'প্রোফাইল'}
            </button>
          </div>

        </div>

        {/* Sidebar Footer Information */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-900/90 shrink-0 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">{lang === 'en' ? 'Official Hotline:' : 'অফিশিয়াল হটলাইন:'}</span>
            <a 
              href="tel:+8809697377938" 
              className="text-white hover:text-rose-400 font-mono font-bold transition-colors"
            >
              +8809697377938
            </a>
          </div>
          
          <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">Mulikandi High School Ground, Zakigonj</span>
          </div>

          <div className="text-[10px] text-neutral-500 text-center pt-1 border-t border-neutral-800/80">
            © 2025–2026 TITAN FORCE MULIKANDI FC
          </div>
        </div>

      </aside>
    </>
  );
};
