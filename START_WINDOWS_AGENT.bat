@echo off
title FRIDAY Windows PowerShell Native Agent
color 0b
echo =======================================================================
echo          FRIDAY - NATIVE WINDOWS AGENT (ZERO INSTALLATION)
echo          OPERATOR: Boss Lux (luxindustries14@gmail.com)
echo =======================================================================
echo.
echo Launching Native Windows Controller with built-in voice...
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0friday_agent.ps1"
pause
