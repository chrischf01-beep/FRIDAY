' ==============================================================================
' FRIDAY AI - Silent Windows 10 Background App Launcher
' Operator: Boss Chris
' Runs FRIDAY natively with pythonw.exe (Zero console window, No Chrome, No VS Code)
' Sits in the Windows System Tray and runs continuously in the background!
' Global Hotkey: [Ctrl + Alt + F]
' ==============================================================================

Dim WshShell, fso, currentDir, pythonScript, launchCmd

Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

currentDir = fso.GetParentFolderName(WScript.ScriptFullName)
pythonScript = currentDir & "\python_desktop\main.py"

' Check if main.py exists
If Not fso.FileExists(pythonScript) Then
    MsgBox "Could not find FRIDAY app files at: " & pythonScript, 16, "FRIDAY AI Error"
    WScript.Quit 1
End If

' Run silently with pythonw.exe (windowless Python launcher)
launchCmd = "pythonw.exe """ & pythonScript & """"
WshShell.Run launchCmd, 0, False

Set WshShell = Nothing
Set fso = Nothing
