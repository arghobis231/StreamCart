import React, { useState } from 'react';
import {
  ScreenId,
  ProductItem,
} from '../../types';
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Radio,
  RefreshCw,
  ArrowUpDown,
  Tag,
  AlertTriangle,
  X,
} from 'lucide-react';
import { WireframeBox, WireframeButton, WireframeBadge, WireframeCard } from './WireframeUI';

interface ProductManagerViewProps {
  onNavigate: (screen: ScreenId) => void;
  products: ProductItem[];
  onUpdateProduct: (product: ProductItem) => void;
  onAddProduct: (product: ProductItem) => void;
  onDeleteProduct: (id: string) => void;
  onToggleSelectForStream: (id: string) => void;
}

export const ProductManagerView: React.FC<ProductManagerViewProps> = ({
  onNavigate,
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onToggleSelectForStream,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Form State for Add / Edit Modal
  const [formTitle, setFormTitle] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategory, setFormCategory] = useState('Audio & Tech');
  const [formPrice, setFormPrice] = useState(99);
  const [formOriginalPrice, setFormOriginalPrice] = useState(149);
  const [formStock, setFormStock] = useState(30);
  const [formBadge, setFormBadge] = useState('⚡ FLASH DROP');
  const [formDesc, setFormDesc] = useState('High precision build with manufacturer warranty and fast shipping.');

  const openAddModal = () => {
    setEditingProduct(null);
    setFormTitle('');
    setFormSku(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormCategory('Audio & Tech');
    setFormPrice(99);
    setFormOriginalPrice(149);
    setFormStock(25);
    setFormBadge('NEW DROP');
    setFormDesc('Premium live show exclusive item with instant discount.');
    setShowAddModal(true);
  };

  const openEditModal = (p: ProductItem) => {
    setEditingProduct(p);
    setFormTitle(p.title);
    setFormSku(p.sku);
    setFormCategory(p.category);
    setFormPrice(p.salePrice);
    setFormOriginalPrice(p.originalPrice);
    setFormStock(p.stock);
    setFormBadge(p.badge || '');
    setFormDesc(p.description);
    setShowAddModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    if (editingProduct) {
      const updated: ProductItem = {
        ...editingProduct,
        title: formTitle,
        sku: formSku,
        category: formCategory,
        salePrice: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        discountPercentage: Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100),
        stock: Number(formStock),
        badge: formBadge,
        description: formDesc,
      };
      onUpdateProduct(updated);
    } else {
      const newProd: ProductItem = {
        id: `prod-${Date.now()}`,
        title: formTitle,
        sku: formSku,
        category: formCategory,
        salePrice: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        discountPercentage: Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100),
        stock: Number(formStock),
        initialStock: Number(formStock),
        soldCount: 0,
        badge: formBadge,
        description: formDesc,
        highlights: ['Factory Direct Exclusive', 'Free 2-Day Shipping', 'Live Demo Tested'],
        variants: [
          { id: 'v-new-1', name: 'Standard Edition', colorHex: '#18181B', inStock: true },
        ],
        status: 'upcoming',
        isSelectedForStream: true,
        rating: 5.0,
        reviewsCount: 1,
      };
      onAddProduct(newProd);
    }
    setShowAddModal(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const selectedForStreamCount = products.filter((p) => p.isSelectedForStream).length;

  return (
    <div className="flex-1 bg-zinc-100 min-h-screen p-4 md:p-6 font-mono text-zinc-900 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-zinc-900" />
              <h1 className="text-xl font-black tracking-tight uppercase">Product Catalogue Manager</h1>
              <WireframeBadge variant="default">{products.length} Items Total</WireframeBadge>
            </div>
            <p className="text-xs text-zinc-600 mt-1">
              Manage inventory, discounts, product drops, and select items for upcoming live broadcasts.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <WireframeButton
              variant="outline"
              size="md"
              icon={<Radio className="w-3.5 h-3.5 text-red-600" />}
              onClick={() => onNavigate('studio')}
            >
              Open Studio ({selectedForStreamCount} Queued)
            </WireframeButton>

            <WireframeButton
              variant="primary"
              size="md"
              icon={<Plus className="w-3.5 h-3.5" />}
              onClick={openAddModal}
            >
              + Add New Product
            </WireframeButton>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border-2 border-zinc-800 rounded-md p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search products by title, SKU, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-zinc-50 border-2 border-zinc-300 rounded text-xs font-mono focus:outline-hidden focus:border-zinc-800"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1">
              <Filter className="w-3 h-3" /> Category:
            </span>
            {['all', 'Audio & Tech', 'Luxury Accessories', 'Beauty & Skincare', 'Workspace & Gaming'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all border ${
                  categoryFilter === cat
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <WireframeCard
          title="Product Inventory Table"
          subtitle={`${filteredProducts.length} products displayed`}
          headerAction={
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-600 font-bold">Selected for Livestream:</span>
              <WireframeBadge variant="success">{selectedForStreamCount} Items</WireframeBadge>
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-800 bg-zinc-100 text-zinc-700">
                  <th className="py-2.5 px-3 font-bold w-12 text-center">Stream</th>
                  <th className="py-2.5 px-3 font-bold w-16">Preview</th>
                  <th className="py-2.5 px-3 font-bold">Product Name & SKU</th>
                  <th className="py-2.5 px-3 font-bold">Category</th>
                  <th className="py-2.5 px-3 font-bold">Live Price</th>
                  <th className="py-2.5 px-3 font-bold">Stock</th>
                  <th className="py-2.5 px-3 font-bold">Total Sales</th>
                  <th className="py-2.5 px-3 font-bold">Status</th>
                  <th className="py-2.5 px-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredProducts.map((p) => {
                  const isSelected = p.isSelectedForStream;
                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-zinc-50 transition-colors ${
                        isSelected ? 'bg-amber-50/40' : ''
                      }`}
                    >
                      {/* Select for Livestream Toggle */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => onToggleSelectForStream(p.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                              : 'bg-white border-zinc-400 text-transparent hover:border-zinc-700'
                          }`}
                          title="Toggle Select for Livestream"
                        >
                          <CheckCircle className="w-4 h-4 fill-current" />
                        </button>
                      </td>

                      {/* Image Placeholder */}
                      <td className="py-3 px-3">
                        <WireframeBox label="[ X ]" className="w-12 h-12 rounded" />
                      </td>

                      {/* Title & SKU */}
                      <td className="py-3 px-3">
                        <div className="font-bold text-zinc-900 text-xs">{p.title}</div>
                        <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-2 mt-0.5">
                          <span>SKU: {p.sku}</span>
                          {p.badge && (
                            <span className="px-1.5 py-0.2 bg-zinc-200 text-zinc-700 rounded font-bold">
                              {p.badge}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3 text-zinc-600 font-medium">{p.category}</td>

                      {/* Price */}
                      <td className="py-3 px-3 font-mono">
                        <div className="font-black text-zinc-900">${p.salePrice}</div>
                        <div className="text-[10px] text-zinc-500 line-through">${p.originalPrice} (-{p.discountPercentage}%)</div>
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-3 font-mono">
                        <div className={`font-bold flex items-center gap-1 ${p.stock < 10 ? 'text-red-700' : 'text-zinc-900'}`}>
                          {p.stock < 10 && <AlertTriangle className="w-3 h-3 text-red-600" />}
                          <span>{p.stock} units</span>
                        </div>
                        <div className="text-[10px] text-zinc-500">of {p.initialStock}</div>
                      </td>

                      {/* Total Sales */}
                      <td className="py-3 px-3 font-mono">
                        <div className="font-bold text-emerald-700">{p.soldCount} sold</div>
                        <div className="text-[10px] text-zinc-500">${(p.soldCount * p.salePrice).toLocaleString()} GMV</div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        {p.status === 'active_drop' ? (
                          <WireframeBadge variant="live">ACTIVE ON-AIR</WireframeBadge>
                        ) : p.stock <= 0 ? (
                          <WireframeBadge variant="warning">SOLD OUT</WireframeBadge>
                        ) : p.stock < 10 ? (
                          <WireframeBadge variant="warning">LOW STOCK</WireframeBadge>
                        ) : isSelected ? (
                          <WireframeBadge variant="success">IN STREAM QUEUE</WireframeBadge>
                        ) : (
                          <WireframeBadge variant="outline">CATALOGUE</WireframeBadge>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 rounded border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-700"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 rounded border border-red-300 bg-white hover:bg-red-50 text-red-600"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </WireframeCard>
      </div>

      {/* Add / Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-zinc-900 rounded-md w-full max-w-lg shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-zinc-900" />
                <h3 className="text-sm font-black uppercase">
                  {editingProduct ? 'Edit Product Item' : 'Add New Product to Catalogue'}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded hover:bg-zinc-200 border border-zinc-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Apex 4K Smart Gimbal Drone"
                  className="w-full bg-white border-2 border-zinc-700 rounded px-2.5 py-1.5 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full bg-white border-2 border-zinc-700 rounded px-2.5 py-1.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-white border-2 border-zinc-700 rounded px-2.5 py-1.5 font-mono"
                  >
                    <option value="Audio & Tech">Audio & Tech</option>
                    <option value="Luxury Accessories">Luxury Accessories</option>
                    <option value="Beauty & Skincare">Beauty & Skincare</option>
                    <option value="Workspace & Gaming">Workspace & Gaming</option>
                    <option value="Travel & Lifestyle">Travel & Lifestyle</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">Live Sale Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-white border-2 border-zinc-700 rounded px-2.5 py-1.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full bg-white border-2 border-zinc-700 rounded px-2.5 py-1.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-white border-2 border-zinc-700 rounded px-2.5 py-1.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Promotional Badge (e.g. FLASH DROP)</label>
                <input
                  type="text"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  className="w-full bg-white border-2 border-zinc-700 rounded px-2.5 py-1.5 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Product Description</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-white border-2 border-zinc-700 rounded px-2.5 py-1.5 font-mono"
                />
              </div>

              <div className="pt-3 border-t-2 border-zinc-300 flex items-center justify-end gap-2">
                <WireframeButton variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </WireframeButton>
                <WireframeButton variant="primary" size="sm">
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </WireframeButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
