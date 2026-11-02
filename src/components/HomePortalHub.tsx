import React from 'react';
import { 
  Users, Crosshair, Calendar, Trophy, ShoppingBag, 
  CreditCard, Newspaper, Info, Mail, ArrowRight, Flame 
} from 'lucide-react';
import { PageView } from './PageHeaderBanner';

interface HomePortalHubProps {
  lang: 'en' | 'bn';
  onNavigate: (view: PageView) => void;
  onNavigateToPlayer?: (player: any) => void;
  onNavigateToMatch?: (match: any) => void;
}

export const HomePortalHub: React.FC<HomePortalHubProps> = ({
  lang,
  onNavigate
}) => {
  const portalCards: {
    id: PageView;
    titleEn: string;
    titleBn: string;
    badgeEn: string;
    badgeBn: string;
    descEn: string;
    descBn: string;
    icon: React.ReactNode;
    color: string;
    ctaEn: string;
    ctaBn: string;
  }[] = [
    {
      id: 'squad',
      titleEn: 'First Team Squad',
      titleBn: 'ফার্স্ট টিম স্কোয়াড',
      badgeEn: '12 Official Players',
      badgeBn: '১২ জন খেলোয়াড়',
      descEn: 'Full rosters, positions, stats, heatmaps & detailed player profile dossiers.',
      descBn: 'খেলোয়াড় তালিকা, মাঠের পজিশন, হিটম্যাপ ও পূর্ণাঙ্গ প্রোফাইল ডসিয়ার।',
      icon: <Users className="w-6 h-6 text-rose-500" />,
      color: 'border-rose-900/40 hover:border-rose-600/70',
      ctaEn: 'View Full Squad',
      ctaBn: 'পুরো স্কোয়াড দেখুন'
    },
    {
      id: 'tactics',
      titleEn: 'Tactical Board',
      titleBn: 'রণকৌশল বোর্ড',
      badgeEn: 'Lineup Builder & Export',
      badgeBn: 'লাইনআপ বদল ও এক্সপোর্ট',
      descEn: 'Dynamic tactical board with starting player substitution, 5-11 player shapes & HD image download.',
      descBn: 'খেলোয়াড় বদলের অপশনসহ ৫-১১ জনের রণকৌশল, কাস্টম লাইনআপ ও এইচডি ছবি ডাউনলোড।',
      icon: <Crosshair className="w-6 h-6 text-sky-400" />,
      color: 'border-sky-900/40 hover:border-sky-600/70',
      ctaEn: 'Launch Pitch',
      ctaBn: 'কৌশল বোর্ড খুলুন'
    },
    {
      id: 'matches',
      titleEn: 'Match Centre',
      titleBn: 'ম্যাচ সেন্টার ও সূচি',
      badgeEn: '8 Wins · 1 Draw',
      badgeBn: '৮ জয় · ১ ড্র',
      descEn: 'Daudpur Tournament champions campaign, upcoming matches & match reports.',
      descBn: 'চ্যাম্পিয়ন হওয়ার অবিস্মরণীয় জয়যাত্রা, লাইভ টাইমলাইন ও আগামী ম্যাচ।',
      icon: <Calendar className="w-6 h-6 text-emerald-400" />,
      color: 'border-emerald-900/40 hover:border-emerald-600/70',
      ctaEn: 'Explore Fixtures',
      ctaBn: 'ফিক্সচার দেখুন'
    },
    {
      id: 'standings',
      titleEn: 'League Table',
      titleBn: 'পয়েন্ট টেবিল ও র‍্যাঙ্কিং',
      badgeEn: '1st Place Champions',
      badgeBn: '১ম স্থান চ্যাম্পিয়ন',
      descEn: 'Points table, top goalscorers, assists leaders, clean sheets & club form.',
      descBn: 'পয়েন্ট টেবিল, শীর্ষ গোল স্কোরার, অ্যাসিস্ট ও ক্লিন শিট রেকর্ড।',
      icon: <Trophy className="w-6 h-6 text-amber-400" />,
      color: 'border-amber-900/40 hover:border-amber-600/70',
      ctaEn: 'Open Standings',
      ctaBn: 'টেবিল দেখুন'
    },
    {
      id: 'trophies',
      titleEn: 'Honours & Trophies',
      titleBn: 'ট্রফি ও সম্মাননা',
      badgeEn: 'Daudpur Cup 2026',
      badgeBn: 'দাউদপুর কাপ ২০২৬',
      descEn: 'Celebration gallery, tournament gold trophy, player awards & tournament journey.',
      descBn: 'স্বর্ণালী ট্রফি গ্যালারি, টুর্নামেন্ট সেরা পুরষ্কার ও উদযাপনের মুহূর্ত।',
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      color: 'border-yellow-900/40 hover:border-yellow-600/70',
      ctaEn: 'Visit Trophy Room',
      ctaBn: 'ট্রফি রুম দেখুন'
    },
    {
      id: 'store',
      titleEn: 'Official Kit Store',
      titleBn: 'অফিশিয়াল কিট স্টোর',
      badgeEn: 'Kit 17 Available',
      badgeBn: 'কিট ১৭ সুলভ',
      descEn: 'Order Captain Shekhor 17 official match jersey, size picker & instant checkout.',
      descBn: 'অধিনায়ক শেখর মোহন রায়ের অফিসিয়াল ১৭ নম্বর ম্যাচ জার্সি অর্ডার করুন।',
      icon: <ShoppingBag className="w-6 h-6 text-rose-500" />,
      color: 'border-rose-900/40 hover:border-rose-600/70',
      ctaEn: 'Order Jersey',
      ctaBn: 'জার্সি কিনুন'
    },
    {
      id: 'member-pass',
      titleEn: 'Fan Supporter Pass',
      titleBn: 'সমর্থক ফ্যান পাস',
      badgeEn: 'Digital Membership',
      badgeBn: 'ডিজিটাল কার্ড',
      descEn: 'Generate your official Titan Force digital pass with personalized name & number.',
      descBn: 'নিজের নাম ও প্রিয় নম্বর দিয়ে তৈরি করুন টাইটান ফোর্স মেম্বারশিপ পাস।',
      icon: <CreditCard className="w-6 h-6 text-purple-400" />,
      color: 'border-purple-900/40 hover:border-purple-600/70',
      ctaEn: 'Generate Pass',
      ctaBn: 'পাস তৈরি করুন'
    },
    {
      id: 'news',
      titleEn: 'Club News Wire',
      titleBn: 'ক্লাব সংবাদ ও খবর',
      badgeEn: 'Official Media',
      badgeBn: 'অফিসিয়াল মিডিয়া',
      descEn: 'Match reviews, tactical analysis, player spotlights and press releases.',
      descBn: 'ম্যাচ বিশ্লেষণ, অধিনায়ক সাক্ষাৎকার ও ক্লাবের সবশেষ সংবাদ।',
      icon: <Newspaper className="w-6 h-6 text-teal-400" />,
      color: 'border-teal-900/40 hover:border-teal-600/70',
      ctaEn: 'Read Articles',
      ctaBn: 'সংবাদ পড়ুন'
    },
    {
      id: 'about',
      titleEn: 'About Titan Force',
      titleBn: 'ক্লাব ঐতিহ্য ও পরিচয়',
      badgeEn: 'Mulikandi Ground',
      badgeBn: 'মুলিকান্দি মাঠ',
      descEn: 'Club philosophy, leadership, Mulikandi High School fortress & community roots.',
      descBn: 'মুলিকান্দি হাই স্কুল মাঠের ইতিহাস, ক্লাবের ঐতিহ্য ও মূল্যবোধ।',
      icon: <Info className="w-6 h-6 text-blue-400" />,
      color: 'border-blue-900/40 hover:border-blue-600/70',
      ctaEn: 'Learn Heritage',
      ctaBn: 'ইতিহাস জানুন'
    },
    {
      id: 'contact',
      titleEn: 'Contact Desk',
      titleBn: 'যোগাযোগ ও আমন্ত্রণ',
      badgeEn: 'Official Inquiries',
      badgeBn: 'অফিসিয়াল ডেস্ক',
      descEn: 'Send match invitations, request player trials, sponsor inquiries or contact staff.',
      descBn: 'ম্যাচ খেলার আমন্ত্রণ, ট্রায়াল আবেদন ও স্পনসরশিপ অনুসন্ধান।',
      icon: <Mail className="w-6 h-6 text-orange-400" />,
      color: 'border-orange-900/40 hover:border-orange-600/70',
      ctaEn: 'Send Inquiry',
      ctaBn: 'যোগাযোগ করুন'
    }
  ];

  return (
    <div className="py-8 sm:py-12 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-bold uppercase tracking-widest text-rose-500">
            <Flame className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Club Portal & Navigation' : 'ক্লাব পোর্টাল ও আলাদা সেকশনসমূহ'}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight">
            {lang === 'en' ? 'Explore Titan Force By Section' : 'যেকোনো সেকশনে ক্লিক করে আলাদা পেজ খুলুন'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            {lang === 'en' 
              ? 'Select any department below to navigate to its full dedicated page.' 
              : 'যে সেকশনে ক্লিক করবেন, সরাসরি সেই পেজে পৌঁছে যাবেন।'}
          </p>
        </div>

        {/* 10-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-3.5">
          {portalCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onNavigate(card.id)}
              className={`p-4 sm:p-5 rounded-2xl bg-neutral-900/70 hover:bg-neutral-900 border ${card.color} text-left transition-all duration-300 group flex flex-col justify-between card-interactive-glow shadow-black/40 cursor-pointer`}
            >
              <div className="space-y-2.5 w-full">
                <div className="flex items-center justify-between">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                    {lang === 'en' ? card.badgeEn : card.badgeBn}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-base sm:text-lg font-black uppercase text-white group-hover:text-rose-400 transition-colors">
                    {lang === 'en' ? card.titleEn : card.titleBn}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {lang === 'en' ? card.descEn : card.descBn}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-rose-500 group-hover:text-rose-400 w-full">
                <span>{lang === 'en' ? card.ctaEn : card.ctaBn}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

