"""
FRIDAY UI Module - Seelin Technological AI HUD Aesthetic
Frameless, dark neon cyan (#00FFFF), 3D wireframe rotating globe with data arcs,
live written voice subtitles, system tray background execution, and global hotkeys.
"""
import math
import sys
import threading
from PyQt6.QtWidgets import (
    QMainWindow, QWidget, QVBoxLayout, QHBoxLayout, 
    QLineEdit, QTextEdit, QPushButton, QLabel, QFrame,
    QSystemTrayIcon, QMenu, QApplication
)
from PyQt6.QtCore import Qt, QTimer, pyqtSignal, QPoint, QObject
from PyQt6.QtGui import QPainter, QColor, QPen, QBrush, QFont, QRadialGradient, QIcon, QPixmap, QAction

# Windows Global Hotkey Support (ctypes)
class HotkeySignaler(QObject):
    triggered = pyqtSignal()

class WindowsGlobalHotkeyThread(threading.Thread):
    """Listens for Ctrl+Alt+F globally on Windows to summon or hide FRIDAY."""
    def __init__(self, signaler: HotkeySignaler):
        super().__init__(daemon=True)
        self.signaler = signaler

    def run(self):
        try:
            import ctypes
            from ctypes import wintypes
            user32 = ctypes.windll.user32
            
            # MOD_ALT = 0x0001, MOD_CONTROL = 0x0002 -> 0x0003
            # VK_F = 0x46 ('F' key)
            HOTKEY_ID = 4242
            MOD_CONTROL_ALT = 0x0001 | 0x0002
            VK_F = 0x46

            if not user32.RegisterHotKey(None, HOTKEY_ID, MOD_CONTROL_ALT, VK_F):
                print("[HOTKEY] Note: Could not bind Ctrl+Alt+F (might already be reserved).")
                return

            print("[HOTKEY] Global Hotkey [Ctrl + Alt + F] registered. Summon FRIDAY anytime!")
            msg = wintypes.MSG()
            while user32.GetMessageW(ctypes.byref(msg), None, 0, 0) != 0:
                if msg.message == 0x0312:  # WM_HOTKEY
                    if msg.wParam == HOTKEY_ID:
                        self.signaler.triggered.emit()
                user32.TranslateMessage(ctypes.byref(msg))
                user32.DispatchMessageW(ctypes.byref(msg))
        except Exception as e:
            print(f"[HOTKEY] Global hotkey initialization skipped: {e}")

class TechnologicalGlobeWidget(QWidget):
    """3D Wireframe Technological AI Globe with latitude rings, meridians, and rotating reticles."""
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setMinimumSize(320, 320)
        self.angle_y = 0.0
        self.pulse = 1.0
        self.pulse_dir = 0.02
        self.mode = "IDLE"
        
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_animation)
        self.timer.start(25)

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

        # Background glow
        bg_color = QColor(0, 255, 255, 50) if self.mode == "SPEAKING" else QColor(0, 191, 255, 30)
        grad = QRadialGradient(cx, cy, r * 1.3)
        grad.setColorAt(0.0, bg_color)
        grad.setColorAt(1.0, QColor(2, 6, 23, 0))
        painter.setBrush(QBrush(grad))
        painter.setPen(Qt.PenStyle.NoPen)
        painter.drawEllipse(int(cx - r * 1.3), int(cy - r * 1.3), int(r * 2.6), int(r * 2.6))

        # Rotating Compass Ring
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

        # Latitude Ellipses
        latitudes = [-50, -25, 0, 25, 50]
        tilt_x = 0.35
        cos_tx = math.cos(tilt_x)
        sin_tx = math.sin(tilt_x)

        for lat_deg in latitudes:
            lat_rad = math.radians(lat_deg)
            r_lat = r * math.cos(lat_rad)
            y_lat = r * math.sin(lat_rad)
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

        # Longitude Meridians
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

        # Core Badge
        core_grad = QRadialGradient(cx, cy, 35)
        core_grad.setColorAt(0.0, QColor(255, 255, 255, 230))
        core_grad.setColorAt(0.4, QColor(0, 255, 255, 180))
        core_grad.setColorAt(1.0, QColor(0, 50, 150, 0))
        painter.setBrush(QBrush(core_grad))
        painter.setPen(Qt.PenStyle.NoPen)
        painter.drawEllipse(int(cx - 30), int(cy - 30), 60, 60)

        painter.setPen(QColor(255, 255, 255, 240))
        painter.setFont(QFont("Segoe UI", 9, QFont.Weight.Bold))
        painter.drawText(self.rect(), Qt.AlignmentFlag.AlignCenter, "FRIDAY")


