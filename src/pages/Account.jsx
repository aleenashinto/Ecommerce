import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useOrdersStore } from '../store/useOrdersStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useToastStore } from '../store/useToastStore';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  KeyRound, 
  Smartphone, 
  Mail, 
  Laptop, 
  Trash2, 
  LogOut, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  QrCode, 
  RefreshCw,
  X,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Account = () => {
  const navigate = useNavigate();
  const { 
    user, 
    isAuthenticated, 
    logout, 
    sessions, 
    revokeSession, 
    revokeAllSessions,
    changePassword,
    toggle2FA,
    twoFactorSecret,
    backupCodes,
    deleteAccount
  } = useAuthStore();

  const orders = useOrdersStore((state) => state.orders);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const addToast = useToastStore((state) => state.addToast);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'security' | 'sessions' | 'danger'
  
  // Change Password State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');

  // 2FA Setup Modal State
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [totpInput, setTotpInput] = useState('123456'); // Pre-fill for instant demo
  const [twoFaError, setTwoFaError] = useState('');

  // Delete Account Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePass, setDeletePass] = useState('');
  const [deleteError, setDeleteError] = useState('');

  if (!isAuthenticated || !user) {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4">
          <User size={28} />
        </div>
        <h2 className="font-heading text-2xl font-bold text-white mb-2">Sign In Required</h2>
        <p className="text-xs text-neutral-400 mb-6">Please sign in to access your client dashboard and order history.</p>
        <Link to="/login" className="px-8 py-3 rounded-full bg-white text-neutral-950 font-bold text-xs">
          Sign In
        </Link>
      </div>
    );
  }

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassError('');

    if (newPass.length < 6) {
      setPassError('New password must be at least 6 characters');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('New passwords do not match');
      return;
    }

    const res = changePassword(currentPass, newPass);
    if (res.success) {
      addToast('Password updated successfully!', 'success');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } else {
      setPassError(res.error);
    }
  };

  const handle2FAToggle = (enable) => {
    if (enable) {
      setShow2FAModal(true);
    } else {
      toggle2FA(false);
      addToast('Two-Factor Authentication disabled.', 'info');
    }
  };

  const handleConfirm2FA = (e) => {
    e.preventDefault();
    const res = toggle2FA(true, totpInput);
    if (res.success) {
      addToast('2FA Authenticator activated on your account!', 'success');
      setShow2FAModal(false);
    } else {
      setTwoFaError(res.error);
    }
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    const res = deleteAccount(deletePass);
    if (res.success) {
      addToast('Your account data has been completely erased.', 'info');
      navigate('/');
    } else {
      setDeleteError(res.error);
    }
  };

  const handleLogout = () => {
    logout();
    addToast('Signed out of AuraStore successfully', 'info');
    navigate('/login');
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Banner */}
        <div className="p-6 sm:p-10 rounded-[32px] bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-purple-950/30 border border-purple-500/20 shadow-2xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-18 h-18 rounded-2xl object-cover ring-2 ring-purple-500/40 shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                  {user.tier}
                </span>
                {user.twoFactorEnabled && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck size={12} /> 2FA Active
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Member since {user.joinedDate} � {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-4 mb-8 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Profile', icon: User },
            { id: 'security', label: 'Security & 2FA', icon: ShieldCheck },
            { id: 'sessions', label: `Login History (${sessions.length})`, icon: Laptop },
            { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, danger: true }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all shrink-0 ${
                activeTab === tab.id
                  ? tab.danger 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-white text-neutral-950 shadow-md'
                  : 'bg-neutral-900/60 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Link to="/orders" className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/40 transition-colors flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package size={22} />
                </div>
                <div>
                  <div className="font-heading text-2xl font-bold text-white">{orders.length}</div>
                  <div className="text-xs text-neutral-400 font-medium">Completed Orders</div>
                </div>
              </Link>

              <Link to="/wishlist" className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/40 transition-colors flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart size={22} />
                </div>
                <div>
                  <div className="font-heading text-2xl font-bold text-white">{wishlistCount}</div>
                  <div className="text-xs text-neutral-400 font-medium">Saved in Wishlist</div>
                </div>
              </Link>

              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <Sparkles size={22} />
                </div>
                <div>
                  <div className="font-heading text-2xl font-bold text-white">{user.points}</div>
                  <div className="text-xs text-neutral-400 font-medium">Aura Loyalty Points</div>
                </div>
              </div>
            </div>

            {/* Saved Addresses & Payment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-purple-400" />
                    <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Primary Shipping Address</h3>
                  </div>
                  <span className="text-[10px] text-purple-400 font-semibold">Default</span>
                </div>
                <div className="text-xs text-neutral-300 space-y-1">
                  <div className="font-semibold text-white">{user.name}</div>
                  <div>742 Evergreen Terrace, Suite 400</div>
                  <div>San Francisco, CA 94107, United States</div>
                  <div className="text-neutral-500 pt-1">{user.phone}</div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-purple-400" />
                    <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Saved Payment Vault</h3>
                  </div>
                  <span className="text-[10px] text-purple-400 font-semibold">Default</span>
                </div>
                <div className="text-xs text-neutral-300 space-y-1">
                  <div className="font-semibold text-white">Visa Signature Ending in 4242</div>
                  <div className="text-neutral-500">Expires 12/28 � Tokenized SAQ-A Vault</div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold pt-1">
                    <ShieldCheck size={14} /> 256-Bit Hardware Encrypted
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SECURITY & 2FA */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 2FA & Verifications */}
            <div className="space-y-6">
              
              {/* Two-Factor Authentication Box */}
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                      <Lock size={18} />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-bold text-white">Two-Factor Authentication (2FA)</h3>
                      <p className="text-[11px] text-neutral-400">Protect your orders with TOTP authenticator codes</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handle2FAToggle(!user.twoFactorEnabled)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                      user.twoFactorEnabled
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                        : 'bg-emerald-500 text-neutral-950 hover:bg-emerald-400'
                    }`}
                  >
                    {user.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
                </div>

                {user.twoFactorEnabled && (
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-300">Backup Emergency Codes:</span>
                      <span className="text-[10px] text-neutral-500 font-mono">5 Unused</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-purple-300 bg-neutral-900/80 p-2.5 rounded-xl">
                      {backupCodes.map((code, i) => (
                        <span key={i}>� {code}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Email & Phone Verification Status Cards */}
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                  Contact Identity Verifications
                </h3>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-purple-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">{user.email}</div>
                      <div className="text-[10px] text-neutral-400">Primary Notifications</div>
                    </div>
                  </div>
                  {user.emailVerified ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  ) : (
                    <Link to="/verify-email" className="px-3 py-1 rounded-full text-[10px] font-bold bg-purple-600 text-white">
                      Verify Now
                    </Link>
                  )}
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <Smartphone size={16} className="text-purple-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">{user.phone}</div>
                      <div className="text-[10px] text-neutral-400">Courier SMS Telemetry</div>
                    </div>
                  </div>
                  {user.phoneVerified ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  ) : (
                    <Link to="/verify-phone" className="px-3 py-1 rounded-full text-[10px] font-bold bg-purple-600 text-white">
                      Verify Now
                    </Link>
                  )}
                </div>
              </div>

            </div>

            {/* Change Password Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2">
                <KeyRound size={16} className="text-purple-400" />
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Change Password</h3>
              </div>

              {passError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                  {passError}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Current Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password (demo: AuraSecret2026!)"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 6 characters"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm new password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl transition-all active:scale-98 mt-2"
                >
                  Save New Password
                </button>
              </form>
            </div>

          </div>
        )}

        {/* TAB 3: LOGIN HISTORY & SESSIONS */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Active Device Sessions & Audit Trail</h3>
                <p className="text-xs text-neutral-400">View and revoke hardware access to your AuraStore client profile</p>
              </div>

              {sessions.length > 1 && (
                <button
                  onClick={() => {
                    revokeAllSessions();
                    addToast('Terminated all other active sessions', 'info');
                  }}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <LogOut size={13} /> Sign Out of All Other Devices
                </button>
              )}
            </div>

            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="p-5 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      session.current ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-neutral-950 text-neutral-500 border border-neutral-800'
                    }`}>
                      <Laptop size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-sm font-bold text-white">{session.device}</span>
                        {session.current && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            This Device (Active)
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5">
                        {session.browser} � <span className="font-mono">{session.ip}</span> � {session.location}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        Last Active: {session.lastActive}
                      </div>
                    </div>
                  </div>

                  {!session.current && (
                    <button
                      onClick={() => {
                        revokeSession(session.id);
                        addToast('Session revoked', 'info');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-950 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 border border-neutral-800 text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={13} /> Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DANGER ZONE */}
        {activeTab === 'danger' && (
          <div className="p-8 rounded-3xl bg-rose-950/20 border border-rose-500/30 space-y-6 max-w-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Permanent Account Deletion</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                  Permanently erase your VIP profile, saved addresses, biometric telemetry tokens, and loyalty points. This action cannot be undone.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xl transition-colors flex items-center gap-2"
            >
              <Trash2 size={14} /> Request Permanent Account Deletion
            </button>
          </div>
        )}

      </div>

      {/* 2FA SETUP MODAL */}
      <AnimatePresence>
        {show2FAModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShow2FAModal(false)}
              className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-neutral-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 z-10 space-y-6 shadow-2xl"
            >
              <button
                onClick={() => setShow2FAModal(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="text-center space-y-1">
                <h3 className="font-heading text-lg font-bold text-white">Enable Authenticator 2FA</h3>
                <p className="text-xs text-neutral-400">Scan this QR code using Google Authenticator, Authy, or 1Password</p>
              </div>

              {/* Simulated QR Box */}
              <div className="w-48 h-48 rounded-2xl bg-white p-3 mx-auto flex flex-col items-center justify-center shadow-xl">
                <div className="w-full h-full border-4 border-neutral-900 flex flex-col items-center justify-center p-2 text-center text-neutral-950 font-mono text-[10px]">
                  <QrCode size={90} className="mb-2 text-neutral-950" />
                  <span>AURA-AUTH-2026</span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-neutral-400 block mb-1">Or enter manual key:</span>
                <span className="font-mono text-xs font-bold text-purple-300 bg-neutral-950 px-3 py-1 rounded-lg border border-neutral-800">
                  {twoFactorSecret}
                </span>
              </div>

              {twoFaError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                  {twoFaError}
                </div>
              )}

              <form onSubmit={handleConfirm2FA} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Enter 6-Digit TOTP Confirmation Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength="6"
                    value={totpInput}
                    onChange={(e) => setTotpInput(e.target.value)}
                    className="w-full h-11 px-4 text-center font-mono text-base tracking-widest rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                  />
                  <span className="text-[10px] text-neutral-500 block text-center mt-1">Demo code auto-populated: 123456</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-xl"
                >
                  Confirm & Activate 2FA
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-neutral-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 z-10 space-y-6 shadow-2xl"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">Confirm Permanent Deletion</h3>
                <p className="text-xs text-neutral-400">
                  Please enter your account password to authorize total account deletion.
                </p>
              </div>

              {deleteError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                  {deleteError}
                </div>
              )}

              <form onSubmit={handleDeleteAccount} className="space-y-4">
                <div>
                  <input
                    type="password"
                    required
                    placeholder="Enter password to confirm (demo: AuraSecret2026!)"
                    value={deletePass}
                    onChange={(e) => setDeletePass(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono text-xs focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-3 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xl"
                  >
                    Confirm Delete
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
