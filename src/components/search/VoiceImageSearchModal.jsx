import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Camera, X, Search, Upload } from "lucide-react";

export const VoiceImageSearchModal = ({ isOpen, onClose, initialMode = "voice" }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");

  if (!isOpen) return null;

  const startVoice = () => {
    setIsListening(true);
    setRecognizedText("");
    setTimeout(() => {
      setRecognizedText("Titanium Obsidian ANC Headphones");
      setIsListening(false);
    }, 1800);
  };

  const handleApplyVoice = () => {
    if (recognizedText) {
      navigate(`/shop?search=${encodeURIComponent(recognizedText)}`);
      onClose();
    }
  };

  const handleSampleImage = (keyword) => {
    navigate(`/shop?search=${encodeURIComponent(keyword)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-xl animate-in fade-in">
      <div className="w-full max-w-md bg-neutral-900 border border-purple-500/30 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-2xl text-center relative">
        <button onClick={onClose} className="absolute top-5 right-5 p-1 rounded-full text-neutral-400 hover:text-white">
          <X size={18} />
        </button>

        <div className="flex justify-center">
          <div className="flex rounded-2xl bg-neutral-950 p-1 border border-neutral-800 text-xs">
            <button
              onClick={() => setMode("voice")}
              className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                mode === "voice" ? "bg-purple-600 text-white" : "text-neutral-400"
              }`}
            >
              <Mic size={14} /> Voice Search
            </button>
            <button
              onClick={() => setMode("image")}
              className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                mode === "image" ? "bg-purple-600 text-white" : "text-neutral-400"
              }`}
            >
              <Camera size={14} /> AI Visual Search
            </button>
          </div>
        </div>

        {mode === "voice" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-white">Natural Speech Search</h3>
              <p className="text-xs text-neutral-400">Say what you're looking for, such as "black watch" or "leather backpack"</p>
            </div>

            <button
              onClick={startVoice}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all ${
                isListening
                  ? "bg-rose-500 text-white shadow-xl shadow-rose-500/50 animate-pulse scale-110"
                  : "bg-gradient-to-tr from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-950/60 hover:scale-105"
              }`}
            >
              <Mic size={36} />
            </button>

            {isListening && <p className="text-xs text-purple-300 animate-pulse font-semibold">Listening to microphone...</p>}

            {recognizedText && (
              <div className="p-4 rounded-2xl bg-neutral-950 border border-purple-500/30 space-y-3">
                <span className="text-[10px] text-neutral-500 uppercase font-semibold">Recognized Query</span>
                <div className="font-bold text-white text-sm">"{recognizedText}"</div>
                <button
                  onClick={handleApplyVoice}
                  className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Search size={14} /> Search Catalog
                </button>
              </div>
            )}
          </div>
        )}

        {mode === "image" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-white">AI Visual Match</h3>
              <p className="text-xs text-neutral-400">Upload a photo to find aesthetically and technically similar items.</p>
            </div>

            <label className="border-2 border-dashed border-neutral-700 hover:border-purple-500 rounded-3xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-neutral-950/50">
              <Upload size={28} className="text-purple-400" />
              <span className="text-xs font-bold text-white">Upload Reference Photo</span>
              <span className="text-[10px] text-neutral-500">Supports PNG, JPG, WebP</span>
              <input type="file" accept="image/*" className="hidden" onChange={() => handleSampleImage("Watch")} />
            </label>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-neutral-500 block">Or Try Sample Visuals</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Headphones", q: "Audio" },
                  { label: "Timepiece", q: "Watch" },
                  { label: "Leather", q: "Leather" }
                ].map(s => (
                  <button
                    key={s.label}
                    onClick={() => handleSampleImage(s.q)}
                    className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white hover:border-purple-500/40 transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};