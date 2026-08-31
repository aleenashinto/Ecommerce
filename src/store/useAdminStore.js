import { create } from 'zustand';
import { products as initialProducts } from '../data/products.js';
import { mockOrders as initialOrders } from '../data/mockOrders.js';

const INITIAL_WAREHOUSES = [
  { id: 'wh_sf', name: 'SF Main Hub (West Coast)', location: 'San Francisco, CA', capacity: '88%', stockCount: 1420 },
  { id: 'wh_ny', name: 'NY Express Depot (East Coast)', location: 'New York, NY', capacity: '74%', stockCount: 980 },
  { id: 'wh_ldn', name: 'London Central Logistics', location: 'London, UK', capacity: '62%', stockCount: 640 }
];

const INITIAL_COUPONS = [
  { code: 'AURA20', discount: '20% OFF', type: 'percentage', value: 20, minSpend: 100, uses: 142, status: 'Active', expiry: 'Dec 31, 2026' },
  { code: 'SUMMER10', discount: '$10 OFF', type: 'fixed', value: 10, minSpend: 50, uses: 89, status: 'Active', expiry: 'Oct 30, 2026' },
  { code: 'VIP40', discount: '40% OFF VIP', type: 'percentage', value: 40, minSpend: 500, uses: 34, status: 'Active', expiry: 'Dec 31, 2026' },
  { code: 'FREESHIP', discount: 'Free Express Shipping', type: 'shipping', value: 15, minSpend: 30, uses: 210, status: 'Active', expiry: 'Ongoing' }
];

const INITIAL_CUSTOMERS = [
  { id: 'c_1', name: 'Jane Anderson', email: 'jane.anderson@example.com', tier: 'VIP Obsidian', orders: 12, totalSpent: 4850.00, status: 'Active', joined: 'March 2024' },
  { id: 'c_2', name: 'Alexander Wright', email: 'alex.wright@example.com', tier: 'Gold Elite', orders: 8, totalSpent: 2940.50, status: 'Active', joined: 'Jan 2024' },
  { id: 'c_3', name: 'Elena Rostova', email: 'elena.rostova@example.com', tier: 'Platinum VIP', orders: 15, totalSpent: 6210.00, status: 'Active', joined: 'Nov 2023' },
  { id: 'c_4', name: 'Marcus Chen', email: 'marcus.chen@example.com', tier: 'Silver', orders: 3, totalSpent: 780.00, status: 'Active', joined: 'July 2024' },
  { id: 'c_5', name: 'Sophia Sterling', email: 'sophia.s@example.com', tier: 'Bronze', orders: 1, totalSpent: 180.00, status: 'Blocked', joined: 'August 2024' }
];

export const useAdminStore = create((set, get) => ({
  products: JSON.parse(localStorage.getItem('aurastore_admin_products') || JSON.stringify(initialProducts)),
  orders: JSON.parse(localStorage.getItem('aurastore_admin_orders') || JSON.stringify(initialOrders)),
  warehouses: JSON.parse(localStorage.getItem('aurastore_admin_warehouses') || JSON.stringify(INITIAL_WAREHOUSES)),
  coupons: JSON.parse(localStorage.getItem('aurastore_admin_coupons') || JSON.stringify(INITIAL_COUPONS)),
  customers: JSON.parse(localStorage.getItem('aurastore_admin_customers') || JSON.stringify(INITIAL_CUSTOMERS)),
  currentRole: 'Super Admin', // 'Super Admin' | 'Inventory Manager' | 'Marketing Manager' | 'Support Agent'

  setRole: (role) => set({ currentRole: role }),

  // Product CRUD
  addProduct: (productData) => {
    const newProduct = {
      ...productData,
      id: String(Date.now()),
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockCount: Number(productData.stockCount) || 25,
      features: productData.features || ['Premium Aerospace Materials', 'Engineered by Aura Studio', '2-Year Luxury Warranty'],
      images: [productData.image, productData.image, productData.image],
      colors: productData.colors || [{ name: 'Obsidian Black', hex: '#171717' }]
    };
    const updated = [newProduct, ...get().products];
    localStorage.setItem('aurastore_admin_products', JSON.stringify(updated));
    set({ products: updated });
    return newProduct;
  },

  updateProduct: (productId, updates) => {
    const updated = get().products.map(p => p.id === productId ? { ...p, ...updates } : p);
    localStorage.setItem('aurastore_admin_products', JSON.stringify(updated));
    set({ products: updated });
  },

  deleteProduct: (productId) => {
    const updated = get().products.filter(p => p.id !== productId);
    localStorage.setItem('aurastore_admin_products', JSON.stringify(updated));
    set({ products: updated });
  },

  // Order status update
  updateOrderStatus: (orderId, newStatus) => {
    const updated = get().orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem('aurastore_admin_orders', JSON.stringify(updated));
    set({ orders: updated });
  },

  // Restock Inventory
  restockWarehouse: (warehouseId, addedQuantity) => {
    const updated = get().warehouses.map(w => 
      w.id === warehouseId ? { ...w, stockCount: w.stockCount + Number(addedQuantity) } : w
    );
    localStorage.setItem('aurastore_admin_warehouses', JSON.stringify(updated));
    set({ warehouses: updated });
  },

  // Add Coupon
  addCoupon: (coupon) => {
    const updated = [coupon, ...get().coupons];
    localStorage.setItem('aurastore_admin_coupons', JSON.stringify(updated));
    set({ coupons: updated });
  },

  deleteCoupon: (code) => {
    const updated = get().coupons.filter(c => c.code !== code);
    localStorage.setItem('aurastore_admin_coupons', JSON.stringify(updated));
    set({ coupons: updated });
  },

  // Toggle customer status
  toggleCustomerBlock: (customerId) => {
    const updated = get().customers.map(c => 
      c.id === customerId ? { ...c, status: c.status === 'Active' ? 'Blocked' : 'Active' } : c
    );
    localStorage.setItem('aurastore_admin_customers', JSON.stringify(updated));
    set({ customers: updated });
  }
}));
