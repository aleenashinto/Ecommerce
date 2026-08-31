import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const PromoBanner = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative min-h-[460px] rounded-[36px] overflow-hidden bg-neutral-900 border border-purple-500/20 shadow-2xl flex items-center"
        >
          {/* Background Photography with gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85"
              alt="Technology That Moves With You"
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/40" />
          </div>

          {/* Banner Copy */}
          <div className="relative z-10 max-w-xl p-8 sm:p-14 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
              <Sparkles size={13} className="text-purple-400" /> Aura Intelligence Ecosystem
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Technology That Moves With You.
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8">
              Explore our newest curated collection of titanium wearables, lossless acoustic staging, and intelligent smart devices built for boundless momentum.
            </p>

            <Link
              to="/shop?filter=trending"
              className="px-8 py-4 rounded-full bg-white text-neutral-950 hover:bg-purple-300 font-bold text-sm flex items-center gap-2 shadow-2xl transition-all duration-300 group"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
