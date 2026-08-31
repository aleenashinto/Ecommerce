import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useOrdersStore } from '../store/useOrdersStore';
import { motion } from 'framer-motion';

export const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'AS-2026-10482';
  const getOrderById = useOrdersStore((state) => state.getOrderById);
  const order = getOrderById(orderId);

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Animated Success Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="w-20 h-20 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-950/50"
        >
          <CheckCircle2 size={42} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
            <Sparkles size={14} /> Payment Authorized & Confirmed
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mb-8">
            Your items have been allocated and our fulfillment atelier has begun preparing your luxury parcel for express dispatch.
          </p>
        </motion.div>

        {/* Order Details Receipt Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 text-left mb-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-2">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Order Reference</span>
              <div className="font-heading text-lg font-bold text-purple-300">#{orderId}</div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Estimated Delivery</span>
              <div className="text-xs font-bold text-emerald-400">3�5 Business Days (Express Air)</div>
            </div>
          </div>

          {order && order.items && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Purchased Line Items:
              </span>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-neutral-800" />
                    <div>
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="text-[11px] text-neutral-400">Qty: {item.quantity} � {item.selectedColor}</div>
                    </div>
                  </div>
                  <span className="font-bold text-white">${item.price * item.quantity}</span>
                </div>
              ))}

              <div className="pt-4 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
                <span>Total Paid</span>
                <span className="font-heading text-purple-300">${order.total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/orders"
            className="px-8 py-3.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-200 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Package size={16} /> View Orders & Tracking
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white font-bold text-xs transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};
