import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useOrdersStore } from '../store/useOrdersStore';
import { useToastStore } from '../store/useToastStore';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  ArrowRight,
  Gift,
  Calendar,
  Smartphone,
  Building2,
  Banknote
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotals, clearCart, promoCode, discountPercent } = useCartStore();
  const addOrder = useOrdersStore((state) => state.addOrder);
  const addToast = useToastStore((state) => state.addToast);

  const { subtotal, discountAmount, shipping, tax, total } = getTotals();

  // Options
  const [paymentType, setPaymentType] = useState('card'); // 'card' | 'upi' | 'netbanking' | 'cod'
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: 'Jane Anderson',
    email: 'jane.anderson@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    deliveryMethod: 'standard',
    cardNumber: '4242 8888 9999 4242',
    cardExp: '12/28',
    cardCvv: '888',
    upiId: 'jane.anderson@okaxis'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalTotal = total + (isGiftWrap ? 5.00 : 0);

  if (items.length === 0) {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center">
        <h2 className="font-heading text-xl font-bold text-white mb-2">Your Cart is Empty</h2>
        <p className="text-xs text-neutral-400 mb-6">Add products to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';
    
    if (paymentType === 'card') {
      if (!formData.cardNumber.trim()) errs.cardNumber = 'Card number is required';
      if (!formData.cardExp.trim()) errs.cardExp = 'Expiration date is required';
      if (!formData.cardCvv.trim()) errs.cardCvv = 'CVV is required';
    } else if (paymentType === 'upi') {
      if (!formData.upiId.trim() || !formData.upiId.includes('@')) errs.upiId = 'Valid UPI VPA ID required';
    }
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please complete all required fields', 'info');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = 'AS-2026-' + Math.floor(10000 + Math.random() * 90000);
      const newOrder = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        status: 'Confirmed',
        statusStep: 1,
        trackingNumber: 'TRK-AUR-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        carrier: 'Aura Priority Logistics',
        items: [...items],
        subtotal,
        discount: discountAmount,
        shipping,
        tax,
        total: finalTotal,
        paymentMethod: paymentType.toUpperCase(),
        isGiftWrap,
        scheduledDate: scheduledDate || 'Standard Next-Day',
        shippingAddress: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        }
      };

      addOrder(newOrder);
      clearCart();

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#3b82f6', '#ffffff']
      });

      navigate('/order-success', { state: { order: newOrder } });
    }, 900);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="pb-6 border-b border-neutral-800 mb-8">
          <h1 className="font-heading text-3xl font-bold text-white">Express Checkout</h1>
          <p className="text-xs text-neutral-400">Encrypted 256-bit SSL transaction verified by Aura Premier Vault</p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Contact & Shipping Address */}
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                1. Shipping Address & Recipient
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-purple-500 focus:outline-none"
                  />
                  {errors.name && <span className="text-rose-400 text-[10px] mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-purple-500 focus:outline-none"
                  />
                  {errors.email && <span className="text-rose-400 text-[10px] mt-1 block">{errors.email}</span>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-purple-500 focus:outline-none"
                  />
                  {errors.address && <span className="text-rose-400 text-[10px] mt-1 block">{errors.address}</span>}
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-purple-500 focus:outline-none"
                  />
                  {errors.city && <span className="text-rose-400 text-[10px] mt-1 block">{errors.city}</span>}
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-purple-500 focus:outline-none"
                  />
                  {errors.postalCode && <span className="text-rose-400 text-[10px] mt-1 block">{errors.postalCode}</span>}
                </div>
              </div>
            </div>

            {/* 2. White-Glove Options & Delivery Scheduling */}
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                2. White-Glove & Delivery Options
              </h3>

              <div className="space-y-3 text-xs">
                {/* Gift wrapping */}
                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={(e) => setIsGiftWrap(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 bg-neutral-900 border-neutral-700"
                  />
                  <Gift size={16} className="text-pink-400" />
                  <div className="flex-1">
                    <span className="font-bold text-white">Luxury Gift Wrapping & Custom Wax Seal</span>
                    <span className="text-[11px] text-neutral-400 block">Includes custom note & magnetic presentation box (+ $5.00)</span>
                  </div>
                </label>

                {isGiftWrap && (
                  <textarea
                    placeholder="Write your personalized gift message here..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none"
                    rows="2"
                  />
                )}

                {/* Scheduled delivery */}
                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Calendar size={15} className="text-purple-400" />
                    <span>Scheduled Delivery Window</span>
                  </div>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 3. Multi-Channel Payment System */}
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                  3. Payment Method
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Lock size={12} /> Live Encrypted Gateway
                </span>
              </div>

              {/* Payment Type Tabs */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI / VPA', icon: Smartphone },
                  { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                  { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPaymentType(tab.id)}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        paymentType === tab.id
                          ? 'bg-purple-600/20 border-purple-500 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-[10px] font-bold">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {paymentType === 'card' && (
                <div className="space-y-4 pt-2">
                  <div className="p-5 rounded-2xl bg-gradient-to-tr from-purple-950 via-neutral-900 to-indigo-950 border border-purple-500/30 text-white space-y-4">
                    <div className="flex justify-between items-center">
                      <CreditCard size={24} className="text-purple-300" />
                      <span className="font-mono text-xs text-purple-300">AURA PREMIER VAULT</span>
                    </div>
                    <div className="font-mono text-base tracking-widest text-neutral-200">
                      {formData.cardNumber}
                    </div>
                    <div className="flex justify-between items-end text-[11px]">
                      <div>
                        <div className="text-[9px] text-neutral-400 uppercase">Cardholder</div>
                        <div className="font-semibold">{formData.name}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-neutral-400 uppercase">Expires</div>
                        <div className="font-semibold">{formData.cardExp}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="col-span-3 sm:col-span-1">
                      <label className="block text-neutral-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">CVV Security</label>
                      <input
                        type="password"
                        value={formData.cardCvv}
                        onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                        className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentType === 'upi' && (
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                  <p className="text-neutral-300">Instant UPI Payment via GooglePay, PhonePe, Paytm or BHIM:</p>
                  <input
                    type="text"
                    placeholder="username@okhdfcbank"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
                  />
                  {errors.upiId && <span className="text-rose-400 text-[10px]">{errors.upiId}</span>}
                </div>
              )}

              {paymentType === 'netbanking' && (
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                  <label className="text-neutral-400 block">Select Primary Banking Partner:</label>
                  <select className="w-full h-10 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white">
                    <option>Chase Private Client / J.P. Morgan</option>
                    <option>HDFC Bank Premier</option>
                    <option>Barclays International</option>
                    <option>HSBC Premier</option>
                  </select>
                </div>
              )}

              {paymentType === 'cod' && (
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1 text-xs">
                  <p className="text-neutral-200 font-semibold">Cash on Delivery Verified</p>
                  <p className="text-neutral-400 text-[11px]">Pay via cash or contactless POS card machine upon courier delivery.</p>
                </div>
              )}

            </div>

          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-6 sticky top-28">
              <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                Order Review ({items.length} items)
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}`} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-neutral-800 shrink-0" />
                      <div>
                        <div className="font-semibold text-white truncate max-w-[170px]">{item.name}</div>
                        <div className="text-[11px] text-neutral-400">Qty: {item.quantity} � {item.selectedColor}</div>
                      </div>
                    </div>
                    <span className="font-bold text-white">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-neutral-400 border-t border-neutral-800 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon ({promoCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {isGiftWrap && (
                  <div className="flex justify-between text-pink-400">
                    <span>Gift Wrap & Custom Note</span>
                    <span>+$5.00</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Priority Courier</span>
                  <span className="text-white font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (8%)</span>
                  <span className="text-white font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-800 pt-3 text-base font-bold text-white">
                  <span>Total Due</span>
                  <span className="font-mono text-purple-300">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl shadow-purple-950/50 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Authorizing Encrypted Payment...</span>
                ) : (
                  <>
                    <Lock size={15} /> Authorize Payment � ${finalTotal.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
