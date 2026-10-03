import React, { useEffect, useState } from 'react';
import { SOCIAL_LINKS } from '../data/products';
import { generateQrDataUrl } from '../utils/qr';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Share2, 
  QrCode, 
  ExternalLink, 
  Sparkles,
  Camera
} from 'lucide-react';

export const SocialsSection: React.FC = () => {
  const [tiktokQr, setTiktokQr] = useState<string>('');
  const [instagramQr, setInstagramQr] = useState<string>('');

  useEffect(() => {
    generateQrDataUrl(SOCIAL_LINKS.tiktok).then(setTiktokQr);
    generateQrDataUrl(SOCIAL_LINKS.instagram).then(setInstagramQr);
  }, []);

  return (
    <section id="socials" className="py-20 bg-[#0d0d12] border-t border-[#1f1f2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#e2be6d] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect & Follow Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Official Amey's Collectionz Channels
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Scan our QR codes or follow our verified pages on TikTok, Instagram, Facebook, and WhatsApp for live unboxings, new fashion arrivals, and instant orders.
          </p>
        </div>

        {/* QR Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* TikTok Card */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#14141d] border border-[#272736] hover:border-[#c5a059]/50 transition-all flex flex-col items-center text-center shadow-xl gold-glow">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Official TikTok Channel</span>
            </div>

            {/* QR Frame */}
            <div className="p-4 rounded-2xl bg-white shadow-2xl mb-5 flex flex-col items-center border-4 border-[#242434]">
              {tiktokQr ? (
                <img
                  src={tiktokQr}
                  alt="Amey's Collectionz TikTok QR"
                  className="w-48 h-48 object-contain"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-neutral-100 text-neutral-400">
                  <QrCode className="w-12 h-12" />
                </div>
              )}
              <span className="text-[11px] font-bold text-neutral-900 mt-2 font-mono uppercase tracking-wider">
                Scan on TikTok
              </span>
            </div>

            <h3 className="text-lg font-serif font-bold text-white mb-1">
              AMEY'S COLLECTIONZ
            </h3>
            <p className="text-xs font-mono text-[#e2be6d] mb-4 font-semibold">
              {SOCIAL_LINKS.tiktokHandle}
            </p>

            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-xl bg-[#20202c] hover:bg-[#2b2b3a] text-white border border-[#37374a] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Open TikTok Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#e2be6d]" />
            </a>
          </div>

          {/* Instagram Card */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#14141d] border border-[#272736] hover:border-[#c5a059]/50 transition-all flex flex-col items-center text-center shadow-xl gold-glow">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
              <span>Official Instagram Lookbook</span>
            </div>

            {/* QR Frame */}
            <div className="p-4 rounded-2xl bg-white shadow-2xl mb-5 flex flex-col items-center border-4 border-[#242434]">
              {instagramQr ? (
                <img
                  src={instagramQr}
                  alt="Amey's Collectionz Instagram QR"
                  className="w-48 h-48 object-contain"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-neutral-100 text-neutral-400">
                  <QrCode className="w-12 h-12" />
                </div>
              )}
              <span className="text-[11px] font-bold text-neutral-900 mt-2 font-mono uppercase tracking-wider">
                Scan on Instagram
              </span>
            </div>

            <h3 className="text-lg font-serif font-bold text-white mb-1">
              AMEY'S COLLECTIONZ
            </h3>
            <p className="text-xs font-mono text-[#e2be6d] mb-4 font-semibold">
              {SOCIAL_LINKS.instagramHandle}
            </p>

            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-xl bg-[#20202c] hover:bg-[#2b2b3a] text-white border border-[#37374a] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Camera className="w-3.5 h-3.5 text-pink-400" />
              <span>Open Instagram Page</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#e2be6d]" />
            </a>
          </div>
        </div>

        {/* Quick Connect Strips: Facebook, Email, Phone, WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Facebook */}
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#14141d] border border-[#252533] hover:border-blue-500/50 hover:bg-[#181824] transition-all flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-400 group-hover:scale-105 transition-transform">
              <Share2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                Facebook Page
              </p>
              <p className="text-[11px] text-neutral-400 truncate">
                Amey's Collectionz Official
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="p-4 rounded-2xl bg-[#14141d] border border-[#252533] hover:border-[#c5a059]/60 hover:bg-[#181824] transition-all flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-[#20202c] border border-[#363647] text-[#e2be6d] group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white group-hover:text-[#e2be6d] transition-colors">
                Email Inquiries
              </p>
              <p className="text-[11px] text-neutral-400 truncate font-mono">
                {SOCIAL_LINKS.email}
              </p>
            </div>
          </a>

          {/* Direct WhatsApp Call */}
          <a
            href={`tel:${SOCIAL_LINKS.phone}`}
            className="p-4 rounded-2xl bg-[#14141d] border border-[#252533] hover:border-amber-500/50 hover:bg-[#181824] transition-all flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                Call Directly
              </p>
              <p className="text-[11px] text-neutral-400 font-mono">
                {SOCIAL_LINKS.phoneFormatted}
              </p>
            </div>
          </a>

          {/* WhatsApp VIP Group */}
          <a
            href={SOCIAL_LINKS.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#14141d] border border-[#252533] hover:border-emerald-500/50 hover:bg-[#181824] transition-all flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                WhatsApp VIP Group
              </p>
              <p className="text-[11px] text-emerald-400 font-medium">
                Join Community Drop
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
