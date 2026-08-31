import { create } from 'zustand';

const INITIAL_SELLER = {
  storeName: 'Aura Artisan Studio',
  vendorName: 'Marcus Vance',
  email: 'vendor.marcus@aurastore.io',
  kycStatus: 'Verified (Level 3)',
  commissionRate: '10%',
  totalSales: 34820.00,
  netEarnings: 31338.00,
  walletBalance: 12450.00,
  pendingPayout: 2100.00,
  rating: 4.9,
  totalOrders: 184
};

const INITIAL_PAYOUTS = [
  { id: 'PAY-9041', date: 'Aug 25, 2026', amount: 4500.00, method: 'Stripe Direct Bank Transfer (Chase ***9412)', status: 'Paid' },
  { id: 'PAY-8910', date: 'Aug 10, 2026', amount: 3200.00, method: 'Stripe Direct Bank Transfer (Chase ***9412)', status: 'Paid' },
  { id: 'PAY-8722', date: 'Jul 28, 2026', amount: 5800.00, method: 'Stripe Direct Bank Transfer (Chase ***9412)', status: 'Paid' }
];

export const useSellerStore = create((set, get) => ({
  seller: JSON.parse(localStorage.getItem('aurastore_seller_profile') || JSON.stringify(INITIAL_SELLER)),
  payouts: JSON.parse(localStorage.getItem('aurastore_seller_payouts') || JSON.stringify(INITIAL_PAYOUTS)),

  requestWithdrawal: (amount, method) => {
    const current = get().seller;
    const withdrawAmount = Number(amount);

    if (withdrawAmount > current.walletBalance || withdrawAmount <= 0) {
      return { success: false, error: 'Requested amount exceeds available wallet balance.' };
    }

    const newPayout = {
      id: 'PAY-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: withdrawAmount,
      method: method || 'Instant ACH Express Transfer',
      status: 'Processing'
    };

    const updatedSeller = {
      ...current,
      walletBalance: current.walletBalance - withdrawAmount,
      pendingPayout: current.pendingPayout + withdrawAmount
    };

    const updatedPayouts = [newPayout, ...get().payouts];
    localStorage.setItem('aurastore_seller_profile', JSON.stringify(updatedSeller));
    localStorage.setItem('aurastore_seller_payouts', JSON.stringify(updatedPayouts));

    set({ seller: updatedSeller, payouts: updatedPayouts });
    return { success: true, payout: newPayout };
  }
}));
