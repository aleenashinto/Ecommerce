import React, { useState } from "react";
import { RotateCw, X, MoveHorizontal } from "lucide-react";

export const Product360View = ({ product, isOpen, onClose }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  if (!isOpen) return null;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation(prev => (prev + delta * 0.8 + 360) % 360);
    setStartX(e.clientX);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-xl animate-in fade-in">
      <div className="w-full max-w-xl bg-neutral-900 border border-purple-500/30 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-2xl relative text-center">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <RotateCw size={18} className="text-purple-400 animate-spin" />
            <h3 className="font-heading text-base font-bold text-white">Interactive 360° Studio View</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-neutral-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          className="relative aspect-square rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          <img
            src={product?.image}
            alt={product?.name}
            style={{
              transform: `rotateY(${rotation}deg) scale(1.05)`,
              filter: "drop-shadow(0px 20px 30px rgba(168, 85, 247, 0.25))"
            }}
            className="w-4/5 h-4/5 object-contain transition-transform duration-75"
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-[11px] font-semibold text-purple-300 backdrop-blur-md flex items-center gap-1.5 pointer-events-none">
            <MoveHorizontal size={14} /> Drag horizontally to rotate • {Math.round(rotation)}°
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full accent-purple-500 bg-neutral-950 h-2 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] text-neutral-400 block">Precision CNC High-Resolution Photogrammetry Mesh</span>
        </div>
      </div>
    </div>
  );
};