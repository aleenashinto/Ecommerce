import React, { useState } from "react";
import { useCartStore } from "../../store/useCartStore";
import { useToastStore } from "../../store/useToastStore";
import { Plus, Check, ShoppingBag, Sparkles } from "lucide-react";

export const FrequentlyBoughtTogether = ({ mainProduct, bundleProducts = [] }) => {
  const { addItem } = useCartStore();
  const addToast = useToastStore((state) => state.addToast);

  const allItems = [mainProduct, ...bundleProducts.slice(0, 2)];
  const [selectedIds, setSelectedIds] = useState(allItems.map(p => p.id));

  const toggleSelect = (id) => {
    if (id === mainProduct.id) return;
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedItems = allItems.filter(p => selectedIds.includes(p.id));
  const rawTotal = selectedItems.reduce((acc, p) => acc + p.price, 0);
  const bundleDiscount = selectedItems.length > 1 ? Math.round(rawTotal * 0.15) : 0;
  const bundleTotal = rawTotal - bundleDiscount;

  const handleAddBundle = () => {
    selectedItems.forEach(item => {
      addItem(item, 1, item.colors?.[0]?.name || "Standard");
    });
    addToast(`Added ${selectedItems.length} bundle items to bag (Saved $${bundleDiscount})!`, "success");
  };

  return (
    <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-neutral-900/90 via-neutral-900/60 to-purple-950/20 border border-purple-500/20 shadow-2xl mb-16 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
        <div>
          <span className="text-xs uppercase font-bold text-purple-400 flex items-center gap-1.5">
            <Sparkles size={14} /> AI Curated Ensemble
          </span>
          <h3 className="font-heading text-lg font-bold text-white">Frequently Bought Together</h3>
        </div>
        {bundleDiscount > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
            Bundle Savings: 15% OFF
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 flex flex-wrap items-center gap-4">
          {allItems.map((item, idx) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <React.Fragment key={item.id}>
                {idx > 0 && <Plus size={18} className="text-purple-400 shrink-0" />}
                <div
                  onClick={() => toggleSelect(item.id)}
                  className={`relative p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 bg-neutral-950/60 ${
                    isSelected ? "border-purple-500 ring-2 ring-purple-500/20" : "border-neutral-800 opacity-60"
                  }`}
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="text-xs space-y-0.5 max-w-[140px]">
                    <div className="font-bold text-white truncate">{item.name}</div>
                    <div className="font-mono text-purple-300 font-bold">${item.price}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    isSelected ? "bg-purple-600 border-purple-500 text-white" : "border-neutral-700 bg-neutral-900"
                  }`}>
                    {isSelected && <Check size={12} />}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="lg:col-span-4 p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-neutral-400">Total Bundle Price:</span>
            <div className="text-right">
              {bundleDiscount > 0 && (
                <span className="font-mono text-xs text-neutral-500 line-through mr-2">${rawTotal}</span>
              )}
              <span className="font-mono text-lg font-bold text-white">${bundleTotal}</span>
            </div>
          </div>
          <button
            onClick={handleAddBundle}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} /> Add Selected Bundle ({selectedItems.length})
          </button>
        </div>
      </div>
    </div>
  );
};