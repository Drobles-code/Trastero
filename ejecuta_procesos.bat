@echo off
title CONTROL TOTAL WINDOWS 10 / 11
color 0a

:MENU
cls
color 0a
echo ================================================
echo           CONTROL TOTAL WINDOWS 10 / 11
echo ================================================
echo.
echo   1. Control de TELEMETRIA
echo   2. Control de FONDO DE PANTALLA
echo   3. Control de ACTUALIZACIONES AUTOMATICAS
echo   4. Listar procesos y guardarlos en archivo
echo   5. Control de WIDGETS / NOTICIAS (panel lateral)
echo   6. Control de SERVICIOS innecesarios (por proceso)
echo.
echo   0. SALIR
echo.
set /p opcion=Selecciona una opcion: 

if "%opcion%"=="1" goto MENU_TELEMETRIA
if "%opcion%"=="2" goto MENU_FONDO
if "%opcion%"=="3" goto MENU_UPDATES
if "%opcion%"=="4" goto LISTAR_PROCESOS
if "%opcion%"=="5" goto MENU_WIDGETS
if "%opcion%"=="6" goto MENU_SERVICIOS
if "%opcion%"=="0" exit
goto MENU



::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                   MENU TELEMETRIA                         ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:MENU_TELEMETRIA
cls
color 0a
echo ================================================
echo               CONTROL DE TELEMETRIA
echo ================================================
echo.
echo  1. Desactivar Telemetria
echo  2. Reactivar Telemetria
echo  3. Ver estado actual
echo.
echo  0. Volver al menu principal
echo.
set /p t=Selecciona una opcion: 

if "%t%"=="1" goto DESACTIVAR_TELE
if "%t%"=="2" goto REACTIVAR_TELE
if "%t%"=="3" goto ESTADO_TELE
if "%t%"=="0" goto MENU
goto MENU_TELEMETRIA

:DESACTIVAR_TELE
cls
color 0c
echo DESACTIVANDO TELEMETRIA...
sc stop DiagTrack >nul 2>&1
sc config DiagTrack start= disabled >nul 2>&1
sc stop dmwappushservice >nul 2>&1
sc config dmwappushservice start= disabled >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\Customer Experience Improvement Program\Consolidator" /Disable >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\Customer Experience Improvement Program\UsbCeip" /Disable >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\Application Experience\ProgramDataUpdater" /Disable >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f >nul
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Diagnostics\DiagTrack" /v Enabled /t REG_DWORD /d 0 /f >nul
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Diagnostics\DiagTrack" /v ConsentTelemetry /t REG_DWORD /d 0 /f >nul
icacls "%ProgramData%\Microsoft\Diagnosis\ETLLogs" /inheritance:r /grant:r "*S-1-1-0:(OI)(CI)(DENY)(WX)" >nul
echo Telemetria DESACTIVADA.
pause
goto MENU_TELEMETRIA

:REACTIVAR_TELE
cls
color 0e
echo REACTIVANDO TELEMETRIA...
sc config DiagTrack start= auto >nul
sc start DiagTrack >nul
sc config dmwappushservice start= auto >nul
sc start dmwappushservice >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v AllowTelemetry /t REG_DWORD /d 1 /f >nul
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Diagnostics\DiagTrack" /v Enabled /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Diagnostics\DiagTrack" /v ConsentTelemetry /f >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\Customer Experience Improvement Program\Consolidator" /Enable >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\Customer Experience Improvement Program\UsbCeip" /Enable >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\Application Experience\ProgramDataUpdater" /Enable >nul 2>&1
echo Telemetria REACTIVADA.
pause
goto MENU_TELEMETRIA

:ESTADO_TELE
cls
color 0a
echo ================================================
echo          ESTADO ACTUAL - TELEMETRIA
echo ================================================
echo.
echo  [ DiagTrack ]
sc query DiagTrack | find "STATE"
echo.
echo  [ dmwappushservice ]
sc query dmwappushservice | find "STATE"
echo.
echo  [ Registro AllowTelemetry ]
reg query "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v AllowTelemetry 2>nul || echo   No definido (telemetria activa por defecto)
echo.
pause
goto MENU_TELEMETRIA



::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                  MENU FONDO DE PANTALLA                   ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:MENU_FONDO
cls
color 0a
echo ================================================
echo            CONTROL DE FONDO DE PANTALLA
echo ================================================
echo.
echo  1. Desactivar cambio de fondo (bloquear fondo actual)
echo  2. Reactivar cambio de fondo
echo  3. Ver estado actual (fondo)
echo  4. Desactivar fondos automaticos de Internet (Spotlight)
echo  5. Reactivar fondos automaticos de Internet (Spotlight)
echo  6. Ver estado actual (Spotlight)
echo.
echo  0. Volver al menu principal
echo.
set /p f=Selecciona una opcion: 

if "%f%"=="1" goto DESACTIVAR_FONDO
if "%f%"=="2" goto REACTIVAR_FONDO
if "%f%"=="3" goto ESTADO_FONDO
if "%f%"=="4" goto DESACTIVAR_SPOTLIGHT
if "%f%"=="5" goto REACTIVAR_SPOTLIGHT
if "%f%"=="6" goto ESTADO_SPOTLIGHT
if "%f%"=="0" goto MENU
goto MENU_FONDO

:DESACTIVAR_FONDO
cls
color 0c
echo BLOQUEANDO FONDO DE PANTALLA...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\ActiveDesktop" /v NoChangingWallPaper /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Personalization" /v NoChangingLockScreen /t REG_DWORD /d 1 /f >nul
echo Fondo de pantalla BLOQUEADO. Reinicia sesion para aplicar.
pause
goto MENU_FONDO

:REACTIVAR_FONDO
cls
color 0e
echo DESBLOQUEANDO FONDO DE PANTALLA...
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\ActiveDesktop" /v NoChangingWallPaper /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\Personalization" /v NoChangingLockScreen /f >nul 2>&1
echo Fondo de pantalla DESBLOQUEADO. Reinicia sesion para aplicar.
pause
goto MENU_FONDO

:ESTADO_FONDO
cls
color 0a
echo ================================================
echo       ESTADO ACTUAL - FONDO DE PANTALLA
echo ================================================
echo.
echo  [ NoChangingWallPaper ]
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\ActiveDesktop" /v NoChangingWallPaper 2>nul || echo   No definido (cambio de fondo permitido)
echo.
echo  [ NoChangingLockScreen ]
reg query "HKLM\SOFTWARE\Policies\Microsoft\Windows\Personalization" /v NoChangingLockScreen 2>nul || echo   No definido (pantalla de bloqueo libre)
echo.
pause
goto MENU_FONDO

