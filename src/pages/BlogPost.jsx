import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { products } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { Clock, ArrowLeft, Share2, Sparkles } from 'lucide-react';

export const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id) || blogPosts[0];

  const relatedProducts = products.filter(p => post.relatedProductIds?.includes(p.id));

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back to Journal
        </Link>

        {/* Title Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {post.category}
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pb-6 border-b border-neutral-800 text-xs text-neutral-400">
            <div className="flex items-center gap-3">
              <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/40" />
              <div>
                <div className="font-bold text-white">{post.author}</div>
                <div className="text-[11px] text-neutral-400">{post.authorRole} � {post.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <Clock size={14} /> {post.readTime}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
          <img src={post.coverImage} alt={post.title} className="w-full h-auto max-h-[480px] object-cover" />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-neutral-300 leading-relaxed text-sm sm:text-base space-y-6">
          <p className="text-lg font-medium text-purple-200/90 leading-relaxed italic">
            "{post.excerpt}"
          </p>
          <div className="whitespace-pre-line">
            {post.content}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-neutral-800">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs bg-neutral-900 text-neutral-400 border border-neutral-800">
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Showcase Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 space-y-6">
            <h3 className="font-heading text-xl font-bold text-white">Curated Products Mentioned</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
