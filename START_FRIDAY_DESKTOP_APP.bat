@echo off
TITLE FRIDAY AI - Windows 10 Desktop Application
COLOR 0B

echo ================================================================
echo    FRIDAY AI - NATIVE DESKTOP APP (WINDOWS 10)
echo    Operator: Boss Chris
echo    Execution: Standalone App with Background System Tray
echo    Hotkey: [Ctrl + Alt + F]
echo ================================================================
echo.

:: 1. Verify Python Installation
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Python is not installed or not in your system PATH.
    echo.
    echo To run FRIDAY natively on Windows 10:
    echo 1. Download Python for Windows: https://www.python.org/downloads/
    echo 2. Check the box: "Add Python to PATH" during installation!
    echo.
    pause
    exit /b 1
)

:: 2. Check dependencies
echo [*] Checking desktop app packages (PyQt6, google-genai, psutil)...
python -c "import PyQt6, psutil" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [i] Installing desktop app dependencies...
    pip install -r "%~dp0python_desktop\requirements.txt"
)

:: 3. Launch FRIDAY in background mode with pythonw
echo.
echo [*] Launching FRIDAY Desktop App into Windows System Tray...
start "" pythonw.exe "%~dp0python_desktop\main.py"

echo.
echo ================================================================
echo  [SUCCESS] FRIDAY is now active as a Desktop App, Boss Chris!
echo.
echo  - Running in Background: Sits in your Windows System Tray
echo  - Global Hotkey: Press [Ctrl + Alt + F] anytime to summon
echo  - Minimize to Tray: Click [⬇ BACKGROUND] or [X]
echo ================================================================
echo.
timeout /t 4 >nul
exit /b 0
