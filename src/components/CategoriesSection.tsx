import React from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { ProductCategory } from '../types';
import { Gem, Sparkles, Glasses, Flame, Disc, ShoppingBag, ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (category: ProductCategory) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Jewelry: <Gem className="w-5 h-5 text-[#e2be6d]" />,
  'Ladies Wear': <Sparkles className="w-5 h-5 text-[#e2be6d]" />,
  Sunglasses: <Glasses className="w-5 h-5 text-[#e2be6d]" />,
  Perfume: <Flame className="w-5 h-5 text-[#e2be6d]" />,
  Handbags: <ShoppingBag className="w-5 h-5 text-[#e2be6d]" />,
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (categoryName: string) => {
    onSelectCategory(categoryName as ProductCategory);
    const shopElement = document.getElementById('shop');
    if (shopElement) {
      shopElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-20 bg-[#0e0e13] border-t border-b border-[#1f1f28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#e2be6d] font-semibold mb-3">
            Strictly Categorized Catalog
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Curated Lines & Official Offerings
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Deals on <span className="text-neutral-200 font-medium">Jewelry & Hairpins</span>, <span className="text-neutral-200 font-medium">Ladies Wear</span>, <span className="text-neutral-200 font-medium">Designer Glasses</span>, <span className="text-neutral-200 font-medium">Prestige Perfumes</span>, and <span className="text-neutral-200 font-medium">Handbags</span>.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative p-7 rounded-2xl bg-[#14141c] border border-[#252535] hover:border-[#c5a059]/60 hover:bg-[#181824] transition-all duration-300 flex flex-col justify-between cursor-pointer gold-glow hover:translate-y-[-2px]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-[#1d1d29] border border-[#303042] group-hover:border-[#c5a059]/40 transition-colors">
                    {CATEGORY_ICONS[cat.name] || <Sparkles className="w-5 h-5 text-[#e2be6d]" />}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    {cat.count}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-semibold text-white mb-2 group-hover:text-[#e2be6d] transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs font-semibold text-[#e2be6d] mb-2 tracking-wide">
                  {cat.deal}
                </p>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 group-hover:text-white group-hover:translate-x-1 transition-all">
                <span>View {cat.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#e2be6d]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
