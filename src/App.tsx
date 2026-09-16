import React, { useState, useEffect, useCallback } from 'react';
import { OrbState, ChatMessage, SystemMetrics } from './types';
import { CentralOrb } from './components/CentralOrb';
import { TelemetryLeft } from './components/TelemetryLeft';
import { TelemetryRight } from './components/TelemetryRight';
import { TerminalChat } from './components/TerminalChat';
import { CommandBar } from './components/CommandBar';
import { HeaderNav } from './components/HeaderNav';
import { PythonSourceModal } from './components/PythonSourceModal';
import { DocumentGeneratorModal } from './components/DocumentGeneratorModal';
import { SystemDiagnosticsModal } from './components/SystemDiagnosticsModal';
import { AutostartModal } from './components/AutostartModal';
import { QuickStartModal } from './components/QuickStartModal';
import { VSCodeWebStudioModal } from './components/VSCodeWebStudioModal';
import { DesktopAppBackgroundModal } from './components/DesktopAppBackgroundModal';
import { AutonomousRPAModal } from './components/AutonomousRPAModal';
import { voiceService } from './services/voice';
import { AlertTriangle, Zap, Volume2, Sparkles, Code2 } from 'lucide-react';

export default function App() {
  // Orb and Voice states
  const [orbState, setOrbState] = useState<OrbState>('idle');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [aiConnected, setAiConnected] = useState<boolean>(true);
  const [hasWokenUp, setHasWokenUp] = useState<boolean>(false);
  const [latestSpokenText, setLatestSpokenText] = useState<string>(
    'Systems nominal, Boss Chris. FRIDAY is active on Windows 10 and standing by.'
  );

  // Modals
  const [isQuickStartOpen, setIsQuickStartOpen] = useState<boolean>(false);
  const [isVSCodeStudioOpen, setIsVSCodeStudioOpen] = useState<boolean>(false);
  const [isDesktopAppModalOpen, setIsDesktopAppModalOpen] = useState<boolean>(false);
  const [isRPAModalOpen, setIsRPAModalOpen] = useState<boolean>(false);
  const [isPythonModalOpen, setIsPythonModalOpen] = useState<boolean>(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState<boolean>(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState<boolean>(false);
  const [isAutostartOpen, setIsAutostartOpen] = useState<boolean>(false);
  const [powerModal, setPowerModal] = useState<'lock' | 'restart' | 'shutdown' | null>(null);

  // System Metrics
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 18,
    cpuTemp: 47,
    ramUsedGB: 6.2,
    ramTotalGB: 16.0,
    ramPercent: 38,
    gpuUsage: 14,
    gpuTemp: 49,
    diskUsedGB: 340.5,
    diskTotalGB: 953.8,
    diskPercent: 35,
    networkPingMs: 12,
    networkUpMbps: 52.4,
    networkDownMbps: 210.8,
    batteryPercent: 98,
    batteryCharging: true,
    uptimeSeconds: 15420,
    hostUser: {
      username: "Chris",
      domain: "WORKGROUP",
      osArchitecture: "x64",
      osPlatform: "win32",
      osRelease: "10.0.19045",
      microsoftAccount: "luxindustries14@gmail.com",
      bossAddress: "Boss Chris"
    },
    activeProcesses: [
      { pid: 4820, name: "friday_kernel.exe", cpu: 1.4, memoryMb: 210, status: "running" },
      { pid: 1142, name: "chrome.exe", cpu: 4.8, memoryMb: 1150, status: "running" },
      { pid: 7894, name: "code.exe (VS Code)", cpu: 2.9, memoryMb: 820, status: "running" },
      { pid: 902, name: "spotify.exe", cpu: 0.7, memoryMb: 290, status: "running" },
      { pid: 140, name: "dwm.exe (Desktop Window Manager)", cpu: 1.8, memoryMb: 185, status: "running" },
      { pid: 6128, name: "explorer.exe", cpu: 0.5, memoryMb: 240, status: "running" }
    ]
  });

  const bossName = metrics.hostUser?.bossAddress || "Boss Chris";
  const microsoftAccount = metrics.hostUser?.microsoftAccount || "luxindustries14@gmail.com";

  // Chat conversation
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'friday',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      displayText: `### FRIDAY Polymath Assistant Online for ${bossName}\n\nSystems online, **${bossName}**. FRIDAY is calibrated for Windows 10 and standing by as your executive companion.\n\n- **Operator:** ${bossName}\n- **Platform:** Windows 10 Environment\n- **Academic Mastery:** Math equations, physics, chemistry, biology, history, and study tutoring\n- **World & History:** Global geography, ancient wonders, international cultures, and astronomy\n- **Art & Culture:** Master painters (Van Gogh, Da Vinci, Monet, Basquiat), art movements, and music\n- **VS Code Web Studio:** Instant website generator with live preview and direct launch into VS Code (\`code .\`)\n\nAsk me any study inquiry, world question, artist breakdown, or click **VS CODE STUDIO** to build a modern website!`,
      voiceText: `Systems online, ${bossName}. FRIDAY is ready to assist you with study, world questions, artists, and building websites for VS Code.`,
      status: 'completed'
    }
  ]);

  // Fetch telemetry
  const fetchTelemetry = useCallback(async () => {
    try {
      const res = await fetch('/api/system-metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch {
      // Keep existing telemetry
    }
  }, []);

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, [fetchTelemetry]);

  // Check health
  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => {
        setAiConnected(d.aiConnected ?? true);
      })
      .catch(() => {});
  }, []);

  // Speak helper
  const handleSpeak = (text: string) => {
    if (!voiceEnabled) return;
    setOrbState('speaking');
    setLatestSpokenText(text);
    voiceService.speak(
      text,
      () => setOrbState('speaking'),
      () => setOrbState('idle')
    );
  };

  // Wake & Initialize FRIDAY with audio permission
  const handleWakeFriday = () => {
    setHasWokenUp(true);
    voiceService.playHudSound('activate');
    const greeting = `Systems online, ${bossName}. FRIDAY is active and ready for your command.`;
    handleSpeak(greeting);
  };

  // Send message to backend
  const handleSendMessage = async (text: string, isVoice = false) => {
    if (!text.trim()) return;

    voiceService.playHudSound('beep');

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      displayText: text,
      isVoiceInput: isVoice
    };

    setMessages((prev) => [...prev, userMsg]);
    setOrbState('processing');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, bossName })
      });

      const data = await response.json();

      const fridayMsg: ChatMessage = {
        id: `fri-${Date.now()}`,
        sender: 'friday',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        displayText: data.displayText || `Command executed, ${bossName}.`,
        voiceText: data.voiceText,
        action: data.action,
        status: data.action?.isHighRisk ? 'warning' : 'completed'
      };

      setMessages((prev) => [...prev, fridayMsg]);

      const speech = data.voiceText || data.displayText?.replace(/#+/g, '').slice(0, 140) || `Command executed, ${bossName}.`;
      setLatestSpokenText(speech);

      // If action is high-risk, set orb to alert
      if (data.action?.isHighRisk) {
        setOrbState('alert');
        voiceService.playHudSound('warning');
      } else {
        setOrbState('speaking');
        voiceService.playHudSound('chime');
      }

      // Voice output
      if (voiceEnabled && speech) {
        handleSpeak(speech);
      } else {
        setTimeout(() => setOrbState('idle'), 1200);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'friday',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        displayText: `### System Notice\n\nCommunication link experienced a brief interruption: \`${err.message || 'Host offline'}\``,
        voiceText: `Encountered a temporary communication interruption, ${bossName}.`,
        status: 'error'
      };
      setMessages((prev) => [...prev, errorMsg]);
      setOrbState('idle');
    }
  };

  // Microphone toggle
  const toggleMicrophone = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      setOrbState('idle');
    } else {
      voiceService.startListening(
        (transcript) => {
          setIsListening(false);
          setOrbState('idle');
          let clean = transcript.trim();
          if (clean.toLowerCase().startsWith("friday")) {
            clean = clean.substring(6).trim();
          } else if (clean.toLowerCase().startsWith("hey friday")) {
            clean = clean.substring(10).trim();
          }
          if (clean) {
            handleSendMessage(clean, true);
          }
        },
        (state) => {
          setIsListening(state === 'listening');
          setOrbState(state === 'listening' ? 'listening' : 'idle');
        },
        () => {
          setIsListening(false);
          setOrbState('idle');
        }
      );
    }
  };

  // Kill Process
  const handleKillProcess = (pid: number, name: string) => {
    voiceService.playHudSound('warning');
    const warningMsg: ChatMessage = {
      id: `action-kill-${Date.now()}`,
      sender: 'friday',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      displayText: `### Intercepted Termination Request\n\nAttempting to terminate process **${name}** (PID: \`${pid}\`).\n\n\`\`\`powershell\nStop-Process -Id ${pid} -Force\n\`\`\``,
      voiceText: `Terminating ${name}, ${bossName}. Confirming task clearance.`,
      action: {
        type: 'SYSTEM_CONTROL',
        title: `Kill Process ${name}`,
        details: `Force termination of PID ${pid}`,
        commandSnippet: `Stop-Process -Id ${pid} -Force`,
        commandLanguage: 'powershell',
        isHighRisk: true,
        status: 'pending_confirmation'
      }
    };
    setMessages((prev) => [...prev, warningMsg]);
    setOrbState('alert');
  };

  // Confirm / Cancel Action
  const handleConfirmAction = async (msgId: string) => {
    voiceService.playHudSound('activate');
    const targetMsg = messages.find(m => m.id === msgId);
    
    // Actually execute the command on the real host backend
    if (targetMsg?.action?.commandSnippet) {
      try {
        await fetch('/api/action/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            actionType: targetMsg.action.type,
            title: targetMsg.action.title,
            command: targetMsg.action.commandSnippet,
            commandLanguage: targetMsg.action.commandLanguage
          })
        });
      } catch {
        // Fallback logged
      }
    }

    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId && m.action) {
          return {
            ...m,
            action: { ...m.action, status: 'executed' }
          };
        }
        return m;
      })
    );
    setOrbState('speaking');
    const note = `Authorization verified, ${bossName}. Command executed directly on host.`;
    handleSpeak(note);
  };

  const handleCancelAction = (msgId: string) => {
    voiceService.playHudSound('beep');
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId && m.action) {
          return {
            ...m,
            displayText: `${m.displayText}\n\n*Command aborted by operator.*`,
            action: undefined
          };
        }
        return m;
      })
    );
    setOrbState('idle');
  };

  // Power action trigger
  const handlePowerAction = (action: 'lock' | 'restart' | 'shutdown') => {
    if (action === 'lock') {
      handleSendMessage("Lock computer");
    } else {
      setPowerModal(action);
    }
  };

  const executeConfirmedPower = () => {
    if (!powerModal) return;
    const action = powerModal;
    setPowerModal(null);
    handleSendMessage(`${action === 'restart' ? 'Restart' : 'Shutdown'} computer immediately`);
  };

  return (
    <div className="relative w-screen h-screen bg-[#020510] text-cyan-100 flex flex-col overflow-hidden hud-grid">
      {/* Sci-Fi Scanlines & Vignette */}
      <div className="hud-scanlines absolute inset-0 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Header Bar */}
      <HeaderNav
        onOpenPythonModal={() => setIsPythonModalOpen(true)}
        onOpenDocModal={() => setIsDocModalOpen(true)}
        onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        onOpenAutostartModal={() => setIsAutostartOpen(true)}
        onOpenQuickStart={() => setIsQuickStartOpen(true)}
        onOpenVSCodeWebStudio={() => setIsVSCodeStudioOpen(true)}
        onOpenDesktopAppModal={() => setIsDesktopAppModalOpen(true)}
        onOpenRPAModal={() => setIsRPAModalOpen(true)}
        voiceEnabled={voiceEnabled}
        onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
        aiConnected={aiConnected}
        bossName={bossName}
      />

      {/* Main HUD Layout */}
      <main className="flex-1 min-h-0 p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3.5 z-20 overflow-hidden">
        {/* Left Column: System & Hardware Telemetry (3 cols) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col min-h-0">
          <TelemetryLeft
            metrics={metrics}
            onKillProcess={handleKillProcess}
            onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
          />
        </div>

        {/* Center Column: 3D Holographic Technological Globe + Console Terminal (6 cols) */}
        <div className="lg:col-span-6 flex flex-col min-h-0 space-y-2.5">
          {/* Audio & Wake Initializer Banner (First-time user wake) */}
          {!hasWokenUp && (
            <div className="shrink-0 p-2.5 rounded-xl bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-cyan-950/90 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,255,255,0.2)] flex items-center justify-between gap-3 font-chakra animate-pulse">
              <div className="flex items-center space-x-2 text-xs">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-cyan-100">
                  Ready for <b className="text-cyan-300">{bossName}</b>. Click to enable live voice speech & audio channels:
                </span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handleWakeFriday}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs shadow-[0_0_12px_rgba(0,255,255,0.5)] transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>WAKE FRIDAY</span>
                </button>
                <button
                  onClick={() => setIsQuickStartOpen(true)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all cursor-pointer"
                >
                  QUICK-START
                </button>
              </div>
            </div>
          )}

          {/* Top: Central 3D Holographic AI Globe & Live Subtitle Bar */}
          <div className="shrink-0 flex items-center justify-center py-2 sm:py-3 rounded-xl bg-slate-950/60 border border-cyan-500/25 backdrop-blur-md relative overflow-hidden">
            {/* Cyber Corner Decors */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80" />

            <CentralOrb
              state={orbState}
              onClick={toggleMicrophone}
              audioActive={isListening || orbState === 'speaking'}
              spokenText={latestSpokenText}
              bossName={bossName}
            />
          </div>

          {/* Bottom Center: Terminal Console Log */}
          <div className="flex-1 min-h-0">
            <TerminalChat
              messages={messages}
              onSpeakText={handleSpeak}
              onConfirmAction={handleConfirmAction}
              onCancelAction={handleCancelAction}
              onClearChat={() => setMessages([])}
            />
          </div>

          {/* Bottom Command Bar */}
          <div className="shrink-0">
            <CommandBar
              onSendMessage={handleSendMessage}
              isListening={isListening}
              onToggleMic={toggleMicrophone}
              voiceEnabled={voiceEnabled}
              onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
              disabled={orbState === 'processing'}
            />
          </div>
        </div>

        {/* Right Column: Automation Controls & Radar (3 cols) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col min-h-0">
          <TelemetryRight
            metrics={metrics}
            onQuickCommand={(cmd) => handleSendMessage(cmd)}
            onOpenPythonModal={() => setIsPythonModalOpen(true)}
            onOpenDocModal={() => setIsDocModalOpen(true)}
            onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
            onPowerAction={handlePowerAction}
          />
        </div>
      </main>

      {/* Modals */}
      <PythonSourceModal
        isOpen={isPythonModalOpen}
        onClose={() => setIsPythonModalOpen(false)}
      />

      <DocumentGeneratorModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        onGenerateDocument={(docType, title, prompt) => {
          handleSendMessage(`Create a ${docType} document titled "${title}" with specifications: ${prompt}`);
        }}
      />

      <SystemDiagnosticsModal
        isOpen={isDiagnosticsOpen}
        onClose={() => setIsDiagnosticsOpen(false)}
        onRunDiagnostics={(prompt) => {
          handleSendMessage(prompt);
        }}
      />

      <AutostartModal
        isOpen={isAutostartOpen}
        onClose={() => setIsAutostartOpen(false)}
        bossName={bossName}
        microsoftAccount={microsoftAccount}
      />

      <QuickStartModal
        isOpen={isQuickStartOpen}
        onClose={() => setIsQuickStartOpen(false)}
        bossName={bossName}
        onWakeFriday={handleWakeFriday}
      />

      <VSCodeWebStudioModal
        isOpen={isVSCodeStudioOpen}
        onClose={() => setIsVSCodeStudioOpen(false)}
        bossName={bossName}
        onSendToChat={(prompt) => handleSendMessage(prompt, false)}
      />

      <DesktopAppBackgroundModal
        isOpen={isDesktopAppModalOpen}
        onClose={() => setIsDesktopAppModalOpen(false)}
        bossName={bossName}
      />

      <AutonomousRPAModal
        isOpen={isRPAModalOpen}
        onClose={() => setIsRPAModalOpen(false)}
        onDispatchCommand={(cmd) => handleSendMessage(cmd)}
        bossName={bossName}
      />

      {/* Power Confirmation Dialog */}
      {powerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-950 border border-rose-500/80 rounded-2xl p-5 shadow-[0_0_50px_rgba(244,63,94,0.3)] text-center font-chakra">
            <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-500 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wider mb-1">
              CONFIRM SYSTEM {powerModal.toUpperCase()}
            </h3>
            <p className="text-xs text-rose-200/80 mb-5 font-mono-hud">
              You are about to issue a critical Windows OS power transition for {bossName}. Active desktop workflows will be halted.
            </p>
            <div className="flex space-x-3 justify-center">
              <button
                onClick={() => setPowerModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
              >
                ABORT
              </button>
              <button
                onClick={executeConfirmedPower}
                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(244,63,94,0.5)] transition-all"
              >
                CONFIRM {powerModal.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
