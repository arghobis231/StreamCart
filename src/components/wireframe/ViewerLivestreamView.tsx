import React, { useState } from 'react';
import {
  ScreenId,
  ProductItem,
  ChatMessage,
} from '../../types';
import {
  Heart,
  MessageSquare,
  Share2,
  ShoppingCart,
  Zap,
  Users,
  Star,
  Flame,
  Send,
  Plus,
  Check,
  ChevronRight,
  Maximize2,
  Volume2,
  Eye,
  Radio,
} from 'lucide-react';
import { WireframeBox, WireframeButton, WireframeBadge, WireframeCard } from './WireframeUI';

interface ViewerLivestreamViewProps {
  onNavigate: (screen: ScreenId) => void;
  products: ProductItem[];
  activeFeaturedProduct: ProductItem;
  onSelectFeaturedProduct: (product: ProductItem) => void;
  chatMessages: ChatMessage[];
  onSendChatMessage: (text: string) => void;
  onOpenSpotlight: (product: ProductItem) => void;
  onOpenCheckout: (product: ProductItem) => void;
  onSimulateLike: () => void;
}

export const ViewerLivestreamView: React.FC<ViewerLivestreamViewProps> = ({
  onNavigate,
  products,
  activeFeaturedProduct,
  onSelectFeaturedProduct,
  chatMessages,
  onSendChatMessage,
  onOpenSpotlight,
  onOpenCheckout,
  onSimulateLike,
}) => {
  const [chatInput, setChatInput] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [floatingLikes, setFloatingLikes] = useState<{ id: number; emoji: string }[]>([]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendChatMessage(chatInput.trim());
    setChatInput('');
  };

  const handleReaction = (emoji: string) => {
    onSimulateLike();
    const newLike = { id: Date.now(), emoji };
    setFloatingLikes((prev) => [...prev.slice(-12), newLike]);
  };

  return (
    <div className="flex-1 bg-zinc-950 text-white min-h-screen font-mono flex flex-col select-none">
      {/* Top Viewer Stream Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
        {/* Creator Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-zinc-500 bg-zinc-800 text-white font-bold flex items-center justify-center text-xs">
            SC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-white">Sarah Connor Official</span>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                  isFollowing
                    ? 'bg-zinc-700 text-white border-zinc-600'
                    : 'bg-red-600 hover:bg-red-500 text-white border-red-500'
                }`}
              >
                {isFollowing ? '✓ Following' : '+ Follow'}
              </button>
            </div>
            <div className="text-[10px] text-zinc-400">Mega Tech Friday: Live Drops & Studio Gear</div>
          </div>
        </div>

        {/* Live Badges & Switch to Studio Link */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-red-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>LIVE</span>
          </div>

          <div className="flex items-center gap-1 text-zinc-400 text-[11px] bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
            <Users className="w-3 h-3 text-red-400" />
            <span>3,420 watching</span>
          </div>

          <WireframeButton
            variant="outline"
            size="sm"
            onClick={() => onNavigate('studio')}
            icon={<Radio className="w-3 h-3 text-red-500" />}
          >
            Director Desk
          </WireframeButton>
        </div>
      </div>

      {/* Main Center Area: Large Livestream Player + Side Chat Panel */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 min-h-0 overflow-y-auto">
        {/* Left 8-Cols: Video Player with On-Screen Shopping Widgets */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          {/* Main Video Viewport */}
          <div className="relative bg-zinc-900 border-2 border-zinc-800 rounded-md overflow-hidden aspect-video flex flex-col justify-between shadow-xl">
            {/* Live Video Placeholder Graphic */}
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
              <svg className="absolute inset-0 w-full h-full text-zinc-800 pointer-events-none opacity-50">
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="2" />
                <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="2" />
              </svg>
              <div className="text-center space-y-2 z-10 p-4">
                <div className="bg-black/80 px-3 py-1 rounded text-xs font-bold text-zinc-300 border border-zinc-700">
                  [ VIEWER LIVESTREAM PLAYER: 1080p 60FPS ]
                </div>
                <p className="text-[11px] text-zinc-400">
                  Sarah Connor is demonstrating the "{activeFeaturedProduct.title}" live!
                </p>
              </div>

              {/* Floating Hearts Reaction Animation */}
              <div className="absolute inset-y-0 right-14 w-12 pointer-events-none flex flex-col justify-end">
                {floatingLikes.map((l) => (
                  <div key={l.id} className="text-2xl animate-bounce mb-2">
                    {l.emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* In-Video Top Overlay */}
            <div className="relative z-20 p-3 flex items-center justify-between">
              <div className="bg-amber-400 text-black text-[10px] font-black px-2.5 py-1 rounded border border-amber-500 flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3 h-3 fill-current" />
                <span>⚡ FLASH PROMO: 25% OFF with code TECHLIVE25</span>
              </div>

              <button
                onClick={() => onOpenSpotlight(activeFeaturedProduct)}
                className="bg-black/75 hover:bg-black text-white text-[10px] font-bold px-2 py-1 rounded border border-white/20 flex items-center gap-1"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Spotlight Details</span>
              </button>
            </div>

            {/* In-Video Bottom Overlay: Featured Shoppable Product Box */}
            <div className="relative z-20 p-3">
              {activeFeaturedProduct && (
                <div className="bg-white/95 border-2 border-zinc-900 text-zinc-900 p-3 rounded-md max-w-md shadow-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <WireframeBox label="[ X ]" className="w-14 h-14 rounded shrink-0 bg-zinc-200" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <WireframeBadge variant="live">FEATURED ITEM</WireframeBadge>
                        <div className="flex items-center text-amber-600 text-[10px] font-bold">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>4.9 (342)</span>
                        </div>
                      </div>
                      <div className="font-bold text-xs text-zinc-900 truncate mt-0.5">
                        {activeFeaturedProduct.title}
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-sm font-black text-zinc-900">${activeFeaturedProduct.salePrice}</span>
                        <span className="text-xs text-zinc-500 line-through">${activeFeaturedProduct.originalPrice}</span>
                        <span className="text-[10px] text-red-700 font-bold">
                          Only {activeFeaturedProduct.stock} left!
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => onOpenCheckout(activeFeaturedProduct)}
                      className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded text-xs font-bold uppercase transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
                    >
                      <Zap className="w-3 h-3 fill-current text-amber-400" />
                      <span>Buy Now</span>
                    </button>
                    <button
                      onClick={() => onOpenSpotlight(activeFeaturedProduct)}
                      className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-400 rounded text-[10px] font-bold text-center"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Live Carousel for Shoppers */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-md p-3">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-xs">
              <span className="font-bold text-zinc-300 uppercase">Live Show Catalogue ({products.length} Drops)</span>
              <span className="text-zinc-500 text-[10px]">Instant 1-click in-stream checkout</span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
              {products.map((prod) => {
                const isSelected = prod.id === activeFeaturedProduct.id;
                return (
                  <div
                    key={prod.id}
                    className={`shrink-0 w-48 bg-zinc-800 border rounded p-2.5 flex flex-col justify-between transition-colors ${
                      isSelected ? 'border-amber-400 bg-zinc-800/90' : 'border-zinc-700 hover:border-zinc-500'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <WireframeBox label="[ X ]" className="w-10 h-10 rounded shrink-0 bg-zinc-700" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-white truncate">{prod.title}</div>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-xs font-black text-amber-400">${prod.salePrice}</span>
                          <span className="text-[10px] text-zinc-500 line-through">${prod.originalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-zinc-700 flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenSpotlight(prod)}
                        className="flex-1 py-1 rounded bg-zinc-700 hover:bg-zinc-600 text-white text-[10px] font-bold text-center"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onOpenCheckout(prod)}
                        className="flex-1 py-1 rounded bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-bold text-center"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 4-Cols: Live Chat & Fast Reaction Controls */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-md flex-1 flex flex-col overflow-hidden shadow-md">
            {/* Live Chat Header */}
            <div className="p-2.5 border-b border-zinc-800 bg-zinc-850 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-bold uppercase tracking-wider text-zinc-200">Live Chat</span>
              </div>
              <span className="text-[10px] text-zinc-500">Live Moderated</span>
            </div>

            {/* Chat Stream */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 max-h-[420px]">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="p-2 rounded bg-zinc-800/80 border border-zinc-700/80 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-zinc-600 text-white font-bold flex items-center justify-center text-[8px]">
                        {msg.avatarText || 'U'}
                      </div>
                      <span className="font-bold text-zinc-300">@{msg.user}</span>
                      {msg.badge && (
                        <span className="px-1 py-0.2 bg-amber-400/20 text-amber-300 font-bold rounded text-[8px]">
                          {msg.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-zinc-500">{msg.timestamp}</span>
                  </div>
                  <div className="text-zinc-200">{msg.text}</div>
                </div>
              ))}
            </div>

            {/* Quick Reactions Bar */}
            <div className="px-3 py-1.5 border-t border-zinc-800 bg-zinc-850 flex items-center justify-around">
              {['❤️', '🔥', '👏', '⚡', '🎉'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className="p-1.5 rounded hover:bg-zinc-700 text-lg transition-transform active:scale-125"
                  title="Send Reaction"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Viewer Chat Input */}
            <form onSubmit={handleSendChat} className="p-2.5 border-t border-zinc-800 bg-zinc-900 flex gap-2">
              <input
                type="text"
                placeholder="Ask the creator a question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-zinc-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
