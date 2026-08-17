import React from 'react';
import { CameraId, LayoutMode, ActiveOverlays, ProductItem } from '../types';
import {
  Camera,
  Video,
  Grid,
  Columns,
  Maximize2,
  Tv,
  Layers,
  Smartphone,
  Eye,
  Zap,
  Tag,
  MessageSquare,
  BarChart,
  BellRing,
  Sparkles,
} from 'lucide-react';

interface CameraSwitcherProps {
  activeCamera: CameraId;
  previewCamera: CameraId;
  layoutMode: LayoutMode;
  overlays: ActiveOverlays;
  activeProduct: ProductItem | null;
  onSelectProgramCam: (cam: CameraId) => void;
  onSelectPreviewCam: (cam: CameraId) => void;
  onTakeCut: () => void;
  onTakeDissolve: () => void;
  onChangeLayout: (mode: LayoutMode) => void;
  onToggleOverlay: (key: keyof ActiveOverlays) => void;
  isWebcamActive: boolean;
  onToggleWebcam: () => void;
}

export const CameraSwitcher: React.FC<CameraSwitcherProps> = ({
  activeCamera,
  previewCamera,
  layoutMode,
  overlays,
  activeProduct,
  onSelectProgramCam,
  onSelectPreviewCam,
  onTakeCut,
  onTakeDissolve,
  onChangeLayout,
  onToggleOverlay,
  isWebcamActive,
  onToggleWebcam,
}) => {
  const cameras: { id: CameraId; label: string; subLabel: string; image: string }[] = [
    {
      id: 'cam1',
      label: 'CAM 1',
      subLabel: 'Studio Wide (Host)',
      image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'cam2',
      label: 'CAM 2',
      subLabel: 'Macro Product 4K',
      image: activeProduct?.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'cam3',
      label: 'CAM 3',
      subLabel: 'Overhead Unbox',
      image: activeProduct?.secondaryImageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'cam4',
      label: 'CAM 4',
      subLabel: isWebcamActive ? 'Device Camera (Active)' : 'Webcam / AUX',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl p-3.5 shadow-xl backdrop-blur-sm flex flex-col gap-3">
      {/* Header with Cut Transition Actions & Layouts */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] font-bold font-mono tracking-widest text-zinc-300 uppercase">
            VIDEO SWITCHER & TRANSITIONS
          </span>
          <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
            PGM: <b className="text-red-400">{activeCamera.toUpperCase()}</b> | PVW: <b className="text-emerald-400">{previewCamera.toUpperCase()}</b>
          </span>
        </div>

        {/* Transition Cut Buttons (ATEM Style) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onTakeCut}
            className="px-3.5 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-black tracking-wider shadow-lg shadow-red-950/40 transition-all active:scale-95 uppercase"
            title="Instant Cut to Preview Camera"
          >
            CUT
          </button>
          <button
            onClick={onTakeDissolve}
            className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs font-bold tracking-wider border border-zinc-700 transition-all active:scale-95 uppercase"
            title="Smooth Auto Dissolve (0.5s)"
          >
            AUTO DISSOLVE
          </button>
        </div>

        {/* Layout Modes */}
        <div className="flex items-center bg-zinc-900/90 p-0.5 rounded-lg border border-zinc-800">
          <button
            onClick={() => onChangeLayout('single')}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
              layoutMode === 'single' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Single Main Feed"
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden sm:inline text-[11px] font-mono">Single</span>
          </button>
          <button
            onClick={() => onChangeLayout('pip')}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
              layoutMode === 'pip' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Picture-in-Picture"
          >
            <Tv className="w-3 h-3" />
            <span className="hidden sm:inline text-[11px] font-mono">PIP</span>
          </button>
          <button
            onClick={() => onChangeLayout('split')}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
              layoutMode === 'split' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Side-by-Side Split"
          >
            <Columns className="w-3 h-3" />
            <span className="hidden sm:inline text-[11px] font-mono">Split</span>
          </button>
          <button
            onClick={() => onChangeLayout('grid')}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
              layoutMode === 'grid' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="4-Camera Multiview Grid"
          >
            <Grid className="w-3 h-3" />
            <span className="hidden sm:inline text-[11px] font-mono">Multiview</span>
          </button>
          <button
            onClick={() => onChangeLayout('mobile_vertical')}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
              layoutMode === 'mobile_vertical' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="9:16 TikTok / Instagram Live Format"
          >
            <Smartphone className="w-3 h-3" />
            <span className="hidden sm:inline text-[11px] font-mono">9:16</span>
          </button>
        </div>
      </div>

      {/* 4 Camera Inputs Tally Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {cameras.map((cam) => {
          const isProgram = activeCamera === cam.id;
          const isPreview = previewCamera === cam.id;

          return (
            <div
              key={cam.id}
              className={`relative rounded-xl overflow-hidden bg-zinc-900/90 border-2 transition-all group cursor-pointer ${
                isProgram
                  ? 'border-red-500 shadow-lg shadow-red-950/60 ring-2 ring-red-500/30'
                  : isPreview
                  ? 'border-emerald-500 shadow-md shadow-emerald-950/50'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
              onClick={() => {
                if (isProgram) {
                  // already on air
                } else {
                  onSelectProgramCam(cam.id);
                }
              }}
            >
              {/* Thumbnail feed */}
              <div className="w-full aspect-video relative bg-black">
                <img
                  src={cam.image}
                  alt={cam.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                {/* Tally Light Badge */}
                <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                  {isProgram && (
                    <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-mono font-bold tracking-wider shadow animate-pulse">
                      PGM (ON-AIR)
                    </span>
                  )}
                  {isPreview && !isProgram && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-mono font-bold tracking-wider shadow">
                      PVW (NEXT)
                    </span>
                  )}
                  {!isProgram && !isPreview && (
                    <span className="px-1.5 py-0.5 rounded bg-black/75 text-zinc-400 text-[9px] font-mono font-medium">
                      READY
                    </span>
                  )}
                </div>

                {/* Cam 4 Webcam toggle badge */}
                {cam.id === 'cam4' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWebcam();
                    }}
                    className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 hover:bg-black text-white text-[10px] flex items-center gap-1 border border-zinc-700 shadow"
                    title={isWebcamActive ? 'Disable Real Webcam' : 'Enable Real Webcam'}
                  >
                    <Video className={`w-3 h-3 ${isWebcamActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
                    <span className="font-mono">{isWebcamActive ? 'CAM ON' : 'CAM OFF'}</span>
                  </button>
                )}
              </div>

              {/* Camera footer selection row */}
              <div className="p-2 flex items-center justify-between bg-zinc-950/90">
                <div>
                  <div className="text-xs font-bold text-zinc-100 font-mono">{cam.label}</div>
                  <div className="text-[10px] text-zinc-400 truncate">{cam.subLabel}</div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProgramCam(cam.id);
                    }}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                      isProgram
                        ? 'bg-red-600 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-red-900/60 hover:text-red-200'
                    }`}
                    title="Take Camera Live (PGM)"
                  >
                    PGM
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPreviewCam(cam.id);
                    }}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                      isPreview
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-emerald-900/60 hover:text-emerald-200'
                    }`}
                    title="Queue Camera to Preview (PVW)"
                  >
                    PVW
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time Overlays Master Toggles */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-zinc-800/80">
        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mr-1 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-zinc-500" /> OVERLAYS:
        </span>

        <button
          onClick={() => onToggleOverlay('showProductSpotlight')}
          className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-all ${
            overlays.showProductSpotlight
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
          }`}
        >
          <Tag className="w-3 h-3" />
          <span>Product Spotlight</span>
        </button>

        <button
          onClick={() => onToggleOverlay('showFlashTimer')}
          className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-all ${
            overlays.showFlashTimer
              ? 'bg-red-500/15 text-red-300 border border-red-500/40 shadow-sm'
              : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
          }`}
        >
          <Zap className="w-3 h-3" />
          <span>Flash Drop Timer</span>
        </button>

        <button
          onClick={() => onToggleOverlay('showLiveChatBubble')}
          className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-all ${
            overlays.showLiveChatBubble
              ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
          }`}
        >
          <MessageSquare className="w-3 h-3" />
          <span>Host Q&A Card</span>
        </button>

        <button
          onClick={() => onToggleOverlay('showPurchaseToasts')}
          className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-all ${
            overlays.showPurchaseToasts
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
          }`}
        >
          <BellRing className="w-3 h-3" />
          <span>Live Purchases</span>
        </button>

        <button
          onClick={() => onToggleOverlay('showLivePoll')}
          className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-all ${
            overlays.showLivePoll
              ? 'bg-purple-500/15 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
          }`}
        >
          <BarChart className="w-3 h-3" />
          <span>Audience Poll</span>
        </button>

        <button
          onClick={() => onToggleOverlay('showLowerThird')}
          className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-all ${
            overlays.showLowerThird
              ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
              : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>Lower Thirds</span>
        </button>
      </div>
    </div>
  );
};
