import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrdersStore } from '../store/useOrdersStore';
import { Package, Truck, CheckCircle2, ChevronRight, ArrowRight, ShieldCheck, FileText, RotateCcw } from 'lucide-react';
import { InvoiceModal } from '../components/orders/InvoiceModal';
import { ReturnModal } from '../components/orders/ReturnModal';

export const Orders = () => {
  const orders = useOrdersStore((state) => state.orders);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="pb-6 border-b border-neutral-800 mb-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-1.5">
            Client Order Ledger
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            My Orders & Tracking
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            {orders.length} order{orders.length === 1 ? '' : 's'} recorded
          </p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/30 transition-colors space-y-6"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-lg font-bold text-white">
                        #{order.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Placed on {order.date} • {order.carrier}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-left sm:text-right">
                      <span className="text-xs text-neutral-400">Total Charged</span>
                      <div className="font-heading text-lg font-bold text-purple-300">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Line items list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-neutral-800 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.id}`} className="font-semibold text-xs text-white hover:text-purple-300 truncate block">
                          {item.name}
                        </Link>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          Qty: {item.quantity} • ${item.price} each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking Telemetry status */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-purple-400" />
                    <span className="text-neutral-300">
                      Tracking: <strong className="font-mono text-purple-300">{order.trackingNumber}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedInvoice(order)}
                      className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 flex items-center gap-1.5 transition-colors font-semibold"
                    >
                      <FileText size={13} /> View Tax Invoice
                    </button>
                    <button
                      onClick={() => setSelectedReturn(order)}
                      className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-300 border border-neutral-800 flex items-center gap-1.5 transition-colors font-semibold"
                    >
                      <RotateCcw size={13} /> Request Return
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center rounded-3xl bg-neutral-900/30 border border-neutral-800 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Package size={28} />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">No Past Orders</h3>
            <p className="text-xs text-neutral-400 max-w-sm mb-6">You have not placed any orders yet.</p>
            <Link to="/shop" className="px-8 py-3 rounded-full bg-white text-black font-bold text-xs">
              Start Shopping
            </Link>
          </div>
        )}

      </div>

      {/* MODALS */}
      {selectedInvoice && (
        <InvoiceModal order={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
      {selectedReturn && (
        <ReturnModal order={selectedReturn} onClose={() => setSelectedReturn(null)} />
      )}

    </div>
  );
};
