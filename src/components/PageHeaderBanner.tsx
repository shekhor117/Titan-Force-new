import React from 'react';
import { 
  ArrowLeft, ChevronRight, Users, Crosshair, Calendar, 
  Trophy, ShoppingBag, CreditCard, Newspaper, Info, Mail, Flame 
} from 'lucide-react';

export type PageView = 
  | 'home' 
  | 'squad' 
  | 'tactics' 
  | 'matches' 
  | 'standings' 
  | 'trophies' 
  | 'store' 
  | 'member-pass' 
  | 'news' 
  | 'about' 
  | 'contact' 
  | 'player' 
  | 'match';

interface PageHeaderBannerProps {
  view: PageView;
  lang: 'en' | 'bn';
  onNavigate: (view: PageView) => void;
}

export const PageHeaderBanner: React.FC<PageHeaderBannerProps> = ({ view, lang, onNavigate }) => {
  const meta: Record<PageView, {
    titleEn: string;
    titleBn: string;
    subtitleEn: string;
    subtitleBn: string;
    categoryEn: string;
    categoryBn: string;
    icon: React.ReactNode;
    related: PageView[];
  }> = {
    home: {
      titleEn: 'Official Club Hub',
      titleBn: 'অফিশিয়াল ক্লাব হাব',
      subtitleEn: 'Titan Force Football Club · Mulikandi, Zakigonj',
      subtitleBn: 'টাইটান ফোর্স ফুটবল ক্লাব · মুলিকান্দি, জকিগঞ্জ',
      categoryEn: 'Club Portal',
      categoryBn: 'ক্লাব পোর্টাল',
      icon: <Flame className="w-5 h-5 text-rose-500" />,
      related: ['squad', 'matches', 'trophies']
    },
    squad: {
      titleEn: 'First Team Squad Roster',
      titleBn: 'ফার্স্ট টিম স্কোয়াড তালিকা',
      subtitleEn: 'Complete 2025–26 official squad profiles, positions, records & player stats',
      subtitleBn: '২০২৫–২৬ মৌসুমের অফিশিয়াল খেলোয়াড় তালিকা, অবস্থান, রেকর্ড ও ব্যক্তিগত পরিসংখ্যান',
      categoryEn: 'Team Roster',
      categoryBn: 'দলীয় তালিকা',
      icon: <Users className="w-5 h-5 text-rose-500" />,
      related: ['tactics', 'matches', 'standings', 'trophies']
    },
    tactics: {
      titleEn: 'Strategy & Formations (5 to 11 Players)',
      titleBn: 'রণকৌশল ও ফর্মেশন (৫ থেকে ১১ জন)',
      subtitleEn: 'Multi-format pitch visualizer covering 5s futsal, tournament 7s & full 11s XI strategy',
      subtitleBn: '৫ জনের ফুটসাল, ৭ জনের চ্যাম্পিয়নশিপ থেকে ১১ জনের পূর্ণাঙ্গ মাঠের ফর্মেশন ও কৌশল',
      categoryEn: 'Strategy & Formations',
      categoryBn: 'কৌশল ও ফর্মেশন',
      icon: <Crosshair className="w-5 h-5 text-rose-500" />,
      related: ['squad', 'matches', 'standings']
    },
    matches: {
      titleEn: 'Match Centre & Fixtures',
      titleBn: 'ম্যাচ সেন্টার ও সময়সূচি',
      subtitleEn: 'Daudpur Tournament champions campaign, upcoming matches & full match reports',
      subtitleBn: 'দাউদপুর টুর্নামেন্ট চ্যাম্পিয়ন হওয়ার সমস্ত ম্যাচ, আসন্ন ফিক্সচার ও ম্যাচ বিবরণী',
      categoryEn: 'Fixtures & Results',
      categoryBn: 'ম্যাচ ও ফলাফল',
      icon: <Calendar className="w-5 h-5 text-rose-500" />,
      related: ['standings', 'squad', 'trophies']
    },
    standings: {
      titleEn: 'League Table & Leaderboard',
      titleBn: 'পয়েন্ট টেবিল ও শীর্ষ গোলদাতা',
      subtitleEn: 'Official tournament standings, top goalscorers, assists leaders & club form',
      subtitleBn: 'অফিশিয়াল টুর্নামেন্ট পয়েন্ট তালিকা, গোলদাতা ও অ্যাসিস্ট তালিকা',
      categoryEn: 'Tournament Table',
      categoryBn: 'টুর্নামেন্ট স্ট্যান্ডিংস',
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      related: ['matches', 'squad', 'trophies']
    },
    trophies: {
      titleEn: 'Honours & Trophy Cabinet',
      titleBn: 'ট্রফি ও সম্মাননা গ্যালারি',
      subtitleEn: 'Daudpur Football Tournament 2026 Champion Trophy, accolades & gold awards',
      subtitleBn: 'দাউদপুর ফুটবল টুর্নামেন্ট ২০২৬ চ্যাম্পিয়ন ট্রফি ও ক্লাবের গৌরবময় অর্জন',
      categoryEn: 'Hall of Fame',
      categoryBn: 'সম্মাননা হল',
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      related: ['matches', 'squad', 'about']
    },
    store: {
      titleEn: 'Official Club Kit Store',
      titleBn: 'অফিশিয়াল কিট ও জার্সি স্টোর',
      subtitleEn: 'Order the iconic Kit 17 Shekhor Jersey, official fan gear & team apparel',
      subtitleBn: 'অধিনায়ক শেখর এর ১৭ নম্বর অফিসিয়াল জার্সি ও টিম কিট অর্ডার করুন',
      categoryEn: 'Merchandise',
      categoryBn: 'অফিসিয়াল মার্চেন্ডাইজ',
      icon: <ShoppingBag className="w-5 h-5 text-rose-500" />,
      related: ['member-pass', 'squad', 'about']
    },
    'member-pass': {
      titleEn: 'Digital Supporter Fan Pass',
      titleBn: 'ডিজিটাল সমর্থক ফ্যান পাস',
      subtitleEn: 'Generate your official Titan Force member ID card with custom name & number',
      subtitleBn: 'আপনার নাম ও প্রিয় জার্সি নম্বর দিয়ে তৈরি করুন টাইটান ফোর্স মেম্বারশিপ কার্ড',
      categoryEn: 'Supporters Club',
      categoryBn: 'সমর্থক ক্লাব',
      icon: <CreditCard className="w-5 h-5 text-rose-500" />,
      related: ['store', 'squad', 'news']
    },
    news: {
      titleEn: 'Club News & Matchday Wire',
      titleBn: 'ক্লাব সংবাদ ও ম্যাচ বুলেটিন',
      subtitleEn: 'Official club announcements, match previews, trophy celebrations & updates',
      subtitleBn: 'অফিশিয়াল ক্লাব বিজ্ঞপ্তি, ম্যাচ প্রস্তুতি, ট্রফি জয়ের গল্প ও খবর',
      categoryEn: 'Press & Media',
      categoryBn: 'প্রেস ও মিডিয়া',
      icon: <Newspaper className="w-5 h-5 text-rose-500" />,
      related: ['matches', 'squad', 'about']
    },
    about: {
      titleEn: 'About Titan Force Mulikandi',
      titleBn: 'টাইটান ফোর্স পরিচিতি ও ঐতিহ্য',
      subtitleEn: 'Club history, Mulikandi High School ground, philosophy & community roots',
      subtitleBn: 'ক্লাবের ইতিহাস, মুলিকান্দি হাই স্কুল মাঠের ঐতিহ্য ও আমাদের দর্শন',
      categoryEn: 'Club Profile',
      categoryBn: 'ক্লাব প্রোফাইল',
      icon: <Info className="w-5 h-5 text-rose-500" />,
      related: ['squad', 'trophies', 'contact']
    },
    contact: {
      titleEn: 'Contact Desk & Match Inquiries',
      titleBn: 'যোগাযোগ ও ম্যাচ আমন্ত্রণ',
      subtitleEn: 'Reach club management for match invitations, player trials & official inquiries',
      subtitleBn: 'ম্যাচ আমন্ত্রণ, ট্রায়াল ও স্পনসরশিপের জন্য ক্লাব কর্তৃপক্ষের সাথে যোগাযোগ করুন',
      categoryEn: 'Get In Touch',
      categoryBn: 'যোগাযোগ',
      icon: <Mail className="w-5 h-5 text-rose-500" />,
      related: ['about', 'store', 'member-pass']
    },
    player: {
      titleEn: 'Player Profile',
      titleBn: 'খেলোয়াড় প্রোফাইল',
      subtitleEn: 'Official player statistics, attributes, history & fan ratings',
      subtitleBn: 'অফিশিয়াল খেলোয়াড়ের পরিসংখ্যান, পারফরম্যান্স ও ফ্যান রেটিং',
      categoryEn: 'Squad Member',
      categoryBn: 'দলের সদস্য',
      icon: <Users className="w-5 h-5 text-rose-500" />,
      related: ['squad', 'tactics', 'matches']
    },
    match: {
      titleEn: 'Match Details & Recap',
      titleBn: 'ম্যাচ বিবরণ ও লাইভ রিক্যাপ',
      subtitleEn: 'Broadcast scoreboard, live timeline, tactical lineups & match statistics',
      subtitleBn: 'স্কোরবোর্ড, টাইমলাইন ইভেন্ট, লাইনআপ ও বিশদ পরিসংখ্যান',
      categoryEn: 'Match Report',
      categoryBn: 'ম্যাচ রিপোর্ট',
      icon: <Calendar className="w-5 h-5 text-rose-500" />,
      related: ['matches', 'standings', 'squad']
    }
  };

  const currentMeta = meta[view] || meta.home;

  const getPageLabel = (p: PageView) => {
    switch (p) {
      case 'squad': return lang === 'en' ? 'Squad' : 'দল';
      case 'tactics': return lang === 'en' ? 'Tactics' : 'রণকৌশল';
      case 'matches': return lang === 'en' ? 'Matches' : 'ম্যাচ';
      case 'standings': return lang === 'en' ? 'Standings' : 'টেবিল';
      case 'trophies': return lang === 'en' ? 'Trophies' : 'ট্রফি';
      case 'store': return lang === 'en' ? 'Store' : 'স্টোর';
      case 'member-pass': return lang === 'en' ? 'Fan Pass' : 'ফ্যান পাস';
      case 'news': return lang === 'en' ? 'News' : 'সংবাদ';
      case 'about': return lang === 'en' ? 'About' : 'পরিচিতি';
      case 'contact': return lang === 'en' ? 'Contact' : 'যোগাযোগ';
      default: return p;
    }
  };

  return (
    <div className="bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Breadcrumb Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            >
              <span>{lang === 'en' ? 'Home' : 'হোম'}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-rose-500 font-bold uppercase tracking-wider">
              {lang === 'en' ? currentMeta.categoryEn : currentMeta.categoryBn}
            </span>
          </div>

          {/* Quick Back to Home CTA */}
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800/90 hover:bg-neutral-800 text-xs text-neutral-200 hover:text-white border border-neutral-700/80 transition-all active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-rose-500" />
            <span>{lang === 'en' ? 'Back to Club Home' : 'হোম পেজে ফিরুন'}</span>
          </button>
        </div>

        {/* Page Title & Related Navigation Pills */}
        <div className="pt-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 shadow-inner">
                {currentMeta.icon}
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-rose-500">
                {lang === 'en' ? currentMeta.categoryEn : currentMeta.categoryBn}
              </span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              {lang === 'en' ? currentMeta.titleEn : currentMeta.titleBn}
            </h1>
            
            <p className="text-sm text-neutral-400 max-w-2xl">
              {lang === 'en' ? currentMeta.subtitleEn : currentMeta.subtitleBn}
            </p>
          </div>

          {/* Quick jump to related sections */}
          {currentMeta.related && currentMeta.related.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
              <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mr-1">
                {lang === 'en' ? 'Jump to:' : 'যান:'}
              </span>
              {currentMeta.related.map((rel) => (
                <button
                  key={rel}
                  onClick={() => onNavigate(rel)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  {getPageLabel(rel)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
