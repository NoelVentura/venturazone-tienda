@echo off
title VenturaZone - Servidor de Desarrollo
color 0A

echo.
echo ========================================
echo    VENTURAZONE - SERVIDOR DE DESARROLLO
echo ========================================
echo.

echo 📁 Directorio actual: %CD%
echo.

REM Verificar si estamos en el directorio correcto4
if not exist "package.json" (
    echo ❌ ERROR: No se encontró package.json
    echo.
    echo 🔧 SOLUCIÓN:
    echo    1. Asegúrate de estar en la carpeta Webventurazone
    echo    2. Debes ver package.json en esta carpeta
    echo.
    echo 📂 Archivos en este directorio:
    dir /b
    echo.
    pause
    exit /b 1
)

echo ✅ package.json encontrado - Directorio correcto
echo.

echo 🚀 Iniciando servidor de desarrollo...
echo.
echo 🌐 URLs que estarán disponibles:
echo    • l
echo    • http://192.168.1.112:4321/
echo.
echo ⏳ Iniciando servidor...
echo.

npm run dev

echo.
echo 🛑 Servidor detenido
pause




