<#
.SYNOPSIS
    FRIDAY Native Windows OS Executive Agent (Zero External Dependencies)
    Works out-of-the-box on any Windows 10/11 machine using built-in PowerShell.
#>

param(
    [string]$BossName = "Boss Lux"
)

Write-Host "=======================================================================" -ForegroundColor Cyan
Write-Host "   FRIDAY // NATIVE WINDOWS POWERSHELL CONTROLLER (ZERO-INSTALL)" -ForegroundColor Cyan
Write-Host "   OPERATOR: $BossName | MICROSOFT ACCOUNT: luxindustries14@gmail.com" -ForegroundColor Yellow
Write-Host "=======================================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Initialize Built-in Windows Speech Synthesizer
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

# Pick female voice if available (e.g. Microsoft Zira)
$voices = $synth.GetInstalledVoices()
foreach ($v in $voices) {
    if ($v.VoiceInfo.Name -like "*Zira*" -or $v.VoiceInfo.Gender -eq "Female") {
        $synth.SelectVoice($v.VoiceInfo.Name)
        break
    }
}
$synth.Rate = 1

function Speak-Friday([string]$Text) {
    Write-Host "[FRIDAY]: $Text" -ForegroundColor Cyan
    $synth.SpeakAsync($Text) | Out-Null
}

$Greeting = "Systems online, $BossName. FRIDAY native Windows PowerShell kernel is active and standing by."
Speak-Friday $Greeting

Write-Host "Ready for commands. Examples:" -ForegroundColor Green
Write-Host "  - 'cpu'      : Real CPU and RAM hardware sweep" -ForegroundColor Gray
Write-Host "  - 'top'      : Top 5 memory-consuming processes" -ForegroundColor Gray
Write-Host "  - 'chrome'   : Launch Google Chrome" -ForegroundColor Gray
Write-Host "  - 'notepad'  : Open Notepad" -ForegroundColor Gray
Write-Host "  - 'report'   : Generate executive report on Desktop" -ForegroundColor Gray
Write-Host "  - 'mute'     : Toggle master audio" -ForegroundColor Gray
Write-Host "  - 'exit'     : Close FRIDAY" -ForegroundColor Gray
Write-Host ""

while ($true) {
    $cmd = Read-Host "$BossName >> "
    $q = $cmd.Trim().ToLower()

    if ($q -eq "exit" -or $q -eq "quit") {
        Speak-Friday "Powering down, $BossName. Have a productive day."
        Start-Sleep -Seconds 2
        break
    }
    elseif ($q -like "*cpu*" -or $q -like "*hardware*") {
        $cpu = (Get-CimInstance Win32_Processor).LoadPercentage
        $ram = Get-CimInstance Win32_OperatingSystem
        $freeRamGB = [math]::Round($ram.FreePhysicalMemory / 1MB, 2)
        $totalRamGB = [math]::Round($ram.TotalVisibleMemorySize / 1MB, 2)
        $usedRamGB = [math]::Round($totalRamGB - $freeRamGB, 2)
        $ramPercent = [math]::Round(($usedRamGB / $totalRamGB) * 100, 1)

        $msg = "Diagnostic sweep complete, $BossName. CPU load is at $cpu percent, RAM utilization is $ramPercent percent."
        Write-Host ">>> CPU Load: $cpu% | RAM: $usedRamGB GB / $totalRamGB GB ($ramPercent%)" -ForegroundColor Yellow
        Speak-Friday $msg
    }
    elseif ($q -like "*top*" -or $q -like "*process*") {
        Write-Host "Top memory-intensive processes:" -ForegroundColor Yellow
        Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 5 Id, ProcessName, @{Name="RAM (MB)"; Expression={[math]::Round($_.WorkingSet64 / 1MB, 1)}} | Format-Table -AutoSize
        Speak-Friday "Top memory-consuming processes retrieved, $BossName."
    }
    elseif ($q -like "*chrome*") {
        Start-Process "chrome.exe" -ErrorAction SilentlyContinue
        Speak-Friday "Launching Google Chrome, $BossName."
    }
    elseif ($q -like "*notepad*") {
        Start-Process "notepad.exe"
        Speak-Friday "Notepad opened, $BossName."
    }
    elseif ($q -like "*mute*" -or $q -like "*volume*") {
        $wsh = New-Object -ComObject WScript.Shell
        $wsh.SendKeys([char]173) # VK_VOLUME_MUTE
        Speak-Friday "Master volume toggled, $BossName."
    }
    elseif ($q -like "*report*" -or $q -like "*doc*") {
        $desktopPath = [Environment]::GetFolderPath("Desktop")
        $reportPath = Join-Path $desktopPath "FRIDAY_Report.txt"
        $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $reportContent = @"
============================================================
           FRIDAY EXECUTIVE SYSTEM REPORT
============================================================
Prepared For: $BossName
Registered Account: luxindustries14@gmail.com
Timestamp: $date
Host PC: $env:COMPUTERNAME
Windows Version: $((Get-CimInstance Win32_OperatingSystem).Caption)

System Status:
- CPU Load: $((Get-CimInstance Win32_Processor).LoadPercentage)%
- Memory Total: $([math]::Round((Get-CimInstance Win32_OperatingSystem).TotalVisibleMemorySize / 1MB, 2)) GB

FRIDAY stands ready for further instructions.
============================================================
"@
        Set-Content -Path $reportPath -Value $reportContent
        Write-Host "Report saved to: $reportPath" -ForegroundColor Green
        Speak-Friday "Executive system report has been generated and saved directly to your Windows desktop, $BossName."
    }
    else {
        Speak-Friday "Acknowledged, $BossName. Executing command."
        try {
            Invoke-Expression $cmd
        } catch {
            Write-Host "Command error: $_" -ForegroundColor Red
        }
    }
}
