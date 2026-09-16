"""
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
    """Returns Boss Chris as designated by the operator."""
    custom_name = os.environ.get("FRIDAY_BOSS_NAME")
    if custom_name:
        return custom_name if custom_name.startswith("Boss ") else f"Boss {custom_name}"
    return "Boss Chris"

def main():
    QApplication.setHighDpiScaleFactorRoundingPolicy(
        Qt.HighDpiScaleFactorRoundingPolicy.PassThrough
    )
    
    app = QApplication(sys.argv)
    app.setApplicationName("FRIDAY AI Assistant")
    # Crucial: Prevent quitting when the window is hidden/minimized to system tray!
    app.setQuitOnLastWindowClosed(False)
    
    boss_name = get_registered_boss_name()
    print(f"[SYSTEM] Initializing FRIDAY Desktop Kernel for {boss_name} (Background Mode Enabled)...")
    
    # Initialize Core Subsystems
    brain = FridayBrain(boss_name=boss_name)
    voice = VoiceEngine()
    actions = ActionDispatcher(boss_name=boss_name)
    
    # Check if launched in background mode
    start_in_background = "--background" in sys.argv or "--minimized" in sys.argv
    
    # Launch Frameless HUD Window
    hud = FridayHUD(brain=brain, voice=voice, actions=actions, boss_name=boss_name)
    
    if start_in_background:
        print(f"[SYSTEM] FRIDAY launched directly into Windows System Tray (Background Mode).")
        hud.hide_to_background(notify=True)
    else:
        hud.show()
        greeting = f"Systems online, {boss_name}. FRIDAY is active and can run in the background."
        print(f"[SYSTEM] {greeting}")
        voice.speak_async(greeting)
    
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
