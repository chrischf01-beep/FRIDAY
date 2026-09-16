@echo off
title FRIDAY Python Desktop Assistant
color 0b

echo =======================================================================
echo     FRIDAY - NATIVE PYTHON DESKTOP CONTROLLER (PyQt6 + VOICE)
echo     OPERATOR: Boss Lux
echo =======================================================================
echo.

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not detected on your PC!
    echo.
    echo Please install Python 3.10+ from:
    echo   https://www.python.org/downloads/
    echo (Make sure to check "Add python.exe to PATH" during installation)
    echo.
    pause
    exit /b
)

echo [1/2] Checking and installing Python requirements...
pip install -r requirements.txt

echo.
echo [2/2] Launching FRIDAY Desktop HUD...
echo.
python main.py
pause
