// JavaScript para página de pago - Venture Zone
// Manejo del formulario, validación y procesamiento de pago

// Variables globales
let cartItems = [];
let cartTotal = 0;
let envioCost = 50;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeCheckout();
    loadCartData();
    setupFormValidation();
    setupFormSubmission();
});

// Inicializar la página de checkout
function initializeCheckout() {
    console.log('Inicializando página de pago...');
    
    // Cargar datos del carrito desde localStorage
    loadCartFromStorage();
    
    // Mostrar resumen de productos
    displayOrderSummary();
    
    // Calcular totales
    calculateTotals();
}

// Cargar datos del carrito desde localStorage
function loadCartFromStorage() {
    try {
        console.log('🔍 Buscando carrito en localStorage...');
        
        // Intentar cargar desde ambos formatos
        let savedCart = localStorage.getItem('venturazone_cart');
        console.log('📦 venturazone_cart:', savedCart);
        
        if (!savedCart) {
            savedCart = localStorage.getItem('ventureZoneCart');
            console.log('📦 ventureZoneCart:', savedCart);
        }
        
        if (savedCart) {
            const cartData = JSON.parse(savedCart);
            cartItems = cartData.items || [];
            cartTotal = cartData.count || 0;
            console.log('✅ Carrito cargado correctamente:', cartItems);
            console.log('📊 Cantidad de productos:', cartItems.length);
        } else {
            console.log('⚠️ No se encontró carrito en localStorage');
            cartItems = [];
        }
    } catch (error) {
        console.error('❌ Error al cargar el carrito:', error);
        cartItems = [];
    }
}

// Mostrar resumen de productos en el sidebar
function displayOrderSummary() {
    const productosResumen = document.getElementById('productosResumen');
    
    if (!productosResumen) {
        console.error('Elemento productosResumen no encontrado');
        return;
    }
    
    if (cartItems.length === 0) {
        productosResumen.innerHTML = '<p style="text-align: center; color: #666;">No hay productos en el carrito</p>';
        return;
    }
    
    const productosHTML = cartItems.map(item => `
        <div class="producto-item">
            <div class="producto-info">
                <div class="producto-nombre">${item.name}</div>
                <div class="producto-details">Cantidad: ${item.quantity}</div>
            </div>
            <div class="producto-precio">$${item.price * item.quantity}</div>
        </div>
    `).join('');
    
    productosResumen.innerHTML = productosHTML;
}

// Calcular totales
function calculateTotals() {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const envio = subtotal > 500 ? 0 : envioCost; // Envío gratis en compras mayores a $500
    const total = subtotal + envio;
    
    // Actualizar elementos en el DOM
    document.getElementById('subtotal').textContent = `$${subtotal}`;
    document.getElementById('envio').textContent = envio === 0 ? 'Gratis' : `$${envio}`;
    document.getElementById('total').textContent = `$${total}`;
    
    // Actualizar variable global
    cartTotal = total;
    
    console.log('Totales calculados:', { subtotal, envio, total });
}

// Configurar validación del formulario
function setupFormValidation() {
    const form = document.getElementById('checkoutForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

// Validar campo individual
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearError(event);
    
    let isValid = true;
    let errorMessage = '';
    
    // Validaciones específicas por campo
    switch (fieldName) {
        case 'nombre':
        case 'apellido':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Debe tener al menos 2 caracteres';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un email válido';
            }
            break;
            
        case 'telefono':
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un teléfono válido';
            }
            break;
            
        case 'direccion':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'La dirección debe ser más específica';
            }
            break;
            
        case 'ciudad':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Ingresa una ciudad válida';
            }
            break;
            
        case 'codigoPostal':
            const cpRegex = /^\d{5}$/;
            if (!cpRegex.test(value)) {
                isValid = false;
                errorMessage = 'Código postal debe tener 5 dígitos';
            }
            break;
            
        case 'metodoPago':
            if (!value) {
                isValid = false;
                errorMessage = 'Selecciona un método de pago';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Mostrar error en campo
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remover error anterior si existe
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Crear mensaje de error
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

// Limpiar error del campo
function clearError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Configurar envío del formulario
function setupFormSubmission() {
    const form = document.getElementById('checkoutForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        processPayment();
    });
}

// Procesar pago
function processPayment() {
    console.log('🔄 Iniciando procesamiento de pago...');
    
    // Validar formulario completo
    if (!validateForm()) {
        console.log('❌ Formulario inválido - deteniendo proceso');
        return;
    }
    console.log('✅ Formulario válido');
    
    // Verificar que hay productos en el carrito
    if (cartItems.length === 0) {
        console.log('❌ No hay productos en el carrito');
        alert('No hay productos en el carrito');
        return;
    }
    console.log('✅ Productos en carrito:', cartItems.length);
    
    // Mostrar estado de carga
    const submitButton = document.querySelector('.btn-primary');
    submitButton.classList.add('loading');
    submitButton.textContent = 'Procesando...';
    
    console.log('⏳ Esperando 2 segundos antes de procesar...');
    // Simular procesamiento (en una app real, aquí se enviaría a un servidor)
    setTimeout(() => {
        console.log('🚀 Ejecutando processPaymentSuccess...');
        processPaymentSuccess();
    }, 2000);
}

