// JavaScript optimizado para Catálogo Venture Zone
// Optimizado para rendimiento y velocidad de carga

// Variables globales optimizadas
let cartItems = [];
let cartCount = 0;

// Cache de elementos DOM para mejor rendimiento
const domCache = {
    searchModal: null,
    searchModalInput: null,
    searchModalResults: null,
    productsCarousel: null,
    cartBtn: null
};

// Inicialización optimizada
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Función de inicialización principal
function initializeApp() {
    // Cache de elementos críticos
    cacheDOMElements();
    
    // Inicializar funcionalidades
    initializeSearch();
    initializeCarousel();
    initializeCart();
    initializeVideo();
    
    // Cargar datos del carrito
    loadCartFromStorage();
    syncCartWithOtherPages();
    
    // Optimización: Lazy load de recursos no críticos
    requestIdleCallback(() => {
        preloadNonCriticalResources();
    });
}

// Cache de elementos DOM para mejor rendimiento
function cacheDOMElements() {
    domCache.searchModal = document.getElementById('searchModal');
    domCache.searchModalInput = document.getElementById('searchModalInput');
    domCache.searchModalResults = document.getElementById('searchModalResults');
    domCache.productsCarousel = document.getElementById('productsCarousel');
    domCache.cartBtn = document.querySelector('.cart-btn');
}

// Inicialización del sistema de búsqueda optimizado
function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchModalClose = document.getElementById('searchModalClose');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', openSearchModal);
    }
    
    if (searchModalClose) {
        searchModalClose.addEventListener('click', closeSearchModal);
    }
    
    if (domCache.searchModal) {
        domCache.searchModal.addEventListener('click', (e) => {
            if (e.target === domCache.searchModal) {
                closeSearchModal();
            }
        });
    }
    
    // Búsqueda optimizada con debounce
    if (domCache.searchModalInput) {
        let searchTimeout;
        domCache.searchModalInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300); // Debounce de 300ms
        });
    }
}

// Modal de búsqueda optimizado
function openSearchModal() {
    if (domCache.searchModal) {
        domCache.searchModal.style.display = 'block';
        // Optimización: Focus después de la animación
        requestAnimationFrame(() => {
            if (domCache.searchModalInput) {
                domCache.searchModalInput.focus();
            }
        });
    }
}

function closeSearchModal() {
    if (domCache.searchModal) {
        domCache.searchModal.style.display = 'none';
        if (domCache.searchModalInput) {
            domCache.searchModalInput.value = '';
        }
        if (domCache.searchModalResults) {
            domCache.searchModalResults.innerHTML = '';
        }
    }
}

// Búsqueda optimizada con índice
const searchIndex = new Map();

function buildSearchIndex() {
    const products = document.querySelectorAll('.product-card');
    products.forEach((product, index) => {
        const name = product.querySelector('.product-name')?.textContent?.toLowerCase() || '';
        const description = product.querySelector('.product-description')?.textContent?.toLowerCase() || '';
        const searchText = `${name} ${description}`;
        
        searchIndex.set(index, searchText);
    });
}

function performSearch(query) {
    if (!query.trim()) {
        if (domCache.searchModalResults) {
            domCache.searchModalResults.innerHTML = '';
        }
        return;
    }
    
    const results = [];
    const searchQuery = query.toLowerCase();
    
    searchIndex.forEach((searchText, index) => {
        if (searchText.includes(searchQuery)) {
            const product = document.querySelectorAll('.product-card')[index];
            if (product) {
                const name = product.querySelector('.product-name')?.textContent || '';
                const description = product.querySelector('.product-description')?.textContent || '';
                const price = product.querySelector('.product-price')?.textContent || '';
                
                results.push({
                    name,
                    description,
                    price,
                    element: product
                });
            }
        }
    });
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    if (!domCache.searchModalResults) return;
    
    if (results.length === 0) {
        domCache.searchModalResults.innerHTML = '<p style="text-align: center; color: #666;">No se encontraron productos</p>';
        return;
    }
    
    const resultsHTML = results.map(result => `
        <div class="search-result-item" style="padding: 15px; border-bottom: 1px solid #eee; cursor: pointer; transition: background 0.3s ease;" 
             onmouseover="this.style.background='#f8f9fa'" 
             onmouseout="this.style.background='white'"
             onclick="scrollToProduct(this)">
            <h4 style="margin: 0 0 5px 0; color: #333;">${result.name}</h4>
            <p style="margin: 0 0 5px 0; color: #666; font-size: 0.9rem;">${result.description}</p>
            <span style="color: #00b894; font-weight: bold;">${result.price}</span>
        </div>
    `).join('');
    
    domCache.searchModalResults.innerHTML = resultsHTML;
}

