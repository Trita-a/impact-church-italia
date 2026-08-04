@echo off
:: Assicura che il comando parta dalla cartella dello script
cd /d "%~dp0"
set "BASE_DIR=%CD%"
title Impact Church Server Control
color 0b

echo ==========================================
echo    IMPACT CHURCH - AUTO SERVER SCRIPT
echo ==========================================
echo.

:: 1. Check Python
echo [+] Verifica Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRORE] Python non trovato. Per favore installalo da python.org
    pause
    exit /b
)

:: 1.5 Libera la porta 5500 se occupata
echo [+] Pulizia porta 5500...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5500') do taskkill /f /pid %%a >nul 2>&1

:: 2. Check nGrok
echo [+] Verifica nGrok...
set "NGROK_EXE=%BASE_DIR%\tools\ngrok.exe"
if not exist "%NGROK_EXE%" (
    where ngrok >nul 2>&1
    if %errorlevel% equ 0 (
        set "NGROK_EXE=ngrok"
    ) else (
        echo [!] nGrok non trovato in \tools\ngrok.exe ne nel sistema.
        pause
        exit /b
    )
)

:: 3. Launching
:: Check for Windows Terminal (wt.exe)
where wt >nul 2>&1
if %errorlevel% equ 0 (
    echo [+] Windows Terminal rilevato. Avvio dashboard...
    :: Lancia il server dedicato creato per la massima stabilita
    wt -d "%BASE_DIR%" cmd /k "title Server Live & python tools\server.py" ^; split-pane -v -d "%BASE_DIR%" cmd /k "title Tunnel Ngrok & \"%NGROK_EXE%\" http 5500"
    if %errorlevel% neq 0 (
        echo [!] Errore nell'avvio di Windows Terminal. Provo fallback...
        goto FALLBACK
    )
    exit
)

:FALLBACK
echo [+] Avvio in finestre separate...
start "Sito Chiesa - Server Live" python tools\server.py
echo.
echo ----------------------------------------------------------
echo COPIA IL LINK "Forwarding" (es. https://abc.ngrok-free.app)
echo E MANDALO AI TUOI AMICI!
echo ----------------------------------------------------------
echo.
"%NGROK_EXE%" http 5500
