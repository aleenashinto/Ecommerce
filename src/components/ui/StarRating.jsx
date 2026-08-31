import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 5, reviews = null, size = 14, className = "" }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5 text-amber-400">
        {[...Array(5)].map((_, i) => {
          const isFull = i < fullStars;
          const isHalf = i === fullStars && hasHalf;
          return (
            <Star
              key={i}
              size={size}
              className={`${isFull ? "fill-amber-400 text-amber-400" : isHalf ? "fill-amber-400/50 text-amber-400" : "fill-neutral-700 text-neutral-600"}`}
            />
          );
        })}
      </div>
      <span className="text-xs font-semibold text-neutral-300 dark:text-neutral-300">
        {rating.toFixed(1)}
      </span>
      {reviews !== null && (
        <span className="text-xs text-neutral-500">
          ({reviews})
        </span>
      )}
    </div>
  );
};
