import React, { useState, useEffect } from 'react';
import {
  ProductItem,
  ChatMessage,
  AIPrompterResult,
  AIChatTriageResult,
  AIStrategyResult,
  StreamStats,
} from '../types';
import {
  Sparkles,
  Zap,
  MessageSquare,
  TrendingUp,
  RefreshCw,
  Play,
  Volume2,
  CheckCircle2,
  Flame,
  HelpCircle,
  Pin,
  Bot,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';

interface AiDirectorPanelProps {
  activeProduct: ProductItem | null;
  recentChat: ChatMessage[];
  stats: StreamStats;
  onPinCommentToStream: (comment: ChatMessage) => void;
  onApplyPromoBanner: (text: string) => void;
}

export const AiDirectorPanel: React.FC<AiDirectorPanelProps> = ({
  activeProduct,
  recentChat,
  stats,
  onPinCommentToStream,
  onApplyPromoBanner,
}) => {
  const [activeTab, setActiveTab] = useState<'prompter' | 'triage' | 'strategy'>('prompter');
  const [tone, setTone] = useState<'hype' | 'informative' | 'urgency' | 'objection_buster'>('hype');
  const [prompterSpeed, setPrompterSpeed] = useState<number>(1);
  const [isPrompterScrolling, setIsPrompterScrolling] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // AI State
  const [aiPrompter, setAiPrompter] = useState<AIPrompterResult | null>(null);
  const [aiTriage, setAiTriage] = useState<AIChatTriageResult | null>(null);
  const [aiStrategy, setAiStrategy] = useState<AIStrategyResult | null>(null);
  const [isLoadingPitch, setIsLoadingPitch] = useState<boolean>(false);
  const [isLoadingTriage, setIsLoadingTriage] = useState<boolean>(false);
  const [isLoadingStrategy, setIsLoadingStrategy] = useState<boolean>(false);

  // Fetch AI pitch on product change or tone change
  const generateAIPitch = async () => {
    if (!activeProduct) return;
    setIsLoadingPitch(true);
    try {
      const res = await fetch('/api/director/ai-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: activeProduct,
          tone,
          dropStage: activeProduct.stock < 15 ? 'urgency_low_stock' : 'flash_active',
          audienceMood: 'enthusiastic',
        }),
      });
      const data = await res.json();
      setAiPrompter(data);
    } catch (err) {
      console.error('Failed to generate AI pitch:', err);
    } finally {
      setIsLoadingPitch(false);
    }
  };

  // Fetch AI chat triage
  const generateAIChatTriage = async () => {
    setIsLoadingTriage(true);
    try {
      const res = await fetch('/api/director/chat-triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recentComments: recentChat,
          currentProduct: activeProduct,
        }),
      });
      const data = await res.json();
      setAiTriage(data);
    } catch (err) {
      console.error('Failed to triage chat:', err);
    } finally {
      setIsLoadingTriage(false);
    }
  };

  // Fetch AI strategy
  const generateAIStrategy = async () => {
    setIsLoadingStrategy(true);
    try {
      const res = await fetch('/api/director/strategy-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          streamStats: stats,
          productCatalog: activeProduct,
        }),
      });
      const data = await res.json();
      setAiStrategy(data);
    } catch (err) {
      console.error('Failed to generate strategy:', err);
    } finally {
      setIsLoadingStrategy(false);
    }
  };

  useEffect(() => {
    generateAIPitch();
  }, [activeProduct?.id, tone]);

  return (
    <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl flex flex-col h-full overflow-hidden shadow-xl backdrop-blur-sm">
      {/* Tab Navigation */}
      <div className="p-2.5 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-500/30">
            <Bot className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[11px] font-bold font-mono uppercase text-zinc-200 tracking-widest">
            AI CO-DIRECTOR
          </span>
        </div>

        <div className="flex items-center bg-zinc-900/90 p-0.5 rounded-lg border border-zinc-800">
          <button
            onClick={() => setActiveTab('prompter')}
            className={`px-2 py-1 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer ${
              activeTab === 'prompter'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Prompter
          </button>
          <button
            onClick={() => {
              setActiveTab('triage');
              if (!aiTriage) generateAIChatTriage();
            }}
            className={`px-2 py-1 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer ${
              activeTab === 'triage'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Triage
          </button>
          <button
            onClick={() => {
              setActiveTab('strategy');
              if (!aiStrategy) generateAIStrategy();
            }}
            className={`px-2 py-1 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer ${
              activeTab === 'strategy'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Strategy
          </button>
        </div>
      </div>

      {/* Tab 1: AI Teleprompter & Host Pitch Coach */}
      {activeTab === 'prompter' && (
        <div className="flex-1 flex flex-col p-3 overflow-y-auto space-y-3">
          {/* Tone Selector & Refresh */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 bg-zinc-900/80 p-2 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-1">
              {(['hype', 'informative', 'urgency', 'objection_buster'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                    tone === t
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t === 'hype' && '🔥 Hype'}
                  {t === 'informative' && '🔬 Specs'}
                  {t === 'urgency' && '🚨 Urgency'}
                  {t === 'objection_buster' && '🛡️ FAQs'}
                </button>
              ))}
            </div>

            <button
              onClick={generateAIPitch}
              disabled={isLoadingPitch}
              className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors disabled:opacity-50"
              title="Regenerate Pitch with Gemini"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingPitch ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>

          {/* Teleprompter Display Box */}
          <div className="relative flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 overflow-y-auto min-h-[160px] shadow-inner">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase mb-2 border-b border-zinc-800/80 pb-1">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                HOST STAGE TELEPROMPTER FEED
              </span>
              <div className="flex items-center gap-1 text-zinc-400">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-1 rounded ${fontSize === 'sm' ? 'bg-zinc-800 text-white' : ''}`}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('base')}
                  className={`px-1 rounded ${fontSize === 'base' ? 'bg-zinc-800 text-white' : ''}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-1 rounded ${fontSize === 'lg' ? 'bg-zinc-800 text-white' : ''}`}
                >
                  A+
                </button>
              </div>
            </div>

            {isLoadingPitch ? (
              <div className="h-32 flex flex-col items-center justify-center text-zinc-500 gap-2">
                <RefreshCw className="w-5 h-5 animate-spin text-amber-400" />
                <span className="text-xs font-mono">Gemini drafting sales hooks...</span>
              </div>
            ) : (
              <div
                className={`space-y-3 font-medium text-zinc-100 leading-relaxed ${
                  fontSize === 'sm' ? 'text-xs' : fontSize === 'lg' ? 'text-base' : 'text-sm'
                }`}
              >
                {aiPrompter?.cueLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800/90 text-amber-100 hover:border-amber-500/50 transition-colors"
                  >
                    <span className="text-[10px] font-mono text-amber-400 font-bold block mb-0.5">
                      CUE 0{idx + 1}
                    </span>
                    "{line}"
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Talking Points & Objection Busters */}
          {aiPrompter?.talkingPoints && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3">
              <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 block mb-1.5">
                KEY VALUE BULLETS FOR AIR
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {aiPrompter.talkingPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Recommendation Banner */}
          {aiPrompter?.recommendedAction && (
            <div className="bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/30 rounded-lg p-2.5 flex items-center justify-between text-xs text-amber-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[11px] font-semibold">{aiPrompter.recommendedAction}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: AI Live Chat Triage */}
      {activeTab === 'triage' && (
        <div className="flex-1 flex flex-col p-3 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-zinc-200 uppercase">
              BUYING INTENT & QUESTIONS
            </span>
            <button
              onClick={generateAIChatTriage}
              disabled={isLoadingTriage}
              className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] text-zinc-300"
            >
              <RefreshCw className={`w-3 h-3 ${isLoadingTriage ? 'animate-spin text-amber-400' : ''}`} />
              <span>Triage Chat</span>
            </button>
          </div>

          {isLoadingTriage ? (
            <div className="h-40 flex flex-col items-center justify-center text-zinc-500 gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
              <span className="text-xs font-mono">Analyzing viewer chat sentiment...</span>
            </div>
          ) : (
            <>
              {/* Sentiment Summary */}
              {aiTriage?.summary && (
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                  <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase mb-1">
                    AUDIENCE PULSE
                  </div>
                  {aiTriage.summary}
                </div>
              )}

              {/* High-Priority Questions to answer on air */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                  HIGH-INTENT QUESTIONS FOR HOST
                </span>

                {(aiTriage?.highPriorityQuestions || [
                  {
                    user: 'Chloe_Style',
                    question: 'Does this pair with both Mac and iPhone at the same time??',
                    answerCue: 'Yes, multipoint Bluetooth 5.3 supports instant dual pairing!',
                  },
                  {
                    user: 'Elena_Vibe',
                    question: 'Is the headband cushioned enough for 6+ hour flights?',
                    answerCue: 'Memory foam padding designed specifically for long-haul comfort!',
                  },
                ]).map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-900 border border-cyan-500/30 hover:border-cyan-400 transition-all text-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-cyan-300">@{q.user}</span>
                      <button
                        onClick={() => {
                          const mockMsg: ChatMessage = {
                            id: `pin-${Date.now()}`,
                            user: q.user,
                            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                            text: q.question,
                            timestamp: 'Just now',
                            intent: 'question',
                          };
                          onPinCommentToStream(mockMsg);
                        }}
                        className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-[10px] font-semibold"
                      >
                        <Pin className="w-2.5 h-2.5" />
                        <span>Pin to Air</span>
                      </button>
                    </div>
                    <div className="text-zinc-200 font-medium mb-1.5">"{q.question}"</div>
                    <div className="p-1.5 rounded bg-black/50 border border-zinc-800 text-[11px] text-amber-200 flex items-start gap-1">
                      <span className="font-bold text-amber-400 shrink-0">Cue:</span>
                      <span>{q.answerCue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Tab 3: AI Drop Strategy Copilot */}
      {activeTab === 'strategy' && (
        <div className="flex-1 flex flex-col p-3 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-zinc-200 uppercase">
              REVENUE & DROP PACING
            </span>
            <button
              onClick={generateAIStrategy}
              disabled={isLoadingStrategy}
              className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] text-zinc-300"
            >
              <RefreshCw className={`w-3 h-3 ${isLoadingStrategy ? 'animate-spin text-emerald-400' : ''}`} />
              <span>Optimize Drop</span>
            </button>
          </div>

          {isLoadingStrategy ? (
            <div className="h-40 flex flex-col items-center justify-center text-zinc-500 gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
              <span className="text-xs font-mono">Simulating drop velocity & GMV curve...</span>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Strategy Card */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-emerald-500/40 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono mb-1.5 text-xs">
                  <TrendingUp className="w-4 h-4" />
                  <span>{aiStrategy?.strategyTitle || 'Surge Flash: 50-Unit Cap'}</span>
                </div>

                <p className="text-zinc-300 leading-relaxed mb-3">
                  {aiStrategy?.recommendation ||
                    'Viewer velocity is peaking (+180 CCV in 2 mins). Release the $25 off coupon code "FLASH25" now with a 2:00 timer to trigger impulse cart checkouts.'}
                </p>

                {aiStrategy?.suggestedBanner && (
                  <div className="p-2 rounded bg-black/60 border border-zinc-800 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-amber-300 truncate">
                      {aiStrategy.suggestedBanner}
                    </span>
                    <button
                      onClick={() => onApplyPromoBanner(aiStrategy.suggestedBanner)}
                      className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] shrink-0"
                    >
                      Push Banner
                    </button>
                  </div>
                )}
              </div>

              {/* Real-time Telemetry Snapshot */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block">Est. Drop GMV</span>
                  <span className="text-sm font-bold text-emerald-400">
                    ${(stats.gmv * 1.25).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block">Cart Conversion</span>
                  <span className="text-sm font-bold text-cyan-400">{stats.cvr.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
