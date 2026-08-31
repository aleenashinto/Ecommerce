import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Sun, 
  Moon, 
  ChevronRight,
  ArrowRight,
  Package,
  Settings,
  LogOut,
  Bell,
  CheckCircle
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useCurrencyStore, CURRENCY_RATES } from '../../store/useCurrencyStore';
import { useCompareStore } from '../../store/useCompareStore';
import { products } from '../../data/products';
import { useDebounce } from '../../hooks/useDebounce';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Order Dispatched', desc: 'TRK-AUR-9842109X is out for priority delivery.', time: '10m ago', unread: true },
    { id: 2, title: 'Price Drop Alert', desc: 'Chronos Horizon is now $499 (Save $50)', time: '2h ago', unread: true },
    { id: 3, title: 'VIP Reward Unlocked', desc: 'You earned 450 Aura Loyalty points!', time: '1d ago', unread: false },
  ]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const { currency, setCurrency } = useCurrencyStore();
  const compareCount = useCompareStore((state) => state.items.length);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const accountRef = useRef(null);
  const currencyRef = useRef(null);
  const notifRef = useRef(null);

  const debouncedSearch = useDebounce(searchQuery, 250);

  const cartItemsCount = useCartStore((state) => state.getTotals().totalCount);
  const openCartDrawer = useCartStore((state) => state.openDrawer);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { theme, toggleTheme } = useThemeStore();

  // Scroll detection for dynamic header height & blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsAccountOpen(false);
    setIsCurrencyOpen(false);
  }, [location]);

  // Click outside listener for search & account dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setIsCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter live search preview results
  const searchResults = debouncedSearch.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.tags.some(t => t.includes(debouncedSearch.toLowerCase()))
      ).slice(0, 4)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Journal', path: '/blog' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'Support Desk', path: '/support' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'h-18 bg-neutral-950/85 dark:bg-neutral-950/85 backdrop-blur-xl border-b border-purple-500/15 shadow-xl shadow-black/40' 
          : 'h-20 bg-neutral-950/60 dark:bg-neutral-950/60 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-0.5 shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Sparkles size={18} className="text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-white flex items-center">
            Aura<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400">Store</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                text-sm font-medium transition-colors relative py-1
                ${isActive 
                  ? 'text-purple-400 font-semibold' 
                  : 'text-neutral-300 hover:text-white'}
              `}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP SEARCH BAR */}
        <div ref={searchRef} className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <input
              type="text"
              placeholder="Search luxury products, audio, watches..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full h-10 pl-9 pr-4 text-xs rounded-full bg-neutral-900/90 border border-neutral-800 focus:border-purple-500/50 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          </form>

          {/* Search Dropdown Results */}
          {isSearchOpen && debouncedSearch.trim() && (
            <div className="absolute top-12 left-0 w-full bg-neutral-900/95 border border-purple-500/20 rounded-2xl p-3 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-2 mb-2">
                Products ({searchResults.length})
              </div>
              {searchResults.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                  {searchResults.map(item => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-800/80 transition-colors group"
                    >
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-neutral-800" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-neutral-200 group-hover:text-purple-300 truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {item.category} � <span className="text-purple-400 font-semibold">${item.price}</span>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-neutral-600 group-hover:text-white" />
                    </Link>
                  ))}
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full mt-2 py-2 text-center text-xs font-semibold text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl transition-colors flex items-center justify-center gap-1"
                  >
                    View all results <ArrowRight size={12} />
                  </button>
                </div>
              ) : (
                <div className="py-4 text-center text-xs text-neutral-500">
                  No luxury products found for "{debouncedSearch}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT ACTION ICONS */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Portal Quick Switcher (Storefront / Admin / Seller) */}
          <div className="hidden xl:flex items-center rounded-xl bg-neutral-900/80 border border-neutral-800 p-1 text-[11px] font-semibold">
            <span className="px-2 py-0.5 rounded-lg bg-purple-600 text-white font-bold">Store</span>
            <Link to="/admin" className="px-2 py-0.5 rounded-lg text-neutral-400 hover:text-white transition-colors">Admin HQ</Link>
            <Link to="/seller" className="px-2 py-0.5 rounded-lg text-neutral-400 hover:text-white transition-colors">Seller Hub</Link>
          </div>

          {/* Currency Dropdown */}
          <div ref={currencyRef} className="relative">
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="h-8 px-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-bold text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
              title="Change Global Currency"
            >
              <span>{currency.code}</span>
              <span className="font-mono text-neutral-500">{currency.symbol}</span>
            </button>

            {isCurrencyOpen && (
              <div className="absolute right-0 top-10 w-44 bg-neutral-900/95 border border-purple-500/20 rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95">
                {Object.values(CURRENCY_RATES).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code);
                      setIsCurrencyOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-xl transition-colors ${
                      currency.code === c.code ? 'bg-purple-600 text-white font-bold' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    <span>{c.code} ({c.symbol})</span>
                    <span className="text-[10px] opacity-70">{c.code === 'USD' ? '1.0x' : `${c.rate}x`}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Compare Button */}
          <Link
            to="/compare"
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors"
            title="Product Comparison"
            aria-label="View comparison"
          >
            <Sparkles size={16} className={compareCount > 0 ? "text-purple-400" : ""} />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-neutral-950">
                {compareCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Notification Center */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors"
              title="Notification Center"
              aria-label="Notifications"
            >
              <Bell size={16} />
              {notifications.some(n => n.unread) && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-pink-500 ring-2 ring-neutral-950" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 top-11 w-72 sm:w-80 bg-neutral-900/95 border border-purple-500/20 rounded-3xl p-3 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 px-2">
                  <span className="font-heading text-xs font-bold text-white">Notifications</span>
                  <button
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                    className="text-[10px] text-purple-400 hover:underline font-semibold"
                  >
                    Mark read
                  </button>
                </div>
                <div className="space-y-1.5 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-2xl transition-colors text-xs ${
                        n.unread ? 'bg-purple-950/30 border border-purple-500/20 text-white' : 'bg-neutral-950/40 text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[11px]">
                        <span className={n.unread ? 'text-purple-300' : 'text-neutral-300'}>{n.title}</span>
                        <span className="text-[9px] text-neutral-500 font-normal">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <Link
            to="/wishlist"
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors"
            title="Wishlist"
            aria-label="View wishlist"
          >
            <Heart size={16} className={wishlistCount > 0 ? "fill-rose-500 text-rose-500" : ""} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-neutral-950 animate-in zoom-in">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button
            onClick={openCartDrawer}
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors group"
            title="Shopping Cart"
            aria-label="Open cart"
          >
            <ShoppingBag size={16} className="group-hover:scale-105 transition-transform" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-neutral-950 animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* User Account / Auth Section */}
          {isAuthenticated && user ? (
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900 border border-purple-500/30 transition-colors overflow-hidden ring-2 ring-purple-500/20"
                title={user.name}
                aria-label="Account menu"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-purple-600 to-pink-600 text-white font-bold text-[10px] flex items-center justify-center tracking-tight">
                    {user.name ? (user.name.split(' ').length > 1 ? `${user.name.split(' ')[0][0]}${user.name.split(' ')[1][0]}`.toUpperCase() : user.name.substring(0, 2).toUpperCase()) : 'U'}
                  </div>
                )}
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 top-12 w-64 bg-neutral-900/95 border border-purple-500/20 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3 py-2 border-b border-neutral-800">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                        {user.tier || 'VIP'}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/account"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
                    >
                      <User size={14} /> Profile & Overview
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
                    >
                      <Package size={14} /> Order History
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
                    >
                      <Heart size={14} /> Saved Wishlist
                    </Link>
                  </div>
                  <div className="border-t border-neutral-800 pt-1">
                    <button
                      onClick={() => {
                        setIsAccountOpen(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors text-left font-semibold"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-md shadow-purple-950/40 transition-all hover:scale-102"
              >
                Sign Up
              </Link>
            </div>
          )}


          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* MOBILE EXPANDED MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/95 border-b border-purple-500/20 backdrop-blur-2xl px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          </form>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-neutral-300 hover:text-purple-400 py-2 border-b border-neutral-900 flex items-center justify-between"
              >
                {link.name}
                <ChevronRight size={14} className="text-neutral-600" />
              </Link>
            ))}
          </nav>

          {/* Mobile Portal and Auth Links */}
          <div className="pt-2 border-t border-neutral-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <Link to="/admin" className="text-purple-400 hover:underline">Admin HQ</Link>
              <Link to="/seller" className="text-amber-400 hover:underline">Seller Hub</Link>
              <Link to="/compare" className="text-neutral-300 hover:text-white">Compare ({compareCount})</Link>
            </div>

            {!isAuthenticated && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  className="py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-center text-white"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold text-center text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
