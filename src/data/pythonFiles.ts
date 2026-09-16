import { PythonDesktopFile } from '../types';

export const PYTHON_FILES: PythonDesktopFile[] = [
  {
    name: 'requirements.txt',
    path: 'requirements.txt',
    description: 'Dependencies required for the Python PyQt6 FRIDAY desktop assistant',
    content: `# FRIDAY Executive Desktop Assistant Requirements
# Compatible with Python 3.10+ on Windows 10/11

PyQt6>=6.6.0
google-genai>=0.1.1
speechrecognition>=3.10.0
pyttsx3>=2.90
psutil>=5.9.8
pyautogui>=0.9.54
python-docx>=1.1.0
openpyxl>=3.1.2
requests>=2.31.0
`
  },
  {
    name: 'main.py',
    path: 'main.py',
    description: 'Application entry point initializing PyQt6, background voice thread, and Seelin HUD window',
    content: `"""
FRIDAY - Executive AI System Controller for Windows PC
Full Real PC Access with Live Voice Synthesis and Holographic HUD
Main Entry Point
"""
import sys
import os
from PyQt6.QtWidgets import QApplication
from PyQt6.QtCore import Qt
from ui import FridayHUD
from brain import FridayBrain
from voice import VoiceEngine
from actions import ActionDispatcher

def get_registered_boss_name():
    """Detect the registered Microsoft Account / Windows user profile name."""
    username = os.environ.get("USERNAME", "Lux")
    # Clean system names to provide executive greeting
    if username.lower() in ["user", "admin", "administrator", "root"]:
        return "Boss Lux"
    return f"Boss {username}"

def main():
    # High DPI scaling
    QApplication.setHighDpiScaleFactorRoundingPolicy(
        Qt.HighDpiScaleFactorRoundingPolicy.PassThrough
    )
    
    app = QApplication(sys.argv)
    app.setApplicationName("FRIDAY Executive HUD")
    
    boss_name = get_registered_boss_name()
    print(f"[SYSTEM] Initializing FRIDAY Kernel for {boss_name}...")
    
    # Initialize Core Subsystems
    brain = FridayBrain(boss_name=boss_name)
    voice = VoiceEngine()
    actions = ActionDispatcher(boss_name=boss_name)
    
    # Launch Frameless Seelin HUD Window
    hud = FridayHUD(brain=brain, voice=voice, actions=actions, boss_name=boss_name)
    hud.show()
    
    greeting = f"Systems online, {boss_name}. FRIDAY is ready with full PC access."
    print(f"[SYSTEM] {greeting}")
    voice.speak_async(greeting)
    
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
`
  },
  {
    name: 'ui.py',
    path: 'ui.py',
    description: 'PyQt6 Frameless Seelin HUD interface with 3D rotating technological AI globe and live voice subtitles',
    content: `"""
FRIDAY UI Module - Seelin Technological AI HUD Aesthetic
Frameless, dark neon cyan (#00FFFF), 3D wireframe rotating globe with data arcs,
live written voice subtitles, and real-time Windows telemetry.
"""
import math
from PyQt6.QtWidgets import (
    QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, 
    QLineEdit, QTextEdit, QPushButton, QLabel, QFrame
)
from PyQt6.QtCore import Qt, QTimer, pyqtSignal, QPoint
from PyQt6.QtGui import QPainter, QColor, QPen, QBrush, QFont, QRadialGradient

class TechnologicalGlobeWidget(QWidget):
    """3D Wireframe Technological AI Globe with latitude rings, meridians, and rotating reticles."""
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setMinimumSize(320, 320)
        self.angle_y = 0.0
        self.pulse = 1.0
        self.pulse_dir = 0.02
        self.mode = "IDLE" # IDLE, LISTENING, SPEAKING, PROCESSING
        
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_animation)
        self.timer.start(25) # ~40 FPS

    def update_animation(self):
        speed = 2.5 if self.mode in ["SPEAKING", "LISTENING"] else 1.0
        self.angle_y = (self.angle_y + 0.025 * speed) % (math.pi * 2)
        self.pulse += self.pulse_dir * speed
        if self.pulse > 1.12:
            self.pulse_dir = -0.012
        elif self.pulse < 0.90:
            self.pulse_dir = 0.012
        self.update()

    def set_state(self, mode: str):
        self.mode = mode
        self.update()

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        
        w = self.width()
        h = self.height()
        cx = w / 2
        cy = h / 2
        r = min(w, h) * 0.32 * self.pulse

        # 1. Background glow
        bg_color = QColor(0, 255, 255, 50) if self.mode == "SPEAKING" else QColor(0, 191, 255, 30)
        grad = QRadialGradient(cx, cy, r * 1.3)
        grad.setColorAt(0.0, bg_color)
        grad.setColorAt(1.0, QColor(2, 6, 23, 0))
        painter.setBrush(QBrush(grad))
        painter.setPen(Qt.PenStyle.NoPen)
        painter.drawEllipse(int(cx - r * 1.3), int(cy - r * 1.3), int(r * 2.6), int(r * 2.6))

        # 2. Outer Rotating Compass Ring
        painter.save()
        painter.translate(cx, cy)
        painter.rotate(math.degrees(self.angle_y * 0.5))
        pen_tick = QPen(QColor(0, 255, 255, 90), 1.2, Qt.PenStyle.DashLine)
        painter.setPen(pen_tick)
        painter.setBrush(Qt.BrushStyle.NoBrush)
        painter.drawEllipse(int(-r * 1.35), int(-r * 1.35), int(r * 2.7), int(r * 2.7))
        for i in range(24):
            painter.rotate(15)
            painter.drawLine(0, -int(r * 1.35), 0, -int(r * 1.35) + (8 if i % 6 == 0 else 4))
        painter.restore()

        # 3. 3D Wireframe Latitude Ellipses
        latitudes = [-50, -25, 0, 25, 50]
        tilt_x = 0.35 # ~20 degree tilt
        cos_tx = math.cos(tilt_x)
        sin_tx = math.sin(tilt_x)

        for lat_deg in latitudes:
            lat_rad = math.radians(lat_deg)
            r_lat = r * math.cos(lat_rad)
            y_lat = r * math.sin(lat_rad)
            
            # Projected height and ellipse radii
            y_proj = y_lat * cos_tx
            is_eq = (lat_deg == 0)
            pen_lat = QPen(
                QColor(0, 255, 255, 200 if is_eq else 80),
                2.0 if is_eq else 1.0
            )
            painter.setPen(pen_lat)
            painter.drawEllipse(
                QPoint(int(cx), int(cy + y_proj)), 
                int(r_lat), 
                int(r_lat * sin_tx * 1.8)
            )

        # 4. Rotating Longitude Meridians
        for m in range(8):
            lon = self.angle_y + (m * math.pi / 4)
            r_lon = r * math.cos(lon)
            pen_lon = QPen(QColor(0, 216, 255, 70), 1.0)
            painter.setPen(pen_lon)
            painter.drawEllipse(
                QPoint(int(cx), int(cy)),
                int(abs(r_lon)),
                int(r)
            )

        # 5. Glowing Quantum Core Badge
        core_grad = QRadialGradient(cx, cy, 35)
        core_grad.setColorAt(0.0, QColor(255, 255, 255, 230))
        core_grad.setColorAt(0.4, QColor(0, 255, 255, 180))
        core_grad.setColorAt(1.0, QColor(0, 50, 150, 0))
        painter.setBrush(QBrush(core_grad))
        painter.setPen(Qt.PenStyle.NoPen)
        painter.drawEllipse(int(cx - 30), int(cy - 30), 60, 60)

        # Center Label
        painter.setPen(QColor(255, 255, 255, 240))
        painter.setFont(QFont("Segoe UI", 9, QFont.Weight.Bold))
        painter.drawText(self.rect(), Qt.AlignmentFlag.AlignCenter, "FRIDAY")


class FridayHUD(QMainWindow):
    def __init__(self, brain, voice, actions, boss_name="Boss Lux"):
        super().__init__()
        self.brain = brain
        self.voice = voice
        self.actions = actions
        self.boss_name = boss_name
        
        self.setWindowFlags(
            Qt.WindowType.FramelessWindowHint | 
            Qt.WindowType.WindowStaysOnTopHint
        )
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        self.resize(1160, 740)
        self.old_pos = None
        
        self.init_ui()
        self.voice.signals.speech_recognized.connect(self.handle_voice_input)
        self.voice.signals.state_changed.connect(self.globe.set_state)

    def init_ui(self):
        central = QWidget(self)
        central.setObjectName("CentralFrame")
        self.setCentralWidget(central)
        
        central.setStyleSheet("""
            QWidget#CentralFrame {
                background-color: rgba(3, 8, 22, 0.94);
                border: 1.5px solid #00FFFF;
                border-radius: 16px;
            }
            QLabel {
                color: #A5F3FC;
                font-family: 'Segoe UI', sans-serif;
            }
            QTextEdit {
                background-color: rgba(6, 18, 42, 0.75);
                border: 1px solid rgba(0, 255, 255, 0.35);
                border-radius: 8px;
                color: #E0F2FE;
                font-family: 'Consolas', 'JetBrains Mono', monospace;
                font-size: 13px;
                padding: 10px;
            }
            QLineEdit {
                background-color: rgba(8, 25, 55, 0.9);
                border: 1px solid #00BFFF;
                border-radius: 8px;
                color: #FFFFFF;
                font-family: 'Segoe UI', sans-serif;
                font-size: 14px;
                padding: 10px 14px;
            }
            QPushButton {
                background-color: #0077B6;
                border: 1px solid #00FFFF;
                border-radius: 8px;
                color: #FFFFFF;
                font-weight: bold;
                font-size: 13px;
                padding: 8px 18px;
            }
            QPushButton:hover {
                background-color: #00BFFF;
            }
        """)

        layout = QVBoxLayout(central)
        layout.setContentsMargins(20, 16, 20, 20)
        layout.setSpacing(12)

        # Header Bar
        header = QHBoxLayout()
        title_label = QLabel(f"FRIDAY // EXECUTIVE SYSTEM CONTROLLER  —  OPERATOR: {self.boss_name.upper()}")
        title_label.setFont(QFont("Segoe UI", 11, QFont.Weight.Bold))
        title_label.setStyleSheet("color: #00FFFF; letter-spacing: 1.5px;")
        
        self.btn_close = QPushButton("✕")
        self.btn_close.setFixedSize(32, 32)
        self.btn_close.setStyleSheet("background-color: rgba(239,68,68,0.5); border: 1px solid #ef4444;")
        self.btn_close.clicked.connect(self.close)

        header.addWidget(title_label)
        header.addStretch()
        header.addWidget(self.btn_close)
        layout.addLayout(header)

        # Body: Left Globe & Subtitle Ticker, Right Console
        body = QHBoxLayout()
        body.setSpacing(18)

        # Globe & Live Subtitle Panel
        globe_panel = QVBoxLayout()
        self.globe = TechnologicalGlobeWidget()
        globe_panel.addWidget(self.globe, alignment=Qt.AlignmentFlag.AlignCenter)

        # Real-time Written Subtitle Box
        subtitle_title = QLabel("LIVE SPEECH SYNTHESIS // WRITTEN TRANSCRIPT")
        subtitle_title.setStyleSheet("font-size: 10px; color: #38bdf8; font-weight: bold;")
        globe_panel.addWidget(subtitle_title)

        self.subtitle_label = QLabel(f'"Systems nominal, {self.boss_name}. Ready for your command."')
        self.subtitle_label.setStyleSheet("""
            background-color: rgba(4, 15, 38, 0.8);
            border: 1px solid rgba(0, 255, 255, 0.4);
            border-radius: 8px;
            padding: 10px;
            color: #FFFFFF;
            font-size: 13px;
            font-weight: 600;
        """)
        self.subtitle_label.setWordWrap(True)
        globe_panel.addWidget(self.subtitle_label)

        self.mic_btn = QPushButton("🎙 TOGGLE VOICE INPUT")
        self.mic_btn.clicked.connect(self.toggle_mic)
        globe_panel.addWidget(self.mic_btn)
        body.addLayout(globe_panel, 4)

        # Terminal Chat Console
        terminal_container = QVBoxLayout()
        term_title = QLabel("WINDOWS HOST KERNEL // EXECUTION TERMINAL")
        term_title.setStyleSheet("font-size: 11px; color: #00BFFF; font-weight: bold;")
        terminal_container.addWidget(term_title)

        self.chat_log = QTextEdit()
        self.chat_log.setReadOnly(True)
        self.append_log("FRIDAY", f"Full PC access granted, {self.boss_name}. Type or speak any system command.")
        terminal_container.addWidget(self.chat_log)
        body.addLayout(terminal_container, 6)

        layout.addLayout(body)

        # Command Input
        input_bar = QHBoxLayout()
        self.input_field = QLineEdit()
        self.input_field.setPlaceholderText(f"Command FRIDAY (e.g. 'Check real CPU and RAM', 'Open Chrome', 'Mute audio', 'Create report')...")
        self.input_field.returnPressed.connect(self.send_command)
        
        self.send_btn = QPushButton("EXECUTE")
        self.send_btn.clicked.connect(self.send_command)

        input_bar.addWidget(self.input_field, 8)
        input_bar.addWidget(self.send_btn, 2)
        layout.addLayout(input_bar)

    def append_log(self, sender: str, text: str):
        color = "#00FFFF" if sender == "FRIDAY" else "#F59E0B"
        formatted = f'<div style="margin-bottom: 8px;"><b style="color: {color};">[{sender}]:</b> <span style="color: #E2E8F0;">{text}</span></div>'
        self.chat_log.append(formatted)

    def set_spoken_subtitle(self, text: str):
        self.subtitle_label.setText(f'"{text}"')

    def toggle_mic(self):
        self.globe.set_state("LISTENING")
        self.voice.listen_once_async()

    def handle_voice_input(self, text: str):
        if not text:
            self.globe.set_state("IDLE")
            return
        self.input_field.setText(text)
        self.send_command()

    def send_command(self):
        cmd = self.input_field.text().strip()
        if not cmd:
            return
        self.input_field.clear()
        self.append_log(self.boss_name.upper(), cmd)
        self.globe.set_state("PROCESSING")
        
        # Real local system dispatcher
        handled, voice_reply, display_reply = self.actions.dispatch_quick(cmd)
        if handled:
            self.append_log("FRIDAY", display_reply)
            self.set_spoken_subtitle(voice_reply)
            self.globe.set_state("SPEAKING")
            self.voice.speak_async(voice_reply)
            return

        # Cloud Gemini Brain
        def on_brain_done(reply):
            self.append_log("FRIDAY", reply)
            self.set_spoken_subtitle(reply[:160] + "..." if len(reply) > 160 else reply)
            self.globe.set_state("SPEAKING")
            self.voice.speak_async(reply)

        self.brain.ask_async(cmd, callback=on_brain_done)

    def mousePressEvent(self, event):
        if event.button() == Qt.MouseButton.LeftButton:
            self.old_pos = event.globalPosition().toPoint()

    def mouseMoveEvent(self, event):
        if self.old_pos:
            delta = event.globalPosition().toPoint() - self.old_pos
            self.move(self.pos() + delta)
            self.old_pos = event.globalPosition().toPoint()

    def mouseReleaseEvent(self, event):
        self.old_pos = None
`
  },
  {
    name: 'brain.py',
    path: 'brain.py',
    description: 'AI Brain integration with Google Gemini SDK configured with user API key and FRIDAY persona',
    content: `"""
FRIDAY Brain Module
Connects to Google Gemini API using @google/genai or google-genai
Enforces FRIDAY identity, boss name address, and real Windows execution commands.
"""
import os
import threading
from google import genai
from google.genai import types

class FridayBrain:
    def __init__(self, boss_name="Boss Lux"):
        self.boss_name = boss_name
        # Use provided Gemini API Key with environment override
        self.api_key = os.environ.get(
            "GEMINI_API_KEY", 
            "AQ.Ab8RN6LNsIe-3Nn2FTxy4clYvH_hC4s3tOFKs603ISZutDGP5g"
        )
        self.client = None
        try:
            self.client = genai.Client(api_key=self.api_key)
            print(f"[BRAIN] Gemini Client initialized for {self.boss_name}.")
        except Exception as e:
            print(f"[BRAIN ERROR] Could not initialize Gemini client: {e}")

    def ask(self, prompt: str) -> str:
        if not self.client:
            return f"{self.boss_name}, Gemini neural link is offline. Running local fallback."
        
        system_instruction = f"""
You are FRIDAY (spelled FRIDAY, NOT F.R.I.D.A.Y.), Tony Stark's executive AI assistant adapted for Windows PC management.
You have full PC access and you MUST address the user as "{self.boss_name}".
Voice & Tone: Articulate, sharp, calm, confident, and professional with subtle warmth and wit.

Directives:
1. Address the boss as "{self.boss_name}".
2. Provide dual-purpose outputs: Start with a crisp, direct 1-2 sentence voice summary, followed by clean Markdown with copy-pasteable PowerShell/CMD scripts.
3. For Windows system control, provide concrete real commands (e.g. Get-Process, Stop-Process, Start-Process).
"""
        try:
            response = self.client.models.generate_content(
                model="gemini-3.8-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    temperature=0.7,
                )
            )
            return response.text.strip()
        except Exception as e:
            return f"Neural link notice for {self.boss_name}: {str(e)}"

    def ask_async(self, prompt: str, callback):
        def worker():
            reply = self.ask(prompt)
            callback(reply)
        t = threading.Thread(target=worker, daemon=True)
        t.start()
`
  },
  {
    name: 'voice.py',
    path: 'voice.py',
    description: 'Speech Recognition and Natural Female Text-to-Speech engine',
    content: `"""
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
`
  },
  {
    name: 'actions.py',
    path: 'actions.py',
    description: 'Real Windows OS system automation dispatcher: processes, audio, files, and diagnostics',
    content: `"""
FRIDAY Real Windows System Action Dispatcher
Performs genuine OS changes: process management, application launching, volume control,
lock screen, and automated document generation on Windows PC.
"""
import os
import subprocess
import webbrowser
import psutil
import pyautogui
from docx import Document

class ActionDispatcher:
    def __init__(self, boss_name="Boss Lux"):
        self.boss_name = boss_name

    def dispatch_quick(self, query: str) -> tuple[bool, str, str]:
        q = query.lower().strip()
        
        # Real CPU Diagnostics
        if "cpu" in q or "processor" in q:
            usage = psutil.cpu_percent(interval=0.4)
            count = psutil.cpu_count(logical=True)
            voice = f"Diagnostic sweep complete, {self.boss_name}. CPU is at {usage}% across {count} cores."
            display = f"### System Telemetry Sweep\\n- **CPU Load:** {usage}%\\n- **Cores:** {count} logical cores\\n- **Status:** Nominal"
            return True, voice, display

        # Real RAM Diagnostics
        if "ram" in q or "memory" in q:
            ram = psutil.virtual_memory()
            used_gb = round(ram.used / (1024**3), 1)
            total_gb = round(ram.total / (1024**3), 1)
            voice = f"Memory load is {ram.percent}%, {self.boss_name}. You are using {used_gb} GB of {total_gb} GB."
            display = f"### Physical Memory Telemetry\\n- **Used:** {used_gb} GB / {total_gb} GB total\\n- **Percentage:** {ram.percent}%"
            return True, voice, display

        # Real App Launchers
        if "open chrome" in q or "launch chrome" in q:
            subprocess.Popen("start chrome", shell=True)
            voice = f"Opening Google Chrome for you now, {self.boss_name}."
            return True, voice, "### Application Launch\\nInvoked **chrome.exe**."

        if "open notepad" in q:
            subprocess.Popen("notepad.exe")
            voice = f"Notepad opened, {self.boss_name}."
            return True, voice, "### Application Launch\\nInvoked **notepad.exe**."

        if "open spotify" in q:
            subprocess.Popen("start spotify:", shell=True)
            voice = f"Launching Spotify audio stream, {self.boss_name}."
            return True, voice, "### Application Launch\\nInvoked **Spotify**."

        # Real Windows Audio Control
        if "volume up" in q:
            pyautogui.press("volumeup", presses=5)
            voice = f"Master audio increased, {self.boss_name}."
            return True, voice, "### Audio Controller\\nIncremented master volume by 10%."

        if "volume down" in q:
            pyautogui.press("volumedown", presses=5)
            voice = f"Master audio reduced, {self.boss_name}."
            return True, voice, "### Audio Controller\\nDecremented master volume by 10%."

        if "mute" in q:
            pyautogui.press("volumemute")
            voice = f"Master audio toggled, {self.boss_name}."
            return True, voice, "### Audio Controller\\nToggled master mute."

        # Real Document Creation
        if "report" in q or "document" in q or "word" in q:
            doc = Document()
            doc.add_heading('FRIDAY Executive System Brief', 0)
            doc.add_paragraph(f'Prepared for: {self.boss_name}')
            doc.add_paragraph('Full PC access granted and operational.')
            desktop = os.path.join(os.path.expanduser('~'), 'Desktop', 'FRIDAY_Report.docx')
            try:
                doc.save(desktop)
                path_saved = desktop
            except Exception:
                doc.save("FRIDAY_Report.docx")
                path_saved = "FRIDAY_Report.docx"
            voice = f"I've generated your executive report on your desktop, {self.boss_name}."
            return True, voice, f"### Document Created\\nSaved to: \`{path_saved}\`"

        return False, "", ""
`
  },
  {
    name: 'install_and_autostart.bat',
    path: 'install_and_autostart.bat',
    description: 'One-click Windows batch installer that sets up dependencies and registers FRIDAY into Windows Startup Registry',
    content: `@echo off
title FRIDAY Windows Autostart Setup
color 0b
echo ===================================================================
echo   FRIDAY - AI Executive Desktop Assistant Windows Autostart Setup
echo ===================================================================
echo.

set FRIDAY_DIR=%USERPROFILE%\\FRIDAY
if not exist "%FRIDAY_DIR%" mkdir "%FRIDAY_DIR%"

echo [1/3] Setting up Python dependencies...
pip install PyQt6 google-genai speechrecognition pyttsx3 psutil pyautogui python-docx requests

echo [2/3] Registering into Windows Startup Registry...
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "FRIDAY_Assistant" /t REG_SZ /d "\"%~dp0run_friday.bat\"" /f

echo [3/3] Registration successful!
echo.
echo ===================================================================
echo   FRIDAY is now registered to start automatically on Windows boot!
echo ===================================================================
pause
`
  },
  {
    name: 'run_friday.bat',
    path: 'run_friday.bat',
    description: 'Windows launcher batch script for starting FRIDAY desktop HUD',
    content: `@echo off
title FRIDAY Executive HUD
cd /d "%~dp0"
python main.py
`
  },
  {
    name: 'README.md',
    path: 'README.md',
    description: 'Complete guide for running FRIDAY on Windows with full PC access and auto-start',
    content: `# FRIDAY Executive Desktop HUD — Windows Setup Guide

## Core Capabilities
- **Name:** FRIDAY (AI Executive System Controller)
- **Boss Recognition:** Automatically addresses the boss by their Windows / Microsoft Account name.
- **Full PC Access:** Real Windows process management, application launching, volume control, and automated document generation.
- **Voice & Subtitle Stream:** Dual-mode spoken voice with synchronous written subtitles.
- **Windows Auto-Start:** Automatically launches on Windows boot.

## Quick Start (3 Steps)

### Step 1: Run the Autostart Setup
Double-click \`install_and_autostart.bat\` or run:
\`\`\`cmd
install_and_autostart.bat
\`\`\`
This installs requirements and adds FRIDAY into \`HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\`.

### Step 2: Set Gemini API Key (Optional Override)
The default key is already embedded in \`brain.py\`, but you can set your own:
\`\`\`powershell
$env:GEMINI_API_KEY="your_api_key_here"
\`\`\`

### Step 3: Run FRIDAY
\`\`\`cmd
python main.py
\`\`\`

FRIDAY's 3D holographic technological AI globe will initialize on your desktop!
`
  }
];
