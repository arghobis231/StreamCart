import React, { useState, useRef } from 'react';
import {
  Camera,
  Mic,
  Video,
  Key,
  CreditCard,
  Bell,
  Shield,
  Copy,
  Check,
  Save,
  Radio,
  Sliders,
  CheckCircle2,
  Moon,
  Sun,
  Palette,
  Monitor,
  Sparkles,
  User,
  Upload,
  Image as ImageIcon,
  Mail,
  AtSign,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { ScreenId, UserProfile } from '../types';

interface SettingsViewProps {
  onNavigate: (screen: ScreenId) => void;
  userProfile?: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
  onUploadAvatar?: (file: File) => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: (theme: 'dark' | 'light') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onNavigate,
  userProfile,
  onUpdateProfile,
  onUploadAvatar,
  theme = 'dark',
  onToggleTheme,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedServer, setCopiedServer] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile states
  const [name, setName] = useState(userProfile?.name || 'Argho Biswas');
  const [username, setUsername] = useState(userProfile?.username || '@arghobiswas');
  const [email, setEmail] = useState(userProfile?.email || 'arghobiswas144@gmail.com');
  const [bio, setBio] = useState(
    userProfile?.bio || 'Live Commerce Director & Producer • Interactive Flash Drops Specialist'
  );
  const [avatarUrl, setAvatarUrl] = useState(
    userProfile?.avatarUrl ||
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80'
  );

  // Hardware & broadcast states
  const [resolution, setResolution] = useState('1080p 60fps');
  const [bitrate, setBitrate] = useState('6500 kbps');
  const [camera, setCamera] = useState('Sony A7IV (4K Main Cam)');
  const [microphone, setMicrophone] = useState('Shure SM7B (XLR Audio Interface)');
  const [payoutBank, setPayoutBank] = useState('Chase Bank •••• 8842');
  const [payoutSchedule, setPayoutSchedule] = useState('Daily Automated');

  const streamServer = 'rtmp://ingest.streamcart.live/live';
  const streamKey = 'live_sc_9984729103847592_sec_key_xyz';

  // Preset Avatar Options
  const presetAvatars = [
    {
      label: 'Professional Dark',
      url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    },
    {
      label: 'Creative Studio',
      url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80',
    },
    {
      label: 'Modern Tech',
      url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    },
    {
      label: 'Executive',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const handleAvatarFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setAvatarUrl(result);
        }
      };
      reader.readAsDataURL(file);

      if (onUploadAvatar) {
        onUploadAvatar(file);
      }
    }
  };

  const copyToClipboard = (text: string, type: 'key' | 'server') => {
    navigator.clipboard?.writeText(text);
    if (type === 'key') {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedServer(true);
      setTimeout(() => setCopiedServer(false), 2000);
    }
  };

  const handleSave = () => {
    const updatedProfile: UserProfile = {
      name,
      username: username.startsWith('@') ? username : `@${username}`,
      email,
      bio,
      avatarUrl,
      role: 'Broadcaster & Lead Host',
    };

    if (onUpdateProfile) {
      onUpdateProfile(updatedProfile);
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 space-y-6 select-none max-w-5xl mx-auto">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarFileSelect}
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Studio & Broadcaster Settings</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage creator profile, custom photo, studio theme, RTMP streaming ingest keys, and hardware routing.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 transition-all active:scale-95 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Profile changes and studio preferences updated successfully!</span>
        </div>
      )}

      {/* 1. Creator Profile & Custom Photo Upload Section */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-white">
            <User className="w-4 h-4 text-blue-400" />
            <span>Broadcaster Profile & Identity</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Verified Creator Partner
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Avatar Preview & Upload Area */}
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-3 bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
            <div className="relative group">
              <img
                src={avatarUrl}
                alt={name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-teal-500/40 shadow-xl"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[11px] font-bold transition-all cursor-pointer"
              >
                <Camera className="w-5 h-5 mb-1" />
                <span>Upload</span>
              </button>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-zinc-950" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">{name}</h4>
              <p className="text-xs text-zinc-400">{username}</p>
            </div>

            <div className="w-full space-y-2 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Custom Photo</span>
              </button>

              <div className="text-[10px] text-zinc-500">
                Supports JPG, PNG, WEBP up to 10MB
              </div>
            </div>

            {/* Preset Avatars */}
            <div className="w-full pt-3 border-t border-zinc-800 text-left">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-2">
                Or Choose Preset Avatar:
              </span>
              <div className="flex justify-center gap-2">
                {presetAvatars.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarUrl(preset.url)}
                    className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                      avatarUrl === preset.url ? 'border-teal-400 scale-110' : 'border-zinc-700 opacity-60 hover:opacity-100'
                    }`}
                    title={preset.label}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Form Fields */}
          <div className="md:col-span-8 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Full Host Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Argho Biswas"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1.5 flex items-center gap-1.5">
                  <AtSign className="w-3.5 h-3.5 text-teal-400" />
                  <span>Username / Handle</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@arghobiswas"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Account & Receipt Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="arghobiswas144@gmail.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Channel Bio & Producer Tagline</span>
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your channel, specialty drops, and schedule..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Theme & Appearance Section */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Palette className="w-4 h-4 text-teal-400" />
            <span>Theme & Display Mode</span>
          </div>
          <span className="text-[11px] font-semibold text-zinc-400">
            Active Mode: <strong className="text-teal-400 capitalize">{theme === 'light' ? 'General Mode' : 'Studio Dark Mode'}</strong>
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          Switch between Studio Dark mode optimized for live broadcast controls and General mode for clean, everyday storefront browsing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Dark Mode Card */}
          <div
            onClick={() => onToggleTheme?.('dark')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between gap-4 ${
              theme === 'dark'
                ? 'bg-zinc-950 border-teal-500 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/20'
                : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-teal-400">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    Studio Dark Mode
                    {theme === 'dark' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        Active
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Midnight obsidian environment engineered for live multi-cam switching and low glare.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Swatch Preview */}
            <div className="w-full h-12 rounded-xl bg-zinc-900 border border-zinc-800 p-2 flex items-center gap-2">
              <div className="w-1/3 h-full rounded-md bg-zinc-950 border border-zinc-800" />
              <div className="w-1/3 h-full rounded-md bg-blue-600/30 border border-blue-500/40" />
              <div className="w-1/3 h-full rounded-md bg-emerald-500/20 border border-emerald-500/30" />
            </div>
          </div>

          {/* General Mode Card */}
          <div
            onClick={() => onToggleTheme?.('light')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between gap-4 ${
              theme === 'light'
                ? 'bg-zinc-950 border-teal-500 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/20'
                : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    General Mode
                    {theme === 'light' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-600 border border-amber-500/30">
                        Active
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Crisp, modern, and user-friendly interface with crystal-clear typography and high-contrast styling.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Swatch Preview */}
            <div className="w-full h-12 rounded-xl bg-slate-100 border border-slate-300 p-2 flex items-center gap-2">
              <div className="w-1/3 h-full rounded-md bg-white border border-slate-300" />
              <div className="w-1/3 h-full rounded-md bg-blue-500/20 border border-blue-400" />
              <div className="w-1/3 h-full rounded-md bg-emerald-500/20 border border-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Stream Keys & RTMP Ingest Section */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Key className="w-4 h-4 text-blue-400" />
          <span>Live Stream Ingest & RTMP Keys</span>
        </div>
        <p className="text-xs text-zinc-400">
          Use these credentials in OBS Studio, vMix, Wirecast, or your hardware video encoder.
        </p>

        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Server URL / RTMP Ingest</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={streamServer}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-300 font-mono"
              />
              <button
                onClick={() => copyToClipboard(streamServer, 'server')}
                className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedServer ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedServer ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Stream Key (Keep Private)</label>
            <div className="flex gap-2">
              <input
                type="password"
                readOnly
                value={streamKey}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-300 font-mono"
              />
              <button
                onClick={() => copyToClipboard(streamKey, 'key')}
                className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Video & Audio Hardware Setup */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Camera className="w-4 h-4 text-teal-400" />
          <span>Hardware & Encoding Preferences</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Primary Camera Device</label>
            <select
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option>Sony A7IV (4K Main Cam)</option>
              <option>Logitech Brio 4K HDR</option>
              <option>Blackmagic Cinema Camera 6K (HDMI)</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Microphone Input</label>
            <select
              value={microphone}
              onChange={(e) => setMicrophone(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option>Shure SM7B (XLR Audio Interface)</option>
              <option>Rode Wireless PRO Dual Mic</option>
              <option>Elgato Wave:3 USB</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Broadcast Resolution</label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option>1080p 60fps (Full HD 60)</option>
              <option>4K 30fps (Ultra HD)</option>
              <option>720p 60fps (Low Latency)</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Target Video Bitrate</label>
            <select
              value={bitrate}
              onChange={(e) => setBitrate(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option>6500 kbps (Recommended)</option>
              <option>8500 kbps (High Fidelity)</option>
              <option>4500 kbps (Stable Mobile)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. Payout & Banking Integration */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Store Payout & Revenue Deposits</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Stripe Connected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Bank Deposit Account</label>
            <input
              type="text"
              value={payoutBank}
              onChange={(e) => setPayoutBank(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Deposit Frequency</label>
            <select
              value={payoutSchedule}
              onChange={(e) => setPayoutSchedule(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option>Daily Automated (Instant Next-Day)</option>
              <option>Weekly on Mondays</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
