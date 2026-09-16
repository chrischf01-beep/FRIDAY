import React, { useState } from 'react';
import { PYTHON_FILES } from '../data/pythonFiles';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Terminal, 
  ExternalLink,
  ShieldCheck,
  FolderDown
} from 'lucide-react';

interface PythonSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PythonSourceModal: React.FC<PythonSourceModalProps> = ({ isOpen, onClose }) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = PYTHON_FILES[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (file = currentFile) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    PYTHON_FILES.forEach((f, idx) => {
      setTimeout(() => {
        handleDownloadFile(f);
      }, idx * 250);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#030818] border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.25)] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-cyan-500/30">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40">
              <FileCode className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-chakra text-sm font-bold text-white tracking-wider flex items-center space-x-2">
                <span>F.R.I.D.A.Y. PYTHON DESKTOP SUITE (PYQT6 + SEELIN HUD)</span>
              </h2>
              <p className="font-mono-hud text-[11px] text-cyan-400/80">
                Complete modular source code for standalone Windows PC deployment
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadAll}
              className="px-3 py-1.5 rounded-lg bg-cyan-900/50 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-chakra text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              title="Download all Python files to run on your PC"
            >
              <FolderDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>DOWNLOAD ALL</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Setup Banner & API key instructions */}
        <div className="px-5 py-2.5 bg-cyan-950/40 border-b border-cyan-500/20 text-xs font-mono-hud flex items-center justify-between text-cyan-300">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <b>Quick Windows Run:</b> pip install -r requirements.txt ➔ $env:GEMINI_API_KEY="key" ➔ python main.py
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden md:inline">
            Tested on Windows 10/11 x64
          </span>
        </div>

        {/* Main Body with File Tabs on Left & Code Viewer on Right */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* File Selector Sidebar */}
          <div className="w-full md:w-60 bg-slate-950/90 border-b md:border-b-0 md:border-r border-cyan-500/20 p-2.5 space-y-1.5 overflow-y-auto">
            <div className="font-chakra text-[11px] font-bold text-slate-400 px-2 py-1">
              PROJECT MODULES
            </div>
            {PYTHON_FILES.map((file, idx) => (
              <button
                key={file.name}
                onClick={() => setActiveFileIndex(idx)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left font-mono-hud text-xs transition-all ${
                  activeFileIndex === idx
                    ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/60 shadow-[0_0_12px_rgba(0,255,255,0.2)]'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-cyan-300 border border-transparent'
                }`}
              >
                <div className="truncate">
                  <div className="font-semibold text-xs">{file.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{file.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#020512]">
            {/* Viewer Top Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-950/70 border-b border-cyan-500/20">
              <div className="flex items-center space-x-2 font-mono-hud text-xs">
                <span className="text-cyan-400 font-bold">{currentFile.name}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 text-[11px]">{currentFile.description}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-chakra font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
                <button
                  onClick={() => handleDownloadFile(currentFile)}
                  className="px-3 py-1 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-500/40 text-xs font-chakra font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SAVE FILE</span>
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 font-mono-hud text-xs text-cyan-100/90 leading-relaxed">
              <pre className="selection:bg-cyan-900 selection:text-white">
                <code>{currentFile.content}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
