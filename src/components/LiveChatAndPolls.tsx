import React, { useState } from 'react';
import { ChatMessage, LivePoll } from '../types';
import {
  MessageSquare,
  Send,
  Pin,
  Flame,
  ShieldCheck,
  BarChart2,
  Heart,
  Plus,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LiveChatAndPollsProps {
  chatMessages: ChatMessage[];
  activePoll: LivePoll | null;
  likesCount: number;
  onSendMessage: (text: string) => void;
  onPinComment: (comment: ChatMessage) => void;
  onLaunchPoll: (question: string, options: string[], durationSec: number) => void;
  onEndPoll: () => void;
  onSendLike: () => void;
}

export const LiveChatAndPolls: React.FC<LiveChatAndPollsProps> = ({
  chatMessages,
  activePoll,
  likesCount,
  onSendMessage,
  onPinComment,
  onLaunchPoll,
  onEndPoll,
  onSendLike,
}) => {
  const [inputText, setInputText] = useState('');
  const [showPollModal, setShowPollModal] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('Which color should we showcase next?');
  const [pollOptions, setPollOptions] = useState<string[]>([
    'Space Titanium 🎧',
    'Obsidian Matte ⚫',
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pollQuestion || pollOptions.length < 2) return;
    onLaunchPoll(
      pollQuestion,
      pollOptions.filter((o) => o.trim().length > 0),
      60
    );
    setShowPollModal(false);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`]);
    }
  };

  return (
    <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl flex flex-col h-full overflow-hidden shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="p-2.5 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-[11px] font-mono uppercase tracking-widest text-zinc-200">
            AUDIENCE LIVE CHAT & POLLS
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Heart Reactions counter */}
          <button
            onClick={onSendLike}
            className="flex items-center gap-1 px-2 py-1 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 text-xs font-mono font-bold transition-all active:scale-90"
            title="Spam simulated heart likes"
          >
            <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
            <span>{(likesCount / 1000).toFixed(1)}k</span>
          </button>

          {/* Poll Button */}
          <button
            onClick={() => setShowPollModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 text-xs font-mono font-bold uppercase border border-indigo-500/40 transition-all shadow-sm"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>{activePoll?.isActive ? 'Poll Live' : 'Launch Poll'}</span>
          </button>
        </div>
      </div>

      {/* Active Poll Banner if running */}
      {activePoll && activePoll.isActive && (
        <div className="bg-indigo-950/60 border-b border-indigo-500/40 p-2.5 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-2 min-w-0">
            <BarChart2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold truncate text-[11px]">{activePoll.question}</div>
              <div className="text-[10px] text-indigo-300">
                {activePoll.totalVotes} votes • {activePoll.timeRemaining}s left
              </div>
            </div>
          </div>
          <button
            onClick={onEndPoll}
            className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] shrink-0"
          >
            End Poll
          </button>
        </div>
      )}

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-zinc-900/60 transition-colors"
          >
            <img
              src={msg.avatar}
              alt={msg.user}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover border border-zinc-700 shrink-0 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-xs font-bold text-zinc-200 truncate">@{msg.user}</span>
                  {msg.isVip && (
                    <span className="px-1 text-[9px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      VIP
                    </span>
                  )}
                  {msg.badge && (
                    <span className="text-[9px] text-zinc-400 font-normal">{msg.badge}</span>
                  )}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onPinComment(msg)}
                    className="p-1 rounded bg-zinc-800 hover:bg-cyan-900 text-cyan-300 text-[10px] flex items-center gap-0.5 transition-colors"
                    title="Pin this comment onto the live broadcast screen"
                  >
                    <Pin className="w-2.5 h-2.5" />
                    <span>Pin</span>
                  </button>
                </div>
              </div>

              <div className="text-xs text-zinc-300 mt-0.5 leading-relaxed break-words">
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Director Chat Input Box */}
      <form
        onSubmit={handleSubmit}
        className="p-2.5 border-t border-zinc-800 bg-zinc-900/80 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type director comment / host cue into chat..."
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Launch Poll Modal */}
      <AnimatePresence>
        {showPollModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-950 border border-indigo-500/50 rounded-2xl p-5 max-w-md w-full shadow-2xl text-white"
            >
              <div className="flex items-center gap-2 text-indigo-400 mb-3">
                <BarChart2 className="w-5 h-5" />
                <h3 className="font-bold text-sm uppercase tracking-wider font-mono">
                  LAUNCH REAL-TIME AUDIENCE POLL
                </h3>
              </div>

              <form onSubmit={handleCreatePoll} className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Poll Question
                  </label>
                  <input
                    type="text"
                    required
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-zinc-400 block">
                    Voting Options (Min 2, Max 4)
                  </label>
                  {pollOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-5 text-[11px] font-mono text-zinc-500">{i + 1}.</span>
                      <input
                        type="text"
                        required
                        value={opt}
                        onChange={(e) => {
                          const updated = [...pollOptions];
                          updated[i] = e.target.value;
                          setPollOptions(updated);
                        }}
                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1 text-xs text-white"
                      />
                    </div>
                  ))}

                  {pollOptions.length < 4 && (
                    <button
                      type="button"
                      onClick={addPollOption}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 mt-1"
                    >
                      <Plus className="w-3 h-3" /> Add Option
                    </button>
                  )}
                </div>

                <div className="pt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPollModal(false)}
                    className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-950"
                  >
                    🚀 Push Poll Live
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
