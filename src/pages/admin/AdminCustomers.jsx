import React from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';

export const AdminCustomers = () => {
  const { customers, toggleCustomerBlock } = useAdminStore();
  const addToast = useToastStore((state) => state.addToast);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Client Relationship CRM</h1>
        <p className="text-xs text-neutral-400 mt-1">Customer profiles, Lifetime Value (LTV), VIP statuses, and security controls.</p>
      </div>

      <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-950/80 uppercase text-[10px] tracking-wider text-neutral-400 border-b border-neutral-800">
              <tr>
                <th className="p-4">Customer Name & Email</th>
                <th className="p-4">VIP Tier</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spend (LTV)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Security Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white">{c.name}</div>
                    <div className="text-[11px] text-neutral-400">{c.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {c.tier}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-semibold">{c.orders} orders</td>
                  <td className="p-4 font-mono font-bold text-emerald-400">${c.totalSpent.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.status === 'Active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        toggleCustomerBlock(c.id);
                        addToast(`Client status updated for ${c.name}`, 'info');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        c.status === 'Active' 
                          ? 'bg-neutral-950 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-300 border border-neutral-800' 
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {c.status === 'Active' ? 'Block Account' : 'Unblock Account'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
