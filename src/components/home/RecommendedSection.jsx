import React from 'react';
import { useRecommendations } from '../../hooks/useRecommendations';
import { ProductCard } from '../products/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RecommendedSection = () => {
  const recommendations = useRecommendations(null, 4);

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
              <Sparkles size={14} /> Personalized Picks
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Recommended For You
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-neutral-400 hover:text-purple-300 flex items-center gap-1.5 group transition-colors"
          >
            View all suggestions <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </section>
  );
};
