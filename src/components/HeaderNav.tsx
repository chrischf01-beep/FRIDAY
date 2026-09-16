import React, { useState, useEffect } from 'react';
import { 
  Power, 
  Code2, 
  FileText, 
  Activity, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Radio, 
  Terminal,
  ShieldCheck,
  Zap,
  Bot,
  HelpCircle
} from 'lucide-react';

interface HeaderNavProps {
  onOpenPythonModal: () => void;
  onOpenDocModal: () => void;
  onOpenDiagnostics: () => void;
  onOpenAutostartModal: () => void;
  onOpenQuickStart: () => void;
  onOpenVSCodeWebStudio: () => void;
  onOpenDesktopAppModal: () => void;
  onOpenRPAModal: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  aiConnected: boolean;
  bossName?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenPythonModal,
  onOpenDocModal,
  onOpenDiagnostics,
  onOpenAutostartModal,
  onOpenQuickStart,
  onOpenVSCodeWebStudio,
  onOpenDesktopAppModal,
  onOpenRPAModal,
  voiceEnabled,
  onToggleVoice,
  aiConnected,
  bossName = "Boss Chris"
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="h-14 px-4 sm:px-6 bg-slate-950/90 border-b border-cyan-500/30 backdrop-blur-md flex items-center justify-between select-none z-30 shrink-0">
      {/* Left Protocol Branding */}
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,255,255,0.4)]">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-orbitron text-sm sm:text-base font-black tracking-widest text-cyan-100 text-glow-cyan">
              FRIDAY
            </h1>
            <span className="text-[10px] font-mono-hud px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40">
              WINDOWS CONTROLLER
            </span>
          </div>
          <div className="text-[10px] font-chakra text-slate-400 tracking-wider">
            OPERATOR: <span className="text-cyan-300 font-bold">{bossName.toUpperCase()}</span> // FULL PC ACCESS
          </div>
        </div>
      </div>

      {/* Center Clock & Status */}
      <div className="hidden lg:flex items-center space-x-4 font-mono-hud text-xs">
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/20">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-slate-300">CORE CLOCK:</span>
          <span className="text-cyan-300 font-bold tracking-wider">{currentTime}</span>
        </div>

        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="text-slate-300 text-[11px]">NEURAL LINK:</span>
          <span className="text-emerald-400 font-bold text-[11px]">
            {aiConnected ? 'GEMINI 3.8 ONLINE' : 'HOST STANDBY'}
          </span>
        </div>
      </div>

      {/* Right Tool Buttons */}
      <div className="flex items-center space-x-2 font-chakra text-xs">
        {/* Full Control & RPA Digital Twin */}
        <button
          onClick={onOpenRPAModal}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600/30 via-indigo-600/30 to-purple-600/30 hover:from-cyan-500/40 hover:to-indigo-500/40 text-cyan-200 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,255,255,0.3)] flex items-center space-x-1.5 transition-all cursor-pointer"
          title="Full PC Control: Cursor, Ghost-Typing, YouTube Playlists, WhatsApp, Trading Desk"
        >
          <Bot className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
          <span className="font-bold">FULL CONTROL &amp; RPA</span>
        </button>

        {/* Quick-Start / Help */}
        <button
          onClick={onOpenQuickStart}
          className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold border border-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.4)] flex items-center space-x-1.5 transition-all cursor-pointer animate-pulse"
          title="Quick-Start Guide: How to use FRIDAY and run on Windows"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>START AFRESH / GUIDE</span>
        </button>

        {/* Standalone Desktop App & Background Tray Mode */}
        <button
          onClick={onOpenDesktopAppModal}
          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center space-x-1.5 transition-all cursor-pointer"
          title="Run as Standalone App in Windows 10 Background / System Tray (Ctrl+Alt+F)"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold">DESKTOP APP &amp; TRAY</span>
        </button>

        {/* VS Code Web Studio Button */}
        <button
          onClick={onOpenVSCodeWebStudio}
          className="px-3 py-1.5 rounded-lg bg-indigo-950/90 hover:bg-indigo-900 text-indigo-100 border border-indigo-400/60 shadow-[0_0_15px_rgba(99,102,241,0.3)] flex items-center space-x-1.5 transition-all cursor-pointer"
          title="Create Websites & Launch in Visual Studio Code (Windows 10)"
        >
          <Code2 className="w-3.5 h-3.5 text-indigo-300" />
          <span className="font-bold">VS CODE STUDIO</span>
        </button>

        {/* Windows Autostart Button */}
        <button
          onClick={onOpenAutostartModal}
          className="px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center space-x-1.5 transition-all"
          title="Setup Windows Autostart on PC boot"
        >
          <Power className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold">AUTO-START</span>
        </button>

        <button
          onClick={onOpenDocModal}
          className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950 text-cyan-200 border border-cyan-900 hover:border-cyan-500/40 hidden sm:flex items-center space-x-1.5 transition-colors"
          title="Document & Report Creator"
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>DOCS</span>
        </button>

        <button
          onClick={onOpenDiagnostics}
          className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950 text-cyan-200 border border-cyan-900 hover:border-cyan-500/40 hidden sm:flex items-center space-x-1.5 transition-colors"
          title="Windows Error & Event Diagnostics"
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>DIAGNOSTICS</span>
        </button>

        <button
          onClick={onOpenPythonModal}
          className="px-3 py-1.5 rounded-lg bg-cyan-950/90 hover:bg-cyan-900 text-cyan-100 border border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,255,0.2)] flex items-center space-x-1.5 transition-all"
          title="Inspect & Download Python PyQt6 Desktop Source"
        >
          <Code2 className="w-3.5 h-3.5 text-cyan-300" />
          <span className="font-bold">PYTHON APP</span>
        </button>

        <button
          onClick={onToggleVoice}
          className={`p-2 rounded-lg border transition-colors ${
            voiceEnabled 
              ? 'bg-slate-900 border-cyan-500/40 text-cyan-300 hover:text-white' 
              : 'bg-slate-900 border-slate-700 text-slate-500'
          }`}
          title={voiceEnabled ? "Mute Voice (TTS)" : "Enable Voice (TTS)"}
        >
          {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg bg-slate-900 border border-cyan-900/60 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
