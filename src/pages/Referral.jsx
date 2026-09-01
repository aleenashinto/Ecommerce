import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";
import { Gift, Copy, Check, Users, Sparkles, Award } from "lucide-react";

export const Referral = () => {
  const { user } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);
  const [copied, setCopied] = useState(false);

  const referralCode = user?.name ? user.name.replace(/\s+/g, "").toUpperCase() + "2026" : "AURA2026";
  const referralLink = `https://aurastore.io/ref/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    addToast("Referral link copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-purple-950 via-neutral-900 to-indigo-950 border border-purple-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center mx-auto shadow-xl shadow-purple-950/60">
          <Gift size={32} className="text-white" />
        </div>
        <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Aura Circle of Patrons</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">Give $25, Get $25</h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Invite fellow connoisseurs of fine design to AuraStore. When they make their first order, both of you receive a complimentary $25 store credit voucher.
        </p>

        <div className="max-w-md mx-auto pt-4 flex gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 h-12 px-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-white focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-5 h-12 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shrink-0"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-1">
          <Users size={24} className="text-purple-400 mx-auto mb-2" />
          <div className="font-heading text-2xl font-bold text-white">4 Friends</div>
          <p className="text-xs text-neutral-400">Successfully Joined</p>
        </div>

        <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-1">
          <Award size={24} className="text-emerald-400 mx-auto mb-2" />
          <div className="font-heading text-2xl font-bold text-emerald-400">$100.00</div>
          <p className="text-xs text-neutral-400">Total Credits Earned</p>
        </div>

        <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-1">
          <Sparkles size={24} className="text-pink-400 mx-auto mb-2" />
          <div className="font-heading text-2xl font-bold text-pink-300">$25.00</div>
          <p className="text-xs text-neutral-400">Pending Escrow Bonus</p>
        </div>
      </div>
    </div>
  );
};