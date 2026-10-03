import React, { useState } from 'react';
import { CartItem, CustomerDetails } from '../types';
import { BANK_DETAILS, CONTACT_INFO } from '../data/products';
import { 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  FileText,
  CreditCard,
  Building2,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
  onOpenTerms: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
  onOpenTerms,
}) => {
  const [currentStep, setCurrentStep] = useState<'details' | 'payment'>('details');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [orderReference, setOrderReference] = useState<string>('');

  const [form, setForm] = useState<CustomerDetails>({
    fullName: '',
    phoneNumber: '',
    email: '',
    deliveryAddress: '',
    cityState: '',
    orderNotes: '',
    acceptedTerms: false,
  });

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError(null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, acceptedTerms: e.target.checked }));
    if (validationError) setValidationError(null);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Mandatory Form Validations
    if (!form.fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!form.phoneNumber.trim() || form.phoneNumber.trim().length < 8) {
      setValidationError('Please enter a valid phone number (e.g., +234 813 233 4450).');
      return;
    }
    if (!form.deliveryAddress.trim()) {
      setValidationError('Please enter your complete delivery address.');
      return;
    }

    // 2. CRUCIAL MANDATORY REQUIREMENT: Terms and Conditions checkbox MUST be ticked
    if (!form.acceptedTerms) {
      setValidationError('You MUST accept the Terms and Conditions before you can view payment details or place an order.');
      return;
    }

    // Create unique order reference
    const refCode = `AMEY-${Date.now().toString().slice(-6)}`;
    setOrderReference(refCode);
    setValidationError(null);
    setCurrentStep('payment');
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2200);
  };

  const handleSendWhatsAppOrder = () => {
    const itemList = items
      .map((item, idx) => `${idx + 1}. ${item.product.name} (x${item.quantity}) - ₦${(item.product.price * item.quantity).toLocaleString()}`)
      .join('%0A');

    const message = 
      `*NEW ORDER - AMEY'S COLLECTION*%0A` +
      `--------------------------------%0A` +
      `*Order ID:* ${orderReference}%0A` +
      `*Customer:* ${encodeURIComponent(form.fullName)}%0A` +
      `*Phone:* ${encodeURIComponent(form.phoneNumber)}%0A` +
      `*Delivery Address:* ${encodeURIComponent(form.deliveryAddress)}${form.cityState ? `, ${encodeURIComponent(form.cityState)}` : ''}%0A` +
      (form.orderNotes ? `*Note:* ${encodeURIComponent(form.orderNotes)}%0A` : '') +
      `--------------------------------%0A` +
      `*ITEMS ORDERED:*%0A${itemList}%0A` +
      `--------------------------------%0A` +
      `*TOTAL TO TRANSFER:* ₦${totalAmount.toLocaleString()}%0A` +
      `*PAYMENT TO:* Moniepoint Bank - 5096169229 (Amey's collections)%0A` +
      `--------------------------------%0A` +
      `I have transferred the payment and am attaching my transfer receipt/proof below for verification!`;

    window.open(`https://wa.me/2348132334450?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#111116] border border-[#2b2b38] rounded-2xl overflow-hidden shadow-2xl my-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#22222e] flex items-center justify-between bg-[#15151c]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#e2be6d]">
                Checkout
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-xs font-mono text-neutral-400">
                {currentStep === 'details' ? 'Step 1: Customer Details & Terms' : 'Step 2: Bank Transfer Payment'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              {currentStep === 'details' ? 'Customer Information' : 'Official Payment Instructions'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#20202c] transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Customer Details & Mandatory Terms Checkbox */}
        {currentStep === 'details' ? (
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-6">
            {/* Order Brief Summary */}
            <div className="p-4 rounded-xl bg-[#161620] border border-[#252533] flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400">Order Summary ({items.length} unique items)</p>
                <p className="text-lg font-bold text-white font-mono tabular-nums text-gold-gradient">
                  ₦{totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="text-right text-xs text-neutral-400">
                <span>Payment Method</span>
                <p className="text-neutral-200 font-semibold">Bank Transfer</p>
              </div>
            </div>

            {/* Error banner if validation fails */}
            {validationError && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Customer Inputs */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={form.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Sandra Johnson"
                    className="w-full px-4 py-3 rounded-xl bg-[#171720] border border-[#2a2a38] text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Phone / WhatsApp Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    value={form.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. +234 813 233 4450"
                    className="w-full px-4 py-3 rounded-xl bg-[#171720] border border-[#2a2a38] text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Delivery Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="deliveryAddress"
                  required
                  value={form.deliveryAddress}
                  onChange={handleInputChange}
                  placeholder="Street address, Apartment / Suite, Landmark"
                  className="w-full px-4 py-3 rounded-xl bg-[#171720] border border-[#2a2a38] text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    City & State
                  </label>
                  <input
                    type="text"
                    name="cityState"
                    value={form.cityState}
                    onChange={handleInputChange}
                    placeholder="e.g. Lagos, Nigeria"
                    className="w-full px-4 py-3 rounded-xl bg-[#171720] border border-[#2a2a38] text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Order Note (Optional)
                  </label>
                  <input
                    type="text"
                    name="orderNotes"
                    value={form.orderNotes}
                    onChange={handleInputChange}
                    placeholder="Special instructions, gate code, etc."
                    className="w-full px-4 py-3 rounded-xl bg-[#171720] border border-[#2a2a38] text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059] text-sm"
                  />
                </div>
              </div>
            </div>

            {/* MANDATORY CHECKBOX: CRUCIAL REQUIREMENT */}
            <div className="p-4 rounded-xl bg-[#181822] border-2 border-[#38384a] transition-colors hover:border-[#c5a059]/60">
              <label className="flex items-start gap-3.5 cursor-pointer">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={form.acceptedTerms}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-5 h-5 rounded border-[#404052] text-[#c5a059] focus:ring-[#c5a059] focus:ring-offset-0 bg-[#0e0e13] cursor-pointer"
                />
                <div className="text-xs text-neutral-300 select-none">
                  <span className="font-semibold text-white">
                    I accept the Terms and Conditions
                  </span>{' '}
                  <span className="text-red-400">* (Mandatory)</span>
                  <p className="text-neutral-400 mt-1 leading-relaxed">
                    By checking this, you agree to our order terms, bank transfer verification process via Moniepoint Bank, and dispatch policies.{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenTerms();
                      }}
                      className="text-[#e2be6d] hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <span>Read full terms</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </p>
                </div>
              </label>
            </div>

            {/* Action button: Proceed */}
            <button
              type="submit"
              disabled={!form.acceptedTerms}
              className={`w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                form.acceptedTerms
                  ? 'bg-gold-gradient text-black hover:opacity-95 shadow-lg gold-glow'
                  : 'bg-[#22222d] text-neutral-500 border border-[#2d2d3a] cursor-not-allowed'
              }`}
            >
              <span>Accept Terms & Proceed to Payment Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Step 2: Payment Details (Displayed ONLY after terms accepted) */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Success state badge */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Terms & Conditions accepted. Please complete the bank transfer below.</span>
            </div>

            {/* Total Amount Card */}
            <div className="p-5 rounded-2xl bg-[#161622] border border-[#c5a059]/40 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-[#c5a059]/10 rounded-full blur-xl pointer-events-none" />
              <p className="text-xs uppercase tracking-widest text-[#e2be6d] font-semibold mb-1">
                Order Total to Transfer
              </p>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-white text-gold-gradient mb-1">
                ₦{totalAmount.toLocaleString()}
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Order Ref: <span className="text-neutral-200 font-bold">{orderReference}</span>
              </p>
            </div>

            {/* SPECIFIED BANK DETAILS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  Bank Transfer Instructions
                </span>
                <span className="text-[11px] text-neutral-500">
                  Single-step direct deposit
                </span>
              </div>

              <div className="p-5 rounded-xl bg-[#15151c] border border-[#2d2d3c] space-y-4">
                {/* Payment Method */}
                <div className="flex items-center justify-between py-2 border-b border-[#23232f]">
                  <span className="text-xs text-neutral-400 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#e2be6d]" />
                    Payment Method
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {BANK_DETAILS.paymentMethod}
                  </span>
                </div>

                {/* Bank Name */}
                <div className="flex items-center justify-between py-2 border-b border-[#23232f]">
                  <span className="text-xs text-neutral-400 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#e2be6d]" />
                    Bank
                  </span>
                  <span className="text-sm font-bold text-white">
                    {BANK_DETAILS.bankName}
                  </span>
                </div>

                {/* Account Number with 1-click Copy */}
                <div className="flex items-center justify-between py-2 border-b border-[#23232f]">
                  <span className="text-xs text-neutral-400">
                    Account Number
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-mono font-bold text-white tracking-wider text-[#f3e5ab]">
                      {BANK_DETAILS.accountNumber}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAccountNumber}
                      className="px-2.5 py-1.5 rounded-lg bg-[#22222e] hover:bg-[#2b2b3a] border border-[#373748] text-xs font-medium text-neutral-200 flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Copy account number"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#e2be6d]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Account Name */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-neutral-400">
                    Account Name
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {BANK_DETAILS.accountName}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleSendWhatsAppOrder}
                className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
              >
                <span>Confirm & Send Proof of Payment via WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep('details')}
                  className="px-4 py-2.5 rounded-lg bg-[#181822] border border-[#2b2b38] text-neutral-300 hover:text-white text-xs font-medium transition-colors"
                >
                  Edit Details
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOrderCompleted();
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-lg bg-[#1f1f2a] border border-[#38384a] text-[#e2be6d] hover:bg-[#282836] text-xs font-semibold transition-colors"
                >
                  Done / Close
                </button>
              </div>
            </div>

            {/* Contact callout */}
            <div className="pt-2 text-center text-xs text-neutral-400">
              Need immediate assistance? Call or WhatsApp us at{' '}
              <a href={`tel:${CONTACT_INFO.phone}`} className="text-[#e2be6d] font-semibold hover:underline">
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
