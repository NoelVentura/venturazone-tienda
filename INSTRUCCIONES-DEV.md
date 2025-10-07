# 🚀 Instrucciones para Iniciar el Servidor de Desarrollo

## ⚠️ **IMPORTANTE: Error Común**

**NO ejecutes `npm run dev` desde la carpeta `Pagina Web Venturazone`**

### ❌ **INCORRECTO:**
```
C:\Users\Noel Pacheco\Desktop\Proyectos Cursor\Proyectos\Pagina Web Venturazone> npm run dev
```

### ✅ **CORRECTO:**
```
C:\Users\Noel Pacheco\Desktop\Proyectos Cursor\Proyectos\Pagina Web Venturazone\Webventurazone> npm run dev
```

## 🎯 **Métodos para Iniciar el Servidor:**

### **Opción 1: Usar el Script Automático (Recomendado)**
1. Navega a la carpeta `Webventurazone`
2. Haz doble clic en `start-dev.bat`
3. El servidor se iniciará automáticamente

### **Opción 2: Terminal Manual**
1. Abre PowerShell o CMD
2. Navega al directorio correcto:
   ```powershell
   cd "C:\Users\Noel Pacheco\Desktop\Proyectos Cursor\Proyectos\Pagina Web Venturazone\Webventurazone"
   ```
3. Ejecuta:
   ```powershell
   npm run dev
   ```

### **Opción 3: Desde VS Code/Cursor**
1. Abre la carpeta `Webventurazone` en tu editor
2. Abre la terminal integrada
3. Ejecuta `npm run dev`

## 🌐 **URLs del Servidor:**
- **Local**: `http://localhost:4321/`
- **Red**: `http://192.168.1.112:4321/`

## 🔧 **Si el Error Persiste:**
1. Verifica que estés en la carpeta correcta (debe contener `package.json`)
2. Ejecuta `dir` o `ls` para ver los archivos
3. Debes ver: `package.json`, `astro.config.mjs`, `src/`, etc.

## 📁 **Estructura Correcta:**
```
Pagina Web Venturazone/
└── Webventurazone/          ← DEBES estar AQUÍ
    ├── package.json         ← Este archivo debe existir
    ├── astro.config.mjs
    ├── src/
    ├── public/
    └── start-dev.bat        ← Script automático
```




