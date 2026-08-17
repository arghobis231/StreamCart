import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/audioSynthesizer';
import {
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  Radio,
  Sliders,
  Flame,
  Award,
  Bell,
  Clock,
  Music,
  Mic,
  AlertOctagon,
  Layers,
} from 'lucide-react';

interface StreamDeckSoundboardProps {
  onTriggerConfetti: () => void;
  onTriggerQuickFlash: () => void;
  onTriggerCountdownBeep: () => void;
  onTriggerSoldOutAlert: () => void;
}

export const StreamDeckSoundboard: React.FC<StreamDeckSoundboardProps> = ({
  onTriggerConfetti,
  onTriggerQuickFlash,
  onTriggerCountdownBeep,
  onTriggerSoldOutAlert,
}) => {
  // Audio Mixer Faders (0 to 100)
  const [micVol, setMicVol] = useState(85);
  const [bgmVol, setBgmVol] = useState(45);
  const [sfxVol, setSfxVol] = useState(90);
  const [masterVol, setMasterVol] = useState(92);

  const [micMuted, setMicMuted] = useState(false);
  const [bgmMuted, setBgmMuted] = useState(false);

  // Simulated VU Meter Levels
  const [vuLevels, setVuLevels] = useState({ mic: 65, bgm: 35, sfx: 20, master: 70 });

  useEffect(() => {
    const interval = setInterval(() => {
      setVuLevels({
        mic: micMuted ? 0 : Math.min(100, Math.max(10, micVol * (0.7 + Math.random() * 0.4))),
        bgm: bgmMuted ? 0 : Math.min(100, Math.max(5, bgmVol * (0.8 + Math.random() * 0.3))),
        sfx: Math.min(100, Math.max(0, sfxVol * (Math.random() * 0.3))),
        master: Math.min(100, Math.max(15, masterVol * (0.75 + Math.random() * 0.3))),
      });
    }, 180);
    return () => clearInterval(interval);
  }, [micVol, bgmVol, sfxVol, masterVol, micMuted, bgmMuted]);

  return (
    <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl p-3.5 shadow-xl backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Col 1: Stream Deck Quick Macros */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-1.5">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-[11px] font-mono uppercase tracking-widest text-zinc-300">
            STREAM DECK MACROS
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 flex-1">
          <button
            onClick={() => {
              onTriggerQuickFlash();
              soundEngine.playAirhorn();
            }}
            className="p-2.5 rounded-xl bg-gradient-to-br from-red-600/30 to-amber-600/30 border border-red-500/50 hover:border-amber-400 text-left transition-all group active:scale-95 shadow-sm"
          >
            <div className="flex items-center justify-between mb-1">
              <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono bg-red-500/30 text-red-300 px-1 rounded">
                MACRO 1
              </span>
            </div>
            <div className="text-xs font-bold text-white leading-tight">⚡ 3-MIN FLASH SURGE</div>
            <div className="text-[10px] text-zinc-400">Trigger price drop & timer</div>
          </button>

          <button
            onClick={() => {
              onTriggerConfetti();
              soundEngine.playChaChing();
              soundEngine.playApplause();
            }}
            className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-600/30 to-teal-600/30 border border-emerald-500/50 hover:border-emerald-400 text-left transition-all group active:scale-95 shadow-sm"
          >
            <div className="flex items-center justify-between mb-1">
              <Sparkles className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono bg-emerald-500/30 text-emerald-300 px-1 rounded">
                MACRO 2
              </span>
            </div>
            <div className="text-xs font-bold text-white leading-tight">🎉 VIP CELEBRATION</div>
            <div className="text-[10px] text-zinc-400">Confetti + Cha-Ching + Clap</div>
          </button>

          <button
            onClick={() => {
              onTriggerCountdownBeep();
              soundEngine.playCountdownTick(true);
            }}
            className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600/30 to-teal-600/30 border border-blue-500/50 hover:border-teal-400 text-left transition-all group active:scale-95 shadow-sm"
          >
            <div className="flex items-center justify-between mb-1">
              <Clock className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono bg-blue-500/30 text-blue-300 px-1 rounded">
                MACRO 3
              </span>
            </div>
            <div className="text-xs font-bold text-white leading-tight">⏱️ 10S COUNTDOWN</div>
            <div className="text-[10px] text-zinc-400">Urgency audio tick pulse</div>
          </button>

          <button
            onClick={() => {
              onTriggerSoldOutAlert();
              soundEngine.playSoldOutGong();
            }}
            className="p-2.5 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-red-500 text-left transition-all group active:scale-95 shadow-sm"
          >
            <div className="flex items-center justify-between mb-1">
              <AlertOctagon className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono bg-zinc-800 text-zinc-400 px-1 rounded">
                MACRO 4
              </span>
            </div>
            <div className="text-xs font-bold text-white leading-tight">📦 SOLD OUT GONG</div>
            <div className="text-[10px] text-zinc-400">Lock inventory & strike gong</div>
          </button>
        </div>
      </div>

      {/* Col 2: Studio SFX Soundboard */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-1.5">
          <Volume2 className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-xs font-mono uppercase tracking-wider text-zinc-200">
            SOUNDBOARD SFX (WEB AUDIO)
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 flex-1">
          <button
            onClick={() => soundEngine.playChaChing()}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500 hover:bg-emerald-950/40 text-center transition-all active:scale-95 flex flex-col items-center justify-center gap-1 text-zinc-200"
          >
            <span className="text-xl">💰</span>
            <span className="text-[11px] font-bold">Cha-Ching</span>
          </button>

          <button
            onClick={() => soundEngine.playAirhorn()}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500 hover:bg-amber-950/40 text-center transition-all active:scale-95 flex flex-col items-center justify-center gap-1 text-zinc-200"
          >
            <span className="text-xl">📯</span>
            <span className="text-[11px] font-bold">Airhorn</span>
          </button>

          <button
            onClick={() => soundEngine.playApplause()}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-teal-500 hover:bg-teal-950/40 text-center transition-all active:scale-95 flex flex-col items-center justify-center gap-1 text-zinc-200"
          >
            <span className="text-xl">👏</span>
            <span className="text-[11px] font-bold">Applause</span>
          </button>

          <button
            onClick={() => soundEngine.playCountdownTick(true)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-500 hover:bg-blue-950/40 text-center transition-all active:scale-95 flex flex-col items-center justify-center gap-1 text-zinc-200"
          >
            <span className="text-xl">⏲️</span>
            <span className="text-[11px] font-bold">Tick Pulse</span>
          </button>

          <button
            onClick={() => soundEngine.playChime()}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500 hover:bg-cyan-950/40 text-center transition-all active:scale-95 flex flex-col items-center justify-center gap-1 text-zinc-200"
          >
            <span className="text-xl">🔔</span>
            <span className="text-[11px] font-bold">VIP Chime</span>
          </button>

          <button
            onClick={() => soundEngine.playSoldOutGong()}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500 hover:bg-red-950/40 text-center transition-all active:scale-95 flex flex-col items-center justify-center gap-1 text-zinc-200"
          >
            <span className="text-xl">🥁</span>
            <span className="text-[11px] font-bold">Gong Drum</span>
          </button>
        </div>
      </div>

      {/* Col 3: Audio Mixer & Real-Time VU Meters */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-1.5">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-xs font-mono uppercase tracking-wider text-zinc-200">
            STUDIO AUDIO MIXER
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 flex-1 items-end bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800/80">
          {/* Channel 1: Host Mic */}
          <div className="flex flex-col items-center gap-1.5">
            {/* VU Meter Bar */}
            <div className="w-3 h-20 bg-zinc-950 rounded-full overflow-hidden p-0.5 flex flex-col justify-end border border-zinc-800">
              <div
                className={`w-full rounded-full transition-all duration-150 ${
                  vuLevels.mic > 85 ? 'bg-red-500' : vuLevels.mic > 65 ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
                style={{ height: `${vuLevels.mic}%` }}
              />
            </div>
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`p-1 rounded text-[10px] ${
                micMuted ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-300'
              }`}
              title="Mute/Unmute Host Lapel"
            >
              <Mic className="w-3 h-3" />
            </button>
            <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">HOST</span>
          </div>

          {/* Channel 2: Ambient BGM */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-3 h-20 bg-zinc-950 rounded-full overflow-hidden p-0.5 flex flex-col justify-end border border-zinc-800">
              <div
                className="w-full rounded-full bg-cyan-500 transition-all duration-150"
                style={{ height: `${vuLevels.bgm}%` }}
              />
            </div>
            <button
              onClick={() => setBgmMuted(!bgmMuted)}
              className={`p-1 rounded text-[10px] ${
                bgmMuted ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-300'
              }`}
              title="Mute/Unmute BGM"
            >
              <Music className="w-3 h-3" />
            </button>
            <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">BGM</span>
          </div>

          {/* Channel 3: SFX */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-3 h-20 bg-zinc-950 rounded-full overflow-hidden p-0.5 flex flex-col justify-end border border-zinc-800">
              <div
                className="w-full rounded-full bg-teal-500 transition-all duration-150"
                style={{ height: `${vuLevels.sfx}%` }}
              />
            </div>
            <div className="p-1 rounded bg-zinc-800 text-zinc-400">
              <Volume2 className="w-3 h-3" />
            </div>
            <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">SFX</span>
          </div>

          {/* Channel 4: Master PGM Out */}
          <div className="flex flex-col items-center gap-1.5 border-l border-zinc-800 pl-1">
            <div className="w-3.5 h-20 bg-zinc-950 rounded-full overflow-hidden p-0.5 flex flex-col justify-end border border-zinc-700">
              <div
                className={`w-full rounded-full transition-all duration-150 ${
                  vuLevels.master > 85 ? 'bg-red-500' : 'bg-emerald-400'
                }`}
                style={{ height: `${vuLevels.master}%` }}
              />
            </div>
            <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Radio className="w-3 h-3" />
            </div>
            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase">PGM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
