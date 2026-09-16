export type OrbState = 'idle' | 'listening' | 'processing' | 'speaking' | 'alert';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'friday' | 'system';
  timestamp: string;
  displayText: string;
  voiceText?: string;
  action?: SystemActionResponse;
  status?: 'executing' | 'completed' | 'warning' | 'error';
  isVoiceInput?: boolean;
}

export interface SystemActionResponse {
  type: 
    | 'APP_LAUNCH' 
    | 'SYSTEM_CONTROL' 
    | 'FILE_OPERATION' 
    | 'DIAGNOSTIC' 
    | 'DOCUMENT_CREATE' 
    | 'WEB_ACTION' 
    | 'SCRIPT_RUN'
    | 'CODE_GENERATE'
    | 'WEB_PROJECT_CREATE'
    | 'MEDIA_ACTION'
    | 'FINANCIAL_ACTION'
    | 'NONE';
  title: string;
  details: string;
  commandSnippet?: string;
  commandLanguage?: 'powershell' | 'cmd' | 'python';
  isHighRisk?: boolean;
  status: 'simulated' | 'executed' | 'pending_confirmation';
}

export interface HostUserInfo {
  username: string;
  displayName?: string;
  microsoftAccount: string;
  isElevatedAdmin?: boolean;
  domain: string;
  platform?: string;
  cpuModel?: string;
  cpuCores?: number;
  nodeVersion?: string;
  bossAddress?: string;
  osArchitecture?: string;
  osPlatform?: string;
  osRelease?: string;
}

export interface SystemMetrics {
  cpuUsage: number;
  cpuTemp: number;
  ramUsedGB: number;
  ramTotalGB: number;
  ramPercent: number;
  gpuUsage: number;
  gpuTemp: number;
  diskUsedGB: number;
  diskTotalGB: number;
  diskPercent: number;
  networkPingMs: number;
  networkUpMbps: number;
  networkDownMbps: number;
  batteryPercent: number;
  batteryCharging: boolean;
  uptimeSeconds: number;
  activeProcesses: ProcessInfo[];
  hostUser?: HostUserInfo;
}

export interface ProcessInfo {
  pid: number;
  name: string;
  cpu: number;
  memoryMb: number;
  status: 'running' | 'sleeping' | 'suspended';
}

export interface PythonDesktopFile {
  name: string;
  path: string;
  description: string;
  content: string;
}
