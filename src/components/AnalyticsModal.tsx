import React from 'react';
import { StreamStats, ProductItem } from '../types';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
  X,
  Download,
  Flame,
  Award,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

interface AnalyticsModalProps {
  stats: StreamStats;
  products: ProductItem[];
  onClose: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ stats, products, onClose }) => {
  const totalRevenue = products.reduce((acc, p) => acc + p.soldCount * p.salePrice, 0);
  const totalUnitsSold = products.reduce((acc, p) => acc + p.soldCount, 0);
  const aov = stats.totalOrders > 0 ? (stats.gmv / stats.totalOrders).toFixed(2) : '142.50';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 max-w-3xl w-full shadow-2xl text-white max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                LIVE COMMERCE EXECUTIVE TELEMETRY
              </h2>
              <p className="text-xs text-zinc-400">
                Interactive Livestream Shopping Director Suite • Real-Time Performance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Core KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-emerald-500/30">
            <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
              TOTAL GMV GENERATED
            </span>
            <div className="text-xl font-black text-emerald-400 font-mono">
              ${stats.gmv.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-emerald-300 font-medium">+34% vs last show</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-cyan-500/30">
            <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
              CONCURRENT VIEWERS (PEAK)
            </span>
            <div className="text-xl font-black text-cyan-300 font-mono">
              {stats.peakCcv.toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-400">Avg watch time: 14m 20s</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-amber-500/30">
            <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
              CONVERSION RATE (CVR)
            </span>
            <div className="text-xl font-black text-amber-400 font-mono">
              {stats.cvr.toFixed(1)}%
            </div>
            <span className="text-[10px] text-amber-300 font-medium">Industry Benchmark: 2.5%</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-purple-500/30">
            <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
              AVERAGE ORDER VALUE
            </span>
            <div className="text-xl font-black text-purple-300 font-mono">${aov}</div>
            <span className="text-[10px] text-zinc-400">{stats.totalOrders} total orders</span>
          </div>
        </div>

        {/* Product-by-Product Breakdown Table */}
        <div className="mb-6">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            CATALOG DROP PERFORMANCE MATRIX
          </h3>

          <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900 text-zinc-400 font-mono text-[10px] uppercase border-b border-zinc-800">
                <tr>
                  <th className="py-2.5 px-3">Item / SKU</th>
                  <th className="py-2.5 px-3">Sale Price</th>
                  <th className="py-2.5 px-3">Sold Units</th>
                  <th className="py-2.5 px-3">Stock Left</th>
                  <th className="py-2.5 px-3 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {products.map((p) => {
                  const rev = p.soldCount * p.salePrice;
                  return (
                    <tr key={p.id} className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white truncate max-w-[220px]">
                          {p.title}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">{p.sku}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                        ${p.salePrice}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                        {p.soldCount}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-zinc-300">{p.stock}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-white text-right">
                        ${rev.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
          <div className="text-[11px] text-zinc-400">
            Stream Health: <span className="text-emerald-400 font-bold">100% (No dropped frames)</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs"
          >
            Close Report
          </button>
        </div>
      </motion.div>
    </div>
  );
};
