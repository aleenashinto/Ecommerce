import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="py-24 max-w-xl mx-auto px-4 text-center">
      <div className="font-heading text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
        404
      </div>
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
        Looks like this page went somewhere else.
      </h1>
      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-8">
        The luxury destination you are trying to reach does not exist or may have been relocated.
      </p>
      <Link
        to="/"
        className="px-8 py-3.5 rounded-full bg-white hover:bg-purple-300 text-neutral-950 font-bold text-xs inline-flex items-center gap-2 transition-colors"
      >
        <Compass size={16} /> Return to Homepage
      </Link>
    </div>
  );
};
