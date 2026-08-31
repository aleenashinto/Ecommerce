import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '../../store/useToastStore';
import { CheckCircle2, Heart, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-neutral-900/95 dark:bg-neutral-900/95 border border-purple-500/20 text-neutral-100 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              {toast.type === 'heart' ? (
                <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                  <Heart size={16} className="fill-rose-400" />
                </div>
              ) : toast.type === 'info' ? (
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Info size={16} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} />
                </div>
              )}
              <p className="text-sm font-medium text-neutral-200 leading-snug">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-white transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
