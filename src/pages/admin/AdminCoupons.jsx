import React, { useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import { Trash2 } from 'lucide-react';

export const AdminCoupons = () => {
  const { coupons, addCoupon, deleteCoupon } = useAdminStore();
  const addToast = useToastStore((state) => state.addToast);

  const [newCode, setNewCode] = useState({
    code: '',
    discount: '15% OFF',
    type: 'percentage',
    value: 15,
    minSpend: 100,
    expiry: 'Dec 31, 2026'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCode.code.trim()) return;
    addCoupon({ ...newCode, uses: 0, status: 'Active' });
    addToast(`Promo coupon ${newCode.code} launched successfully!`, 'success');
    setNewCode({ code: '', discount: '15% OFF', type: 'percentage', value: 15, minSpend: 100, expiry: 'Dec 31, 2026' });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Promotions & Coupon Campaigns</h1>
        <p className="text-xs text-neutral-400 mt-1">Deploy discount vouchers, minimum spend triggers, and VIP sales codes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coupons.map((coupon) => (
          <div key={coupon.code} className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-purple-300 bg-neutral-950 px-3 py-1 rounded-xl border border-neutral-800">
                {coupon.code}
              </span>
              <button
                onClick={() => {
                  deleteCoupon(coupon.code);
                  addToast('Coupon archived', 'info');
                }}
                className="text-neutral-500 hover:text-rose-400"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="font-heading text-lg font-bold text-white">{coupon.discount}</div>
            <div className="text-[11px] text-neutral-400 space-y-0.5">
              <div>Min. Spend: ${coupon.minSpend}</div>
              <div>Redeemed: <strong>{coupon.uses} times</strong></div>
              <div>Expires: {coupon.expiry}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 max-w-xl space-y-4">
        <h3 className="font-heading text-base font-bold text-white">Deploy New Campaign Code</h3>

        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-400 mb-1 font-semibold">Promo Code</label>
            <input
              type="text"
              required
              placeholder="e.g. FLASH50"
              value={newCode.code}
              onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
              className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono uppercase focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-400 mb-1 font-semibold">Discount Label</label>
              <input
                type="text"
                required
                value={newCode.discount}
                onChange={(e) => setNewCode({ ...newCode, discount: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1 font-semibold">Min Spend ($)</label>
              <input
                type="number"
                required
                value={newCode.minSpend}
                onChange={(e) => setNewCode({ ...newCode, minSpend: Number(e.target.value) })}
                className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg"
          >
            Activate Campaign
          </button>
        </form>
      </div>
    </div>
  );
};
