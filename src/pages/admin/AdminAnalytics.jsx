import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const AdminAnalytics = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Business Intelligence & Telemetry</h1>
        <p className="text-xs text-neutral-400 mt-1">Deep-dive customer conversion, cart abandonment, and margin analytics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-2">
          <div className="text-xs text-neutral-400 font-semibold">Storefront Conversion Rate</div>
          <div className="font-heading text-3xl font-bold text-white">3.82%</div>
          <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <ArrowUpRight size={13} /> +0.64% industry benchmark
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-2">
          <div className="text-xs text-neutral-400 font-semibold">Cart Abandonment Rate</div>
          <div className="font-heading text-3xl font-bold text-white">24.1%</div>
          <div className="text-[11px] text-emerald-400 font-medium">Low abandonment with 1-click Apple Pay</div>
        </div>

        <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-2">
          <div className="text-xs text-neutral-400 font-semibold">Client Repeat Purchase Ratio</div>
          <div className="font-heading text-3xl font-bold text-white">48.9%</div>
          <div className="text-[11px] text-purple-400 font-medium">Strong VIP Obsidian loyalty retention</div>
        </div>
      </div>
    </div>
  );
};
