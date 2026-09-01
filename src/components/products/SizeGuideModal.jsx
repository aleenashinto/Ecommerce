import React, { useState } from "react";
import { X, Ruler, CheckCircle } from "lucide-react";

export const SizeGuideModal = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState("cm");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-xl animate-in fade-in">
      <div className="w-full max-w-lg bg-neutral-900 border border-purple-500/30 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Ruler size={18} className="text-purple-400" />
            <h3 className="font-heading text-base font-bold text-white">Size & Fit Guide</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-neutral-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-400 font-semibold">Standard International Metric:</span>
          <div className="flex rounded-xl bg-neutral-950 p-1 border border-neutral-800">
            <button
              onClick={() => setUnit("cm")}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${unit === "cm" ? "bg-purple-600 text-white" : "text-neutral-400"}`}
            >
              Centimeters (cm)
            </button>
            <button
              onClick={() => setUnit("inches")}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${unit === "inches" ? "bg-purple-600 text-white" : "text-neutral-400"}`}
            >
              Inches (in)
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 text-[10px] uppercase font-bold bg-neutral-900/50">
                <th className="p-3">Size / Case</th>
                <th className="p-3">Wrist / Body Fit</th>
                <th className="p-3">Recommended For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              <tr>
                <td className="p-3 font-bold text-white">Small (S / 38mm)</td>
                <td className="p-3 font-mono">{unit === "cm" ? "13.0 - 15.5 cm" : "5.1 - 6.1 in"}</td>
                <td className="p-3">Slender / Tailored wrists</td>
              </tr>
              <tr className="bg-purple-500/5">
                <td className="p-3 font-bold text-purple-300">Standard (M / 42mm)</td>
                <td className="p-3 font-mono">{unit === "cm" ? "15.5 - 18.5 cm" : "6.1 - 7.3 in"}</td>
                <td className="p-3 text-purple-200">Universal Best Fit (92%)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Large (L / 45mm)</td>
                <td className="p-3 font-mono">{unit === "cm" ? "18.5 - 21.0 cm" : "7.3 - 8.3 in"}</td>
                <td className="p-3">Prominent / Bold wrist presence</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <CheckCircle size={14} /> Complimentary Tailoring Guarantee
          </div>
          <p className="text-neutral-400 text-[11px]">
            If the fit isn't 100% perfect, return within 30 days for an instant size swap with free prepaid shipping.
          </p>
        </div>
      </div>
    </div>
  );
};