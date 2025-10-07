// Sistema de Carrito de Compras
class CarritoCompras {
  constructor() {
    this.items = this.loadFromStorage();
    this.updateUI();
  }

  // Agregar producto al carrito
  agregarProducto(producto, cantidad = 1) {
    const itemExistente = this.items.find(item => item.id === producto.id);
    
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.items.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        categoria: producto.categoria,
        cantidad: cantidad
      });
    }
    
    this.saveToStorage();
    this.updateUI();
    this.showNotification(`${producto.nombre} agregado al carrito`);
  }

  // Remover producto del carrito
  removerProducto(productoId) {
    this.items = this.items.filter(item => item.id !== productoId);
    this.saveToStorage();
    this.updateUI();
  }

  // Actualizar cantidad de un producto
  actualizarCantidad(productoId, nuevaCantidad) {
    const item = this.items.find(item => item.id === productoId);
    if (item) {
      if (nuevaCantidad <= 0) {
        this.removerProducto(productoId);
      } else {
        item.cantidad = nuevaCantidad;
        this.saveToStorage();
        this.updateUI();
      }
    }
  }

  // Limpiar carrito
  limpiarCarrito() {
    this.items = [];
    this.saveToStorage();
    this.updateUI();
  }

  // Obtener total del carrito
  getTotal() {
    return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  // Obtener cantidad total de items
  getCantidadTotal() {
    return this.items.reduce((total, item) => total + item.cantidad, 0);
  }

  // Guardar en localStorage
  saveToStorage() {
    localStorage.setItem('carrito_venturazone', JSON.stringify(this.items));
  }

  // Cargar desde localStorage
  loadFromStorage() {
    const stored = localStorage.getItem('carrito_venturazone');
    return stored ? JSON.parse(stored) : [];
  }

  // Actualizar interfaz de usuario
  updateUI() {
    // Actualizar contador del carrito en el header
    const carritoCounters = document.querySelectorAll('.carrito-count');
    carritoCounters.forEach(counter => {
      counter.textContent = this.getCantidadTotal();
    });

    // Actualizar total del carrito
    const carritoTotal = document.querySelector('.carrito-total');
    if (carritoTotal) {
      carritoTotal.textContent = `$${this.getTotal().toLocaleString()}`;
    }

    // Mostrar/ocultar carrito vacío
    const carritoVacio = document.querySelector('.carrito-vacio');
    const carritoItems = document.querySelector('.carrito-items');
    
    if (this.items.length === 0) {
      if (carritoVacio) carritoVacio.style.display = 'block';
      if (carritoItems) carritoItems.style.display = 'none';
    } else {
      if (carritoVacio) carritoVacio.style.display = 'none';
      if (carritoItems) carritoItems.style.display = 'block';
    }
  }

  // Mostrar notificación
  showNotification(message) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = 'carrito-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
      font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover después de 3 segundos
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Renderizar carrito en modal
  renderCarritoModal() {
    const modal = document.getElementById('carrito-modal');
    if (!modal) return;

    const carritoContent = modal.querySelector('.carrito-content');
    if (!carritoContent) return;

    if (this.items.length === 0) {
      carritoContent.innerHTML = `
        <div class="carrito-vacio text-center py-12">
          <i class="fas fa-shopping-cart text-6xl text-gray-400 mb-4"></i>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Tu carrito está vacío</h3>
          <p class="text-gray-500 mb-6">Agrega algunos productos para comenzar</p>
          <button onclick="cerrarCarrito()" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Continuar Comprando
          </button>
        </div>
      `;
    } else {
      carritoContent.innerHTML = `
        <div class="carrito-items">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold">Carrito de Compras</h3>
            <button onclick="carrito.limpiarCarrito()" class="text-red-500 hover:text-red-700 text-sm font-medium">
              <i class="fas fa-trash mr-1"></i>Limpiar Todo
            </button>
          </div>
          
          <div class="space-y-4 mb-6">
            ${this.items.map(item => `
              <div class="carrito-item flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img src="${item.imagen}" alt="${item.nombre}" class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-800">${item.nombre}</h4>
                  <p class="text-sm text-gray-600">${item.categoria}</p>
                  <p class="text-orange-600 font-bold">$${item.precio.toLocaleString()}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <button onclick="carrito.actualizarCantidad('${item.id}', ${item.cantidad - 1})" 
                          class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                    <i class="fas fa-minus text-xs"></i>
                  </button>
                  <span class="w-8 text-center font-semibold">${item.cantidad}</span>
                  <button onclick="carrito.actualizarCantidad('${item.id}', ${item.cantidad + 1})" 
                          class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                    <i class="fas fa-plus text-xs"></i>
                  </button>
                </div>
                <button onclick="carrito.removerProducto('${item.id}')" 
                        class="text-red-500 hover:text-red-700 ml-4">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            `).join('')}
          </div>
          
          <div class="border-t pt-4">
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-semibold">Total:</span>
              <span class="text-2xl font-bold text-orange-600 carrito-total">$${this.getTotal().toLocaleString()}</span>
            </div>
            
            <div class="space-y-3">
              <button onclick="procederPago()" 
                      class="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors">
                <i class="fas fa-credit-card mr-2"></i>Proceder al Pago
              </button>
              <button onclick="cerrarCarrito()" 
                      class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors">
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }
}

// Inicializar carrito global
const carrito = new CarritoCompras();

// Funciones globales para el carrito
function abrirCarrito() {
  const modal = document.getElementById('carrito-modal');
  if (modal) {
    carrito.renderCarritoModal();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function cerrarCarrito() {
  const modal = document.getElementById('carrito-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function procederPago() {
  if (carrito.items.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  // Aquí puedes implementar la lógica de pago
  // Por ahora, mostraremos un mensaje
  alert('Redirigiendo al proceso de pago...');
  cerrarCarrito();
}

// Función para agregar producto al carrito
function agregarAlCarrito(productoId) {
  const producto = getProductById(productoId);
  if (producto) {
    carrito.agregarProducto(producto);
  }
}

// Exportar para uso global
window.carrito = carrito;
window.abrirCarrito = abrirCarrito;
window.cerrarCarrito = cerrarCarrito;
window.procederPago = procederPago;
window.agregarAlCarrito = agregarAlCarrito;


