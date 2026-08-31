import React, { useState } from 'react';
import { testimonials } from '../../data/testimonials';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-14 rounded-[36px] bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 relative">
          
          <div className="flex items-center justify-between mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-purple-400 flex items-center gap-2">
              <Quote size={18} /> Verified Client Stories
            </div>
            
            {/* Carousel Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Next review"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8">
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="font-heading text-xl sm:text-2xl lg:text-3xl text-white font-medium leading-snug mb-6">
                  "{current.comment}"
                </blockquote>

                <div className="text-xs text-purple-300 font-semibold mb-1">
                  Purchased: {current.product}
                </div>
              </div>

              <div className="lg:col-span-4 flex items-center gap-4 lg:justify-end border-t lg:border-t-0 lg:border-l border-neutral-800 pt-6 lg:pt-0 lg:pl-8">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500/30"
                />
                <div>
                  <div className="font-heading text-base font-bold text-white flex items-center gap-1.5">
                    {current.name}
                    {current.verified && (
                      <CheckCircle2 size={15} className="text-emerald-400" title="Verified Purchase" />
                    )}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {current.role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-8 bg-purple-400' : 'w-2 bg-neutral-800'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
