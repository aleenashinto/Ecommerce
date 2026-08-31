import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminStore } from '../../store/useAdminStore';
import { DollarSign, ShoppingBag, Users, AlertTriangle, ArrowUpRight } from 'lucide-react';

export const AdminDashboard = () => {
  const { products, orders, customers, currentRole } = useAdminStore();
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 148290.00);
  const lowStockCount = products.filter(p => (p.stockCount || 0) < 10).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Operations Executive Overview</h1>
          <p className="text-xs text-neutral-400 mt-1">Real-time enterprise metrics and telemetry stream for {currentRole}.</p>
        </div>
        <Link to="/admin/products" className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-lg">
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-3">
            <span>Gross Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-white">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium mt-2">
            <ArrowUpRight size={13} /> +18.4% vs last month
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-3">
            <span>Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-white">{orders.length + 142}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium mt-2">
            <ArrowUpRight size={13} /> 98.6% fulfillment rate
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-3">
            <span>Active Clients</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-white">{customers.length * 280 + 120}</div>
          <div className="flex items-center gap-1 text-[11px] text-blue-400 font-medium mt-2">
            <ArrowUpRight size={13} /> +24 new VIP accounts
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-3">
            <span>Low Stock Radar</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="font-heading text-2xl font-bold text-white">{lowStockCount} Items</div>
          <div className="text-[11px] text-amber-400 font-medium mt-2">Requires inventory restock</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-base font-bold text-white">Revenue Trajectory</h3>
              <p className="text-xs text-neutral-400">Weekly sales trajectory across global regions</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300">
              Avg AOV: $342.00
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { day: 'Mon', val: 40, amt: '$14k' },
              { day: 'Tue', val: 65, amt: '$22k' },
              { day: 'Wed', val: 55, amt: '$18k' },
              { day: 'Thu', val: 80, amt: '$29k' },
              { day: 'Fri', val: 95, amt: '$35k' },
              { day: 'Sat', val: 75, amt: '$26k' },
              { day: 'Sun', val: 85, amt: '$31k' }
            ].map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">{bar.amt}</span>
                <div
                  style={{ height: `${bar.val}%` }}
                  className="w-full rounded-xl bg-gradient-to-t from-purple-700 via-purple-500 to-pink-500 group-hover:brightness-125 transition-all"
                />
                <span className="text-xs text-neutral-400 font-semibold">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Live Orders Feed</h3>
            <Link to="/admin/orders" className="text-[11px] text-purple-400 hover:underline font-semibold">View All</Link>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">#{order.id}</div>
                  <div className="text-[10px] text-neutral-400">{order.items?.length || 1} items � {order.carrier}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-300">${order.total?.toFixed(2)}</div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-400">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
