import React, { useState } from 'react';
import { useSellerStore } from '../../store/useSellerStore';
import { useToastStore } from '../../store/useToastStore';
import { Wallet, ArrowDownRight, CheckCircle2 } from 'lucide-react';

export const SellerWallet = () => {
  const { seller, payouts, requestWithdrawal } = useSellerStore();
  const addToast = useToastStore((state) => state.addToast);

  const [withdrawAmt, setWithdrawAmt] = useState(2500);
  const [method, setMethod] = useState('Stripe Direct Bank Transfer (Chase ***9412)');
  const [error, setError] = useState('');

  const handleWithdraw = (e) => {
    e.preventDefault();
    setError('');
    const res = requestWithdrawal(withdrawAmt, method);
    if (res.success) {
      addToast(`Withdrawal of $${withdrawAmt} initiated to ${method}`, 'success');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Artisan Wallet & Payouts</h1>
        <p className="text-xs text-neutral-400 mt-1">Manage partner earnings, instant ACH transfers, and ledger statements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <div className="text-xs text-neutral-400">Available Wallet Balance</div>
          <div className="font-heading text-4xl font-bold text-amber-300">
            ${seller.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-neutral-400">
            Pending Escrow Clearance: <strong className="text-white">${seller.pendingPayout.toFixed(2)}</strong>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleWithdraw} className="space-y-4 pt-2 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1 font-semibold">Withdrawal Amount ($)</label>
              <input
                type="number"
                max={seller.walletBalance}
                value={withdrawAmt}
                onChange={(e) => setWithdrawAmt(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-semibold">Payout Destination</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
              >
                <option value="Stripe Direct Bank Transfer (Chase ***9412)">Stripe Direct Bank Transfer (Chase ***9412)</option>
                <option value="Razorpay Instant UPI Payout (marcus@upi)">Razorpay Instant UPI Payout (marcus@upi)</option>
                <option value="Wire Transfer (SWIFT)">International Wire Transfer (SWIFT)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-bold text-xs shadow-lg"
            >
              Authorize Payout Transfer
            </button>
          </form>
        </div>

        <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h3 className="font-heading text-base font-bold text-white">Payout History Ledger</h3>
          <div className="space-y-3">
            {payouts.map(p => (
              <div key={p.id} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">${p.amount.toFixed(2)}</div>
                  <div className="text-[10px] text-neutral-400">{p.method} � {p.date}</div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  p.status === 'Paid' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
