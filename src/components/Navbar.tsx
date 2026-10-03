import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Phone, QrCode } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeCategory: string;
  onSelectCategory: (category: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string, category?: string) => {
    setMobileMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0c0e]/95 backdrop-blur-md border-b border-[#23232b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-2xl sm:text-3xl font-serif tracking-tight text-white hover:text-[#e2be6d] transition-colors flex items-center gap-2"
        >
          <span className="text-gold-gradient font-bold">Amey's Collectionz</span>
        </a>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-neutral-300">
          <button 
            onClick={() => handleNavClick('shop', 'All')} 
            className="hover:text-[#e2be6d] transition-colors cursor-pointer"
          >
            Collection
          </button>
          <button 
            onClick={() => handleNavClick('categories')} 
            className="hover:text-[#e2be6d] transition-colors cursor-pointer"
          >
            Categories
          </button>
          <button 
            onClick={() => handleNavClick('socials')} 
            className="hover:text-[#e2be6d] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5 text-[#e2be6d]" />
            <span>Socials & QR</span>
          </button>
          <button 
            onClick={() => handleNavClick('community')} 
            className="hover:text-[#e2be6d] transition-colors cursor-pointer"
          >
            VIP Group
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className="hover:text-[#e2be6d] transition-colors cursor-pointer"
          >
            Contact & Bank
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* WhatsApp Group Quick Link Button */}
          <a
            href={SOCIAL_LINKS.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-xl hover:bg-emerald-900/60 hover:border-emerald-400 transition-all whitespace-nowrap"
            title="Join Amey's Collectionz WhatsApp VIP Group"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>VIP Group</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#171722] border border-[#2b2b3a] text-white hover:border-[#c5a059] hover:bg-[#1e1e2c] transition-all cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#e2be6d]" />
            <span className="text-xs font-medium uppercase tracking-wider hidden xs:inline">Bag</span>
            <span className="font-mono tabular-nums text-xs px-2 py-0.5 rounded-full bg-[#c5a059] text-black font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#18181f] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#101015] border-b border-[#23232b] px-5 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <button
              onClick={() => handleNavClick('shop', 'All')}
              className="text-left text-neutral-200 hover:text-[#e2be6d] py-1"
            >
              Full Catalog
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="text-left text-neutral-200 hover:text-[#e2be6d] py-1"
            >
              Categories & Lines
            </button>
            <button
              onClick={() => handleNavClick('socials')}
              className="text-left text-[#e2be6d] font-semibold py-1 flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              TikTok & Instagram QR Codes
            </button>
            <button
              onClick={() => handleNavClick('community')}
              className="text-left text-neutral-200 hover:text-[#e2be6d] py-1"
            >
              WhatsApp VIP Community
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left text-neutral-200 hover:text-[#e2be6d] py-1"
            >
              Bank Transfer Info & Contact
            </button>
          </div>

          <div className="pt-3 border-t border-[#23232b] flex flex-col gap-2.5">
            <a
              href={SOCIAL_LINKS.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold text-xs tracking-wider uppercase"
            >
              <MessageCircle className="w-4 h-4" />
              Join WhatsApp Group
            </a>
            <a
              href={`tel:${SOCIAL_LINKS.phone}`}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#181822] text-neutral-300 text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#e2be6d]" />
              Call {SOCIAL_LINKS.phoneFormatted}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
