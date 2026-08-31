import React from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';

export const AdminOrders = () => {
  const { orders, updateOrderStatus } = useAdminStore();
  const addToast = useToastStore((state) => state.addToast);

  const statuses = ['Processing', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    addToast(`Order #${orderId} updated to ${newStatus}`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Order Pipeline Management</h1>
        <p className="text-xs text-neutral-400 mt-1">Manage order statuses, courier tracking telemetry, and refunds.</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/30 transition-colors space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-heading text-lg font-bold text-white">#{order.id}</span>
                  <span className="font-mono text-xs text-purple-300 bg-neutral-950 px-2.5 py-0.5 rounded-lg border border-neutral-800">
                    Tracking: {order.trackingNumber}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Placed on {order.date} � Courier: {order.carrier}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400">Order Status:</span>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 text-xs font-bold text-emerald-400 rounded-xl px-3 py-1.5 focus:outline-none"
                >
                  {statuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-neutral-800 shrink-0" />
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="font-bold text-white truncate">{item.name}</div>
                    <div className="text-neutral-400 mt-0.5">Qty: {item.quantity} � ${item.price} each</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-neutral-400">Total Charged: <strong className="text-white font-mono font-bold">${order.total?.toFixed(2)}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
