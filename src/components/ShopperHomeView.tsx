import React from 'react';
import {
  Radio,
  Eye,
  ShoppingBag,
  Sparkles,
  Search,
  Filter,
  Flame,
  Tag,
  Zap,
  Star,
  CheckCircle2,
  Calendar,
  Bell,
  ArrowRight,
  Play,
  TrendingUp,
  Heart,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Percent,
  Clock,
  Volume2,
  Users,
  Compass,
  Package,
} from 'lucide-react';
import { ScreenId, ProductItem, FollowedCreator } from '../types';
import {
  CONSUMER_LIVE_STREAMS,
  ConsumerLiveChannel,
} from '../data/consumerStreamsData';

interface ShopperHomeViewProps {
  products?: ProductItem[];
  followedCreators?: FollowedCreator[];
  creators?: FollowedCreator[];
  onToggleFollowCreator?: (creatorId: string) => void;
  onToggleFollow?: (creatorId: string) => void;
  onJoinStream?: (channelId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenProductSpotlight?: (product: ProductItem) => void;
  onToggleWishlist?: (product: ProductItem) => void;
  isProductInWishlist?: (productId: string) => boolean;
  wishlistProductIds?: string[];
  onQuickAddToCart?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
}

export const ShopperHomeView: React.FC<ShopperHomeViewProps> = ({
  products = [],
  followedCreators = [],
  creators,
  onToggleFollowCreator,
  onToggleFollow,
  onJoinStream,
  onNavigate,
  onOpenProductSpotlight,
  onToggleWishlist,
  isProductInWishlist,
  wishlistProductIds,
  onQuickAddToCart,
  onAddToCart,
}) => {
  const activeStreams = CONSUMER_LIVE_STREAMS;
  const heroStream = activeStreams[0]; // Alex Vance Tech Friday
  const allCreators = creators || followedCreators || [];

  const handleJoin = (channelId: string) => {
    if (onJoinStream) {
      onJoinStream(channelId);
    } else {
      onNavigate('viewer');
    }
  };

  const handleAddToCart = (prod: ProductItem) => {
    if (onQuickAddToCart) {
      onQuickAddToCart(prod);
    } else if (onAddToCart) {
      onAddToCart(prod);
    }
  };

  const handleFollowToggle = (creatorId: string) => {
    if (onToggleFollowCreator) {
      onToggleFollowCreator(creatorId);
    } else if (onToggleFollow) {
      onToggleFollow(creatorId);
    }
  };

  const handleSpotlight = (prod: ProductItem) => {
    if (onOpenProductSpotlight) {
      onOpenProductSpotlight(prod);
    } else {
      onNavigate('cart');
    }
  };
  const beautyStream = activeStreams[1]; // Dr. Chloe Rivera
  const luxuryStream = activeStreams[2]; // Maya Chen
  const coffeeStream = activeStreams[3]; // Chef Julian
  const gamingStream = activeStreams[4]; // Marcus Rogue

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-white overflow-y-auto min-h-0">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950/40 via-zinc-900/60 to-zinc-950 border-b border-zinc-800/80 px-4 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-teal-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>LIVE COMMERCE NETWORK</span>
              <span className="text-zinc-400 font-normal ml-1">• 6 Channels Active</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
              Shop Live. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
                Discover More.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed">
              Watch verified creators unbox drops, test gear, and answer your questions in real-time. Buy exclusive flash deals without leaving the stream.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('live-now')}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all active:scale-95 cursor-pointer"
              >
                <Radio className="w-4 h-4 text-white animate-pulse" />
                <span>Explore Live Now</span>
              </button>

