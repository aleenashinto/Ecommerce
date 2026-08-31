import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import { useToastStore } from '../store/useToastStore';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { StarRating } from '../components/ui/StarRating';

export const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    addToast(`Moved ${product.name} to cart`, 'success');
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-800 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-1.5">
              Saved Collection
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              My Wishlist
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              {items.length} saved luxury piece{items.length === 1 ? '' : 's'}
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-neutral-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 size={14} /> Clear Wishlist
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/40 transition-all overflow-hidden"
              >
                <div className="relative aspect-square w-full bg-neutral-950">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-neutral-950/80 text-neutral-400 hover:text-rose-400 flex items-center justify-center border border-white/10"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-1">
                      {product.category}
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-heading text-sm font-semibold text-neutral-100 group-hover:text-purple-300 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mt-1">
                      <StarRating rating={product.rating} reviews={product.reviews} />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                    <span className="font-heading text-base font-bold text-white">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag size={13} /> Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center rounded-3xl bg-neutral-900/30 border border-neutral-800 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
              <Heart size={28} />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mb-6">
              Save your favorite luxury pieces, acoustic staging devices, and accessories for later.
            </p>
            <Link
              to="/shop"
              className="px-8 py-3 rounded-full bg-white text-neutral-950 hover:bg-purple-400 font-bold text-xs transition-colors flex items-center gap-2"
            >
              Start Exploring <ArrowRight size={14} />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
