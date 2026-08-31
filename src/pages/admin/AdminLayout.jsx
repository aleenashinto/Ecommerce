import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAdminStore } from '../../store/useAdminStore';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Warehouse, 
  Users, 
  TicketPercent, 
  TrendingUp, 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  Search,
  Menu,
  X,
  Store,
  CheckSquare
} from 'lucide-react';

export const AdminLayout = () => {
  const { currentRole, setRole, pendingProducts, sellers } = useAdminStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pendingSellersCount = sellers.filter(s => s.kycStatus === 'Pending Verification').length;

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Products & Catalog', path: '/admin/products', icon: Package },
    { name: 'Moderation Queue', path: '/admin/moderation', icon: CheckSquare, badge: pendingProducts.length > 0 ? pendingProducts.length : null },
    { name: 'Seller Management', path: '/admin/sellers', icon: Store, badge: pendingSellersCount > 0 ? pendingSellersCount : null },
    { name: 'Order Processing', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Warehouses & Stock', path: '/admin/inventory', icon: Warehouse },
    { name: 'Customer CRM', path: '/admin/customers', icon: Users },
    { name: 'Coupons & Promos', path: '/admin/coupons', icon: TicketPercent },
    { name: 'Business Analytics', path: '/admin/analytics', icon: TrendingUp }
  ];

  const roles = [
    'Super Admin', 
    'Product Admin', 
    'Order Admin', 
    'Finance Admin', 
    'Support Admin', 
    'Seller Manager'
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 border-r border-neutral-800 p-5 flex flex-col justify-between transition-transform lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles size={16} className="text-purple-400" />
                </div>
              </div>
              <div>
                <span className="font-heading text-base font-bold text-white block">Aura<span className="text-purple-400">Admin</span></span>
                <span className="text-[9px] uppercase tracking-wider text-purple-300 font-semibold">HQ Command Center</span>
              </div>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-neutral-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800">
            <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1.5 uppercase tracking-wider font-semibold">
              <span>Active Admin Role</span>
              <ShieldCheck size={12} className="text-emerald-400" />
            </div>
            <select
              value={currentRole}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-purple-300 rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
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

      {/* CONTENT */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <header className="h-16 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white">
              <Menu size={18} />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400">
              <Search size={14} />
              <input type="text" placeholder="Search orders, SKUs..." className="bg-transparent border-none text-white focus:outline-none w-48 text-xs" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 hidden sm:inline">Telemetry Live</span>
            </div>
            <div className="h-4 w-px bg-neutral-800" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-bold text-xs font-heading">
                HQ
              </div>
              <div className="hidden sm:block text-left text-xs">
                <div className="font-bold text-white leading-tight">Aura HQ</div>
                <div className="text-[10px] text-neutral-400">{currentRole}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-8 flex-1">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
