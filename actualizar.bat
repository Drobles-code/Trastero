@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Trastero — Actualizar

echo.
echo  ============================================================
echo     TRASTERO — Actualizar proyecto
echo  ============================================================
echo.

set "ROOT=%~dp0"
set "ROOT=%ROOT:~0,-1%"
set "SERVER=%ROOT%\server"

:: ─────────────────────────────────────────────
::  1. Git pull
:: ─────────────────────────────────────────────
echo  [1/3] Descargando cambios del repositorio...
cd /d "%ROOT%"
git pull
if errorlevel 1 (
    echo    [ERROR] No se pudo actualizar. Verifica tu conexion o conflictos.
    pause
    exit /b 1
)
echo    [OK] Repositorio actualizado.

:: ─────────────────────────────────────────────
::  2. npm install frontend
:: ─────────────────────────────────────────────
echo.
echo  [2/3] Actualizando dependencias del frontend...
cd /d "%ROOT%"
call npm install
echo    [OK] Frontend listo.

:: ─────────────────────────────────────────────
::  3. npm install backend
:: ─────────────────────────────────────────────
echo.
echo  [3/3] Actualizando dependencias del backend...
cd /d "%SERVER%"
call npm install
echo    [OK] Backend listo.

:: ─────────────────────────────────────────────
::  Mostrar pendientes
:: ─────────────────────────────────────────────
echo.
echo  ============================================================
echo     IMPORTANTE: revisa los pendientes en:
echo     MD\project_overview.md  ^>^>  seccion "Pendiente al actualizar"
echo  ============================================================
echo.

set /p "INICIAR=  Iniciar Trastero ahora? (S/N): "
if /i "!INICIAR!"=="S" (
    cd /d "%ROOT%"
    call iniciar.bat
)

pause
exit /b 0