:DESACTIVAR_SPOTLIGHT
cls
color 0c
echo DESACTIVANDO SPOTLIGHT...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v RotatingLockScreenEnabled /t REG_DWORD /d 0 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v RotatingLockScreenOverlayEnabled /t REG_DWORD /d 0 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v ContentDeliveryAllowed /t REG_DWORD /d 0 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v OemPreInstalledAppsEnabled /t REG_DWORD /d 0 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v PreInstalledAppsEnabled /t REG_DWORD /d 0 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SilentInstalledAppsEnabled /t REG_DWORD /d 0 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SoftLandingEnabled /t REG_DWORD /d 0 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SubscribedContentEnabled /t REG_DWORD /d 0 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SubscribedContent-338387Enabled /t REG_DWORD /d 0 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SubscribedContent-338388Enabled /t REG_DWORD /d 0 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SubscribedContent-338389Enabled /t REG_DWORD /d 0 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SubscribedContent-353698Enabled /t REG_DWORD /d 0 /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableWindowsSpotlightFeatures /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableWindowsConsumerFeatures /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableBingSearchSuggestions /t REG_DWORD /d 1 /f >nul
schtasks /Change /TN "\Microsoft\Windows\CloudExperienceHost\CreateObjectTask" /Disable >nul 2>&1
echo Spotlight DESACTIVADO. Reinicia sesion para aplicar.
pause
goto MENU_FONDO

:REACTIVAR_SPOTLIGHT
cls
color 0e
echo REACTIVANDO SPOTLIGHT...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v RotatingLockScreenEnabled /t REG_DWORD /d 1 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v RotatingLockScreenOverlayEnabled /t REG_DWORD /d 1 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v ContentDeliveryAllowed /t REG_DWORD /d 1 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SubscribedContentEnabled /t REG_DWORD /d 1 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SubscribedContent-338387Enabled /t REG_DWORD /d 1 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SubscribedContent-338388Enabled /t REG_DWORD /d 1 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SubscribedContent-338389Enabled /t REG_DWORD /d 1 /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v SubscribedContent-353698Enabled /t REG_DWORD /d 1 /f >nul
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableWindowsSpotlightFeatures /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableWindowsConsumerFeatures /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableBingSearchSuggestions /f >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\CloudExperienceHost\CreateObjectTask" /Enable >nul 2>&1
echo Spotlight REACTIVADO. Reinicia sesion para aplicar.
pause
goto MENU_FONDO

:ESTADO_SPOTLIGHT
cls
color 0a
echo ================================================
echo          ESTADO ACTUAL - SPOTLIGHT
echo ================================================
echo.
echo  [ ContentDeliveryAllowed ]
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v ContentDeliveryAllowed 2>nul || echo   No definido
echo.
echo  [ RotatingLockScreenEnabled ]
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v RotatingLockScreenEnabled 2>nul || echo   No definido
echo.
echo  [ DisableWindowsSpotlightFeatures (politica) ]
reg query "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableWindowsSpotlightFeatures 2>nul || echo   No definido (Spotlight activo)
echo.
pause
goto MENU_FONDO



::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::              MENU ACTUALIZACIONES AUTOMATICAS             ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:MENU_UPDATES
cls
color 0a
echo ================================================
echo        CONTROL DE ACTUALIZACIONES AUTOMATICAS
echo ================================================
echo.
echo  1. Desactivar Actualizaciones Automaticas
echo  2. Reactivar Actualizaciones Automaticas
echo  3. Ver estado actual
echo.
echo  0. Volver al menu principal
echo.
set /p u=Selecciona una opcion: 

if "%u%"=="1" goto DESACTIVAR_UPDATE
if "%u%"=="2" goto REACTIVAR_UPDATE
if "%u%"=="3" goto ESTADO_UPDATE
if "%u%"=="0" goto MENU
goto MENU_UPDATES

:DESACTIVAR_UPDATE
cls
color 0c
echo DESACTIVANDO ACTUALIZACIONES AUTOMATICAS...
sc stop wuauserv >nul 2>&1
sc config wuauserv start= disabled >nul 2>&1
sc stop UsoSvc >nul 2>&1
sc config UsoSvc start= disabled >nul 2>&1
sc stop WaaSMedicSvc >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\WaaSMedicSvc" /v Start /t REG_DWORD /d 4 /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v NoAutoUpdate /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v AUOptions /t REG_DWORD /d 1 /f >nul
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate" /v DisableWindowsUpdateAccess /t REG_DWORD /d 1 /f >nul
schtasks /Change /TN "\Microsoft\Windows\WindowsUpdate\Automatic App Update" /Disable >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\WindowsUpdate\Scheduled Start" /Disable >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\UpdateOrchestrator\Schedule Scan" /Disable >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\UpdateOrchestrator\Universal Orchestrator Start" /Disable >nul 2>&1
echo Actualizaciones automaticas DESACTIVADAS.
pause
goto MENU_UPDATES

:REACTIVAR_UPDATE
cls
color 0e
echo REACTIVANDO ACTUALIZACIONES AUTOMATICAS...
sc config wuauserv start= auto >nul
sc start wuauserv >nul
sc config UsoSvc start= auto >nul
sc start UsoSvc >nul
reg add "HKLM\SYSTEM\CurrentControlSet\Services\WaaSMedicSvc" /v Start /t REG_DWORD /d 2 /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v NoAutoUpdate /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v AUOptions /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate" /v DisableWindowsUpdateAccess /f >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\WindowsUpdate\Automatic App Update" /Enable >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\WindowsUpdate\Scheduled Start" /Enable >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\UpdateOrchestrator\Schedule Scan" /Enable >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\UpdateOrchestrator\Universal Orchestrator Start" /Enable >nul 2>&1
echo Actualizaciones automaticas REACTIVADAS.
pause
goto MENU_UPDATES

:ESTADO_UPDATE
cls
color 0a
echo ================================================
echo     ESTADO ACTUAL - ACTUALIZACIONES AUTOMATICAS
echo ================================================
echo.
echo  [ wuauserv - Windows Update ]
sc query wuauserv | find "STATE"
echo.
echo  [ UsoSvc - Update Orchestrator ]
sc query UsoSvc | find "STATE"
echo.
echo  [ WaaSMedicSvc - Update Medic ]
sc query WaaSMedicSvc | find "STATE"
echo.
echo  [ Politica NoAutoUpdate ]
reg query "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v NoAutoUpdate 2>nul || echo   No definido (actualizaciones automaticas activas)
echo.
pause
goto MENU_UPDATES



::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::              MENU WIDGETS / NOTICIAS                      ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:MENU_WIDGETS
cls
color 0a
echo ================================================
echo      CONTROL DE WIDGETS / NOTICIAS Y TIEMPO
echo ================================================
echo.
echo  1. Desactivar Widgets / Noticias
echo  2. Reactivar Widgets / Noticias
echo  3. Ver estado actual
echo.
echo  0. Volver al menu principal
echo.
set /p w=Selecciona una opcion: 

if "%w%"=="1" goto DESACTIVAR_WIDGETS
if "%w%"=="2" goto REACTIVAR_WIDGETS
if "%w%"=="3" goto ESTADO_WIDGETS
if "%w%"=="0" goto MENU
goto MENU_WIDGETS

