import React, { useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import { Warehouse, Plus } from 'lucide-react';

export const AdminInventory = () => {
  const { warehouses, restockWarehouse } = useAdminStore();
  const addToast = useToastStore((state) => state.addToast);

  const [selectedWh, setSelectedWh] = useState(warehouses[0]?.id);
  const [restockQty, setRestockQty] = useState(100);

  const handleRestock = (e) => {
    e.preventDefault();
    restockWarehouse(selectedWh, restockQty);
    addToast(`Added ${restockQty} units to inventory warehouse!`, 'success');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Multi-Warehouse Inventory Control</h1>
        <p className="text-xs text-neutral-400 mt-1">Real-time logistics stock distribution across global fulfillment hubs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {warehouses.map((wh) => (
          <div key={wh.id} className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Warehouse size={20} />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                {wh.capacity} Capacity
              </span>
            </div>

            <div>
              <h3 className="font-heading text-base font-bold text-white">{wh.name}</h3>
              <p className="text-xs text-neutral-400">{wh.location}</p>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Total Stocked:</span>
              <strong className="font-mono text-white font-bold">{wh.stockCount} units</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 max-w-xl space-y-4">
        <h3 className="font-heading text-base font-bold text-white">Restock Logistics Hub</h3>
        
        <form onSubmit={handleRestock} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-400 mb-1 font-semibold">Target Warehouse</label>
            <select
              value={selectedWh}
              onChange={(e) => setSelectedWh(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
            >
              {warehouses.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-semibold">Restock Batch Quantity</label>
            <input
              type="number"
              min="10"
              max="5000"
              value={restockQty}
              onChange={(e) => setRestockQty(Number(e.target.value))}
              className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg flex items-center justify-center gap-2"
          >
            <Plus size={14} /> Authorize Stock Inflow
          </button>
        </form>
      </div>
    </div>
  );
};
