import { create } from 'zustand';

export const useWishlistStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('aurastore_wishlist') || '[]'),

  toggleWishlist: (product) => {
    const current = get().items;
    const exists = current.some(item => item.id === product.id);
    let updated;
    let added = false;

    if (exists) {
      updated = current.filter(item => item.id !== product.id);
    } else {
      updated = [...current, product];
      added = true;
    }

    localStorage.setItem('aurastore_wishlist', JSON.stringify(updated));
    set({ items: updated });
    return added;
  },

  isInWishlist: (productId) => {
    return get().items.some(item => item.id === productId);
  },

  removeFromWishlist: (productId) => {
    const updated = get().items.filter(item => item.id !== productId);
    localStorage.setItem('aurastore_wishlist', JSON.stringify(updated));
    set({ items: updated });
  },

  clearWishlist: () => {
    localStorage.removeItem('aurastore_wishlist');
    set({ items: [] });
  }
}));
