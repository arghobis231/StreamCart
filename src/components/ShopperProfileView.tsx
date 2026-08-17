import React, { useState, useRef } from 'react';
import {
  User,
  Mail,
  Camera,
  MapPin,
  CreditCard,
  Bell,
  Sparkles,
  ShieldCheck,
  Heart,
  Package,
  Users,
  CheckCircle2,
  Sliders,
  Radio,
  ArrowRight,
  Plus,
  Trash2,
  Edit2,
  Tv,
} from 'lucide-react';
import { UserProfile, ScreenId, AppMode } from '../types';

interface ShopperProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onUploadAvatar?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | ((file: File) => void);
  onSwitchMode?: (mode: AppMode) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ShopperProfileView: React.FC<ShopperProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  onUploadAvatar,
  onSwitchMode,
  onNavigate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [username, setUsername] = useState(userProfile.username);
  const [email, setEmail] = useState(userProfile.email);
  const [bio, setBio] = useState(userProfile.bio);

  const [liveDropAlerts, setLiveDropAlerts] = useState(true);
  const [priceDropAlerts, setPriceDropAlerts] = useState(true);
  const [orderPushAlerts, setOrderPushAlerts] = useState(true);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (typeof onUploadAvatar === 'function') {
      try {
        (onUploadAvatar as any)(file);
      } catch {
        (onUploadAvatar as any)(e);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, username, email, bio });
    setIsEditing(false);
    setSavedNotification('Profile details updated successfully');
    setTimeout(() => setSavedNotification(null), 3500);
  };

  const triggerNotification = (msg: string) => {
    setSavedNotification(msg);
    setTimeout(() => setSavedNotification(null), 3500);
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 text-white overflow-y-auto min-h-0 text-left">
      {/* Top Banner */}
      <div className="bg-zinc-900/60 border-b border-zinc-800/80 px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase">
                Shopper Account
              </span>
              <span className="text-xs text-zinc-400 font-semibold">• VIP Member</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Profile & Preferences
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Manage your delivery addresses, payment methods, live notifications, and creator subscriptions.
            </p>
          </div>

          {/* Quick Switch to Creator Mode */}
          <button
            onClick={() => onSwitchMode('creator')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all self-start sm:self-auto cursor-pointer"
          >
            <Tv className="w-4 h-4" />
            <span>Switch to Creator Studio</span>
          </button>
        </div>
      </div>

      {/* Main Form & Cards */}
      <div className="max-w-5xl mx-auto w-full px-6 py-6 space-y-6">
        {savedNotification && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-between text-xs font-bold animate-fade-in shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{savedNotification}</span>
            </div>
            <button onClick={() => setSavedNotification(null)} className="text-emerald-500 hover:underline cursor-pointer">
              Dismiss
            </button>
          </div>
        )}

        {/* Profile Identity Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-500 shadow-md"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer"
                >
                  <Camera className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold">Change</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{userProfile.name}</h2>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-extrabold uppercase">
                    Shopper VIP
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">{userProfile.username} • {userProfile.email}</p>
                <p className="text-xs text-zinc-300 mt-1.5 font-medium">{userProfile.bio}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800/80 text-center">
            <div
              onClick={() => onNavigate('following')}
              className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors"
            >
              <div className="text-lg font-black text-white">{userProfile.followingCount || 6}</div>
              <div className="text-[11px] text-zinc-400 font-semibold flex items-center justify-center gap-1">
                <Users className="w-3 h-3 text-purple-400" />
                <span>Following</span>
              </div>
            </div>

            <div
              onClick={() => onNavigate('wishlist')}
              className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors"
            >
              <div className="text-lg font-black text-rose-400">{userProfile.wishlistCount || 3}</div>
              <div className="text-[11px] text-zinc-400 font-semibold flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 text-rose-400" />
                <span>Wishlist</span>
              </div>
            </div>

            <div
              onClick={() => onNavigate('my-orders')}
              className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors"
            >
              <div className="text-lg font-black text-emerald-400">{userProfile.ordersCount || 3}</div>
              <div className="text-[11px] text-zinc-400 font-semibold flex items-center justify-center gap-1">
                <Package className="w-3 h-3 text-emerald-400" />
                <span>Orders</span>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <form onSubmit={handleSave} className="pt-4 border-t border-zinc-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 mb-1 block">Username Handle</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 mb-1 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 mb-1 block">Shopper Bio / Interests</label>
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow"
                >
                  Save Profile
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Shipping Addresses & Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Shipping Addresses */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Shipping Addresses</h3>
              </div>
              <button
                onClick={() => setSavedNotification('Address book updated successfully')}
                className="text-xs text-blue-500 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Address</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Default Shipping (Home)</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-500 text-[10px] font-extrabold">DEFAULT</span>
              </div>
              <p className="text-xs text-zinc-300 font-semibold">Argho Biswas</p>
              <p className="text-xs text-zinc-400">742 Broadway Avenue, Suite 1204</p>
              <p className="text-xs text-zinc-400">San Francisco, CA 94103 • United States</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-white">Saved Payment Methods</h3>
              </div>
              <button
                onClick={() => setSavedNotification('Payment method setup opened')}
                className="text-xs text-emerald-500 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Method</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-6 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white">
                    Pay
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Apple Pay Default</div>
                    <div className="text-[10px] text-zinc-400">Expires 08/29</div>
                  </div>
                </div>
                <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold">PRIMARY</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-6 rounded bg-blue-900/80 flex items-center justify-center text-[10px] font-black text-white">
                    VISA
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Visa ending in 4242</div>
                    <div className="text-[10px] text-zinc-400">Expires 11/28</div>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications & Live Alert Preferences */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Live Stream & Price Alert Notifications</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
              <div>
                <div className="text-xs font-bold text-white">Creator Live Broadcast Alerts</div>
                <div className="text-[11px] text-zinc-400">Get notified the instant creators you follow go live with drops</div>
              </div>
              <input
                type="checkbox"
                checked={liveDropAlerts}
                onChange={(e) => setLiveDropAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-zinc-900 border-zinc-700 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
              <div>
                <div className="text-xs font-bold text-white">Wishlist Price Drop & Limited Stock Alerts</div>
                <div className="text-[11px] text-zinc-400">Alert me when saved items are discounted on stream or near sold out</div>
              </div>
              <input
                type="checkbox"
                checked={priceDropAlerts}
                onChange={(e) => setPriceDropAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-zinc-900 border-zinc-700 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
              <div>
                <div className="text-xs font-bold text-white">Order Shipment & Delivery Updates</div>
                <div className="text-[11px] text-zinc-400">Real-time status alerts for purchases placed during streams</div>
              </div>
              <input
                type="checkbox"
                checked={orderPushAlerts}
                onChange={(e) => setOrderPushAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-zinc-900 border-zinc-700 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
