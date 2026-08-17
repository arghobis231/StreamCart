import React, { useState } from 'react';
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Search,
  Receipt,
  Radio,
  Sparkles,
} from 'lucide-react';
import { ShopperOrder, ScreenId } from '../types';

interface ShopperOrdersViewProps {
  orders?: ShopperOrder[];
  onNavigate: (screen: ScreenId) => void;
  onJoinStream?: (channelId: string) => void;
}

export const ShopperOrdersView: React.FC<ShopperOrdersViewProps> = ({
  orders = [],
  onNavigate,
  onJoinStream,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'in-transit' | 'delivered'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [downloadedInvoiceOrder, setDownloadedInvoiceOrder] = useState<string | null>(null);

  const handleDownloadInvoice = (orderNumber: string) => {
    setDownloadedInvoiceOrder(orderNumber);
    setTimeout(() => setDownloadedInvoiceOrder(null), 3000);
  };

  const handleJoin = (channelId: string) => {
    if (onJoinStream) onJoinStream(channelId);
    else onNavigate('viewer');
  };

  const filteredOrders = orders.filter((ord) => {
    if (filterTab === 'in-transit') return ord.status === 'Shipped' || ord.status === 'Out for Delivery' || ord.status === 'Processing';
    if (filterTab === 'delivered') return ord.status === 'Delivered';
    return true;
  }).filter((ord) => {
    return (
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.items.some((i) => i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.creatorName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-white overflow-y-auto min-h-0 text-left">
      {/* Top Banner Header */}
      <div className="bg-zinc-900/60 border-b border-zinc-800/80 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase">
                Purchase History
              </span>
              <span className="text-xs text-zinc-400 font-semibold">• {orders.length} Completed Orders</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Orders & Live Stream Purchases
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Track live delivery statuses, download receipts, review items, and buy again directly from past creator broadcasts.
            </p>
          </div>

          <button
            onClick={() => onNavigate('shopper-products')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 space-y-6">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Purchases ({orders.length})
            </button>
            <button
              onClick={() => setFilterTab('in-transit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterTab === 'in-transit'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              In Transit ({orders.filter((o) => o.status === 'Shipped' || o.status === 'Out for Delivery' || o.status === 'Processing').length})
            </button>
            <button
              onClick={() => setFilterTab('delivered')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterTab === 'delivered'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Delivered ({orders.filter((o) => o.status === 'Delivered').length})
            </button>
          </div>

          <div className="relative sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order # or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
            <Package className="w-12 h-12 text-zinc-600 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-white">No orders found</h3>
              <p className="text-xs text-zinc-400 mt-1">Explore live broadcasts and order exclusive creator drops.</p>
            </div>
            <button
              onClick={() => onNavigate('live-now')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Watch Live Drops
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((ord) => {
              const isExpanded = expandedOrderId === ord.id;
              const isDelivered = ord.status === 'Delivered';

              return (
                <div
                  key={ord.id}
                  className="bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all shadow-lg"
                >
                  {/* Order Summary Header Bar */}
                  <div className="p-4 sm:p-5 bg-zinc-900/90 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
                      <div>
                        <div className="text-[10px] text-zinc-400 uppercase font-semibold">Order Placed</div>
                        <div className="font-bold text-zinc-200">{ord.placedAt}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-400 uppercase font-semibold">Total Paid</div>
                        <div className="font-black text-emerald-400">${ord.total.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-400 uppercase font-semibold">Ship To</div>
                        <div className="font-bold text-zinc-200">{ord.shippingAddress.fullName}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-400 uppercase font-semibold">Order #</div>
                        <div className="font-mono font-bold text-blue-400">{ord.orderNumber}</div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          isDelivered
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                        }`}
                      >
                        {isDelivered ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
                        <span>{ord.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Items in Order */}
                  <div className="p-4 sm:p-5 space-y-4">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>Estimated Delivery: <strong className="text-white font-bold">{ord.estimatedDelivery}</strong></span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">{ord.carrier} • {ord.trackingNumber}</span>
                    </div>

                    <div className="space-y-3">
                      {ord.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-16 h-16 rounded-xl object-cover border border-zinc-800 shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                              <p className="text-xs text-zinc-400">Variant: <strong className="text-zinc-200">{item.variantName}</strong> • Qty: {item.quantity}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-black text-white">${item.price.toFixed(2)}</span>
                                <span className="text-[10px] text-zinc-500">• Host: {item.creatorName}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              onClick={() => onNavigate('cart')}
                              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span>Buy Again</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Financial Summary Strip */}
                    <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
                      <div className="flex items-center gap-4">
                        <span>Payment: <strong className="text-zinc-200">{ord.paymentMethod}</strong></span>
                        {ord.promoCode && (
                          <span className="text-emerald-400 font-semibold">Promo Applied: {ord.promoCode} (-${ord.discountApplied.toFixed(2)})</span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDownloadInvoice(ord.orderNumber)}
                          className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>{downloadedInvoiceOrder === ord.orderNumber ? '✓ Invoice Prepared & Saved' : 'View Official Invoice'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
