/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TermsModal } from './components/TermsModal';
import { SocialsSection } from './components/SocialsSection';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { PRODUCTS, SOCIAL_LINKS } from './data/products';
import { Product, CartItem, ProductCategory } from './types';
import { Search, Sparkles, Filter, CheckCircle2, MessageCircle } from 'lucide-react';

export default function App() {
  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ameys_collectionz_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ameys_collectionz_cart', JSON.stringify(cartItems));
    } catch {
      // storage unavailable
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    if (product.isPriceOnRequest) {
      // Perfumes are priced on request via WhatsApp as requested
      const message = encodeURIComponent(
        product.whatsappInquiryText ||
        `Hello Amey's Collectionz! I would like to inquire about the price and availability of "${product.name}". Please let me know the price!`
      );
      window.open(`https://wa.me/2348132334450?text=${message}`, '_blank');
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your bag.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const categoriesList: ProductCategory[] = [
    'All',
    'Jewelry',
    'Sunglasses',
    'Handbags',
    'Ladies Wear',
    'Perfume',
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#ededed] flex flex-col font-sans selection:bg-[#c5a059]/30 selection:text-[#f3e5ab]">
      {/* Top Banner */}
      <div className="bg-[#121219] border-b border-[#22222f] py-2 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
          <span className="text-[#e2be6d] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Amey's Collectionz — Authentic Luxury Jewelry, Sunglasses, Handbags & Perfumes
          </span>
          <span className="hidden sm:inline text-neutral-600">·</span>
          <a
            href={SOCIAL_LINKS.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Join WhatsApp VIP Group</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Hero / Startup Screen */}
      <Hero
        onExploreClick={() => {
          const shopElement = document.getElementById('shop');
          if (shopElement) {
            shopElement.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Strict Categories Section */}
      <CategoriesSection
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
        }}
      />

      {/* Product Grid Section */}
      <main id="shop" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#20202a]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e2be6d] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              {activeCategory === 'All' ? 'Our Curated Collection' : `${activeCategory} Collection`}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Authentic hand-picked pieces. Bank transfer payment via Moniepoint with direct order dispatch.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pieces, styles, scents..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#14141c] border border-[#262635] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a059]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-black font-bold shadow-md gold-glow'
                  : 'bg-[#15151e] text-neutral-300 hover:text-white hover:bg-[#1f1f2a] border border-[#252535]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(prod) => handleAddToCart(prod, 1)}
                onQuickView={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#121218] rounded-2xl border border-[#23232e] p-8">
            <Filter className="w-12 h-12 text-[#c5a059]/40 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-semibold text-white mb-2">
              No products found
            </h3>
            <p className="text-xs text-neutral-400 mb-6 max-w-sm mx-auto">
              We couldn't find any pieces matching "{searchQuery}". Try searching for another item or resetting the filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Socials & QR Codes Section */}
      <SocialsSection />

      {/* VIP Community Section */}
      <CommunitySection />

      {/* Footer */}
      <Footer
        onOpenTerms={() => setIsTermsOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const shop = document.getElementById('shop');
          if (shop) shop.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#1a1a26] border border-[#c5a059]/60 text-white text-xs shadow-2xl gold-glow animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#e2be6d] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Product Quick-View Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={handleClearCart}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      {/* Terms and Conditions Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
    </div>
  );
}
