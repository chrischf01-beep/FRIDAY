@echo off
title FRIDAY Windows Autostart Configuration
color 0b
echo ===================================================================
echo   FRIDAY - AI Executive Desktop Assistant Windows Autostart Setup
echo   Configuring for Boss: %USERNAME%
echo ===================================================================
echo.

set TARGET_BAT=%~dp0START_FRIDAY_PYTHON.bat

echo Registering into Windows Startup Registry...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "FRIDAY_Assistant" /t REG_SZ /d "\"%TARGET_BAT%\"" /f

if %errorlevel% equ 0 (
    echo.
    echo ===================================================================
    echo   [SUCCESS] FRIDAY will now launch automatically on Windows boot!
    echo ===================================================================
) else (
    echo.
    echo [NOTICE] If registry failed, you can copy START_FRIDAY_PYTHON.bat shortcut
    echo into your Startup folder (Win+R -> shell:startup).
)

echo.
pause
