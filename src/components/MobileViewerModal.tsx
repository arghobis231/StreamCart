import React, { useState } from 'react';
import {
  ProductItem,
  ChatMessage,
  LivePoll,
  ActiveOverlays,
  FlashDealState,
  CameraId,
} from '../types';
import {
  Heart,
  MessageCircle,
  Share2,
  ShoppingBag,
  Zap,
  X,
  Check,
  Sparkles,
  ChevronRight,
  Flame,
  Send,
  Star,
  ShieldCheck,
  Clock,
  Pin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../utils/audioSynthesizer';

interface MobileViewerModalProps {
  activeCamera: CameraId;
  activeProduct: ProductItem | null;
  flashDeal: FlashDealState;
  overlays: ActiveOverlays;
  chatMessages: ChatMessage[];
  activePoll: LivePoll | null;
  likesCount: number;
  onSendLike: () => void;
  onSendMessage: (text: string) => void;
  onVotePoll: (optionId: string) => void;
  onInstantBuy: (product: ProductItem, variantName: string, price: number) => void;
  onClose?: () => void;
  isStandalone?: boolean;
}

export const MobileViewerModal: React.FC<MobileViewerModalProps> = ({
  activeCamera,
  activeProduct,
  flashDeal,
  overlays,
  chatMessages,
  activePoll,
  likesCount,
  onSendLike,
  onSendMessage,
  onVotePoll,
  onInstantBuy,
  onClose,
  isStandalone = false,
}) => {
  const [commentInput, setCommentInput] = useState('');
  const [showProductSheet, setShowProductSheet] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [hasPurchased, setHasPurchased] = useState<boolean>(false);

  // Pick initial variant
  React.useEffect(() => {
    if (activeProduct && activeProduct.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(activeProduct.variants[0].name);
    }
  }, [activeProduct]);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onSendMessage(commentInput.trim());
    setCommentInput('');
  };

  const handleBuy = () => {
    if (!activeProduct) return;
    setIsBuying(true);
    soundEngine.playChaChing();

    setTimeout(() => {
      const finalPrice =
        flashDeal.isActive && flashDeal.product?.id === activeProduct.id
          ? Math.round(
              activeProduct.salePrice * (1 - flashDeal.discountBonusPercent / 100)
            )
          : activeProduct.salePrice;

      onInstantBuy(activeProduct, selectedVariant || 'Standard', finalPrice);
      setIsBuying(false);
      setHasPurchased(true);
      setTimeout(() => {
        setHasPurchased(false);
        setShowProductSheet(false);
      }, 1600);
    }, 600);
  };

  return (
    <div
      className={`relative mx-auto flex flex-col bg-black overflow-hidden shadow-2xl ${
        isStandalone
          ? 'w-full max-w-[390px] h-[780px] rounded-[42px] border-[10px] border-zinc-900 ring-1 ring-zinc-700'
          : 'w-full h-full rounded-2xl'
      }`}
    >
      {/* Mobile Screen Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-900 rounded-full z-40" />

      {/* Live Video Feed Background */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        <img
          src={
            activeCamera === 'cam2'
              ? activeProduct?.imageUrl ||
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
              : activeCamera === 'cam3'
              ? activeProduct?.secondaryImageUrl ||
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
              : 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1000&auto=format&fit=crop&q=80'
          }
          alt="Live Stream Feed"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />
      </div>

      {/* Top Mobile Stream Bar */}
      <div className="relative z-20 pt-8 px-4 flex items-center justify-between">
        {/* Host Avatar & Follow Pill */}
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md p-1 pr-3 rounded-full border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Host"
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-full object-cover border border-amber-400"
          />
          <div>
            <div className="text-[11px] font-bold text-white leading-tight">Sarah Jenkins</div>
            <div className="text-[9px] text-zinc-400">4.8k Viewers</div>
          </div>
          <button className="ml-1 px-2 py-0.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px]">
            Follow
          </button>
        </div>

        {/* Live Badge & Close */}
        <div className="flex items-center gap-1.5">
          <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse tracking-wider">
            LIVE
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Flash Drop Timer Top Alert */}
      {overlays.showFlashTimer && flashDeal.isActive && (
        <div className="relative z-20 px-4 mt-3">
          <div className="bg-gradient-to-r from-red-600/95 via-amber-600/95 to-red-600/95 text-white p-2 rounded-xl border border-amber-300/40 shadow-lg flex items-center justify-between text-xs font-bold animate-pulse">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-current text-amber-200" />
              <span>FLASH DROP: {flashDeal.discountBonusPercent}% OFF</span>
            </div>
            <div className="font-mono text-xs bg-black/40 px-2 py-0.5 rounded text-amber-200 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                {Math.floor(flashDeal.secondsRemaining / 60)}:
                {(flashDeal.secondsRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Live Poll in-stream widget */}
      {overlays.showLivePoll && activePoll && activePoll.isActive && (
        <div className="relative z-20 px-4 mt-2">
          <div className="bg-zinc-950/90 border border-indigo-500/60 backdrop-blur-md rounded-xl p-2.5 text-white">
            <div className="flex items-center justify-between text-[10px] font-mono text-indigo-300 font-bold mb-1">
              <span>📊 LIVE POLL</span>
              <span>{activePoll.totalVotes} votes</span>
            </div>
            <div className="text-xs font-bold mb-2">{activePoll.question}</div>
            <div className="space-y-1.5">
              {activePoll.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onVotePoll(opt.id)}
                  className="w-full text-left relative overflow-hidden rounded-lg bg-zinc-900 border border-zinc-700/80 p-1.5 hover:border-indigo-400 transition-all"
                >
                  <div
                    className="absolute inset-0 bg-indigo-600/40"
                    style={{
                      width: `${
                        activePoll.totalVotes > 0
                          ? Math.round((opt.votes / activePoll.totalVotes) * 100)
                          : 50
                      }%`,
                    }}
                  />
                  <div className="relative flex justify-between items-center text-[11px] font-medium px-1">
                    <span>{opt.text}</span>
                    <span className="font-mono font-bold text-indigo-200">
                      {activePoll.totalVotes > 0
                        ? Math.round((opt.votes / activePoll.totalVotes) * 100)
                        : 50}
                      %
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Middle Spacer */}
      <div className="flex-1" />

      {/* Live Chat Stream (Overlay on bottom half) */}
      <div className="relative z-20 px-4 pb-2 max-h-48 overflow-y-auto space-y-1.5 mask-gradient-bottom">
        {chatMessages.slice(-5).map((msg) => (
          <div
            key={msg.id}
            className="inline-flex items-start gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs max-w-[90%]"
          >
            <span className="font-bold text-amber-300 truncate max-w-[80px]">
              {msg.user}:
            </span>
            <span className="text-zinc-100 truncate">{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Spotlight Active Product Pill (Bottom Bar Trigger) */}
      {activeProduct && overlays.showProductSpotlight && (
        <div className="relative z-20 px-4 mb-2">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={() => setShowProductSheet(true)}
            className="flex items-center gap-2.5 p-2 rounded-2xl bg-zinc-950/95 border border-amber-500/50 backdrop-blur-xl shadow-2xl cursor-pointer hover:border-amber-400 transition-all text-white"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700">
              <img
                src={activeProduct.imageUrl}
                alt={activeProduct.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-0.5 left-0.5 bg-red-600 text-white font-black text-[7px] px-1 rounded uppercase">
                #1
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold truncate">{activeProduct.title}</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xs font-black text-amber-400 font-mono">
                  $
                  {flashDeal.isActive && flashDeal.product?.id === activeProduct.id
                    ? Math.round(
                        activeProduct.salePrice * (1 - flashDeal.discountBonusPercent / 100)
                      )
                    : activeProduct.salePrice}
                </span>
                <span className="text-[10px] text-zinc-400 line-through font-mono">
                  ${activeProduct.originalPrice}
                </span>
                <span className="text-[9px] text-red-400 font-semibold">
                  Only {activeProduct.stock} left!
                </span>
              </div>
            </div>

            <button className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shrink-0 flex items-center gap-1 shadow-md">
              <span>BUY</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </motion.div>
        </div>
      )}

      {/* Bottom Mobile Action Bar (Chat Input + Hearts Reaction) */}
      <div className="relative z-20 px-4 pb-6 pt-1 flex items-center gap-2">
        <form onSubmit={handleSendComment} className="flex-1 flex items-center">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Say something nice to host..."
            className="w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-amber-400"
          />
        </form>

        {/* Bag Icon */}
        <button
          onClick={() => setShowProductSheet(true)}
          className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 hover:scale-105 active:scale-95 transition-all shadow-md relative"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">
            1
          </span>
        </button>

        {/* Heart Like Button (Spam clicks) */}
        <button
          onClick={() => {
            onSendLike();
            soundEngine.playChime();
          }}
          className="w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-125 flex items-center justify-center text-white transition-all shadow-lg shadow-rose-950"
        >
          <Heart className="w-5 h-5 fill-current animate-pulse" />
        </button>
      </div>

      {/* Mobile Purchase Bottom Sheet Drawer */}
      <AnimatePresence>
        {showProductSheet && activeProduct && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-zinc-950 border-t border-zinc-800 rounded-t-3xl p-5 text-white max-h-[80%] overflow-y-auto"
            >
              {/* Drawer handle & Close */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-current" /> LIVE STREAM EXCLUSIVE DROP
                </span>
                <button
                  onClick={() => setShowProductSheet(false)}
                  className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Product Header */}
              <div className="flex gap-3 mb-4">
                <img
                  src={activeProduct.imageUrl}
                  alt={activeProduct.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover bg-zinc-800 border border-zinc-700"
                />
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                    {activeProduct.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-lg font-black text-amber-400 font-mono">
                      $
                      {flashDeal.isActive && flashDeal.product?.id === activeProduct.id
                        ? Math.round(
                            activeProduct.salePrice * (1 - flashDeal.discountBonusPercent / 100)
                          )
                        : activeProduct.salePrice}
                    </span>
                    <span className="text-xs text-zinc-500 line-through font-mono">
                      ${activeProduct.originalPrice}
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3" /> Same-Day VIP Dispatch Included
                  </div>
                </div>
              </div>

              {/* Variants Selector */}
              {activeProduct.variants.length > 0 && (
                <div className="mb-4">
                  <label className="text-xs font-semibold text-zinc-300 block mb-2">
                    Select Color / Edition:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v.name)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 border transition-all ${
                          selectedVariant === v.name
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/20"
                          style={{ backgroundColor: v.colorHex }}
                        />
                        <span>{v.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Highlights */}
              <div className="mb-5 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 space-y-1 text-[11px] text-zinc-300">
                {activeProduct.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-amber-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Instant 1-Tap Buy Button */}
              <button
                onClick={handleBuy}
                disabled={isBuying || activeProduct.stock <= 0}
                className={`w-full py-3.5 rounded-2xl font-black text-sm tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 ${
                  hasPurchased
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black shadow-amber-900/40 active:scale-98'
                }`}
              >
                {hasPurchased ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>ORDER CONFIRMED! 🎉</span>
                  </>
                ) : isBuying ? (
                  <span>PROCESSING INSTANT CHECKOUT...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>1-TAP INSTANT BUY WITH APPLE PAY</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
