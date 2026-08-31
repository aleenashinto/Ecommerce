import React, { useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertOctagon, 
  Percent, 
  Search, 
  Store, 
  ShieldCheck, 
  FileText,
  DollarSign
} from 'lucide-react';

export const AdminSellers = () => {
  const { sellers, approveSeller, rejectSeller, suspendSeller, setSellerCommission } = useAdminStore();
  const addToast = useToastStore((state) => state.addToast);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filtered = sellers.filter(s => {
    const matchQ = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   s.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   s.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchQ) return false;
    if (selectedStatus !== 'all' && s.kycStatus.toLowerCase() !== selectedStatus.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-purple-400">Marketplace Ecosystem</span>
          <h1 className="font-heading text-2xl font-bold text-white">Vendor & Seller Management</h1>
          <p className="text-xs text-neutral-400">Verify KYC documentation, set commission cuts, and manage seller statuses.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 font-bold">
            Total Sellers: {sellers.length}
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-bold">
            Active: {sellers.filter(s => s.kycStatus === 'Approved').length}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search vendor by name, store, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="h-10 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-200 focus:outline-none"
        >
          <option value="all">All KYC Statuses</option>
          <option value="Approved">Approved Only</option>
          <option value="Pending Verification">Pending Verification</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {/* Sellers Cards / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(seller => (
          <div key={seller.id} className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-900 to-indigo-900 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Store size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-white">{seller.name}</h3>
                  <p className="text-xs text-purple-400 font-semibold">{seller.storeName}</p>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                seller.kycStatus === 'Approved'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : seller.kycStatus === 'Pending Verification'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}>
                {seller.kycStatus}
              </span>
            </div>

            {/* Seller Telemetry Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-center text-xs">
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Gross GMV</span>
                <span className="font-mono font-bold text-white">${seller.grossSales.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Catalog</span>
                <span className="font-mono font-bold text-purple-300">{seller.productsCount} SKUs</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Rating</span>
                <span className="font-bold text-amber-400">? {seller.rating}</span>
              </div>
            </div>

            {/* KYC & Tax Info */}
            <div className="space-y-1.5 text-xs text-neutral-400 bg-neutral-950/40 p-3 rounded-2xl border border-neutral-800/60">
              <div className="flex justify-between">
                <span>Tax ID / GST:</span>
                <span className="font-mono text-neutral-200">{seller.taxId}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Email:</span>
                <span className="text-neutral-200">{seller.email}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-neutral-800/60">
                <span>Platform Commission:</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={seller.commissionRate}
                    onChange={(e) => {
                      setSellerCommission(seller.id, e.target.value);
                      addToast(`Updated commission to ${e.target.value}%`, 'info');
                    }}
                    className="w-12 h-6 px-1 rounded bg-neutral-900 border border-neutral-700 text-white font-mono text-center text-xs"
                  />
                  <span className="font-bold text-purple-400">%</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              {seller.kycStatus === 'Pending Verification' && (
                <>
                  <button
                    onClick={() => {
                      approveSeller(seller.id);
                      addToast(`Approved vendor ${seller.name}!`, 'success');
                    }}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md"
                  >
                    <CheckCircle size={14} /> Approve KYC
                  </button>
                  <button
                    onClick={() => {
                      rejectSeller(seller.id);
                      addToast(`Rejected vendor ${seller.name}`, 'info');
                    }}
                    className="px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900 border border-rose-800/50 text-rose-400 text-xs font-semibold"
                  >
                    <XCircle size={14} />
                  </button>
                </>
              )}

              {seller.kycStatus === 'Approved' && (
                <button
                  onClick={() => {
                    suspendSeller(seller.id);
                    addToast(`Suspended vendor ${seller.name}`, 'info');
                  }}
                  className="w-full py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <AlertOctagon size={14} /> Suspend Seller Store
                </button>
              )}

              {seller.kycStatus === 'Suspended' && (
                <button
                  onClick={() => {
                    suspendSeller(seller.id);
                    addToast(`Re-activated vendor ${seller.name}`, 'success');
                  }}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <CheckCircle size={14} /> Re-Activate Store
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
