import React from 'react';
import { useAdminStore } from '../../store/useAdminStore';

export const SellerProducts = () => {
  const { products } = useAdminStore();
  const vendorProducts = products.slice(0, 6);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Vendor Product Inventory</h1>
        <p className="text-xs text-neutral-400 mt-1">Manage pricing, variants, and live catalog availability for your brand.</p>
      </div>

      <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-neutral-950 uppercase text-[10px] tracking-wider text-neutral-400 border-b border-neutral-800">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Commission</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {vendorProducts.map(p => (
              <tr key={p.id} className="hover:bg-neutral-800/30">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                  <span className="font-bold text-white">{p.name}</span>
                </td>
                <td className="p-4">{p.category}</td>
                <td className="p-4 font-mono font-bold text-white">${p.price}</td>
                <td className="p-4"><span className="text-emerald-400 font-semibold">{p.stockCount || 25} Units</span></td>
                <td className="p-4 font-mono text-neutral-400">${(p.price * 0.1).toFixed(2)} (10%)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
