import React from 'react';
import { Link } from 'react-router-dom';
import { useCompareStore } from '../store/useCompareStore';
import { useCartStore } from '../store/useCartStore';
import { useToastStore } from '../store/useToastStore';
import { Sparkles, Trash2, ShoppingBag, ArrowRight, Check, X } from 'lucide-react';

export const Compare = () => {
  const { items, removeFromCompare, clearCompare } = useCompareStore();
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useToastStore((state) => state.addToast);

  if (items.length === 0) {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4">
          <Sparkles size={28} />
        </div>
        <h2 className="font-heading text-2xl font-bold text-white mb-2">Comparison Matrix Empty</h2>
        <p className="text-xs text-neutral-400 mb-6">Select up to 4 luxury products to compare technical specifications side-by-side.</p>
        <Link to="/shop" className="px-8 py-3 rounded-full bg-white text-neutral-950 font-bold text-xs">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
          <div>
            <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Technical Benchmarking</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
              Side-by-Side Product Comparison
            </h1>
          </div>
          <button
            onClick={clearCompare}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold border border-neutral-800 transition-colors"
          >
            Clear All ({items.length})
          </button>
        </div>

        <div className="overflow-x-auto rounded-3xl bg-neutral-900/60 border border-neutral-800 shadow-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="p-5 w-48 text-neutral-500 font-semibold uppercase tracking-wider text-[10px] bg-neutral-950/60">Specification</th>
                {items.map(product => (
                  <th key={product.id} className="p-5 min-w-[240px] align-top bg-neutral-950/40">
                    <div className="space-y-3">
                      <div className="relative group">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-2xl bg-neutral-900" />
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-neutral-950/80 text-neutral-400 hover:text-rose-400 backdrop-blur-md"
                          title="Remove"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div>
                        <div className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">{product.category}</div>
                        <h3 className="font-heading text-sm font-bold text-white line-clamp-1">{product.name}</h3>
                        <div className="font-mono text-base font-bold text-purple-300 mt-1">${product.price}</div>
                      </div>

                      <button
                        onClick={() => {
                          addItem(product);
                          addToast(`Added ${product.name} to cart!`, 'success');
                        }}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <ShoppingBag size={13} /> Add to Cart
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              <tr>
                <td className="p-4 font-semibold text-neutral-400 bg-neutral-950/40">Star Rating</td>
                {items.map(p => (
                  <td key={p.id} className="p-4 font-bold text-amber-400">? {p.rating} ({p.reviewsCount} reviews)</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-400 bg-neutral-950/40">Availability</td>
                {items.map(p => (
                  <td key={p.id} className="p-4 text-emerald-400 font-semibold">In Stock ({p.stockCount || 25} units)</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-400 bg-neutral-950/40">Key Features</td>
                {items.map(p => (
                  <td key={p.id} className="p-4 space-y-1">
                    {p.features?.map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px]">
                        <Check size={12} className="text-purple-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-400 bg-neutral-950/40">Warranty</td>
                {items.map(p => (
                  <td key={p.id} className="p-4">2-Year International Aura Care</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
