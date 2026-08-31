import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToastStore } from '../../store/useToastStore';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      addToast("You're subscribed to AuraStore Private Drops!", 'success');
      setEmail('');
    }
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-[36px] bg-gradient-to-r from-purple-950/40 via-neutral-900 to-indigo-950/40 border border-purple-500/30 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles size={13} /> VIP Membership
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
              Stay in the Loop
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Receive private drop invitations, secret VIP coupon codes, and curated technological forecasts.
            </p>
          </div>

          <div className="w-full max-w-md">
            {isSubscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-2 text-sm font-semibold">
                <CheckCircle2 size={18} /> You're subscribed! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 px-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="h-12 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98 shrink-0"
                >
                  Subscribe <ArrowRight size={14} />
                </button>
              </form>
            )}
            <p className="text-[11px] text-neutral-400 text-center lg:text-left mt-2">
              We respect your privacy. Unsubscribe with 1-click anytime.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
