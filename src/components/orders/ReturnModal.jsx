import React, { useState } from 'react';
import { X, RotateCcw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useToastStore } from '../../store/useToastStore';

export const ReturnModal = ({ order, onClose }) => {
  const addToast = useToastStore((state) => state.addToast);
  const [reason, setReason] = useState('Item sizing did not match expectation');
  const [exchange, setExchange] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast(`Return pickup scheduled for Order #${order.id}!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-neutral-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-neutral-200">
        
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <RotateCcw size={18} className="text-purple-400" />
            <h3 className="font-heading text-base font-bold text-white">Aura Care 30-Day Return</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="font-heading text-lg font-bold text-white">Return Request Authorized</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Our courier will collect Order <strong>#{order.id}</strong> from your primary shipping address on Thursday. Refund of <strong className="text-white">${order.total?.toFixed(2)}</strong> will process instantly upon scan.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-white text-neutral-950 font-bold text-xs shadow-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1 font-semibold">Select Return Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
              >
                <option value="Item sizing did not match expectation">Item sizing did not match expectation</option>
                <option value="Changed preference for another color/variant">Changed preference for another color/variant</option>
                <option value="Packaging inspected / cosmetic assessment">Packaging inspected / cosmetic assessment</option>
                <option value="Order arrived later than anticipated">Order arrived later than anticipated</option>
              </select>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exchange}
                  onChange={(e) => setExchange(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-purple-600 focus:ring-purple-500"
                />
                <span className="font-semibold text-white">Exchange for another variant instead of full refund</span>
              </label>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck size={14} /> Complimentary Doorstep Express Pickup
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl"
            >
              Submit Return & Dispatch Courier
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
