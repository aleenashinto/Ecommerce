import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categories } from '../../data/categories';
import { motion } from 'framer-motion';

export const CategorySection = () => {
  return (
    <section className="py-16 relative" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
              <Sparkles size={14} /> Curated Collections
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-neutral-400 hover:text-purple-300 flex items-center gap-1.5 group transition-colors"
          >
            Explore all categories <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden block bg-neutral-900 border border-neutral-800/80 hover:border-purple-500/50 shadow-lg hover:shadow-2xl hover:shadow-purple-950/25 transition-all duration-500"
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {cat.count} Products
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-purple-500 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
