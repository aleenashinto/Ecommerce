import React, { useState } from 'react';
import { products } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export const TrendingSection = () => {
  const tabs = ['All', 'Electronics', 'Fashion', 'Audio', 'Home', 'Beauty', 'Gaming', 'Accessories'];
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? products.slice(0, 8)
    : products.filter(p => p.category.toLowerCase() === activeTab.toLowerCase()).slice(0, 8);

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
              Most Coveted
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Trending Now
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white text-neutral-950 shadow-lg shadow-white/10'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Animated Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
