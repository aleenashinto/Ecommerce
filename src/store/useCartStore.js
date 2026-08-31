import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('aurastore_cart') || '[]'),
  isDrawerOpen: false,
  promoCode: '',
  discountPercent: 0,
  promoError: '',
  promoSuccess: '',

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  addItem: (product, quantity = 1, selectedColor = null) => get().addToCart(product, quantity, selectedColor),
  applyPromo: (code) => get().applyPromoCode(code),

  addToCart: (product, quantity = 1, selectedColor = null) => {
    const color = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : 'Standard');
    const currentItems = get().items;
    const existingIndex = currentItems.findIndex(item => item.id === product.id && item.selectedColor === color);

    let updatedItems;
    if (existingIndex > -1) {
      updatedItems = [...currentItems];
      const newQty = updatedItems[existingIndex].quantity + quantity;
      updatedItems[existingIndex].quantity = Math.min(newQty, product.stock || 99);
    } else {
      updatedItems = [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          stock: product.stock,
          selectedColor: color,
          quantity: Math.min(quantity, product.stock || 99)
        }
      ];
    }

    localStorage.setItem('aurastore_cart', JSON.stringify(updatedItems));
    set({ items: updatedItems, isDrawerOpen: true });
  },

  removeFromCart: (id, selectedColor) => {
    const updatedItems = get().items.filter(item => !(item.id === id && item.selectedColor === selectedColor));
    localStorage.setItem('aurastore_cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
  },

  updateQuantity: (id, selectedColor, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(id, selectedColor);
      return;
    }

    const updatedItems = get().items.map(item => {
      if (item.id === id && item.selectedColor === selectedColor) {
        return { ...item, quantity: Math.min(quantity, item.stock || 99) };
      }
      return item;
    });

    localStorage.setItem('aurastore_cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
  },

  clearCart: () => {
    localStorage.removeItem('aurastore_cart');
    set({ items: [], promoCode: '', discountPercent: 0, promoError: '', promoSuccess: '' });
  },

  applyPromoCode: (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AURA20') {
      set({ promoCode: clean, discountPercent: 0.20, promoSuccess: '20% off applied!', promoError: '' });
      return true;
    } else if (clean === 'SUMMER10') {
      set({ promoCode: clean, discountPercent: 0.10, promoSuccess: '10% Summer discount applied!', promoError: '' });
      return true;
    } else if (clean === 'VIP40') {
      set({ promoCode: clean, discountPercent: 0.40, promoSuccess: '40% VIP discount applied!', promoError: '' });
      return true;
    } else {
      set({ promoError: 'Invalid promo code. Try AURA20', promoSuccess: '' });
      return false;
    }
  },

  removePromoCode: () => {
    set({ promoCode: '', discountPercent: 0, promoError: '', promoSuccess: '' });
  },

  getTotals: () => {
    const items = get().items;
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const discountAmount = subtotal * get().discountPercent;
    const discountedSubtotal = subtotal - discountAmount;
    const shipping = subtotal > 50 || items.length === 0 ? 0 : 15;
    const tax = discountedSubtotal * 0.08;
    const total = discountedSubtotal > 0 ? discountedSubtotal + shipping + tax : 0;

    return {
      subtotal,
      totalCount,
      discountAmount,
      discount: discountAmount,
      shipping,
      tax,
      total: Math.max(0, total)
    };
  }
}));
