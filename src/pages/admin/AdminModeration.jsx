import React from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import { 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Clock, 
  Store, 
  Tag, 
  Package, 
  ShieldCheck,
  Eye
} from 'lucide-react';

export const AdminModeration = () => {
  const { pendingProducts, approvePendingProduct, rejectPendingProduct } = useAdminStore();
  const addToast = useToastStore((state) => state.addToast);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-purple-400">Quality Assurance & Compliance</span>
          <h1 className="font-heading text-2xl font-bold text-white">Product Moderation Queue</h1>
          <p className="text-xs text-neutral-400">
            Review vendor-submitted inventory before products go LIVE on the customer storefront.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 font-bold">
          Pending Approvals: {pendingProducts.length}
        </div>
      </div>

      {pendingProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingProducts.map((prod) => (
            <div key={prod.id} className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              
              <div className="flex items-center gap-4">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-24 h-24 rounded-2xl object-cover bg-neutral-950 border border-neutral-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">{prod.category}</span>
                  <h3 className="font-heading text-sm font-bold text-white truncate">{prod.name}</h3>
                  <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                    <Store size={12} className="text-amber-400" /> {prod.sellerName}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-mono text-sm font-bold text-white">${prod.price}</span>
                    <span className="text-xs text-neutral-400">Stock: {prod.stock} units</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-amber-400" /> Submitted: {prod.submittedDate}
                </span>
                <span className="text-purple-300 font-semibold">{prod.status}</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    approvePendingProduct(prod.id);
                    addToast(`Approved and published "${prod.name}" to Live Storefront!`, 'success');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40"
                >
                  <CheckCircle size={14} /> Approve & Publish LIVE
                </button>
                <button
                  onClick={() => {
                    rejectPendingProduct(prod.id);
                    addToast(`Rejected submission "${prod.name}"`, 'info');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-rose-400 text-xs font-semibold"
                >
                  Reject
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-3xl bg-neutral-900/30 border border-neutral-800 space-y-3">
          <ShieldCheck size={36} className="text-emerald-400 mx-auto" />
          <h3 className="font-heading text-lg font-bold text-white">All Submissions Reviewed</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            All vendor products have been inspected and published to the live marketplace.
          </p>
        </div>
      )}

    </div>
  );
};
