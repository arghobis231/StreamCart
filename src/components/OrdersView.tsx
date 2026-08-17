import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  DollarSign,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { LiveOrder, ScreenId } from '../types';

interface OrdersViewProps {
  orders: LiveOrder[];
  onNavigate: (screen: ScreenId) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalGmv = orders.reduce((sum, o) => sum + o.amount, 0);
  const avgOrderValue = orders.length > 0 ? totalGmv / orders.length : 0;

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Orders & In-Stream Transactions</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time feed of purchases generated during interactive livestream broadcasts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting full transaction CSV report...')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Total Broadcast Revenue</span>
          <div className="text-2xl font-black text-emerald-400">
            ${totalGmv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-zinc-400">Across {orders.length} in-stream purchases</span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Average Order Value (AOV)</span>
          <div className="text-2xl font-black text-indigo-400">${avgOrderValue.toFixed(2)}</div>
          <span className="text-[10px] text-emerald-400 font-semibold">+22% vs standard e-commerce</span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Fulfillment Status</span>
          <div className="text-2xl font-black text-white">100% Synced</div>
          <span className="text-[10px] text-zinc-400">Automated warehouse API dispatch</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, order #, item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Order Statuses</option>
            <option value="Completed">Completed / Paid</option>
            <option value="Processing">Processing</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/80 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Item Purchased</th>
                <th className="px-5 py-3.5">Payment & Variant</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Timestamp</th>
                <th className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-white">
                    {order.orderNumber}
                  </td>
                  <td className="px-5 py-4 font-bold text-white">
                    {order.customerName}
                  </td>
                  <td className="px-5 py-4 text-zinc-200 max-w-xs truncate">
                    {order.productTitle}
                  </td>
                  <td className="px-5 py-4 text-zinc-400">
                    <span className="text-zinc-300">{order.paymentMethod || 'Apple Pay'}</span>
                    <span className="text-zinc-500 block text-[10px]">{order.variant || 'Standard'}</span>
                  </td>
                  <td className="px-5 py-4 font-black font-mono text-emerald-400">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-zinc-400 text-[11px]">
                    {order.timestamp}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