:DESACTIVAR_WIDGETS
cls
color 0c
echo DESACTIVANDO WIDGETS / NOTICIAS...
reg add "HKLM\SOFTWARE\Policies\Microsoft\Dsh" /v AllowNewsAndInterests /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v TaskbarDa /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\PolicyManager\default\NewsAndInterests\AllowNewsAndInterests" /v value /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Feeds" /v ShellFeedsTaskbarViewMode /t REG_DWORD /d 2 /f >nul 2>&1
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Feeds" /v IsFeedsAvailable /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Windows Feeds" /v EnableFeeds /t REG_DWORD /d 0 /f >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\Feeds\FeedsUpdateLogonTask" /Disable >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Windows Search" /v DisableWebSearch /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Windows Search" /v ConnectedSearchUseWeb /t REG_DWORD /d 0 /f >nul 2>&1
echo Widgets DESACTIVADOS. Reiniciando Explorador...
taskkill /f /im explorer.exe >nul 2>&1
timeout /t 2 >nul
start explorer.exe
pause
goto MENU_WIDGETS

:REACTIVAR_WIDGETS
cls
color 0e
echo REACTIVANDO WIDGETS / NOTICIAS...
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Dsh" /v AllowNewsAndInterests /f >nul 2>&1
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v TaskbarDa /t REG_DWORD /d 1 /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\PolicyManager\default\NewsAndInterests\AllowNewsAndInterests" /v value /f >nul 2>&1
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Feeds" /v ShellFeedsTaskbarViewMode /t REG_DWORD /d 0 /f >nul 2>&1
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Feeds" /v IsFeedsAvailable /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\Windows Feeds" /v EnableFeeds /f >nul 2>&1
schtasks /Change /TN "\Microsoft\Windows\Feeds\FeedsUpdateLogonTask" /Enable >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\Windows Search" /v DisableWebSearch /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\Windows Search" /v ConnectedSearchUseWeb /f >nul 2>&1
echo Widgets REACTIVADOS. Reiniciando Explorador...
taskkill /f /im explorer.exe >nul 2>&1
timeout /t 2 >nul
start explorer.exe
pause
goto MENU_WIDGETS

:ESTADO_WIDGETS
cls
color 0a
echo ================================================
echo       ESTADO ACTUAL - WIDGETS / NOTICIAS
echo ================================================
echo.
echo  [ AllowNewsAndInterests (politica Win11) ]
reg query "HKLM\SOFTWARE\Policies\Microsoft\Dsh" /v AllowNewsAndInterests 2>nul || echo   No definido (Widgets activos)
echo.
echo  [ TaskbarDa - boton Widgets barra tareas ]
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v TaskbarDa 2>nul || echo   No definido
echo.
echo  [ ShellFeedsTaskbarViewMode (Win10 Noticias) ]
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Feeds" /v ShellFeedsTaskbarViewMode 2>nul || echo   No definido (Noticias activas)
echo.
echo  [ EnableFeeds (politica Win10) ]
reg query "HKLM\SOFTWARE\Policies\Microsoft\Windows\Windows Feeds" /v EnableFeeds 2>nul || echo   No definido
echo.
pause
goto MENU_WIDGETS



::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::           MENU SERVICIOS INNECESARIOS                     ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:MENU_SERVICIOS
cls
color 0a
echo ================================================
echo      CONTROL DE SERVICIOS INNECESARIOS
echo ================================================
echo.
echo  1.  Xbox / Gaming
echo  2.  Office / OneDrive / Edge
echo  3.  Impresion y Fax
echo  4.  Busqueda e Indexacion
echo  5.  Red y Sincronizacion general
echo  6.  Sistema auxiliar
echo  7.  Movil / Phone Link / Connected Devices
echo  8.  Bluetooth
echo  9.  Wi-Fi y Hotspot
echo  10. NFC y Tarjeta inteligente
echo  11. Sincronizacion con movil
echo  12. PowerToys / Awake
echo.
echo  0.  Volver al menu principal
echo.
set /p cat=Selecciona categoria: 

if "%cat%"=="1"  goto CAT_XBOX
if "%cat%"=="2"  goto CAT_OFFICE
if "%cat%"=="3"  goto CAT_IMPRESION
if "%cat%"=="4"  goto CAT_BUSQUEDA
if "%cat%"=="5"  goto CAT_RED
if "%cat%"=="6"  goto CAT_SISTEMA
if "%cat%"=="7"  goto CAT_MOVIL
if "%cat%"=="8"  goto CAT_BLUETOOTH
if "%cat%"=="9"  goto CAT_WIFI
if "%cat%"=="10" goto CAT_NFC
if "%cat%"=="11" goto CAT_SYNC
if "%cat%"=="12" goto CAT_POWERTOYS
if "%cat%"=="0"  goto MENU
goto MENU_SERVICIOS


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::  Motor de control individual por servicio
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CTRL_SVC
cls
color 0a
echo ================================================
echo  SERVICIO: %SVC_NAME%
echo ================================================
echo  %SVC_DESC%
echo ================================================
echo.
echo  1. Detener y deshabilitar
echo  2. Habilitar y arrancar
echo  3. Ver estado actual
echo.
echo  0. Volver a la categoria
echo.
set /p sv=Selecciona una opcion: 
if "%sv%"=="1" goto DO_DISABLE
if "%sv%"=="2" goto DO_ENABLE
if "%sv%"=="3" goto DO_STATUS
if "%sv%"=="0" goto %SVC_BACK%
goto CTRL_SVC

:DO_DISABLE
color 0c
echo Deteniendo y deshabilitando %SVC_NAME%...
sc stop "%SVC_NAME%" >nul 2>&1
sc config "%SVC_NAME%" start= disabled >nul 2>&1
echo DESACTIVADO. Estado:
sc query "%SVC_NAME%" | find "STATE"
pause
goto CTRL_SVC

:DO_ENABLE
color 0e
echo Habilitando y arrancando %SVC_NAME%...
sc config "%SVC_NAME%" start= auto >nul 2>&1
sc start "%SVC_NAME%" >nul 2>&1
echo REACTIVADO. Estado:
sc query "%SVC_NAME%" | find "STATE"
pause
goto CTRL_SVC

:DO_STATUS
color 0a
echo Estado de %SVC_NAME%:
sc query "%SVC_NAME%"
pause
goto CTRL_SVC


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                     XBOX / GAMING                         ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_XBOX
cls
color 0a
echo ================================================
echo              XBOX / GAMING
echo ================================================
echo.
echo  1. XblAuthManager  - Autenticacion Xbox Live
echo  2. XblGameSave     - Guardado de partidas Xbox
echo  3. XboxNetApiSvc   - API de red Xbox
echo  4. XboxGipSvc      - Perifericos Xbox (mandos)
echo  ------------------------------------------------
echo  A. DESACTIVAR TODOS
echo  R. REACTIVAR TODOS
echo.
echo  0. Volver a categorias
echo.
set /p xs=Selecciona: 

if /i "%xs%"=="A" goto XBOX_OFF_ALL
if /i "%xs%"=="R" goto XBOX_ON_ALL
if "%xs%"=="1" set "SVC_NAME=XblAuthManager" & set "SVC_DESC=Autenticacion Xbox Live. Innecesario sin cuenta Xbox." & set "SVC_BACK=CAT_XBOX" & goto CTRL_SVC
if "%xs%"=="2" set "SVC_NAME=XblGameSave"    & set "SVC_DESC=Sincronizacion partidas Xbox. Innecesario sin Xbox."   & set "SVC_BACK=CAT_XBOX" & goto CTRL_SVC
if "%xs%"=="3" set "SVC_NAME=XboxNetApiSvc"  & set "SVC_DESC=API de red Xbox. Innecesario sin juegos Xbox."         & set "SVC_BACK=CAT_XBOX" & goto CTRL_SVC
if "%xs%"=="4" set "SVC_NAME=XboxGipSvc"     & set "SVC_DESC=Perifericos Xbox. Solo si usas mando Xbox."            & set "SVC_BACK=CAT_XBOX" & goto CTRL_SVC
if "%xs%"=="0" goto MENU_SERVICIOS
goto CAT_XBOX

