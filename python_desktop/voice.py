"""
FRIDAY Voice Engine
Offline Speech Recognition & Natural Female Text-to-Speech with UI signal hooks
"""
import threading
import pyttsx3
import speech_recognition as sr
from PyQt6.QtCore import QObject, pyqtSignal

class VoiceSignals(QObject):
    speech_recognized = pyqtSignal(str)
    state_changed = pyqtSignal(str)

class VoiceEngine:
    def __init__(self):
        self.signals = VoiceSignals()
        self.recognizer = sr.Recognizer()
        self.recognizer.pause_threshold = 0.8
        self.recognizer.dynamic_energy_threshold = True

        try:
            self.tts = pyttsx3.init()
            voices = self.tts.getProperty('voices')
            for v in voices:
                if "zira" in v.name.lower() or "female" in v.name.lower():
                    self.tts.setProperty('voice', v.id)
                    break
            self.tts.setProperty('rate', 185)
        except Exception as e:
            print(f"[VOICE ERROR] TTS init failed: {e}")
            self.tts = None

    def speak(self, text: str):
        if not self.tts or not text:
            return
        self.signals.state_changed.emit("SPEAKING")
        try:
            self.tts.say(text)
            self.tts.runAndWait()
        except Exception as e:
            print(f"[TTS Error]: {e}")
        finally:
            self.signals.state_changed.emit("IDLE")

    def speak_async(self, text: str):
        t = threading.Thread(target=self.speak, args=(text,), daemon=True)
        t.start()

    def listen_once(self):
        self.signals.state_changed.emit("LISTENING")
        with sr.Microphone() as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=0.4)
            try:
                audio = self.recognizer.listen(source, timeout=5, phrase_time_limit=10)
                text = self.recognizer.recognize_google(audio)
                self.signals.speech_recognized.emit(text)
            except Exception:
                self.signals.speech_recognized.emit("")
            finally:
                self.signals.state_changed.emit("IDLE")

    def listen_once_async(self):
        t = threading.Thread(target=self.listen_once, daemon=True)
        t.start()
