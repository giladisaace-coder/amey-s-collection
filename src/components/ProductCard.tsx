import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, Check, Sparkles, MessageCircle, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isPriceOnRequest) {
      handlePerfumeInquiry(e);
      return;
    }
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const handlePerfumeInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      product.whatsappInquiryText ||
      `Hello Amey's Collectionz! I would like to inquire about the price and availability of "${product.name}". Please share the price and delivery details!`
    );
    window.open(`https://wa.me/2348132334450?text=${message}`, '_blank');
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#131319] border border-[#22222e] hover:border-[#c5a059]/50 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-black/70 flex-grow"
    >
      {/* Product Image Frame without distortion */}
      <div className="relative aspect-square w-full bg-[#181822] overflow-hidden flex items-center justify-center p-2">
        {!imageFailed ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageFailed(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#15151e] p-4 text-center">
            <Sparkles className="w-8 h-8 text-[#e2be6d] mb-2" />
            <p className="text-xs text-neutral-400 font-medium">{product.name}</p>
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute top-3 right-3 p-2 rounded-xl bg-[#0e0e13]/85 backdrop-blur-md text-neutral-300 hover:text-white border border-[#2b2b3a] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="Quick View"
          aria-label="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Category & Status */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
            <span className="uppercase tracking-wider font-semibold text-[#c5a059]">
              {product.category}
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className={product.stockStatus === 'Limited Stock' ? 'text-amber-400 font-medium' : 'text-neutral-400'}>
              {product.stockStatus || 'In Stock'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-serif font-semibold text-white group-hover:text-[#e2be6d] transition-colors line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Area */}
        <div className="pt-3 border-t border-[#1f1f2a] flex items-center justify-between gap-3">
          <div>
            {product.isPriceOnRequest ? (
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                  Price on Request
                </span>
                <span className="text-[11px] text-neutral-500">
                  Inquire via WhatsApp
                </span>
              </div>
            ) : (
              <div>
                <div className="text-base font-bold text-white font-mono tabular-nums text-gold-gradient">
                  {product.formattedPrice}
                </div>
                <div className="text-[11px] text-neutral-500">
                  Bank Transfer
                </div>
              </div>
            )}
          </div>

          {/* Action Button: Inquire for Perfume, Add to Bag for others */}
          {product.isPriceOnRequest ? (
            <button
              onClick={handlePerfumeInquiry}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/90 hover:text-white cursor-pointer"
              title="Inquire price on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ask Price</span>
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#1e1e28] text-neutral-200 hover:text-black hover:bg-gold-gradient border border-[#2f2f3e] hover:border-transparent'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#e2be6d] group-hover:text-black" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
