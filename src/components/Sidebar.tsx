import React, { useRef } from 'react';
import {
  LayoutDashboard,
  Radio,
  Package,
  Sliders,
  ShoppingBag,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Eye,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Moon,
  Sun,
  Compass,
  Flame,
  Camera,
  Upload,
  Heart,
  UserCheck,
  Truck,
  User,
  Tv,
  Layers,
  X,
} from 'lucide-react';
import { ScreenId, BroadcastStatus, UserProfile, AppMode } from '../types';

interface SidebarProps {
  appMode: AppMode;
  onSwitchMode: (mode: AppMode) => void;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  broadcastStatus: BroadcastStatus;
  ccv?: number;
  liveViewerCount?: number;
  unreadNotificationsCount?: number;
  unreadOrdersCount?: number;
  cartItemCount?: number;
  wishlistCount?: number;
  userProfile?: UserProfile;
  onUploadAvatar?: (file: File) => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: (theme: 'dark' | 'light') => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  appMode,
  onSwitchMode,
  currentScreen,
  onNavigate,
  broadcastStatus,
  ccv,
  liveViewerCount,
  unreadNotificationsCount = 0,
  unreadOrdersCount = 0,
  cartItemCount = 0,
  wishlistCount = 0,
  userProfile,
  onUploadAvatar,
  theme = 'dark',
  onToggleTheme,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const viewerCount = liveViewerCount ?? ccv ?? 0;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileName = userProfile?.name || 'Argho Biswas';
  const profileHandle = userProfile?.username || '@arghobiswas';
  const profileAvatar =
    userProfile?.avatarUrl ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadAvatar) {
      onUploadAvatar(file);
    }
  };

  const handleNavClick = (screen: ScreenId) => {
    onNavigate(screen);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleModeChange = (mode: AppMode) => {
    onSwitchMode(mode);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const creatorNavItems = [
    {
      id: 'dashboard' as ScreenId,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'livestreams' as ScreenId,
      label: 'Livestreams',
      icon: Radio,
      badge: '1 Live',
    },
    {
      id: 'products' as ScreenId,
      label: 'Products',
      icon: Package,
    },
    {
      id: 'studio' as ScreenId,
      label: 'Director Studio',
      icon: Sliders,
      isLiveHero: true,
      badge: broadcastStatus === 'LIVE' ? 'LIVE' : undefined,
    },
    {
      id: 'orders' as ScreenId,
      label: 'Seller Orders',
      icon: ShoppingBag,
    },
    {
      id: 'audience' as ScreenId,
      label: 'Audience & VIPs',
      icon: Users,
    },
    {
      id: 'analytics' as ScreenId,
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'settings' as ScreenId,
      label: 'Studio Settings',
      icon: Settings,
    },
  ];

  const shopperNavItems = [
    {
      id: 'home' as ScreenId,
      label: 'Shopper Home',
      icon: LayoutDashboard,
    },
    {
      id: 'live-now' as ScreenId,
      label: 'Live Now',
      icon: Radio,
      badge: '6 LIVE',
      badgeColor: 'bg-red-500 text-white animate-pulse',
    },
    {
      id: 'discover' as ScreenId,
      label: 'Discover Streams',
      icon: Compass,
    },
    {
      id: 'shopper-products' as ScreenId,
      label: 'Browse Products',
      icon: Package,
    },
    {
      id: 'following' as ScreenId,
      label: 'Following',
      icon: UserCheck,
      badge: userProfile?.followingCount ? `${userProfile.followingCount}` : '6',
    },
    {
      id: 'wishlist' as ScreenId,
      label: 'Wishlist & Alerts',
      icon: Heart,
      badge: wishlistCount > 0 ? `${wishlistCount}` : undefined,
      badgeColor: 'bg-rose-500 text-white',
    },
    {
      id: 'my-orders' as ScreenId,
      label: 'My Purchases',
      icon: Truck,
      badge: userProfile?.ordersCount ? `${userProfile.ordersCount}` : '3',
    },
    {
      id: 'cart' as ScreenId,
      label: 'Shopping Cart',
      icon: ShoppingCart,
      badge: cartItemCount > 0 ? `${cartItemCount}` : undefined,
      badgeColor: 'bg-emerald-500 text-white font-extrabold shadow-sm animate-pulse',
    },
    {
      id: 'profile' as ScreenId,
      label: 'Shopper Profile',
      icon: User,
    },
  ];

  const renderSidebarBody = (isMobile: boolean = false) => (
    <div className="flex flex-col h-full overflow-hidden select-none bg-zinc-950 text-white">
      {/* Brand Header */}
      <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {/* DS Monogram Logo */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-teal-500 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-300 text-sm tracking-wider">
                DS
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-white tracking-tight text-base">StreamCart</h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-normal">Director Suite</p>
          </div>
        </div>

        {isMobile && onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Close Menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2-Sided Mode Switcher Segmented Control */}
      <div className="p-3 bg-zinc-900/40 border-b border-zinc-800/80 shrink-0">
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
          <span>Active Interface</span>
          <span className="text-[10px] text-teal-400 font-bold">
            {appMode === 'shopper' ? '🛍️ Buyer Mode' : '🎬 Creator Mode'}
          </span>
        </div>

        <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-950 border border-zinc-800/90 gap-1">
          <button
            onClick={() => handleModeChange('shopper')}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              appMode === 'shopper'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shopper</span>
          </button>

          <button
            onClick={() => handleModeChange('creator')}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              appMode === 'creator'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Creator</span>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
          <span>{appMode === 'shopper' ? 'Shopper Menu' : 'Creator Studio Menu'}</span>
          {appMode === 'shopper' && (
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
              6 ON AIR
            </span>
          )}
        </div>

        {(appMode === 'shopper' ? shopperNavItems : creatorNavItems).map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                isActive
                  ? item.isLiveHero
                    ? 'bg-gradient-to-r from-red-500/20 to-blue-500/20 text-white border border-red-500/30 shadow-md shadow-red-500/10 font-bold'
                    : appMode === 'shopper'
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 font-bold'
                    : 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                  : item.isLiveHero && broadcastStatus === 'LIVE'
                  ? 'text-red-300 hover:bg-red-500/10 hover:text-white'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'text-white'
                      : item.isLiveHero && broadcastStatus === 'LIVE'
                      ? 'text-red-400 animate-pulse'
                      : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    item.badgeColor
                      ? item.badgeColor
                      : item.badge === 'LIVE'
                      ? 'bg-red-500 text-white animate-pulse'
                      : isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Global Live Stream Stage Shortcut */}
        <div className="pt-3 mt-3 border-t border-zinc-800/80 space-y-1.5">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-3 mb-1">
            Featured Broadcast
          </div>

          <button
            onClick={() => handleNavClick('viewer')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentScreen === 'viewer'
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-red-600/30'
                : 'bg-zinc-900/80 hover:bg-zinc-900 text-zinc-200 hover:text-white border border-red-500/30 hover:border-red-500/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <div className="text-left min-w-0">
                <div className="text-xs font-black truncate">Live Stream Stage</div>
                <div className="text-[10px] font-normal text-zinc-400 truncate">Interactive chat, polls & drops</div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0 text-zinc-400" />
          </button>
        </div>
      </nav>

      {/* Hidden File Input for Avatar Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Profile & Mode Toggle Footer */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-900/30 shrink-0">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/80 border border-zinc-800/80 group">
          {/* Avatar with quick Upload trigger */}
          <div
            className="relative cursor-pointer group/avatar"
            onClick={() => fileInputRef.current?.click()}
            title="Click to upload profile photo"
          >
            <img
              src={profileAvatar}
              alt={profileName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/50 group-hover/avatar:ring-teal-400 transition-all"
            />
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-zinc-950" />
          </div>

          <div
            className="flex-1 min-w-0 cursor-pointer text-left"
            onClick={() => handleNavClick(appMode === 'shopper' ? 'profile' : 'settings')}
            title="View Account Profile"
          >
            <div className="flex items-center gap-1">
              <p className="text-xs font-bold text-white truncate">{profileName}</p>
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            </div>
            <p className="text-[11px] text-zinc-400 truncate">
              {profileHandle} • {appMode === 'shopper' ? 'VIP Shopper' : 'Broadcaster'}
            </p>
          </div>

          {onToggleTheme && (
            <button
              onClick={() => onToggleTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'General' : 'Dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-blue-400" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Persistent Sidebar: ONLY rendered on lg (1024px) and above */}
      <aside className="hidden lg:flex w-64 bg-zinc-950 border-r border-zinc-800/80 flex-col shrink-0 select-none z-30 h-full">
        {renderSidebarBody(false)}
      </aside>

      {/* 2. Mobile / Tablet Drawer: Rendered when isMobileOpen is true */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={onCloseMobile}
          />
          {/* Slide-over Drawer */}
          <div className="relative w-72 sm:w-80 max-w-[85vw] bg-zinc-950 border-r border-zinc-800 shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {renderSidebarBody(true)}
          </div>
        </div>
      )}
    </>
  );
};