:XBOX_OFF_ALL
color 0c
echo DESACTIVANDO TODOS Xbox...
for %%S in (XblAuthManager XblGameSave XboxNetApiSvc XboxGipSvc) do (
    sc stop "%%S" >nul 2>&1 & sc config "%%S" start= disabled >nul 2>&1
    echo  [X] %%S desactivado
)
echo Hecho.
pause
goto CAT_XBOX

:XBOX_ON_ALL
color 0e
echo REACTIVANDO TODOS Xbox...
for %%S in (XblAuthManager XblGameSave XboxNetApiSvc XboxGipSvc) do (
    sc config "%%S" start= auto >nul 2>&1 & sc start "%%S" >nul 2>&1
    echo  [+] %%S reactivado
)
echo Hecho.
pause
goto CAT_XBOX


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                  OFFICE / ONEDRIVE / EDGE                 ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_OFFICE
cls
color 0a
echo ================================================
echo           OFFICE / ONEDRIVE / EDGE
echo ================================================
echo.
echo  1. OneDrive      - Sincronizacion OneDrive
echo  2. ClickToRunSvc - Actualizador automatico Office
echo  3. edgeupdate    - Actualizador automatico Edge
echo  4. edgeupdatem   - Actualizador Edge (tarea)
echo  ------------------------------------------------
echo  A. DESACTIVAR TODOS
echo  R. REACTIVAR TODOS
echo.
echo  0. Volver a categorias
echo.
set /p of=Selecciona: 

if /i "%of%"=="A" goto OFFICE_OFF_ALL
if /i "%of%"=="R" goto OFFICE_ON_ALL
if "%of%"=="1" set "SVC_NAME=OneDrive"      & set "SVC_DESC=Sincronizacion OneDrive. Consume RAM y red."        & set "SVC_BACK=CAT_OFFICE" & goto CTRL_SVC
if "%of%"=="2" set "SVC_NAME=ClickToRunSvc" & set "SVC_DESC=Actualizaciones Office en segundo plano."           & set "SVC_BACK=CAT_OFFICE" & goto CTRL_SVC
if "%of%"=="3" set "SVC_NAME=edgeupdate"    & set "SVC_DESC=Actualizador automatico de Microsoft Edge."         & set "SVC_BACK=CAT_OFFICE" & goto CTRL_SVC
if "%of%"=="4" set "SVC_NAME=edgeupdatem"   & set "SVC_DESC=Actualizador Edge via tarea programada."            & set "SVC_BACK=CAT_OFFICE" & goto CTRL_SVC
if "%of%"=="0" goto MENU_SERVICIOS
goto CAT_OFFICE

:OFFICE_OFF_ALL
color 0c
echo DESACTIVANDO TODOS Office/OneDrive/Edge...
for %%S in (OneDrive ClickToRunSvc edgeupdate edgeupdatem) do (
    sc stop "%%S" >nul 2>&1 & sc config "%%S" start= disabled >nul 2>&1
    echo  [X] %%S desactivado
)
echo Hecho.
pause
goto CAT_OFFICE

:OFFICE_ON_ALL
color 0e
echo REACTIVANDO TODOS Office/OneDrive/Edge...
for %%S in (OneDrive ClickToRunSvc edgeupdate edgeupdatem) do (
    sc config "%%S" start= auto >nul 2>&1 & sc start "%%S" >nul 2>&1
    echo  [+] %%S reactivado
)
echo Hecho.
pause
goto CAT_OFFICE


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                    IMPRESION Y FAX                        ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_IMPRESION
cls
color 0a
echo ================================================
echo              IMPRESION Y FAX
echo ================================================
echo.
echo  1. Spooler     - Cola de impresion
echo  2. Fax         - Servicio de fax
echo  3. PrintNotify - Notificaciones de impresora
echo  ------------------------------------------------
echo  A. DESACTIVAR TODOS
echo  R. REACTIVAR TODOS
echo.
echo  0. Volver a categorias
echo.
set /p im=Selecciona: 

if /i "%im%"=="A" goto IMPRESION_OFF_ALL
if /i "%im%"=="R" goto IMPRESION_ON_ALL
if "%im%"=="1" set "SVC_NAME=Spooler"     & set "SVC_DESC=Cola de impresion. Innecesario sin impresora."     & set "SVC_BACK=CAT_IMPRESION" & goto CTRL_SVC
if "%im%"=="2" set "SVC_NAME=Fax"         & set "SVC_DESC=Servicio de fax. Casi nadie lo usa hoy en dia."    & set "SVC_BACK=CAT_IMPRESION" & goto CTRL_SVC
if "%im%"=="3" set "SVC_NAME=PrintNotify" & set "SVC_DESC=Notificaciones de impresora. Depende del Spooler." & set "SVC_BACK=CAT_IMPRESION" & goto CTRL_SVC
if "%im%"=="0" goto MENU_SERVICIOS
goto CAT_IMPRESION

:IMPRESION_OFF_ALL
color 0c
echo DESACTIVANDO TODOS Impresion/Fax...
for %%S in (Spooler Fax PrintNotify) do (
    sc stop "%%S" >nul 2>&1 & sc config "%%S" start= disabled >nul 2>&1
    echo  [X] %%S desactivado
)
echo Hecho.
pause
goto CAT_IMPRESION

:IMPRESION_ON_ALL
color 0e
echo REACTIVANDO TODOS Impresion/Fax...
for %%S in (Spooler Fax PrintNotify) do (
    sc config "%%S" start= auto >nul 2>&1 & sc start "%%S" >nul 2>&1
    echo  [+] %%S reactivado
)
echo Hecho.
pause
goto CAT_IMPRESION


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                  BUSQUEDA E INDEXACION                    ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_BUSQUEDA
cls
color 0a
echo ================================================
echo           BUSQUEDA E INDEXACION
echo ================================================
echo.
echo  1. WSearch       - Indexador de busqueda Windows
echo  2. SearchIndexer - Proceso hijo del indexador
echo  ------------------------------------------------
echo  A. DESACTIVAR TODOS
echo  R. REACTIVAR TODOS
echo.
echo  0. Volver a categorias
echo.
set /p bs=Selecciona: 

if /i "%bs%"=="A" goto BUSQUEDA_OFF_ALL
if /i "%bs%"=="R" goto BUSQUEDA_ON_ALL
if "%bs%"=="1" set "SVC_NAME=WSearch"       & set "SVC_DESC=Indexa archivos continuamente. Consume disco y CPU." & set "SVC_BACK=CAT_BUSQUEDA" & goto CTRL_SVC
if "%bs%"=="2" set "SVC_NAME=SearchIndexer" & set "SVC_DESC=Proceso hijo del indexador. Muy agresivo en HDD."    & set "SVC_BACK=CAT_BUSQUEDA" & goto CTRL_SVC
if "%bs%"=="0" goto MENU_SERVICIOS
goto CAT_BUSQUEDA

