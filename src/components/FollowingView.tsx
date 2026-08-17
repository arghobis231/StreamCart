import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  Play,
  Calendar,
  Radio,
  Clock,
  Sparkles,
  Eye,
  ChevronRight,
  UserCheck,
  UserPlus,
  Bell,
  Compass,
} from 'lucide-react';
import { FollowedCreator, ScreenId } from '../types';

interface FollowingViewProps {
  followedCreators?: FollowedCreator[];
  creators?: FollowedCreator[];
  onToggleFollow?: (creatorId: string) => void;
  onToggleFollowCreator?: (creatorId: string) => void;
  onJoinStream?: (channelId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const FollowingView: React.FC<FollowingViewProps> = ({
  followedCreators,
  creators,
  onToggleFollow,
  onToggleFollowCreator,
  onJoinStream,
  onNavigate,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'live' | 'upcoming'>('all');
  const allList = followedCreators || creators || [];

  const handleToggle = (id: string) => {
    if (onToggleFollow) onToggleFollow(id);
    else if (onToggleFollowCreator) onToggleFollowCreator(id);
  };

  const handleJoin = (channelId: string) => {
    if (onJoinStream) onJoinStream(channelId);
    else onNavigate('viewer');
  };

  const followedList = allList.filter((c) => c.isFollowed ?? c.isFollowing ?? false);
  const liveCount = followedList.filter((c) => c.isLive).length;
  const upcomingCount = followedList.filter((c) => !c.isLive).length;

  const displayedList = followedList.filter((c) => {
    if (filterTab === 'live') return c.isLive;
    if (filterTab === 'upcoming') return !c.isLive;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-white overflow-y-auto min-h-0 text-left">
      {/* Top Banner Header */}
      <div className="bg-zinc-900/60 border-b border-zinc-800/80 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase">
                Creator Subscriptions
              </span>
              <span className="text-xs text-zinc-400 font-semibold">• {followedList.length} Followed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Creators You Follow
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Never miss an exclusive livestream drop, flash discount, or community Q&A from your favorite hosts.
            </p>
          </div>

          <button
            onClick={() => onNavigate('discover')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Discover More Creators</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6 space-y-6">
        {/* Tabs: All, Live Now, Upcoming */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterTab === 'all'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            All Followed ({followedList.length})
          </button>

          <button
            onClick={() => setFilterTab('live')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterTab === 'live'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Live Now ({liveCount})</span>
          </button>

          <button
            onClick={() => setFilterTab('upcoming')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterTab === 'upcoming'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Upcoming Schedules ({upcomingCount})</span>
          </button>
        </div>

        {/* Creators Grid */}
        {displayedList.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
            <Users className="w-12 h-12 text-zinc-600 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-white">No creators found in this filter</h3>
              <p className="text-xs text-zinc-400 mt-1">Explore active livestreams and discover inspiring creator hosts.</p>
            </div>
            <button
              onClick={() => onNavigate('discover')}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
            >
              Explore Streamers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedList.map((creator) => (
              <div
                key={creator.id}
                className="bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-lg"
              >
                {/* Header: Avatar, Name, Handle, Follow Toggle */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={creator.avatarUrl}
                        alt={creator.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500/40"
                      />
                      {creator.isLive && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-red-500 ring-2 ring-zinc-950 animate-pulse" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white">{creator.name}</h3>
                        {creator.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />}
                      </div>
                      <p className="text-xs text-zinc-400">{creator.handle}</p>
                      <span className="text-[11px] text-purple-400 font-semibold">{creator.category}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggle(creator.id)}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="Unfollow Creator"
                  >
                    <UserCheck className="w-4 h-4 text-purple-400" />
                  </button>
                </div>

                {/* Status Block: Currently Live or Next Stream */}
                {creator.isLive ? (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-red-400 uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        BROADCASTING NOW
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {creator.viewersCount?.toLocaleString()} watching
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-zinc-200 line-clamp-1">
                      {creator.currentStreamTitle}
                    </p>

                    {creator.featuredProductName && (
                      <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Drop: <strong className="text-zinc-200">{creator.featuredProductName}</strong></span>
                      </div>
                    )}

                    <button
                      onClick={() => handleJoin(creator.liveChannelId || creator.streamChannelId || 'channel-tech')}
                      className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Join Live Stream</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span>Next Scheduled Stream</span>
                    </div>
                    <p className="text-xs font-semibold text-zinc-300">
                      {creator.nextStreamSchedule || 'Dropping new gear soon'}
                    </p>
                    {creator.featuredProductName && (
                      <p className="text-[11px] text-zinc-400">
                        Teaser: {creator.featuredProductName}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
