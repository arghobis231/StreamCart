import React, { useState } from 'react';
import {
  Bell,
  Search,
  Radio,
  Plus,
  Zap,
  ShoppingBag,
  ShoppingCart,
  Heart,
  MessageSquare,
  HelpCircle,
  Eye,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  ChevronDown,
  Moon,
  Sun,
  Compass,
  Package,
  Truck,
  Tv,
} from 'lucide-react';
import { ScreenId, BroadcastStatus, UserProfile, AppMode } from '../types';

interface TopHeaderProps {
  appMode: AppMode;
  onSwitchMode: (mode: AppMode) => void;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  broadcastStatus: BroadcastStatus;
  onToggleBroadcast: () => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onSimulateOrder: () => void;
  onSimulateLike: () => void;
  onSimulateQuestion?: () => void;
  cartItemCount?: number;
  wishlistCount?: number;
  userProfile?: UserProfile;
  theme?: 'dark' | 'light';
  onToggleTheme?: (theme: 'dark' | 'light') => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  appMode,
  onSwitchMode,
  currentScreen,
  onNavigate,
  broadcastStatus,
  onToggleBroadcast,
  unreadNotificationsCount,
  onOpenNotifications,
  onSimulateOrder,
  onSimulateLike,
  onSimulateQuestion,
  cartItemCount = 0,
  wishlistCount = 0,
  userProfile,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [showSimMenu, setShowSimMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getScreenTitle = () => {
    switch (currentScreen) {
      // Shopper Screens
      case 'home':
        return { title: 'Shopper Home', subtitle: 'Watch verified creators, discover drops & shop in real time' };
      case 'live-now':
        return { title: 'Live Now Directory', subtitle: 'Currently active creator broadcasts with exclusive in-stream drops' };
      case 'discover':
        return { title: 'Discover Streams & Schedule', subtitle: 'Explore trending live shows, upcoming schedules & RSVPs' };
      case 'shopper-products':
        return { title: 'Browse Products Marketplace', subtitle: 'Curated products with specs, verified reviews & live demo badges' };
      case 'following':
        return { title: 'Followed Creators', subtitle: 'Livestream schedules, live notifications & creator updates' };
      case 'wishlist':
        return { title: 'My Wishlist & Price Alerts', subtitle: 'Saved drops, price drops & live on-air notifications' };
      case 'my-orders':
        return { title: 'My Purchases & Delivery Tracking', subtitle: 'Real-time order statuses, tracking numbers & invoices' };
      case 'profile':
        return { title: 'Shopper Profile & Preferences', subtitle: 'Manage delivery addresses, payment methods & alert settings' };
      case 'cart':
        return { title: 'Shopping Cart', subtitle: 'Review items added during live drops, apply coupons & checkout' };
      case 'viewer':
        return { title: 'Live Stream Stage', subtitle: 'Interactive live shopping stage with chat, polls & flash drops' };
      // Creator Screens
      case 'dashboard':
        return { title: 'Creator Dashboard', subtitle: 'Real-time studio overview & commercial telemetry' };
      case 'livestreams':
        return { title: 'Livestream Manager & Schedule', subtitle: 'Manage upcoming drops, broadcast setup, and VOD archives' };
      case 'products':
        return { title: 'Product Catalogue & Inventory', subtitle: 'Manage shoppable drop inventory, pricing, and stream lineup' };
      case 'studio':
        return { title: 'Live Director Studio', subtitle: 'Multi-camera broadcast switcher, real-time overlays & commerce control' };
      case 'orders':
        return { title: 'Orders & Transactions', subtitle: 'Real-time in-stream purchasing feed and fulfillment pipeline' };
      case 'audience':
        return { title: 'Audience & Community', subtitle: 'Live viewer engagement, VIP shopper roster & chat moderation' };
      case 'analytics':
        return { title: 'Commerce Analytics', subtitle: 'GMV conversion telemetry, retention curves & drop performance' };
      case 'settings':
        return { title: 'Studio Settings', subtitle: 'Camera inputs, audio routing, stream keys & payout connections' };
      case 'summary':
        return { title: 'Post-Broadcast Performance Summary', subtitle: 'Comprehensive commercial recap, revenue breakdown & VOD replay' };
      default:
        return { title: 'StreamCart Director Suite', subtitle: 'Interactive Livestream Shopping Platform' };
    }
  };

  const { title, subtitle } = getScreenTitle();

  return (
    <header className="h-16 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-6 flex items-center justify-between shrink-0 z-20 select-none text-left">
      {/* Page Title & Breadcrumb */}
      <div className="flex items-center gap-4 min-w-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight truncate">{title}</h2>
            {currentScreen === 'studio' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                ON AIR
              </span>
            )}
            {appMode === 'shopper' && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">
                SHOPPER VIEW
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-400 hidden md:block truncate">{subtitle}</p>
        </div>
      </div>

      {/* Center / Right Control Hub */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Global Search Bar */}
        <div className="relative hidden lg:block">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search drops, hosts, orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 xl:w-64 bg-zinc-900/80 border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-all"
          />
        </div>

        {/* Mode Switcher Pill in Header */}
        <button
          onClick={() => onSwitchMode(appMode === 'shopper' ? 'creator' : 'shopper')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            appMode === 'shopper'
              ? 'bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 border-blue-500/30'
              : 'bg-teal-600/15 hover:bg-teal-600/25 text-teal-400 border-teal-500/30'
          }`}
          title="Toggle between Shopper and Creator modes"
        >
          {appMode === 'shopper' ? (
            <>
              <Tv className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Go to Creator Studio</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Go to Shopper Mode</span>
            </>
          )}
        </button>

        {/* Live Simulation Trigger (Interactive Demo Helper) */}
        <div className="relative">
          <button
            onClick={() => setShowSimMenu(!showSimMenu)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-teal-300 text-xs font-semibold hover:bg-zinc-800 transition-all active:scale-95 cursor-pointer"
            title="Trigger real-time simulated events for live demo"
          >
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Simulate</span>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>

          {showSimMenu && (
            <div
              className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
              onMouseLeave={() => setShowSimMenu(false)}
            >
              <div className="px-2.5 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                Demo Event Triggers
              </div>
              <button
                onClick={() => {
                  onSimulateOrder();
                  setShowSimMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-emerald-300 hover:bg-emerald-500/10 transition-colors text-left cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-semibold text-white">Simulate Flash Order</div>
                  <div className="text-[10px] text-zinc-400">Trigger +$149 sale & stock drop</div>
                </div>
              </button>
              <button
                onClick={() => {
                  onSimulateLike();
                  setShowSimMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-cyan-300 hover:bg-cyan-500/10 transition-colors text-left cursor-pointer"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="font-semibold text-white">Simulate Hype Burst (⚡)</div>
                  <div className="text-[10px] text-zinc-400">Trigger floating reaction barrage</div>
                </div>
              </button>
              {onSimulateQuestion && (
                <button
                  onClick={() => {
                    onSimulateQuestion();
                    setShowSimMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-cyan-300 hover:bg-cyan-500/10 transition-colors text-left cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="font-semibold text-white">Simulate VIP Question</div>
                    <div className="text-[10px] text-zinc-400">Add question to Q&A queue</div>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Wishlist Shortcut Button */}
        <button
          onClick={() => onNavigate('wishlist')}
          className={`relative p-2 rounded-xl border transition-colors cursor-pointer ${
            currentScreen === 'wishlist'
              ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30'
              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
          }`}
          title="My Wishlist"
        >
          <Heart className="w-4 h-4" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-zinc-950">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Shopping Cart Button */}
        <button
          onClick={() => onNavigate('cart')}
          className={`relative p-2 rounded-xl border transition-colors cursor-pointer ${
            currentScreen === 'cart'
              ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-600/30'
              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
          }`}
          title="Open Shopping Cart"
        >
          <ShoppingCart className="w-4 h-4" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-zinc-950 animate-pulse">
              {cartItemCount}
            </span>
          )}
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
          title="Notifications & Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-zinc-950 animate-pulse">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Theme Quick Toggle */}
        {onToggleTheme && (
          <button
            onClick={() => onToggleTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-400" />
            )}
          </button>
        )}

        {/* Live Studio Button / Pause Stream (Creator mode specific) */}
        {appMode === 'creator' && (
          currentScreen !== 'studio' ? (
            <button
              onClick={() => onNavigate('studio')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="hidden sm:inline">Enter Studio</span>
            </button>
          ) : (
            <button
              onClick={onToggleBroadcast}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95 ${
                broadcastStatus === 'LIVE'
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
              }`}
            >
              {broadcastStatus === 'LIVE' ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">Resume</span>
                </>
              )}
            </button>
          )
        )}
      </div>
    </header>
  );
};
