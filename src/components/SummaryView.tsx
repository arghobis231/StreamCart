import React from 'react';
import {
  CheckCircle2,
  DollarSign,
  ShoppingBag,
  Eye,
  Clock,
  Download,
  Share2,
  Play,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Tag,
  ArrowRight,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { ScreenId, StreamStats, ProductItem, LiveOrder } from '../types';

interface SummaryViewProps {
  stats: StreamStats;
  products: ProductItem[];
  orders: LiveOrder[];
  onNavigate: (screen: ScreenId) => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  stats,
  products,
  orders,
  onNavigate,
}) => {
  const finalGmv = orders.reduce((sum, o) => sum + o.amount, 0);
  const topSellers = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 space-y-6 select-none max-w-5xl mx-auto">
      {/* Broadcast Finished Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950/60 via-indigo-950/40 to-zinc-900 border border-emerald-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black">
              <CheckCircle2 className="w-4 h-4" />
              <span>BROADCAST COMPLETED SUCCESSFULLY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Tech Friday: Unboxing 4K Drones & Pro Studio Gear
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300">
              Broadcast concluded at 21:34 EST • Total stream duration: <strong className="text-white font-mono">02:34:18</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all"
            >
              <span>Creator Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Final Recap KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase">
            <span>Total Broadcast GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            ${finalGmv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-zinc-400 font-semibold">+32% higher than target</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase">
            <span>Total Orders Placed</span>
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{orders.length} Units</div>
          <span className="text-xs text-emerald-400 font-semibold">4.8% Live Conversion Rate</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase">
            <span>Peak Concurrent Viewers</span>
            <Eye className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{(stats?.ccv ?? 0).toLocaleString()}</div>
          <span className="text-xs text-zinc-400">Average Watch: 24m 18s</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase">
            <span>Audience Reactions</span>
            <Flame className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">14.8K</div>
          <span className="text-xs text-pink-400 font-semibold">❤️ 🔥 👏 in-stream barrage</span>
        </div>
      </div>

      {/* VOD Player Preview & Top Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* VOD Player */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Broadcast Video Recording (VOD)</h3>
              <p className="text-xs text-zinc-400">Full 1080p60 replay archived and ready for auto-publishing</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              6.2 GB • MP4
            </span>
          </div>

          <div className="relative h-60 rounded-xl overflow-hidden bg-black group flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&auto=format&fit=crop&q=80"
              alt="VOD Replay"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md">
              <span>00:00:00 / 02:34:18</span>
              <span className="text-indigo-400 font-semibold">4 Shoppable Chapters Indexed</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => alert('Downloading full 1080p VOD recording archive...')}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Master VOD</span>
            </button>
            <button
              onClick={() => onNavigate('analytics')}
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white"
            >
              <span>View In Analytics</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Drop Items In Show */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Best-Selling Show Drops</h3>
            <p className="text-xs text-zinc-400">Ranked by units sold during this broadcast</p>
          </div>

          <div className="space-y-3">
            {topSellers.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between gap-3"
              >
                <img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-lg object-cover bg-zinc-900" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  <span className="text-[11px] text-emerald-400 font-bold font-mono">${item.salePrice}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-white">{item.soldCount} sold</div>
                  <div className="text-[10px] text-zinc-500">
                    ${(item.soldCount * item.salePrice).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('orders')}
            className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors text-center"
          >
            Review All {orders.length} Orders
          </button>
        </div>
      </div>
    </div>
  );
};
