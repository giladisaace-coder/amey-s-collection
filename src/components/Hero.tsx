import React from 'react';
import { ArrowDown, MessageCircle, Sparkles, ShieldCheck, Truck, Gem } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0a0a0d]">
      {/* Pure Luxury Dark Atmosphere with subtle Gold Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-[#1e1a12]/40 via-[#0a0a0d] to-[#0a0a0d] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a059]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Unboxed Kicker */}
        <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#e2be6d] font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#e2be6d]" />
          <span>Haute Fashion & Contemporary Elegance</span>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white mb-6 max-w-4xl text-balance">
          <span className="text-gold-gradient">Amey's Collectionz</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-neutral-200 mb-8 max-w-2xl text-balance font-light">
          “Shop your next favorite piece from us.”
        </p>

        {/* Curated lines overview */}
        <p className="text-xs sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10 text-balance">
          Explore our exclusive inventory of <span className="text-neutral-200">Jewelry & Hairpins</span>, <span className="text-neutral-200">Designer Sunglasses</span>, <span className="text-neutral-200">Handbags</span>, <span className="text-neutral-200">Ladies Wear</span>, and <span className="text-neutral-200">Prestige Perfumes</span>.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold-gradient text-[#14120c] font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-lg gold-glow flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <a
            href={SOCIAL_LINKS.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#15151c] border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-950/60 hover:border-emerald-400 font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Join VIP WhatsApp Group</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="w-full max-w-3xl pt-8 border-t border-[#23232c] grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#181822] text-[#e2be6d] border border-[#2b2b38] shrink-0">
              <Gem className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">Authentic Stock</p>
              <p className="text-xs text-neutral-400">Directly cataloged boutique inventory pieces.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#181822] text-[#e2be6d] border border-[#2b2b38] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">Moniepoint Bank</p>
              <p className="text-xs text-neutral-400">Secure bank transfer verification & receipt tracking.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#181822] text-[#e2be6d] border border-[#2b2b38] shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">Direct Dispatch</p>
              <p className="text-xs text-neutral-400">Direct courier dispatch with WhatsApp tracking.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
