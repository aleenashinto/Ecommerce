import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing Aura Ring */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 180, 360], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-8 rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-pink-500/30 blur-2xl pointer-events-none"
        />

        {/* Logo Mark */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-800 p-0.5 shadow-2xl flex items-center justify-center mb-6"
        >
          <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="text-purple-400 animate-pulse" size={28} />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading text-3xl font-bold tracking-tight text-white flex items-center gap-1.5"
        >
          Aura<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Store</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs uppercase tracking-[0.3em] text-neutral-400 mt-2 font-medium"
        >
          Discover. Choose. Experience.
        </motion.p>

        {/* Subtle Progress Bar */}
        <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden mt-8">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-pink-500"
          />
        </div>
      </div>
    </motion.div>
  );
};
