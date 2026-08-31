import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { Sparkles, User, Mail, Smartphone, KeyRound, Eye, EyeOff, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export const SignUp = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const loginWithOAuth = useAuthStore((state) => state.loginWithOAuth);
  const addToast = useToastStore((state) => state.addToast);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    termsAgreed: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Password strength meter calculation
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(formData.password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-rose-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('A valid email address is required');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!formData.termsAgreed) {
      setError('Please accept the client terms and privacy charter');
      return;
    }

    signup(formData);
    addToast('Account created! Welcome to House of Aura.', 'success');
    navigate('/verify-email');
  };

  const handleOAuth = (provider) => {
    loginWithOAuth(provider);
    addToast(`Registered with ${provider === 'google' ? 'Google' : 'Apple'} successfully!`, 'success');
    navigate('/account');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
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
            Create Client Profile
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Unlock VIP tiers, private drop previews, and biometric telemetry.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-neutral-900/80 border border-purple-500/20 shadow-2xl backdrop-blur-2xl">
          
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 pl-10 pr-4 text-xs rounded-2xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                />
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 pl-10 pr-4 text-xs rounded-2xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                />
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Mobile Number (For Delivery Telemetry)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 pl-10 pr-4 text-xs rounded-2xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                />
                <Smartphone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="������������"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-11 pl-10 pr-10 text-xs rounded-2xl bg-neutral-950 border border-neutral-800 text-white font-mono focus:outline-none focus:border-purple-500"
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

              {/* Interactive Strength Meter */}
              {formData.password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-neutral-400">Password Strength</span>
                    <span className="font-bold text-neutral-200">{strengthLabels[strength - 1] || 'Very Weak'}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          strength >= step ? (strengthColors[strength - 1] || 'bg-neutral-700') : 'bg-neutral-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-400 leading-relaxed">
                <input
                  type="checkbox"
                  checked={formData.termsAgreed}
                  onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-neutral-700 bg-neutral-950 text-purple-600 focus:ring-purple-500"
                />
                <span>I agree to the AuraStore Terms of Luxury Service and 256-bit encrypted privacy policy.</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl shadow-purple-950/50 flex items-center justify-center gap-2 transition-all active:scale-98 mt-2"
            >
              Create Account <ArrowRight size={14} />
            </button>

          </form>

          {/* Social Sign Up */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800" />
            </div>
            <span className="relative bg-neutral-900 px-3 text-[11px] uppercase tracking-wider text-neutral-500">
              Or sign up with
            </span>
          </div>

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

          <div className="mt-8 pt-6 border-t border-neutral-800 text-center text-xs text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 font-bold hover:text-purple-300 underline">
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
