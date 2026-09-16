@echo off
TITLE FRIDAY AI System - Windows 10 Launcher
COLOR 0B

echo ================================================================
echo    FRIDAY AI - EXECUTIVE COMPANION FOR WINDOWS 10
echo    Operator: Boss Chris
echo    Capabilities: Study, Science, World, Artists, VS Code Studio
echo ================================================================
echo.

:: 1. Launch FRIDAY in native Microsoft Edge App Mode (Frameless desktop window)
set "APP_URL=https://ais-pre-43xsgjtczhny3hzi5qbg5d-102215820065.europe-west2.run.app"

echo [*] Initializing FRIDAY Interface in Windows 10 App Mode...
start msedge.exe --app="%APP_URL%" --window-size=1280,820

echo.
echo ================================================================
echo  FRIDAY is now active on your desktop, Boss Chris!
echo.
echo  Quick Shortcuts:
echo  - To build a website in VS Code: Run OPEN_IN_VSCODE.bat
echo  - To ask study, artist, or world questions: Type or speak in FRIDAY
echo ================================================================
echo.
timeout /t 5 >nul
