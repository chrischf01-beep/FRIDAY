import React, { useState } from 'react';
import { SystemMetrics } from '../types';
import { 
  Wifi, 
  Volume2, 
  VolumeX, 
  Lock, 
  Power, 
  FileText, 
  Code2, 
  Sparkles, 
  Radio, 
  ExternalLink,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

interface TelemetryRightProps {
  metrics: SystemMetrics;
  onQuickCommand: (cmd: string) => void;
  onOpenPythonModal: () => void;
  onOpenDocModal: () => void;
  onOpenDiagnostics: () => void;
  onPowerAction: (action: 'lock' | 'restart' | 'shutdown') => void;
}

export const TelemetryRight: React.FC<TelemetryRightProps> = ({
  metrics,
  onQuickCommand,
  onOpenPythonModal,
  onOpenDocModal,
  onOpenDiagnostics,
  onPowerAction
}) => {
  const [masterVolume, setMasterVolume] = useState<number>(75);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleVolumeChange = (newVal: number) => {
    setMasterVolume(newVal);
    if (newVal === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
    onQuickCommand(`Set system volume to ${newVal}%`);
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    onQuickCommand(next ? "Mute audio" : "Unmute audio");
  };

  return (
    <div className="flex flex-col space-y-3.5 h-full select-none">
      {/* 1. Network & Subspace Radar Link */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/25 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-2">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-chakra text-xs font-bold text-cyan-200 tracking-wider">
              UPLINK & RADAR FREQUENCY
            </span>
          </div>
          <span className="font-mono-hud text-[10px] text-cyan-400">
            {metrics.networkPingMs} MS
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono-hud">
          <div className="flex items-center space-x-1.5 bg-slate-900/60 p-2 rounded border border-cyan-950">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400">DOWNLINK</div>
              <div className="text-cyan-200 font-bold">{metrics.networkDownMbps} Mbps</div>
            </div>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-900/60 p-2 rounded border border-cyan-950">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <div>
              <div className="text-[10px] text-slate-400">UPLINK</div>
              <div className="text-cyan-200 font-bold">{metrics.networkUpMbps} Mbps</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Audio Endpoint & Master Volume Controller */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/25 backdrop-blur-md space-y-2">
        <div className="flex items-center justify-between text-xs border-b border-cyan-500/20 pb-1.5">
          <span className="font-chakra text-xs font-semibold text-cyan-200 flex items-center space-x-1.5">
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span>AUDIO BUS MIXER</span>
          </span>
          <button 
            onClick={toggleMute}
            className="font-mono-hud text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 hover:text-white border border-cyan-500/30 transition-colors"
          >
            {isMuted ? "UNMUTE" : "MUTE"}
          </button>
        </div>

        <div className="flex items-center space-x-3 pt-1">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={isMuted ? 0 : masterVolume} 
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg cursor-pointer"
          />
          <span className="font-mono-hud text-xs text-cyan-300 w-10 text-right">
            {isMuted ? 0 : masterVolume}%
          </span>
        </div>
      </div>

      {/* 3. System Quick Automation Dispatcher */}
      <div className="flex-1 p-3 rounded-xl bg-slate-950/80 border border-cyan-500/25 backdrop-blur-md flex flex-col min-h-0">
        <div className="flex items-center justify-between text-xs border-b border-cyan-500/20 pb-2 mb-2">
          <div className="flex items-center space-x-1.5 text-cyan-300 font-chakra font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMAND SHORTCUTS</span>
          </div>
          <span className="font-mono-hud text-[10px] text-slate-400">INSTANT DISPATCH</span>
        </div>

        <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1">
          <button
            onClick={() => onQuickCommand("Open Google Chrome")}
            className="p-2 rounded bg-slate-900/80 hover:bg-cyan-950/60 border border-cyan-950 hover:border-cyan-500/50 text-left transition-all group"
          >
            <div className="font-chakra text-xs font-bold text-cyan-200 group-hover:text-cyan-400 flex items-center justify-between">
              <span>Launch Chrome</span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="font-mono-hud text-[10px] text-slate-400 mt-0.5">start chrome</div>
          </button>

          <button
            onClick={() => onQuickCommand("Open Notepad")}
            className="p-2 rounded bg-slate-900/80 hover:bg-cyan-950/60 border border-cyan-950 hover:border-cyan-500/50 text-left transition-all group"
          >
            <div className="font-chakra text-xs font-bold text-cyan-200 group-hover:text-cyan-400 flex items-center justify-between">
              <span>Open Notepad</span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="font-mono-hud text-[10px] text-slate-400 mt-0.5">notepad.exe</div>
          </button>

          <button
            onClick={() => onQuickCommand("Check CPU and RAM usage")}
            className="p-2 rounded bg-slate-900/80 hover:bg-cyan-950/60 border border-cyan-950 hover:border-cyan-500/50 text-left transition-all group"
          >
            <div className="font-chakra text-xs font-bold text-cyan-200 group-hover:text-cyan-400 flex items-center justify-between">
              <span>Check CPU & RAM</span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="font-mono-hud text-[10px] text-slate-400 mt-0.5">Get-Counter \Process</div>
          </button>

          <button
            onClick={() => onQuickCommand("Open Spotify")}
            className="p-2 rounded bg-slate-900/80 hover:bg-cyan-950/60 border border-cyan-950 hover:border-cyan-500/50 text-left transition-all group"
          >
            <div className="font-chakra text-xs font-bold text-cyan-200 group-hover:text-cyan-400 flex items-center justify-between">
              <span>Open Spotify</span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="font-mono-hud text-[10px] text-slate-400 mt-0.5">spotify:</div>
          </button>

          <button
            onClick={onOpenDocModal}
            className="p-2 rounded bg-slate-900/80 hover:bg-cyan-950/60 border border-cyan-950 hover:border-cyan-500/50 text-left transition-all group"
          >
            <div className="font-chakra text-xs font-bold text-cyan-200 group-hover:text-cyan-400 flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <FileText className="w-3 h-3 text-cyan-400" />
                <span>Create Doc / Sheet</span>
              </span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="font-mono-hud text-[10px] text-slate-400 mt-0.5">Word & Excel Export</div>
          </button>

          <button
            onClick={onOpenDiagnostics}
            className="p-2 rounded bg-slate-900/80 hover:bg-cyan-950/60 border border-cyan-950 hover:border-cyan-500/50 text-left transition-all group"
          >
            <div className="font-chakra text-xs font-bold text-cyan-200 group-hover:text-cyan-400 flex items-center justify-between">
              <span>Troubleshoot Error</span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="font-mono-hud text-[10px] text-slate-400 mt-0.5">BSOD & Log Fixes</div>
          </button>
        </div>

        {/* 4. Windows Power & Python Code Export */}
        <div className="mt-auto pt-3 border-t border-cyan-500/20 space-y-2">
          {/* View Python Desktop Source Code button */}
          <button
            onClick={onOpenPythonModal}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,255,255,0.3)] transition-all group"
          >
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <div className="text-left">
                <div className="font-chakra text-xs font-bold text-cyan-100">
                  Python Desktop App Files
                </div>
                <div className="font-mono-hud text-[10px] text-cyan-400/80">
                  PyQt6 + Brain + Voice + UI source
                </div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Quick Power Controls */}
          <div className="grid grid-cols-3 gap-1.5 font-chakra text-xs">
            <button
              onClick={() => onPowerAction('lock')}
              className="py-1.5 px-2 rounded bg-slate-900 hover:bg-slate-800 border border-cyan-900 hover:border-cyan-500 text-cyan-300 flex items-center justify-center space-x-1 transition-colors"
              title="Lock Windows PC"
            >
              <Lock className="w-3 h-3" />
              <span>LOCK</span>
            </button>
            <button
              onClick={() => onPowerAction('restart')}
              className="py-1.5 px-2 rounded bg-slate-900 hover:bg-slate-800 border border-amber-900 hover:border-amber-500 text-amber-300 flex items-center justify-center space-x-1 transition-colors"
              title="Restart Computer (Warning confirmation)"
            >
              <RefreshCw className="w-3 h-3" />
              <span>RESTART</span>
            </button>
            <button
              onClick={() => onPowerAction('shutdown')}
              className="py-1.5 px-2 rounded bg-slate-900 hover:bg-slate-800 border border-rose-900 hover:border-rose-500 text-rose-300 flex items-center justify-center space-x-1 transition-colors"
              title="Shutdown Computer (High-risk confirmation)"
            >
              <Power className="w-3 h-3" />
              <span>POWER</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
