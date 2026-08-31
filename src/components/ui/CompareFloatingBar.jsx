import React from 'react';
import { Link } from 'react-router-dom';
import { useCompareStore } from '../../store/useCompareStore';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CompareFloatingBar = () => {
  const { items, removeFromCompare, clearCompare } = useCompareStore();

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl bg-neutral-900/95 border border-purple-500/30 rounded-3xl p-3 sm:p-4 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
          <div className="hidden sm:flex items-center gap-2 font-heading text-xs font-bold text-white shrink-0 pr-2 border-r border-neutral-800">
            <Sparkles size={15} className="text-purple-400" />
            Compare ({items.length}/4)
          </div>

          <div className="flex items-center gap-2">
            {items.map(product => (
              <div key={product.id} className="relative group shrink-0">
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-xl object-cover border border-neutral-700" />
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-700 flex items-center justify-center text-[10px]"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/compare"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg flex items-center gap-1.5"
          >
            Compare Now <ArrowRight size={13} />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
