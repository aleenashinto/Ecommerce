import { create } from 'zustand';

export const useCompareStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('aurastore_compare') || '[]'),

  addToCompare: (product) => {
    const current = get().items;
    if (current.some(item => item.id === product.id)) return false;
    if (current.length >= 4) return 'MAX_LIMIT';
    
    const updated = [...current, product];
    localStorage.setItem('aurastore_compare', JSON.stringify(updated));
    set({ items: updated });
    return true;
  },

  removeFromCompare: (productId) => {
    const updated = get().items.filter(item => item.id !== productId);
    localStorage.setItem('aurastore_compare', JSON.stringify(updated));
    set({ items: updated });
  },

  clearCompare: () => {
    localStorage.removeItem('aurastore_compare');
    set({ items: [] });
  }
}));
