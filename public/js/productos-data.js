// Base de datos de productos Hinode México
const productosData = {
  perfumes: [
    {
      id: 'perfume-001',
      nombre: 'Empire Woman',
      categoria: 'Perfume',
      precio: 450,
      imagen: '/images/EMPIREWOMAN.jpg',
      descripcion: 'Fragancia femenina elegante y sofisticada con notas florales y frutales.',
      beneficios: [
        'Duración de hasta 8 horas',
        'Notas de rosa y jazmín',
        'Ideal para ocasiones especiales',
        'Presentación de 50ml'
      ],
      ingredientes: 'Alcohol, Agua, Fragancia, Conservadores',
      uso: 'Aplicar en puntos de pulso: muñecas, cuello y detrás de las orejas.',
      stock: 15,
      rating: 4.8,
      reviews: 127
    },
    {
      id: 'perfume-002',
      nombre: 'Empire Man',
      categoria: 'Perfume',
      precio: 450,
      imagen: '/images/EMPIREHOMBRE.jpg',
      descripcion: 'Fragancia masculina intensa y seductora con notas amaderadas.',
      beneficios: [
        'Duración de hasta 10 horas',
        'Notas de sándalo y pachulí',
        'Ideal para el día a día',
        'Presentación de 50ml'
      ],
      ingredientes: 'Alcohol, Agua, Fragancia, Conservadores',
      uso: 'Aplicar en puntos de pulso: muñecas, cuello y pecho.',
      stock: 12,
      rating: 4.7,
      reviews: 89
    },
    {
      id: 'perfume-003',
      nombre: 'Empire Sport',
      categoria: 'Perfume',
      precio: 380,
      imagen: '/images/EMPIRESPORT.jpg',
      descripcion: 'Fragancia fresca y energética perfecta para el deporte.',
      beneficios: [
        'Duración de hasta 6 horas',
        'Notas cítricas y acuáticas',
        'Resistente al sudor',
        'Presentación de 50ml'
      ],
      ingredientes: 'Alcohol, Agua, Fragancia, Conservadores',
      uso: 'Aplicar antes del ejercicio en todo el cuerpo.',
      stock: 20,
      rating: 4.6,
      reviews: 156
    }
  ],
  
  cuidadoCorporal: [
    {
      id: 'corporal-001',
      nombre: 'Gel Corps',
      categoria: 'Cuidado Corporal',
      precio: 280,
      imagen: '/images/gelcorps.jpg',
      descripcion: 'Gel hidratante corporal con extractos naturales para una piel suave y radiante.',
      beneficios: [
        'Hidratación profunda por 24 horas',
        'Extractos de aloe vera',
        'Absorción rápida',
        'Apto para todo tipo de piel'
      ],
      ingredientes: 'Aloe Vera, Glicerina, Vitamina E, Extractos Naturales',
      uso: 'Aplicar después del baño en todo el cuerpo con movimientos circulares.',
      stock: 25,
      rating: 4.9,
      reviews: 203
    },
    {
      id: 'corporal-002',
      nombre: 'Base Líquida',
      categoria: 'Cuidado Corporal',
      precio: 320,
      imagen: '/images/baseliquida.jpg',
      descripcion: 'Base líquida hidratante con protección solar para el cuidado diario.',
      beneficios: [
        'Protección solar FPS 30',
        'Hidratación intensiva',
        'Textura ligera',
        'No comedogénico'
      ],
      ingredientes: 'Óxido de Zinc, Glicerina, Vitamina C, Filtros Solares',
      uso: 'Aplicar 30 minutos antes de la exposición solar. Reaplicar cada 2 horas.',
      stock: 18,
      rating: 4.8,
      reviews: 167
    }
  ],
  
  cuidadoFacial: [
    {
      id: 'facial-001',
      nombre: 'Routine Dermo - Limpiador',
      categoria: 'Cuidado Facial',
      precio: 380,
      imagen: '/images/CUIDADOFACIAL.jpg',
      descripcion: 'Limpiador facial suave que remueve impurezas sin resecar la piel.',
      beneficios: [
        'Limpieza profunda',
        'pH balanceado',
        'Sin sulfatos',
        'Para todo tipo de piel'
      ],
      ingredientes: 'Ácido Hialurónico, Niacinamida, Extracto de Té Verde',
      uso: 'Aplicar sobre la piel húmeda, masajear suavemente y enjuagar.',
      stock: 22,
      rating: 4.9,
      reviews: 189
    }
  ],
  
  cuidadoCapilar: [
    {
      id: 'capilar-001',
      nombre: 'H-Expert Shampoo',
      categoria: 'Cuidado Capilar',
      precio: 350,
      imagen: '/images/CUIDADOSCAPILAR.jpg',
      descripcion: 'Shampoo fortificante que fortalece el cabello desde la raíz.',
      beneficios: [
        'Fortalece el cabello',
        'Reduce la caída',
        'Aumenta el volumen',
        'Para cabello débil y quebradizo'
      ],
      ingredientes: 'Keratinas, Biotina, Extracto de Romero, Vitamina B5',
      uso: 'Aplicar sobre el cabello mojado, masajear el cuero cabelludo y enjuagar.',
      stock: 30,
      rating: 4.8,
      reviews: 234
    }
  ],
  
  maquillaje: [
    {
      id: 'maquillaje-001',
      nombre: 'Dazzle Labial',
      categoria: 'Maquillaje',
      precio: 180,
      imagen: '/images/labial.jpg',
      descripcion: 'Labial de larga duración con acabado mate y colores vibrantes.',
      beneficios: [
        'Duración de hasta 8 horas',
        'Acabado mate',
        'Colores vibrantes',
        'Fácil aplicación'
      ],
      ingredientes: 'Cera de Abeja, Aceite de Coco, Pigmentos Naturales',
      uso: 'Aplicar directamente sobre los labios. Para mayor duración, usar base primero.',
      stock: 45,
      rating: 4.7,
      reviews: 145
    },
    {
      id: 'maquillaje-002',
      nombre: 'Dazzle Lápiz de Ojos',
      categoria: 'Maquillaje',
      precio: 120,
      imagen: '/images/lapizdeojos.jpg',
      descripcion: 'Lápiz de ojos cremoso y de larga duración para definir la mirada.',
      beneficios: [
        'Textura cremosa',
        'Fácil difuminado',
        'Larga duración',
        'Colores intensos'
      ],
      ingredientes: 'Cera de Carnauba, Aceite de Jojoba, Pigmentos',
      uso: 'Aplicar en la línea de las pestañas. Para difuminar, usar el difuminador incluido.',
      stock: 38,
      rating: 4.6,
      reviews: 98
    }
  ],
  
  bienestar: [
    {
      id: 'bienestar-001',
      nombre: 'HIBER Shake Chocolate',
      categoria: 'Bienestar',
      precio: 420,
      imagen: '/images/Shakechocolate.jpg',
      descripcion: 'Suplemento nutricional en polvo sabor chocolate para el bienestar integral.',
      beneficios: [
        'Proteína de alta calidad',
        'Vitaminas y minerales',
        'Sabor delicioso',
        'Fácil preparación'
      ],
      ingredientes: 'Proteína de Suero, Vitaminas A, C, E, Minerales, Fibra',
      uso: 'Mezclar 2 cucharadas con 250ml de agua o leche. Tomar 1-2 veces al día.',
      stock: 28,
      rating: 4.9,
      reviews: 312
    },
    {
      id: 'bienestar-002',
      nombre: 'HIBER Shake Fresa',
      categoria: 'Bienestar',
      precio: 420,
      imagen: '/images/shakefresa.jpg',
      descripcion: 'Suplemento nutricional en polvo sabor fresa para el bienestar integral.',
      beneficios: [
        'Proteína de alta calidad',
        'Vitaminas y minerales',
        'Sabor natural a fresa',
        'Sin azúcares añadidos'
      ],
      ingredientes: 'Proteína de Suero, Vitaminas A, C, E, Minerales, Fibra',
      uso: 'Mezclar 2 cucharadas con 250ml de agua o leche. Tomar 1-2 veces al día.',
      stock: 25,
      rating: 4.8,
      reviews: 267
    }
  ]
};

// Función para obtener todos los productos
function getAllProducts() {
  const allProducts = [];
  Object.values(productosData).forEach(categoria => {
    allProducts.push(...categoria);
  });
  return allProducts;
}

// Función para obtener productos por categoría
function getProductsByCategory(categoria) {
  return productosData[categoria] || [];
}

// Función para obtener un producto por ID
function getProductById(id) {
  const allProducts = getAllProducts();
  return allProducts.find(producto => producto.id === id);
}

// Función para buscar productos
function searchProducts(query) {
  const allProducts = getAllProducts();
  const searchTerm = query.toLowerCase();
  
  return allProducts.filter(producto => 
    producto.nombre.toLowerCase().includes(searchTerm) ||
    producto.descripcion.toLowerCase().includes(searchTerm) ||
    producto.categoria.toLowerCase().includes(searchTerm)
  );
}

// Exportar funciones para uso global
window.productosData = productosData;
window.getAllProducts = getAllProducts;
window.getProductsByCategory = getProductsByCategory;
window.getProductById = getProductById;
window.searchProducts = searchProducts;