:BUSQUEDA_OFF_ALL
color 0c
echo DESACTIVANDO TODOS Busqueda/Indexacion...
for %%S in (WSearch SearchIndexer) do (
    sc stop "%%S" >nul 2>&1 & sc config "%%S" start= disabled >nul 2>&1
    echo  [X] %%S desactivado
)
echo Hecho.
pause
goto CAT_BUSQUEDA

:BUSQUEDA_ON_ALL
color 0e
echo REACTIVANDO TODOS Busqueda/Indexacion...
for %%S in (WSearch SearchIndexer) do (
    sc config "%%S" start= auto >nul 2>&1 & sc start "%%S" >nul 2>&1
    echo  [+] %%S reactivado
)
echo Hecho.
pause
goto CAT_BUSQUEDA


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                RED Y SINCRONIZACION GENERAL               ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_RED
cls
color 0a
echo ================================================
echo         RED Y SINCRONIZACION GENERAL
echo ================================================
echo.
echo  1. WMPNetworkSvc  - Compartir medios por red
echo  2. RemoteRegistry - Acceso registro por red
echo  3. MapsBroker     - Descarga mapas offline
echo  4. lfsvc          - Geolocalizacion
echo  ------------------------------------------------
echo  A. DESACTIVAR TODOS
echo  R. REACTIVAR TODOS
echo.
echo  0. Volver a categorias
echo.
set /p rd=Selecciona: 

if /i "%rd%"=="A" goto RED_OFF_ALL
if /i "%rd%"=="R" goto RED_ON_ALL
if "%rd%"=="1" set "SVC_NAME=WMPNetworkSvc"  & set "SVC_DESC=Compartir medios por red. Rara vez necesario."      & set "SVC_BACK=CAT_RED" & goto CTRL_SVC
if "%rd%"=="2" set "SVC_NAME=RemoteRegistry" & set "SVC_DESC=Edicion registro por red. Riesgo de seguridad."     & set "SVC_BACK=CAT_RED" & goto CTRL_SVC
if "%rd%"=="3" set "SVC_NAME=MapsBroker"     & set "SVC_DESC=Descarga mapas offline. Innecesario sin app Mapas." & set "SVC_BACK=CAT_RED" & goto CTRL_SVC
if "%rd%"=="4" set "SVC_NAME=lfsvc"          & set "SVC_DESC=Geolocalizacion. Consume red y bateria."            & set "SVC_BACK=CAT_RED" & goto CTRL_SVC
if "%rd%"=="0" goto MENU_SERVICIOS
goto CAT_RED

:RED_OFF_ALL
color 0c
echo DESACTIVANDO TODOS Red auxiliar...
for %%S in (WMPNetworkSvc RemoteRegistry MapsBroker lfsvc) do (
    sc stop "%%S" >nul 2>&1 & sc config "%%S" start= disabled >nul 2>&1
    echo  [X] %%S desactivado
)
echo Hecho.
pause
goto CAT_RED

:RED_ON_ALL
color 0e
echo REACTIVANDO TODOS Red auxiliar...
for %%S in (WMPNetworkSvc RemoteRegistry MapsBroker lfsvc) do (
    sc config "%%S" start= auto >nul 2>&1 & sc start "%%S" >nul 2>&1
    echo  [+] %%S reactivado
)
echo Hecho.
pause
goto CAT_RED


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                    SISTEMA AUXILIAR                       ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_SISTEMA
cls
color 0a
echo ================================================
echo              SISTEMA AUXILIAR
echo ================================================
echo.
echo  1. SysMain            - Superfetch (inutil en SSD)
echo  2. TabletInputService - Teclado tactil / lapiz
echo  3. WbioSrvc           - Biometria (huella/cara)
echo  4. RetailDemo         - Modo demostracion de tienda
echo  5. DiagSvc            - Diagnostico / telemetria
echo  6. TroubleshootingSvc - Solucion automatica problemas
echo  ------------------------------------------------
echo  A. DESACTIVAR TODOS
echo  R. REACTIVAR TODOS
echo.
echo  0. Volver a categorias
echo.
set /p si=Selecciona: 

if /i "%si%"=="A" goto SISTEMA_OFF_ALL
if /i "%si%"=="R" goto SISTEMA_ON_ALL
if "%si%"=="1" set "SVC_NAME=SysMain"            & set "SVC_DESC=Superfetch. En SSD no aporta y consume RAM."            & set "SVC_BACK=CAT_SISTEMA" & goto CTRL_SVC
if "%si%"=="2" set "SVC_NAME=TabletInputService" & set "SVC_DESC=Teclado tactil. Innecesario sin pantalla tactil."       & set "SVC_BACK=CAT_SISTEMA" & goto CTRL_SVC
if "%si%"=="3" set "SVC_NAME=WbioSrvc"           & set "SVC_DESC=Biometria Windows. Solo si tienes sensor biometrico."   & set "SVC_BACK=CAT_SISTEMA" & goto CTRL_SVC
if "%si%"=="4" set "SVC_NAME=RetailDemo"         & set "SVC_DESC=Modo tienda. Sin uso real fuera de exposicion."         & set "SVC_BACK=CAT_SISTEMA" & goto CTRL_SVC
if "%si%"=="5" set "SVC_NAME=DiagSvc"            & set "SVC_DESC=Servicio diagnostico. Envia datos de uso a Microsoft."  & set "SVC_BACK=CAT_SISTEMA" & goto CTRL_SVC
if "%si%"=="6" set "SVC_NAME=TroubleshootingSvc" & set "SVC_DESC=Analiza el sistema en segundo plano buscando fallos."   & set "SVC_BACK=CAT_SISTEMA" & goto CTRL_SVC
if "%si%"=="0" goto MENU_SERVICIOS
goto CAT_SISTEMA

:SISTEMA_OFF_ALL
color 0c
echo DESACTIVANDO TODOS Sistema auxiliar...
for %%S in (SysMain TabletInputService WbioSrvc RetailDemo DiagSvc TroubleshootingSvc) do (
    sc stop "%%S" >nul 2>&1 & sc config "%%S" start= disabled >nul 2>&1
    echo  [X] %%S desactivado
)
echo Hecho.
pause
goto CAT_SISTEMA

:SISTEMA_ON_ALL
color 0e
echo REACTIVANDO TODOS Sistema auxiliar...
for %%S in (SysMain TabletInputService WbioSrvc RetailDemo DiagSvc TroubleshootingSvc) do (
    sc config "%%S" start= auto >nul 2>&1 & sc start "%%S" >nul 2>&1
    echo  [+] %%S reactivado
)
echo Hecho.
pause
goto CAT_SISTEMA


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::               MOVIL / PHONE LINK / CONNECTED              ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_MOVIL
cls
color 0a
echo ================================================
echo         MOVIL / PHONE LINK / CONNECTED
echo ================================================
echo.
echo  1. PhoneSvc           - Base de Phone Link
echo  2. YourPhoneSvc       - Sincronizacion Tu Telefono
echo  3. CrossDeviceService - Experiencia entre dispositivos
echo  4. CDPSvc             - Connected Devices Platform
echo  5. CDPUserSvc         - Connected Devices (usuario)
echo  6. WpnService         - Notificaciones push Windows
echo  7. WpnUserService     - Notificaciones push (usuario)
echo  ------------------------------------------------
echo  A. DESACTIVAR TODOS
echo  R. REACTIVAR TODOS
echo.
echo  0. Volver a categorias
echo.
set /p mv=Selecciona: 

