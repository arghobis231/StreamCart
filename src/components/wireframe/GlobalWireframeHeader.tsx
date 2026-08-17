import React from 'react';
import {
  ScreenId,
  BroadcastStatus,
} from '../../types';
import {
  LayoutDashboard,
  Calendar,
  Package,
  Radio,
  Tv,
  Sparkles,
  ShoppingCart,
  BarChart2,
  FileText,
  Bell,
  ChevronRight,
  Play,
  RotateCcw,
} from 'lucide-react';
import { WireframeBadge, WireframeButton } from './WireframeUI';

interface GlobalWireframeHeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  broadcastStatus?: BroadcastStatus;
  onToggleBroadcast?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationsCount?: number;
  onAdvanceStoryStep?: () => void;
  currentStoryIndex?: number;
}

export const STORY_STEPS: { id: ScreenId; label: string; stepDesc: string }[] = [
  { id: 'dashboard', label: '1. Dashboard', stepDesc: 'Creator reviews metrics and begins livestream journey' },
  { id: 'schedule', label: '2. Schedule Stream', stepDesc: 'Fill title, pick date/time, and configure promotional offers' },
  { id: 'products', label: '3. Products', stepDesc: 'Select catalogue items to queue for the live show' },
  { id: 'studio', label: '4. Director Studio (HERO)', stepDesc: 'Professional 3-column control room: switch cameras, audio, overlays & feature drops' },
  { id: 'viewer', label: '5. Viewer Stream', stepDesc: 'Shopper perspective watching live stream with instant interaction' },
  { id: 'spotlight', label: '6. Product Spotlight', stepDesc: 'In-stream product details modal with floating live video' },
  { id: 'checkout', label: '7. Cart & Checkout', stepDesc: 'One-page instant purchase overlay without leaving live stream' },
  { id: 'studio', label: '8. Real-Time Orders', stepDesc: 'Creator sees live order notifications & cart velocity pop up in Studio' },
  { id: 'summary', label: '9. Post-Stream Summary', stepDesc: 'Stream ends: review total GMV, peak viewers & top selling drop' },
  { id: 'analytics', label: '10. Analytics Hub', stepDesc: 'Deep-dive conversion funnel & viewer engagement analytics' },
];