function scrollToProduct(element) {
    const productName = element.querySelector('h4').textContent;
    const productCards = document.querySelectorAll('.product-card');
    
    for (let card of productCards) {
        const cardName = card.querySelector('.product-name')?.textContent;
        if (cardName === productName) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Efecto visual
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 300);
            break;
        }
    }
    
    closeSearchModal();
}

// Carrusel optimizado
function initializeCarousel() {
    if (!domCache.productsCarousel) return;
    
    // Construir índice de búsqueda
    buildSearchIndex();
    
    // Optimización: Intersection Observer para lazy loading
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (img && !img.dataset.loaded) {
                    img.dataset.loaded = 'true';
                    // Optimización: Preload de imagen
                    const newImg = new Image();
                    newImg.onload = () => {
                        img.src = newImg.src;
                    };
                    newImg.src = img.src;
                }
            }
        });
    }, observerOptions);
    
    // Observar todas las tarjetas de productos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        observer.observe(card);
    });
}

function scrollCarousel(direction) {
    if (!domCache.productsCarousel) return;
    
    const scrollAmount = 300;
    const currentScroll = domCache.productsCarousel.scrollLeft;
    const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
    
    // Optimización: Smooth scroll con requestAnimationFrame
    smoothScrollTo(domCache.productsCarousel, targetScroll, 300);
}

function smoothScrollTo(element, target, duration) {
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();
    
    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function para suavidad
        const easeInOutQuad = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        element.scrollLeft = start + change * easeInOutQuad;
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }
    
    requestAnimationFrame(animateScroll);
}

// Sistema de carrito optimizado
function initializeCart() {
    if (domCache.cartBtn) {
        domCache.cartBtn.addEventListener('click', openCart);
    }
}

function increaseQuantity(productId) {
    const quantityDisplay = document.getElementById(`quantity${productId.replace('product', '')}`);
    if (quantityDisplay) {
        const currentQuantity = parseInt(quantityDisplay.textContent);
        quantityDisplay.textContent = currentQuantity + 1;
    }
}

function decreaseQuantity(productId) {
    const quantityDisplay = document.getElementById(`quantity${productId.replace('product', '')}`);
    if (quantityDisplay) {
        const currentQuantity = parseInt(quantityDisplay.textContent);
        if (currentQuantity > 1) {
            quantityDisplay.textContent = currentQuantity - 1;
        }
    }
}

function getQuantity(productId) {
    const quantityDisplay = document.getElementById(`quantity${productId.replace('product', '')}`);
    return quantityDisplay ? parseInt(quantityDisplay.textContent) : 1;
}

function addToCart(productName, price, productId) {
    const quantity = getQuantity(productId);
    const existingItem = cartItems.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({
            name: productName,
            price: price,
            quantity: quantity
        });
    }
    
    cartCount += quantity;
    updateCartDisplay();
    saveCartToStorage();
    
    // Optimización: Feedback visual
    showAddToCartFeedback(productName);
}

function showAddToCartFeedback(productName) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00b894, #00a085);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = `✓ ${productName} agregado al carrito`;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function updateCartDisplay() {
    if (domCache.cartBtn) {
        const cartCountElement = domCache.cartBtn.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    }
}

function openCart() {
    // Cerrar modal existente si existe
    closeCartModal();
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #333;">Carrito de Compras</h3>
            <button onclick="closeCartModal()" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">✕</button>
        </div>
        <div id="cartItems" style="margin-bottom: 20px;">
            ${generateCartItemsHTML()}
        </div>
        <div style="border-top: 2px solid #eee; padding-top: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <strong style="font-size: 1.2rem;">Total: $${calculateTotal()}</strong>
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="clearCart()" style="flex: 1; background: #dc3545; color: white; border: none; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: bold;">Limpiar Carrito</button>
                <button onclick="proceedToCheckout()" style="flex: 1; background: linear-gradient(135deg, #00b894, #00a085); color: white; border: none; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: bold;">Proceder al Pago</button>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animar entrada
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    });
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCartModal();
        }
    });
}