if /i "%mv%"=="A" goto MOVIL_OFF_ALL
if /i "%mv%"=="R" goto MOVIL_ON_ALL
if "%mv%"=="1" set "SVC_NAME=PhoneSvc"           & set "SVC_DESC=Servicio base de Phone Link."                   & set "SVC_BACK=CAT_MOVIL" & goto CTRL_SVC
if "%mv%"=="2" set "SVC_NAME=YourPhoneSvc"       & set "SVC_DESC=Sincronizacion Tu Telefono con Android."        & set "SVC_BACK=CAT_MOVIL" & goto CTRL_SVC
if "%mv%"=="3" set "SVC_NAME=CrossDeviceService" & set "SVC_DESC=Experiencia entre dispositivos PC y movil."     & set "SVC_BACK=CAT_MOVIL" & goto CTRL_SVC
if "%mv%"=="4" set "SVC_NAME=CDPSvc"             & set "SVC_DESC=Plataforma Connected Devices. Base Phone Link." & set "SVC_BACK=CAT_MOVIL" & goto CTRL_SVC
if "%mv%"=="5" set "SVC_NAME=CDPUserSvc"         & set "SVC_DESC=Instancia usuario Connected Devices Platform."  & set "SVC_BACK=CAT_MOVIL" & goto CTRL_SVC
if "%mv%"=="6" set "SVC_NAME=WpnService"         & set "SVC_DESC=Notificaciones push. Recibe alertas del movil." & set "SVC_BACK=CAT_MOVIL" & goto CTRL_SVC
if "%mv%"=="7" set "SVC_NAME=WpnUserService"     & set "SVC_DESC=Instancia usuario notificaciones push."         & set "SVC_BACK=CAT_MOVIL" & goto CTRL_SVC
if "%mv%"=="0" goto MENU_SERVICIOS
goto CAT_MOVIL

:MOVIL_OFF_ALL
color 0c
echo DESACTIVANDO TODOS Movil/Phone Link...
for %%S in (PhoneSvc YourPhoneSvc CrossDeviceService CDPSvc WpnService WpnUserService) do (
    sc stop "%%S" >nul 2>&1 & sc config "%%S" start= disabled >nul 2>&1
    echo  [X] %%S desactivado
)
rem CDPUserSvc es plantilla, se deshabilita por registro
reg add "HKLM\SYSTEM\CurrentControlSet\Services\CDPUserSvc" /v Start /t REG_DWORD /d 4 /f >nul
echo  [X] CDPUserSvc (plantilla) desactivado via registro

rem Matar instancia activa si existe
for /f "tokens=1" %%S in ('sc query type^= all state^= all ^| findstr /i "CDPUserSvc_"') do (
    sc stop "%%S" >nul 2>&1
    echo  [X] %%S instancia detenida
)
echo Hecho.
pause
goto CAT_MOVIL

:MOVIL_ON_ALL
color 0e
echo REACTIVANDO TODOS Movil/Phone Link...
for %%S in (PhoneSvc YourPhoneSvc CrossDeviceService CDPSvc WpnService WpnUserService) do (
    sc config "%%S" start= auto >nul 2>&1 & sc start "%%S" >nul 2>&1
    echo  [+] %%S reactivado
)
rem CDPUserSvc es plantilla, se reactiva por registro
reg add "HKLM\SYSTEM\CurrentControlSet\Services\CDPUserSvc" /v Start /t REG_DWORD /d 3 /f >nul
echo  [+] CDPUserSvc (plantilla) reactivado via registro
echo Hecho.
pause
goto CAT_MOVIL

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                       BLUETOOTH                           ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_BLUETOOTH
cls
color 0a
echo ================================================
echo                  BLUETOOTH
echo ================================================
echo.
echo  1. bthserv              - Servicio Bluetooth base
echo  2. BTAGService          - Audio Bluetooth (auriculares)
echo  3. BthAvctpSvc          - Control de audio Bluetooth
echo  4. BluetoothUserService - Emparejamiento Bluetooth
echo  ------------------------------------------------
echo  A. DESACTIVAR TODOS
echo  R. REACTIVAR TODOS
echo.
echo  0. Volver a categorias
echo.
set /p bt=Selecciona: 

if /i "%bt%"=="A" goto BT_OFF_ALL
if /i "%bt%"=="R" goto BT_ON_ALL
if "%bt%"=="1" set "SVC_NAME=bthserv"              & set "SVC_DESC=Bluetooth base. Desactivar si no tienes BT."      & set "SVC_BACK=CAT_BLUETOOTH" & goto CTRL_SVC
if "%bt%"=="2" set "SVC_NAME=BTAGService"          & set "SVC_DESC=Audio Bluetooth. Solo si usas auriculares BT."    & set "SVC_BACK=CAT_BLUETOOTH" & goto CTRL_SVC
if "%bt%"=="3" set "SVC_NAME=BthAvctpSvc"          & set "SVC_DESC=Control audio Bluetooth (play/pause/volumen)."    & set "SVC_BACK=CAT_BLUETOOTH" & goto CTRL_SVC
if "%bt%"=="4" set "SVC_NAME=BluetoothUserService" & set "SVC_DESC=Gestion emparejamiento dispositivos Bluetooth."   & set "SVC_BACK=CAT_BLUETOOTH" & goto CTRL_SVC
if "%bt%"=="0" goto MENU_SERVICIOS
goto CAT_BLUETOOTH

:BT_OFF_ALL
color 0c
echo DESACTIVANDO TODOS Bluetooth...
for %%S in (bthserv BTAGService BthAvctpSvc BluetoothUserService) do (
    sc stop "%%S" >nul 2>&1 & sc config "%%S" start= disabled >nul 2>&1
    echo  [X] %%S desactivado
)
echo Hecho.
pause
goto CAT_BLUETOOTH

:BT_ON_ALL
color 0e
echo REACTIVANDO TODOS Bluetooth...
for %%S in (bthserv BTAGService BthAvctpSvc BluetoothUserService) do (
    sc config "%%S" start= auto >nul 2>&1 & sc start "%%S" >nul 2>&1
    echo  [+] %%S reactivado
)
echo Hecho.
pause
goto CAT_BLUETOOTH


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                     WI-FI Y HOTSPOT                      ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_WIFI
cls
color 0a
echo ================================================
echo               WI-FI Y HOTSPOT
echo ================================================
echo.
echo  1. icssvc       - Hotspot / zona WiFi compartida
echo  2. WwanSvc      - Redes moviles 4G/5G (SIM en PC)
echo  3. NcdAutoSetup - Deteccion dispositivos en red local
echo  [!] WlanSvc (WiFi real) excluido: riesgo perder conexion
echo  ------------------------------------------------
echo  A. DESACTIVAR TODOS
echo  R. REACTIVAR TODOS
echo.
echo  0. Volver a categorias
echo.
set /p wf=Selecciona: 

