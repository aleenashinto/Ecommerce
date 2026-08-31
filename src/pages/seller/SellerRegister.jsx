import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToastStore } from '../../store/useToastStore';
import { Store, ShieldCheck, CheckCircle2, ArrowRight, Upload, Building, Lock } from 'lucide-react';

export const SellerRegister = () => {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  const [formData, setFormData] = useState({
    storeName: 'Aura Minimalist Studio',
    businessType: 'Artisan Manufacturer / Design Studio',
    legalName: 'Aura Studio LLC',
    email: 'contact@aurastudio.io',
    phone: '+1 (415) 880-9210',
    taxId: 'US-EIN-94821049',
    bankAccount: 'CHASE-4902-8819-2041',
    routingNumber: '021000021'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Vendor application submitted for Admin KYC Verification!', 'success');
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center bg-neutral-950 text-white">
      <div className="w-full max-w-2xl bg-neutral-900/90 border border-purple-500/30 rounded-[32px] p-8 sm:p-12 shadow-2xl space-y-8">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center mx-auto shadow-lg shadow-purple-950/60">
            <Store size={26} className="text-white" />
          </div>
          <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Artisan Marketplace</span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Register as an Aura Vendor</h1>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Sell your curated creations to discerning clients worldwide with automated fulfillment and 10% platform commission.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-neutral-950 border border-emerald-500/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">Application Under Admin Review</h3>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Our Marketplace Compliance Team is reviewing your Tax ID and store information. You will receive an activation email within 24 hours.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link to="/seller" className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold">
                View Seller Demo Hub
              </Link>
              <Link to="/" className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold">
                Return to Store
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            
            {/* Step 1: Business Profile */}
            <div className="space-y-4">
              <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider text-purple-300 flex items-center gap-2">
                <Building size={14} /> 1. Business & Store Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Store Brand Name</label>
                  <input
                    type="text"
                    required
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Legal Entity Name</label>
                  <input
                    type="text"
                    required
                    value={formData.legalName}
                    onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Business Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Direct Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Tax & Banking */}
            <div className="space-y-4 pt-4 border-t border-neutral-800">
              <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider text-purple-300 flex items-center gap-2">
                <ShieldCheck size={14} /> 2. Tax ID & Direct Payout Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">GST / Tax EIN</label>
                  <input
                    type="text"
                    required
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Bank Account #</label>
                  <input
                    type="text"
                    required
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Routing / IFSC</label>
                  <input
                    type="text"
                    required
                    value={formData.routingNumber}
                    onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl shadow-purple-950/60 flex items-center justify-center gap-2"
            >
              Submit Vendor Application <ArrowRight size={16} />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
