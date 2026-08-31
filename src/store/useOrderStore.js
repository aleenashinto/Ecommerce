import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialOrders } from '../data/mockOrders';

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: initialOrders,

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders]
        }));
      },

      getOrderById: (orderId) => {
        return get().orders.find((o) => o.id === orderId);
      }
    }),
    {
      name: 'aura-orders-storage'
    }
  )
);
