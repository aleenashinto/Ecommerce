import { create } from 'zustand';

export const useQuickViewStore = create((set) => ({
  product: null,
  isOpen: false,

  openQuickView: (product) => set({ product, isOpen: true }),
  closeQuickView: () => set({ isOpen: false, product: null })
}));
