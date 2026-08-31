import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = localStorage.getItem('aurastore_announcement_dismissed');
    if (isDismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('aurastore_announcement_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-r from-neutral-950 via-purple-950/80 to-neutral-950 border-b border-purple-500/20 text-neutral-200 text-xs py-2 px-4 overflow-hidden z-40"
        >
          {/* Subtle animated light highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-shimmer pointer-events-none" />

          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center justify-center gap-2 text-center">
              <span className="inline-flex items-center gap-1.5 font-medium tracking-wide">
                <Sparkles size={13} className="text-purple-400 animate-pulse" />
                <span className="text-purple-300 font-semibold">Summer Sale</span> � Up to 40% Off with code <span className="underline decoration-purple-400 font-mono font-bold text-white">AURA20</span> | Free Express Shipping Over $50
              </span>
            </div>

            <button
              onClick={handleDismiss}
              className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Dismiss banner"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
