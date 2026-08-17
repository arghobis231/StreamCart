import React, { useState } from 'react';
import {
  Zap,
  Clock,
  Tag,
  Flame,
  AlertTriangle,
  Gift,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Move,
  Sliders,
  Check,
  X,
  Copy,
} from 'lucide-react';
import { DynamicBannerItem, BannerType, BannerTheme, BannerPositionPreset } from '../types';

export const BANNER_PRESETS: Omit<DynamicBannerItem, 'id' | 'x' | 'y'>[] = [
  {
    type: 'countdown',
    title: '⚡ FLASH SALE: 50% OFF LIVE DROP',
    subtitle: 'Applies to active featured camera product',
    badgeText: 'FLASH DEAL',
    promoCode: 'FLASH50',
    discountPercent: 50,
    initialSeconds: 180,
    secondsRemaining: 180,
    isTimerRunning: true,
    theme: 'fire',
    animation: 'pulse',
    scale: 1,
    isVisible: true,
  },
  {
    type: 'limited_offer',
    title: '🔥 $30 OFF ORDERS OVER $100',
    subtitle: 'Limited to first 50 live buyers only',
    badgeText: 'LIMITED OFFER',
    promoCode: 'TECHLIVE30',
    discountPercent: 30,
    initialSeconds: 300,
    secondsRemaining: 300,
    isTimerRunning: true,
    theme: 'purple',
    animation: 'glow',
    scale: 1,
    isVisible: true,
  },
  {
    type: 'stock_alert',
    title: '🚨 ONLY 4 UNITS LEFT IN WAREHOUSE!',
    subtitle: 'High checkout velocity in stream cart',
    badgeText: 'SELLING FAST',
    promoCode: 'HURRYNOW',
    discountPercent: 20,
    initialSeconds: 120,
    secondsRemaining: 120,
    isTimerRunning: true,
    theme: 'amber',
    animation: 'bounce',
    scale: 1,
    isVisible: true,
  },
  {
    type: 'bogo_promo',
    title: '🎁 BUY 1 GET 1 50% OFF ACCESSORIES',
    subtitle: 'Bundle and save before stream ends',
    badgeText: 'BOGO 50%',
    promoCode: 'BOGOPRO',
    discountPercent: 50,
    initialSeconds: 420,
    secondsRemaining: 420,
    isTimerRunning: true,
    theme: 'emerald',
    animation: 'shine',
    scale: 1,
    isVisible: true,
  },
  {
    type: 'announcement',
    title: '✨ HOST VIP GIFT: FREE CASE & STRAP',
    subtitle: 'Automatic inclusion on checkout confirmation',
    badgeText: 'HOST EXCLUSIVE',
    promoCode: 'VIPGIFT',
    discountPercent: 0,
    initialSeconds: 600,
    secondsRemaining: 600,
    isTimerRunning: true,
    theme: 'cyber',
    animation: 'pulse',
    scale: 1,
    isVisible: true,
  },
];

interface DynamicBannerPaletteProps {
  banners: DynamicBannerItem[];
  onAddBanner: (banner: DynamicBannerItem) => void;
  onUpdateBanner: (id: string, updates: Partial<DynamicBannerItem>) => void;
  onDeleteBanner: (id: string) => void;
  onToggleTimer: (id: string) => void;
  onResetTimer: (id: string) => void;
}

