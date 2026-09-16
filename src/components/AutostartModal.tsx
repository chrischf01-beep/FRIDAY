import React, { useState } from 'react';
import { 
  X, 
  Power, 
  Copy, 
  Check, 
  ShieldCheck, 
  Terminal, 
  FolderCheck, 
  Clock, 
  UserCheck, 
  Download,
  AlertCircle
} from 'lucide-react';

interface AutostartModalProps {
  isOpen: boolean;
  onClose: () => void;
  bossName: string;
  microsoftAccount: string;
}

export const AutostartModal: React.FC<AutostartModalProps> = ({
  isOpen,
  onClose,
  bossName,
  microsoftAccount
}) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'registry' | 'startup_folder' | 'task_scheduler' | 'full_access'>('registry');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(id);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const registryScript = `# ===================================================
# FRIDAY Windows Autostart Registry Registration
# Target: Current User Run Key (No admin password needed)
# ===================================================

$TargetFolder = "$env:USERPROFILE\\FRIDAY"
$BatPath = "$TargetFolder\\run_friday.bat"

# Create target directory if it doesn't exist
if (-not (Test-Path $TargetFolder)) {
    New-Item -ItemType Directory -Path $TargetFolder -Force | Out-Null
}

# Register FRIDAY into Windows Startup Registry
$RegistryPath = "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"
Set-ItemProperty -Path $RegistryPath -Name "FRIDAY_Assistant" -Value "$BatPath" -Force

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "[FRIDAY] Auto-start configured for $env:USERNAME!" -ForegroundColor Green
Write-Host "[FRIDAY] FRIDAY will now launch automatically on Windows boot." -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
`;

  const taskSchedulerScript = `# ===================================================
# FRIDAY Windows Task Scheduler (Elevated Admin Autostart)
# Runs FRIDAY at user logon with Highest Privileges
# ===================================================

$BatPath = "$env:USERPROFILE\\FRIDAY\\run_friday.bat"
$TaskName = "FRIDAY_Executive_Autostart"

# Define task action, trigger, and highest execution principal
$Action = New-ScheduledTaskAction -Execute "$BatPath"
$Trigger = New-ScheduledTaskTrigger -AtLogOn
$Principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\\$env:USERNAME" -LogonType Interactive -RunLevel Highest
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# Register scheduled task
Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Principal $Principal -Settings $Settings -Force

Write-Host "[FRIDAY] Elevated logon task created successfully!" -ForegroundColor Green
`;

  const installBatContent = `@echo off
title FRIDAY Windows Installation and Autostart Setup
color 0b
echo ========================================================
echo   FRIDAY - AI Executive Desktop Controller Setup
echo   Configuring for Boss: %USERNAME%
echo ========================================================

set FRIDAY_DIR=%USERPROFILE%\\FRIDAY
if not exist "%FRIDAY_DIR%" mkdir "%FRIDAY_DIR%"

echo [1/3] Copying FRIDAY files...
echo @echo off > "%FRIDAY_DIR%\\run_friday.bat"
echo cd /d "%FRIDAY_DIR%" >> "%FRIDAY_DIR%\\run_friday.bat"
echo python main.py >> "%FRIDAY_DIR%\\run_friday.bat"

echo [2/3] Registering Windows Auto-Start...
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "FRIDAY_Assistant" /t REG_SZ /d "\"%FRIDAY_DIR%\\run_friday.bat\"" /f

echo [3/3] Setting Execution Privileges...
echo Auto-start registration complete!
echo.
echo ========================================================
echo   FRIDAY will now launch automatically when Windows starts!
echo ========================================================
pause
`;

  const downloadSetupBat = () => {
    const blob = new Blob([installBatContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'setup_autostart_friday.bat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900/95 border border-cyan-500/50 shadow-[0_0_35px_rgba(0,255,255,0.25)] flex flex-col max-h-[90vh] overflow-hidden text-slate-100">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-cyan-500/30 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-400/50 text-cyan-300">
              <Power className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-orbitron text-base sm:text-lg font-bold text-cyan-200 flex items-center space-x-2">
                <span>FRIDAY WINDOWS AUTO-START & PC ACCESS</span>
              </h2>
              <p className="font-mono-hud text-xs text-slate-400">
                HOST ACCOUNT: <span className="text-cyan-300 font-bold">{bossName}</span> ({microsoftAccount})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-800 flex space-x-2 font-chakra text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('registry')}
            className={`px-3 py-2 rounded-t-lg border-b-2 flex items-center space-x-1.5 transition-all ${
              activeTab === 'registry'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/60 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>METHOD 1: REGISTRY (RECOMMENDED)</span>
          </button>

          <button
            onClick={() => setActiveTab('startup_folder')}
            className={`px-3 py-2 rounded-t-lg border-b-2 flex items-center space-x-1.5 transition-all ${
              activeTab === 'startup_folder'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/60 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderCheck className="w-3.5 h-3.5" />
            <span>METHOD 2: STARTUP FOLDER</span>
          </button>

          <button
            onClick={() => setActiveTab('task_scheduler')}
            className={`px-3 py-2 rounded-t-lg border-b-2 flex items-center space-x-1.5 transition-all ${
              activeTab === 'task_scheduler'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/60 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>METHOD 3: TASK SCHEDULER</span>
          </button>

          <button
            onClick={() => setActiveTab('full_access')}
            className={`px-3 py-2 rounded-t-lg border-b-2 flex items-center space-x-1.5 transition-all ${
              activeTab === 'full_access'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/60 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FULL PC ACCESS GUIDE</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Boss Account Notification Banner */}
          <div className="rounded-xl bg-cyan-950/40 border border-cyan-500/30 p-3.5 flex items-start space-x-3">
            <UserCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs font-mono-hud leading-relaxed">
              <span className="text-cyan-300 font-bold">REGISTERED MICROSOFT ACCOUNT LINK:</span> FRIDAY has been calibrated to recognize your Windows profile as <span className="text-white font-bold">{bossName}</span> linked to <span className="text-cyan-200">{microsoftAccount}</span>. FRIDAY will address you as <span className="text-white font-bold">"{bossName}"</span> across all voice and written responses.
            </div>
          </div>

          {/* TAB 1: REGISTRY AUTOSTART */}
          {activeTab === 'registry' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-chakra text-sm font-bold text-cyan-200">
                    One-Command Windows Registry Autostart (PowerShell)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Adds FRIDAY to your Windows user logon registry key (`HKCU:\Software\Microsoft\Windows\CurrentVersion\Run`).
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={downloadSetupBat}
                    className="px-3 py-1.5 rounded-lg bg-cyan-900/60 hover:bg-cyan-800 text-cyan-100 border border-cyan-400/40 text-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .BAT</span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(registryScript, 'reg')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs flex items-center space-x-1.5 transition-colors"
                  >
                    {copiedTab === 'reg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTab === 'reg' ? 'Copied' : 'Copy Script'}</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl bg-slate-950 border border-cyan-900/80 p-4 font-mono text-xs text-cyan-100 overflow-x-auto">
                <pre>{registryScript}</pre>
              </div>

              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3 text-xs space-y-1 text-slate-300">
                <div className="font-bold text-cyan-400">Execution Instructions:</div>
                <div>1. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-200 border border-slate-700">Win + X</kbd> and select <strong>Windows PowerShell</strong> or <strong>Terminal</strong>.</div>
                <div>2. Paste the command above and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-200 border border-slate-700">Enter</kbd>.</div>
                <div>3. Whenever your PC starts up and you log into Windows, FRIDAY will immediately launch and greet you!</div>
              </div>
            </div>
          )}

          {/* TAB 2: STARTUP FOLDER */}
          {activeTab === 'startup_folder' && (
            <div className="space-y-3">
              <h3 className="font-chakra text-sm font-bold text-cyan-200">
                Windows Startup Folder Method (`shell:startup`)
              </h3>
              <p className="text-xs text-slate-400">
                Directly place a shortcut to FRIDAY inside your Windows user Startup folder.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-950/80 border border-cyan-900/60 p-3.5 space-y-2">
                  <div className="font-orbitron text-xs font-bold text-cyan-400">STEP 01</div>
                  <div className="text-xs text-slate-300">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-200 border border-slate-700">Win + R</kbd> on your keyboard to open the Windows Run dialog.
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950/80 border border-cyan-900/60 p-3.5 space-y-2">
                  <div className="font-orbitron text-xs font-bold text-cyan-400">STEP 02</div>
                  <div className="text-xs text-slate-300">
                    Type <code className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">shell:startup</code> and click <strong>OK</strong>.
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950/80 border border-cyan-900/60 p-3.5 space-y-2">
                  <div className="font-orbitron text-xs font-bold text-cyan-400">STEP 03</div>
                  <div className="text-xs text-slate-300">
                    Place a shortcut to <code className="text-cyan-300">run_friday.bat</code> inside the opened folder. Done!
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 font-mono-hud">
                Windows path: <code className="text-white">%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup</code>
              </div>
            </div>
          )}

          {/* TAB 3: TASK SCHEDULER */}
          {activeTab === 'task_scheduler' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-chakra text-sm font-bold text-cyan-200">
                    Windows Task Scheduler (Elevated Administrator Autostart)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Launches FRIDAY on Windows logon with highest execution privileges (no UAC prompt).
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(taskSchedulerScript, 'task')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs flex items-center space-x-1.5 transition-colors"
                >
                  {copiedTab === 'task' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'task' ? 'Copied' : 'Copy PowerShell Task'}</span>
                </button>
              </div>

              <div className="relative rounded-xl bg-slate-950 border border-cyan-900/80 p-4 font-mono text-xs text-cyan-100 overflow-x-auto">
                <pre>{taskSchedulerScript}</pre>
              </div>
            </div>
          )}

          {/* TAB 4: FULL PC ACCESS GUIDE */}
          {activeTab === 'full_access' && (
            <div className="space-y-3">
              <h3 className="font-chakra text-sm font-bold text-cyan-200">
                Granting Real Full PC Access to FRIDAY
              </h3>
              <p className="text-xs text-slate-400">
                FRIDAY is architected to perform real host operations through her Python kernel or administrative PowerShell bridge.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-1">
                  <div className="font-bold text-cyan-300 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>1. Administrative Execution Privilege</span>
                  </div>
                  <p className="text-slate-300">
                    To allow FRIDAY to kill stuck system processes, modify Windows registry flags, adjust system power, and modify firewall/services, right-click <code>run_friday.bat</code> and select <strong>"Run as administrator"</strong>.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-1">
                  <div className="font-bold text-cyan-300 flex items-center space-x-1.5">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>2. Direct Execution Capabilities</span>
                  </div>
                  <p className="text-slate-300">
                    FRIDAY uses <code>subprocess.Popen</code> and Windows API calls (<code>ctypes.windll.user32</code>, <code>psutil</code>, <code>pycaw</code>). All commands executed in the HUD (like opening Chrome, muting audio, creating desktop files) are real system actions.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-1">
                  <div className="font-bold text-cyan-300 flex items-center space-x-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>3. High-Risk Confirmation Protocol</span>
                  </div>
                  <p className="text-slate-300">
                    High-impact commands (rebooting the computer, deleting system directories, or killing protected tasks) trigger FRIDAY's <strong>ALERT mode</strong>, requiring your explicit click confirmation before executing.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="text-xs font-mono-hud text-slate-400">
            FRIDAY EXECUTIVE SYSTEM // STATUS: <span className="text-emerald-400">AUTORUN READY</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-500/40 text-xs font-chakra font-bold transition-colors"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
