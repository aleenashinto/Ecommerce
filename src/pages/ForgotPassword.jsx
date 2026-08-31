import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToastStore } from '../store/useToastStore';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const addToast = useToastStore((state) => state.addToast);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      addToast(`Recovery dispatch sent to ${email}. Demo reset code is 123456`, 'info');
    }
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
            Account Recovery
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Enter your registered client email to receive a secure authorization link.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-neutral-900/80 border border-purple-500/20 shadow-2xl backdrop-blur-2xl">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Check Your Inbox</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We have dispatched password reset credentials to <strong className="text-neutral-200">{email}</strong>.
              </p>

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => navigate('/reset-password?token=demo-auth-token-123')}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2"
                >
                  Proceed to Reset Password <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full py-2.5 text-xs text-neutral-400 hover:text-white"
                >
                  Try another email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Client Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="jane.anderson@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 text-xs rounded-2xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                  />
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl shadow-purple-950/50 flex items-center justify-center gap-2"
              >
                Send Password Reset Link <ArrowRight size={14} />
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white">
                  <ArrowLeft size={13} /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
