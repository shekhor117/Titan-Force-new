import React from 'react';
import { 
  Users, Crosshair, Calendar, Trophy, ShoppingBag, 
  CreditCard, Newspaper, Info, Mail, ArrowRight, Star, 
  ShieldCheck, Flame, Sparkles, ChevronRight 
} from 'lucide-react';
import { PageView } from './PageHeaderBanner';
import { PLAYERS_DATA, MATCHES_DATA, Player, Match } from '../data/clubData';

interface HomePortalHubProps {
  lang: 'en' | 'bn';
  onNavigate: (view: PageView) => void;
  onNavigateToPlayer: (player: Player) => void;
  onNavigateToMatch: (match: Match) => void;
}

export const HomePortalHub: React.FC<HomePortalHubProps> = ({
  lang,
  onNavigate,
  onNavigateToPlayer,
  onNavigateToMatch
}) => {
  const captain = PLAYERS_DATA.find(p => p.num === 17) || PLAYERS_DATA[0];
  const finalMatch = MATCHES_DATA.find(m => m.id === 'm4') || MATCHES_DATA[3];

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
      badgeEn: '5 to 11 Formations',
      badgeBn: '৫ থেকে ১১ জন ফর্মেশন',
      descEn: 'Dynamic tactical board covering 5-a-side futsal, tournament 7s & 11-a-side strategies.',
      descBn: '৫ জনের ফুটসাল, ৭ জনের টুর্নামেন্ট থেকে ১১ জনের পূর্ণাঙ্গ রণকৌশল ও ফর্মেশন।',
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
    <div className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-rose-500">
            <Flame className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Club Portal & Navigation' : 'ক্লাব পোর্টাল ও আলাদা সেকশনসমূহ'}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
            {lang === 'en' ? 'Explore Titan Force By Section' : 'যেকোনো সেকশনে ক্লিক করে আলাদা পেজ খুলুন'}
          </h2>
          <p className="text-sm text-neutral-400">
            {lang === 'en' 
              ? 'Each tab takes you directly to its dedicated, full-page experience. Choose a department below to dive deep.' 
              : 'যে ট্যাবে ক্লিক করবেন, সরাসরি সেই সেকশনের আলাদা স্বয়ংসম্পূর্ণ পেজ ওপেন হবে।'}
          </p>
        </div>

        {/* 10-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {portalCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onNavigate(card.id)}
              className={`p-5 rounded-2xl bg-neutral-900/70 hover:bg-neutral-900 border ${card.color} text-left transition-all duration-200 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl shadow-black/40 cursor-pointer`}
            >
              <div className="space-y-3 w-full">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                    {lang === 'en' ? card.badgeEn : card.badgeBn}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-lg font-black uppercase text-white group-hover:text-rose-400 transition-colors">
                    {lang === 'en' ? card.titleEn : card.titleBn}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {lang === 'en' ? card.descEn : card.descBn}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-rose-500 group-hover:text-rose-400 w-full">
                <span>{lang === 'en' ? card.ctaEn : card.ctaBn}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Highlight Double Feature Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          
          {/* Feature 1: Captain Shekhor Mohan Roy Spotlight */}
          <div className="relative rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 overflow-hidden">
            <div className="relative shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-rose-500/40 shadow-2xl">
              <img
                src={captain.photoUrl}
                alt={captain.name}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rose-600 text-white font-display font-black text-xs">
                #{captain.num} CAPTAIN
              </span>
            </div>

            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest uppercase text-rose-500">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{lang === 'en' ? 'Club Captain & Top Scorer' : 'অধিনায়ক ও সর্বোচ্চ গোলদাতা'}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                {captain.name}
              </h3>

              <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
                <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="text-lg font-black text-white">{captain.goals}</div>
                  <div className="text-[10px] uppercase text-neutral-500">Goals</div>
                </div>
                <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="text-lg font-black text-rose-500">{captain.assists}</div>
                  <div className="text-[10px] uppercase text-neutral-500">Assists</div>
                </div>
                <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="text-lg font-black text-amber-400">{captain.motmAwards}</div>
                  <div className="text-[10px] uppercase text-neutral-500">MOTM</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigateToPlayer(captain)}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <span>{lang === 'en' ? "Full Player Profile" : 'পূর্ণাঙ্গ প্রোফাইল'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('squad')}
                  className="px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'All Squad' : 'সকল খেলোয়াড়'}
                </button>
              </div>
            </div>
          </div>

          {/* Feature 2: Daudpur 2026 Champion Trophy Spotlight */}
          <div className="relative rounded-2xl bg-gradient-to-br from-amber-950/20 via-neutral-900 to-neutral-950 border border-amber-900/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 overflow-hidden">
            <div className="relative shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-neutral-950 flex items-center justify-center">
              <img
                src="/images/trophy-daudpur.png"
                alt="Daudpur Trophy"
                className="w-28 h-28 object-contain drop-shadow-[0_10px_20px_rgba(245,158,11,0.3)] hover:scale-110 transition-transform duration-300"
              />
              <span className="absolute bottom-2 px-2 py-0.5 rounded bg-amber-500 text-neutral-950 font-display font-black text-[10px] uppercase">
                CHAMPIONS
              </span>
            </div>

            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-widest uppercase text-amber-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Daudpur Tournament 2026' : 'দাউদপুর টুর্নামেন্ট ২০২৬'}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                {lang === 'en' ? 'Championship Glory' : 'অপরাজিত চ্যাম্পিয়ন ট্রফি'}
              </h3>

              <p className="text-xs text-neutral-400 leading-relaxed">
                {lang === 'en'
                  ? 'Historic 1-0 final victory against Daudpur Rising Titans. 4 clean sheets in 5 tournament matches.'
                  : 'ফাইনালে দাউদপুর রাইজিং টাইটান্সের বিরুদ্ধে ১-০ গোলের ঐতিহাসিক জয় ও টুর্নামেন্টে ৪টি ক্লিন শিট অর্জন।'}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('trophies')}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <span>{lang === 'en' ? 'Open Trophy Cabinet' : 'ট্রফি গ্যালারি খুলুন'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateToMatch(finalMatch)}
                  className="px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'Final Match Recap' : 'ফাইনাল ম্যাচ রিক্যাপ'}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Official Kit 17 Store Showcase: Image + Click to Store / Details */}
        <div className="rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-rose-950/40 border border-neutral-800 hover:border-rose-900/60 p-6 sm:p-8 transition-all shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left: Jersey Image with stylish glowing background */}
            <div className="relative group shrink-0 cursor-pointer" onClick={() => onNavigate('store')}>
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-gradient-to-b from-neutral-950 to-neutral-900 border border-neutral-800 p-4 flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-rose-600/50 transition-colors">
                <img
                  src="/shop/kit-17-shekhor.png"
                  alt="Kit 17 Shekhor Jersey"
                  className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(225,29,72,0.35)] group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-display font-black text-xs tracking-wider uppercase">
                  KIT 17
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-neutral-950/90 border border-neutral-800 text-amber-400 font-mono font-bold text-xs">
                  499 ৳
                </span>
              </div>
            </div>

            {/* Middle: Info & Specs */}
            <div className="space-y-3 text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-rose-500">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Official Club Kit · 2026 Edition' : 'অফিশিয়াল ক্লাব জার্সি · ২০২৬ সংস্করণ'}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight">
                {lang === 'en' ? 'Titan Force Kit 17 - Shekhor Jersey' : 'টাইটান ফোর্স কিট ১৭ - শেখর ম্যাচ জার্সি'}
              </h3>

              <p className="text-sm text-neutral-400 max-w-xl leading-relaxed">
                {lang === 'en'
                  ? 'Worn with pride by Captain Shekhor Mohan Roy. High-performance breathable aero-mesh fabric with embroidered club badge and sublimated No. 17 print.'
                  : 'অধিনায়ক শেখর মোহন রায়ের ১৭ নম্বর ম্যাচ জার্সি। উন্নত অ্যারো-মেশ ফেব্রিক, ক্লাবের সিলিকন ব্যাজ ও টেকসই প্রিন্টিং।'}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-neutral-300">
                <span className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 font-semibold">
                  {lang === 'en' ? 'Sizes: XS, S, M, L, XL, XXL' : 'সাইজ: XS, S, M, L, XL, XXL'}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 font-semibold text-emerald-400">
                  {lang === 'en' ? '✓ In Stock' : '✓ স্টকে রয়েছে'}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 font-semibold text-amber-400">
                  {lang === 'en' ? '★ 4.9 (38 Reviews)' : '★ ৪.৯ (৩৮ রিভিউ)'}
                </span>
              </div>
            </div>

            {/* Right: Action Buttons (Click to Store & Details) */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onNavigate('store')}
                className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-950/50 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{lang === 'en' ? 'Click to Store' : 'ক্লিক টু স্টোর'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('store')}
                className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 hover:border-neutral-500 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{lang === 'en' ? 'View Details' : 'ডিটেইলস দেখুন'}</span>
                <ArrowRight className="w-4 h-4 text-rose-500" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('member-pass')}
                className="px-4 py-2 rounded-lg bg-neutral-950/80 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                <span>{lang === 'en' ? 'Supporter Fan Pass' : 'ফ্যান পাস বানান'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