if /i "%wf%"=="A" goto WIFI_OFF_ALL
if /i "%wf%"=="R" goto WIFI_ON_ALL
if "%wf%"=="1" set "SVC_NAME=icssvc"       & set "SVC_DESC=Hotspot. Innecesario si no compartes WiFi desde PC." & set "SVC_BACK=CAT_WIFI" & goto CTRL_SVC
if "%wf%"=="2" set "SVC_NAME=WwanSvc"      & set "SVC_DESC=Redes 4G/5G. Solo si tienes SIM en el PC."          & set "SVC_BACK=CAT_WIFI" & goto CTRL_SVC
if "%wf%"=="3" set "SVC_NAME=NcdAutoSetup" & set "SVC_DESC=Detecta dispositivos en red local automaticamente."  & set "SVC_BACK=CAT_WIFI" & goto CTRL_SVC
if "%wf%"=="0" goto MENU_SERVICIOS
goto CAT_WIFI

:WIFI_OFF_ALL
color 0c
echo DESACTIVANDO TODOS WiFi/Hotspot auxiliar...
for %%S in (icssvc WwanSvc NcdAutoSetup) do (
    sc stop "%%S" >nul 2>&1 & sc config "%%S" start= disabled >nul 2>&1
    echo  [X] %%S desactivado
)
echo Hecho.
pause
goto CAT_WIFI

:WIFI_ON_ALL
color 0e
echo REACTIVANDO TODOS WiFi/Hotspot auxiliar...
for %%S in (icssvc WwanSvc NcdAutoSetup) do (
    sc config "%%S" start= auto >nul 2>&1 & sc start "%%S" >nul 2>&1
    echo  [+] %%S reactivado
)
echo Hecho.
pause
goto CAT_WIFI


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                NFC Y TARJETA INTELIGENTE                  ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_NFC
cls
color 0a
echo ================================================
echo           NFC Y TARJETA INTELIGENTE
echo ================================================
echo.
echo  1. SEMgrSvc     - Administrador de eventos NFC/SIM
echo  2. ScDeviceEnum - Enumeracion tarjetas inteligentes
echo  3. SCardSvr     - Tarjeta inteligente (DNI/NFC)
echo  ------------------------------------------------
echo  A. DESACTIVAR TODOS
echo  R. REACTIVAR TODOS
echo.
echo  0. Volver a categorias
echo.
set /p nf=Selecciona: 

if /i "%nf%"=="A" goto NFC_OFF_ALL
if /i "%nf%"=="R" goto NFC_ON_ALL
if "%nf%"=="1" set "SVC_NAME=SEMgrSvc"     & set "SVC_DESC=Eventos NFC y SIM. Innecesario sin lector NFC."       & set "SVC_BACK=CAT_NFC" & goto CTRL_SVC
if "%nf%"=="2" set "SVC_NAME=ScDeviceEnum" & set "SVC_DESC=Enumeracion tarjetas inteligentes. Solo si las usas." & set "SVC_BACK=CAT_NFC" & goto CTRL_SVC
if "%nf%"=="3" set "SVC_NAME=SCardSvr"     & set "SVC_DESC=Tarjeta inteligente: DNI electronico, NFC bancario."  & set "SVC_BACK=CAT_NFC" & goto CTRL_SVC
if "%nf%"=="0" goto MENU_SERVICIOS
goto CAT_NFC

:NFC_OFF_ALL
color 0c
echo DESACTIVANDO TODOS NFC/Tarjeta...
for %%S in (SEMgrSvc ScDeviceEnum SCardSvr) do (
    sc stop "%%S" >nul 2>&1 & sc config "%%S" start= disabled >nul 2>&1
    echo  [X] %%S desactivado
)
echo Hecho.
pause
goto CAT_NFC

:NFC_ON_ALL
color 0e
echo REACTIVANDO TODOS NFC/Tarjeta...
for %%S in (SEMgrSvc ScDeviceEnum SCardSvr) do (
    sc config "%%S" start= auto >nul 2>&1 & sc start "%%S" >nul 2>&1
    echo  [+] %%S reactivado
)
echo Hecho.
pause
goto CAT_NFC


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                 SINCRONIZACION CON MOVIL                  ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_SYNC
cls
color 0a
echo ================================================
echo           SINCRONIZACION CON MOVIL
echo ================================================
echo.
echo  1. OneSyncSvc              - Correo/contactos/calendario
echo  2. MessagingService        - SMS desde el PC
echo  3. DeviceAssociationBrokerSvc - Emparejamiento dispositivos
echo  4. DevicesFlowUserSvc      - Flujo nuevos dispositivos
echo  ------------------------------------------------
echo  A. DESACTIVAR TODOS
echo  R. REACTIVAR TODOS
echo.
echo  0. Volver a categorias
echo.
set /p sy=Selecciona: 

if /i "%sy%"=="A" goto SYNC_OFF_ALL
if /i "%sy%"=="R" goto SYNC_ON_ALL
if "%sy%"=="1" set "SVC_NAME=OneSyncSvc"                 & set "SVC_DESC=Sincroniza correo, contactos y calendario." & set "SVC_BACK=CAT_SYNC" & goto CTRL_SVC
if "%sy%"=="2" set "SVC_NAME=MessagingService"           & set "SVC_DESC=SMS desde el PC via Phone Link."             & set "SVC_BACK=CAT_SYNC" & goto CTRL_SVC
if "%sy%"=="3" set "SVC_NAME=DeviceAssociationBrokerSvc" & set "SVC_DESC=Emparejamiento de dispositivos y movil."     & set "SVC_BACK=CAT_SYNC" & goto CTRL_SVC
if "%sy%"=="4" set "SVC_NAME=DevicesFlowUserSvc"         & set "SVC_DESC=Flujo de configuracion nuevos dispositivos." & set "SVC_BACK=CAT_SYNC" & goto CTRL_SVC
if "%sy%"=="0" goto MENU_SERVICIOS
goto CAT_SYNC

:SYNC_OFF_ALL
color 0c
echo DESACTIVANDO TODOS Sincronizacion movil...
for %%S in (OneSyncSvc MessagingService DeviceAssociationBrokerSvc DevicesFlowUserSvc) do (
    sc stop "%%S" >nul 2>&1 & sc config "%%S" start= disabled >nul 2>&1
    echo  [X] %%S desactivado
)
echo Hecho.
pause
goto CAT_SYNC

:SYNC_ON_ALL
color 0e
echo REACTIVANDO TODOS Sincronizacion movil...
for %%S in (OneSyncSvc MessagingService DeviceAssociationBrokerSvc DevicesFlowUserSvc) do (
    sc config "%%S" start= auto >nul 2>&1 & sc start "%%S" >nul 2>&1
    echo  [+] %%S reactivado
)
echo Hecho.
pause
goto CAT_SYNC


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                   LISTAR PROCESOS                         ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:LISTAR_PROCESOS
cls
color 0a
echo LISTANDO PROCESOS EN EJECUCION...

