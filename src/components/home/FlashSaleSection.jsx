import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { useCountdown } from '../../hooks/useCountdown';

export const FlashSaleSection = () => {
  const { hours, minutes, seconds, milliseconds } = useCountdown(8, 42, 19);

  // Filter 4 top discounted products
  const flashProducts = products
    .filter(p => p.discount >= 18 || p.badge === 'Sale' || p.badge === 'Hot Drop')
    .slice(0, 4);

  const format2 = (n) => String(n).padStart(2, '0');

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[300px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-rose-500/20 shadow-2xl relative overflow-hidden mb-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Flame size={14} className="animate-pulse" /> Limited-Time Event
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Flash Sale Drops
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-md">
                Uncompromising luxury engineering at unprecedented introductory pricing.
              </p>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 sm:gap-3 bg-neutral-950/80 p-3 sm:p-4 rounded-2xl border border-neutral-800">
              <div className="flex flex-col items-center">
                <span className="font-heading text-xl sm:text-2xl font-bold text-white w-10 text-center">
                  {format2(hours)}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400">Hours</span>
              </div>
              <span className="text-rose-500 font-bold text-lg mb-3">:</span>

              <div className="flex flex-col items-center">
                <span className="font-heading text-xl sm:text-2xl font-bold text-white w-10 text-center">
                  {format2(minutes)}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400">Mins</span>
              </div>
              <span className="text-rose-500 font-bold text-lg mb-3">:</span>

              <div className="flex flex-col items-center">
                <span className="font-heading text-xl sm:text-2xl font-bold text-rose-400 w-10 text-center">
                  {format2(seconds)}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400">Secs</span>
              </div>
              <span className="text-rose-500 font-bold text-lg mb-3">:</span>

              <div className="flex flex-col items-center">
                <span className="font-heading text-xl sm:text-2xl font-bold text-purple-400 w-10 text-center">
                  {format2(milliseconds)}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400">Ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Flash Sale Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </section>
  );
};
