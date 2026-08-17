import React, { useState } from 'react';
import { ProductItem, FlashDealState } from '../types';
import {
  Package,
  Flame,
  Zap,
  Plus,
  ArrowRight,
  TrendingUp,
  Tag,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Sliders,
  DollarSign,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShowRunSheetProps {
  products: ProductItem[];
  activeProduct: ProductItem | null;
  flashDeal: FlashDealState;
  onSelectActiveProduct: (product: ProductItem) => void;
  onTriggerFlashDeal: (product: ProductItem, durationSec: number, bonusDiscount: number) => void;
  onUpdateInventory: (productId: string, delta: number) => void;
  onAddNewProduct: (newProduct: Partial<ProductItem>) => void;
}

export const ShowRunSheet: React.FC<ShowRunSheetProps> = ({
  products,
  activeProduct,
  flashDeal,
  onSelectActiveProduct,
  onTriggerFlashDeal,
  onUpdateInventory,
  onAddNewProduct,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [flashModalProduct, setFlashModalProduct] = useState<ProductItem | null>(null);
  const [flashDuration, setFlashDuration] = useState<number>(120); // 2 mins
  const [flashDiscount, setFlashDiscount] = useState<number>(25); // 25%

  // New product form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Tech & Audio');
  const [newOriginalPrice, setNewOriginalPrice] = useState(120);
  const [newSalePrice, setNewSalePrice] = useState(79);
  const [newStock, setNewStock] = useState(30);
  const [newImageUrl, setNewImageUrl] = useState(
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80'
  );
  const [newHighlight, setNewHighlight] = useState('Ultra Ergonomic & Lightweight');

  const categories = ['all', 'Audio & Tech', 'Luxury Accessories', 'Beauty & Skincare', 'Workspace & Gaming', 'Travel & Lifestyle'];

  const filteredProducts = products.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const discount = Math.round(((newOriginalPrice - newSalePrice) / newOriginalPrice) * 100);

    onAddNewProduct({
      title: newTitle,
      category: newCategory,
      originalPrice: newOriginalPrice,
      salePrice: newSalePrice,
      discountPercentage: discount > 0 ? discount : 20,
      stock: newStock,
      initialStock: newStock,
      soldCount: 0,
      imageUrl: newImageUrl,
      badge: 'NEW DROP',
      description: 'Exclusive live broadcast drop with limited stock.',
      highlights: [newHighlight, 'Same-Day VIP Dispatch', '1-Year Warranty'],
      variants: [{ id: 'v-new', name: 'Standard Edition', colorHex: '#3B82F6', inStock: true }],
      status: 'queued',
      cartCount: 0,
      rating: 5.0,
      reviewsCount: 12,
    });

    setShowAddModal(false);
    setNewTitle('');
  };

  return (
    <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl flex flex-col h-full overflow-hidden shadow-xl backdrop-blur-sm">
      {/* Run Sheet Header */}
      <div className="p-3 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/60">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-[11px] tracking-widest uppercase text-zinc-200 font-mono">
              RUN-SHEET & INVENTORY
            </h3>
          </div>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
            {products.length} Drops Queued • 1 On-Air
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono tracking-wider uppercase transition-all shadow-md shadow-indigo-950/50 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Drop</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="px-3 py-2 border-b border-zinc-800/80 bg-zinc-950/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-2.5 py-0.5 rounded text-[10px] font-mono whitespace-nowrap transition-colors ${
              filterCategory === cat
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/80 border border-zinc-800'
            }`}
          >
            {cat === 'all' ? 'All Drops' : cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredProducts.map((prod) => {
          const isActive = activeProduct?.id === prod.id;
          const isFlash = flashDeal.isActive && flashDeal.product?.id === prod.id;
          const isSoldOut = prod.stock <= 0;

          return (
            <div
              key={prod.id}
              className={`rounded-xl p-3 border transition-all ${
                isActive
                  ? 'bg-indigo-500/10 border-indigo-500/50 shadow-md shadow-indigo-950/40 ring-1 ring-indigo-500/30'
                  : 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Product Thumbnail with Badges */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 bg-red-600 text-white text-[8px] font-black text-center uppercase tracking-wider py-0.5 animate-pulse font-mono">
                      ON-AIR
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {prod.sku}
                    </span>
                    {prod.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold font-mono rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {prod.badge}
                      </span>
                    )}
                    {isSoldOut && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold font-mono rounded bg-red-500/20 text-red-400 border border-red-500/30">
                        SOLD OUT
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-zinc-100 truncate leading-snug">
                    {prod.title}
                  </h4>

                  {/* Pricing and Sales */}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-black text-indigo-400 font-mono">
                      ${prod.salePrice}
                    </span>
                    <span className="text-xs text-zinc-500 line-through font-mono">
                      ${prod.originalPrice}
                    </span>
                    <span className="text-[10px] text-zinc-400 ml-auto font-mono">
                      Sold: <b className="text-emerald-400">{prod.soldCount}</b>
                    </span>
                  </div>

                  {/* Stock Gauge & Steppers */}
                  <div className="mt-2 flex items-center justify-between gap-2 text-[10px] font-mono">
                    <div className="flex items-center gap-1 text-zinc-400">
                      <span>Stock:</span>
                      <span
                        className={`font-bold ${
                          prod.stock < 10 ? 'text-red-400 animate-pulse' : 'text-zinc-200'
                        }`}
                      >
                        {prod.stock} left
                      </span>
                    </div>

                    {/* Stock Quick Steppers */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onUpdateInventory(prod.id, -1)}
                        disabled={prod.stock <= 0}
                        className="w-5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-zinc-300 text-xs flex items-center justify-center font-bold border border-zinc-700"
                        title="Reduce 1 stock"
                      >
                        -
                      </button>
                      <button
                        onClick={() => onUpdateInventory(prod.id, +5)}
                        className="px-1.5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] flex items-center justify-center font-medium border border-zinc-700"
                        title="Restock +5"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center gap-2">
                <button
                  onClick={() => onSelectActiveProduct(prod)}
                  className={`flex-1 py-1.5 rounded text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{isActive ? 'Spotlight On Air' : 'Push to Screen'}</span>
                </button>

                <button
                  onClick={() => setFlashModalProduct(prod)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    isFlash
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                  title="Configure and launch Flash Deal drop"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isFlash ? 'Flash Active' : 'Flash Sale'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flash Sale Trigger Modal */}
      <AnimatePresence>
        {flashModalProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-950 border border-red-500/50 rounded-2xl p-5 max-w-md w-full shadow-2xl text-white"
            >
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <Zap className="w-5 h-5 fill-current" />
                <h3 className="font-black text-sm uppercase tracking-wider font-mono">
                  LAUNCH FLASH DROP SURGE
                </h3>
              </div>

              <p className="text-xs text-zinc-400 mb-4">
                Trigger high-urgency countdown timer, on-screen discount badge, and synchronized audio sound effect for <b>{flashModalProduct.title}</b>.
              </p>

              {/* Flash Duration Selector */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Flash Timer Duration:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[60, 120, 180].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setFlashDuration(sec)}
                      className={`py-2 rounded-lg text-xs font-mono font-bold border transition-all ${
                        flashDuration === sec
                          ? 'bg-red-600 border-red-400 text-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {sec / 60} MIN ({sec}s)
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Discount % */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Extra Flash Discount:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 25, 40].map((disc) => (
                    <button
                      key={disc}
                      type="button"
                      onClick={() => setFlashDiscount(disc)}
                      className={`py-2 rounded-lg text-xs font-mono font-bold border transition-all ${
                        flashDiscount === disc
                          ? 'bg-amber-500 border-amber-400 text-black'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {disc}% OFF BONUS
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFlashModalProduct(null)}
                  className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onTriggerFlashDeal(flashModalProduct, flashDuration, flashDiscount);
                    setFlashModalProduct(null);
                  }}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-red-950"
                >
                  🚀 Launch Drop Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 max-w-md w-full shadow-2xl text-white max-h-[90vh] overflow-y-auto"
            >
              <h3 className="font-bold text-sm text-zinc-100 uppercase tracking-wider font-mono mb-3">
                ADD NEW PRODUCT TO RUN-SHEET
              </h3>

              <form onSubmit={handleCreateProduct} className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Apex 4K Action Gimbal Camera"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                      Regular Price ($)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newOriginalPrice}
                      onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                      Live Sale Price ($)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newSalePrice}
                      onChange={(e) => setNewSalePrice(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                      Initial Stock (Units)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newStock}
                      onChange={(e) => setNewStock(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                    >
                      <option>Tech & Audio</option>
                      <option>Luxury Accessories</option>
                      <option>Beauty & Skincare</option>
                      <option>Workspace & Gaming</option>
                      <option>Travel & Lifestyle</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Top Feature Highlight
                  </label>
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
