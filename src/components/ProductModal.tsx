import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Check, ShieldCheck, Truck, Sparkles, MessageCircle, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    if (product.isPriceOnRequest) {
      handlePerfumeInquiry();
      return;
    }
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const handlePerfumeInquiry = () => {
    const message = encodeURIComponent(
      product.whatsappInquiryText ||
      `Hello Amey's Collectionz! I would like to inquire about the price and availability of "${product.name}". Please let me know the price and delivery options.`
    );
    window.open(`https://wa.me/2348132334450?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#121218] border border-[#2b2b3a] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#1b1b24]/90 text-neutral-300 hover:text-white hover:bg-[#262633] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Frame */}
        <div className="md:w-1/2 bg-[#171720] relative flex items-center justify-center p-6 min-h-[300px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[380px] object-contain object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Product Info & Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Category & Status */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
              <span className="uppercase tracking-wider font-semibold text-[#c5a059]">
                {product.category}
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-300">{product.stockStatus || 'In Stock'}</span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
              {product.name}
            </h2>

            {/* Price section */}
            <div className="mb-4">
              {product.isPriceOnRequest ? (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40">
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider block">
                    Price on Request
                  </span>
                  <span className="text-xs text-neutral-300">
                    Connect directly on WhatsApp to receive the current price and place your order.
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono tabular-nums text-gold-gradient">
                    {product.formattedPrice}
                  </span>
                  <span className="text-xs text-neutral-400">
                    per item
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Item Features */}
            {product.details && product.details.length > 0 && (
              <div className="mb-6 space-y-2">
                <p className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                  Product Details:
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {product.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <Sparkles className="w-3 h-3 text-[#e2be6d] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Module */}
          <div className="pt-5 border-t border-[#232330] space-y-4">
            {product.isPriceOnRequest ? (
              <button
                onClick={handlePerfumeInquiry}
                className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-950/50 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire Price on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-medium text-neutral-300">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-3 bg-[#181822] border border-[#2b2b3a] rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-neutral-300 hover:text-white rounded hover:bg-[#252532]"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-sm tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-neutral-300 hover:text-white rounded hover:bg-[#252532]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gold-gradient text-black hover:opacity-95 shadow-lg'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add {quantity} to Bag · ₦{(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </>
            )}

            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e2be6d]" />
                Moniepoint Bank Checkout
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#e2be6d]" />
                Fast Nationwide Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
