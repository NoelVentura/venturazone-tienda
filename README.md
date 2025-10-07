# Venture Zone - Tienda Online

## 🛍️ Descripción
Venture Zone es una tienda online especializada en perfumes, cuidado corporal, maquillaje y suplementos.

## 📋 Estructura de Navegación

La aplicación web sigue el siguiente flujo de navegación:

```
📄 public/documents/catalogo.html (Página Principal)
   ├── public/documents/areaperfumes.html (Catálogo de Perfumes)
   ├── public/documents/Cuidadocorporal.html (Productos de Cuidado Corporal)
   ├── public/documents/maquillaje.html (Productos de Maquillaje)
   ├── public/documents/suplementos.html (Suplementos)
   └── public/pago.html (Proceso de pago y checkout)
```

## 🗂️ Estructura de Archivos

```
Webventurazone/
├── public/
│   ├── documents/           # Páginas HTML
│   │   ├── catalogo.html    # Página principal del catálogo
│   │   ├── areaperfumes.html
│   │   ├── Cuidadocorporal.html
│   │   ├── maquillaje.html
│   │   └── suplementos.html
│   ├── pago.html            # Página de checkout
│   ├── css/                 # Estilos
│   │   ├── catalogo.css
│   │   └── pago.css
│   ├── js/                  # Scripts JavaScript
│   │   ├── carrito.js
│   │   ├── catalogo.js
│   │   ├── pago.js
│   │   └── productos-data.js
│   ├── images/              # Imágenes de productos
│   ├── videos/              # Videos promocionales
│   └── fonts/               # Fuentes personalizadas
├── src/                     # Código fuente Astro
└── server.js                # Servidor Node.js
```

## 🚀 Características

- ✅ Catálogo de productos por categorías
- ✅ Sistema de carrito de compras
- ✅ Proceso de checkout completo
- ✅ Métodos de pago: WhatsApp, Transferencia, Efectivo
- ✅ Integración con WhatsApp para pedidos
- ✅ Chatbot de soporte (Botpress)
- ✅ Diseño responsive
- ✅ Interfaz moderna y atractiva

## 💻 Tecnologías

- HTML5
- CSS3
- JavaScript
- Astro
- Node.js
- LocalStorage para carrito

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone [URL-DEL-REPOSITORIO]
cd Webventurazone
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Iniciar servidor de desarrollo:
```bash
pnpm run dev
```

O usar el archivo bat incluido:
```bash
INICIAR-AHORA.bat
```

## 🌐 Páginas Principales

### 1. Catálogo (`public/documents/catalogo.html`)
**Página principal** que muestra todas las categorías de productos:
- 🌸 Perfumes
- 🧴 Cuidado Corporal
- 💄 Maquillaje
- 💊 Suplementos

Desde aquí el usuario puede navegar a cada sección específica o ir directamente al proceso de pago.

### 2. Áreas de Productos (Ubicadas en `public/documents/`)
- **areaperfumes.html**: Catálogo completo de perfumes para hombre y mujer
- **Cuidadocorporal.html**: Productos de cuidado personal y corporal
- **maquillaje.html**: Productos de maquillaje y belleza
- **suplementos.html**: Suplementos nutricionales y deportivos

### 3. Pago (`public/pago.html`)
Página de checkout donde el usuario:
- ✍️ Completa sus datos personales
- 📍 Ingresa dirección de envío
- 💳 Selecciona método de pago (WhatsApp, Transferencia o Efectivo)
- ✅ Confirma su pedido

## 💳 Métodos de Pago

1. **WhatsApp**: Envío directo de pedido por WhatsApp
2. **Transferencia Bancaria**: Con datos de cuenta incluidos
3. **Efectivo**: Pago contra entrega

## 📱 Contacto

- WhatsApp: +52 311 121 3128
- Chatbot integrado para soporte 24/7

## 📝 Notas de Desarrollo

- El carrito se guarda en LocalStorage
- Las imágenes están optimizadas para web
- El diseño es completamente responsive
- Integración con Botpress para chatbot

## 🎨 Personalización

Las fuentes personalizadas están disponibles en `public/fonts/`:
- BabiesShower.ttf
- BabyDoll.ttf
- Cathalia.ttf
- FairProsper.ttf
- Y más...

## 📄 Licencia

Este proyecto es propiedad de Venture Zone.

---

Desarrollado con ❤️ para Venture Zone
