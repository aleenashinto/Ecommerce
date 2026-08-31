import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Truck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/80 text-neutral-400 pt-16 pb-24 lg:pb-12 mt-20 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles size={16} className="text-purple-400" />
                </div>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                Aura<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Store</span>
              </span>
            </Link>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Curated luxury technology, precision horology, designer apparel, and modern lifestyle essentials. Engineered for those who refuse the ordinary.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-purple-500/50 transition-colors" aria-label="Instagram">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-purple-500/50 transition-colors" aria-label="X">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-purple-500/50 transition-colors" aria-label="Facebook">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-purple-500/50 transition-colors" aria-label="YouTube">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-4">
              Shop Categories
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li><Link to="/shop?category=Audio" className="hover:text-purple-400 transition-colors">Acoustic & Audio</Link></li>
              <li><Link to="/shop?category=Watches" className="hover:text-purple-400 transition-colors">Titanium Horology</Link></li>
              <li><Link to="/shop?category=Electronics" className="hover:text-purple-400 transition-colors">Next-Gen Electronics</Link></li>
              <li><Link to="/shop?category=Fashion" className="hover:text-purple-400 transition-colors">Designer Apparel</Link></li>
              <li><Link to="/shop?category=Gaming" className="hover:text-purple-400 transition-colors">Esports Hardware</Link></li>
              <li><Link to="/shop?category=Home" className="hover:text-purple-400 transition-colors">Sculptural Home</Link></li>
            </ul>
          </div>

          {/* Col 2: Customer Care */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-4">
              Client Concierge
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li><Link to="/account" className="hover:text-purple-400 transition-colors">My Profile</Link></li>
              <li><Link to="/orders" className="hover:text-purple-400 transition-colors">Order Tracking</Link></li>
              <li><Link to="/wishlist" className="hover:text-purple-400 transition-colors">Saved Wishlist</Link></li>
              <li><a href="#shipping" className="hover:text-purple-400 transition-colors">Global Express Shipping</a></li>
              <li><a href="#returns" className="hover:text-purple-400 transition-colors">30-Day Return Guarantee</a></li>
              <li><a href="#support" className="hover:text-purple-400 transition-colors">24/7 VIP Concierge</a></li>
            </ul>
          </div>

          {/* Col 3: Company & Trust */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-4">
              House of Aura
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li><a href="#about" className="hover:text-purple-400 transition-colors">Our Philosophy</a></li>
              <li><a href="#sustainability" className="hover:text-purple-400 transition-colors">Ethical Sourcing</a></li>
              <li><a href="#careers" className="hover:text-purple-400 transition-colors">Careers & Studio</a></li>
              <li><a href="#privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>� 2026 AuraStore Technologies Inc. All rights reserved. Crafted for modern commerce excellence.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck size={13} /> 256-Bit Encrypted Demo
            </span>
            <span className="flex items-center gap-1 text-purple-400 font-medium">
              <Truck size={13} /> Worldwide Dispatch
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
