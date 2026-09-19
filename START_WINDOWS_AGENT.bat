@echo off
title FRIDAY Local Windows Agent
color 0b
set "ROOT=%~dp0"
cd /d "%ROOT%"

call RUN_FRIDAY_APP.bat
