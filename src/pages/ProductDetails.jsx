import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useToastStore } from '../store/useToastStore';
import { Badge } from '../components/ui/Badge';
import { StarRating } from '../components/ui/StarRating';
import { ProductCard } from '../components/products/ProductCard';
import { FrequentlyBoughtTogether } from '../components/products/FrequentlyBoughtTogether';
import { Product360View } from '../components/products/Product360View';
import { SizeGuideModal } from '../components/products/SizeGuideModal';
import { ProductQA } from '../components/products/ProductQA';
import { 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ArrowLeft,
  Share2,
  Lock,
  MapPin,
  Play,
  ThumbsUp,
  MessageSquarePlus,
  RotateCw,
  Ruler,
  HelpCircle,
  CreditCard,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id, 10)) || products[0];

  const addToCart = useCartStore((state) => state.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const addToast = useToastStore((state) => state.addToast);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('Standard / M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'video' | 'qa' | 'shipping' | 'reviews'

  // 360 View & Size Guide Modals
  const [show360Modal, setShow360Modal] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Pincode estimator
  const [pincode, setPincode] = useState('94107');
  const [deliveryResult, setDeliveryResult] = useState('Express Courier: Delivery by Thursday, 2:00 PM');

  // Reviews & Helpful state
  const [helpfulVotes, setHelpfulVotes] = useState({ r1: 24, r2: 18, r3: 9 });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, author: 'Jane Anderson', text: '' });

  const sizes = ['Standard / M', 'Small / S', 'Large / L', 'Titanium 42mm', 'Titanium 45mm'];

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0].name : 'Standard');
      setQuantity(1);
      window.scrollTo(0, 0);

      // Track recently viewed in LocalStorage
      const viewed = JSON.parse(localStorage.getItem('aurastore_recent_viewed') || '[]');
      const updated = [product.id, ...viewed.filter(i => i !== product.id)].slice(0, 6);
      localStorage.setItem('aurastore_recent_viewed', JSON.stringify(updated));
    }
  }, [id, product]);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.trim().length >= 3) {
      setDeliveryResult(`Verified Pincode ${pincode}: Priority Air Express delivers by Thursday`);
      addToast('Delivery timeline confirmed!', 'success');
    }
  };

  const handleVote = (reviewKey) => {
    setHelpfulVotes(prev => ({ ...prev, [reviewKey]: prev[reviewKey] + 1 }));
    addToast('Thank you for your feedback!', 'info');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addToast('Review submitted for moderation! Thank you for sharing.', 'success');
    setShowReviewModal(false);
    setNewReview({ rating: 5, author: 'Jane Anderson', text: '' });
  };

  const isLiked = isInWishlist(product.id);
  const gallery = [
    product.image,
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  ];

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-white">Shop</Link>
          <span>/</span>
          <span className="text-purple-400">{product.category}</span>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Main Product Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Gallery with image zoom preview */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 relative group">
              <img
                src={gallery[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant={product.badge.toLowerCase()} />
                </div>
              )}

              {/* 360 Studio View Button */}
              <button
                onClick={() => setShow360Modal(true)}
                className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-neutral-900/80 hover:bg-purple-900/80 border border-purple-500/30 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg"
              >
                <RotateCw size={13} className="text-purple-400" />
                <span>360° Interactive View</span>
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx ? 'border-purple-500 shadow-md shadow-purple-950/50' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Purchase Action */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">{product.category}</span>
              <h1 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mt-3">
                <StarRating rating={product.rating} count={product.reviewsCount} />
                <span className="text-xs font-mono text-purple-400 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-md">
                  SKU: AUR-{product.id}-X26
                </span>
                <span className="text-xs font-semibold text-emerald-400">
                  ● In Stock ({product.stockCount || 25} available)
                </span>
              </div>
            </div>

            {/* Price & BNPL */}
            <div className="space-y-2 pb-6 border-b border-neutral-800">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-3xl font-bold text-white">${product.price}</span>
                {product.originalPrice && (
                  <span className="font-mono text-base text-neutral-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-950/30 border border-purple-800/40 p-2.5 rounded-xl">
                <CreditCard size={14} className="text-purple-400 shrink-0" />
                <span>Or <strong>${Math.round(product.price / 4)}/mo</strong> in 4 interest-free payments via <strong>Klarna / Afterpay</strong></span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">{product.description}</p>

            {/* Size Selector & Size Guide */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                  Select Configuration / Size: <strong className="text-white">{selectedSize}</strong>
                </label>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
                >
                  <Ruler size={13} /> Size & Fit Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedSize === s ? 'bg-purple-600 border-purple-500 text-white shadow-md' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-2xl bg-neutral-900 border border-neutral-800 p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white font-bold">-</button>
                  <span className="w-8 text-center text-xs font-bold text-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white font-bold">+</button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, quantity, selectedColor);
                    addToast(`Added ${quantity}x ${product.name} to cart!`, 'success');
                  }}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl shadow-purple-950/50 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} /> Add to Cart � ${product.price * quantity}
                </button>

                <button
                  onClick={() => {
                    toggleWishlist(product);
                    addToast(isLiked ? 'Removed from wishlist' : 'Saved to wishlist!', 'info');
                  }}
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                    isLiked ? 'bg-rose-500 border-rose-500 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Heart size={18} className={isLiked ? 'fill-white' : ''} />
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product, quantity, selectedColor);
                  navigate('/checkout');
                }}
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs shadow-xl flex items-center justify-center gap-2"
              >
                <Lock size={14} /> Instant Buy Now with Express Checkout
              </button>
            </div>

            {/* Pincode & Delivery Checker */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <MapPin size={15} className="text-purple-400" />
                <span>Delivery & Pincode Availability</span>
              </div>
              <form onSubmit={handlePincodeCheck} className="flex gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Enter 5/6-digit pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 h-9 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500 font-mono"
                />
                <button type="submit" className="px-3 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 font-semibold text-white">
                  Check
                </button>
              </form>
              {deliveryResult && (
                <span className="text-[11px] text-emerald-400 block pt-1 font-medium">? {deliveryResult}</span>
              )}
            </div>

          </div>

        </div>

        {/* Frequently Bought Together AI Bundle */}
        <FrequentlyBoughtTogether mainProduct={product} bundleProducts={relatedProducts} />

        {/* Tabbed Specifications, Video, Q&A, Shipping, Reviews */}
        <div className="p-6 sm:p-10 rounded-[32px] bg-neutral-900/60 border border-neutral-800 mb-16">
          <div className="flex items-center gap-6 border-b border-neutral-800 pb-4 mb-8 overflow-x-auto">
            {[
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'video', label: '4K Video Showcase' },
              { id: 'qa', label: 'Community Q&A' },
              { id: 'shipping', label: 'Shipping & White-Glove Care' },
              { id: 'reviews', label: `Client Reviews (${product.reviewsCount})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-heading text-xs sm:text-sm font-bold uppercase tracking-wider pb-2 relative transition-colors shrink-0 ${
                  activeTab === tab.id ? 'text-white border-b-2 border-purple-500' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              {product.features?.map((f, i) => (
                <div key={i} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5 text-xs text-neutral-200">
                  <Check size={14} className="text-purple-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'video' && (
            <div className="max-w-3xl rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto shadow-xl">
                <Play size={26} className="ml-1" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Cinematic 4K Product Showcase</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Watch the acoustic teardown and precision CNC engineering craftsmanship.
              </p>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="max-w-3xl">
              <ProductQA />
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 max-w-2xl text-xs text-neutral-300 leading-relaxed">
              <p>● <strong>Express Worldwide Courier:</strong> Dispatched from SF and London hubs within 24 hours.</p>
              <p>● <strong>Aura Care 30-Day Guarantee:</strong> Complimentary return pickup with full instant refund.</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-3xl">
              
              {/* AI Review Summary Consensus Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/30 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-purple-300 font-bold">
                  <Sparkles size={14} className="text-purple-400" />
                  <span>🤖 AI Review Consensus & Sentiment Analysis</span>
                </div>
                <p className="text-neutral-300 leading-relaxed text-[11px]">
                  <strong>98% Positive Sentiment:</strong> Clients consistently praise the acoustic soundstage depth, titanium chassis featherlight build, and seamless Bluetooth multipoint connectivity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-3xl bg-neutral-950 border border-neutral-800 gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold font-heading text-white">{product.rating}</div>
                  <div>
                    <StarRating rating={product.rating} />
                    <div className="text-[11px] text-neutral-400 mt-0.5">Based on {product.reviewsCount} verified clients</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md self-start flex items-center gap-1.5"
                >
                  <MessageSquarePlus size={14} /> Write a Review
                </button>
              </div>

              {/* Sample Reviews with Helpful Voting */}
              <div className="space-y-4">
                {[
                  { id: 'r1', author: 'Marcus Vance', role: 'Verified Client', date: 'Aug 24, 2026', text: 'Unbelievable acoustic staging. The Grade-5 titanium chassis feels incredible in the hands.' },
                  { id: 'r2', author: 'Elena Rostova', role: 'VIP Obsidian', date: 'Aug 19, 2026', text: 'Arrived in bespoke anti-static packaging in 2 days. The craftsmanship surpasses high-end Swiss timepieces.' }
                ].map(r => (
                  <div key={r.id} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{r.author}</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/20 text-purple-300">{r.role}</span>
                      </div>
                      <span className="text-neutral-500 text-[11px]">{r.date}</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed">{r.text}</p>
                    <div className="pt-2 flex items-center gap-2 text-neutral-400">
                      <button onClick={() => handleVote(r.id)} className="hover:text-purple-400 flex items-center gap-1">
                        <ThumbsUp size={12} /> Helpful ({helpfulVotes[r.id] || 12})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-white">Complementary Luxury Essentials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 360 Studio View Modal */}
      <Product360View product={product} isOpen={show360Modal} onClose={() => setShow360Modal(false)} />

      {/* Size & Fit Guide Modal */}
      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-neutral-900 border border-purple-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-heading text-base font-bold text-white">Share Client Experience</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-neutral-400 hover:text-white"><X size={16} /></button>
            </div>
            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Your Rating (1-5)</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
                >
                  <option value={5}>????? (5 Stars - Masterpiece)</option>
                  <option value={4}>????? (4 Stars - Great Quality)</option>
                  <option value={3}>????? (3 Stars - Average)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Written Review</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Share details on texture, acoustic staging, battery..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
                />
              </div>

              <button type="submit" className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg">
                Publish Client Review
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
