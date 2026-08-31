import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase";
  
  const variants = {
    default: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    sale: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
    hot: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    new: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    gold: "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]",
    cyan: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
  };

  const getVariant = (text) => {
    if (!text) return variants.default;
    const lower = text.toLowerCase();
    if (lower.includes('sale') || lower.includes('discount')) return variants.sale;
    if (lower.includes('hot') || lower.includes('drop')) return variants.hot;
    if (lower.includes('new')) return variants.new;
    if (lower.includes('best') || lower.includes('limited') || lower.includes('edition')) return variants.gold;
    if (lower.includes('clean') || lower.includes('sustainable')) return variants.cyan;
    return variants[variant] || variants.default;
  };

  return (
    <span className={`${base} ${getVariant(typeof children === 'string' ? children : variant)} ${className}`}>
      {children}
    </span>
  );
};
