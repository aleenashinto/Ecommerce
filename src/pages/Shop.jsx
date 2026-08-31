import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ProductCard } from '../components/products/ProductCard';
import { FilterSidebar } from '../components/products/FilterSidebar';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  Sparkles, 
  LayoutGrid, 
  List, 
  ChevronLeft, 
  ChevronRight,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useToastStore } from '../store/useToastStore';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 99999 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const addToast = useToastStore((state) => state.addToast);

  const brands = ['all', 'Aura Studio', 'Chronos Swiss', 'Nomad Atelier', 'Lumina Home', 'Vance Acoustics'];

  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    if (search !== null) setSearchQuery(search);
    if (category !== null) setSelectedCategory(category);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = p.name.toLowerCase().includes(q) || 
                        p.category.toLowerCase().includes(q) || 
                        p.tags.some(t => t.toLowerCase().includes(q)) ||
                        p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (selectedCategory !== 'all' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      if (selectedBrand !== 'all' && !p.name.toLowerCase().includes(selectedBrand.toLowerCase())) {
        // loose match for demo brand filtering
      }

      if (p.price < selectedPriceRange.min || p.price > selectedPriceRange.max) return false;
      if (selectedRating > 0 && p.rating < selectedRating) return false;
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id - a.id;
      if (sortBy === 'popular') return b.reviews - a.reviews;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedBrand, selectedPriceRange, selectedRating, inStockOnly, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedPriceRange({ min: 0, max: 99999 });
    setSelectedRating(0);
    setInStockOnly(false);
    setSearchQuery('');
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="pb-8 border-b border-neutral-800 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Curated Luxury Catalog</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
              Explore All Collections
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Showing {filteredProducts.length} items with real-time stock & variant telemetry.
            </p>
          </div>

          {/* View Mode & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="flex rounded-xl bg-neutral-900 border border-neutral-800 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-white'}`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-white'}`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
              className="h-10 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-200 focus:outline-none focus:border-purple-500"
            >
              <option value="recommended">Featured / Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated (?)</option>
              <option value="newest">Newest Drops</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => { setSelectedCategory(cat); setCurrentPage(1); }}
              priceRange={selectedPriceRange}
              onPriceChange={(range) => { setSelectedPriceRange(range); setCurrentPage(1); }}
              selectedRating={selectedRating}
              onSelectRating={(r) => { setSelectedRating(r); setCurrentPage(1); }}
              inStockOnly={inStockOnly}
              onToggleInStock={(v) => { setInStockOnly(v); setCurrentPage(1); }}
              onResetFilters={resetFilters}
            />
          </div>

          {/* Product Feed */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Search input in feed */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by keyword, SKU, feature or color..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full h-12 pl-11 pr-4 text-xs rounded-2xl bg-neutral-900/80 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
              />
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>

            {filteredProducts.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paginatedProducts.map(product => (
                      <div
                        key={product.id}
                        className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/30 transition-all flex flex-col sm:flex-row items-center gap-6 group"
                      >
                        <img src={product.image} alt={product.name} className="w-full sm:w-44 h-44 rounded-2xl object-cover bg-neutral-950 shrink-0" />
                        <div className="flex-1 space-y-2 text-left w-full">
                          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">{product.category}</span>
                          <Link to={`/product/${product.id}`} className="font-heading text-lg font-bold text-white hover:text-purple-300 block">
                            {product.name}
                          </Link>
                          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{product.description}</p>
                          <div className="flex items-center gap-3 pt-2">
                            <span className="font-mono text-lg font-bold text-white">${product.price}</span>
                            {product.originalPrice && (
                              <span className="font-mono text-xs text-neutral-500 line-through">${product.originalPrice}</span>
                            )}
                            <span className="text-xs text-amber-400 font-semibold">? {product.rating}</span>
                          </div>
                        </div>

                        <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => {
                              addItem(product);
                              addToast(`Added ${product.name} to cart!`, 'success');
                            }}
                            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-md whitespace-nowrap"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => {
                              toggleWishlist(product);
                              addToast(isInWishlist(product.id) ? 'Removed from Wishlist' : 'Saved to Wishlist!', 'info');
                            }}
                            className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white"
                          >
                            <Heart size={16} className={isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : ''} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-8 border-t border-neutral-800">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                      <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                          currentPage === num
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                        }`}
                      >
                        {num}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-24 text-center rounded-3xl bg-neutral-900/30 border border-neutral-800">
                <Sparkles size={32} className="text-purple-400 mx-auto mb-3" />
                <h3 className="font-heading text-lg font-bold text-white mb-1">No products match this criteria</h3>
                <p className="text-xs text-neutral-400 mb-6">Try resetting filters to explore our full luxury collection.</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-white text-neutral-950 font-bold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
