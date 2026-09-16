@echo off
TITLE Create FRIDAY Desktop Shortcut
COLOR 0B

echo ================================================================
echo    CREATING FRIDAY DESKTOP SHORTCUT FOR BOSS CHRIS
echo ================================================================
echo.

set "TARGET_SCRIPT=%~dp0RUN_FRIDAY_BACKGROUND.vbs"
set "SHORTCUT_PATH=%USERPROFILE%\Desktop\FRIDAY AI.lnk"

powershell -Command "$s=(New-Object -COM WScript.Shell).CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath='%TARGET_SCRIPT%'; $s.WorkingDirectory='%~dp0'; $s.Description='FRIDAY AI Assistant - Background Desktop App'; $s.Save()"

if exist "%SHORTCUT_PATH%" (
    echo [SUCCESS] Desktop icon 'FRIDAY AI' created on your Desktop!
    echo           Location: %SHORTCUT_PATH%
    echo.
    echo Double-click 'FRIDAY AI' on your desktop anytime to start!
) else (
    echo [!] Could not create shortcut automatically. You can right-click
    echo     RUN_FRIDAY_BACKGROUND.vbs -> Send to -> Desktop (create shortcut).
)

echo.
timeout /t 3 >nul
