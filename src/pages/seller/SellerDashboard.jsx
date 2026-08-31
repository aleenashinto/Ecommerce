import React from 'react';
import { Link } from 'react-router-dom';
import { useSellerStore } from '../../store/useSellerStore';
import { DollarSign, ShoppingBag, Package, Star, ArrowUpRight, Wallet } from 'lucide-react';

export const SellerDashboard = () => {
  const { seller } = useSellerStore();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">{seller.storeName} Analytics</h1>
          <p className="text-xs text-neutral-400 mt-1">Vendor performance, commission settlement, and order dispatch status.</p>
        </div>
        <Link
          to="/seller/wallet"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-bold text-xs shadow-lg self-start"
        >
          Withdraw Earnings
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-3">
            <span>Gross Sales</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-white">${seller.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-2">10% Platform fee deducted</div>
        </div>

        <div className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-3">
            <span>Net Artisan Earnings</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Wallet size={16} />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-white">${seller.netEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className="text-[11px] text-amber-400 font-medium mt-2">Available in Wallet</div>
        </div>

        <div className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-3">
            <span>Total Orders Fulfilled</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-white">{seller.totalOrders}</div>
          <div className="text-[11px] text-purple-400 font-medium mt-2">99.2% on-time dispatch</div>
        </div>

        <div className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-3">
            <span>Store Rating</span>
            <div className="w-8 h-8 rounded-xl bg-yellow-500/15 text-yellow-400 flex items-center justify-center">
              <Star size={16} />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-white">{seller.rating} / 5.0</div>
          <div className="text-[11px] text-yellow-400 font-medium mt-2">Top Rated Artisan Vendor</div>
        </div>
      </div>

    </div>
  );
};
