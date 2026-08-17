import React, { useState } from 'react';
import {
  Users,
  Search,
  Crown,
  Sparkles,
  ShoppingBag,
  Shield,
  MessageSquare,
  DollarSign,
  Heart,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { ScreenId } from '../types';

interface AudienceViewProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AudienceView: React.FC<AudienceViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const audienceMembers = [
    {
      id: 'aud-1',
      name: 'Elena Rostova',
      handle: '@elena_lux',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      badge: 'VIP Shopper',
      tier: 'Diamond',
      totalSpent: 1240.0,
      streamsAttended: 18,
      lastActive: 'Currently in Live Stream',
      isSubscriber: true,
    },
    {
      id: 'aud-2',
      name: 'Marcus Vance',
      handle: '@marcus_v',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      badge: 'Top Spender',
      tier: 'Platinum',
      totalSpent: 890.0,
      streamsAttended: 12,
      lastActive: 'Purchased 2m ago',
      isSubscriber: true,
    },
    {
      id: 'aud-3',
      name: 'Sophia Chen',
      handle: '@sophiac_tech',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      badge: 'Loyal Fan',
      tier: 'Gold',
      totalSpent: 450.0,
      streamsAttended: 9,
      lastActive: 'Chatting now',
      isSubscriber: true,
    },
    {
      id: 'aud-4',
      name: 'David Kim',
      handle: '@dkim_creative',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      badge: 'VIP Shopper',
      tier: 'Silver',
      totalSpent: 320.0,
      streamsAttended: 6,
      lastActive: 'Active in Q&A',
      isSubscriber: false,
    },
    {
      id: 'aud-5',
      name: 'Jessica Taylor',
      handle: '@jtaylor_style',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      badge: 'New Buyer',
      tier: 'Bronze',
      totalSpent: 149.0,
      streamsAttended: 2,
      lastActive: 'Purchased 15m ago',
      isSubscriber: false,
    },
  ];

  const filtered = audienceMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Audience & Shopper Community</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Identify top VIP livestream spenders, foster repeat customer loyalty, and moderate real-time engagement.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Total Active Community</span>
          <div className="text-2xl font-black text-white">84,520 Viewers</div>
          <span className="text-[10px] text-emerald-400 font-semibold">+31.4% subscriber growth</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">VIP Shoppers (&gt;$500 GMV)</span>
          <div className="text-2xl font-black text-indigo-400">1,480 Buyers</div>
          <span className="text-[10px] text-zinc-400">Driving 64% of stream revenue</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Repeat Purchase Rate</span>
          <div className="text-2xl font-black text-emerald-400">38.2%</div>
          <span className="text-[10px] text-zinc-400">Within 30 days of first stream</span>
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search VIP buyers by name or handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950/80 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="px-4 py-3">VIP Shopper</th>
                <th className="px-4 py-3">Loyalty Badge</th>
                <th className="px-4 py-3">Total In-Stream Spend</th>
                <th className="px-4 py-3">Shows Attended</th>
                <th className="px-4 py-3">Last Activity</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {filtered.map((member) => (
                <tr key={member.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="px-4 py-3.5 flex items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{member.name}</span>
                        {member.isSubscriber && <Crown className="w-3.5 h-3.5 text-amber-400 fill-current" />}
                      </div>
                      <div className="text-[11px] text-zinc-400">{member.handle}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {member.badge}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-bold font-mono text-emerald-400">
                    ${member.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-4 py-3.5 text-zinc-200">
                    {member.streamsAttended} Broadcasts
                  </td>
                  <td className="px-4 py-3.5 text-zinc-400 text-[11px]">
                    {member.lastActive}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      Active Member
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
