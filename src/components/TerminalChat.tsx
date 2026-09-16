import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Markdown from 'react-markdown';
import { 
  Volume2, 
  Copy, 
  Check, 
  Terminal, 
  AlertTriangle, 
  Sparkles, 
  Play, 
  Trash2,
  Cpu
} from 'lucide-react';

interface TerminalChatProps {
  messages: ChatMessage[];
  onSpeakText: (text: string) => void;
  onConfirmAction: (msgId: string) => void;
  onCancelAction: (msgId: string) => void;
  onClearChat: () => void;
}

export const TerminalChat: React.FC<TerminalChatProps> = ({
  messages,
  onSpeakText,
  onConfirmAction,
  onCancelAction,
  onClearChat
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full rounded-xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-md overflow-hidden select-text">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-cyan-500/25 select-none">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-chakra text-xs font-bold text-cyan-300 tracking-wider flex items-center space-x-1.5 ml-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>F.R.I.D.A.Y. SYSTEM CONSOLE</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-mono-hud text-[10px] text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
            {messages.length} LOGS
          </span>
          <button
            onClick={onClearChat}
            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Clear Console History"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-3 space-y-3.5 font-mono-hud text-xs"
      >
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isFriday = msg.sender === 'friday';
          const isSystem = msg.sender === 'system';

          return (
            <div 
              key={msg.id} 
              className={`flex flex-col rounded-lg p-3 transition-all ${
                isUser 
                  ? 'bg-slate-900/90 border border-sky-600/40 ml-6' 
                  : isFriday 
                  ? 'bg-slate-900/60 border border-cyan-500/30 mr-2 shadow-[0_0_15px_rgba(0,255,255,0.06)]' 
                  : 'bg-emerald-950/30 border border-emerald-500/30'
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2 select-none">
                <div className="flex items-center space-x-2">
                  <span className={`font-chakra text-xs font-bold tracking-wider ${
                    isUser ? 'text-sky-300' : isFriday ? 'text-cyan-300' : 'text-emerald-400'
                  }`}>
                    {isUser ? 'USER // OPERATOR' : isFriday ? 'F.R.I.D.A.Y. KERNEL' : 'SYSTEM DAEMON'}
                  </span>
                  {msg.isVoiceInput && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-950 text-sky-400 border border-sky-600/40">
                      VOICE STT
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {isFriday && (
                    <button
                      onClick={() => onSpeakText(msg.voiceText || msg.displayText)}
                      className="p-1 rounded text-cyan-400 hover:text-white hover:bg-cyan-950/60 transition-colors"
                      title="Play Audio Voice (TTS)"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Message Content rendered in clean Markdown */}
              <div className="prose prose-invert prose-xs max-w-none text-slate-200 leading-relaxed overflow-x-auto">
                <div className="markdown-body">
                  <Markdown
                    components={{
                      h1: ({ children }) => <h1 className="text-cyan-200 font-chakra text-base font-bold my-1">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-cyan-300 font-chakra text-sm font-bold my-1">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-cyan-400 font-chakra text-xs font-bold my-1">{children}</h3>,
                      p: ({ children }) => <p className="my-1 text-slate-200 leading-normal">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside my-1 space-y-0.5 text-cyan-100">{children}</ul>,
                      li: ({ children }) => <li className="text-slate-200">{children}</li>,
                      table: ({ children }) => (
                        <div className="my-2 overflow-x-auto border border-cyan-500/30 rounded">
                          <table className="min-w-full divide-y divide-cyan-500/20 text-[11px]">{children}</table>
                        </div>
                      ),
                      th: ({ children }) => <th className="bg-slate-900 px-2.5 py-1 text-left font-bold text-cyan-300 border-b border-cyan-500/20">{children}</th>,
                      td: ({ children }) => <td className="px-2.5 py-1 text-slate-300 border-b border-slate-800">{children}</td>,
                      code: ({ children, className }) => {
                        const isBlock = className?.includes('language-');
                        if (isBlock) {
                          const codeStr = String(children).replace(/\n$/, '');
                          return (
                            <div className="relative group my-2">
                              <pre className="p-2.5 rounded bg-black/75 border border-cyan-500/40 text-cyan-300 text-[11px] overflow-x-auto font-mono-hud shadow-inner">
                                <code>{children}</code>
                              </pre>
                              <button
                                onClick={() => copyToClipboard(codeStr, msg.id)}
                                className="absolute top-2 right-2 p-1.5 rounded bg-slate-900/90 text-cyan-300 hover:text-white border border-cyan-500/40 transition-colors opacity-80 group-hover:opacity-100"
                                title="Copy code"
                              >
                                {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          );
                        }
                        return <code className="px-1.5 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800/40 text-[11px]">{children}</code>;
                      }
                    }}
                  >
                    {msg.displayText}
                  </Markdown>
                </div>
              </div>

              {/* Action Attachment / High-Risk Confirmation */}
              {msg.action && (
                <div className="mt-2.5 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-chakra font-semibold text-cyan-300 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>DISPATCH: {msg.action.title}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-hud font-bold border ${
                      msg.action.status === 'executed' 
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                        : msg.action.status === 'pending_confirmation'
                        ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                        : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
                    }`}>
                      {msg.action.status.toUpperCase()}
                    </span>
                  </div>

                  {/* High Risk Warning Banner */}
                  {msg.action.status === 'pending_confirmation' && (
                    <div className="p-2.5 rounded bg-rose-950/40 border border-rose-500/60 my-2 text-rose-200">
                      <div className="flex items-center space-x-1.5 font-chakra font-bold text-xs text-rose-400 mb-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span>HIGH-RISK PROTOCOL INTERCEPT</span>
                      </div>
                      <p className="text-[11px] text-rose-200 mb-2">
                        This command alters system state or critical processes. F.R.I.D.A.Y. requires explicit authorization.
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onConfirmAction(msg.id)}
                          className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-chakra text-xs font-bold transition-colors"
                        >
                          CONFIRM EXECUTION
                        </button>
                        <button
                          onClick={() => onCancelAction(msg.id)}
                          className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-chakra text-xs font-bold transition-colors"
                        >
                          ABORT
                        </button>
                      </div>
                    </div>
                  )}

                  {msg.action.commandSnippet && (
                    <div className="flex items-center justify-between p-2 rounded bg-black/60 border border-cyan-900/60 mt-1.5">
                      <code className="text-cyan-400 text-[11px] truncate mr-2">
                        {msg.action.commandSnippet}
                      </code>
                      <button
                        onClick={() => copyToClipboard(msg.action!.commandSnippet!, `action-${msg.id}`)}
                        className="text-slate-400 hover:text-cyan-300 p-1 shrink-0"
                        title="Copy command"
                      >
                        {copiedId === `action-${msg.id}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
