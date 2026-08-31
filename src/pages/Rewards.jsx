import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { Sparkles, Gift, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const Rewards = () => {
  const { user } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  const vouchers = [
    { points: 1000, value: 25, code: 'AURA-25-OFF', label: '$25 Store Voucher' },
    { points: 2000, value: 50, code: 'AURA-50-OFF', label: '$50 Store Voucher' },
    { points: 4000, value: 100, code: 'AURA-100-OFF', label: '$100 VIP Voucher' }
  ];

  const handleRedeem = (voucher) => {
    if ((user?.points || 0) < voucher.points) {
      addToast(`Insufficient loyalty balance. You need ${voucher.points} points.`, 'error');
      return;
    }
    addToast(`Voucher code generated: ${voucher.code}! Copied to clipboard.`, 'success');
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-purple-950/40 border border-purple-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">House of Aura Loyalty Program</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Aura Points & Rewards Vault
            </h1>
            <p className="text-xs text-neutral-400 max-w-md">
              Earn 10 points for every $1 spent. Redeem rewards for instant checkout credits, VIP drop access, and concierge benefits.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-950 border border-purple-500/30 text-center shrink-0 min-w-[200px]">
            <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Your Balance</div>
            <div className="font-heading text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 my-1">
              {user?.points || 4850}
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">Points Ready to Redeem</span>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-heading text-xl font-bold text-white">Available Redemption Vouchers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vouchers.map(v => (
              <div key={v.code} className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-purple-500/30 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <Gift size={22} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">{v.label}</h3>
                  <p className="text-xs text-neutral-400 mt-1">Requires <strong>{v.points.toLocaleString()} Aura Points</strong></p>
                </div>

                <button
                  onClick={() => handleRedeem(v)}
                  className="w-full py-3 rounded-2xl bg-white hover:bg-purple-300 text-neutral-950 font-bold text-xs transition-colors shadow-lg"
                >
                  Redeem Now
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
