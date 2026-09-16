@echo off
TITLE FRIDAY AI - Terminal Agent for VS Code
COLOR 0B

echo ================================================================
echo    FRIDAY AI // TERMINAL AGENT FOR VISUAL STUDIO CODE
echo    Operator: Boss Chris ^<luxindustries14@gmail.com^>
echo ================================================================
echo.

:: Check if Node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] Node.js is not found in PATH.
    echo     Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Run FRIDAY Terminal CLI
node friday_cli.js %*
