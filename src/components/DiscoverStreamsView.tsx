import React, { useState } from 'react';
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
  BellRing,
  ArrowRight,
  Play,
  TrendingUp,
  Award,
  Layers,
  Heart,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Percent,
  Clock,
  Volume2,
} from 'lucide-react';
import { ScreenId, ProductItem } from '../types';
import {
  CONSUMER_LIVE_STREAMS,
  UPCOMING_LIVE_STREAMS,
  ConsumerLiveChannel,
  UpcomingStreamItem,
} from '../data/consumerStreamsData';

interface DiscoverStreamsViewProps {
  onJoinStream?: (channelId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenProductSpotlight?: (product: ProductItem) => void;
  onQuickAddToCart?: (product: ProductItem) => void;
}

export const DiscoverStreamsView: React.FC<DiscoverStreamsViewProps> = ({
  onJoinStream,
  onNavigate,
}) => {
  const handleJoin = (channelId: string) => {
    if (onJoinStream) onJoinStream(channelId);
    else onNavigate('viewer');
  };
  // Search and Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'viewers' | 'discount' | 'trending'>('viewers');
  const [reminders, setReminders] = useState<Record<string, boolean>>({});
  const [previewChannel, setPreviewChannel] = useState<ConsumerLiveChannel | null>(null);

  // Categories list
  const categories = [
    'All',
    'Electronics & Audio',
    'Beauty & Skincare',
    'Fashion & Luxury',
    'Gourmet Culinary',
    'Gaming & Battlestation',
    'Fitness & Recovery',
  ];

  // Filtered and Sorted Live Channels
  const filteredChannels = CONSUMER_LIVE_STREAMS.filter((channel) => {
    const matchesCategory = selectedCategory === 'All' || channel.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      channel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.featuredProductTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'viewers') return b.viewers - a.viewers;
    if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
    return b.products.length - a.products.length;
  });

  // Featured Spotlight Hero Stream (#1 Most Popular or Selected)
  const heroChannel = CONSUMER_LIVE_STREAMS[0];

