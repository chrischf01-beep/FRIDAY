/**
 * Web Speech STT and TTS Audio Engine for F.R.I.D.A.Y.
 * Also includes Web Audio API futuristic HUD sound effects (beeps, activation chirps).
 */

class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private recognition: any = null;
  private audioCtx: AudioContext | null = null;
  private isListening: boolean = false;
  private wakeWordActive: boolean = false;
  private selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.initVoice();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.initVoice();
        }
      }

      // Speech Recognition setup (webkitSpeechRecognition or SpeechRecognition)
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }
    }
  }

  private initVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize natural female English voices (e.g. Samantha, Karen, Google UK English Female, Zira, Victoria, Fiona)
    const preferred = voices.find(v => 
      (v.name.toLowerCase().includes('female') || 
       v.name.toLowerCase().includes('zira') || 
       v.name.toLowerCase().includes('samantha') || 
       v.name.toLowerCase().includes('karen') ||
       v.name.toLowerCase().includes('fiona') ||
       v.name.toLowerCase().includes('google uk english female')) &&
      v.lang.startsWith('en')
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferred) {
      this.selectedVoice = preferred;
    }
  }

  // Sci-fi sound effect generator via Web Audio API
  public playHudSound(type: 'beep' | 'chime' | 'warning' | 'click' | 'activate') {
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (!this.audioCtx) return;

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;

      if (type === 'beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.1);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'activate') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'chime') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.08); // A5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'warning') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.setValueAtTime(240, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // AudioContext unavailable or blocked by autoplay
    }
  }

  // Text-To-Speech
  public speak(
    text: string, 
    onStart?: () => void, 
    onEnd?: () => void
  ): boolean {
    if (!this.synth || !text) return false;
    
    // Cancel any ongoing speech
    this.synth.cancel();

    // Clean markdown symbols for cleaner pronunciation
    const cleanText = text
      .replace(/```[\s\S]*?```/g, 'Code block output.')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/[*#_\[\]]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .trim();

    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 1.05; // Articulate, brisk executive tempo
    utterance.pitch = 1.05; // Subtle warm feminine pitch

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = () => {
      onEnd?.();
    };

    this.synth.speak(utterance);
    return true;
  }

  public stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Speech-To-Text
  public startListening(
    onResult: (transcript: string) => void,
    onStateChange?: (state: 'listening' | 'idle') => void,
    onError?: (error: string) => void
  ) {
    if (!this.recognition) {
      onError?.('Speech recognition is not supported in this browser. Please type your command.');
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      onStateChange?.('idle');
      return;
    }

    this.playHudSound('activate');
    this.isListening = true;
    onStateChange?.('listening');

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.isListening = false;
      onStateChange?.('idle');
      this.playHudSound('beep');
      onResult(transcript);
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      onStateChange?.('idle');
      onError?.(event.error || 'Microphone capture error');
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onStateChange?.('idle');
    };

    try {
      this.recognition.start();
    } catch (e: any) {
      this.isListening = false;
      onStateChange?.('idle');
      onError?.(e.message || 'Could not start microphone');
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  public isRecognitionSupported(): boolean {
    return Boolean(this.recognition);
  }
}

export const voiceService = new VoiceService();
