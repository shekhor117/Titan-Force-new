import React, { useState } from 'react';
import { CLUB_INFO, TRANSLATIONS } from '../data/clubData';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock, Globe } from 'lucide-react';

interface ContactSectionProps {
  lang: 'en' | 'bn';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(lang === 'en' ? 'Please enter your name.' : 'অনুগ্রহ করে আপনার নাম দিন।');
      return;
    }
    if (!message.trim()) {
      setError(lang === 'en' ? 'Please enter your message.' : 'আপনার বার্তা লিখুন।');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 pb-10 border-b border-neutral-800">
          <div className="text-xs font-bold uppercase tracking-widest text-rose-500">
            {lang === 'en' ? 'Supporter & Club Desk' : 'যোগাযোগ ও সমর্থক তথ্য'}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Split */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left 5 Cols: Official Contact Credentials Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
              <h3 className="font-display text-2xl font-black uppercase text-white">
                Club Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-800 text-rose-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-neutral-400 text-xs font-semibold uppercase">Official Phone</div>
                    <a
                      href={`tel:${CLUB_INFO.phone}`}
                      className="text-white hover:text-rose-400 font-mono font-bold text-sm tracking-wide transition-colors"
                    >
                      {CLUB_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-800 text-rose-500 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-neutral-400 text-xs font-semibold uppercase">Email Inquiries</div>
                    <a
                      href={`mailto:${CLUB_INFO.email}`}
                      className="text-white hover:text-rose-400 font-medium transition-colors break-all"
                    >
                      {CLUB_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Ground */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-800 text-rose-500 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-neutral-400 text-xs font-semibold uppercase">Pitch & Ground</div>
                    <div className="text-white font-medium">
                      {CLUB_INFO.homeGround}
                    </div>
                    <div className="text-neutral-400 text-xs">
                      {CLUB_INFO.location}
                    </div>
                  </div>
                </div>

                {/* Training Schedule */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-800 text-rose-500 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-neutral-400 text-xs font-semibold uppercase">First Team Training</div>
                    <div className="text-white font-medium">
                      Tuesdays, Thursdays, Saturdays at 4:30 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2">
                <a
                  href="https://wa.me/8809697377938"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Youth Academy & Player Trials Card with id="academy" */}
            <div id="academy" className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 space-y-3 scroll-mt-24">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'en' ? 'Youth Academy & Player Trials' : 'একাডেমি ও ট্রায়াল আবেদন'}</span>
              </div>
              <h4 className="font-display text-xl font-bold uppercase text-white">
                {lang === 'en' ? 'Join Titan Force Football Academy' : 'টাইটান ফোর্স ফুটবল একাডেমি'}
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {lang === 'en'
                  ? 'We welcome promising young footballers aged 14–22 from Zakigonj and Sylhet for scouted trials at Mulikandi High School Ground. Submit your details or call our coaching desk directly.'
                  : 'জকিগঞ্জ ও সিলেটের প্রতিশ্রুতিশীল অনূর্ধ্ব-২২ ফুটবলারদের জন্য মুলিকান্দি হাই স্কুল মাঠে নিয়মিত ট্রায়াল অনুষ্ঠিত হয়। নিচের ফর্মে বার্তা পাঠিয়ে সরাসরি আবেদন করুন।'}
              </p>
            </div>
          </div>

          {/* Right 7 Cols: Interactive Validated Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-display text-2xl font-black uppercase text-white pb-2 border-b border-neutral-800">
                    {lang === 'en' ? 'Send a Direct Message' : 'আমাদের বার্তা পাঠান'}
                  </h3>

                  {error && (
                    <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-xs text-rose-300">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        {t.contact.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-rose-600 focus:outline-none text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        {t.contact.phone}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+8801XXXXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-rose-600 focus:outline-none text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        {t.contact.email}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-rose-600 focus:outline-none text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        {t.contact.subject}
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Trials / Sponsorship / Match inquiry"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-rose-600 focus:outline-none text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      {t.contact.message} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-rose-600 focus:outline-none text-white text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.contact.sendMsg}</span>
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase text-white">
                    Message Delivered!
                  </h3>

                  <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                    {t.contact.successMsg}
                  </p>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                      setSubject('');
                    }}
                    className="px-5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white uppercase"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
