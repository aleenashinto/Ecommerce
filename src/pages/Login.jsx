import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldAlert, 
  Smartphone, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/account';

  const { 
    login, 
    loginWithOTP, 
    loginWithOAuth, 
    verify2FALogin,
    isLockedOut, 
    lockoutEndTime,
    failedAttempts
  } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  const [mode, setMode] = useState('password'); // 'password' | 'otp'
  const [email, setEmail] = useState('jane.anderson@example.com');
  const [password, setPassword] = useState('AuraSecret2026!');
  const [phoneOrEmail, setPhoneOrEmail] = useState('+1 (555) 234-5678');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [show2FAChallenge, setShow2FAChallenge] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  // Lockout countdown timer
  useEffect(() => {
    let interval;
    if (isLockedOut && lockoutEndTime) {
      interval = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((lockoutEndTime - Date.now()) / 1000));
        setLockoutRemaining(remaining);
        if (remaining <= 0) {
          clearInterval(interval);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isLockedOut, lockoutEndTime]);

  // Standard Password Login
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'password') {
      const res = login(email, password, rememberMe);
      if (res.requires2FA) {
        setShow2FAChallenge(true);
        addToast('2FA Required: Enter code from Authenticator App', 'info');
      } else if (res.success) {
        addToast('Welcome back to AuraStore!', 'success');
        navigate(from, { replace: true });
      } else {
        setErrorMessage(res.error);
      }
    } else {
      // OTP mode submit
      const res = loginWithOTP(phoneOrEmail, otpCode);
      if (res.success) {
        addToast('Signed in successfully via OTP!', 'success');
        navigate(from, { replace: true });
      } else {
        setErrorMessage(res.error);
      }
    }
  };

  // 2FA Challenge Submit
  const handle2FASubmit = (e) => {
    e.preventDefault();
    const res = verify2FALogin(twoFactorCode);
    if (res.success) {
      addToast('Two-Factor Authentication verified!', 'success');
      navigate(from, { replace: true });
    } else {
      setErrorMessage(res.error);
    }
  };

  const handleSendOTP = () => {
    if (!phoneOrEmail.trim()) {
      setErrorMessage('Please enter an email or mobile phone number');
      return;
    }
    setOtpSent(true);
    setOtpCode('123456'); // Pre-fill for instant demo testing
    addToast(`Verification code dispatched to ${phoneOrEmail}. Demo code: 123456`, 'info');
  };

  const handleOAuth = (provider) => {
    loginWithOAuth(provider);
    addToast(`Signed in with ${provider === 'google' ? 'Google' : 'Apple'} successfully!`, 'success');
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-0.5 shadow-xl">
              <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
                <Sparkles size={20} className="text-purple-400" />
              </div>
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-white">
              Aura<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Store</span>
            </span>
          </Link>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Client Authentication
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Access your curated luxury dashboard and order ledger.
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8 rounded-[32px] bg-neutral-900/80 border border-purple-500/20 shadow-2xl backdrop-blur-2xl">
          
          {/* Security Lockout Banner if triggered */}
          {isLockedOut && lockoutRemaining > 0 && (
            <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs mb-6 flex items-start gap-3">
              <ShieldAlert size={20} className="shrink-0 text-rose-400 mt-0.5" />
              <div>
                <strong className="block font-bold">Account Security Lockout Active</strong>
                <span>Multiple incorrect password attempts. Please wait <strong>{lockoutRemaining}s</strong> before retrying.</span>
              </div>
            </div>
          )}

          {/* 2FA Challenge Screen */}
          {show2FAChallenge ? (
            <form onSubmit={handle2FASubmit} className="space-y-5">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
                  <Lock size={22} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">2-Factor Authentication</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Enter the 6-digit TOTP code from your authenticator app or backup code.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Authenticator Code
                </label>
                <input
                  type="text"
                  maxLength="9"
                  placeholder="123456"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center font-mono text-lg tracking-widest text-white focus:outline-none focus:border-purple-500"
                  required
                />
                <span className="text-[11px] text-neutral-500 block text-center mt-2">Demo 2FA code: <strong>123456</strong> or any 6 digits</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2"
              >
                Verify & Sign In <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => setShow2FAChallenge(false)}
                className="w-full text-center text-xs text-neutral-500 hover:text-white"
              >
                Back to Password Login
              </button>
            </form>
          ) : (
            <>
              {/* Mode Toggle Pills (Password vs OTP) */}
              <div className="flex rounded-2xl bg-neutral-950 p-1 mb-6 border border-neutral-800">
                <button
                  type="button"
                  onClick={() => { setMode('password'); setErrorMessage(''); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                    mode === 'password' ? 'bg-purple-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Password Login
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('otp'); setErrorMessage(''); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                    mode === 'otp' ? 'bg-purple-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  OTP / SMS Magic Code
                </button>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs mb-5 flex items-center gap-2">
                  <AlertTriangle size={15} className="shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'password' ? (
                  <>
                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          disabled={isLockedOut && lockoutRemaining > 0}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-11 pl-10 pr-4 text-xs rounded-2xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
                        />
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                          Password
                        </label>
                        <Link to="/forgot-password" className="text-[11px] text-purple-400 hover:text-purple-300 hover:underline">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          disabled={isLockedOut && lockoutRemaining > 0}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-11 pl-10 pr-10 text-xs rounded-2xl bg-neutral-950 border border-neutral-800 text-white font-mono focus:outline-none focus:border-purple-500 disabled:opacity-50"
                        />
                        <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded border-neutral-700 bg-neutral-950 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-xs text-neutral-300">Remember me on this machine</span>
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Phone or Email for OTP */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                        Phone or Email for OTP
                      </label>
                      <div className="relative flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="+1 (555) 000-0000 or email"
                          value={phoneOrEmail}
                          onChange={(e) => setPhoneOrEmail(e.target.value)}
                          className="flex-1 h-11 pl-10 pr-4 text-xs rounded-2xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                        />
                        <Smartphone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          className="px-4 h-11 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white whitespace-nowrap"
                        >
                          {otpSent ? 'Resend' : 'Send Code'}
                        </button>
                      </div>
                    </div>

                    {otpSent && (
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                          6-Digit Verification Code
                        </label>
                        <input
                          type="text"
                          maxLength="6"
                          placeholder="123456"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="w-full h-11 px-4 text-center font-mono text-base tracking-widest rounded-2xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                        />
                        <span className="text-[11px] text-emerald-400 block text-center mt-1">Demo code auto-populated: 123456</span>
                      </div>
                    )}
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLockedOut && lockoutRemaining > 0}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl shadow-purple-950/50 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
                >
                  <Lock size={14} /> Sign In to AuraStore
                </button>
              </form>

              {/* Social Login Separator */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-800" />
                </div>
                <span className="relative bg-neutral-900 px-3 text-[11px] uppercase tracking-wider text-neutral-500">
                  Or continue with
                </span>
              </div>

              {/* Google & Apple OAuth */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuth('google')}
                  className="h-11 rounded-2xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.56 0 2.97.55 4.07 1.45l3.05-3.05C17.27 1.69 14.8 1 12 1 7.42 1 3.55 3.58 1.63 7.35l3.68 2.85C6.18 7.37 8.84 5 12 5z"/><path fill="#4285F4" d="M23.49 12.28c0-.78-.07-1.53-.2-2.28H12v4.51h6.47c-.28 1.48-1.12 2.73-2.39 3.58l3.68 2.85c2.15-1.99 3.4-4.92 3.4-8.66z"/><path fill="#FBBC05" d="M5.31 14.8c-.24-.71-.38-1.47-.38-2.26s.14-1.55.38-2.26L1.63 7.35C.59 9.4 0 11.63 0 14s.59 4.6 1.63 6.65l3.68-2.85z"/><path fill="#34A853" d="M12 23c3.24 0 5.95-1.07 7.94-2.91l-3.68-2.85c-1.07.72-2.45 1.15-4.26 1.15-3.16 0-5.82-2.37-6.69-5.2L1.63 16.65C3.55 20.42 7.42 23 12 23z"/></svg>
                  Google
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuth('apple')}
                  className="h-11 rounded-2xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.65-.82 1.1-1.97.97-3.13-1 .04-2.22.68-2.91 1.49-.6.7-.97 1.83-.83 2.95 1.12.09 2.12-.5 2.77-1.31z"/></svg>
                  Apple ID
                </button>
              </div>
            </>
          )}

          {/* Registration Redirect */}
          <div className="mt-8 pt-6 border-t border-neutral-800 text-center text-xs text-neutral-400">
            Don't have an AuraStore profile?{' '}
            <Link to="/signup" className="text-purple-400 font-bold hover:text-purple-300 underline">
              Create VIP Account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
