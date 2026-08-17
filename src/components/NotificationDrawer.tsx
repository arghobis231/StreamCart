import React from 'react';
import {
  X,
  Bell,
  ShoppingBag,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Trash2,
  Check,
} from 'lucide-react';
import { StudioNotification } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: StudioNotification[];
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearNotifications,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: StudioNotification['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case 'stock_alert':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'milestone':
        return <Flame className="w-4 h-4 text-pink-400" />;
      case 'system':
        return <Bell className="w-4 h-4 text-indigo-400" />;
      default:
        return <Bell className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Broadcast Alerts & Telemetry</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onMarkAllAsRead}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs"
                title="Mark all as read"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClearNotifications}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs"
                title="Clear all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-xs">
                No active notifications.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                    notif.isRead
                      ? 'bg-zinc-950/50 border-zinc-800/60 opacity-70'
                      : 'bg-zinc-950 border-zinc-800 shadow-sm'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <h4 className="font-bold text-white truncate">{notif.title}</h4>
                      <span className="text-[10px] text-zinc-500 shrink-0 ml-2">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{notif.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
