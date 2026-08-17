import React from 'react';
import {
  ScreenId,
  ProductItem,
  LiveOrder,
  ScheduledLivestream,
} from '../../types';
import {
  LayoutDashboard,
  Calendar,
  Package,
  ShoppingCart,
  BarChart2,
  Users,
  Settings,
  Plus,
  Play,
  ArrowUpRight,
  TrendingUp,
  Radio,
  Clock,
  Eye,
  DollarSign,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { WireframeBox, WireframeButton, WireframeBadge, WireframeCard } from './WireframeUI';

interface CreatorDashboardViewProps {
  onNavigate: (screen: ScreenId) => void;
  products?: ProductItem[];
  orders?: LiveOrder[];
  recentOrders?: LiveOrder[];
  scheduledStreams?: ScheduledLivestream[];
  stats?: any;
  unreadNotificationsCount?: number;
  onStartLivestream?: () => void;
  onOpenNotifications?: () => void;
}

export const CreatorDashboardView: React.FC<CreatorDashboardViewProps> = ({
  onNavigate,
  products = [],
  orders,
  recentOrders,
  scheduledStreams = [],
  stats,
  unreadNotificationsCount,
  onStartLivestream,
  onOpenNotifications,
}) => {
  const displayOrders = orders || recentOrders || [];
  const upcomingStreams = (scheduledStreams || []).filter((s) => s.status === 'Upcoming' || s.status === 'Live');
  const pastStreams = (scheduledStreams || []).filter((s) => s.status === 'Completed');

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-zinc-100 min-h-screen text-zinc-900 font-mono">
      {/* Left Sidebar Navigation */}
      <aside className="w-full md:w-60 bg-white border-r-2 border-zinc-800 p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Platform Identity */}
          <div className="flex items-center gap-2.5 pb-4 border-b-2 border-zinc-300">
            <div className="w-8 h-8 rounded border-2 border-zinc-900 bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">
              DS
            </div>
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-zinc-900">DIRECTOR SUITE</div>
              <div className="text-[10px] text-zinc-500">Creator Desk v4.0</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded font-bold bg-zinc-900 text-white border-2 border-zinc-900 text-left"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => onNavigate('schedule')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-zinc-700 hover:bg-zinc-100 border border-transparent text-left"
            >
              <Calendar className="w-4 h-4" />
              <span>Livestreams</span>
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-zinc-700 hover:bg-zinc-100 border border-transparent text-left"
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </button>
            <button
              onClick={() => onNavigate('studio')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-red-700 font-bold bg-red-50 border border-red-200 hover:bg-red-100 text-left"
            >
              <Radio className="w-4 h-4 text-red-600 animate-pulse" />
              <span>Live Studio (Hero)</span>
            </button>
            <button
              onClick={() => onNavigate('checkout')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-zinc-700 hover:bg-zinc-100 border border-transparent text-left"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Orders ({displayOrders.length})</span>
            </button>
            <button
              onClick={() => onNavigate('analytics')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-zinc-700 hover:bg-zinc-100 border border-transparent text-left"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => onNavigate('viewer')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-zinc-700 hover:bg-zinc-100 border border-transparent text-left"
            >
              <Users className="w-4 h-4" />
              <span>Audience View</span>
            </button>
            <button
              onClick={() => onNavigate('notifications')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-zinc-700 hover:bg-zinc-100 border border-transparent text-left"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Creator Profile Box */}
        <div className="pt-4 border-t-2 border-zinc-200 mt-6">
          <div className="flex items-center gap-2.5 bg-zinc-100 p-2.5 rounded border border-zinc-300">
            <div className="w-8 h-8 rounded-full border-2 border-zinc-800 bg-zinc-300 flex items-center justify-center font-bold text-xs text-zinc-800">
              SC
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold truncate">Sarah Connor</div>
              <div className="text-[10px] text-zinc-500">Studio Pro Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 max-w-7xl">
        {/* Welcome Bar with Primary Action */}
        <div className="bg-white border-2 border-zinc-800 rounded-md p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900">
                Welcome back, Sarah Connor
              </h1>
              <WireframeBadge variant="success">Studio 4B Online</WireframeBadge>
            </div>
            <p className="text-xs text-zinc-600 mt-1">
              You have 1 live shopping broadcast ready to air today with 4 featured drops queued.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <WireframeButton
              variant="outline"
              size="md"
              icon={<Calendar className="w-3.5 h-3.5" />}
              onClick={() => onNavigate('schedule')}
            >
              Schedule Stream
            </WireframeButton>

            <WireframeButton
              variant="primary"
              size="lg"
              icon={<Play className="w-4 h-4 fill-current" />}
              onClick={onStartLivestream || (() => onNavigate('studio'))}
            >
              START LIVESTREAM (HERO)
            </WireframeButton>
          </div>
        </div>

        {/* Key Metrics Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1: Total Revenue */}
          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Revenue</span>
              <DollarSign className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="my-2">
              <div className="text-2xl font-black text-zinc-900">$48,920.00</div>
              <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+24.8% vs last month</span>
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-200 text-[10px] text-zinc-500">
              Avg GMV per stream: $12,230
            </div>
          </div>

          {/* Metric 2: Total Orders */}
          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
              <ShoppingCart className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="my-2">
              <div className="text-2xl font-black text-zinc-900">1,240</div>
              <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+18.2% conversion uplift</span>
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-200 text-[10px] text-zinc-500">
              Average basket size: $39.45
            </div>
          </div>

          {/* Metric 3: Total Viewers */}
          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Viewers</span>
              <Eye className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="my-2">
              <div className="text-2xl font-black text-zinc-900">84.5K</div>
              <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+12.4K peak concurrent</span>
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-200 text-[10px] text-zinc-500">
              Avg watch duration: 16m 40s
            </div>
          </div>

          {/* Metric 4: Engagement */}
          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Avg Engagement</span>
              <BarChart2 className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="my-2">
              <div className="text-2xl font-black text-zinc-900">14.2%</div>
              <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>Chat & Cart Interactions</span>
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-200 text-[10px] text-zinc-500">
              4.8% stream-to-checkout CVR
            </div>
          </div>
        </div>

        {/* Two-Column Middle Section: Upcoming Streams & Revenue Trend Wireframe Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Livestreams Card (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <WireframeCard
              title="Upcoming & Live Broadcasts"
              subtitle="Scheduled shopping sessions and real-time studio links"
              headerAction={
                <WireframeButton
                  size="sm"
                  variant="outline"
                  icon={<Plus className="w-3 h-3" />}
                  onClick={() => onNavigate('schedule')}
                >
                  New Stream
                </WireframeButton>
              }
            >
              <div className="space-y-3">
                {upcomingStreams.map((stream) => (
                  <div
                    key={stream.id}
                    className="border-2 border-zinc-300 rounded p-3 bg-zinc-50 hover:bg-white transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <WireframeBox
                        label="[ Video THUMB ]"
                        className="w-16 h-12 shrink-0 rounded"
                        showDiagonalCross={true}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-zinc-900">{stream.title}</span>
                          {stream.status === 'Live' ? (
                            <WireframeBadge variant="live">LIVE NOW</WireframeBadge>
                          ) : (
                            <WireframeBadge variant="outline">{stream.status}</WireframeBadge>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-1 flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {stream.date} • {stream.time}
                          </span>
                          <span>•</span>
                          <span>{stream.productIds.length} Products Queued</span>
                          <span>•</span>
                          <span className="text-zinc-700 font-bold">{stream.discountValue} Promo</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {stream.status === 'Live' ? (
                        <WireframeButton
                          size="sm"
                          variant="danger"
                          icon={<Radio className="w-3 h-3" />}
                          onClick={() => onNavigate('studio')}
                        >
                          Enter Studio (Hero)
                        </WireframeButton>
                      ) : (
                        <WireframeButton
                          size="sm"
                          variant="primary"
                          icon={<Play className="w-3 h-3" />}
                          onClick={() => onNavigate('studio')}
                        >
                          Launch Stream
                        </WireframeButton>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </WireframeCard>

            {/* Recent Livestreams History Table */}
            <WireframeCard title="Recent Livestreams" subtitle="Performance overview of past shopping sessions">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-zinc-800 bg-zinc-100 text-zinc-700">
                      <th className="py-2 px-3 font-bold">Stream Title</th>
                      <th className="py-2 px-3 font-bold">Date</th>
                      <th className="py-2 px-3 font-bold">Total Viewers</th>
                      <th className="py-2 px-3 font-bold">Orders</th>
                      <th className="py-2 px-3 font-bold">Revenue</th>
                      <th className="py-2 px-3 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {pastStreams.map((s) => (
                      <tr key={s.id} className="hover:bg-zinc-50">
                        <td className="py-2.5 px-3 font-bold text-zinc-900">{s.title}</td>
                        <td className="py-2.5 px-3 text-zinc-500">{s.date}</td>
                        <td className="py-2.5 px-3 font-bold">6,840</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-bold">142 orders</td>
                        <td className="py-2.5 px-3 font-black text-zinc-900">$14,280.00</td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => onNavigate('summary')}
                            className="text-zinc-900 underline font-bold hover:text-zinc-700"
                          >
                            View Summary
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="hover:bg-zinc-50">
                      <td className="py-2.5 px-3 font-bold text-zinc-900">Summer Beauty Glow-Up Live Sale</td>
                      <td className="py-2.5 px-3 text-zinc-500">2026-08-04</td>
                      <td className="py-2.5 px-3 font-bold">12,100</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-bold">284 orders</td>
                      <td className="py-2.5 px-3 font-black text-zinc-900">$22,410.00</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => onNavigate('summary')}
                          className="text-zinc-900 underline font-bold hover:text-zinc-700"
                        >
                          View Summary
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </WireframeCard>
          </div>

          {/* Right Column: Top Performing Products & Wireframe Charts */}
          <div className="space-y-4">
            {/* Top Performing Products Card */}
            <WireframeCard title="Top-Performing Products" subtitle="Highest live sales conversion">
              <div className="space-y-3">
                {products.slice(0, 4).map((p, idx) => (
                  <div key={p.id} className="flex items-center justify-between gap-2 p-2 rounded border border-zinc-200 hover:bg-zinc-50">
                    <div className="flex items-center gap-2.5">
                      <div className="font-bold text-xs text-zinc-500 w-4">#{idx + 1}</div>
                      <WireframeBox label="[ X ]" className="w-10 h-10 rounded shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-zinc-900 truncate max-w-[140px]">{p.title}</div>
                        <div className="text-[10px] text-zinc-500">${p.salePrice} • {p.soldCount} units sold</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-emerald-700">${(p.salePrice * p.soldCount).toLocaleString()}</div>
                      <div className="text-[10px] text-zinc-500">Stock: {p.stock}</div>
                    </div>
                  </div>
                ))}
              </div>
            </WireframeCard>

            {/* Low-Fi Wireframe Chart Box: Weekly Sales & Engagement */}
            <WireframeCard title="Weekly Live GMV Trend" subtitle="Low-Fidelity Wireframe Line Chart">
              <div className="space-y-2">
                <WireframeBox
                  label="[ WIREFRAME CHART: GMV $ vs TIME ]"
                  sublabel="Daily Revenue: Mon $8.2k | Wed $14.1k | Fri $22.5k"
                  className="h-32 rounded"
                >
                  <div className="flex items-end justify-between gap-1 h-14 w-full px-2 pt-2">
                    <div className="w-full bg-zinc-300 border border-zinc-500 h-[40%]" title="Mon" />
                    <div className="w-full bg-zinc-300 border border-zinc-500 h-[60%]" title="Tue" />
                    <div className="w-full bg-zinc-300 border border-zinc-500 h-[35%]" title="Wed" />
                    <div className="w-full bg-zinc-400 border border-zinc-600 h-[85%]" title="Thu" />
                    <div className="w-full bg-zinc-900 border border-zinc-900 h-[100%]" title="Fri (Live)" />
                    <div className="w-full bg-zinc-300 border border-zinc-500 h-[50%]" title="Sat" />
                    <div className="w-full bg-zinc-300 border border-zinc-500 h-[45%]" title="Sun" />
                  </div>
                </WireframeBox>
                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                  <span>Mon (8k)</span>
                  <span className="font-bold text-zinc-800">Peak: Friday Live ($22.5k)</span>
                  <span>Sun (9k)</span>
                </div>
              </div>
            </WireframeCard>
          </div>
        </div>

        {/* Recent Orders Live Table */}
        <WireframeCard
          title="Recent In-Stream Orders"
          subtitle="Real-time live purchases generated during stream broadcasts"
          headerAction={
            <WireframeButton size="sm" variant="outline" onClick={() => onNavigate('checkout')}>
              View All Orders
            </WireframeButton>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-800 bg-zinc-100 text-zinc-700">
                  <th className="py-2 px-3 font-bold">Order ID</th>
                  <th className="py-2 px-3 font-bold">Customer</th>
                  <th className="py-2 px-3 font-bold">Product Item</th>
                  <th className="py-2 px-3 font-bold">Amount</th>
                  <th className="py-2 px-3 font-bold">Status</th>
                  <th className="py-2 px-3 font-bold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {displayOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-50">
                    <td className="py-2 px-3 font-mono font-bold text-zinc-900">{o.orderNumber}</td>
                    <td className="py-2 px-3 text-zinc-800">{o.customerName}</td>
                    <td className="py-2 px-3 text-zinc-700 font-medium truncate max-w-xs">{o.productTitle}</td>
                    <td className="py-2 px-3 font-black text-emerald-700">${o.amount.toFixed(2)}</td>
                    <td className="py-2 px-3">
                      <WireframeBadge variant="success">{o.status}</WireframeBadge>
                    </td>
                    <td className="py-2 px-3 text-right text-zinc-500 font-mono">{o.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WireframeCard>
      </main>
    </div>
  );
};
