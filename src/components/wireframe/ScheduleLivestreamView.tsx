import React, { useState } from 'react';
import {
  ScreenId,
  ProductItem,
  ScheduledLivestream,
} from '../../types';
import {
  Calendar,
  Clock,
  Package,
  Upload,
  Tag,
  MessageSquare,
  HelpCircle,
  Video,
  Check,
  ArrowLeft,
  Play,
  Save,
  X,
} from 'lucide-react';
import { WireframeBox, WireframeButton, WireframeBadge, WireframeCard } from './WireframeUI';

interface ScheduleLivestreamViewProps {
  onNavigate: (screen: ScreenId) => void;
  products: ProductItem[];
  onScheduleStream: (stream: ScheduledLivestream) => void;
}

export const ScheduleLivestreamView: React.FC<ScheduleLivestreamViewProps> = ({
  onNavigate,
  products,
  onScheduleStream,
}) => {
  const [title, setTitle] = useState('Mega Tech Friday: Unboxing 4K Drones & Pro Studio Gear');
  const [description, setDescription] = useState('Exclusive live product drops, flash coupons, live Q&A demos, and mystery gift giveaways with creator Sarah Connor.');
  const [date, setDate] = useState('2026-08-18');
  const [time, setTime] = useState('18:00 EST');
  const [category, setCategory] = useState('Electronics & Gadgets');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(['prod-1', 'prod-2', 'prod-3']);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [qaEnabled, setQaEnabled] = useState(true);
  const [recordStream, setRecordStream] = useState(true);
  const [promoCode, setPromoCode] = useState('TECHLIVE25');
  const [discountValue, setDiscountValue] = useState('25% OFF');

  const toggleProduct = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter((p) => p !== id));
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  const handleSave = (status: 'Upcoming' | 'Draft' | 'Live' | 'Completed' = 'Upcoming', navigateTo: ScreenId = 'dashboard') => {
    const newStream: ScheduledLivestream = {
      id: `stream-${Date.now()}`,
      title,
      description,
      date,
      time,
      category,
      productIds: selectedProductIds,
      thumbnailPlaceholder: `[ THUMBNAIL: ${title.slice(0, 20)}... ]`,
      chatEnabled,
      qaEnabled,
      recordStream,
      promoCode,
      discountValue,
      status,
    };
    onScheduleStream(newStream);
    onNavigate(navigateTo);
  };

  return (
    <div className="flex-1 bg-zinc-100 min-h-screen p-4 md:p-6 font-mono text-zinc-900 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-1.5 rounded border border-zinc-400 bg-white hover:bg-zinc-200"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase">Schedule New Livestream</h1>
              <p className="text-xs text-zinc-600">Configure show details, product drops, audience controls, and promotions</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <WireframeButton variant="outline" size="md" onClick={() => onNavigate('dashboard')} icon={<X className="w-3.5 h-3.5" />}>
              Cancel
            </WireframeButton>
            <WireframeButton variant="secondary" size="md" onClick={() => handleSave('Draft')} icon={<Save className="w-3.5 h-3.5" />}>
              Save Draft
            </WireframeButton>
            <WireframeButton
              variant="primary"
              size="md"
              onClick={() => handleSave('Upcoming')}
              icon={<Calendar className="w-3.5 h-3.5" />}
            >
              Schedule Livestream
            </WireframeButton>
          </div>
        </div>

        {/* Two-Column Form Layout: Left = Inputs, Right = Live Thumbnail Card Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2-Cols: Main Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Basic Info */}
            <WireframeCard title="1. Livestream Details" subtitle="Title, description, and broadcast categorization">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 uppercase mb-1">
                    Livestream Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Mega Summer Tech Drop & Live Flash Sale"
                    className="w-full bg-white border-2 border-zinc-700 rounded px-3 py-2 text-xs font-mono font-medium focus:outline-hidden focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 uppercase mb-1">
                    Livestream Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell your viewers what to expect in this live shopping broadcast..."
                    className="w-full bg-white border-2 border-zinc-700 rounded px-3 py-2 text-xs font-mono font-medium focus:outline-hidden focus:border-zinc-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase mb-1">
                      Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white border-2 border-zinc-700 rounded px-3 py-2 text-xs font-mono focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase mb-1">
                      Start Time <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="18:00 EST"
                      className="w-full bg-white border-2 border-zinc-700 rounded px-3 py-2 text-xs font-mono focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border-2 border-zinc-700 rounded px-3 py-2 text-xs font-mono focus:outline-hidden"
                    >
                      <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                      <option value="Beauty & Skincare">Beauty & Skincare</option>
                      <option value="Luxury Accessories">Luxury Accessories</option>
                      <option value="Workspace & Gaming">Workspace & Gaming</option>
                      <option value="Fashion & Apparel">Fashion & Apparel</option>
                    </select>
                  </div>
                </div>
              </div>
            </WireframeCard>

            {/* 2. Select Products for Stream */}
            <WireframeCard
              title="2. Select Products for Livestream"
              subtitle={`Select which catalogue items will be featured during the show (${selectedProductIds.length} selected)`}
              headerAction={
                <WireframeButton size="sm" variant="outline" onClick={() => onNavigate('products')}>
                  + Manage Catalogue
                </WireframeButton>
              }
            >
              <div className="space-y-2.5">
                {products.map((p) => {
                  const isChecked = selectedProductIds.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleProduct(p.id)}
                      className={`flex items-center justify-between p-2.5 rounded border-2 cursor-pointer transition-colors ${
                        isChecked ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-300 hover:border-zinc-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded border-zinc-400"
                        />
                        <WireframeBox
                          label="[ X ]"
                          className={`w-10 h-10 rounded shrink-0 ${isChecked ? 'bg-zinc-800 border-zinc-600' : ''}`}
                        />
                        <div>
                          <div className={`text-xs font-bold ${isChecked ? 'text-white' : 'text-zinc-900'}`}>
                            {p.title}
                          </div>
                          <div className={`text-[10px] ${isChecked ? 'text-zinc-300' : 'text-zinc-500'}`}>
                            SKU: {p.sku} • Stock: {p.stock} units left
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-xs font-black ${isChecked ? 'text-amber-400' : 'text-zinc-900'}`}>
                          ${p.salePrice}
                        </div>
                        <div className={`text-[10px] line-through ${isChecked ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          ${p.originalPrice}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </WireframeCard>

            {/* 3. Audience Controls & Promotional Offers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Audience Settings */}
              <WireframeCard title="3. Audience Controls" subtitle="Enable or disable live features">
                <div className="space-y-3 text-xs">
                  <label className="flex items-center justify-between p-2 border border-zinc-300 rounded bg-zinc-50">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-zinc-700" />
                      <div>
                        <div className="font-bold">Enable Live Chat</div>
                        <div className="text-[10px] text-zinc-500">Allow viewers to message in real time</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={chatEnabled}
                      onChange={(e) => setChatEnabled(e.target.checked)}
                      className="w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 border border-zinc-300 rounded bg-zinc-50">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-zinc-700" />
                      <div>
                        <div className="font-bold">Enable Q&A Mode</div>
                        <div className="text-[10px] text-zinc-500">Curate question queue for host cue</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={qaEnabled}
                      onChange={(e) => setQaEnabled(e.target.checked)}
                      className="w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 border border-zinc-300 rounded bg-zinc-50">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-zinc-700" />
                      <div>
                        <div className="font-bold">Record Stream Replay</div>
                        <div className="text-[10px] text-zinc-500">Save 1080p full VOD recording</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={recordStream}
                      onChange={(e) => setRecordStream(e.target.checked)}
                      className="w-4 h-4"
                    />
                  </label>
                </div>
              </WireframeCard>

              {/* Promotional Offer */}
              <WireframeCard title="4. Live Promotional Offer" subtitle="In-stream flash coupon code">
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">Coupon Code</label>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. FLASH25"
                      className="w-full bg-white border-2 border-zinc-700 rounded px-2.5 py-1.5 text-xs font-mono font-bold uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">Discount Amount</label>
                    <input
                      type="text"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      placeholder="25% OFF"
                      className="w-full bg-white border-2 border-zinc-700 rounded px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>

                  <div className="p-2 bg-amber-50 border border-amber-300 rounded text-[11px] text-amber-900">
                    ⚡ This promotional banner will automatically appear on the live video preview and viewer screens.
                  </div>
                </div>
              </WireframeCard>
            </div>
          </div>

          {/* Right Column: Thumbnail Upload & Live Stream Card Preview */}
          <div className="space-y-4">
            <WireframeCard title="Broadcast Thumbnail" subtitle="Upload placeholder or promotional banner">
              <div className="space-y-3">
                <WireframeBox
                  label="[ DRAG & DROP THUMBNAIL IMAGE ]"
                  sublabel="Recommended: 1920x1080 (16:9 Landscape)"
                  className="h-44 rounded-md border-zinc-500"
                >
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <WireframeButton size="sm" variant="outline" icon={<Upload className="w-3 h-3" />}>
                      Browse Files
                    </WireframeButton>
                  </div>
                </WireframeBox>
              </div>
            </WireframeCard>

            {/* Live Shopper Card Preview */}
            <WireframeCard title="Viewer Card Preview" subtitle="How this show will appear to shoppers">
              <div className="border-2 border-zinc-800 rounded bg-zinc-900 text-white p-3 space-y-3">
                <WireframeBox
                  label="[ PREVIEW: 16:9 LIVESTREAM THUMBNAIL ]"
                  className="h-28 rounded bg-zinc-800 border-zinc-700 text-zinc-300"
                />

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">{date} • {time}</span>
                  </div>
                  <h4 className="font-bold text-xs text-white mt-1 line-clamp-2">{title}</h4>
                  <p className="text-[10px] text-zinc-400 line-clamp-2 mt-1">{description}</p>
                </div>

                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px]">
                  <span className="text-amber-400 font-bold">🎁 {discountValue} ({promoCode})</span>
                  <span className="text-zinc-400">{selectedProductIds.length} Products</span>
                </div>
              </div>
            </WireframeCard>

            {/* Quick Launch CTA */}
            <div className="bg-zinc-900 text-white border-2 border-zinc-900 rounded p-4 text-center space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Ready to Go On Air?
              </div>
              <p className="text-[11px] text-zinc-300">
                Enter the 3-column Director Studio control room right now with these configured products.
              </p>
              <WireframeButton
                variant="danger"
                size="lg"
                className="w-full"
                icon={<Play className="w-4 h-4 fill-current" />}
                onClick={() => {
                  handleSave('Live', 'studio');
                }}
              >
                ENTER LIVE DIRECTOR STUDIO
              </WireframeButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