class FridayHUD(QMainWindow):
    def __init__(self, brain, voice, actions, boss_name="Boss Chris"):
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
        self.init_system_tray()
        self.init_hotkeys()

        self.voice.signals.speech_recognized.connect(self.handle_voice_input)
        self.voice.signals.state_changed.connect(self.globe.set_state)

    def create_tray_icon(self) -> QIcon:
        """Draws a custom glowing cyan AI HUD icon for the Windows 10 notification area."""
        pixmap = QPixmap(64, 64)
        pixmap.fill(Qt.GlobalColor.transparent)
        painter = QPainter(pixmap)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        
        # Outer neon cyan ring
        painter.setPen(QPen(QColor(0, 255, 255), 4))
        painter.setBrush(QBrush(QColor(3, 8, 22, 230)))
        painter.drawEllipse(4, 4, 56, 56)
        
        # Inner glowing core
        painter.setPen(Qt.PenStyle.NoPen)
        painter.setBrush(QBrush(QColor(0, 191, 255, 140)))
        painter.drawEllipse(18, 18, 28, 28)
        
        # Letter F
        painter.setPen(QColor(255, 255, 255))
        font = QFont("Segoe UI", 22, QFont.Weight.Bold)
        painter.setFont(font)
        painter.drawText(pixmap.rect(), Qt.AlignmentFlag.AlignCenter, "F")
        painter.end()
        return QIcon(pixmap)

    def init_system_tray(self):
        """Initializes the Windows 10 System Tray icon and background context menu."""
        self.tray_icon = QSystemTrayIcon(self)
        self.tray_icon.setIcon(self.create_tray_icon())
        self.tray_icon.setToolTip(f"FRIDAY AI Assistant (Active in Background) — {self.boss_name}")
        
        tray_menu = QMenu()
        tray_menu.setStyleSheet("""
            QMenu {
                background-color: #030a1c;
                border: 1px solid #00FFFF;
                color: #e0f2fe;
                padding: 6px;
                font-family: 'Segoe UI', sans-serif;
                font-size: 12px;
            }
            QMenu::item {
                padding: 6px 20px;
                border-radius: 4px;
            }
            QMenu::item:selected {
                background-color: #0284c7;
                color: #ffffff;
            }
            QMenu::separator {
                height: 1px;
                background-color: rgba(0, 255, 255, 0.2);
                margin: 4px 8px;
            }
        """)
        
        show_action = QAction("🔷 Open FRIDAY HUD", self)
        show_action.triggered.connect(self.show_from_background)
        tray_menu.addAction(show_action)
        
        hide_action = QAction("👁️ Hide to Background (Tray)", self)
        hide_action.triggered.connect(lambda: self.hide_to_background(notify=True))
        tray_menu.addAction(hide_action)
        
        tray_menu.addSeparator()
        
        voice_action = QAction("🎙️ Trigger Voice Listener", self)
        voice_action.triggered.connect(self.toggle_mic)
        tray_menu.addAction(voice_action)
        
        diag_action = QAction("⚡ Hardware Diagnostics", self)
        diag_action.triggered.connect(lambda: self.execute_quick_prompt("Check real CPU and RAM"))
        tray_menu.addAction(diag_action)
        
        tray_menu.addSeparator()
        
        quit_action = QAction("🚪 Quit FRIDAY Completely", self)
        quit_action.triggered.connect(self.force_quit)
        tray_menu.addAction(quit_action)
        
        self.tray_icon.setContextMenu(tray_menu)
        self.tray_icon.activated.connect(self.on_tray_activated)
        self.tray_icon.show()

    def init_hotkeys(self):
        """Sets up Windows global hotkey thread listening for Ctrl+Alt+F."""
        self.hotkey_signaler = HotkeySignaler()
        self.hotkey_signaler.triggered.connect(self.toggle_visibility)
        self.hotkey_thread = WindowsGlobalHotkeyThread(self.hotkey_signaler)
        self.hotkey_thread.start()

    def on_tray_activated(self, reason):
        if reason in (QSystemTrayIcon.ActivationReason.Trigger, QSystemTrayIcon.ActivationReason.DoubleClick):
            self.toggle_visibility()

    def hide_to_background(self, notify=True):
        """Hides HUD window and keeps FRIDAY running in the Windows background."""
        self.hide()
        if notify and self.tray_icon.isSystemTrayAvailable():
            self.tray_icon.showMessage(
                "FRIDAY Active in Background",
                f"FRIDAY is standing by for {self.boss_name}.\nPress [Ctrl + Alt + F] or click this tray icon anytime.",
                QSystemTrayIcon.MessageIcon.Information,
                3000
            )

    def show_from_background(self):
        """Restores HUD window from Windows background and focuses input."""
        self.show()
        self.setWindowState(self.windowState() & ~Qt.WindowState.WindowMinimized | Qt.WindowState.WindowActive)
        self.activateWindow()
        self.raise_()
        self.input_field.setFocus()

    def toggle_visibility(self):
        """Toggles between background execution and visible window."""
        if self.isVisible() and not self.isMinimized():
            self.hide_to_background(notify=False)
        else:
            self.show_from_background()

    def force_quit(self):
        """Completely terminates FRIDAY background process."""
        self.tray_icon.hide()
        QApplication.quit()

    def closeEvent(self, event):
        """Prevents closing the app window from killing the background process."""
        event.ignore()
        self.hide_to_background(notify=True)

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

        header = QHBoxLayout()
        title_label = QLabel(f"FRIDAY // NATIVE DESKTOP APP  —  OPERATOR: {self.boss_name.upper()}")
        title_label.setFont(QFont("Segoe UI", 11, QFont.Weight.Bold))
        title_label.setStyleSheet("color: #00FFFF; letter-spacing: 1.5px;")
        
        hotkey_badge = QLabel("HOTKEY: [CTRL + ALT + F] TO SUMMON")
        hotkey_badge.setStyleSheet("""
            background-color: rgba(14, 165, 233, 0.15);
            border: 1px solid rgba(14, 165, 233, 0.4);
            border-radius: 6px;
            padding: 4px 10px;
            font-size: 10px;
            font-weight: bold;
            color: #7dd3fc;
        """)

        btn_bg = QPushButton("⬇ RUN IN BACKGROUND")
        btn_bg.setStyleSheet("""
            background-color: rgba(16, 185, 129, 0.2);
            border: 1px solid #10b981;
            color: #6ee7b7;
            font-size: 11px;
            padding: 6px 12px;
        """)
        btn_bg.clicked.connect(lambda: self.hide_to_background(notify=True))

        btn_min = QPushButton("—")
        btn_min.setFixedSize(30, 30)
        btn_min.setStyleSheet("background-color: rgba(255,255,255,0.1); border: 1px solid #00BFFF; color: #fff;")
        btn_min.clicked.connect(self.showMinimized)

        self.btn_close = QPushButton("✕")
        self.btn_close.setFixedSize(30, 30)
        self.btn_close.setStyleSheet("background-color: rgba(239,68,68,0.5); border: 1px solid #ef4444; color: #fff;")
        self.btn_close.setToolTip("Minimize to background System Tray")
        self.btn_close.clicked.connect(lambda: self.hide_to_background(notify=True))

        header.addWidget(title_label)
        header.addSpacing(10)
        header.addWidget(hotkey_badge)
        header.addStretch()
        header.addWidget(btn_bg)
        header.addWidget(btn_min)
        header.addWidget(self.btn_close)
        layout.addLayout(header)

        body = QHBoxLayout()
        body.setSpacing(18)

        globe_panel = QVBoxLayout()
        self.globe = TechnologicalGlobeWidget()
        globe_panel.addWidget(self.globe, alignment=Qt.AlignmentFlag.AlignCenter)

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
        
        handled, voice_reply, display_reply = self.actions.dispatch_quick(cmd)
        if handled:
            self.append_log("FRIDAY", display_reply)
            self.set_spoken_subtitle(voice_reply)
            self.globe.set_state("SPEAKING")
            self.voice.speak_async(voice_reply)
            return

        def on_brain_done(reply):
            self.append_log("FRIDAY", reply)
            self.set_spoken_subtitle(reply[:160] + "..." if len(reply) > 160 else reply)
            self.globe.set_state("SPEAKING")
            self.voice.speak_async(reply)

        self.brain.ask_async(cmd, callback=on_brain_done)

    def execute_quick_prompt(self, prompt: str):
        """Executes a prompt from the tray menu or hotkeys."""
        self.show_from_background()
        self.input_field.setText(prompt)
        self.send_command()

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
