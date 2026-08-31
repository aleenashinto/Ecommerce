import { useMemo } from 'react';
import { products } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

export function useRecommendations(currentProductId = null, limit = 4) {
  const cartItems = useCartStore(state => state.items);
  const wishlistItems = useWishlistStore(state => state.items);

  const recommendations = useMemo(() => {
    let list = products;
    if (currentProductId) {
      const current = products.find(p => p.id === currentProductId);
      if (current) {
        // Find by matching category or tags
        const sameCategory = products.filter(p => p.id !== currentProductId && p.category === current.category);
        const relatedTags = products.filter(p => 
          p.id !== currentProductId && 
          p.category !== current.category &&
          p.tags.some(t => current.tags.includes(t))
        );
        const combined = [...sameCategory, ...relatedTags];
        list = combined.length > 0 ? combined : products.filter(p => p.id !== currentProductId);
      }
    } else if (cartItems.length > 0) {
      const cartCategories = cartItems.map(i => i.category);
      const matched = products.filter(p => 
        !cartItems.some(ci => ci.id === p.id) && 
        cartCategories.includes(p.category)
      );
      list = matched.length > 0 ? matched : products;
    } else if (wishlistItems.length > 0) {
      const wishCategories = wishlistItems.map(i => i.category);
      const matched = products.filter(p => 
        !wishlistItems.some(wi => wi.id === p.id) && 
        wishCategories.includes(p.category)
      );
      list = matched.length > 0 ? matched : products;
    }

    // Return top unique items
    const unique = Array.from(new Set(list.map(p => p.id)))
      .map(id => list.find(p => p.id === id))
      .slice(0, limit);

    return unique.length > 0 ? unique : products.slice(0, limit);
  }, [currentProductId, cartItems, wishlistItems, limit]);

  return recommendations;
}
