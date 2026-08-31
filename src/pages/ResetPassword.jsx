import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { Sparkles, KeyRound, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const addToast = useToastStore((state) => state.addToast);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    resetPassword(password);
    addToast('Your password has been successfully updated!', 'success');
    navigate('/login');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 relative">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shadow-xl">
              <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
                <Sparkles size={20} className="text-purple-400" />
              </div>
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-white">
              Aura<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Store</span>
            </span>
          </Link>

          <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
            Create New Password
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Choose a strong passkey with numbers and special symbols.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-neutral-900/80 border border-purple-500/20 shadow-2xl backdrop-blur-2xl">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="������������"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 text-xs rounded-2xl bg-neutral-950 border border-neutral-800 text-white font-mono focus:outline-none focus:border-purple-500"
                />
                <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="������������"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 text-xs rounded-2xl bg-neutral-950 border border-neutral-800 text-white font-mono focus:outline-none focus:border-purple-500"
                />
                <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2 mt-2"
            >
              Update Password & Sign In <ArrowRight size={14} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
