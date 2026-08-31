import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuickViewStore } from '../../store/useQuickViewStore';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useToastStore } from '../../store/useToastStore';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';

export const QuickViewModal = () => {
  const { product, isOpen, closeQuickView } = useQuickViewStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const addToast = useToastStore((state) => state.addToast);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : 'Standard');
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeQuickView();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeQuickView]);

  if (!isOpen || !product) return null;

  const isLiked = isInWishlist(product.id);
  const gallery = product.gallery || [product.image];

  const handleAdd = () => {
    addToCart(product, quantity, selectedColor);
    addToast(`Added ${quantity}x ${product.name} to cart`, 'success');
    closeQuickView();
  };

  const handleViewFull = () => {
    closeQuickView();
    navigate(`/product/${product.id}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-neutral-900 border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 my-8"
        >
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-neutral-950 p-6 flex flex-col gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <img
                  src={gallery[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <Badge>{product.badge}</Badge>
                  </div>
                )}
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === i ? 'border-purple-500 scale-95' : 'border-neutral-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1.5">
                  {product.category}
                </div>

                <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
                  {product.name}
                </h2>

                <div className="flex items-center gap-3 mb-4">
                  <StarRating rating={product.rating} reviews={product.reviews} />
                  <span className="text-neutral-600">�</span>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <Check size={12} /> In Stock ({product.stock})
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-white">
                    ${product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-neutral-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="text-xs font-bold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded-full border border-rose-500/20">
                      Save {product.discount}%
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                  {product.description}
                </p>

                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                      Color Finish: <span className="text-purple-400">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            selectedColor === c
                              ? 'bg-purple-500/20 border-purple-500 text-white'
                              : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center rounded-2xl bg-neutral-950 border border-neutral-800 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <ShoppingBag size={16} /> Add to Cart � ${product.price * quantity}
                  </button>

                  <button
                    onClick={() => {
                      toggleWishlist(product);
                      addToast(isLiked ? 'Removed from wishlist' : 'Added to wishlist', isLiked ? 'info' : 'heart');
                    }}
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                      isLiked 
                        ? 'bg-rose-500 border-rose-500 text-white' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Heart size={18} className={isLiked ? "fill-white" : ""} />
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><Truck size={13} className="text-purple-400" /> Free Dispatch</span>
                  <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-emerald-400" /> 2-Yr Warranty</span>
                </div>
                <button
                  onClick={handleViewFull}
                  className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 hover:underline"
                >
                  Full Specs <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
