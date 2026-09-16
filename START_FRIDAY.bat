@echo off
title FRIDAY Executive System Controller
color 0b

echo =======================================================================
echo          FRIDAY - AI EXECUTIVE SYSTEM CONTROLLER (WINDOWS)
echo          OPERATOR: Boss Chris (luxindustries14@gmail.com)
echo =======================================================================
echo.

:: 1. Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not detected on your PC!
    echo.
    echo Please install Node.js (LTS version) from:
    echo   https://nodejs.org/
    echo.
    echo After installing Node.js, simply double-click this file again.
    echo.
    pause
    exit /b
)

echo [OK] Node.js detected:
node -v
echo.

:: 2. Check if dependencies are installed
if not exist "node_modules\" (
    echo [1/3] Installing dependencies (first-time setup, please wait a moment)...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies. Check your internet connection.
        pause
        exit /b
    )
) else (
    echo [1/3] Dependencies verified.
)

:: 3. Launch FRIDAY Server in background and launch browser
echo [2/3] Launching FRIDAY Host Kernel on port 3000...
start "" http://localhost:3000

echo [3/3] Systems online!
echo.
echo =======================================================================
echo   FRIDAY is now running at http://localhost:3000
echo   Keep this window open while using FRIDAY.
echo   Press Ctrl+C to close FRIDAY.
echo =======================================================================
echo.

call npm run dev
pause
