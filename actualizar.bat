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
set "DATABASE=%ROOT%\database"
set "PSQL="

:: ─────────────────────────────────────────────
::  1. Git pull
:: ─────────────────────────────────────────────
echo  [1/4] Descargando cambios del repositorio...
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
echo  [2/4] Actualizando dependencias del frontend...
cd /d "%ROOT%"
call npm install
echo    [OK] Frontend listo.

:: ─────────────────────────────────────────────
::  3. npm install backend
:: ─────────────────────────────────────────────
echo.
echo  [3/4] Actualizando dependencias del backend...
cd /d "%SERVER%"
call npm install
echo    [OK] Backend listo.

:: ─────────────────────────────────────────────
::  4. Restaurar base de datos
:: ─────────────────────────────────────────────
echo.
echo  [4/4] Base de datos
echo.
set /p "RESTORE=   Restaurar base de datos desde el backup? (S/N): "
if /i not "!RESTORE!"=="S" goto :FIN

:: Buscar psql
where psql >nul 2>&1
if %errorlevel%==0 (
    set "PSQL=psql"
    goto :PSQL_OK
)
for /d %%v in ("C:\Program Files\PostgreSQL\*") do (
    if exist "%%v\bin\psql.exe" set "PSQL=%%v\bin\psql.exe"
)
if "!PSQL!"=="" (
    echo    [ERROR] No se encontro PostgreSQL. Instala PostgreSQL primero.
    goto :FIN
)

:PSQL_OK
:: Leer credenciales del .env
set "DB_NAME=Trastero"
set "DB_USER=postgres"
set "DB_PASS="
for /f "tokens=1,2 delims==" %%a in (%SERVER%\.env) do (
    if "%%a"=="DB_NAME" set "DB_NAME=%%b"
    if "%%a"=="DB_USER" set "DB_USER=%%b"
    if "%%a"=="DB_PASSWORD" set "DB_PASS=%%b"
)

set PGPASSWORD=!DB_PASS!

echo    Eliminando tablas existentes...
"!PSQL!" -h localhost -U !DB_USER! -d "!DB_NAME!" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" >nul 2>&1

echo    Restaurando desde database\trastero_latest.sql...
"!PSQL!" -h localhost -U !DB_USER! -d "!DB_NAME!" -f "%DATABASE%\trastero_latest.sql" >nul 2>&1
if errorlevel 1 (
    echo    [ERROR] No se pudo restaurar. Verifica que la BD "!DB_NAME!" exista en PostgreSQL.
    echo    Si no existe, ejecuta SETUP.bat primero.
) else (
    echo    [OK] Base de datos restaurada correctamente.
)

:FIN
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
