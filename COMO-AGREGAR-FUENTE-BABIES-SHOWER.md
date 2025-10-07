# 🎨 Cómo Agregar la Fuente Babies Shower

## 📥 Pasos para Descargar e Instalar la Fuente

### 1. **Descargar la Fuente**
- Ve a: https://www.dafont.com/es/alpha.php?lettre=b&page=2&text=Bienvenidos
- Busca "**Babies Shower**" de AZ Std
- Haz clic en "**Descargar**"
- La fuente es **gratuita para uso personal**

### 2. **Extraer el Archivo**
- Descomprime el archivo ZIP descargado
- Busca el archivo `.ttf` (BabiesShower.ttf)

### 3. **Copiar la Fuente al Proyecto**
- Copia el archivo `BabiesShower.ttf`
- Pégalo en: `Webventurazone/public/fonts/`
- **Renómbralo** a: `BabiesShower.ttf`

### 4. **Estructura Final**
```
Webventurazone/
├── public/
│   ├── fonts/
│   │   └── BabiesShower.ttf  ← Aquí va la fuente
│   └── images/
│       └── LOGO.jpg
└── src/
    └── styles/
        └── globals.css  ← Ya configurado
```

## ✅ Configuración Ya Lista

La configuración ya está preparada en:
- ✅ `src/styles/globals.css` - @font-face declarado
- ✅ `tailwind.config.mjs` - fontFamily configurado
- ✅ `src/pages/index.astro` - Clase `font-babies` aplicada

## 🚀 Después de Agregar la Fuente

1. **Reinicia el servidor:**
   ```bash
   npm run dev
   ```

2. **Verifica que funcione:**
   - El título "Bienvenidos a Ventura Zone" debería aparecer con la fuente Babies Shower
   - Es una fuente manuscrita elegante y cálida

## 🎯 Resultado Esperado

- **Fuente**: Babies Shower (manuscrita)
- **Título**: "Bienvenidos a Ventura Zone"
- **Colores**: "Bienvenidos a" en rojo, "Ventura Zone" en azul
- **Posición**: Lado izquierdo de la página

## 📝 Nota Legal

- La fuente "Babies Shower" es **gratuita para uso personal**
- Autor: AZ Std
- Fuente: DaFont.com
- Para uso comercial, verificar licencia con el autor

---

**¡Una vez que agregues la fuente, el título se verá perfecto con el estilo Babies Shower!** 🎨✨




