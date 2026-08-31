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

const INITIAL_SELLERS = [
  {
    id: 'sel_1',
    name: 'Aura Artisan Acoustics',
    storeName: 'Aura Studio Store',
    email: 'vendor@aurastudio.io',
    phone: '+1 (415) 880-9210',
    taxId: 'US-EIN-94821049',
    kycStatus: 'Approved',
    commissionRate: 10,
    grossSales: 124800,
    rating: 4.9,
    productsCount: 14,
    joined: 'Jan 2024'
  },
  {
    id: 'sel_2',
    name: 'Chronos Horology Swiss AG',
    storeName: 'Chronos Timepieces',
    email: 'contact@chronos-swiss.ch',
    phone: '+41 22 730 4400',
    taxId: 'CHE-109.842.110',
    kycStatus: 'Approved',
    commissionRate: 12,
    grossSales: 89400,
    rating: 4.8,
    productsCount: 8,
    joined: 'Feb 2024'
  },
  {
    id: 'sel_3',
    name: 'Nomad Atelier Leatherworks',
    storeName: 'Nomad Goods',
    email: 'partners@nomadleather.com',
    phone: '+1 (212) 490-1288',
    taxId: 'US-EIN-88192041',
    kycStatus: 'Pending Verification',
    commissionRate: 10,
    grossSales: 0,
    rating: 5.0,
    productsCount: 4,
    joined: 'Aug 2026'
  },
  {
    id: 'sel_4',
    name: 'Apex Pro Ergonomics',
    storeName: 'Apex Studio Gear',
    email: 'sales@apexpro.co',
    phone: '+44 20 7946 0991',
    taxId: 'GB-VAT-92019482',
    kycStatus: 'Pending Verification',
    commissionRate: 10,
    grossSales: 0,
    rating: 4.7,
    productsCount: 2,
    joined: 'Aug 2026'
  }
];

const INITIAL_PENDING_PRODUCTS = [
  {
    id: 'pend_1',
    sellerName: 'Nomad Atelier Leatherworks',
    name: 'Bespoke Saddle Leather Laptop Folio',
    category: 'Lifestyle',
    price: 185,
    stock: 40,
    submittedDate: 'Aug 29, 2026',
    status: 'Pending Admin Review',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'pend_2',
    sellerName: 'Apex Pro Ergonomics',
    name: 'AeroLift Magnetic Monitor Riser',
    category: 'Electronics',
    price: 149,
    stock: 25,
    submittedDate: 'Aug 30, 2026',
    status: 'Pending Admin Review',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80'
  }
];

const INITIAL_CATEGORIES = [
  { id: 'cat_elec', name: 'Electronics', subcategories: ['Acoustics & Audio', 'Smart Wearables', 'Desk Peripherals'], count: 28 },
  { id: 'cat_fash', name: 'Fashion & Horology', subcategories: ['Luxury Timepieces', 'Full-Grain Bags', 'Travel Essentials'], count: 18 },
  { id: 'cat_work', name: 'Workspace & Living', subcategories: ['Ambient Illumination', 'Solid Walnut Stands', 'Aromatherapy'], count: 14 }
];

