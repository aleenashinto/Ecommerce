import React from 'react';
import { X, Printer, Download, Sparkles, ShieldCheck } from 'lucide-react';

export const InvoiceModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-neutral-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto text-neutral-200">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-purple-400" />
            <span className="font-heading text-base font-bold text-white">AuraStore Official Tax Invoice</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800"
              title="Print Receipt"
            >
              <Printer size={15} />
            </button>
            <button onClick={onClose} className="p-2 rounded-xl bg-neutral-950 text-neutral-400 hover:text-white">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="space-y-6 text-xs">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-heading text-lg font-bold text-white">AuraStore Technologies Inc.</div>
              <div className="text-neutral-400 mt-1">
                742 Evergreen Terrace, Suite 400<br />
                San Francisco, CA 94107, USA<br />
                support@aurastore.io
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm text-purple-300 font-mono">INVOICE #{order.id}</div>
              <div className="text-neutral-400 mt-1">
                Date: {order.date}<br />
                Payment: Visa ****4242<br />
                Status: Paid in Full
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold">Billed & Shipped To:</span>
            <div className="font-bold text-white">Jane Anderson</div>
            <div className="text-neutral-400">742 Evergreen Terrace, San Francisco, CA 94107</div>
            <div className="text-neutral-500 font-mono">Carrier: {order.carrier} � Tracking: {order.trackingNumber}</div>
          </div>

          {/* Items Table */}
          <div className="border border-neutral-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-neutral-950 text-[10px] uppercase text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="p-3">Item Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {order.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-semibold text-white">{item.name}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right font-mono">${item.price}</td>
                    <td className="p-3 text-right font-mono font-bold text-white">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-2 text-right">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono text-white">${order.total?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Express Courier Shipping</span>
                <span className="text-emerald-400 font-semibold">FREE (Over $50)</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Estimated Tax (8%)</span>
                <span className="font-mono text-white">Included</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-neutral-800 pt-2 text-purple-300">
                <span>Total Amount</span>
                <span className="font-mono">${order.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
