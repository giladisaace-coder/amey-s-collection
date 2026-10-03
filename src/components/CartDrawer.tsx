import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="w-full max-w-md bg-[#111116] border-l border-[#262633] h-full flex flex-col justify-between shadow-2xl animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#23232f] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#e2be6d]" />
            <h2 className="text-lg font-serif font-bold text-white">Your Shopping Bag</h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-[#1c1c24] text-neutral-300 border border-[#2d2d3a]">
              {items.reduce((acc, it) => acc + it.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1a1a24] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content: Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-[#181822] border border-[#292938] flex items-center justify-center text-[#e2be6d] mb-4">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <p className="text-base font-serif font-semibold text-white mb-2">
                Your bag is empty
              </p>
              <p className="text-xs text-neutral-400 mb-6 max-w-xs">
                Explore our fine jewelry collection, stylish ladies wear, and designer accessories.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg bg-[#1f1f2a] border border-[#333346] text-[#e2be6d] hover:bg-[#282836] font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3.5 rounded-xl bg-[#16161e] border border-[#242430] items-center"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-[#1a1a22] overflow-hidden shrink-0 border border-[#2d2d3a]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-serif font-semibold text-white truncate mb-1">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-neutral-300 mb-2">
                    <span className="text-[#e2be6d] font-bold">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                    <span className="text-neutral-500">
                      (₦{item.product.price.toLocaleString()} each)
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#2d2d3a] rounded-md bg-[#121218]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-neutral-300 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-neutral-300 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors ml-auto"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Subtotal & Proceed Button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#23232f] bg-[#0e0e13] space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums font-semibold text-neutral-200">
                  ₦{totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Payment Method</span>
                <span className="text-neutral-300 font-medium">
                  Bank Transfer (Moniepoint)
                </span>
              </div>
              <div className="pt-2 border-t border-[#20202a] flex items-center justify-between text-base font-serif font-bold text-white">
                <span>Total Amount</span>
                <span className="text-xl font-mono tabular-nums text-gold-gradient">
                  ₦{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-4 px-6 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg gold-glow cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e2be6d]" />
              <span>Terms acceptance & bank details displayed next</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
