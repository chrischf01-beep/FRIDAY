@echo off
title FRIDAY - Local Windows Agent
color 0b
set "ROOT=%~dp0"
cd /d "%ROOT%"

echo =======================================================================
echo          FRIDAY - LOCAL WINDOWS AGENT
echo          Browser HUD + local Windows control kernel
echo =======================================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js LTS is required for local PC control.
  echo Install it from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo [SETUP] Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo [ERROR] Dependency installation failed.
    pause
    exit /b 1
  )
)

if not exist ".env" (
  echo [NOTICE] .env was not found. Gemini universal Q&A will be unavailable.
  echo Copy .env.example to .env and add a valid GEMINI_API_KEY.
  echo.
)

echo [START] Starting the local FRIDAY control kernel...
start "FRIDAY Kernel" /min cmd /c "npm run dev"
timeout /t 3 /nobreak >nul

where msedge >nul 2>nul
if not errorlevel 1 (
  start "FRIDAY HUD" msedge.exe --app="http://localhost:3000" --window-size=1280,820
) else (
  where chrome >nul 2>nul
  if not errorlevel 1 (
    start "FRIDAY HUD" chrome.exe --app="http://localhost:3000" --window-size=1280,820
  ) else (
    start "FRIDAY HUD" "http://localhost:3000"
  )
)

echo.
echo FRIDAY is running locally at http://localhost:3000
echo Keep the FRIDAY Kernel window open while using PC controls.
echo Close that kernel window to stop the local agent.
pause
