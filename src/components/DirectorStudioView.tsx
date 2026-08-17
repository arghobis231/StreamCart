import React, { useState, useEffect, useRef } from 'react';
import {
  Radio,
  Play,
  Pause,
  Share2,
  Settings,
  XCircle,
  Eye,
  Camera,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Volume2,
  VolumeX,
  Layers,
  Sparkles,
  Zap,
  Tag,
  Clock,
  CheckCircle2,
  HelpCircle,
  ShoppingBag,
  Send,
  Smile,
  Pin,
  Flame,
  Heart,
  ThumbsUp,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Maximize2,
  Sliders,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  Move,
  Plus,
  Compass,
} from 'lucide-react';
import {
  ProductItem,
  ChatMessage,
  ViewerQuestion,
  LiveOrder,
  SceneId,
  BroadcastStatus,
  StreamStats,
  ScreenId,
  ActiveOverlays,
  DynamicBannerItem,
} from '../types';
import { DynamicBannerPalette } from './DynamicBannerPalette';
import { DynamicBannerOverlay } from './DynamicBannerOverlay';

interface DirectorStudioViewProps {
  products: ProductItem[];
  chatMessages: ChatMessage[];
  questions: ViewerQuestion[];
  orders: LiveOrder[];
  stats: StreamStats;
  broadcastStatus: BroadcastStatus;
  activeFeaturedProductId: string;
  onSelectFeaturedProduct: (productId: string) => void;
  onSendMessage: (text: string) => void;
  onAnswerQuestion: (questionId: string) => void;
  onPinQuestion: (questionId: string) => void;
  onDismissQuestion: (questionId: string) => void;
  onToggleBroadcast: () => void;
  onEndStream: () => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenProductSpotlight: (product: ProductItem) => void;
  onSimulateOrder: () => void;
  onSimulateLike: () => void;
}

