import React from 'react';
import { useAdminStore } from '../../store/useAdminStore';

export const SellerOrders = () => {
  const { orders } = useAdminStore();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Vendor Fulfillment Queue</h1>
        <p className="text-xs text-neutral-400 mt-1">Pending order dispatches and courier telemetry.</p>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">Order #{order.id}</div>
              <div className="text-[11px] text-neutral-400">Tracking: {order.trackingNumber} � {order.carrier}</div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
