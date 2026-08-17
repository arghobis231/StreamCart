import React, { useState } from 'react';
import {
  Radio,
  Calendar,
  Clock,
  Tag,
  Plus,
  Search,
  Check,
  CheckCircle2,
  Sliders,
  Play,
  ArrowRight,
  ArrowLeft,
  Upload,
  Camera,
  Mic,
  Video,
  Sparkles,
  Layers,
  ShoppingBag,
  Trash2,
  Copy,
  ExternalLink,
  Shield,
  Eye,
} from 'lucide-react';
import { ScreenId, ScheduledLivestream, ProductItem } from '../types';

interface LivestreamsViewProps {
  onNavigate: (screen: ScreenId) => void;
  scheduledStreams: ScheduledLivestream[];
  products: ProductItem[];
  onAddStream: (stream: ScheduledLivestream) => void;
  onDeleteStream: (streamId: string) => void;
}

export const LivestreamsView: React.FC<LivestreamsViewProps> = ({
  onNavigate,
  scheduledStreams,
  products,
  onAddStream,
  onDeleteStream,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State for New Livestream Wizard
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics & Gadgets');
  const [date, setDate] = useState('2026-08-25');
  const [time, setTime] = useState('19:00 EST');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([products[0]?.id, products[1]?.id].filter(Boolean));
  const [promoCode, setPromoCode] = useState('LIVEDROP20');
  const [discountValue, setDiscountValue] = useState('20% OFF');
  const [hasCountdown, setHasCountdown] = useState(true);
  const [cameraSource, setCameraSource] = useState('Sony A7IV (4K Main Cam)');
  const [micSource, setMicSource] = useState('Shure SM7B (XLR Audio Interface)');
  const [quality, setQuality] = useState('1080p 60fps (6,500 kbps)');
  const [thumbnailUrl, setThumbnailUrl] = useState(
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
  );
  const [isCopiedKey, setIsCopiedKey] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  const toggleProductSelection = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter((pId) => pId !== id));
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  const handleScheduleSubmit = () => {
    const newStream: ScheduledLivestream = {
      id: `stream-${Date.now()}`,
      title: title || 'Exclusive Flash Drop Shopping Special',
      description: description || 'Interactive livestream shopping broadcast with exclusive live discounts and instant checkout.',
      category,
      date,
      time,
      productIds: selectedProductIds,
      thumbnailPlaceholder: thumbnailUrl,
      chatEnabled: true,
      qaEnabled: true,
      recordStream: true,
      promoCode,
      discountValue,
      status: 'Upcoming',
    };

    onAddStream(newStream);
    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      setActiveTab('list');
      setStep(1);
    }, 1500);
  };

  const copyStreamKey = () => {
    setIsCopiedKey(true);
    setTimeout(() => setIsCopiedKey(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 space-y-6 select-none text-zinc-900 dark:text-white">
      {/* Header with Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Livestream Show Manager</h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
            Orchestrate upcoming live shopping events, configure drop queues, and launch Director Studio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('discover')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white border border-zinc-300 dark:border-zinc-800 text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Discover Streams</span>
          </button>

          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-300 dark:border-zinc-800">
            <button
              onClick={() => {
                setActiveTab('list');
                setStep(1);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'list'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Scheduled Shows ({scheduledStreams.length})
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule New Stream</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'list' ? (
        /* List View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {scheduledStreams.map((stream) => {
              const isLive = stream.status === 'Live';
              const queuedProducts = products.filter((p) => stream.productIds.includes(p.id));

              return (
                <div
                  key={stream.id}
                  className={`rounded-2xl overflow-hidden bg-zinc-900 border transition-all flex flex-col justify-between hover:border-zinc-700 ${
                    isLive ? 'border-red-500/50 ring-1 ring-red-500/30' : 'border-zinc-800'
                  }`}
                >
                  <div>
                    {/* Thumbnail banner */}
                    <div className="relative h-48 w-full bg-zinc-950 overflow-hidden group preserve-dark" data-theme-preserve="dark">
                      <img
                        src={stream.thumbnailPlaceholder || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'}
                        alt={stream.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                        {isLive ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow-lg animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-white" />
                            BROADCASTING LIVE
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-900/90 text-zinc-300 border border-zinc-700 backdrop-blur-md">
                            {stream.status}
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-zinc-300 backdrop-blur-md">
                          {stream.category}
                        </span>
                      </div>

                      {stream.promoCode && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-md z-10">
                          <Tag className="w-3.5 h-3.5" />
                          <span>{stream.promoCode} ({stream.discountValue})</span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-bold text-zinc-900 dark:text-white text-base line-clamp-1">{stream.title}</h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-1">{stream.description}</p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300 pt-2 border-t border-zinc-800">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{stream.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{stream.time}</span>
                        </div>
                      </div>

                      {/* Queued Drop Items Pills */}
                      <div className="pt-2 border-t border-zinc-800 space-y-1.5">
                        <div className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Queued Drops ({queuedProducts.length})</span>
                          <span className="text-blue-600 dark:text-blue-400">Synced</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {queuedProducts.map((p) => (
                            <span
                              key={p.id}
                              className="px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-700 dark:text-zinc-300 truncate max-w-[160px]"
                            >
                              {p.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 space-y-2">
                    {isLive && (
                      <button
                        onClick={() => onNavigate('viewer')}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 via-blue-600 to-teal-600 hover:from-red-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                      >
                        <Radio className="w-4 h-4 text-white animate-pulse" />
                        <span>Join Live Stream & Shop Drops</span>
                      </button>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onNavigate('studio')}
                        className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isLive
                            ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isLive ? 'Director Controls' : 'Launch Studio'}</span>
                      </button>

                      <button
                        onClick={() => onDeleteStream(stream.id)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
                        title="Delete stream schedule"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Multi-Step Livestream Setup Experience */
        <div className="max-w-4xl mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-6">
          {/* Step Indicator */}
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: 'Details' },
                { num: 2, label: 'Products' },
                { num: 3, label: 'Promotion' },
                { num: 4, label: 'Studio Setup' },
                { num: 5, label: 'Review' },
              ].map((s) => {
                const isCompleted = step > s.num;
                const isCurrent = step === s.num;
                return (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-blue-600 text-white ring-4 ring-blue-500/20'
                          : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span
                      className={`text-xs font-semibold hidden md:inline ${
                        isCurrent ? 'text-white' : isCompleted ? 'text-zinc-300' : 'text-zinc-500'
                      }`}
                    >
                      {s.label}
                    </span>
                    {s.num < 5 && <div className="w-8 lg:w-16 h-0.5 bg-zinc-800 hidden sm:block mx-1" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Wizard Content Steps */}
          {step === 1 && (
            /* Step 1: Details */
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Livestream Show Details</h3>
                <p className="text-xs text-zinc-400">Configure show title, category, broadcast time and cover art.</p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Livestream Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Mega Tech Friday: Unboxing 4K Drones & Pro Audio"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Broadcast Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the upcoming live drops, live demonstrations, and viewer Q&A rewards..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Electronics & Gadgets</option>
                      <option>Beauty & Skincare</option>
                      <option>Luxury Accessories</option>
                      <option>Workspace & Gaming</option>
                      <option>Fashion & Apparel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Start Time</label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="19:00 EST"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Cover Art / Thumbnail URL</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={thumbnailUrl}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                    <div className="w-20 h-11 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-950 shrink-0">
                      <img src={thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            /* Step 2: Product Selection */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Select Featured Product Drops</h3>
                  <p className="text-xs text-zinc-400">Choose catalogue items to pin and feature during this livestream.</p>
                </div>
                <span className="text-xs font-bold text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                  {selectedProductIds.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pt-2">
                {products.map((p) => {
                  const isSelected = selectedProductIds.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleProductSelection(p.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-950/40 border-blue-500/80 shadow-md shadow-blue-500/10'
                          : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-12 h-12 rounded-lg object-cover bg-zinc-900 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-xs truncate">{p.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-extrabold text-emerald-400">${p.salePrice}</span>
                            <span className="text-[10px] text-zinc-500 line-through">${p.originalPrice}</span>
                            <span className="text-[10px] text-zinc-400">• Stock: {p.stock}</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'border-zinc-700 bg-zinc-900 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            /* Step 3: Promotion & Flash Deals */
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Promotion & Live Flash Deals</h3>
                <p className="text-xs text-zinc-400">Set special in-stream voucher codes and urgency countdowns.</p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Live Promo Code</label>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="e.g. FLASH30"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono uppercase focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Discount Percentage / Value</label>
                    <input
                      type="text"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      placeholder="e.g. 25% OFF or $30 OFF"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Enable Limited-Time Flash Deal Timer</h4>
                      <p className="text-[11px] text-zinc-400">Shows an animated countdown timer above the featured product card</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasCountdown}
                      onChange={(e) => setHasCountdown(e.target.checked)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            /* Step 4: Studio Setup */
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Studio Gear & Encoder Config</h3>
                <p className="text-xs text-zinc-400">Select input hardware and stream encoding quality.</p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    <span>Primary Camera Input</span>
                  </label>
                  <select
                    value={cameraSource}
                    onChange={(e) => setCameraSource(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Sony A7IV (4K Main Cam)</option>
                    <option>Logitech Brio 4K HDR</option>
                    <option>Blackmagic Cinema Camera 6K (HDMI Ingest)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-2">
                    <Mic className="w-3.5 h-3.5 text-blue-400" />
                    <span>Microphone / Audio Source</span>
                  </label>
                  <select
                    value={micSource}
                    onChange={(e) => setMicSource(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Shure SM7B (XLR Audio Interface)</option>
                    <option>Rode Wireless PRO Dual Mic</option>
                    <option>Elgato Wave:3 USB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-blue-400" />
                    <span>Streaming Quality Preset</span>
                  </label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>1080p 60fps (6,500 kbps - Recommended)</option>
                    <option>4K 30fps (12,000 kbps - Ultra HD)</option>
                    <option>720p 60fps (4,000 kbps - Low Latency)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            /* Step 5: Final Review */
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Review & Confirm Show Broadcast</h3>
                <p className="text-xs text-zinc-400">Everything looks ready! Inspect your livestream parameters below.</p>
              </div>

              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <img
                    src={thumbnailUrl}
                    alt="Review"
                    className="w-full sm:w-48 h-28 rounded-lg object-cover border border-zinc-800"
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {category}
                    </span>
                    <h4 className="text-base font-bold text-white">{title || 'Untitled Stream'}</h4>
                    <p className="text-xs text-zinc-400">{description || 'No description provided'}</p>
                    <div className="text-xs text-blue-400 font-semibold pt-1">
                      📅 {date} at {time}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-zinc-800 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Featured Drops:</span>
                    <span className="font-bold text-white">{selectedProductIds.length} Items</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Promo Code:</span>
                    <span className="font-bold text-emerald-400">{promoCode} ({discountValue})</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Encoder Preset:</span>
                    <span className="font-bold text-white">1080p 60fps</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Audio Routing:</span>
                    <span className="font-bold text-white">Shure SM7B</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Banner */}
          {createdSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Livestream scheduled successfully! Launching in upcoming calendar...</span>
            </div>
          )}

          {/* Wizard Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as any)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('list')}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            {step < 5 ? (
              <button
                onClick={() => setStep((s) => (s + 1) as any)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/25 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleScheduleSubmit}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  onClick={handleScheduleSubmit}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Schedule Livestream</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
