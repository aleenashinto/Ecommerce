import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';
import { ToastContainer } from '../ui/ToastContainer';
import { CartDrawer } from '../cart/CartDrawer';
import { QuickViewModal } from '../products/QuickViewModal';
import { AuraAIAssistant } from '../ai/AuraAIAssistant';
import { CompareFloatingBar } from '../ui/CompareFloatingBar';

export const Layout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-purple-500 selection:text-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <MobileNav />

      {/* Global Overlays & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <AuraAIAssistant />
      <CompareFloatingBar />
      <ToastContainer />
    </div>
  );
};

