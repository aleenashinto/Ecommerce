import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useToastStore } from '../../store/useToastStore';
import { useQuickViewStore } from '../../store/useQuickViewStore';

export const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const addToast = useToastStore((state) => state.addToast);
  const openQuickView = useQuickViewStore((state) => state.openQuickView);

  const isLiked = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (added) {
      addToast(`Added ${product.name} to wishlist`, 'heart');
    } else {
      addToast(`Removed from wishlist`, 'info');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`Added ${product.name} to cart`, 'success');
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col rounded-3xl bg-neutral-900/60 dark:bg-neutral-900/60 border border-neutral-800/80 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-950/20 overflow-hidden"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-950/80">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        </Link>

        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <Badge>{product.badge}</Badge>
          )}
          {product.discount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white tracking-wider uppercase shadow-md shadow-rose-950/50">
              -{product.discount}%
            </span>
          )}
        </div>

        <button
          onClick={handleWishlist}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
            isLiked 
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40' 
              : 'bg-neutral-950/70 text-neutral-300 hover:text-white hover:bg-neutral-900/90 backdrop-blur-md border border-white/10'
          }`}
        >
          <Heart size={16} className={isLiked ? "fill-white" : ""} />
        </button>

        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickView}
            className="w-full py-2.5 px-4 rounded-2xl bg-neutral-950/90 hover:bg-purple-600 text-white text-xs font-semibold backdrop-blur-xl border border-white/15 flex items-center justify-center gap-2 shadow-xl transition-colors"
          >
            <Eye size={14} /> Quick View
          </button>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
            <span>{product.category}</span>
            {product.stock <= 10 && (
              <span className="text-amber-400/90 text-[10px] lowercase font-medium">
                only {product.stock} left
              </span>
            )}
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-heading text-sm sm:text-base font-semibold text-neutral-100 group-hover:text-purple-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="mt-1.5">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-lg font-bold text-white">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-neutral-200 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 group/btn shadow-md hover:shadow-purple-500/25"
          >
            <Plus size={18} className="group-hover/btn:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};
