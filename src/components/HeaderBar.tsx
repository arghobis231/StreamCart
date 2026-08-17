import React from 'react';
import {
  Radio,
  Eye,
  DollarSign,
  ShoppingCart,
  Activity,
  Smartphone,
  LayoutDashboard,
  Columns,
  Sparkles,
  BarChart3,
  AlertTriangle,
  Play,
  Square,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { BroadcastStatus, StreamStats } from '../types';

interface HeaderBarProps {
  status: BroadcastStatus;
  stats: StreamStats;
  viewMode: 'studio' | 'split' | 'mobile_only';
  setViewMode: (mode: 'studio' | 'split' | 'mobile_only') => void;
  onToggleBroadcast: () => void;
  onOpenAnalytics: () => void;
  onTriggerConfetti: () => void;
  isAudioMuted: boolean;
  onToggleAudioMute: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  status,
  stats,
  viewMode,
  setViewMode,
  onToggleBroadcast,
  onOpenAnalytics,
  onTriggerConfetti,
  isAudioMuted,
  onToggleAudioMute,
}) => {
  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 lg:px-6 bg-zinc-950/50 backdrop-blur-md text-zinc-100 select-none shrink-0 z-30">
      {/* Brand & Live Indicator */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
          <Radio className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-tight uppercase text-white">
              DIRECTOR SUITE <span className="text-zinc-500 font-normal ml-1">v4.2</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span
              className={`flex h-2 w-2 rounded-full ${
                status === 'LIVE' ? 'bg-red-500 animate-pulse' : 'bg-zinc-500'
              }`}
            />
            <span className="text-red-500 font-bold uppercase tracking-widest font-mono">
              {status === 'LIVE' ? `LIVE: ${formatDuration(stats.durationSeconds)}` : 'PRE-SHOW IDLE'}
            </span>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="text-zinc-400 uppercase hidden sm:inline font-mono">
              1080p {stats.fps.toFixed(0)}FPS
            </span>
          </div>
        </div>
      </div>

      {/* Centered High-Contrast Telemetry Metrics */}
      <div className="hidden md:flex items-center gap-8">
        <div className="text-center">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">VIEWERS</p>
          <p className="text-xl font-mono font-bold leading-none text-zinc-100">
            {stats.ccv >= 1000 ? `${(stats.ccv / 1000).toFixed(1)}K` : stats.ccv}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">CONVERSIONS</p>
          <p className="text-xl font-mono font-bold leading-none text-emerald-400">
            {stats.cvr.toFixed(1)}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">REVENUE</p>
          <p className="text-xl font-mono font-bold leading-none text-blue-400">
            ${stats.gmv.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Control Actions & User Mode Switcher */}
      <div className="flex items-center gap-3">
        {/* Stream Toggle (Start / Stop) */}
        <button
          onClick={onToggleBroadcast}
          className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 ${
            status === 'LIVE'
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-950/50'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
          }`}
        >
          {status === 'LIVE' ? (
            <>
              <Square className="w-3 h-3 fill-current" />
              <span>STOP STREAM</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>GO LIVE</span>
            </>
          )}
        </button>

        {/* Confetti Quick Trigger */}
        <button
          onClick={onTriggerConfetti}
          title="Drop On-Screen Celebration Confetti"
          className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-blue-500 text-amber-400 transition-colors shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Audio Mute Switch */}
        <button
          onClick={onToggleAudioMute}
          title={isAudioMuted ? 'Unmute Studio Audio' : 'Mute Studio Audio'}
          className={`p-2 rounded-lg border transition-colors shadow-sm ${
            isAudioMuted
              ? 'bg-red-500/20 border-red-500/50 text-red-400'
              : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 text-zinc-300'
          }`}
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Analytics Modal trigger */}
        <button
          onClick={onOpenAnalytics}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-blue-500 text-xs font-medium text-zinc-300 transition-colors shadow-sm"
        >
          <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden xl:inline uppercase tracking-wider text-[11px] font-bold font-mono">
            Metrics
          </span>
        </button>

        {/* View Layout Mode Selector */}
        <div className="flex items-center bg-zinc-900/90 p-0.5 rounded-lg border border-zinc-800">
          <button
            onClick={() => setViewMode('studio')}
            className={`px-2.5 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
              viewMode === 'studio'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Studio Broadcast Desk (Full Suite)"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono text-[11px] uppercase font-bold">Studio</span>
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
              viewMode === 'split'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Split Mode: Director Desk + Live Consumer Mobile View"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono text-[11px] uppercase font-bold">Split</span>
          </button>
          <button
            onClick={() => setViewMode('mobile_only')}
            className={`px-2.5 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
              viewMode === 'mobile_only'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Consumer Mobile App Simulator"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono text-[11px] uppercase font-bold">Buyer</span>
          </button>
        </div>

        {/* User / Director Avatar */}
        <div className="w-9 h-9 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-teal-600 to-emerald-600 flex items-center justify-center text-xs font-bold text-white">
            DIR
          </div>
        </div>
      </div>
    </header>
  );
};
