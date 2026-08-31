import { create } from 'zustand';
import { initialOrders } from '../data/mockOrders';

export const useOrdersStore = create((set, get) => ({
  orders: JSON.parse(localStorage.getItem('aurastore_orders') || JSON.stringify(initialOrders)),

  addOrder: (newOrder) => {
    const updated = [newOrder, ...get().orders];
    localStorage.setItem('aurastore_orders', JSON.stringify(updated));
    set({ orders: updated });
    return newOrder;
  },

  getOrderById: (id) => {
    return get().orders.find(o => o.id === id);
  }
}));
