import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Sparkles, 
  Volume2, 
  Play, 
  Monitor, 
  FileCode, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  Zap
} from 'lucide-react';

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  bossName: string;
  onWakeFriday: () => void;
}

export const QuickStartModal: React.FC<QuickStartModalProps> = ({
  isOpen,
  onClose,
  bossName,
  onWakeFriday
}) => {
  const [activeTab, setActiveTab] = useState<'browser' | 'zero_install' | 'powershell' | 'node'>('browser');
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(id);
    setTimeout(() => setCopiedScript(null), 2500);
  };

  const edgeCommand = `start msedge.exe --app="https://ais-pre-43xsgjtczhny3hzi5qbg5d-102215820065.europe-west2.run.app" --window-size=1280,820`;
  const psCommand = `powershell.exe -ExecutionPolicy Bypass -Command "Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/lux/friday/main/friday_agent.ps1' -OutFile '$env:TEMP\\friday.ps1'; powershell -File '$env:TEMP\\friday.ps1'"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-cyan-400/50 rounded-2xl shadow-[0_0_40px_rgba(0,255,255,0.25)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-cyan-500/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-400/50 text-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.4)]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-base sm:text-lg text-cyan-100 flex items-center gap-2">
                FRIDAY // QUICK-START & LAUNCH CONTROL
              </h2>
              <p className="text-xs font-chakra text-slate-400">
                Calibrated for Operator: <span className="text-cyan-300 font-semibold">{bossName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-cyan-900/50 bg-slate-950/60 px-6 pt-3 space-x-2 text-xs font-chakra overflow-x-auto">
          <button
            onClick={() => setActiveTab('browser')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'browser'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. USE RIGHT NOW (BROWSER)</span>
          </button>

          <button
            onClick={() => setActiveTab('zero_install')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'zero_install'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>2. WINDOWS 10 1-CLICK (.BAT)</span>
          </button>

          <button
            onClick={() => setActiveTab('node')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'node'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>3. VS CODE & WEBSITE STUDIO</span>
          </button>

          <button
            onClick={() => setActiveTab('powershell')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'powershell'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>4. NATIVE APP &amp; BACKGROUND (TRAY)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-4 font-chakra text-sm">
          {activeTab === 'browser' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-orbitron text-sm font-bold text-cyan-200 mb-1">
                      FRIDAY is already 100% running right here!
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      You do not need to download or install anything to use FRIDAY. She is fully active in this browser tab right now, connected to Google Gemini and calibrated for <b className="text-cyan-300">{bossName}</b>.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onWakeFriday();
                      onClose();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(0,255,255,0.4)] flex items-center space-x-2 shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>WAKE & SPEAK</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 tracking-wider">TRY ASKING STUDY, WORLD, ARTIST & WEB TOPICS:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-hud">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-900/50 text-cyan-200 flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">📚</span>
                    <span>"Explain calculus integration step-by-step"</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-900/50 text-cyan-200 flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">🎨</span>
                    <span>"Tell me about Vincent van Gogh & his art"</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-900/50 text-cyan-200 flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">🌍</span>
                    <span>"What are the Seven Wonders of the World?"</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-900/50 text-cyan-200 flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">💻</span>
                    <span>"Create an artist portfolio website for VS Code"</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200/90 leading-relaxed flex items-center justify-between">
                <span>💡 <b>Tip for Boss Chris:</b> Click the <b>VS CODE STUDIO</b> button in the top navigation to design websites with live preview and open them in Visual Studio Code with 1 click!</span>
              </div>
            </div>
          )}

          {activeTab === 'zero_install' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40">
                <h3 className="font-orbitron text-sm font-bold text-cyan-200 mb-1">
                  Run FRIDAY on Windows 10 (Zero Installs Needed)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Windows 10 includes <b>Microsoft Edge</b> natively. You can launch FRIDAY in standalone App Mode with a dedicated window without installing Python, Git, or Node.js!
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300">OPTION 1: DOUBLE-CLICK IN YOUR EXTRACTED ZIP</div>
                <div className="p-3 rounded-lg bg-slate-900/90 border border-cyan-900 font-mono-hud text-xs text-cyan-300 space-y-1">
                  <p>📁 Double-click: <b>RUN_FRIDAY_ON_WINDOWS_10.bat</b></p>
                  <p className="text-slate-400 text-[11px]">This launches FRIDAY immediately on your desktop for Boss Chris.</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300">OPTION 2: RUN IN WINDOWS RUN DIALOG (WIN + R)</div>
                <div className="relative">
                  <pre className="p-3 rounded-lg bg-slate-950 border border-cyan-500/30 font-mono-hud text-xs text-cyan-300 overflow-x-auto select-all">
                    {edgeCommand}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(edgeCommand, 'edge')}
                    className="absolute right-2 top-2 p-1.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs flex items-center space-x-1"
                  >
                    {copiedScript === 'edge' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedScript === 'edge' ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">Win + R</kbd>, paste this command, and press Enter!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'node' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/40">
                <h3 className="font-orbitron text-sm font-bold text-indigo-200 mb-1">
                  How to Create Websites & Run in Visual Studio Code
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  FRIDAY can scaffold modern websites (HTML5, Tailwind CSS, JavaScript) and export them directly to your Windows 10 filesystem to open in Visual Studio Code.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-900 border border-indigo-900/60 space-y-2">
                  <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-200 flex items-center justify-center text-xs">1</span>
                    <span>Using the Web Studio Modal in FRIDAY</span>
                  </div>
                  <p className="text-slate-300 pl-6">
                    Click the <b>VS CODE STUDIO</b> button in the top navigation bar. Choose a starter template (Portfolio, SaaS, Dark Minimal, Creative Showcase), customize your code with real-time preview, and click <b>"OPEN IN VS CODE (WINDOWS 10)"</b>!
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-indigo-900/60 space-y-2">
                  <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-200 flex items-center justify-center text-xs">2</span>
                    <span>1-Click Batch Launcher on Windows 10</span>
                  </div>
                  <p className="text-slate-300 pl-6">
                    In your extracted folder, double-click: <b>OPEN_IN_VSCODE.bat</b>. It will create a website project on your Desktop (<code className="text-indigo-300">Desktop\Chris_Website_Project</code>) and open it directly in Visual Studio Code.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-indigo-900/60 space-y-2">
                  <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-200 flex items-center justify-center text-xs">3</span>
                    <span>Previewing Your Website in VS Code</span>
                  </div>
                  <p className="text-slate-300 pl-6">
                    In VS Code, install the <b>Live Server</b> extension (by Ritwick Dey). Right-click <code className="text-indigo-300">index.html</code> and select <b>"Open with Live Server"</b> to see your website reload in real time!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'powershell' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40">
                <h3 className="font-orbitron text-sm font-bold text-cyan-200 mb-1">
                  Native Windows 10 App (Background Execution &amp; System Tray)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  As requested by Boss Chris, FRIDAY is built to run as a <b>standalone application</b> that does not require Chrome or VS Code, and can run <b>continuously in the Windows background</b>!
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300">ONE-CLICK WINDOWS LAUNCHERS IN YOUR FOLDER:</div>
                <div className="p-3 rounded-lg bg-slate-900/90 border border-cyan-900 font-mono-hud text-xs text-cyan-300 space-y-2">
                  <p>1. <b>CREATE_DESKTOP_APP_SHORTCUT.bat</b>: Creates a <i>"FRIDAY AI"</i> icon on your Windows Desktop!</p>
                  <p>2. <b>RUN_FRIDAY_BACKGROUND.vbs</b>: Runs silently in the background with zero command prompt windows.</p>
                  <p>3. <b>START_FRIDAY_DESKTOP_APP.bat</b>: Checks dependencies and starts FRIDAY into your Windows 10 System Tray.</p>
                  <p>4. <b>python_desktop\setup_autostart.bat</b>: Sets FRIDAY to boot with Windows automatically.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-1.5 text-slate-300">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <span>⚡ GLOBAL HOTKEY: [Ctrl + Alt + F]</span>
                </div>
                <p className="text-slate-300">
                  While running in the background, press <code className="text-cyan-300 font-bold">Ctrl + Alt + F</code> anywhere in Windows to summon FRIDAY or hide her back to the tray!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-900/90 border-t border-cyan-900/50 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-chakra">
            Operator: <b className="text-cyan-300">{bossName}</b> // luxindustries14@gmail.com
          </span>
          <button
            onClick={() => {
              onWakeFriday();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>START FRIDAY NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};
