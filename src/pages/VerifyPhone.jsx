import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { Sparkles, Smartphone, CheckCircle2, ArrowRight, RotateCw } from 'lucide-react';

export const VerifyPhone = () => {
  const navigate = useNavigate();
  const { user, verifyPhoneCode } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  const [digits, setDigits] = useState(['1', '2', '3', '4', '5', '6']);
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

    if (value && index < 5) {
      document.getElementById(`sms-code-${index + 1}`)?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = digits.join('');
    const res = verifyPhoneCode(code);
    if (res.success) {
      addToast('Phone number verified for SMS alerts!', 'success');
      navigate('/account');
    } else {
      setError(res.error);
    }
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
            <Smartphone size={26} />
          </div>

          <h2 className="font-heading text-2xl font-bold text-white mb-1">
            Verify Mobile Phone
          </h2>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-6">
            We sent an SMS security pin to <strong className="text-neutral-200">{user?.phone || '+1 (555) 234-5678'}</strong>
          </p>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2 sm:gap-3">
              {digits.map((digit, i) => (
                <input
                  key={i}
                  id={`sms-code-${i}`}
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
              Confirm Phone <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span>Didn't receive SMS?</span>
            {timer > 0 ? (
              <span className="text-neutral-500 font-mono">Resend in {timer}s</span>
            ) : (
              <button
                onClick={() => { setTimer(60); addToast('SMS resent!', 'info'); }}
                className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
              >
                <RotateCw size={12} /> Resend SMS
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