// Validar formulario completo
function validateForm() {
    const form = document.getElementById('checkoutForm');
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Procesar pago exitoso
function processPaymentSuccess() {
    console.log('🎉 Pago procesado exitosamente');
    
    // Obtener datos del formulario
    console.log('📋 Obteniendo datos del formulario...');
    const formData = getFormData();
    console.log('✅ Datos del formulario obtenidos:', formData);
    
    // Crear resumen del pedido
    console.log('📊 Creando resumen del pedido...');
    const orderSummary = createOrderSummary(formData);
    console.log('✅ Resumen del pedido creado:', orderSummary);
    
    // Enviar datos a Google Sheets
    console.log('📤 Enviando datos a Google Sheets...');
    sendToGoogleSheets(orderSummary);
    
    // Mostrar modal de confirmación
    console.log('🎭 Mostrando modal de confirmación...');
    showSuccessModal(orderSummary);
    
    // Limpiar carrito
    console.log('🧹 Limpiando carrito...');
    clearCart();
    
    // Restaurar botón
    const submitButton = document.querySelector('.btn-primary');
    submitButton.classList.remove('loading');
    submitButton.textContent = 'Procesar Pago';
    
    // Redirigir automáticamente al catálogo después de 3 segundos
    setTimeout(() => {
        console.log('🔄 Redirigiendo al catálogo...');
        window.location.href = 'documents/catalogo.html';
    }, 3000);
}

// Obtener datos del formulario
function getFormData() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);
    
    return {
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        direccion: formData.get('direccion'),
        ciudad: formData.get('ciudad'),
        codigoPostal: formData.get('codigoPostal'),
        metodoPago: formData.get('metodoPago'),
        comentarios: formData.get('comentarios')
    };
}

// Crear resumen del pedido
function createOrderSummary(formData) {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const envio = subtotal > 500 ? 0 : envioCost;
    const total = subtotal + envio;
    
    return {
        cliente: {
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            telefono: formData.telefono,
            direccion: formData.direccion,
            ciudad: formData.ciudad,
            codigoPostal: formData.codigoPostal
        },
        pago: {
            metodo: formData.metodoPago,
            comentarios: formData.comentarios
        },
        productos: cartItems,
        totales: {
            subtotal: subtotal,
            envio: envio,
            total: total
        },
        fecha: new Date().toLocaleString('es-MX'),
        numeroPedido: generateOrderNumber()
    };
}

// Enviar datos a Google Sheets con la estructura exacta requerida
function sendToGoogleSheets(orderSummary) {
    console.log('🔗 Iniciando envío a Google Sheets...');
    console.log('📦 Datos a enviar:', orderSummary);
    
    // URL del webhook de Google Apps Script
    // IMPORTANTE: Reemplaza esta URL con la URL real de tu webhook de Google Apps Script
    const webhookUrl = 'https://script.google.com/macros/s/AKfycbyW_ZpYp4nlZa0-Dy3KSEkrp5t8Jsu1x16fQoH_7ImP6a7kE0JYJeyOuBujVxfjx7q9/exec';
    console.log('🌐 URL del webhook:', webhookUrl);
    
    // Estructura exacta según las instrucciones de Google Sheets
    const dataToSend = {
        // 1. Fecha y Hora - Timestamp del pedido
        fechaHora: new Date().toISOString(),
        
        // 2. Nombre - Nombre del cliente
        nombre: orderSummary.cliente.nombre,
        
        // 3. Apellido - Apellido del cliente
        apellido: orderSummary.cliente.apellido,
        
        // 4. Email - Correo electrónico
        email: orderSummary.cliente.email,
        
        // 5. Teléfono - Número de teléfono
        telefono: orderSummary.cliente.telefono,
        
        // 6. Dirección - Dirección de envío
        direccion: orderSummary.cliente.direccion,
        
        // 7. Ciudad - Ciudad del cliente
        ciudad: orderSummary.cliente.ciudad,
        
        // 8. Código Postal - CP del cliente
        codigoPostal: orderSummary.cliente.codigoPostal,
        
        // 9. Método de Pago - WhatsApp, Transferencia, Efectivo
        metodoPago: orderSummary.pago.metodo,
        
        // 10. Comentarios - Comentarios adicionales
        comentarios: orderSummary.pago.comentarios || '',
        
        // 11. Productos - Lista de productos en JSON
        productos: JSON.stringify(orderSummary.productos),
        
        // 12. Total - Monto total del pedido
        total: orderSummary.totales.total
    };
    
    console.log('📤 Enviando datos a Google Sheets:', dataToSend);
    console.log('🚀 Realizando petición fetch...');
    
    // Enviar datos al webhook - usar no-cors directamente para evitar problemas CORS
    fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Usar no-cors para evitar problemas de CORS
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
    })
    .then(() => {
        console.log('✅ Datos enviados a Google Sheets (modo no-cors)');
        console.log('ℹ️ Nota: Con modo no-cors no podemos verificar si se procesaron correctamente');
        console.log('📋 Verifica en tu Google Sheets si aparecen los datos');
    })
    .catch((error) => {
        console.error('❌ Error al enviar datos a Google Sheets:', error);
        console.log('🔧 Posibles soluciones:');
        console.log('1. Verificar que el Google Apps Script esté desplegado correctamente');
        console.log('2. Verificar permisos de acceso (debe ser "Cualquier usuario")');
        console.log('3. Verificar que la URL del webhook sea correcta');
    });
}

