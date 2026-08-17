import React, { useState, useEffect, useRef } from 'react';
import {
  CameraId,
  LayoutMode,
  ProductItem,
  ChatMessage,
  LivePurchaseAlert,
  LivePoll,
  ActiveOverlays,
  FlashDealState,
  BroadcastStatus,
} from '../types';
import {
  Sparkles,
  Zap,
  ShoppingBag,
  Flame,
  CheckCircle2,
  Clock,
  Pin,
  MessageCircle,
  Eye,
  Layers,
  Maximize2,
  Minimize2,
  Camera,
  Heart,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProgramMonitorProps {
  activeCamera: CameraId;
  previewCamera: CameraId;
  layoutMode: LayoutMode;
  status: BroadcastStatus;
  activeProduct: ProductItem | null;
  overlays: ActiveOverlays;
  flashDeal: FlashDealState;
  pinnedComment: ChatMessage | null;
  latestPurchase: LivePurchaseAlert | null;
  activePoll: LivePoll | null;
  likesCount: number;
  onSelectProduct: (product: ProductItem) => void;
  onDismissPinnedComment: () => void;
  isWebcamActive: boolean;
  webcamStream: MediaStream | null;
  hotspotsVisible: boolean;
  setHotspotsVisible: (visible: boolean) => void;
}

export const ProgramMonitor: React.FC<ProgramMonitorProps> = ({
  activeCamera,
  previewCamera,
  layoutMode,
  status,
  activeProduct,
  overlays,
  flashDeal,
  pinnedComment,
  latestPurchase,
  activePoll,
  likesCount,
  onSelectProduct,
  onDismissPinnedComment,
  isWebcamActive,
  webcamStream,
  hotspotsVisible,
  setHotspotsVisible,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; color: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const webcamVideoRef = useRef<HTMLVideoElement>(null);

  // Attach webcam stream if active
  useEffect(() => {
    if (webcamVideoRef.current && webcamStream) {
      webcamVideoRef.current.srcObject = webcamStream;
    }
  }, [webcamStream, isWebcamActive, activeCamera]);

  // Periodic floating hearts animation
  useEffect(() => {
    if (status !== 'LIVE') return;
    const interval = setInterval(() => {
      const colors = ['#EF4444', '#EC4899', '#F59E0B', '#8B5CF6', '#10B981'];
      const newHeart = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setFloatingHearts((prev) => [...prev.slice(-15), newHeart]);
    }, 900);
    return () => clearInterval(interval);
  }, [status]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Render camera video/canvas feed
  const renderCameraFeed = (camId: CameraId, isPip = false) => {
    if (camId === 'cam4' && isWebcamActive && webcamStream) {
      return (
        <video
          ref={webcamVideoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      );
    }

    if (camId === 'cam2') {
      // Macro Close-Up Product Feed
      return (
        <div className="relative w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden">
          <img
            src={activeProduct?.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80'}
            alt="Product Macro View"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-105 brightness-95 animate-pulse duration-[8000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Interactive AR Hotspots */}
          {hotspotsVisible && activeProduct && (
            <>
              {/* Hotspot 1: Material / Driver */}
              <div
                className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                onClick={() => setSelectedHotspot(activeProduct.highlights[0] || 'Titanium Alloy')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-8 h-8 rounded-full bg-cyan-500/30 animate-ping absolute" />
                  <div className="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white shadow-lg flex items-center justify-center text-[9px] font-bold text-black group-hover:scale-125 transition-transform">
                    1
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-zinc-900/95 border border-cyan-500/50 backdrop-blur-md text-white text-[11px] px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-20">
                    <span className="font-semibold text-cyan-300">Spec Detail:</span>
                    <span>{activeProduct.highlights[0]}</span>
                  </div>
                </div>
              </div>

              {/* Hotspot 2: Noise Cancelling / Control */}
              <div
                className="absolute top-[65%] left-[62%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                onClick={() => setSelectedHotspot(activeProduct.highlights[1] || 'Tactile Controls')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-8 h-8 rounded-full bg-amber-500/30 animate-ping absolute" />
                  <div className="w-5 h-5 rounded-full bg-amber-400 border-2 border-white shadow-lg flex items-center justify-center text-[9px] font-bold text-black group-hover:scale-125 transition-transform">
                    2
                  </div>
                  <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-zinc-900/95 border border-amber-500/50 backdrop-blur-md text-white text-[11px] px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-20">
                    <span className="font-semibold text-amber-300">Acoustic Spec:</span>
                    <span>{activeProduct.highlights[1]}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      );
    }

    if (camId === 'cam3') {
      // Overhead Unboxing / Lifestyle Angle
      return (
        <div className="relative w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden">
          <img
            src={activeProduct?.secondaryImageUrl || activeProduct?.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80'}
            alt="Overhead Unboxing"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-100 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
        </div>
      );
    }

    // Default Cam 1: Host Stage Main (Studio Wide)
    return (
      <div className="relative w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1400&auto=format&fit=crop&q=80"
          alt="Studio Host Live Feed"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter contrast-105"
        />
        {/* Soft atmospheric studio lighting gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
      </div>
    );
  };

  const getCameraLabel = (camId: CameraId) => {
    switch (camId) {
      case 'cam1':
        return 'CAM 1 • STUDIO HOST WIDE';
      case 'cam2':
        return 'CAM 2 • MACRO PRODUCT 4K';
      case 'cam3':
        return 'CAM 3 • OVERHEAD UNBOXING';
      case 'cam4':
        return 'CAM 4 • DIRECT WEBCAM / AUX';
      default:
        return 'CAM 1';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col bg-black rounded-xl overflow-hidden border-2 transition-all shadow-2xl ${
        status === 'LIVE' ? 'border-red-600/80 shadow-red-950/40' : 'border-zinc-800'
      } ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full aspect-[16/9] min-h-[320px]'}`}
    >
      {/* Top Program Monitor Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-3.5 py-2 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-auto">
        <div className="flex items-center gap-2">
          {/* Tally Light Indicator */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider ${
              status === 'LIVE'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/50 animate-pulse'
                : 'bg-zinc-800 text-zinc-300'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            PROGRAM (PGM)
          </div>

          <span className="text-[11px] font-mono font-semibold text-zinc-300 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
            {getCameraLabel(activeCamera)}
          </span>

          {layoutMode !== 'single' && (
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              LAYOUT: {layoutMode.toUpperCase()}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* AR Hotspots toggle */}
          <button
            onClick={() => setHotspotsVisible(!hotspotsVisible)}
            className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 border transition-all ${
              hotspotsVisible
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title="Toggle On-Screen Product Hotspots"
          >
            <Layers className="w-3 h-3" />
            <span>Hotspots {hotspotsVisible ? 'ON' : 'OFF'}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1 rounded bg-black/60 hover:bg-black text-zinc-300 hover:text-white border border-white/10 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Video Stage with Layout Modes */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center select-none">
        {layoutMode === 'single' && (
          <div className="w-full h-full">{renderCameraFeed(activeCamera)}</div>
        )}

        {layoutMode === 'pip' && (
          <div className="relative w-full h-full">
            {/* Primary Feed */}
            {renderCameraFeed(activeCamera)}

            {/* PIP Floating Sub-Camera (Preview or Cam 2) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-12 right-4 w-48 h-32 rounded-lg overflow-hidden border-2 border-emerald-500 shadow-2xl bg-black z-10"
            >
              <div className="absolute top-1 left-1 z-10 bg-emerald-600/90 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                PIP • {getCameraLabel(previewCamera)}
              </div>
              {renderCameraFeed(previewCamera, true)}
            </motion.div>
          </div>
        )}

        {layoutMode === 'split' && (
          <div className="w-full h-full grid grid-cols-2 gap-1 bg-zinc-900">
            <div className="relative w-full h-full border-r border-zinc-800">
              <div className="absolute top-12 left-2 z-10 bg-black/70 text-zinc-300 font-mono text-[9px] px-1.5 py-0.5 rounded">
                {getCameraLabel(activeCamera)}
              </div>
              {renderCameraFeed(activeCamera)}
            </div>
            <div className="relative w-full h-full">
              <div className="absolute top-12 left-2 z-10 bg-black/70 text-zinc-300 font-mono text-[9px] px-1.5 py-0.5 rounded">
                {getCameraLabel(previewCamera)}
              </div>
              {renderCameraFeed(previewCamera)}
            </div>
          </div>
        )}

        {layoutMode === 'grid' && (
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 bg-zinc-950">
            <div className="relative w-full h-full">{renderCameraFeed('cam1')}</div>
            <div className="relative w-full h-full">{renderCameraFeed('cam2')}</div>
            <div className="relative w-full h-full">{renderCameraFeed('cam3')}</div>
            <div className="relative w-full h-full">{renderCameraFeed('cam4')}</div>
          </div>
        )}

        {layoutMode === 'mobile_vertical' && (
          <div className="w-full h-full flex items-center justify-center bg-zinc-950">
            <div className="h-full aspect-[9/16] relative border-x border-zinc-800 overflow-hidden shadow-2xl">
              {renderCameraFeed(activeCamera)}
            </div>
          </div>
        )}

        {/* Floating Heart & Reaction Animation Canvas */}
        <div className="absolute right-4 bottom-24 w-20 h-64 pointer-events-none z-20 overflow-hidden flex flex-col justify-end">
          <AnimatePresence>
            {floatingHearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 1, y: 50, scale: 0.6, x: 0 }}
                animate={{
                  opacity: 0,
                  y: -220,
                  scale: [0.6, 1.2, 0.9],
                  x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 40],
                }}
                transition={{ duration: 2.2, ease: 'easeOut' }}
                className="absolute bottom-0"
                style={{ left: `${heart.x}%`, color: heart.color }}
              >
                <Heart className="w-6 h-6 fill-current drop-shadow-md" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* REAL-TIME INTERACTIVE BROADCAST OVERLAYS                 */}
        {/* ======================================================== */}

        {/* 1. Flash Drop Lightning Countdown Banner */}
        {overlays.showFlashTimer && flashDeal.isActive && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className="absolute top-11 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
          >
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white font-bold text-xs shadow-xl shadow-red-900/50 border border-amber-300/40 animate-pulse">
              <Zap className="w-4 h-4 text-amber-200 fill-current animate-bounce" />
              <span className="tracking-wide">
                ⚡ FLASH DEAL: {flashDeal.discountBonusPercent}% OFF APPLIED!
              </span>
              <div className="flex items-center gap-1 font-mono text-sm bg-black/40 px-2 py-0.5 rounded-full text-amber-200">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {Math.floor(flashDeal.secondsRemaining / 60)}:
                  {(flashDeal.secondsRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider bg-amber-400 text-black px-1.5 py-0.5 rounded font-black">
                {flashDeal.unitsCap - flashDeal.unitsClaimed} LEFT
              </span>
            </div>
          </motion.div>
        )}

        {/* 2. Pinned Live Chat Q&A Spotlight on Stream */}
        {overlays.showLiveChatBubble && pinnedComment && (
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            className="absolute top-12 left-4 z-20 max-w-sm pointer-events-auto"
          >
            <div className="bg-zinc-950/90 border border-cyan-500/60 backdrop-blur-md rounded-xl p-3 shadow-2xl text-white">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[10px] font-mono uppercase font-bold text-cyan-300 tracking-wider flex items-center gap-1">
                    <Pin className="w-3 h-3" /> HOST ANSWERING LIVE
                  </span>
                </div>
                <button
                  onClick={onDismissPinnedComment}
                  className="text-zinc-400 hover:text-white text-xs px-1 hover:bg-zinc-800 rounded"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-start gap-2.5">
                <img
                  src={pinnedComment.avatar}
                  alt={pinnedComment.user}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-zinc-700 mt-0.5"
                />
                <div>
                  <div className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                    <span>@{pinnedComment.user}</span>
                    {pinnedComment.isVip && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded border border-amber-500/30">
                        VIP
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white font-medium mt-0.5 leading-snug">
                    "{pinnedComment.text}"
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. Live Purchase Alert Toast Notification */}
        {overlays.showPurchaseToasts && latestPurchase && (
          <motion.div
            key={latestPurchase.id}
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="absolute top-28 right-4 z-20 pointer-events-none"
          >
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-zinc-950/90 border border-emerald-500/60 backdrop-blur-md text-white shadow-2xl">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                🎉
              </div>
              <div>
                <div className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
                  <span>@{latestPurchase.buyerName}</span>
                  <span className="text-[10px] text-zinc-400 font-normal">just bought!</span>
                </div>
                <div className="text-xs font-bold text-white tracking-tight">
                  {latestPurchase.productTitle.slice(0, 32)}...
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 ml-2">
                ${latestPurchase.productPrice}
              </span>
            </div>
          </motion.div>
        )}

        {/* 4. Live Audience Interactive Poll Overlay */}
        {overlays.showLivePoll && activePoll && activePoll.isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-28 left-4 z-20 max-w-xs pointer-events-auto"
          >
            <div className="bg-zinc-950/90 border border-indigo-500/60 backdrop-blur-md rounded-xl p-3 shadow-2xl text-white">
              <div className="flex items-center justify-between text-[10px] font-mono text-indigo-300 font-bold uppercase mb-1">
                <span>📊 LIVE AUDIENCE VOTE</span>
                <span>{activePoll.totalVotes} votes</span>
              </div>
              <div className="text-xs font-bold text-white mb-2">{activePoll.question}</div>
              <div className="space-y-1.5">
                {activePoll.options.map((opt) => {
                  const percent =
                    activePoll.totalVotes > 0
                      ? Math.round((opt.votes / activePoll.totalVotes) * 100)
                      : 50;
                  return (
                    <div key={opt.id} className="relative overflow-hidden rounded-md bg-zinc-800/80 p-1.5">
                      <div
                        className="absolute inset-0 bg-indigo-600/30 transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                      <div className="relative flex justify-between items-center text-[11px] font-medium px-1">
                        <span>{opt.text}</span>
                        <span className="font-mono font-bold text-indigo-200">{percent}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. Spotlight Active Product Card (Bottom Left) */}
        {overlays.showProductSpotlight && activeProduct && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-4 left-4 z-20 max-w-md pointer-events-auto cursor-pointer"
            onClick={() => onSelectProduct(activeProduct)}
          >
            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-zinc-950/95 border border-amber-500/40 backdrop-blur-xl shadow-2xl shadow-black/80 hover:border-amber-400 transition-all">
              {/* Product Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700">
                <img
                  src={activeProduct.imageUrl}
                  alt={activeProduct.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 left-1 bg-amber-500 text-black font-black text-[8px] px-1 rounded uppercase">
                  #{activeProduct.sku.slice(0, 4)}
                </span>
              </div>

              {/* Info & Price */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="px-1.5 py-0.2 rounded bg-red-600 text-white font-black text-[9px] tracking-wide uppercase">
                    FEATURED DROP
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono font-bold flex items-center gap-0.5">
                    <Flame className="w-3 h-3 fill-current" /> {activeProduct.cartCount} in cart
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white truncate leading-snug">
                  {activeProduct.title}
                </h4>

                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-base font-black text-amber-300 font-mono">
                    ${activeProduct.salePrice}
                  </span>
                  <span className="text-xs text-zinc-400 line-through font-mono">
                    ${activeProduct.originalPrice}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1 rounded">
                    -{activeProduct.discountPercentage}%
                  </span>
                </div>

                {/* Remaining Stock progress bar */}
                <div className="mt-1.5 w-full">
                  <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400 mb-0.5">
                    <span>Stock Left</span>
                    <span
                      className={`font-bold ${
                        activeProduct.stock < 15 ? 'text-red-400 animate-pulse' : 'text-zinc-300'
                      }`}
                    >
                      {activeProduct.stock} / {activeProduct.initialStock} units
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        activeProduct.stock < 15 ? 'bg-red-500' : 'bg-amber-400'
                      }`}
                      style={{
                        width: `${Math.max(8, (activeProduct.stock / activeProduct.initialStock) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Tap to Buy Callout Button */}
              <div className="shrink-0 flex flex-col items-center justify-center pl-1 border-l border-zinc-800">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-600/30 text-black font-black">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold text-amber-300 mt-1 uppercase tracking-wider">
                  TAP TO BUY
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 6. Lower Third Host & Episode Banner */}
        {overlays.showLowerThird && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-4 right-4 z-10 pointer-events-none"
          >
            <div className="bg-zinc-950/80 border border-zinc-700/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl flex items-center gap-2.5 shadow-xl">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <div>
                <div className="text-[11px] font-bold text-white tracking-tight">
                  DIRECTOR SUITE • EXCLUSIVE DROP #04
                </div>
                <div className="text-[10px] text-zinc-400">
                  Sarah & Kai • Live Stream Shopping Studio
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
