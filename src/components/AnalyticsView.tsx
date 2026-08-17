import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Eye,
  ArrowUpRight,
  Sparkles,
  Zap,
  BarChart3,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { ScreenId } from '../types';
import { ANALYTICS_DATA } from '../data/mockData';

interface AnalyticsViewProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('7D');
  const currentData = ANALYTICS_DATA[timeRange];

  // In-Stream Conversion Funnel Data
  const funnelData = [
    { stage: 'Stream Impressions', count: 48500, pct: '100%' },
    { stage: 'Live Viewers (CCV)', count: 24820, pct: '51.1%' },
    { stage: 'Product Spotlight Clicks', count: 8640, pct: '17.8%' },
    { stage: 'Cart Additions', count: 3290, pct: '6.7%' },
    { stage: 'Instant Purchases', count: 1240, pct: '2.5%' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 space-y-6 select-none">
      {/* Header & Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Commerce Analytics & Telemetry</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Deep dive into live Gross Merchandise Value (GMV), viewer retention curves, and drop conversion rates.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
          {(['7D', '30D', '90D'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {range === '7D' ? 'Last 7 Days' : range === '30D' ? 'Last 30 Days' : 'Last Quarter'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase">
            <span>Total Live GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">$48,920.00</div>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +24.8% vs previous period
          </span>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase">
            <span>Conversion Rate (CVR)</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">4.82%</div>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +1.2% higher than industry avg
          </span>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase">
            <span>Average Watch Duration</span>
            <Eye className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-white">18m 42s</div>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +4m 10s retention lift
          </span>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase">
            <span>Avg Order Value (AOV)</span>
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">$156.10</div>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.6% bundle expansion
          </span>
        </div>
      </div>

      {/* Main Charts: GMV Area & Viewers vs Orders Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GMV Growth Trajectory */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Revenue (GMV) Growth</h3>
            <p className="text-xs text-zinc-400">Total dollar sales transacted during livestream broadcasts</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#3f3f46',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Live GMV']}
                />
                <Area type="monotone" dataKey="gmv" stroke="#10b981" strokeWidth={2.5} fill="url(#colorGmv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Viewers & Orders Correlation */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Viewers vs Orders Correlation</h3>
            <p className="text-xs text-zinc-400">Comparing live concurrent attendance against completed sales</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#3f3f46',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="orders" name="Orders Placed" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="viewers" name="Viewers (CCV)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* In-Stream Conversion Funnel */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white">Live Stream Shopper Conversion Funnel</h3>
          <p className="text-xs text-zinc-400">Step-by-step drop-off from impression to instant checkout</p>
        </div>

        <div className="space-y-3 pt-2">
          {funnelData.map((item, index) => {
            const widthPct = Math.max(12, Math.round((item.count / 48500) * 100));
            return (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{item.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-zinc-300">{item.count.toLocaleString()} Users</span>
                    <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
                      {item.pct}
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-zinc-950 overflow-hidden border border-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
