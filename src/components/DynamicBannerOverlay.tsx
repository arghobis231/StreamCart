import React, { useState, useRef, useEffect } from 'react';
import {
  Clock,
  Zap,
  Flame,
  AlertTriangle,
  Gift,
  Sparkles,
  GripVertical,
  X,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Check,
  Tag,
  ArrowUpRight,
} from 'lucide-react';
import { DynamicBannerItem, BannerTheme } from '../types';

interface DynamicBannerOverlayProps {
  banners: DynamicBannerItem[];
  containerRef: React.RefObject<HTMLDivElement>;
  onUpdateBanner: (id: string, updates: Partial<DynamicBannerItem>) => void;
  onDeleteBanner: (id: string) => void;
  onToggleTimer: (id: string) => void;
  onResetTimer: (id: string) => void;
  onDropNewBanner: (preset: any, x: number, y: number) => void;
}

export const DynamicBannerOverlay: React.FC<DynamicBannerOverlayProps> = ({
  banners,
  containerRef,
  onUpdateBanner,
  onDeleteBanner,
  onToggleTimer,
  onResetTimer,
  onDropNewBanner,
}) => {
  const [isDragOverContainer, setIsDragOverContainer] = useState(false);
  const [activeDraggingId, setActiveDraggingId] = useState<string | null>(null);
  const [hoveredBannerId, setHoveredBannerId] = useState<string | null>(null);
  const [copiedCodeBannerId, setCopiedCodeBannerId] = useState<string | null>(null);

  // Mouse drag tracking for moving placed banners
  const dragStartRef = useRef<{ startX: number; startY: number; initialBannerX: number; initialBannerY: number } | null>(null);

  const themeClasses: Record<BannerTheme, { gradient: string; border: string; glow: string; text: string }> = {
    fire: {
      gradient: 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-500',
      border: 'border-red-400/80',
      glow: 'shadow-2xl shadow-red-600/30',
      text: 'text-white',
    },
    purple: {
      gradient: 'bg-gradient-to-r from-blue-700 via-teal-600 to-emerald-500',
      border: 'border-teal-400/80',
      glow: 'shadow-2xl shadow-teal-600/30',
      text: 'text-white',
    },
    emerald: {
      gradient: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500',
      border: 'border-emerald-400/80',
      glow: 'shadow-2xl shadow-emerald-600/30',
      text: 'text-white',
    },
    amber: {
      gradient: 'bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-500',
      border: 'border-amber-400/80',
      glow: 'shadow-2xl shadow-amber-600/30',
      text: 'text-white',
    },
    cyber: {
      gradient: 'bg-gradient-to-r from-cyan-500 via-blue-600 to-teal-500',
      border: 'border-cyan-400/80',
      glow: 'shadow-2xl shadow-cyan-600/30',
      text: 'text-white',
    },
    sunset: {
      gradient: 'bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-500',
      border: 'border-teal-400/80',
      glow: 'shadow-2xl shadow-teal-600/30',
      text: 'text-white',
    },
    indigo: {
      gradient: 'bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500',
      border: 'border-blue-400/80',
      glow: 'shadow-2xl shadow-blue-600/30',
      text: 'text-white',
    },
    midnight: {
      gradient: 'bg-zinc-900/95 backdrop-blur-md',
      border: 'border-zinc-700',
      glow: 'shadow-2xl shadow-black/60',
      text: 'text-zinc-100',
    },
  };

  // Handle Drag Over Canvas Container
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isDragOverContainer) {
      setIsDragOverContainer(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverContainer(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverContainer(false);

    const rawData = e.dataTransfer.getData('application/json');
    if (!rawData || !containerRef.current) return;

    try {
      const presetData = JSON.parse(rawData);
      const rect = containerRef.current.getBoundingClientRect();
      const dropX = ((e.clientX - rect.left) / rect.width) * 100;
      const dropY = ((e.clientY - rect.top) / rect.height) * 100;

      // Clamp within video bounds
      const clampedX = Math.max(15, Math.min(85, dropX));
      const clampedY = Math.max(10, Math.min(90, dropY));

      onDropNewBanner(presetData, clampedX, clampedY);
    } catch (err) {
      console.error('Failed to parse dropped banner data', err);
    }
  };

  // Start dragging an on-screen banner
  const handleStartBannerDrag = (e: React.MouseEvent, banner: DynamicBannerItem) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveDraggingId(banner.id);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialBannerX: banner.x,
      initialBannerY: banner.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStartRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const deltaPixelX = moveEvent.clientX - dragStartRef.current.startX;
      const deltaPixelY = moveEvent.clientY - dragStartRef.current.startY;

      const deltaPercentX = (deltaPixelX / rect.width) * 100;
      const deltaPercentY = (deltaPixelY / rect.height) * 100;

      const newX = Math.max(10, Math.min(90, dragStartRef.current.initialBannerX + deltaPercentX));
      const newY = Math.max(8, Math.min(92, dragStartRef.current.initialBannerY + deltaPercentY));

      onUpdateBanner(banner.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setActiveDraggingId(null);
      dragStartRef.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyCode = (promoCode: string, bannerId: string) => {
    navigator.clipboard?.writeText(promoCode);
    setCopiedCodeBannerId(bannerId);
    setTimeout(() => setCopiedCodeBannerId(null), 1800);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="absolute inset-0 z-20 pointer-events-none"
    >
      {/* Drop Zone Visual Target Feedback */}
      {isDragOverContainer && (
        <div className="absolute inset-4 rounded-3xl border-2 border-dashed border-indigo-400 bg-indigo-950/40 backdrop-blur-sm flex items-center justify-center pointer-events-none animate-pulse z-40">
          <div className="p-4 rounded-2xl bg-zinc-950/90 border border-indigo-500/50 shadow-2xl flex items-center gap-3 text-indigo-200">
            <Sparkles className="w-6 h-6 text-amber-400 animate-spin" />
            <div>
              <p className="text-sm font-black text-white">Drop to Place Dynamic Banner</p>
              <p className="text-xs text-indigo-300">Banner will pin dynamically at cursor coordinates</p>
            </div>
          </div>
        </div>
      )}

      {/* Render Active Dynamic Banners on Video Monitor */}
      {banners
        .filter((b) => b.isVisible)
        .map((banner) => {
          const theme = themeClasses[banner.theme] || themeClasses.fire;
          const isHovered = hoveredBannerId === banner.id || activeDraggingId === banner.id;
          const isExpired = banner.secondsRemaining <= 0;

          // Animation class
          let animClass = '';
          if (banner.animation === 'pulse') animClass = 'animate-pulse';
          if (banner.animation === 'bounce') animClass = 'animate-bounce';

          return (
            <div
              key={banner.id}
              style={{
                left: `${banner.x}%`,
                top: `${banner.y}%`,
                transform: `translate(-50%, -50%) scale(${banner.scale || 1})`,
                transition: activeDraggingId === banner.id ? 'none' : 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={() => setHoveredBannerId(banner.id)}
              onMouseLeave={() => setHoveredBannerId(null)}
              className="absolute pointer-events-auto select-none group"
            >
              {/* Creator Floating Toolbar (Shown on Hover/Drag) */}
              {isHovered && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-zinc-950/95 backdrop-blur-md px-2 py-1 rounded-xl border border-zinc-700 shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-150">
                  {/* Drag Grip */}
                  <div
                    onMouseDown={(e) => handleStartBannerDrag(e, banner)}
                    className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-grab active:cursor-grabbing flex items-center gap-1"
                    title="Drag to reposition banner"
                  >
                    <GripVertical className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold">Drag</span>
                  </div>

                  <div className="w-px h-3.5 bg-zinc-800 mx-0.5" />

                  {/* Play/Pause Timer */}
                  <button
                    onClick={() => onToggleTimer(banner.id)}
                    className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title={banner.isTimerRunning ? 'Pause countdown' : 'Resume countdown'}
                  >
                    {banner.isTimerRunning ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                  </button>

                  {/* Reset Timer */}
                  <button
                    onClick={() => onResetTimer(banner.id)}
                    className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="Reset countdown"
                  >
                    <RotateCcw className="w-3 h-3 text-zinc-400" />
                  </button>

                  <div className="w-px h-3.5 bg-zinc-800 mx-0.5" />

                  {/* Scale Controls */}
                  <button
                    onClick={() => onUpdateBanner(banner.id, { scale: Math.min(1.3, (banner.scale || 1) + 0.1) })}
                    className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="Enlarge"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onUpdateBanner(banner.id, { scale: Math.max(0.75, (banner.scale || 1) - 0.1) })}
                    className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="Shrink"
                  >
                    <Minimize2 className="w-3 h-3" />
                  </button>

                  <div className="w-px h-3.5 bg-zinc-800 mx-0.5" />

                  {/* Close / Remove */}
                  <button
                    onClick={() => onDeleteBanner(banner.id)}
                    className="p-1 rounded-lg hover:bg-red-950/80 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete banner"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Main Banner Visual Badge */}
              <div
                onMouseDown={(e) => {
                  // If not clicking a button, allow direct banner dragging
                  if ((e.target as HTMLElement).tagName !== 'BUTTON') {
                    handleStartBannerDrag(e, banner);
                  }
                }}
                className={`px-4 py-2.5 rounded-2xl ${theme.gradient} ${theme.glow} border ${
                  theme.border
                } text-white flex items-center gap-3 backdrop-blur-md cursor-grab active:cursor-grabbing transition-all ${
                  isHovered ? 'ring-2 ring-white/60 scale-[1.02]' : ''
                } ${animClass}`}
              >
                {/* Banner Icon */}
                <div className="w-8 h-8 rounded-xl bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                  {banner.type === 'countdown' && <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />}
                  {banner.type === 'limited_offer' && <Flame className="w-4 h-4 text-orange-200 fill-orange-300" />}
                  {banner.type === 'stock_alert' && <AlertTriangle className="w-4 h-4 text-amber-200" />}
                  {banner.type === 'bogo_promo' && <Gift className="w-4 h-4 text-emerald-200" />}
                  {banner.type === 'announcement' && <Sparkles className="w-4 h-4 text-cyan-200" />}
                  {banner.type === 'custom' && <Tag className="w-4 h-4 text-white" />}
                </div>

                {/* Banner Content */}
                <div className="min-w-0 pr-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black tracking-tight drop-shadow-md whitespace-nowrap">
                      {banner.title}
                    </span>
                    {banner.badgeText && (
                      <span className="px-2 py-0.5 rounded-md bg-black/40 border border-white/20 text-[9px] font-black tracking-wider uppercase backdrop-blur-sm">
                        {banner.badgeText}
                      </span>
                    )}
                  </div>

                  {banner.subtitle && (
                    <p className="text-[10px] text-white/90 font-semibold drop-shadow-sm truncate max-w-xs mt-0.5">
                      {banner.subtitle}
                    </p>
                  )}
                </div>

                {/* Live Countdown Clock / Promo Badge */}
                <div className="flex items-center gap-2 shrink-0">
                  {banner.promoCode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCode(banner.promoCode!, banner.id);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 text-[10px] font-mono font-extrabold flex items-center gap-1 tracking-wider backdrop-blur-sm transition-all cursor-pointer"
                      title="Click to copy promo code"
                    >
                      <span>{banner.promoCode}</span>
                      {copiedCodeBannerId === banner.id ? (
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      ) : (
                        <Tag className="w-2.5 h-2.5 text-yellow-300" />
                      )}
                    </button>
                  )}

                  {/* Timer Display */}
                  <div
                    className={`px-3 py-1 rounded-xl flex items-center gap-1.5 font-mono text-xs font-black backdrop-blur-sm border shadow-inner ${
                      isExpired
                        ? 'bg-red-950/80 border-red-500/80 text-red-300 animate-pulse'
                        : 'bg-black/40 border-white/20 text-white'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                    <span>{isExpired ? 'FINAL CALL' : formatTimer(banner.secondsRemaining)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