export const DynamicBannerPalette: React.FC<DynamicBannerPaletteProps> = ({
  banners,
  onAddBanner,
  onUpdateBanner,
  onDeleteBanner,
  onToggleTimer,
  onResetTimer,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'presets' | 'active' | 'create'>('presets');
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);

  // Custom Banner Creation Form State
  const [customTitle, setCustomTitle] = useState('⚡ EXCLUSIVE DROP DISCOUNT');
  const [customSubtitle, setCustomSubtitle] = useState('Use code on instant 1-click checkout');
  const [customBadge, setCustomBadge] = useState('LIMITED TIME');
  const [customPromo, setCustomPromo] = useState('STREAMDEAL');
  const [customDiscount, setCustomDiscount] = useState<number>(25);
  const [customMinutes, setCustomMinutes] = useState<number>(3);
  const [customType, setCustomType] = useState<BannerType>('countdown');
  const [customTheme, setCustomTheme] = useState<BannerTheme>('fire');
  const [customAnimation, setCustomAnimation] = useState<'pulse' | 'bounce' | 'glow' | 'shine' | 'none'>('pulse');

  // Handle Preset Drop / Add
  const handleAddPreset = (preset: typeof BANNER_PRESETS[0], presetPosition?: BannerPositionPreset) => {
    let x = 50;
    let y = 12;

    if (presetPosition === 'top_left') {
      x = 18;
      y = 12;
    } else if (presetPosition === 'top_right') {
      x = 82;
      y = 12;
    } else if (presetPosition === 'bottom_center') {
      x = 50;
      y = 86;
    } else if (presetPosition === 'bottom_right') {
      x = 82;
      y = 86;
    } else {
      // Offset slightly if multiple banners exist
      const offset = (banners.length * 6) % 24;
      x = 50;
      y = 12 + offset;
    }

    const newBanner: DynamicBannerItem = {
      ...preset,
      id: `banner-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      x,
      y,
      scale: 1,
      isVisible: true,
      secondsRemaining: preset.initialSeconds,
      isTimerRunning: true,
    };

    onAddBanner(newBanner);
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const totalSeconds = Math.max(10, customMinutes * 60);
    const newBanner: DynamicBannerItem = {
      id: `banner-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: customType,
      title: customTitle.trim() || 'PROMOTIONAL OFFER',
      subtitle: customSubtitle.trim() || undefined,
      badgeText: customBadge.trim() || 'LIMITED',
      promoCode: customPromo.trim().toUpperCase() || undefined,
      discountPercent: customDiscount,
      initialSeconds: totalSeconds,
      secondsRemaining: totalSeconds,
      isTimerRunning: true,
      theme: customTheme,
      animation: customAnimation,
      x: 50,
      y: 12 + (banners.length * 6) % 20,
      scale: 1,
      isVisible: true,
    };
    onAddBanner(newBanner);
    setActiveSubTab('active');
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 border-zinc-800 text-white select-none">
      {/* Sub-Tab Navigation Header */}
      <div className="flex items-center border-b border-zinc-800 p-1.5 bg-zinc-950/80 gap-1 shrink-0">
        <button
          onClick={() => setActiveSubTab('presets')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'presets'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Presets</span>
        </button>

        <button
          onClick={() => setActiveSubTab('active')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 relative cursor-pointer ${
            activeSubTab === 'active'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          <span>Active ({banners.length})</span>
          {banners.filter((b) => b.isVisible).length > 0 && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('create')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'create'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>Custom</span>
        </button>
      </div>

      {/* SUB-TAB 1: PRESETS DRAG-AND-DROP TRAY */}
      {activeSubTab === 'presets' && (
        <div className="flex-1 p-3 space-y-3 overflow-y-auto">
          <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs flex items-start gap-2">
            <Move className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Drag & Drop onto Live Stream</p>
              <p className="text-[11px] text-indigo-300">
                Drag any banner directly onto the video preview to position it, or click <strong>Add</strong> to broadcast instantly.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {BANNER_PRESETS.map((preset, idx) => {
              const themeGradients = {
                fire: 'from-red-600 to-amber-500 border-red-400/60 shadow-red-500/20',
                purple: 'from-blue-700 to-teal-600 border-teal-400/60 shadow-teal-500/20',
                amber: 'from-amber-600 to-yellow-500 border-amber-400/60 shadow-amber-500/20',
                emerald: 'from-emerald-600 to-teal-600 border-emerald-400/60 shadow-emerald-500/20',
                cyber: 'from-cyan-600 to-blue-600 border-cyan-400/60 shadow-cyan-500/20',
                midnight: 'from-zinc-900 to-zinc-800 border-zinc-700',
                sunset: 'from-teal-600 to-emerald-500 border-teal-400/60',
                indigo: 'from-blue-600 to-sky-500 border-blue-400/60',
              };

              return (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/json', JSON.stringify(preset));
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                  className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 space-y-2.5 transition-all group cursor-grab active:cursor-grabbing hover:shadow-lg"
                >
                  {/* Banner Preview Card */}
                  <div
                    className={`p-2.5 rounded-xl bg-gradient-to-r ${
                      themeGradients[preset.theme] || themeGradients.fire
                    } border shadow-md text-white flex items-center justify-between gap-2`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center shrink-0">
                        {preset.type === 'countdown' && <Clock className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />}
                        {preset.type === 'limited_offer' && <Flame className="w-3.5 h-3.5 text-orange-300" />}
                        {preset.type === 'stock_alert' && <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />}
                        {preset.type === 'bogo_promo' && <Gift className="w-3.5 h-3.5 text-emerald-200" />}
                        {preset.type === 'announcement' && <Sparkles className="w-3.5 h-3.5 text-cyan-200" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-black truncate">{preset.title}</div>
                        <div className="text-[10px] text-white/80 font-medium truncate">{preset.subtitle}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 bg-black/40 px-2 py-1 rounded-lg backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-yellow-300" />
                      <span className="font-mono text-xs font-black">{formatSeconds(preset.initialSeconds)}</span>
                    </div>
                  </div>

                  {/* Meta Tags & Action Buttons */}
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-300">
                        Code: {preset.promoCode}
                      </span>
                      {preset.discountPercent ? (
                        <span className="text-emerald-400 font-bold">-{preset.discountPercent}%</span>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleAddPreset(preset, 'top_center')}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
                        title="Add to Live Stream"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ACTIVE ON-AIR BANNERS MANAGER */}
      {activeSubTab === 'active' && (
        <div className="flex-1 p-3 space-y-3 overflow-y-auto">
          {banners.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Zap className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-xs text-zinc-400">No dynamic banners currently on stream.</p>
              <button
                onClick={() => setActiveSubTab('presets')}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Browse Preset Banners
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                <span>{banners.length} Placed Overlays</span>
                <span className="text-[11px] text-emerald-400 font-mono">
                  {banners.filter((b) => b.isVisible).length} Active Live
                </span>
              </div>

              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className={`p-3 rounded-2xl border space-y-2.5 transition-all ${
                    banner.isVisible
                      ? 'bg-zinc-950 border-zinc-700 shadow-md'
                      : 'bg-zinc-950/50 border-zinc-800/80 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate">{banner.title}</span>
                        {banner.badgeText && (
                          <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[9px] font-black">
                            {banner.badgeText}
                          </span>
                        )}
                      </div>
                      {banner.subtitle && (
                        <p className="text-[11px] text-zinc-400 truncate mt-0.5">{banner.subtitle}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => onUpdateBanner(banner.id, { isVisible: !banner.isVisible })}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          banner.isVisible
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                        }`}
                        title={banner.isVisible ? 'Hide from broadcast' : 'Show on broadcast'}
                      >
                        {banner.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => onDeleteBanner(banner.id)}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/60 border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete banner"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Timer and Controls */}
                  <div className="flex items-center justify-between bg-zinc-900/90 p-2 rounded-xl border border-zinc-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-mono font-bold text-white">
                        {formatSeconds(banner.secondsRemaining)}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {banner.isTimerRunning ? '(Ticking)' : '(Paused)'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onToggleTimer(banner.id)}
                        className={`p-1 rounded-md text-[11px] font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                          banner.isTimerRunning
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        }`}
                      >
                        {banner.isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        <span>{banner.isTimerRunning ? 'Pause' : 'Resume'}</span>
                      </button>

                      <button
                        onClick={() => onResetTimer(banner.id)}
                        className="p-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-zinc-700 transition-colors cursor-pointer"
                        title="Reset countdown"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Position Preset Buttons */}
                  <div className="pt-1 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Position Snap:</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onUpdateBanner(banner.id, { x: 50, y: 12 })}
                        className="px-1.5 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-bold text-zinc-300 cursor-pointer"
                      >
                        Top Center
                      </button>
                      <button
                        onClick={() => onUpdateBanner(banner.id, { x: 80, y: 12 })}
                        className="px-1.5 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-bold text-zinc-300 cursor-pointer"
                      >
                        Top Right
                      </button>
                      <button
                        onClick={() => onUpdateBanner(banner.id, { x: 50, y: 86 })}
                        className="px-1.5 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-bold text-zinc-300 cursor-pointer"
                      >
                        Bottom
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: CUSTOM BANNER CREATOR */}
      {activeSubTab === 'create' && (
        <form onSubmit={handleCreateCustom} className="flex-1 p-3 space-y-3 overflow-y-auto text-xs">
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Headline Text:</label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="e.g. ⚡ FLASH SALE: 40% OFF"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-bold mb-1">Subtitle / Details:</label>
            <input
              type="text"
              value={customSubtitle}
              onChange={(e) => setCustomSubtitle(e.target.value)}
              placeholder="e.g. Valid for live viewers on current stream"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Badge Text:</label>
              <input
                type="text"
                value={customBadge}
                onChange={(e) => setCustomBadge(e.target.value)}
                placeholder="e.g. LIMITED DEAL"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Promo Code:</label>
              <input
                type="text"
                value={customPromo}
                onChange={(e) => setCustomPromo(e.target.value.toUpperCase())}
                placeholder="e.g. SAVE40"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-indigo-500 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Timer (Minutes):</label>
              <input
                type="number"
                min="0.5"
                max="60"
                step="0.5"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(parseFloat(e.target.value) || 1)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-zinc-300 font-bold mb-1">Discount %:</label>
              <input
                type="number"
                min="0"
                max="100"
                value={customDiscount}
                onChange={(e) => setCustomDiscount(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Theme Gradient Picker */}
          <div>
            <label className="block text-zinc-300 font-bold mb-1.5">Color Accent Theme:</label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'fire', label: 'Fire Red', bg: 'bg-gradient-to-r from-red-600 to-amber-500' },
                { id: 'cyber', label: 'Electric Blue', bg: 'bg-gradient-to-r from-cyan-600 to-blue-600' },
                { id: 'emerald', label: 'Emerald Rush', bg: 'bg-gradient-to-r from-emerald-600 to-teal-500' },
                { id: 'amber', label: 'Cyber Gold', bg: 'bg-gradient-to-r from-amber-600 to-yellow-500' },
                { id: 'indigo', label: 'Ocean Sky', bg: 'bg-gradient-to-r from-blue-600 to-sky-500' },
                { id: 'sunset', label: 'Teal Aurora', bg: 'bg-gradient-to-r from-teal-600 to-emerald-500' },
                { id: 'purple', label: 'Deep Cyan', bg: 'bg-gradient-to-r from-blue-700 to-teal-600' },
                { id: 'midnight', label: 'Midnight Stealth', bg: 'bg-zinc-800' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCustomTheme(t.id as any)}
                  className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                    customTheme === t.id
                      ? 'ring-2 ring-teal-400 border-white'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className={`w-full h-4 rounded-md ${t.bg} mb-1`} />
                  <span className="text-[10px] text-zinc-300 font-medium block truncate">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>Broadcast Custom Banner</span>
          </button>
        </form>
      )}
    </div>
  );
};
