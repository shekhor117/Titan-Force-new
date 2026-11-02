import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Star, ShieldCheck, Sparkles, Check, Info, X, Truck } from 'lucide-react';
import { PRODUCTS_DATA, Product } from '../data/clubData';
import { PageView } from './PageHeaderBanner';

interface StoreMarketingBannerProps {
  lang: 'en' | 'bn';
  onNavigate: (view: PageView) => void;
}

export const StoreMarketingBanner: React.FC<StoreMarketingBannerProps> = ({ lang, onNavigate }) => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const product: Product = PRODUCTS_DATA[0]; // Official Kit 17

  return (
    <section className="py-12 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Marketing Banner Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-950 border border-rose-900/40 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Product Photography with marketing badge */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-gradient-to-b from-neutral-950/90 to-neutral-900/90 rounded-2xl border border-neutral-800 p-6 flex items-center justify-center shadow-2xl group">
                
                {/* Floating Special Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/90 backdrop-blur-sm text-[11px] font-black uppercase tracking-wider text-white shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Official Armor' : 'অফিশিয়াল জার্সি'}</span>
                </div>

                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-950/80 border border-neutral-800 text-[11px] font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.9 / 5.0</span>
                </div>

                {/* Main Jersey Image */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-h-64 sm:max-h-72 w-auto object-contain drop-shadow-[0_20px_30px_rgba(225,29,72,0.25)] group-hover:scale-105 transition-transform duration-500"
                />

                {/* Jersey Caption */}
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest px-3 py-1 rounded-lg bg-neutral-950/80 border border-neutral-800/90 inline-block">
                    {lang === 'en' ? 'Kit 17 · Captain Shekhor Edition' : 'কিট ১৭ · অধিনায়ক শেখর সংস্করণ'}
                  </span>
                </div>
              </div>

              {/* Price & Guarantee Pill */}
              <div className="mt-4 flex items-center gap-4 text-xs text-neutral-400">
                <div className="flex items-center gap-1 text-white font-black text-lg">
                  <span>{product.price}</span>
                  <span className="text-xs text-rose-500 font-bold uppercase ml-0.5">{product.currency}</span>
                </div>
                <span className="text-neutral-700">|</span>
                <div className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Authentic Club Gear' : '১০০% অথেনটিক ক্লাব কিট'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Marketing Copy & Call-To-Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-rose-500">
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                  <span>{lang === 'en' ? 'Official Club Store Spotlight' : 'অফিশিয়াল ক্লাব মার্চেন্ডাইজ'}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                  {lang === 'en' ? 'Titan Force Official Kit 17' : 'টাইটান ফোর্স অফিসিয়াল কিট ১৭ জার্সি'}
                </h3>

                <p className="text-sm sm:text-base text-neutral-300 max-w-2xl font-normal leading-relaxed">
                  {lang === 'en'
                    ? 'Wear the colours of champions. Engineered with ultra-breathable moisture-wicking aerodynamic fabric, featuring the embroidered Titan Force crest and Captain Shekhor Mohan Ray’s iconic number 17.'
                    : 'চ্যাম্পিয়নদের পোশাকে নিজেকে সাজিয়ে নিন। আধুনিক বাতাস চলাচল উপযোগী টেকসই ফ্যাব্রিক এবং অধিনায়ক শেখর মোহন রায়ের আইকনিক ১৭ নম্বর সম্বলিত অফিশিয়াল ম্যাচ জার্সি।'}
                </p>
              </div>

              {/* Marketing Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-left">
                  <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="font-bold text-white">
                      {lang === 'en' ? 'Pro-Grade Micro-Mesh' : 'প্রো-গ্রেড মাইক্রো-মেশ ফ্যাব্রিক'}
                    </div>
                    <div className="text-neutral-400 text-[11px]">
                      {lang === 'en' ? 'Quick-dry anti-sweat cooling tech' : 'দ্রুত ঘাম শোষণকারী আরামদায়ক উপাদান'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-left">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="font-bold text-white">
                      {lang === 'en' ? 'Daudpur 2026 Gold Patch' : 'দাউদপুর ২০২৬ চ্যাম্পিয়ন গোল্ড ব্যাজ'}
                    </div>
                    <div className="text-neutral-400 text-[11px]">
                      {lang === 'en' ? 'Embroidered championship crest' : 'উজ্জ্বল সিলিকন খচিত ক্লাব ক্রেস্ট'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-left">
                  <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="font-bold text-white">
                      {lang === 'en' ? 'Available Sizes: S to XXL' : 'সকল সাইজ সুলভ (S থেকে XXL)'}
                    </div>
                    <div className="text-neutral-400 text-[11px]">
                      {lang === 'en' ? 'Athletic matchday contour fit' : 'পারফেক্ট ফিট এবং আরামদায়ক'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-left">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="font-bold text-white">
                      {lang === 'en' ? 'Fast Delivery & Local Pickup' : 'দ্রুত ডেলিভারি ও মুলিকান্দি পিকআপ'}
                    </div>
                    <div className="text-neutral-400 text-[11px]">
                      {lang === 'en' ? 'Mulikandi Ground or Direct to Home' : 'সরাসরি বাড়ি বা মুলিকান্দি মাঠ থেকে সংগ্রহ'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: "Click to Store" & "View Details" */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('store')}
                  className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-lg shadow-rose-950/50 hover:shadow-rose-900/60 active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Click to Open Full Store' : 'স্টোরে গিয়ে অর্ডার করুন'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setDetailsModalOpen(true)}
                  className="px-5 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-neutral-200 font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Info className="w-4 h-4 text-rose-500" />
                  <span>{lang === 'en' ? 'View Jersey Details' : 'জার্সির বিস্তারিত তথ্য'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Jersey Details Quick Modal */}
      {detailsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-600/20 text-rose-500">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-black uppercase text-white">
                    {lang === 'en' ? 'Kit 17 Specifications' : 'কিট ১৭ জার্সির বিবরণ'}
                  </h4>
                  <span className="text-xs text-neutral-400">
                    {lang === 'en' ? 'Official Player Issue Quality' : 'অফিশিয়াল খেলোয়াড় সংস্করণ মান'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDetailsModalOpen(false)}
                className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs text-neutral-300">
              <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-400">{lang === 'en' ? 'Price:' : 'মূল্য:'}</span>
                <span className="text-lg font-black text-rose-500">499 ৳ BDT</span>
              </div>

              <div className="space-y-2">
                <div className="font-bold uppercase tracking-wider text-white text-[11px]">
                  {lang === 'en' ? 'Key Features:' : 'প্রধান বৈশিষ্ট্যসমূহ:'}
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-neutral-300">
                  <li>{lang === 'en' ? 'Moisture-wicking dry-fit micro polyester fabric' : 'উচ্চমানের ড্রাই-ফিট মাইক্রো পলিয়েস্টার উপাদান'}</li>
                  <li>{lang === 'en' ? 'Embroidered high-definition Titan Force club badge' : 'হাই-ডেফিনিশন খচিত টাইটান ফোর্স ক্লাব ক্রেস্ট'}</li>
                  <li>{lang === 'en' ? 'Captain Shekhor Mohan Ray official #17 rear print' : 'অধিনায়ক শেখর মোহন রায়ের অফিশিয়াল ১৭ নম্বর ব্যাক প্রিন্ট'}</li>
                  <li>{lang === 'en' ? 'Special gold celebratory star for Daudpur 2026 Championship' : 'দাউদপুর ২০২৬ চ্যাম্পিয়ন গোল্ডেন সেলিব্রেশন ব্যাজ'}</li>
                  <li>{lang === 'en' ? 'Sizes Available: S (36), M (38), L (40), XL (42), XXL (44)' : 'সাইজ সমূহ: S (৩৬), M (৩৮), L (৪০), XL (৪২), XXL (৪৪)'}</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-rose-500" />
                  <span>{lang === 'en' ? 'Ordering & Delivery:' : 'অর্ডার ও ডেলিভারি:'}</span>
                </div>
                <p className="text-neutral-400">
                  {lang === 'en'
                    ? 'Orders can be placed directly on the Official Store page or via WhatsApp with cash on delivery in Zakigonj, Sylhet.'
                    : 'অফিশিয়াল স্টোর পেজ থেকে সরাসরি অর্ডার করা যাবে অথবা হোয়াটসঅ্যাপের মাধ্যমে অর্ডার কনফার্ম করে ক্যাশ অন ডেলিভারি নেওয়া যাবে।'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setDetailsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold"
              >
                {lang === 'en' ? 'Close' : 'বন্ধ করুন'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDetailsModalOpen(false);
                  onNavigate('store');
                }}
                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <span>{lang === 'en' ? 'Go to Store to Order' : 'অর্ডার করতে স্টোরে যান'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
