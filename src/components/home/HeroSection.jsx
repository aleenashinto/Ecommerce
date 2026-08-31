import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, Users, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[560px]">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start text-left z-10">
            
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <Sparkles size={13} className="text-purple-400 animate-pulse" />
              <span>PREMIUM COLLECTION 2026</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6"
            >
              Upgrade Your <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 text-glow-purple">
                Everyday.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed mb-8"
            >
              Curated technology, precision horology, and designer lifestyle essentials sculpted for discerning modern living.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-purple-950/60 flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-102"
              >
                Shop Collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/shop?filter=new"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-sm border border-neutral-700/80 backdrop-blur-xl flex items-center justify-center transition-all duration-300"
              >
                Explore New Arrivals
              </Link>
            </motion.div>

            {/* Trust highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-6 w-full max-w-lg"
            >
              <div>
                <div className="font-heading text-xl sm:text-2xl font-bold text-white">4.9/5</div>
                <div className="text-xs text-neutral-400">Customer Rating</div>
              </div>
              <div>
                <div className="font-heading text-xl sm:text-2xl font-bold text-white">12K+</div>
                <div className="text-xs text-neutral-400">Happy Clients</div>
              </div>
              <div>
                <div className="font-heading text-xl sm:text-2xl font-bold text-white">Free</div>
                <div className="text-xs text-neutral-400">Express Delivery</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Product Visual with Floating Dynamic Metric Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient circular frame */}
            <div className="relative w-full max-w-md aspect-square rounded-[40px] bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-transparent p-1 shadow-2xl">
              <div className="w-full h-full rounded-[38px] overflow-hidden bg-neutral-900/90 relative group">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85"
                  alt="Aura Studio Master Wireless Headphones"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-neutral-950/80 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold">Featured Drop</div>
                    <div className="font-heading text-sm font-bold text-white">Aura Studio Master ANC</div>
                  </div>
                  <span className="font-heading text-base font-bold text-purple-300">$349</span>
                </div>
              </div>
            </div>

            {/* Floating Card 1: Customer Rating */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 sm:-left-8 p-3.5 rounded-2xl bg-neutral-900/90 border border-purple-500/30 shadow-2xl backdrop-blur-xl flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Star size={20} className="fill-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-heading text-sm font-bold text-white">4.9 / 5</span>
                </div>
                <div className="text-[10px] text-neutral-400 font-medium">Customer Rating</div>
              </div>
            </motion.div>

            {/* Floating Card 2: 12K+ Happy Customers */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -right-4 sm:-right-8 p-3.5 rounded-2xl bg-neutral-900/90 border border-indigo-500/30 shadow-2xl backdrop-blur-xl flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Users size={18} />
              </div>
              <div>
                <div className="font-heading text-sm font-bold text-white">12,000+</div>
                <div className="text-[10px] text-neutral-400 font-medium">Global Buyers</div>
              </div>
            </motion.div>

            {/* Floating Card 3: Free Shipping */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 left-6 p-3 rounded-2xl bg-neutral-900/90 border border-emerald-500/30 shadow-2xl backdrop-blur-xl flex items-center gap-2.5 z-20"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Truck size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Free Express Shipping</div>
                <div className="text-[10px] text-neutral-400">On all orders $50+</div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
