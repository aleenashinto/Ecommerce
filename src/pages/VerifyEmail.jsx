import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { Sparkles, Mail, CheckCircle2, ArrowRight, RotateCw } from 'lucide-react';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const { user, verifyEmailCode } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  const [digits, setDigits] = useState(['1', '2', '3', '4', '5', '6']); // Pre-filled for effortless demo
  const [timer, setTimer] = useState(45);
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = digits.join('');
    const res = verifyEmailCode(code);
    if (res.success) {
      addToast('Email verified successfully!', 'success');
      navigate('/account');
    } else {
      setError(res.error);
    }
  };

  const handleResend = () => {
    setTimer(60);
    addToast('New verification code sent to ' + (user?.email || 'your email'), 'info');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 relative">
      <div className="w-full max-w-md text-center">
        
        <Link to="/" className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shadow-xl">
            <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
              <Sparkles size={20} className="text-purple-400" />
            </div>
          </div>
          <span className="font-heading text-2xl font-bold tracking-tight text-white">
            Aura<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Store</span>
          </span>
        </Link>

        <div className="p-8 rounded-[32px] bg-neutral-900/80 border border-purple-500/20 shadow-2xl backdrop-blur-2xl">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center mx-auto mb-4">
            <Mail size={26} />
          </div>

          <h2 className="font-heading text-2xl font-bold text-white mb-1">
            Verify Email Address
          </h2>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-6">
            We sent a 6-digit verification code to <strong className="text-neutral-200">{user?.email || 'your email'}</strong>
          </p>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            {/* 6 Digit Input Boxes */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {digits.map((digit, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className="w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-lg font-bold rounded-2xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2"
            >
              Verify Email <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span>Didn't receive code?</span>
            {timer > 0 ? (
              <span className="text-neutral-500 font-mono">Resend in {timer}s</span>
            ) : (
              <button
                onClick={handleResend}
                className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
              >
                <RotateCw size={12} /> Resend Code
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
