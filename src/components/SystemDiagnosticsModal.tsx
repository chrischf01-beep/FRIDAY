import React, { useState } from 'react';
import { X, Activity, Terminal, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';

interface SystemDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunDiagnostics: (logText: string) => void;
}

export const SystemDiagnosticsModal: React.FC<SystemDiagnosticsModalProps> = ({
  isOpen,
  onClose,
  onRunDiagnostics
}) => {
  const [logInput, setLogInput] = useState('');

  const errorPresets = [
    {
      label: 'Error 0x80070005 (Access Denied)',
      text: 'Windows Update / Installer Error 0x80070005: Access Denied. Failed to write into C:\\Program Files\\WindowsApps. ACL Permission denied.'
    },
    {
      label: 'BSOD 0x0000007E (Thread Exception)',
      text: 'SYSTEM_THREAD_EXCEPTION_NOT_HANDLED (0x0000007E). Bugcheck Parameter 1: 0xffffffffc0000005. Caused by driver: dxgkrnl.sys (DirectX Graphics Kernel).'
    },
    {
      label: 'Port 8080/3000 Conflict',
      text: 'Error: listen EADDRINUSE: address already in use 0.0.0.0:8080. Process PID 4120 occupying port.'
    },
    {
      label: 'DISM Component Store Corruption',
      text: 'DISM Error: 0x800f081f. The source files could not be found. Windows Component Store payload missing during Repair-WindowsImage.'
    }
  ];

  if (!isOpen) return null;

  const handleAnalyze = () => {
    if (!logInput.trim()) return;
    onRunDiagnostics(`Analyze this Windows system error log and provide step-by-step root cause analysis and copy-pasteable PowerShell fixes:\n\n${logInput.trim()}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#030818] border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.25)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-cyan-500/30">
          <div className="flex items-center space-x-2.5">
            <Activity className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="font-chakra text-sm font-bold text-white tracking-wider">
                WINDOWS SYSTEM DIAGNOSTICS & LOG ANALYZER
              </h2>
              <p className="font-mono-hud text-[11px] text-cyan-400/80">
                Root-cause diagnostic engine with actionable PowerShell remediations
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

        {/* Modal Body */}
        <div className="p-5 space-y-4 font-chakra text-xs">
          {/* Preset Buttons */}
          <div>
            <label className="block text-slate-300 font-bold mb-2">QUICK SYSTEM ERROR PRESETS</label>
            <div className="grid grid-cols-2 gap-2">
              {errorPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLogInput(preset.text)}
                  className="p-2.5 rounded-lg bg-slate-950/90 hover:bg-cyan-950/60 border border-cyan-950 hover:border-cyan-500/40 text-left transition-all group"
                >
                  <div className="font-bold text-cyan-200 group-hover:text-cyan-300">
                    {preset.label}
                  </div>
                  <div className="font-mono-hud text-[10px] text-slate-400 truncate mt-0.5">
                    {preset.text}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Paste Input Area */}
          <div>
            <label className="block text-slate-300 font-bold mb-1">
              PASTE EVENT LOG, CRASH DUMP, OR ERROR CODE
            </label>
            <textarea
              rows={5}
              value={logInput}
              onChange={(e) => setLogInput(e.target.value)}
              placeholder="Paste Windows Event Viewer log, BSOD code, or PowerShell stack trace here..."
              className="w-full bg-slate-950 border border-cyan-500/30 rounded-lg p-3 text-cyan-100 font-mono-hud text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-cyan-500/20">
            <span className="text-[11px] text-slate-400 flex items-center space-x-1 font-mono-hud">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              <span>Step-by-step root cause analysis & PowerShell script fixes</span>
            </span>

            <button
              onClick={handleAnalyze}
              disabled={!logInput.trim()}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 text-slate-950 font-bold flex items-center space-x-1.5 shadow-[0_0_15px_rgba(0,255,255,0.4)] disabled:opacity-40 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>RUN DIAGNOSTIC SWEEP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