set "CARPETA=%~dp0"
set "ARCHIVO=%CARPETA%procesos_%date:~-4,4%%date:~-7,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%.txt"
set "ARCHIVO=%ARCHIVO: =0%"

echo Fecha y hora: %date% %time% > "%ARCHIVO%"
echo ================================================ >> "%ARCHIVO%"
echo           PROCESOS EN EJECUCION >> "%ARCHIVO%"
echo ================================================ >> "%ARCHIVO%"
echo. >> "%ARCHIVO%"
tasklist /fo list >> "%ARCHIVO%"

echo.
echo Archivo guardado en:
echo %ARCHIVO%
echo.
pause
goto MENU
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::                   POWERTOYS / AWAKE                       ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:CAT_POWERTOYS
cls
color 0a
echo ================================================
echo              POWERTOYS / AWAKE
echo ================================================
echo.
echo  1. PowerToys.Awake  - Mantiene el PC despierto
echo  2. PowerToys        - Suite completa PowerToys
echo  ------------------------------------------------
echo  A. MATAR TODOS (sesion actual)
echo  I. Quitar PowerToys del INICIO de Windows
echo  R. Restaurar PowerToys al INICIO de Windows
echo.
echo  0. Volver a categorias
echo.
set /p pt=Selecciona: 

if /i "%pt%"=="A" goto PT_KILL_ALL
if /i "%pt%"=="I" goto PT_INICIO_OFF
if /i "%pt%"=="R" goto PT_INICIO_ON
if "%pt%"=="1" goto PT_AWAKE
if "%pt%"=="2" goto PT_MAIN
if "%pt%"=="0" goto MENU_SERVICIOS
goto CAT_POWERTOYS


:PT_AWAKE
cls
color 0a
echo ================================================
echo  PROCESO: PowerToys.Awake
echo ================================================
echo  Mantiene el PC despierto segun temporizador.
echo ================================================
echo.
echo  1. Matar proceso (esta sesion)
echo  2. Ver si esta activo
echo.
echo  0. Volver
echo.
set /p pa=Selecciona: 
if "%pa%"=="1" goto PT_AWAKE_KILL
if "%pa%"=="2" goto PT_AWAKE_STATUS
if "%pa%"=="0" goto CAT_POWERTOYS
goto PT_AWAKE

:PT_AWAKE_KILL
color 0c
echo Matando PowerToys.Awake...
taskkill /f /im PowerToys.Awake.exe >nul 2>&1
echo Proceso terminado (si estaba activo).
pause
goto PT_AWAKE

:PT_AWAKE_STATUS
color 0a
echo Estado de PowerToys.Awake:
tasklist /fi "imagename eq PowerToys.Awake.exe" 2>nul | find "PowerToys.Awake" >nul
if %errorlevel%==0 (
    echo  [ACTIVO] PowerToys.Awake esta en ejecucion.
) else (
    echo  [INACTIVO] PowerToys.Awake no esta corriendo.
)
pause
goto PT_AWAKE


:PT_MAIN
cls
color 0a
echo ================================================
echo  PROCESO: PowerToys
echo ================================================
echo.
echo  1. Matar PowerToys completo
echo  2. Ver si esta activo
echo.
echo  0. Volver
echo.
set /p pm=Selecciona: 
if "%pm%"=="1" goto PT_MAIN_KILL
if "%pm%"=="2" goto PT_MAIN_STATUS
if "%pm%"=="0" goto CAT_POWERTOYS
goto PT_MAIN

:PT_MAIN_KILL
color 0c
echo Matando PowerToys y todos sus modulos...
taskkill /f /im PowerToys.exe >nul 2>&1
taskkill /f /im PowerToys.Awake.exe >nul 2>&1
echo Hecho.
pause
goto PT_MAIN

:PT_MAIN_STATUS
color 0a
tasklist /fi "imagename eq PowerToys.exe" 2>nul | find "PowerToys" >nul
if %errorlevel%==0 (
    echo  [ACTIVO] PowerToys esta en ejecucion.
) else (
    echo  [INACTIVO] PowerToys no esta corriendo.
)
pause
goto PT_MAIN


:PT_KILL_ALL
color 0c
echo Matando PowerToys.Awake y PowerToys...
taskkill /f /im PowerToys.Awake.exe >nul 2>&1
taskkill /f /im PowerToys.exe >nul 2>&1
echo  [X] PowerToys.Awake terminado
echo  [X] PowerToys terminado
echo Hecho.
pause
goto CAT_POWERTOYS


:PT_INICIO_OFF
cls
color 0c
echo ================================================
echo  QUITANDO POWERTOYS DEL INICIO DE WINDOWS
echo ================================================
echo.
echo Buscando ruta de instalacion...
set "PT_PATH="
for %%P in (
    "%LOCALAPPDATA%\PowerToys\PowerToys.exe"
    "%PROGRAMFILES%\PowerToys\PowerToys.exe"
    "%PROGRAMFILES(X86)%\PowerToys\PowerToys.exe"
) do (
    if exist %%P set "PT_PATH=%%P"
)
echo Guardando ruta actual por si deseas restaurar...
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v PowerToys >nul 2>&1
if %errorlevel%==0 (
    for /f "tokens=3*" %%A in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v PowerToys 2^>nul') do (
        reg add "HKCU\Software\PowerToysBackup" /v PowerToysPath /t REG_SZ /d "%%A %%B" /f >nul 2>&1
    )
)
taskkill /f /im PowerToys.exe >nul 2>&1
taskkill /f /im PowerToys.Awake.exe >nul 2>&1
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v PowerToys /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /v PowerToys /f >nul 2>&1
echo.
echo  [X] PowerToys eliminado del inicio de Windows.
echo  [!] Proceso actual tambien terminado.
echo  [i] Usa la opcion R para restaurarlo al inicio.
echo.
pause
goto CAT_POWERTOYS


:PT_INICIO_ON
cls
color 0e
echo ================================================
echo  RESTAURANDO POWERTOYS AL INICIO DE WINDOWS
echo ================================================
echo.
set "PT_PATH="
rem Intentar recuperar ruta guardada
for /f "tokens=3*" %%A in ('reg query "HKCU\Software\PowerToysBackup" /v PowerToysPath 2^>nul') do (
    set "PT_PATH=%%A %%B"
)
rem Si no hay backup, buscar manualmente
if not defined PT_PATH (
    for %%P in (
        "%LOCALAPPDATA%\PowerToys\PowerToys.exe"
        "%PROGRAMFILES%\PowerToys\PowerToys.exe"
        "%PROGRAMFILES(X86)%\PowerToys\PowerToys.exe"
    ) do (
        if exist %%P set "PT_PATH=%%~P"
    )
)
if not defined PT_PATH (
    echo  [!] No se encontro PowerToys instalado.
    echo      Instala PowerToys y vuelve a intentarlo.
    pause
    goto CAT_POWERTOYS
)
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v PowerToys /t REG_SZ /d "%PT_PATH%" /f >nul
echo  [+] PowerToys restaurado al inicio: %PT_PATH%
echo  [i] Arrancando PowerToys ahora...
start "" "%PT_PATH%"
pause
goto CAT_POWERTOYS