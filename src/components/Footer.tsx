import React from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Building2, 
  ShieldCheck, 
  Share2, 
  ExternalLink,
  Camera,
  QrCode
} from 'lucide-react';
import { SOCIAL_LINKS, BANK_DETAILS } from '../data/products';

interface FooterProps {
  onOpenTerms: () => void;
  onSelectCategory: (category: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms, onSelectCategory }) => {
  return (
    <footer id="contact" className="bg-[#08080b] border-t border-[#1a1a24] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand Info & Social Links */}
          <div className="space-y-4">
            <span className="text-2xl font-serif font-bold text-white text-gold-gradient block">
              Amey's Collectionz
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Shop your next favorite piece from us. Exclusive deals on jewelry, hairpins, sunglasses, handbags, ladies wear, and perfumes.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={SOCIAL_LINKS.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-semibold text-xs uppercase tracking-wider hover:bg-emerald-900/80 transition-all w-fit"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join WhatsApp Group</span>
              </a>

              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-blue-400 transition-colors pt-1"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Follow on Facebook</span>
              </a>

              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-[#e2be6d] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#e2be6d]" />
                <span className="font-mono">{SOCIAL_LINKS.email}</span>
              </a>
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-semibold text-white uppercase tracking-wider">
              Explore Lines
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('Jewelry')}
                  className="hover:text-[#e2be6d] transition-colors cursor-pointer text-left"
                >
                  Jewelry & Hairpins
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Sunglasses')}
                  className="hover:text-[#e2be6d] transition-colors cursor-pointer text-left"
                >
                  Designer Sunglasses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Handbags')}
                  className="hover:text-[#e2be6d] transition-colors cursor-pointer text-left"
                >
                  Handbags & Totes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Ladies Wear')}
                  className="hover:text-[#e2be6d] transition-colors cursor-pointer text-left"
                >
                  Ladies Wear & Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Perfume')}
                  className="hover:text-[#e2be6d] transition-colors cursor-pointer text-left"
                >
                  Prestige Perfumes (Ask on WhatsApp)
                </button>
              </li>
            </ul>
          </div>

          {/* Official Bank Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#e2be6d]" />
              Official Bank Details
            </h4>
            <div className="p-4 rounded-xl bg-[#121219] border border-[#252536] space-y-1.5 text-[11px] font-mono">
              <p className="text-neutral-400">
                Method: <span className="text-white font-medium">{BANK_DETAILS.paymentMethod}</span>
              </p>
              <p className="text-neutral-400">
                Bank: <span className="text-white font-bold">{BANK_DETAILS.bankName}</span>
              </p>
              <p className="text-neutral-400">
                Account No:{' '}
                <span className="text-[#f3e5ab] font-bold text-xs">
                  {BANK_DETAILS.accountNumber}
                </span>
              </p>
              <p className="text-neutral-400">
                Account Name: <span className="text-white font-medium">{BANK_DETAILS.accountName}</span>
              </p>
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Direct transfer verified via WhatsApp with terms acceptance and fast nationwide dispatch.
            </p>
          </div>

          {/* Socials & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-semibold text-white uppercase tracking-wider">
              Socials & Customer Line
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e2be6d] shrink-0" />
                <div>
                  <p className="text-[11px] text-neutral-400">Phone / WhatsApp Line:</p>
                  <a
                    href={`tel:${SOCIAL_LINKS.phone}`}
                    className="text-white font-mono font-semibold hover:text-[#e2be6d] transition-colors"
                  >
                    {SOCIAL_LINKS.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Camera className="w-4 h-4 text-pink-400 shrink-0" />
                <div>
                  <p className="text-[11px] text-neutral-400">Instagram:</p>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-200 hover:text-pink-400 transition-colors font-mono"
                  >
                    {SOCIAL_LINKS.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <QrCode className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <p className="text-[11px] text-neutral-400">TikTok:</p>
                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-200 hover:text-cyan-400 transition-colors font-mono"
                  >
                    {SOCIAL_LINKS.tiktokHandle}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenTerms}
                  className="text-neutral-400 hover:text-white underline text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#e2be6d]" />
                  Terms and Conditions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1a1a24] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} Amey's Collectionz. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={onOpenTerms} className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <a href={`tel:${SOCIAL_LINKS.phone}`} className="hover:text-white transition-colors">
              Customer Support: {SOCIAL_LINKS.phoneFormatted}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
