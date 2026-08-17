import React from 'react';
import {
  LayoutDashboard,
  Radio,
  Package,
  Heart,
  ShoppingCart,
  Sliders,
  ShoppingBag,
  BarChart3,
  User,
  Compass,
} from 'lucide-react';
import { ScreenId, AppMode } from '../types';

interface MobileBottomNavProps {
  appMode: AppMode;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartItemCount?: number;
  wishlistCount?: number;
  unreadOrdersCount?: number;
  broadcastStatus?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  appMode,
  currentScreen,
  onNavigate,
  cartItemCount = 0,
  wishlistCount = 0,
  unreadOrdersCount = 0,
  broadcastStatus,
}) => {
  const shopperTabs = [
    {
      id: 'home' as ScreenId,
      label: 'Home',
      icon: LayoutDashboard,
    },
    {
      id: 'live-now' as ScreenId,
      label: 'Live',
      icon: Radio,
      badge: '6',
      badgeColor: 'bg-red-500 text-white',
    },
    {
      id: 'shopper-products' as ScreenId,
      label: 'Products',
      icon: Package,
    },
    {
      id: 'wishlist' as ScreenId,
      label: 'Wishlist',
      icon: Heart,
      badge: wishlistCount > 0 ? `${wishlistCount}` : undefined,
      badgeColor: 'bg-rose-500 text-white',
    },
    {
      id: 'cart' as ScreenId,
      label: 'Cart',
      icon: ShoppingCart,
      badge: cartItemCount > 0 ? `${cartItemCount}` : undefined,
      badgeColor: 'bg-emerald-500 text-white animate-pulse',
    },
  ];

  const creatorTabs = [
    {
      id: 'dashboard' as ScreenId,
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'studio' as ScreenId,
      label: 'Studio',
      icon: Sliders,
      badge: broadcastStatus === 'LIVE' ? 'LIVE' : undefined,
      badgeColor: 'bg-red-500 text-white animate-pulse',
    },
    {
      id: 'products' as ScreenId,
      label: 'Catalog',
      icon: Package,
    },
    {
      id: 'orders' as ScreenId,
      label: 'Orders',
      icon: ShoppingBag,
      badge: unreadOrdersCount > 0 ? `${unreadOrdersCount}` : undefined,
      badgeColor: 'bg-blue-500 text-white',
    },
    {
      id: 'analytics' as ScreenId,
      label: 'Analytics',
      icon: BarChart3,
    },
  ];

  const tabs = appMode === 'shopper' ? shopperTabs : creatorTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800/90 lg:hidden px-1 py-1 flex items-center justify-around select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all relative flex-1 cursor-pointer min-w-0 ${
              isActive
                ? appMode === 'shopper'
                  ? 'text-teal-400 font-bold'
                  : 'text-blue-400 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
              />
              {tab.badge && (
                <span
                  className={`absolute -top-1.5 -right-2 text-[9px] font-black px-1.5 py-0.2 rounded-full ring-2 ring-zinc-950 ${
                    tab.badgeColor || 'bg-zinc-700 text-white'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 truncate max-w-[58px]">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