function generateCartItemsHTML() {
    if (cartItems.length === 0) {
        return '<p style="text-align: center; color: #666;">Tu carrito está vacío</p>';
    }
    
    return cartItems.map((item, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border: 1px solid #eee; border-radius: 10px; margin-bottom: 10px;">
            <div>
                <h4 style="margin: 0 0 5px 0; color: #333;">${item.name}</h4>
                <p style="margin: 0; color: #666;">Cantidad: ${item.quantity} | Precio: $${item.price}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-weight: bold; color: #00b894;">$${item.price * item.quantity}</span>
                <button onclick="removeFromCart(${index})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">✕</button>
            </div>
        </div>
    `).join('');
}

function calculateTotal() {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function closeCartModal() {
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
}

function removeFromCart(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        cartCount--;
    } else {
        cartItems.splice(index, 1);
        cartCount--;
    }
    updateCartDisplay();
    saveCartToStorage();
    openCart();
}

function clearCart() {
    cartItems = [];
    cartCount = 0;
    updateCartDisplay();
    saveCartToStorage();
}

function proceedToCheckout() {
    if (cartItems.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Guardar datos del carrito antes de redirigir
    saveCartToStorage();
    
    closeCartModal();
    
    // Redirigir a la página de pago con la ruta absoluta
    window.location.href = 'file:///C:/Users/Noel%20Pacheco/Desktop/Proyectos%20Cursor/Proyectos/Pagina%20Web%20Venturazone/Webventurazone/public/pago.html';
}

// Almacenamiento optimizado
function saveCartToStorage() {
    try {
        localStorage.setItem('venturazone_cart', JSON.stringify({
            items: cartItems,
            count: cartCount
        }));
    } catch (error) {
        console.warn('No se pudo guardar el carrito en localStorage:', error);
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('venturazone_cart');
        if (savedCart) {
            const cartData = JSON.parse(savedCart);
            cartItems = cartData.items || [];
            cartCount = cartData.count || 0;
            updateCartDisplay();
        }
    } catch (error) {
        console.warn('No se pudo cargar el carrito desde localStorage:', error);
    }
}

function syncCartWithOtherPages() {
    // Sincronización con otras páginas
    window.addEventListener('storage', (e) => {
        if (e.key === 'venturazone_cart') {
            loadCartFromStorage();
        }
    });
}

// Video optimizado
function initializeVideo() {
    const video = document.getElementById('xexpertVideo');
    const playButton = document.getElementById('playButton');
    const videoOverlay = document.getElementById('videoOverlay');
    
    if (!video || !playButton || !videoOverlay) return;
    
    // Optimización: Lazy load del video
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cargar video solo cuando sea visible
                if (video.dataset.src && !video.src) {
                    video.src = video.dataset.src;
                    video.load();
                }
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(video);
    
    // Control de reproducción
    playButton.addEventListener('click', () => {
        video.play();
        videoOverlay.style.display = 'none';
    });
    
    video.addEventListener('pause', () => {
        videoOverlay.style.display = 'flex';
    });
    
    video.addEventListener('ended', () => {
        videoOverlay.style.display = 'flex';
    });
}

// Función para abrir catálogo PDF
function openCatalogPDF() {
    window.open('catalogohnd.pdf', '_blank');
}

// Debug de video
function debugVideo() {
    const video = document.getElementById('xexpertVideo');
    console.log('Video debug info:', {
        src: video.src,
        readyState: video.readyState,
        networkState: video.networkState,
        error: video.error
    });
}

// Preload de recursos no críticos
function preloadNonCriticalResources() {
    // Preload de imágenes de productos
    const productImages = document.querySelectorAll('.product-image img');
    productImages.forEach((img, index) => {
        if (index < 3) { // Solo las primeras 3 imágenes
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        }
    });
}

// Polyfill para requestIdleCallback
if (!window.requestIdleCallback) {
    window.requestIdleCallback = function(callback) {
        return setTimeout(callback, 1);
    };
}

// Exportar funciones globalmente
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.getQuantity = getQuantity;
window.addToCart = addToCart;
window.openCart = openCart;
window.closeCartModal = closeCartModal;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.proceedToCheckout = proceedToCheckout;
window.openCatalogPDF = openCatalogPDF;
window.debugVideo = debugVideo;
window.scrollCarousel = scrollCarousel;
window.scrollToProduct = scrollToProduct;