// Generar número de pedido
function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `VZ-${timestamp}-${random}`;
}

// Mostrar modal de éxito
function showSuccessModal(orderSummary) {
    const modal = document.getElementById('confirmModal');
    const orderDetails = document.getElementById('orderDetails');
    
    // Crear HTML del resumen del pedido
    const orderHTML = `
        <div class="order-info">
            <h4>Número de Pedido: ${orderSummary.numeroPedido}</h4>
            <p><strong>Cliente:</strong> ${orderSummary.cliente.nombre} ${orderSummary.cliente.apellido}</p>
            <p><strong>Email:</strong> ${orderSummary.cliente.email}</p>
            <p><strong>Teléfono:</strong> ${orderSummary.cliente.telefono}</p>
            <p><strong>Dirección:</strong> ${orderSummary.cliente.direccion}, ${orderSummary.cliente.ciudad} ${orderSummary.cliente.codigoPostal}</p>
            <p><strong>Método de Pago:</strong> ${orderSummary.pago.metodo}</p>
            <p><strong>Total:</strong> $${orderSummary.totales.total}</p>
            <p><strong>Fecha:</strong> ${orderSummary.fecha}</p>
            <div class="redirect-notice">
                <p><strong>🔄 Serás redirigido automáticamente al catálogo en 3 segundos...</strong></p>
            </div>
        </div>
    `;
    
    orderDetails.innerHTML = orderHTML;
    modal.style.display = 'block';
    
    // Guardar pedido en localStorage para historial
    saveOrderToHistory(orderSummary);
}

// Guardar pedido en historial
function saveOrderToHistory(orderSummary) {
    try {
        const orders = JSON.parse(localStorage.getItem('venturazone_orders') || '[]');
        orders.push(orderSummary);
        localStorage.setItem('venturazone_orders', JSON.stringify(orders));
        console.log('Pedido guardado en historial');
    } catch (error) {
        console.error('Error al guardar pedido:', error);
    }
}

// Limpiar carrito
function clearCart() {
    cartItems = [];
    cartTotal = 0;
    localStorage.removeItem('venturazone_cart');
    console.log('Carrito limpiado');
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'none';
    
    // Redirigir al catálogo
    window.location.href = 'documents/catalogo.html';
}

// Cargar datos del carrito (función auxiliar)
function loadCartData() {
    // Esta función se ejecuta al cargar la página
    // para asegurar que los datos del carrito estén disponibles
    console.log('Datos del carrito cargados');
}

// Función de prueba para verificar la conexión con Google Sheets
function testGoogleSheetsConnection() {
    console.log('🧪 Iniciando prueba de conexión con Google Sheets...');
    
    const testData = {
        fechaHora: new Date().toISOString(),
        nombre: 'Prueba',
        apellido: 'Test',
        email: 'test@example.com',
        telefono: '1234567890',
        direccion: 'Dirección de prueba',
        ciudad: 'Ciudad de prueba',
        codigoPostal: '12345',
        metodoPago: 'WhatsApp',
        comentarios: 'Esta es una prueba de conexión',
        productos: JSON.stringify([{name: 'Producto de prueba', price: 100, quantity: 1}]),
        total: 100
    };
    
    const webhookUrl = 'https://script.google.com/macros/s/AKfycbyW_ZpYp4nlZa0-Dy3KSEkrp5t8Jsu1x16fQoH_7ImP6a7kE0JYJeyOuBujVxfjx7q9/exec';
    
    console.log('📤 Enviando datos de prueba:', testData);
    console.log('🌐 URL del webhook:', webhookUrl);
    
    fetch(webhookUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
    })
    .then(response => {
        console.log('📡 Respuesta recibida:', response);
        if (response.ok) {
            console.log('✅ Prueba exitosa - datos enviados correctamente');
            return response.text();
        } else {
            console.log('❌ Error HTTP:', response.status, response.statusText);
            throw new Error(`Error HTTP: ${response.status}`);
        }
    })
    .then(data => {
        console.log('📄 Respuesta del servidor:', data);
    })
    .catch((error) => {
        console.error('❌ Error en la prueba:', error);
        // Intentar con no-cors como fallback
        console.log('🔄 Intentando con modo no-cors...');
        fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        }).then(() => {
            console.log('✅ Prueba exitosa con modo no-cors');
        }).catch(err => {
            console.error('❌ Error también con no-cors:', err);
        });
    });
}

// Exportar funciones para uso global
window.closeModal = closeModal;
window.testGoogleSheetsConnection = testGoogleSheetsConnection;