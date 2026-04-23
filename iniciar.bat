@echo off
setlocal enabledelayedexpansion
title trastero — Servicios
::
:: ─────────────────────────────────────────────
::  Rutas
:: ─────────────────────────────────────────────
set "ROOT=%~dp0"
set "ROOT=%ROOT:~0,-1%"
set "SERVER=%ROOT%\server"

:: ─────────────────────────────────────────────
::  Comprobar puertos 3000 y 5000
:: ─────────────────────────────────────────────
set "FRONT_PID="
set "BACK_PID="

for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":3000 " ^| findstr "LISTENING"') do set "FRONT_PID=%%a"
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":5000 " ^| findstr "LISTENING"') do set "BACK_PID=%%a"

:: ─────────────────────────────────────────────
::  Si alguno está corriendo, preguntar
:: ─────────────────────────────────────────────
if defined FRONT_PID goto :SERVICIOS_ACTIVOS
if defined BACK_PID goto :SERVICIOS_ACTIVOS
goto :ARRANCAR

:SERVICIOS_ACTIVOS
echo.
echo  ╔══════════════════════════════════════════╗
echo  ║   Servicios detectados en ejecucion      ║
echo  ╚══════════════════════════════════════════╝
echo.
if defined FRONT_PID echo    Frontend (puerto 3000)  PID: %FRONT_PID%
if defined BACK_PID  echo    Backend  (puerto 5000)  PID: %BACK_PID%
echo.
set /p "RESP=  ¿Resetear servicios? (S/N): "
if /i "!RESP!"=="S" goto :RESETEAR
if /i "!RESP!"=="s" goto :RESETEAR
echo.
echo  Cancelado. Servicios sin cambios.
pause
exit /b 0

:RESETEAR
echo.
echo  Deteniendo servicios...
if defined FRONT_PID (
    taskkill /PID %FRONT_PID% /F >nul 2>&1
    echo    [OK] Frontend detenido  (PID %FRONT_PID%)
)
if defined BACK_PID (
    taskkill /PID %BACK_PID% /F >nul 2>&1
    echo    [OK] Backend detenido   (PID %BACK_PID%)
)
:: Esperar un momento para liberar puertos
timeout /t 2 /nobreak >nul

:ARRANCAR
echo.
echo  ╔══════════════════════════════════════════╗
echo  ║   Arrancando trastero                    ║
echo  ╚══════════════════════════════════════════╝
echo.

:: Backend
echo  [1/2] Iniciando backend  → http://localhost:5000
start "trastero — Backend" cmd /k "cd /d "%SERVER%" && node server.js"

:: Pequeña pausa para que el backend levante antes que el frontend
timeout /t 2 /nobreak >nul

:: Frontend
echo  [2/2] Iniciando frontend → http://localhost:3000
start "trastero — Frontend" cmd /k "cd /d "%ROOT%" && npm start"

echo.
echo  ✓ Listo. Puedes cerrar esta ventana.
echo    Las ventanas de backend y frontend quedan abiertas.
echo.
pause
exit /b 0
