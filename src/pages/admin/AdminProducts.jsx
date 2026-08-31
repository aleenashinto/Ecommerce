import React, { useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { useToastStore } from '../../store/useToastStore';
import { Plus, Trash2, Search, X } from 'lucide-react';

export const AdminProducts = () => {
  const { products, addProduct, deleteProduct } = useAdminStore();
  const addToast = useToastStore((state) => state.addToast);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Electronics',
    price: 299,
    originalPrice: 349,
    stockCount: 30,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'Masterpiece luxury hardware crafted with precision.',
    badge: 'NEW ARRIVAL'
  });

  const filtered = products.filter(p => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addProduct(newProd);
    addToast('Product successfully added to live catalog!', 'success');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">Product Catalog Management</h1>
          <p className="text-xs text-neutral-400 mt-1">{products.length} total active items under management.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 self-start"
        >
          <Plus size={15} /> Add New Product
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search products by name or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 rounded-xl px-3 py-2 focus:outline-none w-full sm:w-auto"
        >
          {['All', 'Electronics', 'Fashion', 'Audio', 'Watches', 'Home', 'Beauty', 'Gaming', 'Accessories'].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-950/80 uppercase text-[10px] tracking-wider text-neutral-400 border-b border-neutral-800">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-xl object-cover bg-neutral-800 shrink-0" />
                    <div>
                      <div className="font-bold text-white">{product.name}</div>
                      <div className="text-[10px] text-purple-400">{product.badge || 'STANDARD'}</div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{product.category}</td>
                  <td className="p-4 font-mono font-bold text-white">${product.price}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      (product.stockCount || 20) < 10 
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {product.stockCount || 20} In Stock
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-amber-400">? {product.rating}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        deleteProduct(product.id);
                        addToast('Product removed from catalog', 'info');
                      }}
                      className="p-2 rounded-lg bg-neutral-950 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-neutral-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-heading text-base font-bold text-white">Add New Luxury Product</h3>
              <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
                  >
                    {['Electronics', 'Fashion', 'Audio', 'Watches', 'Home', 'Beauty', 'Gaming', 'Accessories'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Badge</label>
                  <input
                    type="text"
                    value={newProd.badge}
                    onChange={(e) => setNewProd({ ...newProd, badge: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={newProd.stockCount}
                    onChange={(e) => setNewProd({ ...newProd, stockCount: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Image URL</label>
                <input
                  type="url"
                  required
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg"
                >
                  Save to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
