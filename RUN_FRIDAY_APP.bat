@echo off
title FRIDAY - Standalone Desktop App (Zero Install)
color 0b

echo =======================================================================
echo          FRIDAY - AI EXECUTIVE SYSTEM CONTROLLER
echo          OPERATOR: Boss Lux
echo =======================================================================
echo.
echo Launching FRIDAY in Native Windows App Mode...
echo (Requires zero Node.js or Python installations!)
echo.

:: Try opening with Microsoft Edge in App Mode (Frameless Desktop Window)
where msedge >nul 2>nul
if %errorlevel% equ 0 (
    start msedge.exe --app="https://ais-pre-43xsgjtczhny3hzi5qbg5d-102215820065.europe-west2.run.app" --window-size=1280,820
    exit
)

:: Fallback to Google Chrome in App Mode
where chrome >nul 2>nul
if %errorlevel% equ 0 (
    start chrome.exe --app="https://ais-pre-43xsgjtczhny3hzi5qbg5d-102215820065.europe-west2.run.app" --window-size=1280,820
    exit
)

:: Fallback to default browser
start "" "https://ais-pre-43xsgjtczhny3hzi5qbg5d-102215820065.europe-west2.run.app"
exit
