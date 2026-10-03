import React from 'react';
import { X, ShieldCheck, Check } from 'lucide-react';
import { BANK_DETAILS, CONTACT_INFO } from '../data/products';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#121217] border border-[#2b2b38] rounded-2xl overflow-hidden shadow-2xl my-8 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#23232f] flex items-center justify-between bg-[#16161e]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#e2be6d]" />
            <h2 className="text-xl font-serif font-bold text-white">
              Terms & Conditions
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#20202c] transition-colors"
            aria-label="Close terms"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-neutral-300 leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-base font-serif font-semibold text-white">
              1. Ordering & Acceptance
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              By placing an order on Amey's Collection, you confirm that all information provided (name, phone number, and delivery address) is accurate. All showcase jewelry pieces from our photographed collection are priced at 1,000 Naira (₦1,000) each.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-semibold text-white">
              2. Payment Policy (Bank Transfer)
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Payment must be completed strictly via direct bank transfer to our verified official business account:
            </p>
            <div className="p-4 rounded-xl bg-[#181822] border border-[#2d2d3c] text-xs font-mono space-y-1">
              <p><span className="text-neutral-400">Bank:</span> <span className="text-white font-bold">{BANK_DETAILS.bankName}</span></p>
              <p><span className="text-neutral-400">Account Number:</span> <span className="text-[#f3e5ab] font-bold">{BANK_DETAILS.accountNumber}</span></p>
              <p><span className="text-neutral-400">Account Name:</span> <span className="text-white font-bold">{BANK_DETAILS.accountName}</span></p>
            </div>
            <p className="text-xs text-neutral-400">
              Orders are packaged and dispatched upon verification of transfer receipt. Proof of payment should be forwarded via WhatsApp to {CONTACT_INFO.phone}.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-semibold text-white">
              3. Delivery & Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              We offer rapid dispatch across all states in Nigeria. Tracking details or dispatch courier notes will be provided via WhatsApp once your package leaves our fulfillment center.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-semibold text-white">
              4. Return & Exchange Policy
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Due to hygiene and quality standards, earrings and personal fragrance items cannot be returned once unsealed, unless damaged in transit. Any damage must be reported within 24 hours of package receipt accompanied by unboxing video proof.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-semibold text-white">
              5. Customer Support & WhatsApp VIP
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              For any questions regarding your order, contact us directly at {CONTACT_INFO.phone} or join our official WhatsApp Community at any time.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#23232f] bg-[#16161e] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
