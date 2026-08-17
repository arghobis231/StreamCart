import React from 'react';
import {
  Heart,
  ShoppingCart,
  Trash2,
  Play,
  Sparkles,
  ArrowRight,
  Radio,
  ExternalLink,
  ShieldCheck,
  Tag,
  Star,
} from 'lucide-react';
import { WishlistItem, ProductItem, ScreenId } from '../types';

interface WishlistViewProps {
  wishlistItems?: WishlistItem[];
  wishlist?: WishlistItem[];
  onRemoveWishlistItem?: (wishlistId: string) => void;
  onRemoveFromWishlist?: (wishlistId: string) => void;
  onMoveToCart?: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  onClearWishlist?: () => void;
  onOpenProductSpotlight?: (product: ProductItem) => void;
  onJoinStream?: (channelId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistItems,
  wishlist,
  onRemoveWishlistItem,
  onRemoveFromWishlist,
  onMoveToCart,
  onAddToCart,
  onClearWishlist,
  onOpenProductSpotlight,
  onJoinStream,
  onNavigate,
}) => {
  const items = wishlistItems || wishlist || [];

  const handleRemove = (id: string) => {
    if (onRemoveWishlistItem) onRemoveWishlistItem(id);
    else if (onRemoveFromWishlist) onRemoveFromWishlist(id);
  };

  const handleAddToCart = (product: ProductItem) => {
    if (onMoveToCart) onMoveToCart(product);
    else if (onAddToCart) onAddToCart(product);
  };

  const handleSpotlight = (product: ProductItem) => {
    if (onOpenProductSpotlight) onOpenProductSpotlight(product);
    else onNavigate('cart');
  };

  const handleJoin = (channelId: string) => {
    if (onJoinStream) onJoinStream(channelId);
    else onNavigate('viewer');
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-white overflow-y-auto min-h-0 text-left">
      {/* Top Banner Header */}
      <div className="bg-zinc-900/60 border-b border-zinc-800/80 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase">
                Saved Items
              </span>
              <span className="text-xs text-zinc-400 font-semibold">• {items.length} Products Saved</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Wishlist & Price Alerts
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Track upcoming price drops, stock levels, and get notified when creators spotlight your saved items on stream.
            </p>
          </div>

          {items.length > 0 && onClearWishlist && (
            <button
              onClick={onClearWishlist}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-rose-400 text-xs font-semibold transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 space-y-6">
        {items.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
            <Heart className="w-12 h-12 text-zinc-600 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-white">Your wishlist is empty</h3>
              <p className="text-xs text-zinc-400 mt-1">Tap the heart icon on any stream drop or catalog item to save it for later.</p>
            </div>
            <button
              onClick={() => onNavigate('shopper-products')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-bold shadow-lg cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, idx) => {
              const prod = item.product;
              const itemId = item.id || item.productId || prod?.id || `wish-${idx}`;
              if (!prod) return null;

              return (
                <div
                  key={itemId}
                  className="bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 space-y-3 flex flex-col justify-between transition-all shadow-lg"
                >
                  <div className="space-y-3">
                    {/* Top Row: Thumbnail + Title + Price */}
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={prod.imageUrl}
                          alt={prod.title}
                          className="w-20 h-20 rounded-xl object-cover border border-zinc-800"
                        />
                        <span className="absolute -top-1.5 -left-1.5 px-1.5 py-0.2 rounded bg-emerald-500 text-white text-[9px] font-black">
                          {prod.discountPercentage}% OFF
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] text-zinc-400 font-semibold">{prod.category}</span>
                        <h3
                          onClick={() => handleSpotlight(prod)}
                          className="text-sm font-bold text-white line-clamp-1 hover:text-teal-400 transition-colors cursor-pointer"
                        >
                          {prod.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-base font-black text-white">${prod.salePrice}</span>
                          <span className="text-xs text-zinc-500 line-through">${prod.originalPrice}</span>
                        </div>
                        <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.2 rounded mt-1 inline-block">
                          {prod.stock} in stock
                        </span>
                      </div>
                    </div>

                    {/* LIVE Status Alert if currently featured */}
                    {(item.isLiveNow || item.liveChannelId) && (
                      <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                          <div className="min-w-0">
                            <div className="text-[10px] font-black text-red-400 uppercase">LIVE NOW ON AIR</div>
                            <div className="text-xs font-bold text-zinc-200 truncate">{item.liveHostName || 'Creator'} is demonstrating this</div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleJoin(item.liveChannelId || item.streamChannelId || 'channel-tech')}
                          className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Watch</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-zinc-800 flex items-center gap-2">
                    <button
                      onClick={() => handleAddToCart(prod)}
                      className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>

                    <button
                      onClick={() => handleRemove(itemId)}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
