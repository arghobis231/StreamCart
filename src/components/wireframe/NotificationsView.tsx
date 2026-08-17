import React, { useState } from 'react';
import {
  ScreenId,
  NotificationItem,
} from '../../types';
import {
  Bell,
  CheckCheck,
  Filter,
  AlertTriangle,
  ShoppingCart,
  Zap,
  Activity,
  Calendar,
  Trash2,
  ArrowRight,
  Radio,
} from 'lucide-react';
import { WireframeBox, WireframeButton, WireframeBadge, WireframeCard } from './WireframeUI';

interface NotificationsViewProps {
  onNavigate: (screen: ScreenId) => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  onNavigate,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = notifications.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="w-4 h-4 text-emerald-700" />;
      case 'stock':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'milestone':
        return <Zap className="w-4 h-4 text-purple-600" />;
      case 'system':
        return <Activity className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-zinc-700" />;
    }
  };

  const getBadge = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <WireframeBadge variant="success">ORDER</WireframeBadge>;
      case 'stock':
        return <WireframeBadge variant="warning">INVENTORY</WireframeBadge>;
      case 'milestone':
        return <WireframeBadge variant="live">MILESTONE</WireframeBadge>;
      case 'system':
        return <WireframeBadge variant="default">SYSTEM</WireframeBadge>;
      default:
        return <WireframeBadge variant="outline">ALERT</WireframeBadge>;
    }
  };

  return (
    <div className="flex-1 bg-zinc-100 min-h-screen p-4 md:p-6 font-mono text-zinc-900 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-zinc-900" />
              <h1 className="text-xl font-black tracking-tight uppercase">Broadcast & Store Notifications</h1>
              <WireframeBadge variant="default">{notifications.length} Alerts</WireframeBadge>
            </div>
            <p className="text-xs text-zinc-600 mt-1">
              Real-time feed of live purchases, inventory warnings, audience milestones, and stream health.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <WireframeButton
              variant="outline"
              size="md"
              icon={<CheckCheck className="w-3.5 h-3.5" />}
              onClick={onMarkAllAsRead}
            >
              Mark All Read
            </WireframeButton>
            <WireframeButton
              variant="primary"
              size="md"
              icon={<Radio className="w-3.5 h-3.5" />}
              onClick={() => onNavigate('studio')}
            >
              Live Studio
            </WireframeButton>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-bold text-zinc-600 uppercase flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {['all', 'order', 'stock', 'milestone', 'system'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1 rounded text-xs font-bold uppercase transition-colors border ${
                filterType === f
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {f === 'all' ? 'All Alerts' : f}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <WireframeCard title="Notifications Feed" subtitle={`${filtered.length} notifications shown`}>
          <div className="divide-y divide-zinc-200">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`p-3 flex items-start justify-between gap-4 transition-colors ${
                  item.isRead ? 'bg-white' : 'bg-amber-50/50 font-medium'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full border border-zinc-300 bg-zinc-100 shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      {getBadge(item.type)}
                      <h4 className="font-bold text-xs text-zinc-900">{item.title}</h4>
                      <span className="text-[10px] text-zinc-500 font-mono">{item.timestamp}</span>
                    </div>

                    <p className="text-xs text-zinc-700 mt-1">{item.message}</p>

                    {item.actionLabel && item.actionScreen && (
                      <button
                        onClick={() => onNavigate(item.actionScreen as ScreenId)}
                        className="mt-2 text-[11px] font-bold text-zinc-900 underline flex items-center gap-1 hover:text-black"
                      >
                        <span>{item.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {!item.isRead && (
                    <button
                      onClick={() => onMarkAsRead(item.id)}
                      className="p-1 rounded text-zinc-500 hover:text-zinc-800 text-[10px] border border-zinc-300 bg-white"
                      title="Mark as read"
                    >
                      Read
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteNotification(item.id)}
                    className="p-1 rounded text-zinc-400 hover:text-red-600 border border-zinc-200 bg-white"
                    title="Delete notification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </WireframeCard>
      </div>
    </div>
  );
};
