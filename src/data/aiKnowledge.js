import { products } from './products';

export const quickPrompts = [
  { label: 'Find headphones', query: 'Find headphones' },
  { label: 'Best laptop under $2000', query: 'Best laptop under $2000' },
  { label: 'Gift ideas for creators', query: 'Gift ideas for creators' },
  { label: 'Best deals & flash sales', query: 'Best deals & flash sales' }
];

export const processAIQuery = (query) => {
  const q = query.toLowerCase().trim();
  
  // Audio / Headphones
  if (q.includes('headphone') || q.includes('audio') || q.includes('earbud') || q.includes('sound') || q.includes('music')) {
    const matched = products.filter(p => p.category === 'Audio');
    return {
      message: "Here are our top studio-grade acoustic and spatial audio recommendations:",
      products: matched.slice(0, 3),
      followUps: ["Compare ANC features", "Show audio under $200", "Add to wishlist"]
    };
  }

  // Laptops / Computers / Workstations
  if (q.includes('laptop') || q.includes('macbook') || q.includes('computer') || q.includes('workstation') || q.includes('pc')) {
    const matched = products.filter(p => p.category === 'Electronics' && (p.name.includes('Laptop') || p.name.includes('Luminary')));
    return {
      message: "For demanding workflows, engineering, and creative production, the Luminary M4 Pro is our flagship recommendation:",
      products: matched,
      followUps: ["View technical specifications", "Compare with AR Glasses", "Add to cart"]
    };
  }

  // Gifts / Curated
  if (q.includes('gift') || q.includes('present') || q.includes('recommend') || q.includes('ideas')) {
    const matched = products.filter(p => p.rating >= 4.8 && (p.badge || p.price < 250)).slice(0, 3);
    return {
      message: "Here are some of our most celebrated luxury gift selections loved by our community:",
      products: matched,
      followUps: ["Show items under $100", "Gifts for him", "Gifts for her"]
    };
  }

  // Deals / Sale / Discounts
  if (q.includes('deal') || q.includes('sale') || q.includes('discount') || q.includes('cheap') || q.includes('under')) {
    let maxPrice = 9999;
    const priceMatch = q.match(/under\s*\$?(\d+)/);
    if (priceMatch && priceMatch[1]) {
      maxPrice = parseInt(priceMatch[1], 10);
    }
    const matched = products.filter(p => (p.discount > 0 || p.badge === 'Sale') && p.price <= maxPrice).slice(0, 3);
    return {
      message: `I found these limited-time luxury promotions${maxPrice < 9999 ? ` under $${maxPrice}` : ''}:`,
      products: matched.length > 0 ? matched : products.slice(0, 3),
      followUps: ["Apply coupon code AURA20", "Show flash sales", "Sort by discount"]
    };
  }

  // Watches
  if (q.includes('watch') || q.includes('timepiece') || q.includes('chronograph')) {
    const matched = products.filter(p => p.category === 'Watches');
    return {
      message: "Here are our precision horology and titanium smart timepieces:",
      products: matched,
      followUps: ["Show titanium edition", "Explore classic leather watches"]
    };
  }

  // Gaming
  if (q.includes('game') || q.includes('gaming') || q.includes('keyboard') || q.includes('mouse') || q.includes('monitor')) {
    const matched = products.filter(p => p.category === 'Gaming');
    return {
      message: "Upgrade your battle station with our esports-grade hardware and QD-OLED displays:",
      products: matched.slice(0, 3),
      followUps: ["Mechanical keyboards", "Esports ultralight mice"]
    };
  }

  // Fashion & Wear
  if (q.includes('fashion') || q.includes('clothes') || q.includes('wear') || q.includes('sneaker') || q.includes('coat') || q.includes('jacket')) {
    const matched = products.filter(p => p.category === 'Fashion');
    return {
      message: "Discover our latest seasonal runway apparel and technical streetwear drops:",
      products: matched.slice(0, 3),
      followUps: ["View cashmere coat", "Explore sneakers", "Check size guide"]
    };
  }

  // General fallback / search matches
  const directMatches = products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.tags.some(t => t.includes(q)) || 
    p.category.toLowerCase().includes(q)
  );

  if (directMatches.length > 0) {
    return {
      message: `I found ${directMatches.length} item${directMatches.length > 1 ? 's' : ''} matching your inquiry:`,
      products: directMatches.slice(0, 3),
      followUps: ["View all matching items", "Check delivery timeframe"]
    };
  }

  return {
    message: "I can help you find products by category, price point, technical spec, or personal style. Try asking for audio, watches, gaming setups, or luxury gifts!",
    products: products.slice(0, 2),
    followUps: ["Best sellers", "Summer sale picks", "Free shipping details"]
  };
};
