import React, { useState, useRef } from 'react';
import { PLAYERS_DATA } from '../data/clubData';
import { CreditCard, Download, Copy, Check, Sparkles, Shield, QrCode } from 'lucide-react';

interface SupporterPassProps {
  lang: 'en' | 'bn';
}

export const SupporterPassGenerator: React.FC<SupporterPassProps> = ({ lang }) => {
  const [supporterName, setSupporterName] = useState('Shekhor Mohan Roy');
  const [supporterTier, setSupporterTier] = useState<'Titan Ultra' | 'Founding Member' | 'Red & Black Army'>('Founding Member');
  const [favPlayerNum, setFavPlayerNum] = useState<number>(17);
  const [passNumber, setPassNumber] = useState<string>('TF-2026-0817');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const selectedPlayer = PLAYERS_DATA.find(p => p.num === favPlayerNum) || PLAYERS_DATA[0];

  const handleGenerateId = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setPassNumber(`TF-2026-${randomSuffix}`);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(passNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCard = () => {
    // Generate an image representation via HTML Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 600, 360);
    gradient.addColorStop(0, '#0f0f12');
    gradient.addColorStop(0.5, '#1e1115');
    gradient.addColorStop(1, '#0a0a0c');
    ctx.fillStyle = gradient;
    ctx.roundRect(0, 0, 600, 360, 24);
    ctx.fill();

    // Red Accent Border
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 4;
    ctx.roundRect(4, 4, 592, 352, 22);
    ctx.stroke();

    // Club Header
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('TITAN FORCE MULIKANDI FC', 36, 52);

    ctx.fillStyle = '#e11d48';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('OFFICIAL DIGITAL SUPPORTER PASS', 36, 78);

    // Gold Divider
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(36, 92, 528, 2);

    // Supporter Details
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '12px sans-serif';
    ctx.fillText('CARDHOLDER NAME', 36, 135);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText((supporterName || 'SUPPORTER').toUpperCase(), 36, 165);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '12px sans-serif';
    ctx.fillText('MEMBERSHIP TIER', 36, 215);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(supporterTier.toUpperCase(), 36, 240);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '12px sans-serif';
    ctx.fillText('PASS ID NUMBER', 36, 285);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(passNumber, 36, 312);

    // Favorite Player on Right
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '12px sans-serif';
    ctx.fillText('FAVORITE PLAYER', 380, 135);

    ctx.fillStyle = '#e11d48';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(`#${selectedPlayer.num} ${selectedPlayer.name.toUpperCase()}`, 380, 168);

    ctx.fillStyle = '#71717a';
    ctx.font = '11px sans-serif';
    ctx.fillText('EST. 2025 · ZAKIGONJ, SYLHET', 380, 312);

    // Trigger Download
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `TitanForce-Pass-${passNumber}.png`;
    a.click();
  };

  return (
    <section id="member-pass" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 pb-10 border-b border-neutral-800">
          <div className="text-xs font-bold uppercase tracking-widest text-rose-500 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span>{lang === 'en' ? 'Official Fan Identity' : 'অফিশিয়াল মেম্বারশিপ পাস'}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {lang === 'en' ? 'Digital Titan Member Pass' : 'টাইটান ডিজিটাল সমর্থক কার্ড'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
            {lang === 'en'
              ? 'Generate your personalized official club pass. Carry the colors of Mulikandi wherever you travel.'
              : 'আপনার ব্যক্তিগত ডিজিটাল সমর্থক কার্ড তৈরি করুন এবং ডাউনলোড করে সংরক্ষণ করুন।'}
          </p>
        </div>

        {/* Form and Pass Split */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left 5 Columns: Pass Customizer Controls */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5">
            <h3 className="font-display text-2xl font-black uppercase text-white pb-2 border-b border-neutral-800">
              Customize Your Card
            </h3>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={supporterName}
                onChange={(e) => setSupporterName(e.target.value)}
                maxLength={28}
                placeholder="e.g. Shekhor Mohan Roy"
                className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-rose-600 focus:outline-none text-white text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Supporter Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Founding Member', 'Titan Ultra', 'Red & Black Army'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSupporterTier(tier)}
                    className={`px-2 py-2 text-[11px] font-bold rounded-lg border transition-all truncate ${
                      supporterTier === tier
                        ? 'bg-rose-600 border-rose-500 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Favorite Player
              </label>
              <select
                value={favPlayerNum}
                onChange={(e) => setFavPlayerNum(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-rose-600 focus:outline-none text-white text-xs"
              >
                {PLAYERS_DATA.map((p) => (
                  <option key={p.id} value={p.num}>
                    #{p.num} {p.fullName} ({p.position})
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleGenerateId}
                className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Generate New Pass ID</span>
              </button>

              <button
                onClick={handleDownloadCard}
                className="w-full py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Pass (PNG)</span>
              </button>
            </div>
          </div>

          {/* Right 7 Columns: The Ultra-Luxury Holographic Card */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={cardRef}
              className="relative w-full max-w-[540px] min-h-[250px] sm:aspect-[1.7/1] rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-rose-950/60 border-2 border-rose-600/70 shadow-2xl p-4 sm:p-8 flex flex-col justify-between overflow-hidden"
              style={{
                boxShadow: '0 25px 50px -12px rgba(225, 29, 72, 0.25)'
              }}
            >
              {/* Metallic Shine Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              {/* Top Row: Club Brand & Hologram */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/logos/titanforce-logo.svg"
                    alt="Titan Force Crest"
                    className="w-12 h-12 object-contain drop-shadow"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                      TITAN FORCE FC
                    </h4>
                    <span className="text-[10px] font-mono tracking-widest text-rose-400 uppercase font-semibold">
                      MULIKANDI · OFFICIAL PASS
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {supporterTier}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 mt-1">
                    SEASON 2026/27
                  </span>
                </div>
              </div>

              {/* Center Row: Cardholder Name & Favorite Player */}
              <div className="relative z-10 grid grid-cols-2 gap-4 py-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Member Name
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-black uppercase text-white truncate tracking-wide">
                    {supporterName || 'SUPPORTER'}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Favorite Icon
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-black uppercase text-rose-500">
                    #{selectedPlayer.num} {selectedPlayer.name}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Barcode / Pass ID & QR */}
              <div className="relative z-10 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[9px] uppercase font-mono text-neutral-400">
                    Official Pass Number
                  </div>
                  <div className="font-mono font-bold text-sm text-neutral-200 tracking-wider">
                    {passNumber}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyId}
                    className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                    title="Copy Pass Number"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <div className="w-8 h-8 rounded bg-neutral-950 border border-neutral-700 flex items-center justify-center text-rose-500">
                    <QrCode className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Trust Stamp */}
            <div className="mt-3 text-xs text-neutral-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Verified Official Supporter Identity · Mulikandi, Sylhet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
