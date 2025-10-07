@echo off
echo ========================================
echo    INICIANDO SERVIDOR VENTURAZONE
echo ========================================
echo.

REM Verificar que estamos en el directorio correcto
if not exist "package.json" (
    echo ERROR: No se encuentra package.json
    echo Asegurate de estar en la carpeta Webventurazone
    pause
    exit /b 1
)

echo ✅ Directorio correcto detectado
echo ✅ Archivo package.json encontrado
echo.

echo 🚀 Iniciando servidor de desarrollo...
echo 🌐 URL: http://localhost:4321
echo.

REM Iniciar el servidor
npm run dev

echo.
echo ⚠️  Si el servidor se detiene, presiona cualquier tecla para salir
pause




