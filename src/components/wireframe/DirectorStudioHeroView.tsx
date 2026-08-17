import React, { useState, useEffect } from 'react';
import {
  ScreenId,
  ProductItem,
  ChatMessage,
  ViewerQuestion,
  LiveOrder,
  StreamStats,
  CameraId,
  SceneId,
  BroadcastStatus,
  ActiveOverlays,
} from '../../types';
import {
  Radio,
  Clock,
  Users,
  Settings,
  Square,
  Play,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Share2,
  Disc,
  Layers,
  Sparkles,
  Pin,
  MessageSquare,
  HelpCircle,
  ShoppingCart,
  Plus,
  Flame,
  CheckCircle,
  Eye,
  TrendingUp,
  DollarSign,
  Maximize2,
  Monitor,
  Camera,
  ChevronRight,
  Zap,
  Sliders,
  Bell,
  Heart,
  Send,
  Music,
} from 'lucide-react';
import { WireframeBox, WireframeButton, WireframeBadge, WireframeCard } from './WireframeUI';

interface DirectorStudioHeroViewProps {
  onNavigate: (screen: ScreenId) => void;
  products: ProductItem[];
  activeFeaturedProduct: ProductItem;
  onSelectFeaturedProduct: (product: ProductItem) => void;
  chatMessages: ChatMessage[];
  onSendChatMessage: (text: string) => void;
  questions: ViewerQuestion[];
  onToggleQuestionAnswered: (id: string) => void;
  onPinQuestion: (id: string) => void;
  onIgnoreQuestion: (id: string) => void;
  orders: LiveOrder[];
  stats: StreamStats;
  broadcastStatus: BroadcastStatus;
  onToggleBroadcast: () => void;
  onEndStream: () => void;
  onSimulateOrder: () => void;
  onSimulateLike: () => void;
}

