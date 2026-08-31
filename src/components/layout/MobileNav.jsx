import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

export const MobileNav = () => {
  const cartCount = useCartStore((state) => state.getTotals().totalCount);
  const openCart = useCartStore((state) => state.openDrawer);
  const wishlistCount = useWishlistStore((state) => state.items.length);

  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/shop', icon: Compass },
    { name: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount },
    { name: 'Account', path: '/account', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/90 backdrop-blur-2xl border-t border-purple-500/20 px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {links.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center gap-1 py-1 px-3 relative transition-all duration-200
              ${isActive ? 'text-purple-400' : 'text-neutral-400 hover:text-neutral-200'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <item.icon size={20} className={isActive ? "stroke-[2.5]" : "stroke-[1.8]"} />
                  {item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-tight">
                  {item.name}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-purple-400" />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Floating Cart Button in Bottom Nav */}
        <button
          onClick={openCart}
          className="flex flex-col items-center gap-1 py-1 px-3 relative text-neutral-400 hover:text-white transition-all duration-200"
          aria-label="Open cart drawer"
        >
          <div className="relative">
            <ShoppingBag size={20} className="stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">
            Cart
          </span>
        </button>
      </div>
    </nav>
  );
};