export const DirectorStudioView: React.FC<DirectorStudioViewProps> = ({
  products,
  chatMessages,
  questions,
  orders,
  stats,
  broadcastStatus,
  activeFeaturedProductId,
  onSelectFeaturedProduct,
  onSendMessage,
  onAnswerQuestion,
  onPinQuestion,
  onDismissQuestion,
  onToggleBroadcast,
  onEndStream,
  onNavigate,
  onOpenProductSpotlight,
  onSimulateOrder,
  onSimulateLike,
}) => {
  // Studio Active States
  const [activeScene, setActiveScene] = useState<SceneId>('main');
  const [leftPanelTab, setLeftPanelTab] = useState<'scenes' | 'banners' | 'hardware'>('banners');
  const [activeTab, setActiveTab] = useState<'chat' | 'questions' | 'orders' | 'telemetry'>('chat');
  const [mobileStudioSection, setMobileStudioSection] = useState<'monitor' | 'controls' | 'feed'>('monitor');
  const [inputText, setInputText] = useState('');
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [recordingActive, setRecordingActive] = useState(true);
  const [floatingReactions, setFloatingReactions] = useState<{ id: number; emoji: string; left: number }[]>([]);

  // Video Program Monitor container ref for calculating drop coordinates
  const videoMonitorRef = useRef<HTMLDivElement>(null);

  // Dynamic Banners (Promotional Countdown Timers & Limited Offer Badges)
  const [dynamicBanners, setDynamicBanners] = useState<DynamicBannerItem[]>([
    {
      id: 'banner-flash-01',
      type: 'countdown',
      title: '⚡ FLASH SALE: 50% OFF LIVE DROP',
      subtitle: 'Applies to featured 4K Pro Camera',
      badgeText: 'FLASH DEAL',
      promoCode: 'FLASH50',
      discountPercent: 50,
      initialSeconds: 180,
      secondsRemaining: 180,
      isTimerRunning: true,
      theme: 'fire',
      animation: 'pulse',
      x: 50,
      y: 12,
      scale: 1,
      isVisible: true,
    },
    {
      id: 'banner-offer-02',
      type: 'limited_offer',
      title: '🔥 $30 OFF ORDERS $100+',
      subtitle: 'Auto-applied at checkout',
      badgeText: 'EXCLUSIVE',
      promoCode: 'SAVE30',
      discountPercent: 30,
      initialSeconds: 300,
      secondsRemaining: 300,
      isTimerRunning: true,
      theme: 'purple',
      animation: 'glow',
      x: 82,
      y: 12,
      scale: 0.95,
      isVisible: false,
    },
  ]);

  // Tick down all running banner countdown timers
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setDynamicBanners((prev) =>
        prev.map((banner) => {
          if (!banner.isTimerRunning || banner.secondsRemaining <= 0) return banner;
          return {
            ...banner,
            secondsRemaining: banner.secondsRemaining - 1,
          };
        })
      );
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  // Banner Actions
  const handleAddDynamicBanner = (banner: DynamicBannerItem) => {
    setDynamicBanners((prev) => [...prev, banner]);
  };

  const handleUpdateDynamicBanner = (id: string, updates: Partial<DynamicBannerItem>) => {
    setDynamicBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const handleDeleteDynamicBanner = (id: string) => {
    setDynamicBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const handleToggleBannerTimer = (id: string) => {
    setDynamicBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isTimerRunning: !b.isTimerRunning } : b))
    );
  };

  const handleResetBannerTimer = (id: string) => {
    setDynamicBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, secondsRemaining: b.initialSeconds } : b))
    );
  };

  const handleDropNewBanner = (presetData: any, x: number, y: number) => {
    const newBanner: DynamicBannerItem = {
      ...presetData,
      id: `banner-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      x,
      y,
      scale: 1,
      isVisible: true,
      secondsRemaining: presetData.initialSeconds || 180,
      isTimerRunning: true,
    };
    setDynamicBanners((prev) => [...prev, newBanner]);
  };

  // Overlays Toggles
  const [overlays, setOverlays] = useState<ActiveOverlays>({
    showProductSpotlight: true,
    showFlashTimer: false, // Replaced by high-power DynamicBanner system
    showLowerThird: true,
    showLiveChatBubble: true,
    showPurchaseToasts: true,
    showLivePoll: false,
    showStockAlert: true,
    promoBannerText: '⚡ FLASH SALE: Code TECHLIVE25 for 25% OFF all live drops!',
  });

  // Pinned question state
  const pinnedQuestion = questions.find((q) => q.isPinned && !q.isIgnored);

  // Active Featured Product
  const featuredProduct = products.find((p) => p.id === activeFeaturedProductId) || products[0];

  // Live Elapsed Time Counter
  const [secondsElapsed, setSecondsElapsed] = useState(stats.durationSeconds || 9258);
  useEffect(() => {
    if (broadcastStatus !== 'LIVE') return;
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [broadcastStatus]);

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Trigger floating reaction animation
  const triggerReaction = (emoji: string) => {
    const id = Date.now() + Math.random();
    const left = 15 + Math.random() * 70;
    setFloatingReactions((prev) => [...prev.slice(-15), { id, emoji, left }]);
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2400);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  // Dynamic Video Feed based on Scene Switcher
  const getSceneImage = () => {
    switch (activeScene) {
      case 'main':
        return 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&auto=format&fit=crop&q=80';
      case 'demo':
        return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80';
      case 'macro':
        return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80';
      case 'interview':
        return 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1200&auto=format&fit=crop&q=80';
      case 'ending':
        return 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80';
      default:
        return 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&auto=format&fit=crop&q=80';
    }
  };

  const scenes = [
    {
      id: 'main' as SceneId,
      name: 'Main Camera',
      label: 'CAM 1 (Host 4K)',
      thumb: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'demo' as SceneId,
      name: 'Product Demo',
      label: 'CAM 2 (Overhead)',
      thumb: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'macro' as SceneId,
      name: 'Full Product',
      label: 'CAM 3 (Macro)',
      thumb: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'interview' as SceneId,
      name: 'Interview',
      label: 'CAM 4 (Split)',
      thumb: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'ending' as SceneId,
      name: 'Ending / Outro',
      label: 'SCENE 5 (VOD)',
      thumb: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-white select-none overflow-hidden h-full">
      {/* 1. TOP BROADCAST CONTROL BAR (Section 9) */}
      <div className="h-14 bg-zinc-900 border-b border-zinc-800 px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          {/* LIVE Pulsing Badge */}
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full shadow-sm shadow-red-500/20">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-black text-red-400 tracking-wider">LIVE ON AIR</span>
          </div>

          <div className="hidden sm:block truncate max-w-xs lg:max-w-md">
            <h2 className="text-xs font-bold text-white truncate">
              Tech Friday: Unboxing 4K Drones & Pro Studio Gear
            </h2>
          </div>
        </div>

        {/* Real-time Telemetry Stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold text-zinc-200">{formatDuration(secondsElapsed)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold text-emerald-400">{(stats?.ccv ?? 0).toLocaleString()}</span>
            <span className="text-[10px] text-zinc-500 hidden md:inline">viewers</span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-zinc-400 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Connection: <strong className="text-emerald-400">Excellent</strong> (6,200 kbps • 60fps)</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('viewer')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600/20 border border-teal-500/40 text-teal-300 text-xs font-bold hover:bg-teal-600/30 transition-colors cursor-pointer"
            title="Preview consumer live shopping experience"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Viewer Mode</span>
          </button>

          <button
            onClick={() => {
              triggerReaction('🔥');
              onSimulateLike();
            }}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-700 cursor-pointer"
            title="Burst Reactions"
          >
            <Flame className="w-4 h-4" />
          </button>

          <button
            onClick={onEndStream}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-all active:scale-95 cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>End Stream</span>
          </button>
        </div>
      </div>

      {/* 2. REAL-TIME TELEMETRY METRIC STRIP (Section 16) */}
      <div className="h-10 bg-zinc-950 border-b border-zinc-800/80 px-4 flex items-center justify-between overflow-x-auto text-xs shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-semibold uppercase text-[10px]">Live CCV:</span>
            <span className="font-mono font-bold text-white">{(stats?.ccv ?? 0).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-semibold uppercase text-[10px]">Engagement:</span>
            <span className="font-mono font-bold text-teal-400">{stats.cvr > 0 ? '14.2%' : '11.8%'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-semibold uppercase text-[10px]">Live Orders:</span>
            <span className="font-mono font-bold text-emerald-400">{orders.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-semibold uppercase text-[10px]">GMV Revenue:</span>
            <span className="font-mono font-bold text-emerald-400">
              ${(6556 + (orders.length - 6) * 149).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-semibold uppercase text-[10px]">Conversion (CVR):</span>
            <span className="font-mono font-bold text-cyan-400">4.8%</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={onSimulateOrder}
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-all active:scale-95"
          >
            <Zap className="w-3 h-3" />
            <span>+ Simulate Order</span>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Studio Section Selector (visible only < xl viewports) */}
      <div className="xl:hidden flex items-center bg-zinc-950 border-b border-zinc-800 p-1.5 gap-1 shrink-0 z-10">
        <button
          onClick={() => setMobileStudioSection('monitor')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileStudioSection === 'monitor'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Monitor</span>
        </button>
        <button
          onClick={() => setMobileStudioSection('controls')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileStudioSection === 'controls'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Controls & Banners</span>
        </button>
        <button
          onClick={() => setMobileStudioSection('feed')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileStudioSection === 'feed'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat & Orders ({orders.length})</span>
        </button>
      </div>

      {/* 3. MAIN STUDIO WORKSPACE (3-Column Layout: Controls, Monitor, Chat/Commerce) */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Column: Director Production Controls, Scenes & Dynamic Banners (Section 11) */}
        <div className={`w-full xl:w-80 2xl:w-96 bg-zinc-900/95 border-r border-zinc-800 flex-col shrink-0 overflow-hidden ${mobileStudioSection === 'controls' ? 'flex' : 'hidden xl:flex'}`}>
          {/* Left Column Tab Navigation */}
          <div className="flex items-center border-b border-zinc-800 bg-zinc-950 p-1.5 gap-1 shrink-0">
            <button
              onClick={() => setLeftPanelTab('banners')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer relative ${
                leftPanelTab === 'banners'
                  ? 'bg-gradient-to-r from-red-600/90 to-amber-600/90 text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              <span>Dynamic Banners</span>
              {dynamicBanners.filter((b) => b.isVisible).length > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setLeftPanelTab('scenes')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                leftPanelTab === 'scenes'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-indigo-400" />
              <span>Scenes</span>
            </button>

            <button
              onClick={() => setLeftPanelTab('hardware')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                leftPanelTab === 'hardware'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-zinc-400" />
              <span>Hardware</span>
            </button>
          </div>

          {/* TAB CONTENT: DYNAMIC BANNERS PALETTE */}
          {leftPanelTab === 'banners' && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <DynamicBannerPalette
                banners={dynamicBanners}
                onAddBanner={handleAddDynamicBanner}
                onUpdateBanner={handleUpdateDynamicBanner}
                onDeleteBanner={handleDeleteDynamicBanner}
                onToggleTimer={handleToggleBannerTimer}
                onResetTimer={handleResetBannerTimer}
              />
            </div>
          )}

          {/* TAB CONTENT: PRODUCTION SCENES */}
          {leftPanelTab === 'scenes' && (
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Production Camera Feeds
                </span>
                <span className="text-[10px] text-indigo-400 font-mono">5 Sources</span>
              </div>

              <div className="space-y-2">
                {scenes.map((scene) => {
                  const isActive = activeScene === scene.id;
                  return (
                    <button
                      key={scene.id}
                      onClick={() => setActiveScene(scene.id)}
                      className={`w-full p-2 rounded-xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-red-950/40 border-red-500 shadow-md shadow-red-500/10 ring-1 ring-red-500/50'
                          : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                        <img src={scene.thumb} alt={scene.name} className="w-full h-full object-cover" />
                        {isActive && (
                          <div className="absolute top-1 left-1 px-1 rounded bg-red-600 text-[8px] font-black text-white">
                            PGM
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{scene.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{scene.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB CONTENT: HARDWARE & OVERLAYS */}
          {leftPanelTab === 'hardware' && (
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Hardware Audio/Video Controls
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMicMuted(!micMuted)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      micMuted
                        ? 'bg-red-500/20 border-red-500/40 text-red-400'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {micMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{micMuted ? 'Mic Off' : 'Mic Live'}</span>
                  </button>

                  <button
                    onClick={() => setCameraOff(!cameraOff)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      cameraOff
                        ? 'bg-red-500/20 border-red-500/40 text-red-400'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {cameraOff ? <VideoOff className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{cameraOff ? 'Cam Off' : 'Cam Live'}</span>
                  </button>
                </div>

                {/* Audio VU Level Meter Simulation */}
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>Master Shure SM7B</span>
                    <span className="font-mono text-emerald-400">-6 dB</span>
                  </div>
                  <div className="flex gap-0.5 h-2 rounded overflow-hidden bg-zinc-900">
                    <div className="w-2/3 bg-emerald-500 rounded-l animate-pulse" />
                    <div className="w-1/6 bg-amber-500" />
                    <div className="w-1/6 bg-zinc-800" />
                  </div>
                </div>
              </div>

              {/* On-Screen Overlays Toggle */}
              <div className="pt-3 border-t border-zinc-800 space-y-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Other Stream Overlays
                </span>

                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800/80 cursor-pointer">
                    <span className="text-zinc-300 font-medium">Shoppable Spotlight Card</span>
                    <input
                      type="checkbox"
                      checked={overlays.showProductSpotlight}
                      onChange={(e) => setOverlays({ ...overlays, showProductSpotlight: e.target.checked })}
                      className="w-4 h-4 accent-indigo-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800/80 cursor-pointer">
                    <span className="text-zinc-300 font-medium">Live Purchase Popups</span>
                    <input
                      type="checkbox"
                      checked={overlays.showPurchaseToasts}
                      onChange={(e) => setOverlays({ ...overlays, showPurchaseToasts: e.target.checked })}
                      className="w-4 h-4 accent-indigo-600 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center: Live Program Video Monitor (Section 10) */}
        <div className={`flex-1 flex-col bg-black overflow-hidden relative preserve-dark ${mobileStudioSection === 'monitor' ? 'flex' : 'hidden xl:flex'}`} data-theme-preserve="dark">
          {/* Main 16:9 Video Canvas with Drag-and-Drop Dynamic Banner Support */}
          <div
            ref={videoMonitorRef}
            className="flex-1 relative flex items-center justify-center overflow-hidden"
          >
            <img
              src={getSceneImage()}
              alt="Livestream Program Feed"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Left: Video Monitor Live HUD */}
            <div className="absolute top-4 left-4 flex items-center gap-2.5 z-10">
              <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>LIVE</span>
              </div>

              <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>{(stats?.ccv ?? 0).toLocaleString()} watching</span>
              </div>

              {/* Quick Dynamic Banner shortcut button */}
              <button
                onClick={() => setLeftPanelTab('banners')}
                className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/20 text-xs font-bold text-yellow-300 backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer"
                title="Open Dynamic Banner Builder & Drag Tray"
              >
                <Zap className="w-3.5 h-3.5 fill-current text-yellow-400" />
                <span>+ Drag Banners</span>
              </button>
            </div>

            {/* Dynamic Interactive Drag-and-Drop Banner Overlay Layer */}
            <DynamicBannerOverlay
              banners={dynamicBanners}
              containerRef={videoMonitorRef}
              onUpdateBanner={handleUpdateDynamicBanner}
              onDeleteBanner={handleDeleteDynamicBanner}
              onToggleTimer={handleToggleBannerTimer}
              onResetTimer={handleResetBannerTimer}
              onDropNewBanner={handleDropNewBanner}
            />

            {/* Floating Heart / Reaction Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              {floatingReactions.map((reaction) => (
                <div
                  key={reaction.id}
                  style={{ left: `${reaction.left}%` }}
                  className="absolute bottom-12 text-3xl animate-float-up opacity-90 filter drop-shadow-md"
                >
                  {reaction.emoji}
                </div>
              ))}
            </div>

            {/* Pinned Question Overlay */}
            {pinnedQuestion && (
              <div className="absolute top-16 left-4 max-w-sm z-10 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="p-3 rounded-xl bg-teal-950/90 border border-teal-500/50 backdrop-blur-md shadow-2xl flex items-start gap-2.5">
                  <Pin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-teal-300 uppercase">
                      Pinned Viewer Question • @{pinnedQuestion.user}
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5 leading-snug">
                      &ldquo;{pinnedQuestion.question}&rdquo;
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Left: Featured Shoppable Product Card Overlay (Section 10 & 15) */}
            {overlays.showProductSpotlight && featuredProduct && (
              <div className="absolute bottom-6 left-6 max-w-sm w-full z-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="p-3.5 rounded-2xl bg-zinc-950/90 border border-blue-500/40 backdrop-blur-md shadow-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                      <img
                        src={featuredProduct.imageUrl}
                        alt={featuredProduct.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-0 left-0 bg-red-600 text-white text-[8px] font-black px-1 rounded-br">
                        FEATURED
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate leading-tight">
                        {featuredProduct.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-black text-emerald-400">
                          ${featuredProduct.salePrice}
                        </span>
                        <span className="text-[10px] text-zinc-500 line-through">
                          ${featuredProduct.originalPrice}
                        </span>
                        <span className="text-[10px] font-bold text-amber-400">
                          ★ {featuredProduct.rating} ({featuredProduct.soldCount} sold)
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenProductSpotlight(featuredProduct)}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all shrink-0 active:scale-95 cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Right: Real-time Purchase Alert Toast */}
            {overlays.showPurchaseToasts && orders.length > 0 && (
              <div className="absolute bottom-6 right-6 max-w-xs z-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/40 backdrop-blur-md shadow-2xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-white truncate">
                      {orders[0].customerName} just purchased!
                    </p>
                    <p className="text-[10px] text-emerald-300 font-mono">
                      +${orders[0].amount.toFixed(2)} • {orders[0].timestamp}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Chat, Questions & Live Orders Hub (Sections 12-14) */}
        <div className={`w-full xl:w-80 2xl:w-96 bg-zinc-900 border-l border-zinc-800 flex-col shrink-0 overflow-hidden ${mobileStudioSection === 'feed' ? 'flex' : 'hidden xl:flex'}`}>
          {/* Navigation Tabs for Right Panel */}
          <div className="flex items-center border-b border-zinc-800 bg-zinc-950/80 p-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Live Chat
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer ${
                activeTab === 'questions'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Questions ({questions.filter((q) => !q.isAnswered).length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-zinc-800 text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Orders ({orders.length})
            </button>
          </div>

          {/* TAB 1: LIVE CHAT (Section 12) */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Pinned Message */}
              <div className="p-2.5 bg-blue-950/60 border-b border-blue-500/20 text-xs flex items-center gap-2">
                <Pin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="text-blue-200 truncate">
                  Flash drop discount code <strong>TECHLIVE25</strong> is active for 25% OFF!
                </span>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2.5 text-xs">
                    {msg.avatar ? (
                      <img src={msg.avatar} alt={msg.user} className="w-7 h-7 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {msg.avatarText || msg.user.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-zinc-200">{msg.user}</span>
                        {msg.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {msg.badge}
                          </span>
                        )}
                        <span className="text-[10px] text-zinc-500 ml-auto">{msg.timestamp}</span>
                      </div>
                      <p className="text-zinc-300 mt-0.5 text-xs leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} className="p-3 border-t border-zinc-800 bg-zinc-950 flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Send message to stream as Host..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: QUESTIONS (Section 13) */}
          {activeTab === 'questions' && (
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Audience Q&A Queue
              </div>
              {questions.map((q) => (
                <div
                  key={q.id}
                  className={`p-3 rounded-xl border space-y-2.5 transition-all ${
                    q.isAnswered
                      ? 'bg-zinc-950/40 border-zinc-800 opacity-60'
                      : q.isPinned
                      ? 'bg-blue-950/40 border-blue-500/60 shadow-md'
                      : 'bg-zinc-950 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-blue-400">@{q.user}</span>
                    <span className="text-zinc-500">{q.timestamp} • {q.votes} votes</span>
                  </div>

                  <p className="text-xs text-white font-medium">&ldquo;{q.question}&rdquo;</p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onAnswerQuestion(q.id)}
                      className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                        q.isAnswered
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {q.isAnswered ? '✓ Answered' : 'Answer Live'}
                    </button>

                    <button
                      onClick={() => onPinQuestion(q.id)}
                      className={`py-1 px-2.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                        q.isPinned
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:text-white'
                      }`}
                    >
                      <Pin className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => onDismissQuestion(q.id)}
                      className="py-1 px-2 rounded-lg text-[11px] text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: LIVE ORDERS (Section 14) */}
          {activeTab === 'orders' && (
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Real-time Purchase Feed
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {orders.length} Total Placed
                </span>
              </div>

              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{ord.customerName}</span>
                    <span className="font-black text-emerald-400 font-mono">+${ord.amount.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-zinc-300 truncate">{ord.productTitle}</div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-850">
                    <span>{ord.orderNumber} • {ord.variant || 'Standard'}</span>
                    <span>{ord.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. BOTTOM FEATURED PRODUCTS RUN-SHEET CAROUSEL (Section 15) */}
      <div className="h-32 bg-zinc-900 border-t border-zinc-800 p-3 flex items-center gap-3 shrink-0 overflow-x-auto z-20">
        <div className="shrink-0 pr-2 border-r border-zinc-800 flex flex-col justify-center">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Drop Queue
          </span>
          <span className="text-xs text-blue-400 font-semibold">
            {products.length} Products
          </span>
        </div>

        <div className="flex items-center gap-3 flex-1 overflow-x-auto py-1">
          {products.map((p) => {
            const isFeatured = activeFeaturedProductId === p.id;
            return (
              <div
                key={p.id}
                className={`h-24 min-w-[280px] rounded-xl p-2.5 flex items-center justify-between gap-3 border transition-all shrink-0 ${
                  isFeatured
                    ? 'bg-blue-950/60 border-blue-500 ring-2 ring-blue-500/40 shadow-lg'
                    : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-16 h-16 rounded-lg object-cover bg-zinc-900 shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate leading-tight">{p.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-emerald-400">${p.salePrice}</span>
                    <span className="text-[10px] text-zinc-500 line-through">${p.originalPrice}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Stock: {p.stock}</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5 font-medium">
                    {p.soldCount} units sold
                  </div>
                </div>

                <button
                  onClick={() => onSelectFeaturedProduct(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isFeatured
                      ? 'bg-red-600 text-white shadow-md animate-pulse'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                  }`}
                >
                  {isFeatured ? 'Active' : 'Feature'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