export const useAdminStore = create((set, get) => ({
  products: JSON.parse(localStorage.getItem('aurastore_admin_products') || JSON.stringify(initialProducts)),
  orders: JSON.parse(localStorage.getItem('aurastore_admin_orders') || JSON.stringify(initialOrders)),
  warehouses: JSON.parse(localStorage.getItem('aurastore_admin_warehouses') || JSON.stringify(INITIAL_WAREHOUSES)),
  coupons: JSON.parse(localStorage.getItem('aurastore_admin_coupons') || JSON.stringify(INITIAL_COUPONS)),
  customers: JSON.parse(localStorage.getItem('aurastore_admin_customers') || JSON.stringify(INITIAL_CUSTOMERS)),
  sellers: JSON.parse(localStorage.getItem('aurastore_admin_sellers') || JSON.stringify(INITIAL_SELLERS)),
  pendingProducts: JSON.parse(localStorage.getItem('aurastore_admin_pending_prods') || JSON.stringify(INITIAL_PENDING_PRODUCTS)),
  categories: JSON.parse(localStorage.getItem('aurastore_admin_categories') || JSON.stringify(INITIAL_CATEGORIES)),
  
  // Amazon RBAC Roles: 'Super Admin' | 'Product Admin' | 'Order Admin' | 'Finance Admin' | 'Support Admin' | 'Seller Manager'
  currentRole: 'Super Admin',

  setRole: (role) => set({ currentRole: role }),

  // Seller Management Actions
  approveSeller: (sellerId) => {
    const updated = get().sellers.map(s => s.id === sellerId ? { ...s, kycStatus: 'Approved' } : s);
    localStorage.setItem('aurastore_admin_sellers', JSON.stringify(updated));
    set({ sellers: updated });
  },

  rejectSeller: (sellerId) => {
    const updated = get().sellers.map(s => s.id === sellerId ? { ...s, kycStatus: 'Rejected' } : s);
    localStorage.setItem('aurastore_admin_sellers', JSON.stringify(updated));
    set({ sellers: updated });
  },

  suspendSeller: (sellerId) => {
    const updated = get().sellers.map(s => s.id === sellerId ? { ...s, kycStatus: s.kycStatus === 'Suspended' ? 'Approved' : 'Suspended' } : s);
    localStorage.setItem('aurastore_admin_sellers', JSON.stringify(updated));
    set({ sellers: updated });
  },

  setSellerCommission: (sellerId, rate) => {
    const updated = get().sellers.map(s => s.id === sellerId ? { ...s, commissionRate: Number(rate) } : s);
    localStorage.setItem('aurastore_admin_sellers', JSON.stringify(updated));
    set({ sellers: updated });
  },

  // Product Moderation Pipeline
  approvePendingProduct: (pendingId) => {
    const item = get().pendingProducts.find(p => p.id === pendingId);
    if (!item) return;

    // Add to live products
    const liveProd = {
      id: Number(Date.now().toString().slice(-4)),
      name: item.name,
      category: item.category,
      price: item.price,
      originalPrice: Math.round(item.price * 1.25),
      rating: 5.0,
      reviews: 1,
      reviewsCount: 1,
      image: item.image,
      badge: 'NEW ARRIVAL',
      description: `Artisan crafted by ${item.sellerName}. Exclusively approved for AuraStore catalog.`,
      stock: item.stock,
      stockCount: item.stock,
      features: ['Artisan Certified', 'Aerospace Finish', 'Complimentary Worldwide Shipping'],
      tags: [item.category.toLowerCase(), 'new', 'artisan']
    };

    const updatedLive = [liveProd, ...get().products];
    const updatedPending = get().pendingProducts.filter(p => p.id !== pendingId);

    localStorage.setItem('aurastore_admin_products', JSON.stringify(updatedLive));
    localStorage.setItem('aurastore_admin_pending_prods', JSON.stringify(updatedPending));
    set({ products: updatedLive, pendingProducts: updatedPending });
  },

  rejectPendingProduct: (pendingId) => {
    const updatedPending = get().pendingProducts.filter(p => p.id !== pendingId);
    localStorage.setItem('aurastore_admin_pending_prods', JSON.stringify(updatedPending));
    set({ pendingProducts: updatedPending });
  },

  // Category Tree Management
  addCategory: (catName, subcategories = []) => {
    const newCat = {
      id: 'cat_' + Date.now(),
      name: catName,
      subcategories,
      count: 0
    };
    const updated = [...get().categories, newCat];
    localStorage.setItem('aurastore_admin_categories', JSON.stringify(updated));
    set({ categories: updated });
  },

  deleteCategory: (catId) => {
    const updated = get().categories.filter(c => c.id !== catId);
    localStorage.setItem('aurastore_admin_categories', JSON.stringify(updated));
    set({ categories: updated });
  },

  // Product CRUD
  addProduct: (productData) => {
    const newProduct = {
      ...productData,
      id: String(Date.now()),
      rating: 5.0,
      reviews: 1,
      reviewsCount: 1,
      inStock: true,
      stock: Number(productData.stockCount) || 25,
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

  // Warehouse stock restock
  restockWarehouse: (whId, unitsToAdd) => {
    const updated = get().warehouses.map(w => {
      if (w.id === whId) {
        const newCount = w.stockCount + unitsToAdd;
        return { ...w, stockCount: newCount, capacity: Math.min(100, Math.round((newCount / 1600) * 100)) + '%' };
      }
      return w;
    });
    localStorage.setItem('aurastore_admin_warehouses', JSON.stringify(updated));
    set({ warehouses: updated });
  },

  // Coupon campaigns
  addCoupon: (coupon) => {
    const updated = [coupon, ...get().coupons];
    localStorage.setItem('aurastore_admin_coupons', JSON.stringify(updated));
    set({ coupons: updated });
  },

  toggleCoupon: (code) => {
    const updated = get().coupons.map(c => c.code === code ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c);
    localStorage.setItem('aurastore_admin_coupons', JSON.stringify(updated));
    set({ coupons: updated });
  },

  // Customer block/unblock
  toggleCustomerStatus: (customerId) => {
    const updated = get().customers.map(c => c.id === customerId ? { ...c, status: c.status === 'Active' ? 'Blocked' : 'Active' } : c);
    localStorage.setItem('aurastore_admin_customers', JSON.stringify(updated));
    set({ customers: updated });
  }
}));
