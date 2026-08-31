import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LoadingScreen } from './components/ui/LoadingScreen';

// Storefront Pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Shop = lazy(() => import('./pages/Shop').then(m => ({ default: m.Shop })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then(m => ({ default: m.ProductDetails })));
const Wishlist = lazy(() => import('./pages/Wishlist').then(m => ({ default: m.Wishlist })));
const Cart = lazy(() => import('./pages/Cart').then(m => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess').then(m => ({ default: m.OrderSuccess })));
const Account = lazy(() => import('./pages/Account').then(m => ({ default: m.Account })));
const Orders = lazy(() => import('./pages/Orders').then(m => ({ default: m.Orders })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const SignUp = lazy(() => import('./pages/SignUp').then(m => ({ default: m.SignUp })));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import('./pages/ResetPassword').then(m => ({ default: m.ResetPassword })));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail').then(m => ({ default: m.VerifyEmail })));
const VerifyPhone = lazy(() => import('./pages/VerifyPhone').then(m => ({ default: m.VerifyPhone })));
const Compare = lazy(() => import('./pages/Compare').then(m => ({ default: m.Compare })));
const Support = lazy(() => import('./pages/Support').then(m => ({ default: m.Support })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const Rewards = lazy(() => import('./pages/Rewards').then(m => ({ default: m.Rewards })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Admin Control Center Pages
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts').then(m => ({ default: m.AdminProducts })));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders').then(m => ({ default: m.AdminOrders })));
const AdminInventory = lazy(() => import('./pages/admin/AdminInventory').then(m => ({ default: m.AdminInventory })));
const AdminCustomers = lazy(() => import('./pages/admin/AdminCustomers').then(m => ({ default: m.AdminCustomers })));
const AdminCoupons = lazy(() => import('./pages/admin/AdminCoupons').then(m => ({ default: m.AdminCoupons })));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics').then(m => ({ default: m.AdminAnalytics })));

// Seller / Vendor Portal Pages
const SellerLayout = lazy(() => import('./pages/seller/SellerLayout').then(m => ({ default: m.SellerLayout })));
const SellerDashboard = lazy(() => import('./pages/seller/SellerDashboard').then(m => ({ default: m.SellerDashboard })));
const SellerProducts = lazy(() => import('./pages/seller/SellerProducts').then(m => ({ default: m.SellerProducts })));
const SellerOrders = lazy(() => import('./pages/seller/SellerOrders').then(m => ({ default: m.SellerOrders })));
const SellerWallet = lazy(() => import('./pages/seller/SellerWallet').then(m => ({ default: m.SellerWallet })));

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* PUBLIC STOREFRONT & CUSTOMER PORTAL */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="account" element={<Account />} />
          <Route path="orders" element={<Orders />} />
          <Route path="compare" element={<Compare />} />
          <Route path="support" element={<Support />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="verify-phone" element={<VerifyPhone />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ADMIN CONTROL CENTER */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* SELLER / VENDOR PORTAL */}
        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<SellerDashboard />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="wallet" element={<SellerWallet />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;



