import React, { useState } from 'react';
import {
  Radio,
  Eye,
  Play,
  Search,
  Filter,
  Flame,
  CheckCircle2,
  Sparkles,
  Users,
  Tag,
  Zap,
  Star,
  ExternalLink,
  ChevronRight,
  ShoppingBag,
  Volume2,
  Share2,
} from 'lucide-react';
import { ScreenId, ProductItem } from '../types';
import {
  CONSUMER_LIVE_STREAMS,
  ConsumerLiveChannel,
} from '../data/consumerStreamsData';

interface LiveNowViewProps {
  onJoinStream?: (channelId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenProductSpotlight?: (product: ProductItem) => void;
  onQuickAddToCart?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
}

export const LiveNowView: React.FC<LiveNowViewProps> = ({
  onJoinStream,
  onNavigate,
  onOpenProductSpotlight,
  onQuickAddToCart,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreviewId, setActivePreviewId] = useState<string>('channel-tech');

  const handleJoin = (channelId: string) => {
    if (onJoinStream) onJoinStream(channelId);
    else onNavigate('viewer');
  };

  const handleSpotlight = (product: ProductItem) => {
    if (onOpenProductSpotlight) onOpenProductSpotlight(product);
    else onNavigate('cart');
  };

  const handleAddToCart = (product: ProductItem) => {
    if (onQuickAddToCart) onQuickAddToCart(product);
    else if (onAddToCart) onAddToCart(product);
  };

  const categories = [
    'All',
    'Electronics & Audio',
    'Beauty & Skincare',
    'Fashion & Luxury',
    'Gourmet Culinary',
    'Gaming & Battlestation',
    'Fitness & Recovery',
  ];

  const filteredChannels = CONSUMER_LIVE_STREAMS.filter((channel) => {
    const matchesCat = selectedCategory === 'All' || channel.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      channel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.featuredProductTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const previewChannel = CONSUMER_LIVE_STREAMS.find((c) => c.id === activePreviewId) || CONSUMER_LIVE_STREAMS[0];

  const totalViewers = CONSUMER_LIVE_STREAMS.reduce((sum, c) => sum + c.viewers, 0);

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-white overflow-y-auto min-h-0">
      {/* 1. Header & Live Telemetry Strip */}
      <div className="bg-zinc-900/60 border-b border-zinc-800/80 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>ON AIR DIRECTORY</span>
              </span>
              <span className="text-xs text-zinc-400 font-semibold">
                • {CONSUMER_LIVE_STREAMS.length} Active Creator Broadcasts
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Live Channels Now Broadcasting
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Join active livestreams, participate in live Q&A, and claim real-time stream drop discounts.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 shrink-0">
            <div className="text-left">
              <div className="text-[10px] text-zinc-400 uppercase font-semibold">Global Viewers</div>
              <div className="text-lg font-black text-emerald-400">{totalViewers.toLocaleString()}</div>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div className="text-left">
              <div className="text-[10px] text-zinc-400 uppercase font-semibold">Avg Discount</div>
              <div className="text-lg font-black text-amber-400">28% OFF</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Live Directory Content */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 space-y-6">
        {/* Category Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search live hosts, drops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Highlighted Stage + Stream List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Stage Preview (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
              <img
                src={previewChannel.videoUrl}
                alt={previewChannel.title}
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black animate-pulse shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    LIVE ON AIR
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    {previewChannel.viewers.toLocaleString()} watching
                  </span>
                </div>

                <span className="px-3 py-1 rounded-xl bg-amber-500 text-black text-xs font-black shadow">
                  {previewChannel.discountLabel}
                </span>
              </div>

              {/* Stream Details Lower Third */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-900/95 backdrop-blur-md border border-zinc-700/90 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={previewChannel.hostAvatar}
                      alt={previewChannel.hostName}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500"
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-white">{previewChannel.hostName}</span>
                        {previewChannel.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />}
                      </div>
                      <span className="text-[11px] text-zinc-400">{previewChannel.category} • {previewChannel.hostFollowers} followers</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    CODE: {previewChannel.promoCode}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white text-left line-clamp-1">
                  {previewChannel.title}
                </h3>

                {/* Featured Drop Action */}
                <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={previewChannel.featuredProductThumbnail}
                      alt={previewChannel.featuredProductTitle}
                      className="w-10 h-10 rounded-lg object-cover border border-zinc-700"
                    />
                    <div className="text-left">
                      <div className="text-[10px] text-zinc-400 uppercase font-semibold">Active Flash Drop</div>
                      <div className="text-xs font-bold text-white line-clamp-1">{previewChannel.featuredProductTitle}</div>
                      <div className="text-xs font-black text-emerald-400">${previewChannel.featuredProductPrice.toFixed(2)}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoin(previewChannel.id)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch Full Stage</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Channels Selector Column (Right 5 Columns) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider text-left px-1 flex items-center justify-between">
              <span>All Active Channels</span>
              <span>{filteredChannels.length} Streams</span>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredChannels.map((channel) => {
                const isSelected = channel.id === activePreviewId;
                return (
                  <div
                    key={channel.id}
                    onClick={() => setActivePreviewId(channel.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer text-left flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-zinc-900 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={channel.videoUrl}
                          alt={channel.title}
                          className="w-16 h-12 rounded-lg object-cover"
                        />
                        <span className="absolute bottom-1 right-1 px-1 rounded bg-red-600 text-white text-[9px] font-black">
                          LIVE
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white truncate">{channel.hostName}</span>
                          <span className="text-[10px] text-zinc-500">•</span>
                          <span className="text-[10px] text-emerald-400 font-semibold">{channel.viewers.toLocaleString()} CCV</span>
                        </div>
                        <p className="text-xs text-zinc-300 truncate font-medium">{channel.title}</p>
                        <span className="text-[10px] text-amber-400 font-semibold">{channel.discountLabel}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoin(channel.id);
                      }}
                      className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shrink-0 transition-colors cursor-pointer"
                      title="Enter Live Stream"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
