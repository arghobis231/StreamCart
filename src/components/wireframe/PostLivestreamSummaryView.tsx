import React from 'react';
import {
  ScreenId,
  StreamStats,
  ProductItem,
} from '../../types';
import {
  CheckCircle2,
  DollarSign,
  ShoppingCart,
  Users,
  Clock,
  Download,
  Calendar,
  Share2,
  Film,
  ArrowRight,
  Sparkles,
  Trophy,
  MessageSquare,
  Flame,
} from 'lucide-react';
import { WireframeBox, WireframeButton, WireframeBadge, WireframeCard } from './WireframeUI';

interface PostLivestreamSummaryViewProps {
  onNavigate: (screen: ScreenId) => void;
  stats: StreamStats;
  products: ProductItem[];
}

export const PostLivestreamSummaryView: React.FC<PostLivestreamSummaryViewProps> = ({
  onNavigate,
  stats,
  products,
}) => {
  const topProducts = [...products].sort((a, b) => b.soldCount - a.soldCount);

  return (
    <div className="flex-1 bg-zinc-100 min-h-screen p-4 md:p-6 font-mono text-zinc-900 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Post-Stream Recap Header */}
        <div className="bg-white border-2 border-zinc-900 rounded-md p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-zinc-900 bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <WireframeBadge variant="success">STREAM CONCLUDED</WireframeBadge>
                <span className="text-xs text-zinc-500">Recorded Aug 14, 2026</span>
              </div>
              <h1 className="text-xl font-black text-zinc-900 uppercase mt-1">
                Post-Livestream Performance Summary
              </h1>
              <p className="text-xs text-zinc-600">
                Mega Tech Friday: Unboxing 4K Drones & Pro Studio Gear • Duration: 01h 42m 15s
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <WireframeButton variant="outline" size="md" icon={<Download className="w-3.5 h-3.5" />}>
              Download 1080p VOD
            </WireframeButton>
            <WireframeButton
              variant="primary"
              size="md"
              onClick={() => onNavigate('dashboard')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Creator Dashboard
            </WireframeButton>
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 space-y-1 shadow-xs">
            <div className="text-xs text-zinc-500 uppercase font-bold">Total Gross Sales (GMV)</div>
            <div className="text-2xl font-black text-emerald-700 font-mono">${stats.gmv.toLocaleString()}</div>
            <div className="text-[11px] text-zinc-500">Across {stats.totalOrders} customer orders</div>
          </div>

          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 space-y-1 shadow-xs">
            <div className="text-xs text-zinc-500 uppercase font-bold">Total Show Views</div>
            <div className="text-2xl font-black text-zinc-900 font-mono">12,490</div>
            <div className="text-[11px] text-zinc-500">Peak concurrent: {stats.peakCcv.toLocaleString()}</div>
          </div>

          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 space-y-1 shadow-xs">
            <div className="text-xs text-zinc-500 uppercase font-bold">Overall Conversion (CVR)</div>
            <div className="text-2xl font-black text-zinc-900 font-mono">{stats.cvr}%</div>
            <div className="text-[11px] text-zinc-500">Industry avg: 2.1% (Exceeded by 2.3x)</div>
          </div>

          <div className="bg-white border-2 border-zinc-800 rounded-md p-4 space-y-1 shadow-xs">
            <div className="text-xs text-zinc-500 uppercase font-bold">Viewer Engagement</div>
            <div className="text-2xl font-black text-amber-600 font-mono">1,840</div>
            <div className="text-[11px] text-zinc-500">Live chat messages & Q&A sent</div>
          </div>
        </div>

        {/* Two Columns: Best Sellers & Recording / Replay Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2-Cols: Top Selling Drops */}
          <div className="lg:col-span-2 space-y-4">
            <WireframeCard title="Top Selling Products of the Broadcast" subtitle="Ranked by total in-stream units purchased">
              <div className="space-y-3">
                {topProducts.slice(0, 4).map((p, idx) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded border border-zinc-300 bg-zinc-50 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </div>
                      <WireframeBox label="[ X ]" className="w-12 h-12 rounded shrink-0 bg-white" />
                      <div>
                        <div className="font-bold text-xs text-zinc-900">{p.title}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">
                          SKU: {p.sku} • Live Price: ${p.salePrice}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="font-bold text-emerald-800 text-xs">{p.soldCount} units sold</div>
                      <div className="text-xs font-black text-zinc-900">
                        ${(p.soldCount * p.salePrice).toLocaleString()} GMV
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </WireframeCard>

            {/* Audience Feedback & Sentiment */}
            <WireframeCard title="Audience Sentiment & Live Highlights" subtitle="AI moderation & chat summary">
              <div className="space-y-2.5 text-xs text-zinc-700">
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-emerald-900">
                  <div className="font-bold">✨ High Purchase Intent on Apex Drone:</div>
                  <p className="text-[11px] mt-0.5">
                    Viewers frequently asked about battery life and 4K camera stabilization during the 00:28 mark demo.
                  </p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-300 rounded text-amber-900">
                  <div className="font-bold">⚡ Flash Coupon Conversion:</div>
                  <p className="text-[11px] mt-0.5">
                    Over 64% of buyers entered the coupon code <strong>TECHLIVE25</strong> at in-stream checkout.
                  </p>
                </div>
              </div>
            </WireframeCard>
          </div>

          {/* Right Column: Replay VOD & Next Actions */}
          <div className="space-y-4">
            <WireframeCard title="VOD Replay & Shoppable Video" subtitle="Archive available for on-demand viewers">
              <div className="space-y-3">
                <WireframeBox
                  label="[ 1080P FULL RECORDING : 1.8 GB ]"
                  sublabel="Auto-synced with timeline chapter timestamps"
                  className="h-36 rounded bg-zinc-900 text-zinc-300 border-zinc-700"
                />

                <div className="space-y-2 text-xs">
                  <button className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded font-bold text-xs flex items-center justify-center gap-2">
                    <Film className="w-3.5 h-3.5" />
                    <span>Publish Shoppable Replay</span>
                  </button>

                  <button className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-400 text-zinc-800 rounded font-bold text-xs flex items-center justify-center gap-2">
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Analytics CSV</span>
                  </button>
                </div>
              </div>
            </WireframeCard>

            <WireframeCard title="Next Steps" subtitle="Plan your next broadcast">
              <div className="space-y-2.5 text-xs">
                <WireframeButton
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => onNavigate('schedule')}
                  icon={<Calendar className="w-3.5 h-3.5" />}
                >
                  Schedule Next Livestream
                </WireframeButton>

                <WireframeButton
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={() => onNavigate('products')}
                >
                  Restock Products in Inventory
                </WireframeButton>
              </div>
            </WireframeCard>
          </div>
        </div>
      </div>
    </div>
  );
};
