import React, { useState } from 'react';
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Zap,
  TrendingUp,
  Tag,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Sliders,
  DollarSign,
  ArrowUpDown,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { ProductItem, ScreenId } from '../types';

interface ProductsViewProps {
  products: ProductItem[];
  onNavigate: (screen: ScreenId) => void;
  onAddProduct: (product: ProductItem) => void;
  onUpdateProduct: (product: ProductItem) => void;
  onDeleteProduct: (productId: string) => void;
  onFeatureProduct: (productId: string) => void;
  activeFeaturedProductId?: string;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onNavigate,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onFeatureProduct,
  activeFeaturedProductId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // New Product Modal Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newCategory, setNewCategory] = useState('Audio & Tech');
  const [newOrigPrice, setNewOrigPrice] = useState(199);
  const [newSalePrice, setNewSalePrice] = useState(129);
  const [newStock, setNewStock] = useState(25);
  const [newImageUrl, setNewImageUrl] = useState(
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80'
  );
  const [newBadge, setNewBadge] = useState('NEW DROP');
  const [newDescription, setNewDescription] = useState('Premium audio device with smart noise cancellation.');

  const categories = ['All', 'Audio & Tech', 'Beauty & Skincare', 'Luxury Accessories', 'Workspace & Gaming', 'Travel & Lifestyle'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'in_stock' && product.stock > 10) ||
      (stockFilter === 'low_stock' && product.stock > 0 && product.stock <= 10) ||
      (stockFilter === 'out_of_stock' && product.stock === 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Aggregate stats
  const totalGmvCatalog = products.reduce((acc, p) => acc + p.soldCount * p.salePrice, 0);
  const totalUnitsSold = products.reduce((acc, p) => acc + p.soldCount, 0);
  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = Math.round(((newOrigPrice - newSalePrice) / newOrigPrice) * 100);
    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      sku: newSku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle || 'New Premium Drop Item',
      category: newCategory,
      originalPrice: Number(newOrigPrice),
      salePrice: Number(newSalePrice),
      discountPercentage: discount > 0 ? discount : 0,
      stock: Number(newStock),
      initialStock: Number(newStock),
      soldCount: 0,
      imageUrl: newImageUrl,
      badge: newBadge,
      description: newDescription,
      highlights: ['Aircraft-grade durability', '1-Year Full Warranty', 'Fast In-Stream Express Shipping'],
      variants: [
        { id: 'v1', name: 'Standard Edition', colorHex: '#18181B', inStock: true },
      ],
      status: 'upcoming',
      rating: 5.0,
      reviewsCount: 1,
      isSelectedForStream: true,
    };

    onAddProduct(newProd);
    setShowAddModal(false);
    // reset
    setNewTitle('');
    setNewSku('');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 space-y-6 select-none">
      {/* Header & Stats Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Product Catalogue & Inventory</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage live shoppable product drops, monitor inventory levels, and configure stream spotlights.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Total Catalogue GMV</span>
          <div className="text-xl font-black text-emerald-400">${totalGmvCatalog.toLocaleString()}</div>
          <span className="text-[10px] text-zinc-400">Generated across all livestreams</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Active Stream Drops</span>
          <div className="text-xl font-black text-blue-400">
            {products.filter((p) => p.isSelectedForStream).length} / {products.length} Items
          </div>
          <span className="text-[10px] text-zinc-400">Queued in Director Studio</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Units Sold in Live</span>
          <div className="text-xl font-black text-white">{totalUnitsSold} Units</div>
          <span className="text-[10px] text-emerald-400 font-semibold">+18% conversion rate</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Low Stock Warnings</span>
          <div className={`text-xl font-black ${lowStockCount > 0 ? 'text-amber-400' : 'text-zinc-400'}`}>
            {lowStockCount} SKUs
          </div>
          <span className="text-[10px] text-zinc-400">Below 10 units remaining</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* View Switcher & Stock Filter */}
        <div className="flex items-center gap-2 self-end lg:self-auto">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Inventory</option>
            <option value="in_stock">In Stock (&gt;10)</option>
            <option value="low_stock">Low Stock (≤10)</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts.map((product) => {
          const isFeatured = activeFeaturedProductId === product.id;
          const isLowStock = product.stock <= 10 && product.stock > 0;
          const isSoldOut = product.stock === 0;
          const revenue = product.soldCount * product.salePrice;

          return (
            <div
              key={product.id}
              className={`rounded-2xl bg-zinc-900 border overflow-hidden flex flex-col justify-between transition-all group ${
                isFeatured
                  ? 'border-blue-500 ring-2 ring-blue-500/40 shadow-xl shadow-blue-500/10'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div>
                {/* Product Photo */}
                <div className="relative h-48 w-full bg-zinc-950 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.badge && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-blue-600/90 text-white shadow-md backdrop-blur-sm">
                        {product.badge}
                      </span>
                    )}
                    {isFeatured && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-red-600 text-white shadow-lg animate-pulse flex items-center gap-1">
                        <Radio className="w-3 h-3" />
                        ON SCREEN
                      </span>
                    )}
                  </div>

                  {/* Stock Badge */}
                  <div className="absolute top-3 right-3">
                    {isSoldOut ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-md">
                        Sold Out
                      </span>
                    ) : isLowStock ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Low Stock ({product.stock})
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                        In Stock ({product.stock})
                      </span>
                    )}
                  </div>

                  {/* SKU & Category */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-300">
                    <span className="font-mono bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {product.sku}
                    </span>
                    <span className="font-semibold text-zinc-400">{product.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-white text-sm line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {product.title}
                  </h3>

                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-white">${product.salePrice}</span>
                      <span className="text-xs text-zinc-500 line-through">${product.originalPrice}</span>
                      <span className="text-xs font-bold text-emerald-400">-{product.discountPercentage}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2">{product.description}</p>

                  {/* Live Stats */}
                  <div className="pt-2 border-t border-zinc-800 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-zinc-500 block">Sold in Live:</span>
                      <span className="font-bold text-white">{product.soldCount} units</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Total GMV:</span>
                      <span className="font-bold text-emerald-400">${revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  onClick={() => onFeatureProduct(product.id)}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isFeatured
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/25'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{isFeatured ? 'Featured On Screen' : 'Feature In Livestream'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('studio')}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors text-center cursor-pointer"
                  >
                    View in Studio
                  </button>
                  <button
                    onClick={() => onDeleteProduct(product.id)}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 text-zinc-400 transition-colors cursor-pointer"
                    title="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Add New Product Drop</h3>
                <p className="text-xs text-zinc-400">Create a new SKU to feature in your interactive livestream storefront.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Apex Ultra ANC Wireless Over-Ear Headphones"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">SKU Number</label>
                  <input
                    type="text"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    placeholder="e.g. APEX-AUDIO-07"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Audio & Tech</option>
                    <option>Beauty & Skincare</option>
                    <option>Luxury Accessories</option>
                    <option>Workspace & Gaming</option>
                    <option>Travel & Lifestyle</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Regular Price ($)</label>
                  <input
                    type="number"
                    value={newOrigPrice}
                    onChange={(e) => setNewOrigPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Live Sale Price ($)</label>
                  <input
                    type="number"
                    value={newSalePrice}
                    onChange={(e) => setNewSalePrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-bold text-emerald-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Warehouse Stock</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 cursor-pointer"
                >
                  Save & Add to Catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
