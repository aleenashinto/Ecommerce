import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { Sparkles, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const Blog = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const categories = ['All', 'Audio & Acoustics', 'Horology', 'Workspace & Tech'];

  const filtered = blogPosts.filter(p => selectedCat === 'All' || p.category === selectedCat);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">House of Aura Journal</span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Essays on Modern Luxury, Design & Tech
          </h1>
          <p className="text-xs text-neutral-400 mt-2">
            Curated dispatches on acoustic engineering, Swiss mechanical movements, and minimalist architecture.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-colors ${
                selectedCat === c ? 'bg-purple-600 text-white shadow-lg' : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map(post => (
            <article
              key={post.id}
              className="rounded-3xl bg-neutral-900/60 border border-neutral-800 overflow-hidden hover:border-purple-500/40 transition-all flex flex-col group"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-neutral-950/80 text-purple-300 backdrop-blur-md border border-purple-500/20">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <Clock size={13} />
                    <span>{post.readTime}</span>
                    <span>�</span>
                    <span>{post.date}</span>
                  </div>

                  <h2 className="font-heading text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-full object-cover ring-1 ring-neutral-700" />
                    <span className="text-xs font-semibold text-neutral-300">{post.author}</span>
                  </div>

                  <Link
                    to={`/blog/${post.id}`}
                    className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    Read Essay <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
