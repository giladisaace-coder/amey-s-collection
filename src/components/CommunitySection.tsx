import React from 'react';
import { MessageCircle, Phone, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, BANK_DETAILS } from '../data/products';

export const CommunitySection: React.FC = () => {
  return (
    <section id="community" className="py-20 bg-gradient-to-b from-[#0e0e12] to-[#0a0a0c] border-t border-[#1f1f28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#14141d] via-[#171724] to-[#121218] border border-[#2b2b3a] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl gold-glow">
          {/* Decorative ambient elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#e2be6d] font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Amey's VIP Fashion Circle</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Join Our Exclusive WhatsApp Community
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
              Be the first to access new weekly drops of fine jewelry, ladies wear, sunglasses, signature perfumes, and handbags before they sell out. Get exclusive flash discounts, order priority, and instant customer service.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              {/* Prominent styled button linking to WhatsApp group */}
              <a
                href={CONTACT_INFO.whatsappGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-950/40 hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Join Official WhatsApp Group</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Direct call button with clearly displayed phone number */}
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="px-6 py-4 rounded-xl bg-[#1c1c27] hover:bg-[#252535] border border-[#343447] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all"
              >
                <Phone className="w-4 h-4 text-[#e2be6d]" />
                <span>Call {CONTACT_INFO.phoneFormatted}</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#262635] text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Direct Admin WhatsApp Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e2be6d]" />
                <span>Photo Pieces at 1,000 Naira</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Moniepoint Bank Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