export const GlobalWireframeHeader: React.FC<GlobalWireframeHeaderProps> = ({
  currentScreen,
  onNavigate,
  broadcastStatus = 'LIVE',
  onToggleBroadcast = () => {},
  onOpenNotifications = () => onNavigate('notifications'),
  unreadNotificationsCount = 0,
  onAdvanceStoryStep,
  currentStoryIndex = 0,
}) => {
  const safeStoryIndex = typeof currentStoryIndex === 'number' && currentStoryIndex >= 0 ? currentStoryIndex : 0;
  const currentStep = STORY_STEPS[safeStoryIndex] || STORY_STEPS[0];
  const handleAdvance = onAdvanceStoryStep || (() => {
    const nextIndex = (safeStoryIndex + 1) % STORY_STEPS.length;
    onNavigate(STORY_STEPS[nextIndex].id);
  });

  return (
    <header className="bg-zinc-100 border-b-2 border-zinc-900 text-zinc-900 select-none shrink-0 z-40 sticky top-0">
      {/* Top Banner: App Title & UX Story Guided Tour Bar */}
      <div className="px-4 py-2 border-b border-zinc-300 flex flex-wrap items-center justify-between gap-3 bg-zinc-200/90 text-xs font-mono">
        {/* Brand & Prototype Identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded border-2 border-zinc-900 bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
            DS
          </div>
          <div>
            <span className="font-bold tracking-tight text-zinc-900">DIRECTOR SUITE</span>
            <span className="ml-2 text-[10px] text-zinc-600 bg-white px-1.5 py-0.2 rounded border border-zinc-400">
              LOW-FIDELITY WIREFRAME PROTOTYPE
            </span>
          </div>
        </div>

        {/* UX Story Walkthrough Controller */}
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded border-2 border-zinc-700 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-zinc-500">UX Flow Step {safeStoryIndex + 1}/10:</span>
          <span className="font-bold text-zinc-900 text-xs truncate max-w-[220px] sm:max-w-xs">
            {currentStep.label}
          </span>
          <button
            onClick={handleAdvance}
            className="flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 text-white px-2.5 py-0.5 rounded text-[11px] font-bold transition-all active:scale-95"
            title="Advance to next step in the UX journey"
          >
            <span>Next Step</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Global Action Triggers: Live Tally & Notifications */}
        <div className="flex items-center gap-2">
          <WireframeButton
            size="sm"
            variant={broadcastStatus === 'LIVE' ? 'danger' : 'primary'}
            onClick={onToggleBroadcast}
            icon={broadcastStatus === 'LIVE' ? <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" /> : <Play className="w-3 h-3" />}
          >
            {broadcastStatus === 'LIVE' ? 'ON AIR: LIVE' : 'GO LIVE (STUDIO)'}
          </WireframeButton>

          <button
            onClick={onOpenNotifications}
            className="relative p-1.5 rounded border-2 border-zinc-700 bg-white hover:bg-zinc-100 text-zinc-800 transition-colors"
            title="Open Notifications Wireframe Drawer (Screen 10)"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-mono font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Screen Navigation Tabs Strip (All 10 Wireframe Screens) */}
      <nav className="px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-zinc-50 border-b border-zinc-300">
        <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase mr-1 hidden lg:inline">
          SCREENS:
        </span>

        {/* 1. Dashboard */}
        <button
          onClick={() => onNavigate('dashboard')}
          className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all border whitespace-nowrap ${
            currentScreen === 'dashboard'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>1. Dashboard</span>
        </button>

        {/* 2. Schedule */}
        <button
          onClick={() => onNavigate('schedule')}
          className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all border whitespace-nowrap ${
            currentScreen === 'schedule'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>2. Schedule</span>
        </button>

        {/* 3. Products */}
        <button
          onClick={() => onNavigate('products')}
          className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all border whitespace-nowrap ${
            currentScreen === 'products'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>3. Products</span>
        </button>

        {/* 4. Director Studio (HERO) */}
        <button
          onClick={() => onNavigate('studio')}
          className={`px-3 py-1 rounded text-xs font-mono font-black flex items-center gap-1.5 transition-all border-2 whitespace-nowrap ${
            currentScreen === 'studio'
              ? 'bg-red-700 text-white border-red-800 shadow-xs'
              : 'bg-zinc-100 text-zinc-900 border-zinc-800 hover:bg-zinc-200'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-red-500 fill-current" />
          <span>4. DIRECTOR STUDIO (HERO)</span>
        </button>

        {/* 5. Viewer Stream */}
        <button
          onClick={() => onNavigate('viewer')}
          className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all border whitespace-nowrap ${
            currentScreen === 'viewer'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
          <span>5. Viewer Stream</span>
        </button>

        {/* 6. Spotlight */}
        <button
          onClick={() => onNavigate('spotlight')}
          className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all border whitespace-nowrap ${
            currentScreen === 'spotlight'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>6. Spotlight</span>
        </button>

        {/* 7. Checkout */}
        <button
          onClick={() => onNavigate('checkout')}
          className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all border whitespace-nowrap ${
            currentScreen === 'checkout'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>7. Checkout</span>
        </button>

        {/* 8. Analytics */}
        <button
          onClick={() => onNavigate('analytics')}
          className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all border whitespace-nowrap ${
            currentScreen === 'analytics'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>8. Analytics</span>
        </button>

        {/* 9. Summary */}
        <button
          onClick={() => onNavigate('summary')}
          className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all border whitespace-nowrap ${
            currentScreen === 'summary'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>9. Post-Summary</span>
        </button>

        {/* 10. Notifications */}
        <button
          onClick={onOpenNotifications}
          className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all border whitespace-nowrap ${
            currentScreen === 'notifications'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>10. Alerts ({unreadNotificationsCount})</span>
        </button>
      </nav>
    </header>
  );
};
