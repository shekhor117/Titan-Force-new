import React, { useState } from 'react';
import { CLUB_INFO, TRANSLATIONS } from '../data/clubData';
import { Facebook, Instagram, Youtube, ArrowUp, X, ShieldCheck, Check } from 'lucide-react';
import { PageView } from './PageHeaderBanner';

interface FooterProps {
  lang: 'en' | 'bn';
  onScrollToTop: () => void;
  onNavigate?: (view: PageView, filter?: string) => void;
  theme?: 'dark' | 'light';
}

// Inline TikTok SVG Icon to perfectly match the screenshot design
const TikTokIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ lang, onScrollToTop, onNavigate, theme = 'dark' }) => {
  const [modalType, setModalType] = useState<'privacy' | 'cookie' | null>(null);

  // Close modal on Escape key for smooth professional UX
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalType(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNav = (e: React.MouseEvent, view: PageView, filter?: string, anchorId?: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view, filter);
    } else {
      if (filter) {
        window.location.hash = filter;
      } else {
        window.location.hash = view;
      }
    }

    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navColumns = {
    club: {
      titleEn: 'CLUB',
      titleBn: 'ক্লাব',
      links: [
        { labelEn: 'About', labelBn: 'আমাদের সম্পর্কে', target: 'about' as PageView, filter: 'about' },
        { labelEn: 'History', labelBn: 'ঐতিহ্য ও ইতিহাস', target: 'about' as PageView, filter: 'history', anchorId: 'history' },
        { labelEn: 'Stadium', labelBn: 'মুলিকান্দি মাঠ', target: 'about' as PageView, filter: 'stadium', anchorId: 'stadium' },
        { labelEn: 'Academy', labelBn: 'একাডেমি ও ট্রায়াল', target: 'contact' as PageView, filter: 'academy', anchorId: 'academy' },
      ]
    },
    teams: {
      titleEn: 'TEAMS',
      titleBn: 'দলসমূহ',
      links: [
        { labelEn: 'Fixtures', labelBn: 'ম্যাচ সূচি', target: 'matches' as PageView, filter: 'fixtures' },
        { labelEn: 'Players', labelBn: 'খেলোয়াড় তালিকা', target: 'squad' as PageView, filter: 'squad' },
        { labelEn: 'Results', labelBn: 'বিগত ফলাফল', target: 'matches' as PageView, filter: 'results' },
        { labelEn: 'Standings', labelBn: 'পয়েন্ট টেবিল', target: 'standings' as PageView, filter: 'standings' },
      ]
    },
    connect: {
      titleEn: 'CONNECT',
      titleBn: 'যোগাযোগ',
      links: [
        { labelEn: 'Contact', labelBn: 'যোগাযোগ ডেস্ক', target: 'contact' as PageView, filter: 'contact' },
        { labelEn: 'Tickets', labelBn: 'ফ্যান পাস টিকিট', target: 'member-pass' as PageView, filter: 'tickets' },
        { labelEn: 'Shop', labelBn: 'জার্সি ও কিট স্টোর', target: 'store' as PageView, filter: 'store' },
        { labelEn: 'Newsletter', labelBn: 'ক্লাব সংবাদ বুলেটিন', target: 'news' as PageView, filter: 'news' },
      ]
    }
  };

  const isLight = theme === 'light';

  return (
    <footer 
      className={`transition-colors duration-300 border-t ${
        isLight 
          ? 'bg-[#fafafa] text-slate-600 border-slate-200/90' 
          : 'bg-neutral-950 text-neutral-400 border-neutral-800'
      }`}
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 pb-12">
        
        {/* 1. Brand Section */}
        <div className="space-y-3.5">
          {/* Logo Crest */}
          <div 
            className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center p-1 border shadow-sm transition-colors ${
              isLight 
                ? 'bg-white border-slate-200 shadow-slate-100' 
                : 'bg-neutral-900 border-neutral-800'
            }`}
          >
            <img
              src="/logos/titanforce-logo.svg"
              alt="Titan Force Crest"
              className="w-14 h-14 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Titles */}
          <div className="space-y-0.5">
            <h3 
              className={`font-display text-2xl sm:text-3xl font-black uppercase tracking-wider transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              TITAN FORCE
            </h3>
            <div 
              className={`text-xs font-bold uppercase tracking-[0.25em] transition-colors ${
                isLight ? 'text-slate-500' : 'text-neutral-400'
              }`}
            >
              MULIKANDI
            </div>
          </div>

          {/* Motto */}
          <p 
            className={`text-sm sm:text-base max-w-xl leading-relaxed pt-1 transition-colors ${
              isLight ? 'text-slate-600' : 'text-neutral-300'
            }`}
          >
            {lang === 'en'
              ? 'Pride of Mulikandi. Power of the Titans. Join the family and rise with us.'
              : 'মুলিকান্দির গর্ব। টাইটানদের শক্তি। আমাদের পরিবারের সাথে যুক্ত হোন এবং একসাথে এগিয়ে চলুন।'}
          </p>
        </div>

        {/* Divider 1 */}
        <div 
          className={`my-10 border-t transition-colors ${
            isLight ? 'border-slate-200' : 'border-neutral-800/80'
          }`} 
        />

        {/* 2. Three-Column Navigation System (CLUB | TEAMS | CONNECT) */}
        <div className="grid grid-cols-3 gap-6 sm:gap-10">
          
          {/* Column 1: CLUB */}
          <div className="space-y-4">
            <h4 className="font-bold text-rose-600 uppercase tracking-wider text-xs sm:text-sm">
              {lang === 'en' ? navColumns.club.titleEn : navColumns.club.titleBn}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navColumns.club.links.map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={(e) => handleNav(e, item.target, item.filter, item.anchorId)}
                    className={`transition-colors text-left cursor-pointer ${
                      isLight 
                        ? 'text-slate-600 hover:text-slate-950 font-medium' 
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? item.labelEn : item.labelBn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: TEAMS */}
          <div className="space-y-4">
            <h4 className="font-bold text-rose-600 uppercase tracking-wider text-xs sm:text-sm">
              {lang === 'en' ? navColumns.teams.titleEn : navColumns.teams.titleBn}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navColumns.teams.links.map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={(e) => handleNav(e, item.target, item.filter)}
                    className={`transition-colors text-left cursor-pointer ${
                      isLight 
                        ? 'text-slate-600 hover:text-slate-950 font-medium' 
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? item.labelEn : item.labelBn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: CONNECT */}
          <div className="space-y-4">
            <h4 className="font-bold text-rose-600 uppercase tracking-wider text-xs sm:text-sm">
              {lang === 'en' ? navColumns.connect.titleEn : navColumns.connect.titleBn}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navColumns.connect.links.map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={(e) => handleNav(e, item.target, item.filter)}
                    className={`transition-colors text-left cursor-pointer ${
                      isLight 
                        ? 'text-slate-600 hover:text-slate-950 font-medium' 
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? item.labelEn : item.labelBn}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('privacy')}
                  className={`transition-colors text-left cursor-pointer ${
                    isLight 
                      ? 'text-slate-500 hover:text-rose-600 font-medium' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'Privacy Policy' : 'প্রাইভেসি পলিসি'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('cookie')}
                  className={`transition-colors text-left cursor-pointer ${
                    isLight 
                      ? 'text-slate-500 hover:text-rose-600 font-medium' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'Cookie Policy' : 'কুকি পলিসি'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. Follow Us Social Strip */}
        <div className="my-12 text-center space-y-5">
          <h4 
            className={`font-bold text-base sm:text-lg transition-colors ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {lang === 'en' ? 'Follow Us' : 'আমাদের অনুসরণ করুন'}
          </h4>

          {/* 4 Squircle Rounded Social Buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer ${
                isLight
                  ? 'bg-[#faedf0] border-[#f2d8dd] text-slate-800 hover:text-rose-600 hover:bg-[#fadce2]'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:text-rose-500 hover:border-rose-500/50 hover:bg-neutral-800'
              }`}
            >
              <Facebook className="w-5 h-5 fill-current" />
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer ${
                isLight
                  ? 'bg-[#faedf0] border-[#f2d8dd] text-slate-800 hover:text-rose-600 hover:bg-[#fadce2]'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:text-rose-500 hover:border-rose-500/50 hover:bg-neutral-800'
              }`}
            >
              <TikTokIcon />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer ${
                isLight
                  ? 'bg-[#faedf0] border-[#f2d8dd] text-slate-800 hover:text-rose-600 hover:bg-[#fadce2]'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:text-rose-500 hover:border-rose-500/50 hover:bg-neutral-800'
              }`}
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer ${
                isLight
                  ? 'bg-[#faedf0] border-[#f2d8dd] text-slate-800 hover:text-rose-600 hover:bg-[#fadce2]'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:text-rose-500 hover:border-rose-500/50 hover:bg-neutral-800'
              }`}
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider 2 */}
        <div 
          className={`my-8 border-t transition-colors ${
            isLight ? 'border-slate-200' : 'border-neutral-800/80'
          }`} 
        />

        {/* 4. Bottom Legal Copyright */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs tracking-wider uppercase transition-colors ${
            isLight ? 'text-slate-500' : 'text-neutral-400'
          }`}
        >
          <div>
            © 2026 TITAN FORCE MULIKANDI · ALL RIGHTS RESERVED
          </div>

          <button
            type="button"
            onClick={onScrollToTop}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer text-xs active:scale-95 ${
              isLight 
                ? 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 shadow-sm' 
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-800'
            }`}
          >
            <ArrowUp className="w-3.5 h-3.5 text-rose-600" />
            <span>{lang === 'en' ? 'Back to Top' : 'উপরে যান'}</span>
          </button>
        </div>

      </div>

      {/* Interactive Privacy Policy / Cookie Policy Modal with Smooth Open */}
      {modalType && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn transition-all duration-300"
          onClick={() => setModalType(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className={`relative w-full max-w-lg rounded-2xl border p-6 sm:p-7 shadow-2xl space-y-4 transform transition-all duration-200 scale-100 ${
              isLight 
                ? 'bg-white border-slate-200 text-slate-800 shadow-slate-900/10' 
                : 'bg-neutral-900 border-neutral-800 text-white shadow-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            
            <div 
              className={`flex items-center justify-between border-b pb-3 ${
                isLight ? 'border-slate-200' : 'border-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rose-600" />
                <h3 
                  className={`font-display text-xl font-black uppercase tracking-wide ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {modalType === 'privacy' 
                    ? (lang === 'en' ? 'Privacy Policy' : 'প্রাইভেসি পলিসি')
                    : (lang === 'en' ? 'Cookie Policy' : 'কুকি পলিসি')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isLight 
                    ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-100' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div 
              className={`text-xs sm:text-sm space-y-3 max-h-80 overflow-y-auto pr-1 leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-neutral-300'
              }`}
            >
              {modalType === 'privacy' ? (
                <>
                  <p>
                    {lang === 'en'
                      ? 'Titan Force Mulikandi Football Club values your privacy. We collect supporter registration information exclusively to process Kit 17 orders, generate digital fan member passes, and share official match updates.'
                      : 'টাইটান ফোর্স মুলিকান্দি ফুটবল ক্লাব আপনার গোপনীয়তাকে সম্মান করে। আমরা শুধুমাত্র কিট ১৭ জার্সি অর্ডার, ফ্যান পাস তৈরি এবং অফিশিয়াল ম্যাচ বিজ্ঞপ্তি প্রদানের জন্য সমর্থকদের তথ্য সংরক্ষণ করি।'}
                  </p>
                  <p>
                    {lang === 'en'
                      ? 'Your phone numbers and shipping details are never sold or distributed to third parties. All transactions and inquiries remain strictly confidential within club management.'
                      : 'আপনার মোবাইল নম্বর বা ঠিকানা কোনো তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করা হয় না। সমস্ত যোগাযোগ ক্লাবের ব্যবস্থাপনার অধীনে সুরক্ষিত থাকে।'}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    {lang === 'en'
                      ? 'We use minimal browser cookies and local storage tokens solely to remember your preferred language (English / বাংলা) and theme mode (Dark / Vibrant Light).'
                      : 'আমরা শুধুমাত্র আপনার ভাষা পছন্দ (ইংরেজি / বাংলা) এবং থিম মোড (ডার্ক / ভাইব্রেন্ট লাইট) মনে রাখার জন্য ব্রাউজারের লোকাল স্টোরেজ ব্যবহার করি।'}
                  </p>
                  <p>
                    {lang === 'en'
                      ? 'No intrusive tracking or advertising cookies are utilized. You can clear your browser storage at any time.'
                      : 'কোনো বিজ্ঞাপন বা ট্র্যাকিং কুকি ব্যবহার করা হয় না। আপনি যেকোনো সময় আপনার ব্রাউজারের হিস্ট্রি মুছে দিতে পারেন।'}
                  </p>
                </>
              )}
            </div>

            <div 
              className={`pt-3 border-t flex justify-end ${
                isLight ? 'border-slate-200' : 'border-neutral-800'
              }`}
            >
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer active:scale-95 shadow-sm"
              >
                {lang === 'en' ? 'Close Policy' : 'বন্ধ করুন'}
              </button>
            </div>

          </div>
        </div>
      )}

    </footer>
  );
};
