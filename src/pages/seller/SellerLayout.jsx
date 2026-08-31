import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useSellerStore } from '../../store/useSellerStore';
import { 
  Store, 
  Package, 
  ShoppingBag, 
  Wallet, 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  Menu, 
  X 
} from 'lucide-react';

export const SellerLayout = () => {
  const { seller } = useSellerStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Vendor Dashboard', path: '/seller', icon: Store, end: true },
    { name: 'My Products', path: '/seller/products', icon: Package },
    { name: 'Fulfillment Orders', path: '/seller/orders', icon: ShoppingBag },
    { name: 'Wallet & Payouts', path: '/seller/wallet', icon: Wallet }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex">
      
      {/* SELLER SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 border-r border-neutral-800 p-5 flex flex-col justify-between transition-transform lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/seller" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-pink-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                  <Store size={16} className="text-amber-400" />
                </div>
              </div>
              <div>
                <span className="font-heading text-base font-bold text-white block">Aura<span className="text-amber-400">Seller</span></span>
                <span className="text-[9px] uppercase tracking-wider text-amber-300 font-semibold">Artisan Partner Hub</span>
              </div>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-neutral-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="text-xs font-bold text-white">{seller.storeName}</div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
              <ShieldCheck size={12} /> {seller.kycStatus}
            </div>
            <div className="text-[10px] text-neutral-400 pt-1">
              Available Balance: <strong className="font-mono text-amber-300">${seller.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-900/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <item.icon size={16} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-neutral-800">
          <Link
            to="/"
            className="w-full py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft size={13} /> Back to Storefront
          </Link>
        </div>
      </aside>

      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-40 lg:hidden" />
      )}

      {/* MAIN SELLER CONTENT */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <header className="h-16 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white">
              <Menu size={18} />
            </button>
            <span className="text-xs font-semibold text-neutral-300 hidden sm:inline">{seller.storeName} Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/seller/wallet"
              className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono"
            >
              Wallet: ${seller.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Link>
          </div>
        </header>

        <main className="p-4 sm:p-8 flex-1">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
