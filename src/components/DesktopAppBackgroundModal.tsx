import React, { useState, useEffect } from 'react';
import { 
  X, Monitor, Terminal, Copy, Check, ShieldCheck, 
  ArrowDownToLine, Bell, Power, Zap, ExternalLink, Sliders
} from 'lucide-react';

interface DesktopAppBackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  bossName?: string;
}

export const DesktopAppBackgroundModal: React.FC<DesktopAppBackgroundModalProps> = ({
  isOpen,
  onClose,
  bossName = "Boss Chris"
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'desktop-tray' | 'install-pwa' | 'autostart'>('desktop-tray');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleInstallPWA = async () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      const choiceResult = await installPromptEvent.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setInstallPromptEvent(null);
    } else {
      // Fallback instructions for manual install in Edge / Chrome
      alert('To install as an app: Click the 3 dots (...) in your browser menu -> Apps -> "Install FRIDAY as an app". It will open in an independent window!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div 
        id="desktop-app-modal"
        className="max-w-3xl w-full max-h-[90vh] bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.25)] flex flex-col overflow-hidden text-slate-100"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-cyan-900/60 bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              <Monitor className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-orbitron text-base sm:text-lg font-bold text-cyan-200 tracking-wider">
                STANDALONE APP &amp; BACKGROUND EXECUTION
              </h2>
              <p className="text-xs text-slate-400">
                Operator: <span className="text-cyan-300 font-semibold">{bossName}</span> • Platform: Windows 10
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 hover:border-red-400 hover:text-red-400 text-slate-400 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 px-5 pt-3 gap-2 overflow-x-auto text-xs font-mono-hud">
          <button
            onClick={() => setActiveTab('desktop-tray')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'desktop-tray'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>1. NATIVE WINDOWS 10 APP (TRAY &amp; HOTKEY)</span>
          </button>

          <button
            onClick={() => setActiveTab('install-pwa')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'install-pwa'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
            <span>2. 1-CLICK WINDOWS APP INSTALL</span>
          </button>

          <button
            onClick={() => setActiveTab('autostart')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'autostart'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>3. RUN ON WINDOWS STARTUP</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {activeTab === 'desktop-tray' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-2">
                <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Real Windows 10 App • Zero Chrome Tabs • Zero VS Code</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  FRIDAY includes a dedicated Python/PyQt6 application engine that runs as an independent Windows program. It does <b>NOT</b> open inside Chrome or VS Code, and is built specifically to sit in your <b>Windows System Tray</b> (next to the clock) and run silently in the background!
                </p>
              </div>

              {/* Three Simple Steps */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  3 LAUNCH OPTIONS IN YOUR PROJECT FOLDER:
                </div>

                {/* Option 1: Desktop Shortcut */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-900/70 hover:border-cyan-500/50 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">A</span>
                      <span>Double-Click: <b>CREATE_DESKTOP_APP_SHORTCUT.bat</b></span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">RECOMMENDED</span>
                  </div>
                  <p className="text-xs text-slate-400 pl-7">
                    Instantly creates a <b>"FRIDAY AI"</b> icon on your Windows 10 Desktop. Double-click it like any program (Discord, Spotify) to start FRIDAY!
                  </p>
                </div>

                {/* Option 2: Silent Background Runner */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-900/70 hover:border-cyan-500/50 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">B</span>
                      <span>Double-Click: <b>RUN_FRIDAY_BACKGROUND.vbs</b></span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">SILENT MODE</span>
                  </div>
                  <p className="text-xs text-slate-400 pl-7">
                    Launches FRIDAY directly with zero command prompt windows. It sits quietly in your Windows 10 System Tray.
                  </p>
                </div>

                {/* Option 3: Full Batch Launcher */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-900/70 hover:border-cyan-500/50 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">C</span>
                      <span>Double-Click: <b>START_FRIDAY_DESKTOP_APP.bat</b></span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 pl-7">
                    Verifies packages and launches FRIDAY with interactive setup messages.
                  </p>
                </div>
              </div>

              {/* Background & Hotkey Explainer */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40 space-y-2.5">
                <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                  <Bell className="w-4 h-4 text-indigo-400" />
                  <span>How Background &amp; Global Hotkey Work:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-indigo-900/50 space-y-1">
                    <b className="text-cyan-300">Global Hotkey: [Ctrl + Alt + F]</b>
                    <p className="text-slate-400">
                      Press <code className="text-cyan-300 font-bold">Ctrl + Alt + F</code> anywhere in Windows to instantly pop up FRIDAY or hide her to the background.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-indigo-900/50 space-y-1">
                    <b className="text-cyan-300">Close to Tray: [ ✕ ] or [ ⬇ ]</b>
                    <p className="text-slate-400">
                      Clicking <b>[ ✕ ]</b> minimizes FRIDAY to your System Tray instead of quitting. Right-click the cyan tray icon to quit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'install-pwa' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-2">
                <h3 className="font-orbitron text-sm font-bold text-cyan-200">
                  Convert this Web Page into a Native Windows 10 App
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You do not need to look at Chrome address bars or tabs. Modern Windows 10 allows you to install this web application as a standalone desktop program pinned to your Taskbar!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-900/90 border border-cyan-800/60">
                <div className="flex-1 space-y-1 text-xs">
                  <div className="font-bold text-slate-200">
                    {isInstalled ? "App Installed on Windows 10" : "1-Click App Installation"}
                  </div>
                  <p className="text-slate-400">
                    Removes all browser tabs, URL bars, and runs as an isolated desktop window.
                  </p>
                </div>
                <button
                  onClick={handleInstallPWA}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)] cursor-pointer"
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  <span>{isInstalled ? "Already Installed" : "Install as Windows App"}</span>
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-400">
                <div className="font-bold text-slate-300">MANUAL INSTALL INSTRUCTIONS:</div>
                <ul className="list-disc list-inside space-y-1.5 leading-relaxed">
                  <li>In <b>Microsoft Edge</b>: Click the <b>App Available</b> icon in the address bar, or Menu (<b>...</b>) → <b>Apps</b> → <b>"Install FRIDAY"</b>.</li>
                  <li>In <b>Google Chrome</b>: Click Menu (<b>...</b>) → <b>Save and share</b> → <b>"Install FRIDAY"</b>.</li>
                  <li>Once installed, right-click the FRIDAY icon in your taskbar and select <b>"Pin to taskbar"</b>.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'autostart' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-2">
                <h3 className="font-orbitron text-sm font-bold text-cyan-200">
                  Run FRIDAY Automatically on Windows 10 Startup
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have FRIDAY boot into your Windows 10 System Tray in the background whenever you start your PC, ready to assist Boss Chris anytime with zero manual steps!
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-cyan-900/70 space-y-1.5">
                  <div className="font-bold text-cyan-300">OPTION 1: RUN THE AUTOSTART SCRIPT</div>
                  <p className="text-slate-400">
                    In your folder, double-click: <code className="text-cyan-300 font-bold">python_desktop\setup_autostart.bat</code>. It adds FRIDAY to the Windows User Run Registry key automatically.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-cyan-900/70 space-y-1.5">
                  <div className="font-bold text-cyan-300">OPTION 2: WINDOWS STARTUP FOLDER (WIN + R)</div>
                  <p className="text-slate-400">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">Win + R</kbd>, type <code className="text-cyan-300 font-bold">shell:startup</code>, and press Enter. Copy a shortcut of <b>RUN_FRIDAY_BACKGROUND.vbs</b> into that folder!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cyan-900/60 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">BACKGROUND TRAY SUPPORT READY</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 font-bold transition-all cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
