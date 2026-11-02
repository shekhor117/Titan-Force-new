import React, { useState } from 'react';
import { Product, PRODUCTS_DATA, TRANSLATIONS } from '../data/clubData';
import { ShoppingBag, Check, Star, ShieldCheck, Truck, X, MessageSquare, Phone } from 'lucide-react';

interface ShopSectionProps {
  lang: 'en' | 'bn';
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({ lang, cartOpen, setCartOpen }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS_DATA[0]);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState<number>(1);
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [formError, setFormError] = useState('');

  const t = TRANSLATIONS[lang];
  const totalPrice = selectedProduct.price * quantity;

  const handleOpenOrder = (product: Product) => {
    setSelectedProduct(product);
    setOrderSuccess(false);
    setFormError('');
    setOrderModalOpen(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError(lang === 'en' ? 'Please enter your full name.' : 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      setFormError(lang === 'en' ? 'Please enter a valid phone number.' : 'সঠিক মোবাইল নম্বর প্রদান করুন।');
      return;
    }
    if (!customerAddress.trim()) {
      setFormError(lang === 'en' ? 'Please enter delivery address.' : 'ডেলিভারি ঠিকানা প্রদান করুন।');
      return;
    }

    setFormError('');
    setOrderSuccess(true);
  };

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Titan Force Mulikandi!\nI would like to order:\n- Item: ${selectedProduct.name}\n- Size: ${selectedSize}\n- Quantity: ${quantity}\n- Total: ${totalPrice} BDT\n- Name: ${customerName || 'Supporter'}\n- Phone: ${customerPhone || 'N/A'}\n- Address: ${customerAddress || 'Zakigonj/Sylhet'}`
    );
    return `https://wa.me/8809697377938?text=${text}`;
  };

  return (
    <section id="store" className="scroll-mt-28 sm:scroll-mt-32 py-16 sm:py-20 bg-neutral-950 border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 pb-10 border-b border-neutral-800">
          <div className="text-xs font-bold uppercase tracking-widest text-rose-500 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>{lang === 'en' ? 'Official Supporter Gear' : 'অফিশিয়াল জার্সি ও মার্চেন্ডাইজ'}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {t.store.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
            {t.store.subtitle}
          </p>
        </div>

        {/* Featured Product Hero Card: Kit 17 Shekhor Jersey */}
        <div className="mt-12 rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 5 Cols: Product Photography with Studio Depth */}
            <div className="lg:col-span-5 relative flex items-center justify-center p-6 bg-gradient-to-b from-neutral-950 to-neutral-900 rounded-xl border border-neutral-800 overflow-hidden min-h-[380px]">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="max-h-[320px] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900/80 border border-neutral-700 text-xs font-semibold text-rose-400">
                <span>{selectedProduct.category}</span>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="tabular-nums">{selectedProduct.rating}</span>
                <span className="text-neutral-500">({selectedProduct.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Right 7 Cols: Details, Size Picker & Order Control */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>{t.store.inStock}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span className="text-neutral-400">Official Match Edition</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  {selectedProduct.name}
                </h3>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="font-display text-3xl font-black text-rose-500 tabular-nums">
                    {selectedProduct.price} {t.store.currency}
                  </span>
                  <span className="text-xs text-neutral-400 line-through tabular-nums">
                    650 {t.store.currency}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold ml-2">
                    Save 151 {t.store.currency}
                  </span>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed pt-2">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                {selectedProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Size Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  {t.store.selectSize}: <span className="text-rose-400">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-11 h-11 rounded-lg text-xs font-bold transition-all ${
                        selectedSize === s
                          ? 'bg-rose-600 text-white shadow ring-2 ring-rose-500/50'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Checkout CTA */}
              <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-neutral-400 hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-bold font-mono text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-neutral-400 hover:text-white font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleOpenOrder(selectedProduct)}
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.store.buyNow} ({totalPrice} {t.store.currency})</span>
                </button>
              </div>

              {/* Guarantee badges */}
              <div className="flex items-center gap-6 text-xs text-neutral-400 pt-2">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-neutral-500" />
                  <span>Delivery across Bangladesh & Sylhet</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-neutral-500" />
                  <span>100% Authentic Match Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Products Row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PRODUCTS_DATA.map((product) => {
            const isSelected = selectedProduct.id === product.id;
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`p-5 rounded-xl border card-interactive-glow cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-neutral-900 border-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                    : 'bg-neutral-900/60 border-neutral-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-neutral-950 p-2 flex items-center justify-center shrink-0">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{product.name}</h4>
                    <p className="text-xs text-rose-400 font-mono font-semibold tabular-nums">
                      {product.price} {t.store.currency}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenOrder(product);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-neutral-800 hover:bg-neutral-700 text-white whitespace-nowrap"
                >
                  Order
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal: Order Checkout & Delivery Confirmation */}
        {(orderModalOpen || cartOpen) && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-3 sm:p-6"
            onClick={() => {
              setOrderModalOpen(false);
              setCartOpen(false);
            }}
          >
            <div className="flex min-h-full items-center justify-center py-4">
              <div
                className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto my-auto"
                onClick={(e) => e.stopPropagation()}
              >
              <button
                onClick={() => {
                  setOrderModalOpen(false);
                  setCartOpen(false);
                }}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-800"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {!orderSuccess ? (
                <>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                      Official Club Order
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-white">
                      Complete Your Order
                    </h3>
                  </div>

                  {/* Summary Bar */}
                  <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-white block">{selectedProduct.name}</strong>
                      <span className="text-neutral-400">Size: {selectedSize} · Qty: {quantity}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-lg font-black text-rose-500 tabular-nums">
                        {totalPrice} {t.store.currency}
                      </span>
                    </div>
                  </div>

                  {formError && (
                    <div className="p-2.5 rounded bg-rose-950/80 border border-rose-800 text-xs text-rose-300">
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleOrderSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-neutral-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Tanvir Ahmed"
                        className="w-full px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-rose-600 focus:outline-none text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-300 mb-1">
                        Phone Number (Mobile) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. 017XXXXXXXX"
                        className="w-full px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-rose-600 focus:outline-none text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-300 mb-1">
                        Delivery Address (Sylhet / Anywhere in BD) *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="House / Village, Zakigonj, Sylhet..."
                        className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-rose-600 focus:outline-none text-white resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase tracking-wider text-xs transition-colors"
                      >
                        Confirm Cash on Delivery Order
                      </button>

                      <a
                        href={generateWhatsAppLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs text-center flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Order via WhatsApp (+8809697377938)</span>
                      </a>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase text-white">
                    Order Confirmed!
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Thank you, <strong className="text-white">{customerName}</strong>! Your order for the <strong className="text-rose-400">{selectedProduct.name} (Size: {selectedSize})</strong> has been received. Our team in Zakigonj will contact you at <strong className="text-white font-mono">{customerPhone}</strong> to arrange delivery.
                  </p>

                  <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-[11px] font-mono text-neutral-400">
                    Order Ref: #TF-{Math.floor(100000 + Math.random() * 900000)}
                  </div>

                  <button
                    onClick={() => {
                      setOrderModalOpen(false);
                      setCartOpen(false);
                    }}
                    className="px-6 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold uppercase text-white"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </section>
  );
};
