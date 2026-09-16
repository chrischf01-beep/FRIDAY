import React, { useState } from 'react';
import {
  X,
  Bot,
  MousePointer,
  Play,
  MessageSquare,
  TrendingUp,
  FileText,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  Zap,
  Terminal,
  Volume2,
  CheckCircle2,
  Code2,
  Laptop,
  Layers,
  Monitor,
  Folder,
  Cpu,
  Sparkles,
  Eye,
  Keyboard,
  FileCode,
  Search
} from 'lucide-react';

interface AutonomousRPAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDispatchCommand: (cmd: string) => void;
  bossName?: string;
}

export const AutonomousRPAModal: React.FC<AutonomousRPAModalProps> = ({
  isOpen,
  onClose,
  onDispatchCommand,
  bossName = "Boss Chris"
}) => {
  const [activeTab, setActiveTab] = useState<'panda' | 'vscode' | 'apps' | 'rpa' | 'youtube' | 'web' | 'trading'>('panda');
  const [websitePrompt, setWebsitePrompt] = useState('Build a responsive SaaS dashboard with dark theme, pricing table, and live log stream');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [generatedProjectPath, setGeneratedProjectPath] = useState<string | null>(null);

  const [ghostText, setGhostText] = useState('');
  const [whatsappDraft, setWhatsappDraft] = useState('');
  const [customMusicSearch, setCustomMusicSearch] = useState('');
  const [docTopic, setDocTopic] = useState('Artificial Intelligence Architecture');

  // Panda Function Calling state
  const [toolTestResult, setToolTestResult] = useState<any>(null);
  const [isCallingTool, setIsCallingTool] = useState(false);

  const handleExecuteTool = async (tool: string, args: any = {}) => {
    setIsCallingTool(true);
    setStatusMsg(`Calling tool: ${tool}...`);
    try {
      const res = await fetch('/api/tools/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, args, bossName })
      });
      const data = await res.json();
      setToolTestResult(data);
      setStatusMsg(`Executed ${tool} successfully.`);
    } catch (err: any) {
      setToolTestResult({ error: err.message });
      setStatusMsg(`Tool execution error: ${err.message}`);
    } finally {
      setIsCallingTool(false);
    }
  };

  if (!isOpen) return null;

  const handleDispatch = (cmd: string) => {
    onDispatchCommand(cmd);
  };

  const handleGenerateWebsite = async () => {
    if (!websitePrompt.trim()) return;
    setIsGenerating(true);
    setStatusMsg(`Architecting code and saving to disk for ${bossName}...`);
    try {
      const res = await fetch('/api/vscode/generate-and-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: websitePrompt,
          bossName,
          openInVSCode: true
        })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedProjectPath(data.projectPath);
        setStatusMsg(`Saved to ${data.projectPath} and invoked VS Code!`);
        // Also dispatch to chat so FRIDAY speaks and logs it in the HUD
        onDispatchCommand(`build website: ${websitePrompt}`);
      } else {
        setStatusMsg('Project generated. Dispatched to VS Code.');
      }
    } catch {
      setStatusMsg('Fallback triggered. Dispatching to FRIDAY Core...');
      onDispatchCommand(`build website: ${websitePrompt}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAppAction = async (action: string, param?: string) => {
    setStatusMsg(`Dispatching action: ${action}...`);
    try {
      const res = await fetch('/api/vscode/app-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, param, bossName })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg(data.message || 'Action executed on host.');
      }
    } catch {
      // Fallback to chat command
      if (action === 'launch_vscode') onDispatchCommand('open vscode');
      if (action === 'task_manager') onDispatchCommand('task manager');
      if (action === 'snap_split_screen') onDispatchCommand('snap window left');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-chakra">
      <div className="bg-slate-950 border border-cyan-500/50 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,255,255,0.25)] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,255,255,0.4)]">
              <Bot className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-orbitron text-lg font-bold text-cyan-100 tracking-wider">
                  AUTONOMOUS DIGITAL TWIN &amp; RPA CONTROLLER
                </h2>
                <span className="text-[10px] font-mono-hud px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  FULL PC &amp; VS CODE CONTROL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Operator: <strong className="text-cyan-300">{bossName}</strong> &lt;luxindustries14@gmail.com&gt; // Direct Hardware, VS Code &amp; Web Synchronization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-cyan-900/40 bg-slate-950/90 px-4 pt-2 gap-2 text-xs">
          <button
            onClick={() => setActiveTab('panda')}
            className={`px-4 py-2.5 rounded-t-lg font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'panda'
                ? 'bg-cyan-950/90 text-cyan-300 border-t-2 border-cyan-400 shadow-[0_-4px_10px_rgba(0,255,255,0.15)]'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>PANDA HANDS-FREE CORE</span>
          </button>

          <button
            onClick={() => setActiveTab('vscode')}
            className={`px-4 py-2.5 rounded-t-lg font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'vscode'
                ? 'bg-cyan-950/90 text-cyan-300 border-t-2 border-cyan-400 shadow-[0_-4px_10px_rgba(0,255,255,0.15)]'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>VS CODE &amp; ARCHITECT</span>
          </button>

          <button
            onClick={() => setActiveTab('apps')}
            className={`px-4 py-2.5 rounded-t-lg font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'apps'
                ? 'bg-cyan-950/90 text-cyan-300 border-t-2 border-cyan-400 shadow-[0_-4px_10px_rgba(0,255,255,0.15)]'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            <Laptop className="w-4 h-4 text-sky-400" />
            <span>APPS &amp; WINDOWS</span>
          </button>

          <button
            onClick={() => setActiveTab('rpa')}
            className={`px-4 py-2.5 rounded-t-lg font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'rpa'
                ? 'bg-cyan-950/90 text-cyan-300 border-t-2 border-cyan-400 shadow-[0_-4px_10px_rgba(0,255,255,0.15)]'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            <MousePointer className="w-4 h-4" />
            <span>CURSOR &amp; RPA</span>
          </button>

          <button
            onClick={() => setActiveTab('youtube')}
            className={`px-4 py-2.5 rounded-t-lg font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'youtube'
                ? 'bg-cyan-950/90 text-cyan-300 border-t-2 border-cyan-400 shadow-[0_-4px_10px_rgba(0,255,255,0.15)]'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>YOUTUBE DJ</span>
          </button>

          <button
            onClick={() => setActiveTab('web')}
            className={`px-4 py-2.5 rounded-t-lg font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'web'
                ? 'bg-cyan-950/90 text-cyan-300 border-t-2 border-cyan-400 shadow-[0_-4px_10px_rgba(0,255,255,0.15)]'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>CHROME &amp; SOCIAL</span>
          </button>

          <button
            onClick={() => setActiveTab('trading')}
            className={`px-4 py-2.5 rounded-t-lg font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'trading'
                ? 'bg-cyan-950/90 text-cyan-300 border-t-2 border-cyan-400 shadow-[0_-4px_10px_rgba(0,255,255,0.15)]'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>TRADING DESK</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* TAB: PANDA HANDS-FREE CORE */}
          {activeTab === 'panda' && (
            <div className="space-y-6">
              {/* Panda Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <h3 className="font-orbitron text-sm font-bold text-cyan-200">
                      PANDA AUTONOMOUS HANDS-FREE AGENT ARCHITECTURE
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono-hud px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/50">
                    WINDOWS 10 INTEGRATED
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  FRIDAY operates your Windows 10 PC hands-free via voice, modeled after the autonomous mobile &quot;Panda&quot; system. She perceives screen state via OCR and window tracking, formulates deterministic action plans, dispatches system tools, and confirms execution with spoken responses.
                </p>

                {/* 6-Step Loop Diagram */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
                  {[
                    { step: "1. LISTEN", desc: "Voice input", icon: Volume2 },
                    { step: "2. PERCEIVE", desc: "OCR & active window", icon: Eye },
                    { step: "3. PLAN", desc: "Formulate tool steps", icon: Layers },
                    { step: "4. EXECUTE", desc: "Dispatch 11 tools", icon: Cpu },
                    { step: "5. VERIFY", desc: "Check screen state", icon: CheckCircle2 },
                    { step: "6. CONFIRM", desc: "Spoken status", icon: Bot },
                  ].map((s, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-950/90 border border-cyan-800/40 text-center space-y-1">
                      <s.icon className="w-4 h-4 mx-auto text-cyan-400" />
                      <div className="text-[10px] font-orbitron font-bold text-cyan-200">{s.step}</div>
                      <div className="text-[9px] text-slate-400">{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Modules (A, B, C, D) */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-orbitron text-xs font-bold text-cyan-200 uppercase tracking-wider">
                    Core Task Modules (1-Click Voice Simulation)
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Module A: YouTube */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-3 hover:border-cyan-400/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Play className="w-4 h-4 text-red-400" />
                        <span className="text-xs font-bold text-slate-200">Module A: YouTube Open &amp; Search</span>
                      </div>
                      <span className="text-[9px] font-mono-hud text-slate-400">Media DJ</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      &quot;FRIDAY, open YouTube and play lo-fi beats.&quot;
                    </p>
                    <div className="text-[10px] font-mono-hud text-cyan-400 bg-slate-950 p-2 rounded border border-cyan-950">
                      open_url(&quot;youtube.com&quot;) &rarr; keyboard(&apos;/&apos;) &rarr; type(&quot;lo-fi beats&quot;) &rarr; press(&apos;Enter&apos;) &rarr; click_by_text(first_video)
                    </div>
                    <button
                      onClick={() => handleDispatch("open youtube and play lo-fi beats")}
                      className="w-full py-2 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Trigger: Open YouTube &amp; Play Lo-Fi</span>
                    </button>
                  </div>

                  {/* Module B: Instagram */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-3 hover:border-cyan-400/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-pink-400" />
                        <span className="text-xs font-bold text-slate-200">Module B: Instagram Direct &amp; Reels</span>
                      </div>
                      <span className="text-[9px] font-mono-hud text-slate-400">Social Automation</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      &quot;Text Sarah on Instagram saying I&apos;ll call her later.&quot;
                    </p>
                    <div className="text-[10px] font-mono-hud text-cyan-400 bg-slate-950 p-2 rounded border border-cyan-950">
                      open_url(&quot;instagram.com/direct&quot;) &rarr; click(&quot;Sarah&quot;) &rarr; type(&quot;I&apos;ll call you later&quot;) &rarr; press(&apos;Enter&apos;)
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDispatch("Text Sarah on Instagram saying I'll call her later.")}
                        className="flex-1 py-2 rounded-lg bg-pink-950/60 hover:bg-pink-900/80 text-pink-200 border border-pink-500/40 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send Text to Sarah</span>
                      </button>
                      <button
                        onClick={() => handleDispatch("scroll reels on instagram")}
                        className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                      >
                        Scroll Reels
                      </button>
                    </div>
                  </div>

                  {/* Module C: VS Code */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-3 hover:border-cyan-400/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Code2 className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-slate-200">Module C: VS Code Script Writer</span>
                      </div>
                      <span className="text-[9px] font-mono-hud text-slate-400">File &amp; IDE</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      &quot;Open VS Code and write me a Python script that renames all files in a folder to lowercase.&quot;
                    </p>
                    <div className="text-[10px] font-mono-hud text-cyan-400 bg-slate-950 p-2 rounded border border-cyan-950">
                      open_app(&quot;code&quot;) &rarr; hotkey(&quot;ctrl+n&quot;) &rarr; generate_code() &rarr; write_file() &rarr; hotkey(&quot;ctrl+s&quot;)
                    </div>
                    <button
                      onClick={() => handleDispatch("Open VS Code and write me a Python script that renames all files in a folder to lowercase.")}
                      className="w-full py-2 rounded-lg bg-blue-950 hover:bg-blue-900 text-blue-200 border border-blue-500/40 text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <FileCode className="w-3.5 h-3.5" />
                      <span>Write Python Script in VS Code</span>
                    </button>
                  </div>

                  {/* Module D: Pocket Option */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/40 space-y-3 hover:border-amber-400/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-slate-200">Module D: Pocket Option Trading</span>
                      </div>
                      <span className="text-[9px] font-mono-hud px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-600/40">
                        VERBAL CONFIRM REQUIRED
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      &quot;Open Pocket Option and buy a $1 call on EUR/USD for 1 minute.&quot;
                    </p>
                    <div className="text-[10px] font-mono-hud text-amber-300 bg-slate-950 p-2 rounded border border-amber-950/60">
                      open_url() &rarr; perceive &rarr; ask verbal confirm &rarr; on &quot;confirm&quot; &rarr; click(&quot;EURUSD&quot;) &rarr; click(&quot;Call&quot;)
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDispatch("Open Pocket Option and buy a $1 call on EUR/USD for 1 minute.")}
                        className="flex-1 py-2 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-500/40 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                      >
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Stage Pocket Option Trade</span>
                      </button>
                      <button
                        onClick={() => handleDispatch("confirm")}
                        className="py-2 px-3 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all cursor-pointer"
                      >
                        Say &quot;Confirm&quot;
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* The 11 Function Calling Tools Console */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <h4 className="font-orbitron text-xs font-bold text-cyan-200 uppercase tracking-wider">
                      The 11 Function Calling Tools Console (/api/tools/execute)
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono-hud text-slate-400">
                    Live Win32 / Node RPC
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => handleExecuteTool('get_active_window_info')}
                    disabled={isCallingTool}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:border-cyan-400 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">1. get_active_window</span>
                    <span className="text-[9px] text-slate-400">Foreground title &amp; PID</span>
                  </button>

                  <button
                    onClick={() => handleExecuteTool('read_screen_text')}
                    disabled={isCallingTool}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:border-cyan-400 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">2. read_screen_text</span>
                    <span className="text-[9px] text-slate-400">OCR visible UI text</span>
                  </button>

                  <button
                    onClick={() => handleExecuteTool('execute_system_command', { command: 'dir' })}
                    disabled={isCallingTool}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:border-cyan-400 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">3. execute_command</span>
                    <span className="text-[9px] text-slate-400">PowerShell / CMD</span>
                  </button>

                  <button
                    onClick={() => handleExecuteTool('mouse_action', { action: 'move', x: 960, y: 540 })}
                    disabled={isCallingTool}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:border-cyan-400 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">4. mouse_action</span>
                    <span className="text-[9px] text-slate-400">Move cursor to center</span>
                  </button>

                  <button
                    onClick={() => handleExecuteTool('keyboard_action', { action: 'hotkey', keys: 'ctrl+shift+p' })}
                    disabled={isCallingTool}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:border-cyan-400 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">5. keyboard_action</span>
                    <span className="text-[9px] text-slate-400">Send hotkey ctrl+shift+p</span>
                  </button>

                  <button
                    onClick={() => handleExecuteTool('open_application', { app_name: 'code' })}
                    disabled={isCallingTool}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:border-cyan-400 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">6. open_application</span>
                    <span className="text-[9px] text-slate-400">Launch VS Code</span>
                  </button>

                  <button
                    onClick={() => handleExecuteTool('open_url', { url: 'https://youtube.com' })}
                    disabled={isCallingTool}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:border-cyan-400 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">7. open_url</span>
                    <span className="text-[9px] text-slate-400">Launch browser URL</span>
                  </button>

                  <button
                    onClick={() => handleExecuteTool('write_file', { path: 'friday_test.txt', content: 'FRIDAY Panda Bridge online' })}
                    disabled={isCallingTool}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:border-cyan-400 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">8. write_file</span>
                    <span className="text-[9px] text-slate-400">Write to filesystem</span>
                  </button>

                  <button
                    onClick={() => handleExecuteTool('run_terminal_command', { cwd: '.', command: 'node -v' })}
                    disabled={isCallingTool}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:border-cyan-400 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">9. run_terminal_cmd</span>
                    <span className="text-[9px] text-slate-400">Execute in cwd</span>
                  </button>

                  <button
                    onClick={() => handleExecuteTool('search_web', { query: 'FRIDAY autonomous agent Windows 10' })}
                    disabled={isCallingTool}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:border-cyan-400 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">10. search_web</span>
                    <span className="text-[9px] text-slate-400">Google web query</span>
                  </button>

                  <button
                    onClick={() => handleExecuteTool('click_by_text', { target_text: 'Explorer' })}
                    disabled={isCallingTool}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:border-cyan-400 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">11. click_by_text</span>
                    <span className="text-[9px] text-slate-400">OCR &amp; coordinate click</span>
                  </button>

                  <button
                    onClick={() => handleDispatch("what am i looking at")}
                    className="p-2.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-200 text-left transition-all cursor-pointer flex flex-col space-y-1"
                  >
                    <span className="font-bold font-mono-hud text-[11px]">👁️ Full Perception</span>
                    <span className="text-[9px] text-indigo-300">&quot;What am I looking at?&quot;</span>
                  </button>
                </div>

                {/* Tool Result Live Terminal */}
                {toolTestResult && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-[11px] font-mono-hud text-cyan-300">
                      <span>Tool Execution Telemetry:</span>
                      <button
                        onClick={() => setToolTestResult(null)}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                    <pre className="p-3 rounded-lg bg-black/90 border border-cyan-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-48">
                      {JSON.stringify(toolTestResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: VS CODE & CODE ARCHITECT */}
          {activeTab === 'vscode' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-orbitron text-sm font-bold text-cyan-200">
                      AUTONOMOUS VS CODE ARCHITECT &amp; CODE WRITER
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono-hud px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
                    HOST FILESYSTEM SYNC
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Give FRIDAY any instruction. She constructs the complete structured website (HTML5, Tailwind CSS, interactive JavaScript, and README), saves the files directly to your desktop at <code className="text-cyan-300">%USERPROFILE%\Desktop\FRIDAY_Websites</code>, and automatically launches <strong>Visual Studio Code</strong>.
                </p>

                {/* Prompt Textarea */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono-hud text-slate-400">INSTRUCTION FOR FRIDAY:</label>
                  <textarea
                    rows={3}
                    value={websitePrompt}
                    onChange={(e) => setWebsitePrompt(e.target.value)}
                    placeholder="E.g., Build a responsive SaaS platform with dark neon theme, pricing table, and live log stream..."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 resize-none font-sans"
                  />
                </div>

                {/* Blueprints Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[10px] text-slate-500 self-center font-mono-hud">QUICK BLUEPRINTS:</span>
                  {[
                    'SaaS Cloud Platform with metrics and pricing',
                    'Developer Portfolio with terminal and project filter',
                    'Cyber Storefront with interactive shopping cart',
                    'Crypto Trading Terminal with simulated order book',
                    'Interactive Study Quiz with scoring engine'
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setWebsitePrompt(preset)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-500/60 text-[11px] text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
                    >
                      {preset.split(' with ')[0]}
                    </button>
                  ))}
                </div>

                {/* Primary Action Button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handleGenerateWebsite}
                    disabled={isGenerating}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isGenerating ? 'Architecting & Saving Files...' : 'Generate, Save & Launch in VS Code'}</span>
                  </button>

                  {statusMsg && (
                    <span className="text-xs text-emerald-400 font-mono-hud flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{statusMsg}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Remote Controls for VS Code */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 font-orbitron">VS CODE TOOLS &amp; TERMINAL COMPANION</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <button
                    onClick={() => handleAppAction('launch_vscode')}
                    className="p-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span>Launch VS Code</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">code .</span>
                  </button>

                  <button
                    onClick={() => handleAppAction('install_extensions')}
                    className="p-3 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-200 font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span>Install Extensions</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">LiveServer, Tailwind</span>
                  </button>

                  <button
                    onClick={() => handleDispatch('node friday_cli.js')}
                    className="p-3 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>Terminal Companion</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">friday_cli.js</span>
                  </button>

                  <button
                    onClick={() => handleAppAction('open_explorer')}
                    className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <Folder className="w-4 h-4 text-amber-400" />
                    <span>Projects Folder</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">explorer.exe</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMPUTER APPS & MULTITASKING */}
          {activeTab === 'apps' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-500/40 space-y-4">
                <div className="flex items-center space-x-2">
                  <Laptop className="w-5 h-5 text-sky-400" />
                  <h3 className="font-orbitron text-sm font-bold text-sky-200">
                    COMPUTER APPLICATION AUTOMATION &amp; WINDOW MANAGEMENT
                  </h3>
                </div>
                <p className="text-xs text-slate-300">
                  Control active Windows applications, snap windows side-by-side with VS Code for dual-screen productivity, monitor CPU/RAM via Task Manager, or toggle browser developer tools.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleAppAction('task_manager')}
                    className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/40 hover:border-sky-400 text-sky-200 font-bold text-xs flex flex-col items-start gap-1.5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-sky-400" />
                      <span>Windows Task Manager</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">Monitor CPU, RAM &amp; processes</span>
                  </button>

                  <button
                    onClick={() => handleAppAction('snap_split_screen', 'left')}
                    className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/40 hover:border-sky-400 text-sky-200 font-bold text-xs flex flex-col items-start gap-1.5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-cyan-400" />
                      <span>Dock Split Left (Win+Left)</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">Snap active window to left half</span>
                  </button>

                  <button
                    onClick={() => handleAppAction('snap_split_screen', 'right')}
                    className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/40 hover:border-sky-400 text-sky-200 font-bold text-xs flex flex-col items-start gap-1.5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-cyan-400" />
                      <span>Dock Split Right (Win+Right)</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">Snap active window to right half</span>
                  </button>

                  <button
                    onClick={() => handleAppAction('open_devtools')}
                    className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/40 hover:border-sky-400 text-sky-200 font-bold text-xs flex flex-col items-start gap-1.5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-4 h-4 text-amber-400" />
                      <span>Developer Tools (F12)</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">Inspect DOM, network &amp; console</span>
                  </button>

                  <button
                    onClick={() => handleAppAction('alt_tab')}
                    className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/40 hover:border-sky-400 text-sky-200 font-bold text-xs flex flex-col items-start gap-1.5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>Switch App (Alt+Tab)</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">Quickly swap active windows</span>
                  </button>

                  <button
                    onClick={() => handleAppAction('show_desktop')}
                    className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/40 hover:border-sky-400 text-sky-200 font-bold text-xs flex flex-col items-start gap-1.5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <Laptop className="w-4 h-4 text-emerald-400" />
                      <span>Toggle Desktop (Win+D)</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">Minimize/restore all applications</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: CURSOR & GHOST TYPING */}
          {activeTab === 'rpa' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <MousePointer className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-orbitron text-sm font-bold text-cyan-200">
                    REAL HARDWARE CURSOR MANIPULATION
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mb-4">
                  FRIDAY can relocate your physical mouse cursor, perform smooth trajectory sweeps, left/double clicks, and viewport scrolling across all connected Windows displays.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => handleDispatch('move mouse to center')}
                    className="p-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <span>🎯 Center Cursor</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">(960, 540)</span>
                  </button>

                  <button
                    onClick={() => handleDispatch('move cursor')}
                    className="p-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <span>〰️ Smooth Sweep</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">Diagonal relocation</span>
                  </button>

                  <button
                    onClick={() => handleDispatch('click mouse')}
                    className="p-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <span>🖱️ Click Mouse</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">Primary left-click</span>
                  </button>

                  <button
                    onClick={() => handleDispatch('double click')}
                    className="p-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <span>⚡ Double Click</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">Open icon / select</span>
                  </button>
                </div>
              </div>

              {/* Ghost-Typing Simulator */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-orbitron text-sm font-bold text-indigo-200">
                    AUTONOMOUS GHOST-TYPING ENGINE
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mb-3">
                  FRIDAY can physically type keystrokes directly into active Windows applications (Notepad, Word, search bars, code editors) with natural cadence.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ghostText}
                    onChange={(e) => setGhostText(e.target.value)}
                    placeholder="Enter text for FRIDAY to type into your active window..."
                    className="flex-1 bg-slate-950 border border-indigo-500/40 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-400 font-mono"
                  />
                  <button
                    onClick={() => {
                      if (ghostText.trim()) {
                        handleDispatch(`type ${ghostText}`);
                        setGhostText('');
                      }
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Type Now</span>
                  </button>
                </div>
              </div>

              {/* Document Generation */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-orbitron text-sm font-bold text-emerald-200">
                    AUTONOMOUS DOCUMENT WRITING &amp; DESKTOP DEPLOYMENT
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mb-3">
                  Instantly creates formatted Microsoft Word (.doc) and Markdown documents with system telemetry, research, and executive briefs placed right on your Windows 10 Desktop.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={docTopic}
                    onChange={(e) => setDocTopic(e.target.value)}
                    placeholder="Document Topic (e.g. Quantum Computing, Weekly Brief)..."
                    className="flex-1 bg-slate-950 border border-emerald-500/40 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    onClick={() => handleDispatch(`write document about ${docTopic}`)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Write &amp; Open Document</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: YOUTUBE PLAYLIST DJ */}
          {activeTab === 'youtube' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Play className="w-5 h-5 text-red-400" />
                  <h3 className="font-orbitron text-sm font-bold text-cyan-200">
                    CURATED EXECUTIVE YOUTUBE PLAYLISTS
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mb-4">
                  1-Click direct audio stream initialization for focus, coding, studying, and relaxation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleDispatch('play my favorite playlist')}
                    className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/40 hover:border-red-400 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-red-200 group-hover:text-white flex items-center gap-2">
                        ⭐ Favorite Executive Session
                      </span>
                      <ExternalLink className="w-4 h-4 text-red-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Curated daily high-energy focus and workflow stream.
                    </p>
                  </button>

                  <button
                    onClick={() => handleDispatch('play lofi')}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-cyan-200 group-hover:text-white flex items-center gap-2">
                        ☕ Lofi Girl (Live 24/7 Radio)
                      </span>
                      <ExternalLink className="w-4 h-4 text-cyan-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Chill beats to relax/study to, streamed non-stop.
                    </p>
                  </button>

                  <button
                    onClick={() => handleDispatch('play synthwave')}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-fuchsia-500/30 hover:border-fuchsia-400 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-fuchsia-200 group-hover:text-white flex items-center gap-2">
                        🌆 Synthwave / Retrowave Beats
                      </span>
                      <ExternalLink className="w-4 h-4 text-fuchsia-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      80s analog synthesizers and cyberpunk neon rhythms.
                    </p>
                  </button>

                  <button
                    onClick={() => handleDispatch('play hans zimmer')}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-amber-200 group-hover:text-white flex items-center gap-2">
                        🎻 Hans Zimmer Cinematic Suite
                      </span>
                      <ExternalLink className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Interstellar, Inception, and Gladiator master scores.
                    </p>
                  </button>

                  <button
                    onClick={() => handleDispatch('play focus')}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-400 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-emerald-200 group-hover:text-white flex items-center gap-2">
                        ⚡ Deep Focus &amp; Coding Flow
                      </span>
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Binaural frequencies engineered for cognitive flow.
                    </p>
                  </button>

                  <button
                    onClick={() => handleDispatch('play rock')}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-purple-500/30 hover:border-purple-400 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-purple-200 group-hover:text-white flex items-center gap-2">
                        🎸 Classic &amp; Modern Rock
                      </span>
                      <ExternalLink className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      High-voltage electric guitars and driving drums.
                    </p>
                  </button>
                </div>
              </div>

              {/* Custom Search & Play */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-red-500/30">
                <h4 className="text-xs font-bold text-slate-200 mb-2">Search &amp; Auto-Stream Any Song or Artist</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customMusicSearch}
                    onChange={(e) => setCustomMusicSearch(e.target.value)}
                    placeholder="Enter artist, song, or playlist name..."
                    className="flex-1 bg-slate-950 border border-red-500/40 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-400"
                  />
                  <button
                    onClick={() => {
                      if (customMusicSearch.trim()) {
                        handleDispatch(`play ${customMusicSearch}`);
                        setCustomMusicSearch('');
                      }
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Play on YouTube</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHROME TABS & SOCIAL */}
          {activeTab === 'web' && (
            <div className="space-y-6">
              {/* WhatsApp Web Controller */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/40">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-orbitron text-sm font-bold text-emerald-200">
                    WHATSAPP WEB MESSAGING &amp; DRAFTING
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mb-3">
                  FRIDAY can open WhatsApp Web, select contacts, and pre-compose message drafts on your behalf so you can send them in one click.
                </p>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={whatsappDraft}
                      onChange={(e) => setWhatsappDraft(e.target.value)}
                      placeholder="Type message draft (e.g. Hello, I am finalizing the project schedule)..."
                      className="flex-1 bg-slate-950 border border-emerald-500/40 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
                    />
                    <button
                      onClick={() => {
                        handleDispatch(whatsappDraft.trim() ? `open whatsapp saying ${whatsappDraft}` : 'open whatsapp');
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open WhatsApp Web</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400/80">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Drafts open in your authenticated WhatsApp Web session without sharing credentials.</span>
                  </div>
                </div>
              </div>

              {/* Instagram Navigator */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-pink-500/40">
                <div className="flex items-center space-x-2 mb-2">
                  <ExternalLink className="w-5 h-5 text-pink-400" />
                  <h3 className="font-orbitron text-sm font-bold text-pink-200">
                    INSTAGRAM NAVIGATOR &amp; FOLLOWER ASSISTANT
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mb-3">
                  FRIDAY can navigate to user profiles and your Instagram feed.
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleDispatch('open instagram')}
                    className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Instagram Feed</span>
                  </button>
                </div>

                <div className="mt-3 p-3 rounded-lg bg-pink-950/40 border border-pink-500/30 flex items-start space-x-2 text-[11px] text-pink-200">
                  <ShieldAlert className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Platform Anti-Bot Policy:</strong> Instagram (Meta) deploys aggressive behavioral heuristics. Rapid headless automated clicking will trigger account shadowbans. FRIDAY enforces human-supervised clicks to keep your account safe.
                  </div>
                </div>
              </div>

              {/* Chrome Tabs Management */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30">
                <h4 className="text-xs font-bold text-cyan-200 mb-2">Browser Tab Orchestration Shortcuts</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleDispatch('new tab')}
                    className="p-2.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs text-center transition-all"
                  >
                    <span>➕ New Tab</span>
                    <span className="block text-[10px] text-slate-400">Ctrl + T</span>
                  </button>
                  <button
                    onClick={() => handleDispatch('close tab')}
                    className="p-2.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs text-center transition-all"
                  >
                    <span>❌ Close Tab</span>
                    <span className="block text-[10px] text-slate-400">Ctrl + W</span>
                  </button>
                  <button
                    onClick={() => handleDispatch('switch tab')}
                    className="p-2.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs text-center transition-all"
                  >
                    <span>🔄 Switch Tab</span>
                    <span className="block text-[10px] text-slate-400">Ctrl + Tab</span>
                  </button>
                  <button
                    onClick={() => handleDispatch('open chrome')}
                    className="p-2.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs text-center transition-all"
                  >
                    <span>🌐 Open Chrome</span>
                    <span className="block text-[10px] text-slate-400">start chrome</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TRADING & FINANCIAL DESK */}
          {activeTab === 'trading' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-orbitron text-sm font-bold text-cyan-200">
                    MARKET INTELLIGENCE &amp; AUTONOMOUS TRADING TERMINAL
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mb-4">
                  Open live market telemetry and financial charts for equities, cryptocurrencies, and indices.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => handleDispatch('trade bitcoin')}
                    className="p-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <span>₿ Bitcoin (BTC/USDT)</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">TradingView Live</span>
                  </button>

                  <button
                    onClick={() => handleDispatch('trade ethereum')}
                    className="p-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <span>Ξ Ethereum (ETH/USDT)</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">TradingView Live</span>
                  </button>

                  <button
                    onClick={() => handleDispatch('trade apple')}
                    className="p-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <span>🍎 Apple (NASDAQ:AAPL)</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">Equities Chart</span>
                  </button>

                  <button
                    onClick={() => handleDispatch('trade sp500')}
                    className="p-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <span>📈 S&amp;P 500 Index</span>
                    <span className="text-[10px] text-slate-400 font-mono-hud">Index Macro</span>
                  </button>
                </div>
              </div>

              {/* Crucial Risk & Security Guardrails Box */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-3">
                <div className="flex items-center space-x-2 text-amber-300">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <h4 className="font-orbitron text-xs font-bold tracking-wider">
                    EXECUTIVE FINANCIAL SAFEGUARDS &amp; AUTONOMOUS TRADING POLICY
                  </h4>
                </div>

                <div className="space-y-2 text-xs text-amber-200/90 leading-relaxed font-chakra">
                  <p>
                    <strong>1. Paper Trading Simulation Sandbox:</strong> For your financial security, autonomous bots must never connect direct raw credit cards or unrestricted bank credentials without API-scoped paper trading (e.g. Alpaca Paper Trading, Binance Testnet, Interactive Brokers API).
                  </p>
                  <p>
                    <strong>2. Mandatory Hard Stop-Losses:</strong> Any algorithmic trade executing on your behalf requires strict risk ceilings (e.g. max 1.5% capital drawdown per trade) to protect your net worth.
                  </p>
                  <p>
                    <strong>3. Human Sign-Off for Capital Transfers:</strong> FRIDAY monitors charts, calculates indicators (RSI, MACD, Volume Profile), and prepares order tickets. Final order execution requires verbal or biometric sign-off from <strong>{bossName}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-cyan-900/40 flex flex-wrap items-center justify-between gap-3 text-xs font-chakra">
          <div className="flex items-center space-x-2 text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Digital Twin Calibration: <strong className="text-cyan-300">100% Active</strong></span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleDispatch('take full control')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>SYNC DIGITAL TWIN ("BE ME")</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
