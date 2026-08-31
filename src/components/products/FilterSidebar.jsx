import React from 'react';
import { RotateCcw, Filter, Star, Check } from 'lucide-react';

export const FilterSidebar = ({
  categories = [],
  selectedCategory = 'all',
  onSelectCategory = () => {},
  selectedPriceRange,
  priceRange,
  onSelectPriceRange,
  onPriceChange,
  selectedRating = 0,
  onSelectRating = () => {},
  inStockOnly = false,
  onToggleInStock = () => {},
  onClearAll,
  onResetFilters,
  activeFiltersCount = 0
}) => {
  const currentPriceRange = selectedPriceRange || priceRange || { min: 0, max: 99999 };
  const handlePriceSelect = onSelectPriceRange || onPriceChange || (() => {});
  const handleClear = onClearAll || onResetFilters || (() => {});

  const priceRanges = [
    { label: 'All Prices', min: 0, max: 99999 },
    { label: 'Under $100', min: 0, max: 100 },
    { label: '$100 – $250', min: 100, max: 250 },
    { label: '$250 – $500', min: 250, max: 500 },
    { label: '$500+', min: 500, max: 99999 }
  ];

  const ratingOptions = [
    { label: '4.8★ & above', value: 4.8 },
    { label: '4.5★ & above', value: 4.5 },
    { label: '4.0★ & above', value: 4.0 }
  ];

  return (
    <div className="flex flex-col gap-6 p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-xl">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-purple-400" />
          <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </h3>
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={handleClear}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
          >
            <RotateCcw size={12} /> Clear All
          </button>
        )}
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
          Categories
        </h4>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => onSelectCategory('all')}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
              selectedCategory === 'all'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[11px] text-neutral-600">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
          Price Range
        </h4>
        <div className="flex flex-col gap-1.5">
          {priceRanges.map((range, index) => {
            const isSelected = currentPriceRange.min === range.min && currentPriceRange.max === range.max;
            return (
              <button
                key={index}
                onClick={() => handlePriceSelect(range)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <span>{range.label}</span>
                {isSelected && <Check size={13} className="text-purple-400" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
          Rating
        </h4>
        <div className="flex flex-col gap-1.5">
          {ratingOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSelectRating(selectedRating === opt.value ? 0 : opt.value)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                selectedRating === opt.value
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>{opt.label}</span>
              </div>
              {selectedRating === opt.value && <Check size={13} className="text-purple-400" />}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-800">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-medium text-neutral-300">In Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-purple-600 focus:ring-purple-500"
          />
        </label>
      </div>
    </div>
  );
};
