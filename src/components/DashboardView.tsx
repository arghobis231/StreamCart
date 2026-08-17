import React, { useState } from 'react';
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Radio,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Eye,
  Clock,
  Tag,
  ChevronRight,
  Play,
  Sliders,
  Flame,
  CheckCircle2,
  Package,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ScreenId, ScheduledLivestream, ProductItem, LiveOrder, StreamStats } from '../types';
import { ANALYTICS_DATA } from '../data/mockData';

interface DashboardViewProps {
  onNavigate: (screen: ScreenId) => void;
  stats: StreamStats;
  scheduledStreams: ScheduledLivestream[];
  products: ProductItem[];
  recentOrders: LiveOrder[];
  onSelectStreamToLaunch?: (stream: ScheduledLivestream) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  stats,
  scheduledStreams,
  products,
  recentOrders,
  onSelectStreamToLaunch,
}) => {
  const [chartRange, setChartRange] = useState<'7D' | '30D' | '90D'>('7D');
  const chartData = ANALYTICS_DATA[chartRange];

  // Top products sorted by sold count
  const topProducts = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 5);

  const kpis = [
    {
      label: 'Total Revenue',
      value: `${(48920 + ((stats?.gmv ?? 0) - 6556)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      trend: '+24.8%',
      isPositive: true,
      comparison: 'vs last month',
      submetric: '$156.10 AOV avg',
      icon: DollarSign,
      color: 'from-emerald-500/20 to-emerald-500/5',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Total Orders',
      value: (1240 + (stats?.totalOrders ?? 0) - 42).toLocaleString(),
      trend: '+18.2%',
      isPositive: true,
      comparison: 'vs last month',
      submetric: '4.8% CVR conversion',
      icon: ShoppingBag,
      color: 'from-blue-500/20 to-blue-500/5',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Total Viewers',
      value: '84.5K',
      trend: '+31.4%',
      isPositive: true,
      comparison: 'vs last month',
      submetric: '3,840 peak CCV today',
      icon: Users,
      color: 'from-teal-500/20 to-teal-500/5',
      borderColor: 'border-teal-500/30',
      iconColor: 'text-teal-400',
    },
    {
      label: 'Average Engagement',
      value: '14.2%',
      trend: '+4.1%',
      isPositive: true,
      comparison: 'vs last month',
      submetric: '18 comments/min',
      icon: TrendingUp,
      color: 'from-cyan-500/20 to-cyan-500/5',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 space-y-6 select-none">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-blue-950/60 via-teal-950/40 to-zinc-900 border border-blue-500/20 p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Live Commerce Command Center</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, Sarah
            </h1>
            <p className="text-sm text-zinc-300">
              You have <span className="font-semibold text-emerald-400">1 live shopping broadcast</span> ready to go today with 5 featured product drops queued.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('studio')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white text-sm font-bold shadow-xl shadow-blue-600/25 transition-all active:scale-95 cursor-pointer"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Start Livestream</span>
            </button>

            <button
              onClick={() => onNavigate('livestreams')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-white text-sm font-semibold transition-all active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>Schedule Stream</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`rounded-xl bg-gradient-to-b ${kpi.color} bg-zinc-900/90 border ${kpi.borderColor} p-5 space-y-3 transition-all hover:border-zinc-700 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {kpi.label}
                </span>
                <div className={`p-2 rounded-lg bg-zinc-950/60 border border-zinc-800 ${kpi.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-white tracking-tight">{kpi.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center text-xs font-bold text-emerald-400">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {kpi.trend}
                  </span>
                  <span className="text-[11px] text-zinc-400">{kpi.comparison}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                <span>Telemetry:</span>
                <span className="text-zinc-300 font-semibold">{kpi.submetric}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Revenue / GMV Chart & Live Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">Revenue & GMV Trajectory</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live Synced
                </span>
              </div>
              <p className="text-xs text-zinc-400">Gross Merchandise Value generated during live shopping broadcasts</p>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              {(['7D', '30D', '90D'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setChartRange(tab)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    chartRange === tab
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tab === '7D' ? '7 Days' : tab === '30D' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="gmvGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#71717a"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#3f3f46',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                  }}
                  formatter={(value: any) => [`${Number(value).toLocaleString()}`, 'Live GMV']}
                />
                <Area
                  type="monotone"
                  dataKey="gmv"
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#gmvGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Orders & Activity Feed */}
        <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">Recent Live Orders</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-72">
            {recentOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{order.customerName}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{order.productTitle}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-black text-emerald-400">
                    +${order.amount.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-zinc-400">{order.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Livestreams Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Upcoming Livestreams</h3>
            <p className="text-xs text-zinc-400">Manage and launch your scheduled interactive shopping broadcasts</p>
          </div>
          <button
            onClick={() => onNavigate('livestreams')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            <span>All Broadcasts ({scheduledStreams.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {scheduledStreams.slice(0, 3).map((stream) => {
            const isLive = stream.status === 'Live';
            return (
              <div
                key={stream.id}
                className={`rounded-2xl overflow-hidden bg-zinc-900 border transition-all hover:shadow-xl ${
                  isLive
                    ? 'border-red-500/40 ring-1 ring-red-500/30'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="relative h-44 w-full bg-zinc-950 overflow-hidden group">
                  <img
                    src={
                      stream.thumbnailPlaceholder ||
                      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
                    }
                    alt={stream.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* Badges on Thumbnail */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-lg shadow-red-600/40 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-white" />
                        LIVE NOW
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-900/90 text-zinc-300 border border-zinc-700 backdrop-blur-md">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        {stream.time}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-black/60 text-zinc-300 backdrop-blur-sm">
                      {stream.category}
                    </span>
                  </div>

                  {isLive && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{(stats?.ccv ?? 0).toLocaleString()} viewers</span>
                    </div>
                  )}

                  {/* Promo Badge */}
                  {stream.promoCode && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-600/90 text-white text-[11px] font-bold backdrop-blur-md">
                      <Tag className="w-3 h-3" />
                      <span>Code: {stream.promoCode} ({stream.discountValue})</span>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-blue-400 transition-colors">
                      {stream.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                      {stream.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                    <span className="flex items-center gap-1">
                      <Package className="w-3.5 h-3.5 text-zinc-500" />
                      <strong className="text-zinc-300">{stream.productIds.length}</strong> Drops Queued
                    </span>
                    <span className="text-zinc-400 font-mono text-[11px]">{stream.date}</span>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onNavigate('studio')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isLive
                          ? 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isLive ? 'Enter Live Studio' : 'Launch Studio'}</span>
                    </button>

                    <button
                      onClick={() => onNavigate('livestreams')}
                      className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Manage Show</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Performing Products Showcase */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Top Performing Products</h3>
            <p className="text-xs text-zinc-400">Best-selling drop items ranked by in-stream GMV and conversion</p>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            <span>Catalogue Manager ({products.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {topProducts.map((product) => {
            const revenue = product.soldCount * product.salePrice;
            const stockPct = Math.round((product.stock / product.initialStock) * 100);
            return (
              <div
                key={product.id}
                className="rounded-xl bg-zinc-900/90 border border-zinc-800/80 p-3.5 flex flex-col justify-between hover:border-zinc-700 transition-all group"
              >
                <div>
                  <div className="relative h-36 w-full rounded-lg overflow-hidden bg-zinc-950 mb-3">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-white text-xs line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {product.title}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-extrabold text-white">${product.salePrice}</span>
                    <span className="text-xs text-zinc-400 line-through">${product.originalPrice}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">Total Sold:</span>
                    <span className="font-bold text-white">{product.soldCount} units</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">GMV Revenue:</span>
                    <span className="font-bold text-emerald-400">${revenue.toLocaleString()}</span>
                  </div>
                  {/* Stock Bar */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                      <span>Stock Remaining:</span>
                      <span className={product.stock <= 10 ? 'text-amber-400 font-bold' : 'text-zinc-300'}>
                        {product.stock} / {product.initialStock}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          stockPct < 20 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${stockPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
