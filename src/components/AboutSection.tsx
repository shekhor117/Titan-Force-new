import React from 'react';
import { CLUB_INFO, TRANSLATIONS } from '../data/clubData';
import { Shield, Target, Flame, Users, Sparkles, MapPin } from 'lucide-react';

interface AboutSectionProps {
  lang: 'en' | 'bn';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="about" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 pb-10 border-b border-neutral-800">
          <div className="text-xs font-bold uppercase tracking-widest text-rose-500">
            {lang === 'en' ? 'Club Roots & Identity' : 'ক্লাব পরিচিতি ও ইতিহাস'}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
            {t.about.subtitle}
          </p>
        </div>

        {/* Narrative Split: Story & Sylhet Pitch Photography */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left 7 Cols: The Story and Philosophy */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-500">
                01. {lang === 'en' ? 'The Brotherhood of Mulikandi' : 'মুলিকান্দির ভ্রাতৃত্ব'}
              </span>

              <h3 className="font-display text-3xl font-black uppercase text-white tracking-tight">
                {lang === 'en' ? 'Built in Mulikandi, Driven by Belief' : 'মুলিকান্দির মাটিতে প্রতিষ্ঠিত, অটল বিশ্বাসের শক্তিতে চালিত'}
              </h3>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {lang === 'en' ? CLUB_INFO.description : CLUB_INFO.descriptionBn}
              </p>

              <p className="text-sm text-neutral-400 leading-relaxed">
                {lang === 'en'
                  ? 'Founded in 2025 in the heart of Zakigonj, Sylhet, Titan Force began with a clear purpose: to give local youth a professional platform to showcase their athleticism, develop tactical discipline, and compete against the finest regional clubs.'
                  : '২০২৫ সালে জকিগঞ্জ, সিলেটের বুকে প্রতিষ্ঠিত টাইটান ফোর্স মুলিকান্দির মূল লক্ষ্য স্থানীয় যুবকদের জন্য একটি পেশাদার ফুটবলের মঞ্চ তৈরি করা এবং নিয়মানুবর্তিতা ও নিষ্ঠার সাথে এগিয়ে চলা।'}
              </p>
            </div>

            {/* Home Ground Spotlight Box */}
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                <MapPin className="w-4 h-4" />
                <span>{lang === 'en' ? 'Home Fortress' : 'ঘরের মাঠ'}</span>
              </div>
              <h4 className="font-display text-xl font-bold uppercase text-white">
                {lang === 'en' ? CLUB_INFO.homeGround : CLUB_INFO.homeGroundBn}
              </h4>
              <p className="text-xs text-neutral-400">
                {lang === 'en' 
                  ? 'Located in Zakigonj, Sylhet. A battleground where our players train daily, supported by passionate village fans.'
                  : 'জকিগঞ্জ, সিলেট। যেখানে প্রতিদিন আমাদের খেলোয়াড়রা কঠোর অনুশীলন করে এবং স্থানীয় দর্শকরা দলকে উৎসাহিত করতে জড়ো হন।'}
              </p>
            </div>
          </div>

          {/* Right 5 Cols: Sylhet Fans Community Media Frame */}
          <div className="lg:col-span-5 relative min-h-[320px] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
            <img
              src="/src/assets/images/titan_stadium_fans_1792594584092.jpg"
              alt="Passionate supporters of Titan Force Mulikandi"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-500">
                {lang === 'en' ? 'Red & Black Army' : 'রেড অ্যান্ড ব্ল্যাক আর্মি'}
              </div>
              <p className="text-xs text-neutral-300 font-medium">
                {lang === 'en' 
                  ? 'Our supporters are the heartbeat of Titan Force Mulikandi.'
                  : 'আমাদের সমর্থকরাই টাইটান ফোর্সের আসল চালিকাশক্তি।'}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Titan Force */}
        <div className="mt-16 pt-10 border-t border-neutral-800">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6">
            02. {lang === 'en' ? 'Core Club Values' : 'মূল আদর্শ ও নীতিমালা'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLUB_INFO.values.map((v, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2 hover:border-neutral-700 transition-colors"
              >
                <div className="font-display text-2xl font-black text-rose-500">
                  0{idx + 1}.
                </div>
                <h4 className="font-display text-xl font-bold uppercase text-white">
                  {lang === 'en' ? v.title : v.titleBn}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === 'en' ? v.desc : v.descBn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
