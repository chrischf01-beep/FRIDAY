import React, { useState, KeyboardEvent } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX, Sparkles, Terminal } from 'lucide-react';

interface CommandBarProps {
  onSendMessage: (text: string, isVoice?: boolean) => void;
  isListening: boolean;
  onToggleMic: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  disabled?: boolean;
}

export const CommandBar: React.FC<CommandBarProps> = ({
  onSendMessage,
  isListening,
  onToggleMic,
  voiceEnabled,
  onToggleVoice,
  disabled
}) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    '💻 Build SaaS for VS Code',
    '💻 Create Portfolio Website',
    '🚀 Open Visual Studio Code',
    '🧩 Install VS Code Extensions',
    '📊 Open Task Manager',
    '🪟 Snap Split Screen',
    '🧬 Take Full Control',
    '🖱️ Move Cursor to Center',
    '🎵 Play Favorite Playlist',
    '💬 Text on WhatsApp',
    '📈 Trade Bitcoin',
    '🚀 Open Chrome'
  ];

  return (
    <div className="flex flex-col space-y-2 select-none w-full">
      {/* Quick Suggestion Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none font-chakra text-xs">
        <span className="text-cyan-400/70 text-[11px] font-bold flex items-center space-x-1 shrink-0 mr-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>PROMPTS:</span>
        </span>
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(sug)}
            className="px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-cyan-950 text-cyan-300/90 hover:text-cyan-100 border border-cyan-900/60 hover:border-cyan-500/50 shrink-0 text-[11px] transition-all"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Main Input Control Bar */}
      <div className="flex items-center space-x-2 bg-slate-950/90 border border-cyan-500/40 rounded-xl p-1.5 shadow-[0_0_20px_rgba(0,255,255,0.1)] focus-within:border-cyan-400 focus-within:shadow-[0_0_25px_rgba(0,255,255,0.25)] transition-all">
        {/* Terminal Icon Prefix */}
        <div className="pl-2 text-cyan-400/80 hidden sm:block">
          <Terminal className="w-4 h-4" />
        </div>

        {/* Input Text Box */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Listening... (Speak your command now)" : "Type command or say 'Hey Friday' (e.g. 'Open Chrome', 'Check CPU', 'Create Report')..."}
          disabled={disabled}
          className="flex-1 bg-transparent px-2 py-1.5 text-cyan-100 placeholder-cyan-500/50 text-sm font-chakra focus:outline-none disabled:opacity-50"
        />

        {/* Voice Speech (TTS) Output Toggle */}
        <button
          onClick={onToggleVoice}
          className={`p-2 rounded-lg transition-colors ${
            voiceEnabled 
              ? 'text-cyan-300 hover:text-white hover:bg-cyan-950/60' 
              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
          }`}
          title={voiceEnabled ? "Voice Output Active (TTS Enabled)" : "Voice Output Muted (TTS Disabled)"}
        >
          {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Microphone STT Toggle */}
        <button
          onClick={onToggleMic}
          className={`p-2.5 rounded-lg border transition-all flex items-center space-x-1.5 ${
            isListening
              ? 'bg-sky-500/30 text-sky-200 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)] animate-pulse'
              : 'bg-slate-900 text-cyan-300 border-cyan-500/40 hover:bg-cyan-950 hover:border-cyan-400'
          }`}
          title={isListening ? "Stop Listening" : "Voice Input (Speech Recognition)"}
        >
          {isListening ? <Mic className="w-4 h-4 text-sky-300" /> : <Mic className="w-4 h-4" />}
          <span className="font-chakra text-xs font-bold hidden md:inline">
            {isListening ? "LISTENING" : "VOICE"}
          </span>
        </button>

        {/* Execute / Send Button */}
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 text-slate-950 font-chakra text-xs font-bold tracking-wider flex items-center space-x-1.5 shadow-[0_0_15px_rgba(0,255,255,0.4)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <span>EXECUTE</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