              <button
                onClick={() => onNavigate('shopper-products')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 font-semibold text-sm transition-all cursor-pointer"
              >
                <Package className="w-4 h-4 text-teal-400" />
                <span>Browse Products</span>
              </button>

              <button
                onClick={() => onNavigate('discover')}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 text-xs font-semibold hover:bg-zinc-900/40 transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4 text-blue-400" />
                <span>Stream Schedule & RSVP</span>
              </button>
            </div>

            {/* Micro Live Ticker */}
            <div className="flex items-center gap-6 pt-3 text-xs text-zinc-400 border-t border-zinc-800/60">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Authentic Drops</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Exclusive Stream Discounts</span>
              </div>
              <div className="flex items-center gap-1.5 hidden sm:flex">
                <Users className="w-4 h-4 text-blue-400" />
                <span>Real-Time Host Q&A</span>
              </div>
            </div>
          </div>

          {/* Right Hero Video Card (Featured Stream Preview) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-700/80 bg-zinc-900 shadow-2xl group">
              <img
                src={heroStream.videoUrl}
                alt={heroStream.title}
                className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600 text-white font-extrabold text-[11px] shadow-lg animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    LIVE
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-semibold text-[11px] border border-white/10 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-emerald-400" />
                    {heroStream.viewers.toLocaleString()} watching
                  </span>
                </div>

                <span className="px-2 py-1 rounded-lg bg-amber-500/90 text-black font-extrabold text-[11px]">
                  {heroStream.discountLabel}
                </span>
              </div>

              {/* Bottom Stream Info Card */}
              <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-zinc-900/95 backdrop-blur-md border border-zinc-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={heroStream.hostAvatar}
                      alt={heroStream.hostName}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-400"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white">{heroStream.hostName}</span>
                        <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400" />
                      </div>
                      <span className="text-[10px] text-zinc-400">{heroStream.name}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    CODE: {heroStream.promoCode}
                  </span>
                </div>

                <p className="text-xs text-zinc-200 font-semibold line-clamp-1 text-left">
                  {heroStream.title}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={heroStream.featuredProductThumbnail}
                      alt={heroStream.featuredProductTitle}
                      className="w-8 h-8 rounded-lg object-cover border border-zinc-700"
                    />
                    <div className="text-left">
                      <div className="text-[10px] text-zinc-400">Featured Drop</div>
                      <div className="text-xs font-bold text-emerald-400">${heroStream.featuredProductPrice.toFixed(2)}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onJoinStream(heroStream.id)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Watch Live</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 🔴 LIVE NOW Directory Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Live Now</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                    6 ON AIR
                  </span>
                </h2>
                <p className="text-xs text-zinc-400">Interactive live commerce drops happening right now</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('live-now')}
              className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            >
              <span>View All Streams</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Live Streams Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeStreams.map((channel) => (
              <div
                key={channel.id}
                className="bg-zinc-900/90 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-lg"
              >
                {/* Top Image Stream Stage */}
                <div className="relative h-48 overflow-hidden bg-zinc-950">
                  <img
                    src={channel.videoUrl}
                    alt={channel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600 text-white font-extrabold text-[10px] animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      LIVE
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-semibold backdrop-blur-sm border border-white/10 flex items-center gap-1">
                      <Eye className="w-3 h-3 text-emerald-400" />
                      {channel.viewers.toLocaleString()}
                    </span>
                  </div>

                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-extrabold">
                    {channel.discountPercent}% OFF
                  </span>

                  {/* Hover Quick Join Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      onClick={() => onJoinStream(channel.id)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl transform group-hover:scale-105 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Join Live Stream</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Creator Identity */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={channel.hostAvatar}
                          alt={channel.hostName}
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-blue-500/50"
                        />
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-semibold text-zinc-200">{channel.hostName}</span>
                          {channel.isVerified && <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400" />}
                        </div>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-medium">{channel.category}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white line-clamp-1 text-left group-hover:text-blue-400 transition-colors">
                      {channel.title}
                    </h3>
                  </div>

                  {/* Featured Product Box */}
                  <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={channel.featuredProductThumbnail}
                        alt={channel.featuredProductTitle}
                        className="w-10 h-10 rounded-lg object-cover border border-zinc-800 shrink-0"
                      />
                      <div className="min-w-0 text-left">
                        <div className="text-[10px] text-zinc-400 uppercase font-semibold">Active Drop</div>
                        <div className="text-xs font-bold text-zinc-200 truncate">{channel.featuredProductTitle}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-emerald-400">${channel.featuredProductPrice.toFixed(2)}</span>
                          <span className="text-[10px] text-zinc-500 line-through">${channel.featuredProductOriginalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onJoinStream(channel.id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                    >
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Recommended For You (Curated Live Drops) */}
      <section className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8 border-b border-zinc-800/80 bg-zinc-950">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Recommended For You</h2>
                <p className="text-xs text-zinc-400">Curated products featured across top creator broadcasts</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('shopper-products')}
              className="flex items-center gap-1 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
            >
              <span>Explore All Catalog</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Product Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.slice(0, 4).map((prod) => {
              const inWish = isProductInWishlist
                ? isProductInWishlist(prod.id)
                : wishlistProductIds
                ? wishlistProductIds.includes(prod.id)
                : false;
              return (
                <div
                  key={prod.id}
                  className="bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800/90 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-200 group flex flex-col justify-between"
                >
                  <div className="relative aspect-square bg-zinc-950 overflow-hidden">
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist?.(prod);
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
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-extrabold shadow">
                      {prod.discountPercentage}% OFF
                    </span>

                    {/* Quick Live Indicator */}
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-bold backdrop-blur-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE DEMO AVAILABLE
                    </span>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                        <span>{prod.category}</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span className="font-bold text-zinc-200">{prod.rating}</span>
                          <span className="text-zinc-500">({prod.reviewsCount})</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-teal-400 transition-colors">
                        {prod.title}
                      </h4>

                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1 font-normal">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-black text-white">${prod.salePrice}</span>
                          <span className="text-xs text-zinc-500 line-through ml-1.5">${prod.originalPrice}</span>
                        </div>
                        <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">
                          {prod.stock} left in drop
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleSpotlight(prod)}
                          className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Spotlight
                        </button>
                        <button
                          onClick={() => handleAddToCart(prod)}
                          className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold transition-all shadow cursor-pointer"
                        >
                          + Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Because You Watched Tech Friday (Contextual Discovery) */}
      <section className="px-6 lg:px-12 py-8 border-b border-zinc-800/80 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Because You Watched Tech Friday</h2>
                <p className="text-xs text-zinc-400">Related studio audio gear, mechanical setups, and drone hardware</p>
              </div>
            </div>

            <button
              onClick={() => onJoinStream(heroStream.id)}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Back to Tech Friday Stream</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Context Item 1 */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center gap-4">
              <img
                src={products[0]?.imageUrl || heroStream.featuredProductThumbnail}
                alt="Titanium ANC"
                className="w-20 h-20 rounded-xl object-cover border border-zinc-800 shrink-0"
              />
              <div className="space-y-1 min-w-0 text-left">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">40% OFF FLASH</span>
                <h4 className="text-xs font-bold text-white truncate">Aura Studio ANC Headphones</h4>
                <p className="text-[11px] text-zinc-400">Demonstrated by Alex Vance in CyberTech Arena</p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs font-extrabold text-white">$149.00</span>
                  <button
                    onClick={() => onJoinStream('channel-tech')}
                    className="text-[11px] text-blue-400 hover:underline font-semibold"
                  >
                    Watch Live Demo →
                  </button>
                </div>
              </div>
            </div>

            {/* Context Item 2 */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center gap-4">
              <img
                src={products[3]?.imageUrl || 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'}
                alt="Keyboard"
                className="w-20 h-20 rounded-xl object-cover border border-zinc-800 shrink-0"
              />
              <div className="space-y-1 min-w-0 text-left">
                <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">HOT STREAM DROP</span>
                <h4 className="text-xs font-bold text-white truncate">Orbit 75% Gasket Keyboard</h4>
                <p className="text-[11px] text-zinc-400">Tested live with 8000Hz polling rate</p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs font-extrabold text-white">$119.00</span>
                  <button
                    onClick={() => onJoinStream('channel-gaming')}
                    className="text-[11px] text-teal-400 hover:underline font-semibold"
                  >
                    Watch Live Demo →
                  </button>
                </div>
              </div>
            </div>

            {/* Context Item 3 */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center gap-4">
              <img
                src={products[1]?.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'}
                alt="Watch"
                className="w-20 h-20 rounded-xl object-cover border border-zinc-800 shrink-0"
              />
              <div className="space-y-1 min-w-0 text-left">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">LIMITED 30 PCS</span>
                <h4 className="text-xs font-bold text-white truncate">Vanguard Ceramic Chronograph</h4>
                <p className="text-[11px] text-zinc-400">Showcased in Runway Streetwear stream</p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs font-extrabold text-white">$220.00</span>
                  <button
                    onClick={() => onJoinStream('channel-fashion')}
                    className="text-[11px] text-amber-400 hover:underline font-semibold"
                  >
                    Watch Live Demo →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Creators You May Like (Following Hub) */}
      <section className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8 border-b border-zinc-800/80 bg-zinc-950">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Creators You May Like</h2>
                <p className="text-xs text-zinc-400">Follow creators to get notified when they start broadcasting exclusive drops</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('following')}
              className="flex items-center gap-1 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              <span>Manage Following ({allCreators.filter((c) => c.isFollowed || c.isFollowing).length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allCreators.slice(0, 3).map((creator) => {
              const isFollowed = creator.isFollowed ?? creator.isFollowing ?? false;
              return (
                <div
                  key={creator.id}
                  className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative">
                      <img
                        src={creator.avatarUrl}
                        alt={creator.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/40"
                      />
                      {creator.isLive && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-red-500 ring-2 ring-zinc-900 animate-pulse" />
                      )}
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white truncate">{creator.name}</span>
                        {creator.isVerified && <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400" />}
                      </div>
                      <p className="text-[11px] text-zinc-400">{creator.handle} • {creator.followersCount}</p>
                      <span className="text-[10px] text-purple-300 font-semibold">{creator.category}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => handleFollowToggle(creator.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        isFollowed
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                      }`}
                    >
                      {isFollowed ? 'Following' : '+ Follow'}
                    </button>

                    {creator.isLive && (creator.liveChannelId || creator.streamChannelId) && (
                      <button
                        onClick={() => handleJoin(creator.liveChannelId || creator.streamChannelId!)}
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold flex items-center justify-center gap-1 animate-pulse cursor-pointer"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>Live</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
