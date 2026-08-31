import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';

export const CartDrawer = () => {
  const { 
    items, 
    isDrawerOpen, 
    closeDrawer, 
    updateQuantity, 
    removeFromCart, 
    getTotals,
    promoCode,
    discountPercent,
    promoError,
    promoSuccess,
    applyPromoCode,
    removePromoCode
  } = useCartStore();

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  const { subtotal, discountAmount, shipping, tax, total, totalCount } = getTotals();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-neutral-900 border-l border-purple-500/20 shadow-2xl flex flex-col h-full z-10"
          >
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-purple-400" />
                <h3 className="font-heading text-lg font-bold text-white">
                  Your Cart
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={closeDrawer}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close cart drawer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor}`}
                    className="flex gap-4 p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 hover:border-purple-500/30 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-18 h-18 rounded-xl object-cover bg-neutral-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${item.id}`}
                            onClick={closeDrawer}
                            className="font-heading text-xs sm:text-sm font-semibold text-neutral-200 hover:text-purple-300 truncate block"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedColor)}
                            className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <p className="text-[11px] text-neutral-500">
                          {item.selectedColor}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-heading text-sm font-bold text-white">
                          ${item.price}
                        </span>

                        <div className="flex items-center rounded-xl bg-neutral-900 border border-neutral-800 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-neutral-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                    <ShoppingBag size={28} />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-white mb-1">
                    Your cart is empty
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-xs mb-6">
                    Discover something you'll love from our curated technology and luxury collection.
                  </p>
                  <button
                    onClick={() => {
                      closeDrawer();
                      navigate('/shop');
                    }}
                    className="py-2.5 px-6 rounded-full bg-white text-neutral-950 hover:bg-purple-400 font-bold text-xs transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 bg-neutral-950 border-t border-neutral-800 flex flex-col gap-4">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. AURA20)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 h-9 px-3 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {promoSuccess && (
                  <div className="text-[11px] text-emerald-400 flex items-center justify-between">
                    <span>{promoSuccess}</span>
                    <button onClick={removePromoCode} className="text-neutral-500 hover:text-white underline">Remove</button>
                  </div>
                )}
                {promoError && (
                  <div className="text-[11px] text-rose-400">{promoError}</div>
                )}

                <div className="flex flex-col gap-1.5 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({discountPercent * 100}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{shipping === 0 ? <span className="text-emerald-400 font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-white font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
                    <span>Total</span>
                    <span className="font-heading text-lg text-purple-300">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-purple-950/50 flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>Secure 256-Bit Encrypted Client Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
