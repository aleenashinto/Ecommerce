import React, { useState } from "react";
import { Gift, Sparkles, ArrowRight } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useToastStore } from "../store/useToastStore";

export const GiftCards = () => {
  const { addItem } = useCartStore();
  const addToast = useToastStore((state) => state.addToast);

  const [selectedAmount, setSelectedAmount] = useState(100);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [customNote, setCustomNote] = useState("");

  const amounts = [50, 100, 250, 500, 1000];

  const handleAddToCart = (e) => {
    e.preventDefault();
    const giftCardItem = {
      id: 99900 + selectedAmount,
      name: `Aura Premier Digital Gift Card ($${selectedAmount})`,
      price: selectedAmount,
      category: "Gift Cards",
      image: "https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=500&q=80",
      stock: 999
    };
    addItem(giftCardItem, 1, `For: ${recipientName || "Valued Recipient"}`);
    addToast(`Added $${selectedAmount} Gift Card to your bag!`, "success");
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Bespoke Gifting</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">The Aura Digital Gift Card</h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          Delivered instantaneously via encrypted digital envelope with customized wax seal typography.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6 sticky top-28">
          <div className="aspect-[1.6/1] rounded-3xl bg-gradient-to-tr from-purple-950 via-neutral-900 to-indigo-900 border border-purple-500/40 p-6 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-heading text-lg font-bold block">AuraStore</span>
                <span className="text-[10px] text-purple-300 font-mono tracking-wider uppercase">Patron Gift Vault</span>
              </div>
              <Sparkles size={20} className="text-purple-300" />
            </div>

            <div className="font-mono text-3xl font-bold tracking-tight text-white">
              ${selectedAmount}.00
            </div>

            <div className="flex justify-between items-end text-[11px] text-neutral-300">
              <div>
                <span className="text-[9px] text-neutral-500 uppercase block">Recipient</span>
                <span className="font-semibold text-white">{recipientName || "Jane Anderson"}</span>
              </div>
              <div className="font-mono text-[10px] text-purple-400">NO EXPIRY DATE</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddToCart} className="lg:col-span-7 p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">1. Select Card Denomination</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {amounts.map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-3 rounded-2xl border text-xs font-bold font-mono transition-all ${
                    selectedAmount === amt
                      ? "bg-purple-600 border-purple-500 text-white shadow-md"
                      : "bg-neutral-950 border-neutral-800 text-neutral-300 hover:text-white"
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-neutral-800 text-xs">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">2. Recipient Information</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Recipient Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="marcus@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Personal Message</label>
              <textarea
                rows="3"
                placeholder="Wishing you unforgettable moments with AuraStore..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2"
          >
            Add Gift Card to Bag • ${selectedAmount}.00 <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};