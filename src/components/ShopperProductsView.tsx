import React, { useState } from 'react';
import {
  Search,
  Filter,
  Package,
  Heart,
  ShoppingCart,
  Star,
  Sparkles,
  Radio,
  ExternalLink,
  ChevronDown,
  Check,
  Tag,
  Zap,
  SlidersHorizontal,
  Flame,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { ProductItem, ScreenId } from '../types';

interface ShopperProductsViewProps {
  products: ProductItem[];
  onOpenProductSpotlight?: (product: ProductItem) => void;
  onQuickAddToCart?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  onToggleWishlist?: (product: ProductItem) => void;
  isProductInWishlist?: (productId: string) => boolean;
  wishlistProductIds?: string[];
  onJoinStream?: (channelId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ShopperProductsView: React.FC<ShopperProductsViewProps> = ({
  products = [],
  onOpenProductSpotlight,
  onQuickAddToCart,
  onAddToCart,
  onToggleWishlist,
  isProductInWishlist,
  wishlistProductIds,
  onJoinStream,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [onlyLiveDrops, setOnlyLiveDrops] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'discount' | 'rating'>('popular');
  const [priceMax, setPriceMax] = useState<number>(500);

  const categories = [
    'All',
    'Audio & Tech',
    'Luxury Accessories',
    'Beauty & Skincare',
    'Workspace & Gaming',
    'Outdoor & Gear',
    'Gourmet Culinary',
    'Fitness & Recovery',
  ];

  // Channel mapping for live drops
  const getProductLiveChannel = (prodId: string) => {
    if (prodId === 'prod-1') return { channelId: 'channel-tech', hostName: 'Alex Vance', streamTitle: 'Tech Friday' };
    if (prodId === 'prod-2') return { channelId: 'channel-fashion', hostName: 'Maya Chen', streamTitle: 'Runway Luxury' };
    if (prodId === 'prod-3') return { channelId: 'channel-beauty', hostName: 'Dr. Chloe Rivera', streamTitle: 'Glass Skin Routine' };
    if (prodId === 'prod-4') return { channelId: 'channel-gaming', hostName: 'Marcus Rogue', streamTitle: 'Battlestation Drop' };
    if (prodId === 'prod-5') return { channelId: 'channel-fitness', hostName: 'Coach Liam', streamTitle: 'Pulse Athletic' };
    return null;
  };

  const filteredProducts = products.filter((prod) => {
    const matchesCat = selectedCategory === 'All' || prod.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = prod.salePrice <= priceMax;
    const matchesLive = onlyLiveDrops ? Boolean(getProductLiveChannel(prod.id)) : true;
    return matchesCat && matchesSearch && matchesPrice && matchesLive;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.salePrice - b.salePrice;
    if (sortBy === 'price-high') return b.salePrice - a.salePrice;
    if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.soldCount - a.soldCount;
  });

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-white overflow-y-auto min-h-0">
      {/* Top Banner Header */}
      <div className="bg-zinc-900/60 border-b border-zinc-800/80 px-6 py-6 text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold uppercase">
                Product Marketplace
              </span>
              <span className="text-xs text-zinc-400 font-medium">• {products.length} Curated Stream Drops</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Browse Stream Products & Drops
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Discover verified products demonstrated by top creators. Watch live demos, review specs, and claim instant creator discounts.
            </p>
          </div>

          {/* Live Drops Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOnlyLiveDrops(!onlyLiveDrops)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                onlyLiveDrops
                  ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${onlyLiveDrops ? 'text-white animate-pulse' : 'text-red-500'}`} />
              <span>Only Currently LIVE Drops</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter & Products Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 space-y-6">
        {/* Controls Bar: Search, Category Chips & Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by name or spec..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort products"
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-300 font-semibold focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="discount">Biggest Discount</option>
              <option value="rating">Highest Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <span>Showing <strong className="text-white font-bold">{filteredProducts.length}</strong> products</span>
          {onlyLiveDrops && (
            <span className="text-red-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Filtered by active creator broadcast
            </span>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((prod) => {
            const inWish = isProductInWishlist
              ? isProductInWishlist(prod.id)
              : wishlistProductIds
              ? wishlistProductIds.includes(prod.id)
              : false;
            const liveChannel = getProductLiveChannel(prod.id);

            const handleOpenSpotlight = () => {
              if (onOpenProductSpotlight) {
                onOpenProductSpotlight(prod);
              } else {
                onNavigate('cart');
              }
            };

            const handleAddToCart = () => {
              if (onQuickAddToCart) {
                onQuickAddToCart(prod);
              } else if (onAddToCart) {
                onAddToCart(prod);
              }
            };

            const handleToggleWish = () => {
              if (onToggleWishlist) {
                onToggleWishlist(prod);
              }
            };

            const handleJoinLive = (channelId: string) => {
              if (onJoinStream) {
                onJoinStream(channelId);
              } else {
                onNavigate('viewer');
              }
            };

            return (
              <div
                key={prod.id}
                className="bg-zinc-900/90 hover:bg-zinc-900 border border-zinc-800/90 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-md text-left"
              >
                {/* Image Section */}
                <div className="relative aspect-square bg-zinc-950 overflow-hidden cursor-pointer" onClick={handleOpenSpotlight}>
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWish();
                    }}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      inWish
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80'
                    }`}
                    title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${inWish ? 'fill-white' : ''}`} />
                  </button>

                  {/* Discount Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-extrabold shadow">
                    {prod.discountPercentage}% OFF
                  </span>

                  {/* LIVE NOW BADGE */}
                  {liveChannel && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinLive(liveChannel.channelId);
                      }}
                      className="absolute bottom-2.5 left-2.5 right-2.5 p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-red-500/40 flex items-center justify-between gap-1.5 hover:bg-red-950/80 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                        <span className="text-[10px] font-bold text-white truncate">
                          LIVE: {liveChannel.hostName}
                        </span>
                      </div>
                      <span className="text-[10px] text-red-400 font-extrabold shrink-0 hover:underline">
                        Join Live →
                      </span>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                      <span>{prod.category}</span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="font-bold text-zinc-200">{prod.rating}</span>
                        <span className="text-zinc-500">({prod.reviewsCount})</span>
                      </div>
                    </div>

                    <h3
                      onClick={handleOpenSpotlight}
                      className="text-sm font-bold text-white line-clamp-1 group-hover:text-teal-400 transition-colors cursor-pointer"
                    >
                      {prod.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                      {prod.description}
                    </p>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="pt-2 border-t border-zinc-800/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-black text-white">${prod.salePrice}</span>
                        <span className="text-xs text-zinc-500 line-through ml-1.5">${prod.originalPrice}</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">
                        {prod.stock} in stock
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleOpenSpotlight}
                        className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={handleAddToCart}
                        className="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors shadow cursor-pointer flex items-center justify-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