  // Toggle Reminder for Upcoming Drops
  const handleToggleReminder = (id: string) => {
    setReminders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Total Live Metrics calculation
  const totalLiveViewers = CONSUMER_LIVE_STREAMS.reduce((sum, c) => sum + c.viewers, 0);
  const totalActiveDrops = CONSUMER_LIVE_STREAMS.reduce((sum, c) => sum + c.products.length, 0);

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-zinc-900 dark:text-white overflow-y-auto min-h-0">
      {/* 1. Top Highlights Banner / Stats Strip */}
      <div className="bg-gradient-to-r from-red-500/10 via-teal-500/10 to-blue-500/10 dark:from-red-950/40 dark:via-teal-950/30 dark:to-blue-950/40 border-b border-zinc-200 dark:border-zinc-800/80 px-6 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>LIVE SHOPPING NETWORK</span>
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium hidden sm:inline">
              Watch interactive creator broadcasts, ask questions in real-time, and grab exclusive flash deals.
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs">
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
              <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span><strong className="text-zinc-900 dark:text-white font-bold">{totalLiveViewers.toLocaleString()}</strong> Shopping Live</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
              <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span><strong className="text-zinc-900 dark:text-white font-bold">{totalActiveDrops}</strong> Live Product Drops</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hidden md:flex">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Verified Creator Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-8">
        {/* 2. Hero Spotlight: Trending Live Shopping Drop */}
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group preserve-dark" data-theme-preserve="dark">
          {/* Background Video/Image Backdrop with Gradient */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={heroChannel.videoUrl}
              alt={heroChannel.title}
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left Content */}
            <div className="max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-red-600/30 animate-pulse">
                  <Radio className="w-3.5 h-3.5" />
                  <span>TRENDING #1 STREAM</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-extrabold flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>CODE: {heroChannel.promoCode} ({heroChannel.discountLabel})</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-zinc-200 text-xs font-semibold">
                  {heroChannel.duration}
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  {heroChannel.title}
                </h1>
                <p className="text-sm sm:text-base text-zinc-200 mt-2 font-normal">
                  Hosted by <strong className="text-white font-bold">{heroChannel.hostName}</strong> • {heroChannel.category}
                </p>
              </div>

              {/* Creator Host Snippet */}
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={heroChannel.hostAvatar}
                  alt={heroChannel.hostName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">{heroChannel.hostName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                  </div>
                  <span className="text-[11px] text-zinc-300">{heroChannel.hostFollowers} Followers</span>
                </div>
                <div className="h-6 w-px bg-zinc-700 mx-2" />
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/70 px-3 py-1 rounded-lg border border-emerald-500/30">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{heroChannel.viewers.toLocaleString()} watching right now</span>
                </div>
              </div>

              {/* Join Live Stream CTA */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleJoin(heroChannel.id)}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-blue-600 to-teal-600 hover:from-red-500 hover:to-teal-500 text-white text-sm font-black shadow-xl shadow-blue-600/30 border border-white/20 transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Join Live Stream & Shop Deals</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => setPreviewChannel(heroChannel)}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-100 hover:text-white text-xs font-bold border border-zinc-600 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Preview Drops ({heroChannel.products.length})</span>
                </button>
              </div>
            </div>

            {/* Right Product Drop Spotlight Card */}
            <div className="w-full lg:w-80 bg-zinc-950/90 backdrop-blur-xl border border-zinc-700/80 rounded-2xl p-4 shadow-2xl space-y-3 shrink-0 ring-1 ring-white/10 preserve-dark" data-theme-preserve="dark">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  CURRENT LIVE DROP
                </span>
                <span className="text-[11px] font-bold text-red-400 animate-pulse">25% OFF APPLIED</span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={heroChannel.featuredProductThumbnail}
                  alt={heroChannel.featuredProductTitle}
                  className="w-16 h-16 rounded-xl object-cover bg-black border border-zinc-700 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white leading-tight truncate">
                    {heroChannel.featuredProductTitle}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-base font-black text-white">
                      ${heroChannel.featuredProductPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-zinc-400 line-through">
                      ${heroChannel.featuredProductOriginalPrice}
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                    ✓ In Stock • Instant Buy Ready
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleJoin(heroChannel.id)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Enter Stream to Buy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Search, Category Filter Bar & Sorting */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search live streams, creators, products, or keywords..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">Sort by:</span>
              <div className="flex items-center bg-zinc-900 p-0.5 rounded-xl border border-zinc-800 text-xs font-bold">
                <button
                  onClick={() => setSortBy('viewers')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    sortBy === 'viewers' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  Most Popular
                </button>
                <button
                  onClick={() => setSortBy('discount')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    sortBy === 'discount' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  Biggest Discounts
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400'
                      : 'bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Active Live Streams Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              <h2 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                Ongoing Live Streams ({filteredChannels.length})
              </h2>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
              Real-Time Interactive Drops
            </span>
          </div>

          {filteredChannels.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center space-y-3">
              <Search className="w-8 h-8 text-zinc-400 mx-auto" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">No active livestreams match your criteria</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                Try searching for different keywords or resetting the category filter to explore other broadcasts.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Stream Video Preview Thumbnail */}
                    <div
                      className="relative aspect-video bg-black overflow-hidden cursor-pointer preserve-dark"
                      data-theme-preserve="dark"
                      onClick={() => handleJoin(channel.id)}
                    >
                      <img
                        src={channel.videoUrl}
                        alt={channel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                      {/* Top HUD Pills */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                          <Radio className="w-3 h-3" />
                          <span>LIVE</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-bold border border-white/15 flex items-center gap-1">
                          <Eye className="w-3 h-3 text-emerald-400" />
                          <span>{channel.viewers.toLocaleString()}</span>
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-black shadow-md">
                          {channel.discountPercent}% OFF
                        </span>
                      </div>

                      {/* Hover Overlay Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] z-10">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>

                      {/* Bottom Ticker: Current Item Dropping */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl p-2 flex items-center justify-between gap-2 shadow-lg z-10 preserve-dark" data-theme-preserve="dark">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={channel.featuredProductThumbnail}
                            alt={channel.featuredProductTitle}
                            className="w-7 h-7 rounded-lg object-cover bg-zinc-800 shrink-0 border border-white/10"
                          />
                          <div className="min-w-0">
                            <span className="text-[9px] text-amber-300 font-extrabold uppercase tracking-wider block">
                              Active Drop
                            </span>
                            <span className="text-[11px] font-bold text-white truncate block">
                              {channel.featuredProductTitle}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-white">
                            ${channel.featuredProductPrice.toFixed(0)}
                          </span>
                          <span className="text-[10px] text-zinc-400 line-through block">
                            ${channel.featuredProductOriginalPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stream Content Details */}
                    <div className="p-4 space-y-3">
                      {/* Host Profile Info */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={channel.hostAvatar}
                            alt={channel.hostName}
                            className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-zinc-900 dark:text-white">{channel.hostName}</span>
                              {channel.isVerified && (
                                <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400 fill-blue-400/20" />
                              )}
                            </div>
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{channel.category}</span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-md border border-zinc-700">
                          {channel.products.length} Drops
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => handleJoin(channel.id)}
                        className="text-sm font-bold text-zinc-900 dark:text-white leading-snug line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        {channel.title}
                      </h3>

                      {/* Stream Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {channel.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium bg-zinc-950 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-md border border-zinc-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 pt-0 space-y-2">
                    <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400">Stream Promo:</span>
                      <strong className="text-amber-600 dark:text-amber-400 font-mono font-bold">{channel.promoCode}</strong>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleJoin(channel.id)}
                        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 via-blue-600 to-teal-600 hover:from-red-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Join Stream</span>
                      </button>

                      <button
                        onClick={() => setPreviewChannel(channel)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-colors cursor-pointer border border-zinc-700"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-zinc-400" />
                        <span>View Drops</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. Upcoming Scheduled Drops & Events Section */}
        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                Upcoming Live Shopping Drops
              </h2>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
              Exclusive Product Debuts & Auctions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_LIVE_STREAMS.map((item) => {
              const isReminded = !!reminders[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Preview */}
                    <div
                      className="relative aspect-video bg-black overflow-hidden preserve-dark"
                      data-theme-preserve="dark"
                    >
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                      <div className="absolute top-3 left-3 bg-blue-950/90 text-blue-200 border border-blue-500/30 px-2.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 z-10">
                        <Clock className="w-3 h-3" />
                        <span>{item.scheduledTime}</span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block">
                          DEBUT DROP:
                        </span>
                        <span className="text-xs font-bold text-white truncate block">
                          {item.exclusiveDropName}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.hostAvatar}
                          alt={item.hostName}
                          className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{item.hostName}</h4>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{item.category}</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400">{item.promoTeaser}</p>

                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((t, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-medium bg-zinc-950 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded border border-zinc-800"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reminder CTA Button */}
                  <div className="p-4 pt-0 flex items-center justify-between gap-3 border-t border-zinc-800/80 mt-2">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                      <strong className="text-zinc-900 dark:text-white font-bold">{item.rsvpCount + (isReminded ? 1 : 0)}</strong> RSVPs
                    </span>

                    <button
                      onClick={() => handleToggleReminder(item.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isReminded
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-700'
                      }`}
                    >
                      {isReminded ? (
                        <>
                          <BellRing className="w-3.5 h-3.5 text-white" />
                          <span>Reminder Set</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>Remind Me</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. Quick Drops Preview Modal (if opened) */}
      {previewChannel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-red-400">
                  LIVE STREAM DROPS PREVIEW
                </span>
                <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">{previewChannel.name}</h3>
              </div>
              <button
                onClick={() => setPreviewChannel(null)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {previewChannel.products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-14 h-14 rounded-xl object-cover bg-black border border-zinc-700 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-1">{prod.title}</h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-black text-zinc-900 dark:text-white">
                          ${(prod.salePrice * (1 - previewChannel.discountPercent / 100)).toFixed(2)}
                        </span>
                        <span className="text-xs text-zinc-400 line-through">${prod.originalPrice}</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{prod.stock} units left</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setPreviewChannel(null);
                      handleJoin(previewChannel.id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 transition-colors cursor-pointer"
                  >
                    Buy on Stream
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                Promo Code: <strong className="text-amber-600 dark:text-amber-400 font-mono">{previewChannel.promoCode}</strong>
              </div>
              <button
                onClick={() => {
                  setPreviewChannel(null);
                  handleJoin(previewChannel.id);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                Join Broadcast Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
