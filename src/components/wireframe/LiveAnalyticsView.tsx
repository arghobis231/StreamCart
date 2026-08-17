import React, { useState } from 'react';
import {
  ScreenId,
  StreamStats,
  ProductItem,
} from '../../types';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Clock,
  Radio,
  Flame,
  ArrowUpRight,
  Eye,
  BarChart3,
  PieChart,
  Calendar,
  Share2,
  Download,
  Filter,
} from 'lucide-react';
import { WireframeBox, WireframeButton, WireframeBadge, WireframeCard } from './WireframeUI';

interface LiveAnalyticsViewProps {
  onNavigate: (screen: ScreenId) => void;
  stats: StreamStats;
  products: ProductItem[];
}

export const LiveAnalyticsView: React.FC<LiveAnalyticsViewProps> = ({
  onNavigate,
  stats,
  products,
}) => {
  const [timeframe, setTimeframe] = useState('live');

  return (
    <div className="flex-1 bg-zinc-100 min-h-screen p-4 md:p-6 font-mono text-zinc-900 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-zinc-900" />
              <h1 className="text-xl font-black tracking-tight uppercase">Live Stream Telemetry & Analytics</h1>
              <WireframeBadge variant="live">REAL-TIME TELEMETRY</WireframeBadge>
            </div>
            <p className="text-xs text-zinc-600 mt-1">
              Live broadcast sales velocity, viewer retention curves, conversion funnel, and inventory depletion.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <WireframeButton
              variant="outline"
              size="md"
              icon={<Download className="w-3.5 h-3.5" />}
              onClick={() => {}}
            >
              Export CSV
            </WireframeButton>

            <WireframeButton
              variant="primary"
              size="md"
              icon={<Radio className="w-3.5 h-3.5 text-red-500" />}
              onClick={() => onNavigate('studio')}
            >
              Return to Studio
            </WireframeButton>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs text-zinc-600 font-bold uppercase">
              <span>Gross Sales (GMV)</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-zinc-900 font-mono">${stats.gmv.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+34% vs last stream</span>
            </div>
          </div>

          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs text-zinc-600 font-bold uppercase">
              <span>Orders Placed</span>
              <ShoppingCart className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="text-2xl font-black text-zinc-900 font-mono">{stats.totalOrders}</div>
            <div className="text-[11px] text-zinc-600">
              Avg order value: <span className="font-bold font-mono">${stats.aov.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs text-zinc-600 font-bold uppercase">
              <span>Current Viewers</span>
              <Users className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl font-black text-zinc-900 font-mono">{stats.ccv.toLocaleString()}</div>
            <div className="text-[11px] text-zinc-600">
              Peak: <span className="font-bold text-zinc-900 font-mono">{stats.peakCcv.toLocaleString()}</span> (at 00:32:10)
            </div>
          </div>

          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs text-zinc-600 font-bold uppercase">
              <span>Conversion (CVR)</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-zinc-900 font-mono">{stats.cvr}%</div>
            <div className="text-[11px] text-zinc-600">
              Avg watch duration: <span className="font-bold text-zinc-900">8m 42s</span>
            </div>
          </div>
        </div>

        {/* Real-time Wireframe Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Viewer Concurrent Curve */}
          <WireframeCard
            title="Concurrent Viewers Over Stream Timeline (CCV)"
            subtitle="Real-time viewer retention and entry spikes during product drops"
          >
            <div className="h-56 bg-zinc-50 border border-zinc-300 rounded p-3 flex flex-col justify-between">
              {/* Wireframe Area Chart Visualizer */}
              <div className="relative flex-1 w-full flex items-end justify-between gap-1.5 pt-4">
                {[
                  { time: '00:00', val: 40, height: '25%' },
                  { time: '00:05', val: 95, height: '45%' },
                  { time: '00:10', val: 180, height: '60%' },
                  { time: '00:15', val: 240, height: '70%' },
                  { time: '00:20', val: 310, height: '82%' },
                  { time: '00:25', val: 290, height: '78%' },
                  { time: '00:30', val: 418, height: '98%', highlight: true },
                  { time: '00:35', val: 380, height: '88%' },
                  { time: '00:40', val: 342, height: '80%' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <div
                      className={`w-full rounded-t transition-all ${
                        bar.highlight ? 'bg-red-600 border border-red-700' : 'bg-zinc-800 hover:bg-zinc-700'
                      }`}
                      style={{ height: bar.height }}
                    />
                    <span className="text-[9px] text-zinc-500 font-mono">{bar.time}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-zinc-300 flex items-center justify-between text-[10px] text-zinc-600">
                <span>🔴 Red marker indicates Product Drop 2 (Peak 4,180 CCV)</span>
                <span>Interval: 5m</span>
              </div>
            </div>
          </WireframeCard>

          {/* Chart 2: Revenue / Orders Velocity */}
          <WireframeCard
            title="Sales Velocity ($ GMV per 5-Minute Window)"
            subtitle="Order spikes correlated with host product spotlights and flash coupons"
          >
            <div className="h-56 bg-zinc-50 border border-zinc-300 rounded p-3 flex flex-col justify-between">
              <div className="relative flex-1 w-full flex items-end justify-between gap-2 pt-4">
                {[
                  { label: '0m', amount: '$240', h: '20%' },
                  { label: '10m', amount: '$680', h: '40%' },
                  { label: '20m', amount: '$1,450', h: '75%' },
                  { label: '30m', amount: '$2,120', h: '95%', isPeak: true },
                  { label: '40m', amount: '$1,350', h: '70%' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-bold font-mono text-zinc-800">{bar.amount}</span>
                    <div
                      className={`w-full rounded-t ${
                        bar.isPeak ? 'bg-emerald-600' : 'bg-zinc-700'
                      }`}
                      style={{ height: bar.h }}
                    />
                    <span className="text-[10px] text-zinc-500">{bar.label}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-zinc-300 flex items-center justify-between text-[10px] text-zinc-600">
                <span>🟢 Highest revenue interval: $2,120 in 5 mins</span>
                <span>Cumulative: ${stats.gmv.toLocaleString()}</span>
              </div>
            </div>
          </WireframeCard>
        </div>

        {/* Product Performance Table in Livestream */}
        <WireframeCard
          title="Product Sales Breakdown & Inventory Depletion"
          subtitle="Real-time performance ranking of items featured in current stream"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-800 bg-zinc-100 text-zinc-700 font-bold">
                  <th className="py-2.5 px-3">Product Name & SKU</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Units Sold</th>
                  <th className="py-2.5 px-3">Gross Revenue</th>
                  <th className="py-2.5 px-3">Stock Remaining</th>
                  <th className="py-2.5 px-3">Conversion (CVR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {products.map((p) => {
                  const gmvProd = p.soldCount * p.salePrice;
                  return (
                    <tr key={p.id} className="hover:bg-zinc-50">
                      <td className="py-3 px-3">
                        <div className="font-bold text-zinc-900">{p.title}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">SKU: {p.sku}</div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold">${p.salePrice}</td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-800">{p.soldCount} units</td>
                      <td className="py-3 px-3 font-mono font-black text-zinc-900">${gmvProd.toLocaleString()}</td>
                      <td className="py-3 px-3">
                        <div className="font-mono">{p.stock} left</div>
                        <div className="w-24 h-1.5 bg-zinc-200 rounded mt-1 overflow-hidden">
                          <div
                            className="bg-zinc-800 h-full"
                            style={{ width: `${(p.stock / p.initialStock) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-zinc-800">
                        {((p.soldCount / (stats.totalOrders || 1)) * 10).toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </WireframeCard>
      </div>
    </div>
  );
};
