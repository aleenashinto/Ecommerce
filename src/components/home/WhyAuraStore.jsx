import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyAuraStore = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Worldwide Shipping',
      description: 'Complimentary white-glove express courier dispatch on all orders over $50 with real-time biometric tracking.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      description: 'End-to-end tokenized 256-bit encryption with support for Apple Pay, Google Pay, and premier card vaults.'
    },
    {
      icon: RotateCcw,
      title: '30-Day Easy Returns',
      description: 'Zero hassle return policies. If a product does not exceed expectations, return it with automated pickup.'
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      description: 'Direct access to our certified technology and luxury horology concierges whenever you need guidance.'
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
            <Sparkles size={14} /> The Aura Standard
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why Choose AuraStore
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20 flex flex-col items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                <f.icon size={22} />
              </div>
              <h3 className="font-heading text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                {f.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