export const DirectorStudioHeroView: React.FC<DirectorStudioHeroViewProps> = ({
  onNavigate,
  products,
  activeFeaturedProduct,
  onSelectFeaturedProduct,
  chatMessages,
  onSendChatMessage,
  questions,
  onToggleQuestionAnswered,
  onPinQuestion,
  onIgnoreQuestion,
  orders,
  stats,
  broadcastStatus,
  onToggleBroadcast,
  onEndStream,
  onSimulateOrder,
  onSimulateLike,
}) => {
  // Stream Controls State
  const [selectedCamera, setSelectedCamera] = useState<CameraId>('cam1');
  const [selectedScene, setSelectedScene] = useState<SceneId>('main');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamMuted, setIsCamMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [streamQuality, setStreamQuality] = useState('1080p60 (6.2 Mbps)');

  // Audio Mixer State
  const [micVolume, setMicVolume] = useState(85);
  const [bgmVolume, setBgmVolume] = useState(35);
  const [sfxVolume, setSfxVolume] = useState(70);
  const [masterVolume, setMasterVolume] = useState(90);

  // Overlays State
  const [overlays, setOverlays] = useState<ActiveOverlays>({
    showProductSpotlight: true,
    showFlashTimer: true,
    showLowerThird: true,
    showLiveChatBubble: true,
    showPurchaseToasts: true,
    showLivePoll: false,
    showStockAlert: true,
    promoBannerText: '⚡ FLASH DEAL: 25% OFF with code TECHLIVE25 • FREE SHIPPING ON ALL ORDERS',
  });

  // Right Panel Tab: Chat | Questions | Orders
  const [activeTab, setActiveTab] = useState<'chat' | 'questions' | 'orders'>('chat');
  const [hostChatInput, setHostChatInput] = useState('');
  const [floatingLikes, setFloatingLikes] = useState<{ id: number; emoji: string; left: number }[]>([]);

  // Timer formatter
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostChatInput.trim()) return;
    onSendChatMessage(hostChatInput.trim());
    setHostChatInput('');
  };

  const handleLikeClick = () => {
    onSimulateLike();
    const newLike = {
      id: Date.now(),
      emoji: ['❤️', '🔥', '👏', '⚡', '🎉'][Math.floor(Math.random() * 5)],
      left: 20 + Math.random() * 60,
    };
    setFloatingLikes((prev) => [...prev.slice(-15), newLike]);
  };

  const pinnedQuestion = questions.find((q) => q.isPinned);

  return (
    <div className="flex-1 flex flex-col bg-zinc-100 min-h-screen text-zinc-900 font-mono select-none">
      {/* 1. TOP BROADCAST CONTROL BAR */}
      <div className="bg-zinc-900 text-white px-4 py-2.5 border-b-2 border-zinc-950 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Left: Live Tally & Title */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-black tracking-wider uppercase border ${
              broadcastStatus === 'LIVE'
                ? 'bg-red-600 border-red-500 text-white animate-pulse'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span>{broadcastStatus === 'LIVE' ? 'LIVE ON AIR' : 'PRE-SHOW READY'}</span>
          </div>

          <div className="hidden sm:block">
            <div className="text-xs font-bold text-zinc-100 flex items-center gap-2">
              <span>Mega Tech Friday: Unboxing 4K Drones & Pro Studio Gear</span>
              <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-zinc-700">
                PRODUCER DESK
              </span>
            </div>
          </div>
        </div>

        {/* Center: Stream Duration, Viewers & Signal Telemetry */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-zinc-800/90 px-2.5 py-1 rounded border border-zinc-700">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-bold text-zinc-200">{formatDuration(stats.durationSeconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-800/90 px-2.5 py-1 rounded border border-zinc-700">
            <Users className="w-3.5 h-3.5 text-red-400" />
            <span className="font-black text-white">{stats.ccv.toLocaleString()}</span>
            <span className="text-[10px] text-zinc-400">CCV</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-zinc-400 bg-zinc-800/60 px-2.5 py-1 rounded border border-zinc-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>1080p60 • {stats.bitrate} kbps</span>
            <span className="text-emerald-400 font-bold">HEALTH: {stats.streamHealth}</span>
          </div>
        </div>

        {/* Right Actions: Test Actions, Viewer View, End Stream */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSimulateOrder}
            className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-bold transition-all shadow-xs active:scale-95 flex items-center gap-1"
            title="Simulate a real-time customer purchase"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>Simulate Order</span>
          </button>

          <WireframeButton
            variant="outline"
            size="sm"
            onClick={() => onNavigate('viewer')}
            icon={<Eye className="w-3.5 h-3.5" />}
          >
            Shopper View
          </WireframeButton>

          <WireframeButton
            variant="danger"
            size="sm"
            onClick={onEndStream}
            icon={<Square className="w-3.5 h-3.5 fill-current" />}
          >
            End Stream
          </WireframeButton>
        </div>
      </div>

      {/* 2. MAIN THREE-COLUMN STUDIO DESK */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 min-h-0 overflow-y-auto">
        {/* LEFT COLUMN: STREAM CONTROLS & SCENE SWITCHER (3 cols) */}
        <div className="lg:col-span-3 space-y-3 flex flex-col">
          {/* Scene Selection Panel */}
          <WireframeCard title="1. Scene Switcher" subtitle="Live video layout triggers">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {[
                { id: 'main', label: 'Main Camera (Host)', desc: 'Full screen host focus', icon: '📹' },
                { id: 'demo', label: 'Product Demo (Split)', desc: 'Host + Macro camera split', icon: '🔲' },
                { id: 'macro', label: 'Full Screen Product', desc: '4K Macro close-up shot', icon: '🔍' },
                { id: 'interview', label: 'Interview / Guest', desc: 'Dual host 50/50 split', icon: '👥' },
                { id: 'ending', label: 'Ending Scene / Outro', desc: 'Credits & discount countdown', icon: '🎬' },
              ].map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => setSelectedScene(scene.id as SceneId)}
                  className={`p-2 rounded border-2 text-left flex items-start gap-2.5 transition-all ${
                    selectedScene === scene.id
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                      : 'bg-zinc-50 border-zinc-300 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-500'
                  }`}
                >
                  <span className="text-base">{scene.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs flex items-center justify-between">
                      <span>{scene.label}</span>
                      {selectedScene === scene.id && (
                        <span className="text-[9px] bg-red-600 text-white px-1 rounded font-mono font-bold">
                          PGM
                        </span>
                      )}
                    </div>
                    <div className={`text-[10px] ${selectedScene === scene.id ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {scene.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </WireframeCard>

          {/* Camera Sources & Video Switcher */}
          <WireframeCard title="2. Video Sources" subtitle="Multi-camera input matrix">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'cam1', label: 'Cam 1: Host Wide' },
                { id: 'cam2', label: 'Cam 2: Macro 4K' },
                { id: 'cam3', label: 'Cam 3: Overhead' },
                { id: 'cam4', label: 'Cam 4: Screen/Deck' },
              ].map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => setSelectedCamera(cam.id as CameraId)}
                  className={`p-2 rounded border-2 text-center transition-all ${
                    selectedCamera === cam.id
                      ? 'bg-zinc-900 text-white border-zinc-900 font-bold'
                      : 'bg-white border-zinc-300 text-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase">{cam.id}</div>
                  <div className="text-[11px] truncate">{cam.label.split(':')[1]}</div>
                </button>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-zinc-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 font-bold">Stream Quality:</span>
                <select
                  value={streamQuality}
                  onChange={(e) => setStreamQuality(e.target.value)}
                  className="bg-white border border-zinc-400 rounded px-1.5 py-0.5 text-[11px]"
                >
                  <option value="1080p60 (6.2 Mbps)">1080p 60fps (6.2 Mbps)</option>
                  <option value="4K30 (12 Mbps)">4K 30fps (12 Mbps)</option>
                  <option value="720p60 (3.5 Mbps)">720p 60fps (3.5 Mbps)</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-600 font-bold">Recording to Cloud:</span>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                    isRecording ? 'bg-red-100 text-red-700 border-red-400' : 'bg-zinc-100 text-zinc-600 border-zinc-300'
                  }`}
                >
                  {isRecording ? '● REC ACTIVE' : 'REC PAUSED'}
                </button>
              </div>
            </div>
          </WireframeCard>

          {/* Audio Mixer Controls */}
          <WireframeCard title="3. Studio Audio Mixer" subtitle="VU Meters & Channel Gain">
            <div className="space-y-2.5 text-xs">
              {/* Mic Channel */}
              <div>
                <div className="flex items-center justify-between mb-1 text-[11px]">
                  <span className="font-bold flex items-center gap-1 text-zinc-800">
                    <Mic className="w-3 h-3" /> Host Mic
                  </span>
                  <span className="text-zinc-500">{micVolume}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={micVolume}
                    onChange={(e) => setMicVolume(Number(e.target.value))}
                    className="w-full accent-zinc-900"
                  />
                  <div className="w-10 h-2.5 bg-zinc-200 rounded overflow-hidden border border-zinc-400 flex">
                    <div className="bg-emerald-600 h-full w-[70%]" />
                    <div className="bg-amber-500 h-full w-[20%]" />
                  </div>
                </div>
              </div>

              {/* BGM Channel */}
              <div>
                <div className="flex items-center justify-between mb-1 text-[11px]">
                  <span className="font-bold flex items-center gap-1 text-zinc-800">
                    <Music className="w-3 h-3" /> Stream BGM
                  </span>
                  <span className="text-zinc-500">{bgmVolume}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bgmVolume}
                    onChange={(e) => setBgmVolume(Number(e.target.value))}
                    className="w-full accent-zinc-900"
                  />
                  <div className="w-10 h-2.5 bg-zinc-200 rounded overflow-hidden border border-zinc-400 flex">
                    <div className="bg-emerald-600 h-full w-[35%]" />
                  </div>
                </div>
              </div>

              {/* Master Volume */}
              <div>
                <div className="flex items-center justify-between mb-1 text-[11px]">
                  <span className="font-bold flex items-center gap-1 text-zinc-800">
                    <Sliders className="w-3 h-3" /> Master Output
                  </span>
                  <span className="text-zinc-500">{masterVolume}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={masterVolume}
                    onChange={(e) => setMasterVolume(Number(e.target.value))}
                    className="w-full accent-zinc-900"
                  />
                  <div className="w-10 h-2.5 bg-zinc-200 rounded overflow-hidden border border-zinc-400 flex">
                    <div className="bg-emerald-600 h-full w-[80%]" />
                    <div className="bg-red-500 h-full w-[10%]" />
                  </div>
                </div>
              </div>
            </div>
          </WireframeCard>

          {/* Overlays Master Toggle */}
          <WireframeCard title="4. Live On-Screen Overlays" subtitle="Toggle graphics displayed to viewers">
            <div className="space-y-1.5 text-xs">
              {[
                { key: 'showProductSpotlight', label: 'Featured Product Card' },
                { key: 'showFlashTimer', label: 'Flash Countdown Timer' },
                { key: 'showLowerThird', label: 'Host Lower-Third Banner' },
                { key: 'showLiveChatBubble', label: 'Live Chat Bubble Overlay' },
                { key: 'showPurchaseToasts', label: 'Purchase Pop-Up Alerts' },
              ].map((ov) => {
                const isEnabled = (overlays as any)[ov.key];
                return (
                  <label
                    key={ov.key}
                    className="flex items-center justify-between p-1.5 rounded border border-zinc-200 bg-white hover:bg-zinc-50 cursor-pointer"
                  >
                    <span className="font-medium text-zinc-800 text-[11px]">{ov.label}</span>
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={(e) =>
                        setOverlays((prev) => ({
                          ...prev,
                          [ov.key]: e.target.checked,
                        }))
                      }
                      className="w-3.5 h-3.5 accent-zinc-900"
                    />
                  </label>
                );
              })}
            </div>
          </WireframeCard>
        </div>

        {/* CENTER COLUMN: LIVE PROGRAM PREVIEW & DIRECTOR CONTROLS (6 cols) */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          {/* Large Video Preview Container */}
          <div className="relative bg-zinc-950 border-2 border-zinc-900 rounded-md overflow-hidden aspect-video flex flex-col justify-between shadow-md">
            {/* Live Video Canvas / Wireframe Placeholder Feed */}
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 select-none">
              {/* Background Wireframe Sketch Lines */}
              <svg className="absolute inset-0 w-full h-full text-zinc-800 pointer-events-none opacity-40">
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="2" />
                <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="2" />
              </svg>

              <div className="text-center space-y-2 z-10 px-4">
                <div className="inline-flex items-center gap-2 bg-zinc-800/90 border border-zinc-700 text-white px-3 py-1 rounded font-mono text-xs font-bold">
                  <Camera className="w-4 h-4 text-red-500" />
                  <span>
                    [ PROGRAM MONITOR : {selectedScene.toUpperCase()} SCENE • {selectedCamera.toUpperCase()} ]
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 max-w-sm mx-auto">
                  Live Creator Feed: Sarah Connor demonstrating "{activeFeaturedProduct.title}"
                </div>
              </div>

              {/* Floating Hearts/Reactions Stream Animation */}
              <div className="absolute inset-y-0 right-6 w-16 pointer-events-none overflow-hidden flex flex-col justify-end">
                {floatingLikes.map((l) => (
                  <div
                    key={l.id}
                    className="text-xl animate-bounce mb-2 select-none"
                    style={{ marginLeft: `${(l.left % 40) - 20}px` }}
                  >
                    {l.emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* TOP ON-SCREEN OVERLAYS (Inside Live Preview) */}
            <div className="relative z-20 p-3 flex items-start justify-between">
              {/* Top Left: Live Status & Viewers */}
              <div className="flex items-center gap-2">
                <div className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>LIVE</span>
                </div>
                <div className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/20 flex items-center gap-1">
                  <Users className="w-3 h-3 text-red-400" />
                  <span>{stats.ccv.toLocaleString()}</span>
                </div>
              </div>

              {/* Top Right: Promo Banner Flash Timer */}
              {overlays.showFlashTimer && (
                <div className="bg-amber-400 text-black text-[10px] font-black px-2.5 py-1 rounded border border-amber-500 shadow-sm flex items-center gap-1.5 animate-pulse">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>FLASH DEAL: 25% OFF with code TECHLIVE25</span>
                </div>
              )}
            </div>

            {/* BOTTOM ON-SCREEN OVERLAYS (Inside Live Preview) */}
            <div className="relative z-20 p-3 space-y-2">
              {/* Pinned Question Overlay */}
              {pinnedQuestion && (
                <div className="bg-zinc-900/90 border-2 border-amber-400 text-white p-2 rounded max-w-md shadow-lg flex items-start gap-2">
                  <div className="bg-amber-400 text-black font-bold text-[9px] px-1.5 py-0.5 rounded uppercase shrink-0">
                    PINNED Q&A
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-amber-300">@{pinnedQuestion.user}:</span> {pinnedQuestion.question}
                  </div>
                </div>
              )}

              {/* Featured Product Overlay Card */}
              {overlays.showProductSpotlight && activeFeaturedProduct && (
                <div className="bg-white/95 border-2 border-zinc-900 text-zinc-900 p-2.5 rounded-md max-w-sm shadow-xl flex items-center gap-3">
                  <WireframeBox label="[ X ]" className="w-14 h-14 rounded shrink-0 bg-zinc-200" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <WireframeBadge variant="live">FEATURED ON-AIR</WireframeBadge>
                      <span className="text-[10px] text-zinc-500">{activeFeaturedProduct.sku}</span>
                    </div>
                    <div className="font-bold text-xs text-zinc-900 truncate mt-0.5">
                      {activeFeaturedProduct.title}
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-black text-zinc-900">${activeFeaturedProduct.salePrice}</span>
                      <span className="text-xs text-zinc-500 line-through">${activeFeaturedProduct.originalPrice}</span>
                      <span className="text-[10px] text-red-700 font-bold ml-auto">
                        Only {activeFeaturedProduct.stock} left!
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Host Lower Third */}
              {overlays.showLowerThird && (
                <div className="bg-zinc-900/80 border border-zinc-700 text-white px-3 py-1 rounded inline-block text-[11px]">
                  <span className="font-bold text-white">Sarah Connor</span> • Tech & Audio Host
                </div>
              )}
            </div>
          </div>

          {/* Director Quick Action Bar Below Video */}
          <div className="bg-white border-2 border-zinc-800 rounded-md p-2.5 flex flex-wrap items-center justify-between gap-2 shadow-xs">
            {/* Audio & Cam Toggles */}
            <div className="flex items-center gap-1.5">
              <WireframeButton
                size="sm"
                variant={isMicMuted ? 'danger' : 'outline'}
                onClick={() => setIsMicMuted(!isMicMuted)}
                icon={isMicMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              >
                {isMicMuted ? 'Mic Muted' : 'Mic Live'}
              </WireframeButton>

              <WireframeButton
                size="sm"
                variant={isCamMuted ? 'danger' : 'outline'}
                onClick={() => setIsCamMuted(!isCamMuted)}
                icon={isCamMuted ? <VideoOff className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
              >
                {isCamMuted ? 'Cam Off' : 'Cam On'}
              </WireframeButton>

              <WireframeButton
                size="sm"
                variant={isScreenSharing ? 'primary' : 'outline'}
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                icon={<Share2 className="w-3.5 h-3.5" />}
              >
                {isScreenSharing ? 'Sharing Screen' : 'Share Screen'}
              </WireframeButton>
            </div>

            {/* Stream Interaction Triggers */}
            <div className="flex items-center gap-1.5">
              <WireframeButton
                size="sm"
                variant="secondary"
                onClick={handleLikeClick}
                icon={<Heart className="w-3.5 h-3.5 text-red-600 fill-current" />}
              >
                + Reactions
              </WireframeButton>

              <WireframeButton
                size="sm"
                variant="outline"
                onClick={() => onNavigate('spotlight')}
                icon={<Maximize2 className="w-3.5 h-3.5" />}
              >
                Spotlight Modal
              </WireframeButton>

              <WireframeButton
                size="sm"
                variant="primary"
                onClick={() => onNavigate('checkout')}
                icon={<ShoppingCart className="w-3.5 h-3.5" />}
              >
                Test Checkout
              </WireframeButton>
            </div>
          </div>

          {/* BOTTOM PANEL: HORIZONTAL PRODUCTS RUN-SHEET CAROUSEL */}
          <WireframeCard
            title="5. Livestream Product Run-Sheet & Inventory Carousel"
            subtitle="Click '⭐ FEATURE ON-AIR' to switch active spotlight live to viewers"
            headerAction={
              <WireframeButton size="sm" variant="outline" onClick={() => onNavigate('products')}>
                + Add Product
              </WireframeButton>
            }
          >
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {products.map((prod) => {
                const isActive = activeFeaturedProduct?.id === prod.id;
                return (
                  <div
                    key={prod.id}
                    className={`shrink-0 w-52 p-2.5 rounded border-2 transition-all flex flex-col justify-between ${
                      isActive
                        ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400'
                        : 'bg-white border-zinc-300 hover:border-zinc-500'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <WireframeBox label="[ X ]" className="w-12 h-12 rounded shrink-0 bg-zinc-100" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] text-zinc-500 font-mono uppercase">{prod.sku}</div>
                        <div className="text-xs font-bold text-zinc-900 truncate">{prod.title}</div>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-xs font-black text-zinc-900">${prod.salePrice}</span>
                          <span className="text-[10px] text-zinc-500 line-through">${prod.originalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-zinc-200 flex items-center justify-between text-[10px]">
                      <span className={prod.stock < 10 ? 'text-red-700 font-bold' : 'text-zinc-600'}>
                        Stock: {prod.stock} left
                      </span>
                      <span className="text-emerald-700 font-bold">{prod.soldCount} sold</span>
                    </div>

                    <button
                      onClick={() => onSelectFeaturedProduct(prod)}
                      className={`mt-2 w-full py-1.5 rounded text-xs font-bold font-mono uppercase transition-all ${
                        isActive
                          ? 'bg-zinc-900 text-amber-400 border border-zinc-900'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300'
                      }`}
                    >
                      {isActive ? '★ ON-AIR NOW' : 'Feature Drop'}
                    </button>
                  </div>
                );
              })}
            </div>
          </WireframeCard>
        </div>

        {/* RIGHT COLUMN: LIVE AUDIENCE INTERACTION TABS (3 cols) */}
        <div className="lg:col-span-3 flex flex-col space-y-3">
          <div className="bg-white border-2 border-zinc-800 rounded-md shadow-xs flex-1 flex flex-col overflow-hidden">
            {/* Interaction Tabs Header */}
            <div className="border-b-2 border-zinc-800 bg-zinc-100 p-1.5 flex items-center gap-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-1 px-2 rounded text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'chat'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                <span>Chat</span>
              </button>

              <button
                onClick={() => setActiveTab('questions')}
                className={`flex-1 py-1 px-2 rounded text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'questions'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                <HelpCircle className="w-3 h-3" />
                <span>Questions ({questions.filter((q) => !q.isAnswered).length})</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 py-1 px-2 rounded text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'orders'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                <ShoppingCart className="w-3 h-3" />
                <span>Orders ({orders.length})</span>
              </button>
            </div>

            {/* TAB CONTENT 1: LIVE CHAT */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between p-3 min-h-0 overflow-hidden">
                <div className="space-y-2.5 overflow-y-auto pr-1 flex-1 max-h-[380px]">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="p-2 rounded border border-zinc-200 bg-zinc-50 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-zinc-300 text-zinc-800 font-bold flex items-center justify-center text-[9px]">
                            {msg.avatarText || 'U'}
                          </div>
                          <span className="font-bold text-zinc-900">@{msg.user}</span>
                          {msg.badge && (
                            <span className="px-1 py-0.2 bg-amber-200 text-amber-900 font-bold rounded text-[8px]">
                              {msg.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-zinc-400">{msg.timestamp}</span>
                      </div>
                      <div className="text-zinc-800">{msg.text}</div>
                    </div>
                  ))}
                </div>

                {/* Host Chat Composer */}
                <form onSubmit={handleSendChat} className="pt-2 border-t border-zinc-200 mt-2 flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Send message as Host..."
                    value={hostChatInput}
                    onChange={(e) => setHostChatInput(e.target.value)}
                    className="flex-1 bg-zinc-50 border border-zinc-400 rounded px-2.5 py-1 text-xs font-mono focus:outline-hidden focus:border-zinc-800"
                  />
                  <WireframeButton size="sm" variant="primary" icon={<Send className="w-3 h-3" />}>
                    Send
                  </WireframeButton>
                </form>
              </div>
            )}

            {/* TAB CONTENT 2: QUESTIONS QUEUE */}
            {activeTab === 'questions' && (
              <div className="flex-1 p-3 overflow-y-auto space-y-2.5 max-h-[440px]">
                <div className="text-[10px] text-zinc-500 uppercase font-bold flex items-center justify-between pb-1 border-b border-zinc-200">
                  <span>Viewer Questions Queue</span>
                  <span>{questions.length} Total</span>
                </div>

                {questions.map((q) => (
                  <div
                    key={q.id}
                    className={`p-2.5 rounded border-2 text-xs space-y-2 ${
                      q.isPinned
                        ? 'bg-amber-50 border-amber-500'
                        : q.isAnswered
                        ? 'bg-zinc-100 border-zinc-300 opacity-60'
                        : 'bg-white border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-zinc-900">@{q.user}</span>
                      <span className="text-zinc-500">{q.timestamp} • {q.votes} upvotes</span>
                    </div>

                    <div className="font-medium text-zinc-800">{q.question}</div>

                    <div className="flex items-center gap-1.5 pt-1 border-t border-zinc-200 text-[10px]">
                      <button
                        onClick={() => onToggleQuestionAnswered(q.id)}
                        className={`px-2 py-0.5 rounded border font-bold ${
                          q.isAnswered ? 'bg-emerald-600 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                        }`}
                      >
                        {q.isAnswered ? '✓ Answered' : 'Mark Answered'}
                      </button>

                      <button
                        onClick={() => onPinQuestion(q.id)}
                        className={`px-2 py-0.5 rounded border font-bold flex items-center gap-1 ${
                          q.isPinned ? 'bg-amber-500 text-black border-amber-600' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                        }`}
                      >
                        <Pin className="w-2.5 h-2.5" />
                        <span>{q.isPinned ? 'Pinned' : 'Pin to Screen'}</span>
                      </button>

                      <button
                        onClick={() => onIgnoreQuestion(q.id)}
                        className="ml-auto text-zinc-400 hover:text-zinc-600 text-[10px]"
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 3: REAL-TIME IN-STREAM PURCHASES */}
            {activeTab === 'orders' && (
              <div className="flex-1 p-3 overflow-y-auto space-y-2 max-h-[440px]">
                <div className="text-[10px] text-zinc-500 uppercase font-bold flex items-center justify-between pb-1 border-b border-zinc-200">
                  <span>Live Stream Orders Ticker</span>
                  <span className="text-emerald-700 font-bold">{orders.length} Purchases</span>
                </div>

                {orders.map((ord) => (
                  <div key={ord.id} className="p-2 rounded border border-zinc-300 bg-zinc-50 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono font-bold text-zinc-900">{ord.orderNumber}</span>
                      <span className="text-zinc-500 font-mono">{ord.timestamp}</span>
                    </div>
                    <div className="font-bold text-zinc-900">{ord.customerName}</div>
                    <div className="text-[11px] text-zinc-600 truncate">{ord.productTitle}</div>
                    <div className="flex items-center justify-between pt-1 border-t border-zinc-200 text-[11px]">
                      <span className="text-emerald-700 font-black">${ord.amount.toFixed(2)}</span>
                      <WireframeBadge variant="success">{ord.status}</WireframeBadge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM TELEMETRY & ANALYTICS BAR */}
      <div className="bg-zinc-900 text-white px-4 py-2 border-t-2 border-zinc-950 flex flex-wrap items-center justify-between gap-4 text-xs font-mono shrink-0">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-zinc-500 text-[10px] uppercase block">Live Viewers</span>
            <span className="font-black text-white text-sm">{stats.ccv.toLocaleString()}</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase block">Peak Viewers</span>
            <span className="font-bold text-zinc-300 text-sm">{stats.peakCcv.toLocaleString()}</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase block">Engagement Rate</span>
            <span className="font-bold text-amber-400 text-sm">18.4%</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase block">Live Orders</span>
            <span className="font-black text-emerald-400 text-sm">{stats.totalOrders} orders</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase block">Conversion (CVR)</span>
            <span className="font-bold text-zinc-300 text-sm">{stats.cvr}%</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[10px] uppercase block">Stream GMV</span>
            <span className="font-black text-emerald-400 text-sm">${stats.gmv.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <WireframeButton size="sm" variant="outline" onClick={() => onNavigate('analytics')}>
            Full Analytics View
          </WireframeButton>
        </div>
      </div>
    </div>
  );
};
