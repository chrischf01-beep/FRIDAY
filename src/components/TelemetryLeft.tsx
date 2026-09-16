import React from 'react';
import { SystemMetrics } from '../types';
import { Cpu, HardDrive, Zap, Activity, ShieldCheck, TerminalSquare } from 'lucide-react';

interface TelemetryLeftProps {
  metrics: SystemMetrics;
  onKillProcess?: (pid: number, name: string) => void;
  onOpenDiagnostics: () => void;
}

export const TelemetryLeft: React.FC<TelemetryLeftProps> = ({
  metrics,
  onKillProcess,
  onOpenDiagnostics
}) => {
  const formatUptime = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="flex flex-col space-y-3.5 h-full select-none">
      {/* 1. Host Architecture Banner */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/25 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-chakra text-xs font-bold text-cyan-200 tracking-wider">
              HOST KERNEL TELEMETRY
            </span>
          </div>
          <span className="font-mono-hud text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
            NOMINAL
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono-hud">
          <div>
            <div className="text-slate-400 text-[10px]">PLATFORM</div>
            <div className="text-cyan-100 font-semibold truncate">Windows 11 Pro x64</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">UPTIME</div>
            <div className="text-cyan-300 font-semibold">{formatUptime(metrics.uptimeSeconds)}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">CORE PROTOCOL</div>
            <div className="text-cyan-100 font-semibold">F.R.I.D.A.Y. MK-VI</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">DIAGNOSTICS</div>
            <button
              onClick={onOpenDiagnostics}
              className="text-cyan-400 hover:text-cyan-200 underline font-semibold transition-colors flex items-center space-x-1"
            >
              <span>Scan Logs</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hardware Resource Telemetry */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/25 backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-cyan-500/20 pb-1.5">
          <div className="flex items-center space-x-1.5 text-cyan-300 font-chakra font-semibold">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>HARDWARE SENSORS</span>
          </div>
          <span className="font-mono-hud text-[10px] text-cyan-400">LIVE FEED</span>
        </div>

        {/* CPU Load */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono-hud mb-1">
            <span className="text-slate-300 flex items-center space-x-1">
              <span>CPU Core Load</span>
              <span className="text-[10px] text-cyan-400">({metrics.cpuTemp}°C)</span>
            </span>
            <span className="text-cyan-300 font-bold">{metrics.cpuUsage}%</span>
          </div>
          <div className="w-full bg-slate-900/90 h-2 rounded-full overflow-hidden border border-cyan-900/60 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,255,255,0.6)]"
              style={{ width: `${metrics.cpuUsage}%` }}
            />
          </div>
        </div>

        {/* RAM Usage */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono-hud mb-1">
            <span className="text-slate-300 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>Physical RAM</span>
            </span>
            <span className="text-cyan-300 font-bold">
              {metrics.ramUsedGB} / {metrics.ramTotalGB} GB ({metrics.ramPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-900/90 h-2 rounded-full overflow-hidden border border-cyan-900/60 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-sky-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${metrics.ramPercent}%` }}
            />
          </div>
        </div>

        {/* Storage */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono-hud mb-1">
            <span className="text-slate-300 flex items-center space-x-1">
              <HardDrive className="w-3 h-3 text-cyan-400" />
              <span>Drive C:\ (System)</span>
            </span>
            <span className="text-cyan-300 font-bold">
              {metrics.diskUsedGB} / {metrics.diskTotalGB} GB
            </span>
          </div>
          <div className="w-full bg-slate-900/90 h-2 rounded-full overflow-hidden border border-cyan-900/60 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-cyan-600 to-sky-400 rounded-full transition-all duration-500"
              style={{ width: `${metrics.diskPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Windows Process Task Manager */}
      <div className="flex-1 p-3 rounded-xl bg-slate-950/80 border border-cyan-500/25 backdrop-blur-md flex flex-col min-h-0">
        <div className="flex items-center justify-between text-xs border-b border-cyan-500/20 pb-2 mb-2">
          <div className="flex items-center space-x-1.5 text-cyan-300 font-chakra font-semibold">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACTIVE PROCESS DAEMONS</span>
          </div>
          <span className="font-mono-hud text-[10px] text-slate-400">
            {metrics.activeProcesses.length} TASKS
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 font-mono-hud text-xs">
          {metrics.activeProcesses.map((proc) => (
            <div 
              key={proc.pid}
              className="flex items-center justify-between p-1.5 rounded bg-slate-900/60 border border-cyan-950 hover:border-cyan-500/40 transition-colors group"
            >
              <div className="flex flex-col min-w-0 pr-2">
                <span className="text-cyan-100 font-medium truncate group-hover:text-cyan-300">
                  {proc.name}
                </span>
                <span className="text-[10px] text-slate-500">
                  PID: {proc.pid} • {proc.memoryMb} MB
                </span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[11px] font-bold text-cyan-400">
                  {proc.cpu}%
                </span>
                {onKillProcess && proc.name !== "System Idle Process" && (
                  <button
                    onClick={() => onKillProcess(proc.pid, proc.name)}
                    className="opacity-0 group-hover:opacity-100 text-[10px] px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 hover:bg-rose-900 border border-rose-600/40 transition-opacity"
                    title="Terminate Process"
                  >
                    KILL
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
