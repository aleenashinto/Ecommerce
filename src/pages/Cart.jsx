import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, Bookmark, BookmarkCheck } from 'lucide-react';
import { useToastStore } from '../store/useToastStore';

export const Cart = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotals,
    promoCode,
    discountPercent,
    promoError,
    promoSuccess,
    applyPromoCode,
    removePromoCode,
    addItem
  } = useCartStore();

  const addToast = useToastStore((state) => state.addToast);
  const [savedForLater, setSavedForLater] = useState(
    JSON.parse(localStorage.getItem('aurastore_saved_for_later') || '[]')
  );

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();
  const { subtotal, discountAmount, shipping, tax, total, totalCount } = getTotals();

  const handleApply = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  const handleSaveForLater = (item) => {
    removeFromCart(item.id, item.selectedColor);
    const updatedSaved = [...savedForLater, item];
    setSavedForLater(updatedSaved);
    localStorage.setItem('aurastore_saved_for_later', JSON.stringify(updatedSaved));
    addToast(`Moved "${item.name}" to Save for Later`, 'info');
  };

  const handleMoveToCart = (item) => {
    addItem(item, item.quantity, item.selectedColor);
    const updatedSaved = savedForLater.filter(i => !(i.id === item.id && i.selectedColor === item.selectedColor));
    setSavedForLater(updatedSaved);
    localStorage.setItem('aurastore_saved_for_later', JSON.stringify(updatedSaved));
    addToast(`Moved "${item.name}" back to cart!`, 'success');
  };

  if (items.length === 0 && savedForLater.length === 0) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={28} />
        </div>
        <h2 className="font-heading text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
        <p className="text-neutral-400 text-xs max-w-sm mx-auto mb-6">Discover something you love from our curated collection.</p>
        <Link to="/shop" className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs">
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white">Shopping Bag</h1>
            <p className="text-xs text-neutral-400">{totalCount} item{totalCount === 1 ? '' : 's'} ready for checkout</p>
          </div>
          {items.length > 0 && (
            <button onClick={clearCart} className="text-xs text-neutral-400 hover:text-rose-400 transition-colors">
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Items Column */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}`}
                className="p-4 sm:p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover bg-neutral-950 shrink-0"
                />

                <div className="flex-1 space-y-1 text-center sm:text-left w-full">
                  <div className="text-[10px] text-purple-400 font-bold uppercase">{item.category}</div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-white line-clamp-1">{item.name}</h3>
                  <div className="text-xs text-neutral-400">Finish: <span className="text-neutral-200">{item.selectedColor}</span></div>
                  <div className="font-mono text-sm font-bold text-white pt-1">${item.price}</div>
                </div>

                <div className="flex sm:flex-col items-center justify-between gap-4 w-full sm:w-auto">
                  <div className="flex items-center rounded-xl bg-neutral-950 border border-neutral-800 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleSaveForLater(item)}
                      className="text-xs text-purple-400 hover:underline flex items-center gap-1"
                      title="Save for Later"
                    >
                      <Bookmark size={13} /> Save
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedColor)}
                      className="text-neutral-500 hover:text-rose-400"
                      title="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Saved for Later Shelf */}
            {savedForLater.length > 0 && (
              <div className="pt-8 space-y-4">
                <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                  <BookmarkCheck size={18} className="text-purple-400" />
                  Saved For Later ({savedForLater.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedForLater.map(item => (
                    <div key={`${item.id}-${item.selectedColor}`} className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <div className="font-mono text-xs text-purple-300">${item.price}</div>
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="mt-2 text-[11px] font-bold text-purple-400 hover:underline"
                        >
                          Move Back to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-6 sticky top-28">
                <h2 className="font-heading text-base font-bold text-white">Order Summary</h2>

                {/* Promo Input */}
                <form onSubmit={handleApply} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. AURA20)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-purple-500 font-mono"
                    />
                    <button type="submit" className="px-4 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white">
                      Apply
                    </button>
                  </div>
                  {promoSuccess && <p className="text-[11px] text-emerald-400 font-medium">{promoSuccess}</p>}
                  {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
                </form>

                <div className="space-y-3 text-xs text-neutral-400 border-t border-neutral-800 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({discountPercent * 100}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Air Shipping</span>
                    <span className="font-semibold text-white">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax (8%)</span>
                    <span className="font-semibold text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-800 pt-3 text-sm font-bold text-white">
                    <span>Total Amount</span>
                    <span className="font-mono text-purple-300">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-purple-950/50"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
