@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Trastero — Configuracion inicial

echo.
echo  ============================================================
echo     TRASTERO — Configuracion primer uso
echo  ============================================================
echo.

set "ROOT=%~dp0"
set "ROOT=%ROOT:~0,-1%"
set "SERVER=%ROOT%\server"
set "DATABASE=%ROOT%\database"
set "PSQL="
set "CREATEDB_EXE="

:: ─────────────────────────────────────────────
::  1. Buscar PostgreSQL
:: ─────────────────────────────────────────────
echo  [1/5] Buscando PostgreSQL...

where psql >nul 2>&1
if %errorlevel%==0 (
    set "PSQL=psql"
    set "CREATEDB_EXE=createdb"
    goto :PSQL_FOUND
)

for /d %%v in ("C:\Program Files\PostgreSQL\*") do (
    if exist "%%v\bin\psql.exe" (
        set "PSQL=%%v\bin\psql.exe"
        set "CREATEDB_EXE=%%v\bin\createdb.exe"
        goto :PSQL_FOUND
    )
)

echo    [ERROR] No se encontro PostgreSQL instalado.
echo    Descarga: https://www.postgresql.org/download/windows/
echo.
pause
exit /b 1

:PSQL_FOUND
echo    [OK] PostgreSQL encontrado.

:: ─────────────────────────────────────────────
::  2. Credenciales
:: ─────────────────────────────────────────────
echo.
echo  [2/5] Configuracion de PostgreSQL
echo.
set /p "PG_USER=   Usuario PostgreSQL [default: postgres]: "
if "!PG_USER!"=="" set "PG_USER=postgres"

set /p "PG_PASS=   Contrasena de !PG_USER!: "

set /p "DB_NAME=   Nombre de la base de datos [default: Trastero]: "
if "!DB_NAME!"=="" set "DB_NAME=Trastero"

:: ─────────────────────────────────────────────
::  3. Crear base de datos y aplicar esquema
:: ─────────────────────────────────────────────
echo.
echo  [3/5] Preparando base de datos '!DB_NAME!'...

set PGPASSWORD=!PG_PASS!

"!CREATEDB_EXE!" -h localhost -U !PG_USER! "!DB_NAME!" 2>nul
if errorlevel 1 (
    echo    [AVISO] La base de datos ya existe o no se pudo crear. Continuando...
) else (
    echo    [OK] Base de datos creada.
)

echo    Aplicando esquema...
"!PSQL!" -h localhost -U !PG_USER! -d "!DB_NAME!" -f "%DATABASE%\schema.sql" >nul 2>&1
if errorlevel 1 (
    echo    [ERROR] No se pudo aplicar el esquema SQL.
    echo    Verifica que el usuario y contrasena sean correctos.
    pause
    exit /b 1
)
echo    [OK] Esquema aplicado.

echo.
set /p "SEED=   Cargar datos de ejemplo (admin + items de prueba)? (S/N): "
if /i "!SEED!"=="S" (
    "!PSQL!" -h localhost -U !PG_USER! -d "!DB_NAME!" -f "%DATABASE%\seed.sql" >nul 2>&1
    echo    [OK] Datos de ejemplo cargados.
)

:: ─────────────────────────────────────────────
::  4. Crear server/.env
:: ─────────────────────────────────────────────
echo.
echo  [4/5] Configurando variables de entorno...

if exist "%SERVER%\.env" (
    echo    [AVISO] Ya existe server\.env — no se sobreescribe.
    echo    Si quieres reconfigurarlo, borralo manualmente y vuelve a ejecutar SETUP.bat
) else (
    set /p "JWT=   JWT Secret (Enter para usar uno automatico): "
    if "!JWT!"=="" set "JWT=trastero_jwt_%RANDOM%%RANDOM%_secret"

    (
        echo DB_HOST=localhost
        echo DB_PORT=5432
        echo DB_NAME=!DB_NAME!
        echo DB_USER=!PG_USER!
        echo DB_PASSWORD=!PG_PASS!
        echo JWT_SECRET=!JWT!
        echo PORT=5000
    ) > "%SERVER%\.env"
    echo    [OK] server\.env creado correctamente.
)

:: ─────────────────────────────────────────────
::  5. npm install
:: ─────────────────────────────────────────────
echo.
echo  [5/5] Instalando dependencias (puede tardar unos minutos)...

echo    Frontend...
cd /d "%ROOT%"
call npm install 2>nul
echo    [OK] Frontend listo.

echo    Backend...
cd /d "%SERVER%"
call npm install 2>nul
echo    [OK] Backend listo.

:: ─────────────────────────────────────────────
::  Fin
:: ─────────────────────────────────────────────
echo.
echo  ============================================================
echo     Configuracion completada correctamente
echo  ============================================================
echo.
echo   Para iniciar Trastero en el futuro usa: iniciar.bat
echo.
set /p "INICIAR=  Iniciar Trastero ahora? (S/N): "
if /i "!INICIAR!"=="S" (
    cd /d "%ROOT%"
    call iniciar.bat
)

pause
exit /b 0
