import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INGREDIENT_PROFILES } from './suplementos-ingredient-profiles.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'suplementos-main.html');

const categoryLabels = {
  shakes: 'Shakes Nutricionales',
  proteinas: 'Proteínas',
  vitaminas: 'Vitaminas',
  minerales: 'Minerales',
  energia: 'Energía',
  inmunidad: 'Inmunidad',
  'bienestar-masculino': 'Bienestar Masculino',
  'bienestar-femenino': 'Bienestar Femenino',
  herbales: 'Herbales',
  digestion: 'Digestión',
};

const goalLabels = {
  energia: 'Energía y vitalidad',
  inmunidad: 'Apoyar bienestar diario',
  musculo: 'Ganar masa muscular',
  nutricion: 'Nutrición completa',
  peso: 'Control de peso',
  rendimiento: 'Rendimiento deportivo',
  recuperacion: 'Recuperación muscular',
  digestion: 'Salud digestiva',
  estres: 'Reducir estrés',
  sueno: 'Mejorar el sueño',
  concentracion: 'Mejorar concentración',
  'bienestar-masculino': 'Bienestar masculino',
  proteccion: 'Bienestar diario',
  vitalidad: 'Vitalidad general',
  habitos: 'Hábitos saludables',
};

const formatLabels = {
  capsulas: 'Cápsulas',
  polvo: 'Polvo',
  liquido: 'Líquido',
  gomitas: 'Gomitas',
};

const certificationLabels = {
  organico: 'Orgánico',
  'sin-gluten': 'Sin gluten',
  vegano: 'Vegano',
  gmp: 'Certificación GMP',
  'sin-lacteos': 'Sin lácteos',
  'sin-gmo': 'Sin OGM',
};

const genderLabels = {
  masculino: 'Hombre',
  femenino: 'Mujer',
  unisex: 'Unisex',
  ninos: 'Niños',
};

const MAX_PRODUCT_BADGES = 3;

const PRODUCT_BADGE_DEFS = {
  nuevo: {
    label: 'Nuevo',
    tooltip: 'Producto recién incorporado a nuestro catálogo.',
    priority: 1,
  },
  'best-seller': {
    label: 'Best Seller',
    tooltip: 'Uno de los suplementos más vendidos por nuestros clientes.',
    priority: 2,
  },
  oferta: {
    label: 'Oferta',
    tooltip: 'Precio especial por tiempo limitado.',
    priority: 3,
  },
  organico: {
    label: 'Orgánico',
    tooltip: 'Certificado con ingredientes de origen orgánico.',
    priority: 4,
  },
  vegano: {
    label: 'Vegano',
    tooltip: 'Fórmula sin ingredientes de origen animal.',
    priority: 5,
  },
  'sin-gluten': {
    label: 'Sin Gluten',
    tooltip: 'Libre de gluten. Apto para personas con sensibilidad al gluten.',
    priority: 6,
  },
  'sin-azucar': {
    label: 'Sin Azúcar',
    tooltip: 'Sin azúcar añadida en su formulación.',
    priority: 7,
  },
  recomendado: {
    label: 'Recomendado',
    tooltip: 'Seleccionado por nuestro equipo de asesoría en bienestar.',
    priority: 8,
  },
  'edicion-limitada': {
    label: 'Edición Limitada',
    tooltip: 'Stock limitado. Disponibilidad sujeta a inventario.',
    priority: 9,
  },
};

const SUPLEMENTOS = [
  {
    id: 'product1',
    num: 1,
    name: 'Hiber Hake',
    flavor: 'Sabor Chocolate',
    cartName: 'Hiber Hake — Chocolate',
    tagline: 'Nutrición completa con el sabor que más te gusta',
    desc: 'Hiber Hake Sabor Chocolate combina proteínas de alta calidad, vitaminas y minerales en un delicioso shake que transforma tu rutina diaria. Ideal para quienes buscan energía sostenida, control de peso y una nutrición balanceada sin renunciar al placer del chocolate. Preparación rápida, saciante y perfecta para el desayuno o después del entrenamiento.',
    price: 500,
    img: 'shakechocolate.png',
    categories: ['shakes', 'proteinas', 'energia'],
    goals: ['energia', 'nutricion', 'peso', 'rendimiento', 'musculo'],
    category: 'shakes',
    goal: 'energia',
    format: 'polvo',
    brand: 'Hinode',
    gender: 'unisex',
    certifications: ['gmp', 'sin-gluten'],
    rating: 5,
    reviews: 52,
    featured: true,
    badges: ['best-seller', 'sin-gluten', 'recomendado'],
    benefits: ['Proteína de alta calidad', 'Energía sostenida', 'Saciedad prolongada', 'Rico en vitaminas', 'Sabor chocolate premium'],
    ingredients: 'Proteína de suero, vitaminas del complejo B, calcio, hierro, fibra dietética, cacao natural, edulcorantes naturales.',
    usage: 'Mezcla 2 cucharadas (33 g) en 250 ml de leche o agua. Toma 1 porción al día, preferentemente en el desayuno o post-entrenamiento.',
    quantity: '500 g',
    servings: 15,
  },
  {
    id: 'product2',
    num: 2,
    name: 'Hiber Hake',
    flavor: 'Sabor Vainilla',
    cartName: 'Hiber Hake — Vainilla',
    tagline: 'Suavidad y nutrición en cada sorbo',
    desc: 'Hiber Hake Sabor Vainilla ofrece la misma fórmula nutricional completa con un perfil suave y versátil que combina con frutas, avena o tu bebida favorita. Perfecto para mantener hábitos saludables, apoyar tu metabolismo y disfrutar de un shake cremoso que nutre cuerpo y mente cada mañana.',
    price: 500,
    img: 'shakevainilla.png',
    categories: ['shakes', 'proteinas', 'energia'],
    goals: ['energia', 'nutricion', 'peso', 'habitos', 'musculo'],
    category: 'shakes',
    goal: 'nutricion',
    format: 'polvo',
    brand: 'Hinode',
    gender: 'unisex',
    certifications: ['gmp', 'sin-lacteos'],
    rating: 5,
    reviews: 41,
    featured: false,
    badges: ['recomendado', 'sin-azucar'],
    benefits: ['Fórmula balanceada', 'Versátil en preparaciones', 'Apoya el metabolismo', 'Vitaminas y minerales', 'Textura cremosa'],
    ingredients: 'Proteína de suero, vitaminas A, C, D y E, zinc, magnesio, fibra, aroma natural de vainilla.',
    usage: 'Disuelve 2 cucharadas en 250 ml de leche descremada o bebida vegetal. Consumir 1 vez al día como complemento de una dieta equilibrada.',
    quantity: '500 g',
    servings: 15,
  },
  {
    id: 'product3',
    num: 3,
    name: 'Hiber Hake',
    flavor: 'Sabor Fresa',
    cartName: 'Hiber Hake — Fresa',
    tagline: 'Frescura frutal con poder nutricional',
    desc: 'Hiber Hake Sabor Fresa aporta energía, proteínas y micronutrientes esenciales con un refrescante sabor a frutos rojos. Diseñado para quienes llevan un estilo de vida activo y buscan una opción ligera, deliciosa y nutritiva que complemente su alimentación diaria y apoye sus objetivos de bienestar.',
    price: 500,
    img: 'shakefresa.png',
    categories: ['shakes', 'proteinas', 'energia'],
    goals: ['energia', 'rendimiento', 'recuperacion', 'peso', 'musculo'],
    category: 'shakes',
    goal: 'rendimiento',
    format: 'polvo',
    brand: 'Hinode',
    gender: 'unisex',
    certifications: ['gmp', 'sin-gluten'],
    rating: 4,
    reviews: 38,
    featured: false,
    badges: ['nuevo', 'edicion-limitada', 'sin-gluten'],
    benefits: ['Sabor frutal refrescante', 'Ideal post-entrenamiento', 'Bajo en grasa', 'Fuente de proteína', 'Fácil digestión'],
    ingredients: 'Proteína de suero, extracto de fresa, vitaminas del complejo B, calcio, antioxidantes naturales, fibra soluble.',
    usage: 'Prepara con agua fría o leche para un shake refrescante. 1 porción diaria, especialmente recomendado después de actividad física.',
    quantity: '500 g',
    servings: 15,
  },
  {
    id: 'product4',
    num: 4,
    name: 'H-MEN',
    flavor: null,
    cartName: 'H-MEN',
    tagline: 'Para el hombre que sabe cuidarse',
    desc: 'H-MEN es el suplemento formulado para el hombre moderno que prioriza su salud y rendimiento. Con vitaminas, minerales y nutrientes clave seleccionados para apoyar la energía diaria, el sistema inmune y el bienestar masculino. Una cápsula al día para complementar tu rutina con la calidad y respaldo de Hinode.',
    price: 110,
    img: 'hmen.jpg',
    categories: ['vitaminas', 'minerales', 'bienestar-masculino'],
    goals: ['bienestar-masculino', 'vitalidad', 'energia', 'proteccion', 'musculo'],
    category: 'bienestar-masculino',
    goal: 'bienestar-masculino',
    format: 'capsulas',
    brand: 'Hinode',
    gender: 'masculino',
    certifications: ['gmp', 'sin-gmo'],
    rating: 5,
    reviews: 67,
    featured: true,
    badges: ['best-seller', 'recomendado'],
    benefits: ['Fórmula para hombres', 'Energía y vitalidad', 'Apoyo nutricional', 'Fácil de tomar', 'Excelente relación precio-valor'],
    ingredients: 'Vitamina C, vitamina E, zinc, selenio, magnesio, extractos vegetales adaptados al perfil masculino.',
    usage: 'Toma 1 cápsula al día con el desayuno y un vaso de agua. No exceder la dosis recomendada.',
    quantity: '60 cápsulas',
    servings: 60,
  },
  {
    id: 'product5',
    num: 5,
    name: 'SENS HERBALIS',
    flavor: null,
    cartName: 'SENS HERBALIS',
    tagline: 'Apoyo herbal para tu día a día',
    desc: 'SENS HERBALIS combina extractos herbales y nutrientes esenciales para acompañar tu bienestar en el ritmo cotidiano. Su fórmula herbal está pensada para quienes buscan un complemento confiable que contribuye a una rutina de vida saludable e integral.',
    price: 129,
    img: 'sens.jpg',
    categories: ['herbales', 'inmunidad', 'vitaminas', 'bienestar-femenino', 'digestion'],
    goals: ['inmunidad', 'proteccion', 'vitalidad', 'digestion', 'habitos'],
    category: 'herbales',
    goal: 'inmunidad',
    format: 'capsulas',
    brand: 'Hinode',
    gender: 'unisex',
    certifications: ['gmp', 'organico', 'sin-gluten', 'vegano'],
    rating: 5,
    reviews: 44,
    featured: true,
    badges: ['organico', 'vegano', 'sin-gluten'],
    benefits: ['Extractos herbales', 'Apoyo nutricional', 'Bienestar integral', 'Uso diario sencillo', 'Complemento alimenticio'],
    ingredients: 'Equinácea, propóleo, vitamina C, zinc, extracto de jengibre, antioxidantes naturales de origen herbal.',
    usage: 'Consumir 1 cápsula al día con alimentos. Mantener uso constante como parte de hábitos saludables y una dieta balanceada.',
    quantity: '60 cápsulas',
    servings: 60,
  },
];

SUPLEMENTOS.forEach(p => {
  p.ingredientProfile = INGREDIENT_PROFILES[p.id];
  if (p.ingredientProfile) {
    const highlights = p.ingredientProfile.items.filter(i => i.highlight).map(i => i.name);
    const others = p.ingredientProfile.items.filter(i => !i.highlight).slice(0, 2).map(i => i.name);
    p.ingredients = [...highlights, ...others].slice(0, 4).join(', ');
  }
});

const categoryCounts = {};
const goalCounts = {};
SUPLEMENTOS.forEach(p => {
  p.categories.forEach(c => { categoryCounts[c] = (categoryCounts[c] || 0) + 1; });
  p.goals.forEach(g => { goalCounts[g] = (goalCounts[g] || 0) + 1; });
});

function stars(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }
function esc(s) { return s.replace(/'/g, "\\'").replace(/"/g, '&quot;'); }

function resolveProductBadges(p) {
  return (p.badges || [])
    .filter(id => PRODUCT_BADGE_DEFS[id])
    .sort((a, b) => PRODUCT_BADGE_DEFS[a].priority - PRODUCT_BADGE_DEFS[b].priority)
    .slice(0, MAX_PRODUCT_BADGES);
}

function renderProductBadges(p) {
  const ids = resolveProductBadges(p);
  if (!ids.length) return '';
  const pills = ids.map(id => {
    const def = PRODUCT_BADGE_DEFS[id];
    return `<span class="product-badge-pill product-badge-pill--${id}" tabindex="0" aria-describedby="badge-tip-${p.id}-${id}">${def.label}<span class="product-badge-tooltip" id="badge-tip-${p.id}-${id}" role="tooltip">${def.tooltip}</span></span>`;
  }).join('');
  return `<div class="product-badges" aria-label="Etiquetas del producto">${pills}</div>`;
}

function renderProductPrice(p, variant = 'card') {
  const hasSale = resolveProductBadges(p).includes('oferta') && p.originalPrice && p.originalPrice > p.price;
  const size = variant === 'featured' ? '1.3rem' : '1.1rem';
  const margin = variant === 'featured' ? 'margin-bottom:20px' : 'margin:12px 0';
  if (hasSale) {
    const discount = Math.round((1 - p.price / p.originalPrice) * 100);
    return `<p class="product-price-row" style="${margin}"><span class="product-price-original" aria-label="Precio anterior">$${p.originalPrice.toLocaleString('es-MX')}</span><span class="product-price-sale font-display" style="font-style:italic;font-size:${size};">$${p.price.toLocaleString('es-MX')}</span><span class="product-price-discount">-${discount}%</span></p>`;
  }
  return `<p class="font-display" style="font-style:italic;font-size:${size};${margin}">$${p.price.toLocaleString('es-MX')}</p>`;
}

function filterCheckbox(group, value, label, extraClass = '') {
  return `<label class="filter-check ${extraClass}"><input type="checkbox" class="filter-input" data-filter-group="${group}" value="${value}"><span class="filter-check-label">${label}</span></label>`;
}

function categoryCheckbox(value, label) {
  return `<label class="filter-check filter-check--family filter-check--${value}"><input type="checkbox" class="filter-input" data-filter-group="category" value="${value}"><span class="filter-dot" aria-hidden="true"></span><span class="filter-check-label">${label}</span></label>`;
}

function certCheckbox(value, label) {
  return `<label class="filter-check filter-check--cert filter-check--cert-${value}"><input type="checkbox" class="filter-input" data-filter-group="certification" value="${value}"><span class="filter-dot" aria-hidden="true"></span><span class="filter-check-label">${label}</span></label>`;
}

function generateFiltersHtml(total) {
  const categories = Object.keys(categoryLabels).map(k => ({ value: k, label: categoryLabels[k] }));
  const goals = Object.keys(goalLabels).map(k => ({ value: k, label: goalLabels[k] }));
  const formats = Object.keys(formatLabels).map(k => ({ value: k, label: formatLabels[k] }));
  const genders = Object.keys(genderLabels).map(k => ({ value: k, label: genderLabels[k] }));
  const certifications = Object.keys(certificationLabels).map(k => ({ value: k, label: certificationLabels[k] }));
  const priceRanges = [
    { value: '0-150', label: 'Hasta $150' },
    { value: '150-300', label: '$150 – $300' },
    { value: '300-500', label: '$300 – $500' },
    { value: '500+', label: '$500 o más' },
  ];
  const brands = [...new Set(SUPLEMENTOS.map(p => p.brand))];

  const minPrice = Math.min(...SUPLEMENTOS.map(p => p.price));
  const maxPrice = Math.max(...SUPLEMENTOS.map(p => p.price));

  const groups = `
    <fieldset class="filter-group">
      <legend class="filter-group-title">Categoría</legend>
      <div class="filter-group-options filter-group-options--family">${categories.map(c => categoryCheckbox(c.value, c.label)).join('')}</div>
    </fieldset>
    <fieldset class="filter-group">
      <legend class="filter-group-title">Objetivo de salud</legend>
      <div class="filter-group-options filter-group-options--goals">${goals.map(g => filterCheckbox('goal', g.value, g.label)).join('')}</div>
    </fieldset>
    <fieldset class="filter-group">
      <legend class="filter-group-title">Formato</legend>
      <div class="filter-group-options">${formats.map(f => filterCheckbox('format', f.value, f.label)).join('')}</div>
    </fieldset>
    <fieldset class="filter-group">
      <legend class="filter-group-title">Marca</legend>
      <div class="filter-group-options filter-group-options--brand">${brands.map(b => filterCheckbox('brand', b, b, 'filter-check--brand')).join('')}</div>
    </fieldset>
    <fieldset class="filter-group">
      <legend class="filter-group-title">Precio</legend>
      <div class="filter-group-options">${priceRanges.map(r => filterCheckbox('price', r.value, r.label, 'filter-check--price')).join('')}</div>
      <div class="filter-price-slider-wrap">
        <label class="sec-label" for="filterPriceMin">Rango personalizado</label>
        <div class="filter-price-slider-labels">
          <span id="filterPriceMinLabel">$${minPrice.toLocaleString('es-MX')}</span>
          <span>—</span>
          <span id="filterPriceMaxLabel">$${maxPrice.toLocaleString('es-MX')}</span>
        </div>
        <div class="filter-price-slider-inputs">
          <input type="range" class="filter-price-range" id="filterPriceMin" min="${minPrice}" max="${maxPrice}" step="1" value="${minPrice}" aria-label="Precio mínimo">
          <input type="range" class="filter-price-range" id="filterPriceMax" min="${minPrice}" max="${maxPrice}" step="1" value="${maxPrice}" aria-label="Precio máximo">
        </div>
        <label class="filter-check filter-check--slider-toggle">
          <input type="checkbox" class="filter-input" id="filterPriceSliderActive" data-filter-group="priceSlider" value="active">
          <span class="filter-check-label">Usar rango personalizado</span>
        </label>
      </div>
    </fieldset>
    <fieldset class="filter-group">
      <legend class="filter-group-title">Género</legend>
      <div class="filter-group-options">${genders.map(g => filterCheckbox('gender', g.value, g.label)).join('')}</div>
    </fieldset>
    <fieldset class="filter-group">
      <legend class="filter-group-title">Certificaciones</legend>
      <div class="filter-group-options filter-group-options--cert">${certifications.map(c => certCheckbox(c.value, c.label)).join('')}</div>
    </fieldset>`;

  return `
                <div class="catalog-layout fu">
                    <button type="button" class="catalog-filters-toggle btn-s" id="filterMobileOpen" aria-expanded="false" aria-controls="catalogFilters">
                        Filtros <span class="filter-badge" id="filterActiveBadge" hidden>0</span>
                    </button>
                    <div class="catalog-filters-backdrop" id="filterBackdrop" hidden aria-hidden="true"></div>
                    <aside class="catalog-filters" id="catalogFilters" aria-label="Filtros del catálogo">
                        <div class="catalog-filters-panel">
                            <div class="catalog-filters-header">
                                <h3 class="h-mix" style="font-size:1rem;">Filtros</h3>
                                <button type="button" class="catalog-filters-close" id="filterMobileClose" aria-label="Cerrar filtros">✕</button>
                            </div>
                            <div class="catalog-filters-body">${groups}</div>
                            <div class="catalog-filters-footer">
                                <button type="button" class="btn-s" id="filterResetSidebar">Limpiar filtros</button>
                                <button type="button" class="btn-p catalog-filters-apply" id="filterMobileApply">Ver <span id="filterApplyCount">${total}</span> resultados</button>
                            </div>
                        </div>
                    </aside>
                    <div class="catalog-main">
                        <div class="catalog-toolbar">
                            <p class="catalog-result-count" id="filterResultCount" aria-live="polite">Mostrando <strong>${total}</strong> de ${total} suplementos</p>
                            <div class="catalog-active-filters" id="activeFilterTags" hidden aria-label="Filtros activos"></div>
                            <button type="button" class="btn-s catalog-filters-clear" id="filterReset">Limpiar filtros</button>
                        </div>
                        <div class="grid-3 catalog-grid is-filter-ready" id="suplementosGrid">`;
}

function productHealthNotice(p) {
  const profile = p.ingredientProfile;
  const allergenLine = profile?.allergens?.length
    ? `<p class="product-allergen-alert" role="note"><strong>⚠ Alérgenos:</strong> ${profile.allergens.slice(0, 2).join(' · ')}${profile.allergens.length > 2 ? '…' : ''} <a href="#detalle-ingredientes">Ver detalle</a></p>`
    : '';
  return `${allergenLine}<p class="product-health-note sec-label" role="note">Complemento alimenticio · No es medicamento · Consulta a tu médico</p>`;
}

function productCard(p) {
  const qid = p.num;
  const displayName = p.flavor ? `${p.name} — ${p.flavor}` : p.name;
  const catLabel = categoryLabels[p.category] || p.category;
  const goalLabel = goalLabels[p.goal] || p.goal;
  const formatLabel = formatLabels[p.format] || p.format;
  const badgesHtml = renderProductBadges(p);
  const priceHtml = renderProductPrice(p);
  const benefitsHtml = p.benefits.map(b => `<li>${b}</li>`).join('');
  const dataCategories = p.categories.join(' ');
  const dataGoals = p.goals.join(' ');
  const dataCerts = (p.certifications || []).join(' ');

  return `<article class="suplemento-card product-card fu" data-product="${esc(p.cartName)}" data-category="${dataCategories}" data-goal="${dataGoals}" data-format="${p.format}" data-brand="${p.brand}" data-gender="${p.gender}" data-certification="${dataCerts}" data-price="${p.price}" id="card-${p.id}">
    <label class="compare-card-check" title="Agregar a comparación">
      <input type="checkbox" class="product-compare-input" data-compare-id="${p.id}" value="${p.id}" aria-label="Agregar ${esc(displayName)} a la comparación">
      <span class="compare-card-check-label">⚖ Comparar</span>
    </label>
    <div class="perfume-card-media suplemento-card-media">
      ${badgesHtml}
      <img src="../images/${p.img}" alt="${esc(displayName)} — ${esc(p.tagline)}" width="400" height="400" loading="lazy" decoding="async">
      <div class="perfume-card-notes suplemento-card-benefits" aria-hidden="true">
        <strong>Beneficios:</strong>
        <ul style="margin:8px 0 0;padding-left:16px;text-align:left;">${benefitsHtml}</ul>
      </div>
    </div>
    <div class="perfume-card-body suplemento-card-body">
      <h3 class="h-mix" style="font-size:1rem;margin-bottom:6px;">${displayName}</h3>
      <p class="sec-label" style="margin-bottom:8px;">${p.brand} · ${formatLabel}</p>
      <p class="ui-text perfume-card-desc suplemento-card-desc">${p.desc}</p>
      <p class="perfume-card-meta sec-label">${catLabel} · ${goalLabel} · ${p.quantity} · ${p.servings} porciones</p>
      <p class="perfume-card-notes-preview sec-label">Ingredientes clave: ${p.ingredients}…</p>
      <div class="perfume-stars" aria-label="${p.rating} de 5 estrellas">${stars(p.rating)} <span class="sec-label">(${p.reviews})</span></div>
      ${priceHtml}
      <div class="quantity-selector" style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:14px;">
        <button type="button" class="btn-s" style="padding:6px 12px;min-width:36px;" onclick="decreaseQuantity('${p.id}')" aria-label="Disminuir cantidad">−</button>
        <span class="sec-label" id="quantity${qid}">1</span>
        <button type="button" class="btn-s" style="padding:6px 12px;min-width:36px;" onclick="increaseQuantity('${p.id}')" aria-label="Aumentar cantidad">+</button>
      </div>
      <div class="product-card-actions">
        ${INGREDIENT_DETAIL_IDS.has(p.id) ? `<button type="button" class="btn-s" onclick="scrollToProduct('${p.id}')">Ver ingredientes</button>` : ''}
        <button type="button" class="btn-p" onclick="addToCart('${esc(p.cartName)}', ${p.price}, '${p.id}')">Comprar</button>
      </div>
      ${productHealthNotice(p)}
    </div>
  </article>`;
}

function featuredCard(p) {
  const displayName = p.flavor ? `${p.name} — ${p.flavor}` : p.name;
  const goalLabel = goalLabels[p.goal] || p.goal;
  const badgesHtml = renderProductBadges(p);
  const priceHtml = renderProductPrice(p, 'featured');
  return `<article class="featured-card fu">
    <div class="featured-card-media">${badgesHtml}<img src="../images/${p.img}" alt="${esc(displayName)} — ${esc(p.tagline)}" width="500" height="500" loading="lazy" decoding="async"></div>
    <div class="featured-card-body">
      <p class="sec-label" style="margin-bottom:8px;">${p.brand} · Destacado</p>
      <h3 class="h-mix" style="font-size:1.3rem;margin-bottom:8px;">${displayName}</h3>
      <p class="ui-text" style="font-style:italic;font-size:0.72rem;color:var(--color-muted);margin-bottom:14px;">${p.tagline}</p>
      <p class="ui-text" style="margin-bottom:16px;">${p.desc}</p>
      <p class="sec-label" style="margin-bottom:6px;">Beneficios principales</p>
      <p class="ui-text" style="font-size:0.65rem;margin-bottom:12px;">${p.benefits.join(' · ')}</p>
      <p class="sec-label" style="margin-bottom:16px;">${goalLabel} · ${p.quantity} · ${p.servings} porciones</p>
      ${priceHtml}
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        ${INGREDIENT_DETAIL_IDS.has(p.id) ? `<button type="button" class="btn-s" onclick="scrollToProduct('${p.id}')">Ver ingredientes</button>` : ''}
        <button type="button" class="btn-p" onclick="addToCart('${esc(p.cartName)}', ${p.price}, '${p.id}')">Comprar Ahora</button>
      </div>
      ${productHealthNotice(p)}
    </div>
  </article>`;
}

function generateGuideHtml() {
  const steps = [
    { icon: '🌅', title: 'Momento ideal', desc: 'Toma tus suplementos con el desayuno o después de entrenar para mejor absorción. Hiber Hake funciona mejor en la mañana; cápsulas con alimentos.' },
    { icon: '🔗', title: 'Combinaciones inteligentes', desc: 'H-MEN + SENS HERBALIS pueden complementar energía y bienestar diario. Hiber Hake puede alternarse con cápsulas según tu objetivo del día.' },
    { icon: '📅', title: 'Ciclos recomendados', desc: 'Mantén H-MEN y SENS HERBALIS de forma continua. Hiber Hake puede usarse en ciclos de 4–8 semanas con pausas según asesoría.' },
    { icon: '✅', title: 'Constancia es clave', desc: 'El uso regular, junto con dieta balanceada e hidratación, puede acompañar tu bienestar. Los suplementos complementan —no sustituyen— una alimentación variada.' },
  ];
  return steps.map((s, i) => `<article class="guide-step fu">
    <div class="guide-step-icon" aria-hidden="true">${s.icon}</div>
    <div class="guide-step-content">
      <span class="guide-step-num sec-label">Paso ${i + 1}</span>
      <h3 class="h-mix guide-step-title">${s.title}</h3>
      <p class="ui-text guide-step-desc">${s.desc}</p>
    </div>
  </article>`).join('\n');
}

const INGREDIENT_DETAIL_IDS = new Set(['product1', 'product2', 'product3']);

function ingredientTableRows(items) {
  return items.map(item => {
    const badge = item.highlight
      ? `<span class="ingredient-badge">${item.highlight}</span>`
      : '';
    return `<tr>
      <td class="ingredient-td-name" data-label="Ingrediente">
        <span class="ingredient-name">${item.name}</span>
        ${badge}
      </td>
      <td data-label="Cantidad / porción">${item.amount}</td>
      <td data-label="% VRN" class="ingredient-td-dv">${item.dv || '—'}</td>
      <td data-label="Función" class="ingredient-td-fn">${item.function}</td>
      <td data-label="Origen" class="ingredient-td-origin">${item.origin || '—'}</td>
    </tr>`;
  }).join('\n');
}

function generateProductIngredientPanel(p, isFirst) {
  const profile = p.ingredientProfile;
  if (!profile) return '';
  const displayName = p.flavor ? `${p.name} — ${p.flavor}` : p.name;
  const highlights = [...new Set(profile.items.filter(i => i.highlight).map(i => i.highlight))];
  const highlightBadges = highlights.map(h => `<span class="ingredient-highlight-badge">${h}</span>`).join('');
  const allergenList = profile.allergens.map(a => `<li>${a}</li>`).join('');

  return `<article class="ingredient-panel fu${isFirst ? ' is-active' : ''}" id="ingredient-panel-${p.id}" role="tabpanel" aria-labelledby="ingredient-tab-${p.id}"${isFirst ? '' : ' hidden'}>
    <header class="ingredient-panel-header">
      <div class="ingredient-panel-title-row">
        <img src="../images/${p.img}" alt="" width="72" height="72" loading="lazy" decoding="async" class="ingredient-panel-thumb">
        <div>
          <h3 class="h-mix" style="font-size:1.15rem;margin-bottom:6px;">${displayName}</h3>
          <p class="sec-label">Porción de referencia: <strong>${profile.servingLabel}</strong></p>
          <p class="ui-text" style="font-size:0.62rem;margin-top:6px;color:var(--color-muted);">${profile.servingNote}</p>
        </div>
      </div>
      ${highlights.length ? `<div class="ingredient-highlights" aria-label="Ingredientes destacados">${highlightBadges}</div>` : ''}
    </header>
    <div class="ingredient-table-wrap" role="region" aria-label="Tabla de ingredientes de ${displayName}">
      <table class="ingredient-table">
        <thead>
          <tr>
            <th scope="col">Ingrediente</th>
            <th scope="col">Cantidad / porción</th>
            <th scope="col">% VRN*</th>
            <th scope="col">Función</th>
            <th scope="col">Origen</th>
          </tr>
        </thead>
        <tbody>${ingredientTableRows(profile.items)}</tbody>
      </table>
      <p class="ingredient-table-footnote sec-label">* VRN = Valor de Referencia de Nutrientes (ingesta diaria recomendada). «—» = sin VRN establecido para este nutriente.</p>
    </div>
    <aside class="ingredient-allergens" role="note" aria-label="Información de alérgenos">
      <div class="ingredient-allergens-header">
        <span class="ingredient-allergens-icon" aria-hidden="true">⚠️</span>
        <h4 class="h-mix" style="font-size:0.95rem;">Alérgenos e intolerancias</h4>
      </div>
      <ul class="ingredient-allergens-list">${allergenList}</ul>
      <p class="ui-text ingredient-allergens-note">${profile.allergenNote}</p>
    </aside>
  </article>`;
}

const SECTION_HEALTH_DISCLAIMER = `
            <footer class="section-health-disclaimer fu" role="note" aria-label="Aviso sanitario de la sección">
                <p class="section-health-disclaimer-text">
                    <strong>Este producto no es un medicamento.</strong>
                    No sustituye una dieta balanceada.
                    Consulta con tu médico antes de consumir.
                    <a href="#disclaimer">Aviso legal completo</a>
                </p>
            </footer>`;

function generateIngredientsSectionHtml() {
  const withIngredients = SUPLEMENTOS.filter(p => p.ingredientProfile && INGREDIENT_DETAIL_IDS.has(p.id));
  const tabs = withIngredients.map((p, i) => {
    const label = p.flavor ? `${p.name} — ${p.flavor.replace('Sabor ', '')}` : p.name;
    return `<button type="button" class="ingredient-tab${i === 0 ? ' is-active' : ''}" id="ingredient-tab-${p.id}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" aria-controls="ingredient-panel-${p.id}" data-ingredient-product="${p.id}">${label}</button>`;
  }).join('\n');
  const panels = withIngredients.map((p, i) => generateProductIngredientPanel(p, i === 0)).join('\n');

  return `
        <section class="section section-alt" id="detalle-ingredientes">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Transparencia total</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Detalle de <em>Ingredientes</em></h2>
                    <p class="ui-text fu" style="max-width:640px;margin:20px auto 0;">Consulta la composición completa, cantidades por porción, valor diario recomendado y función de cada ingrediente. Selecciona un producto para ver su tabla nutricional.</p>
                </div>
                <aside class="allergen-global-banner fu" role="note" aria-label="Aviso sobre alérgenos">
                    <p class="ui-text"><strong>⚠ Información de alérgenos:</strong> Revisa la lista de ingredientes y alérgenos de cada producto antes de consumir. <strong>No consumir en caso de alergia a alguno de los ingredientes.</strong> Consulta a tu médico si tienes dudas, especialmente en embarazo, lactancia o si tomas medicamentos.</p>
                </aside>
                <div class="ingredient-tabs-wrap fu" role="tablist" aria-label="Seleccionar producto">${tabs}</div>
                <div class="ingredient-panels-wrap">${panels}</div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>`;
}

function generateLegalDisclaimerSection() {
  return `
        <section class="section disclaimer-section" id="disclaimer" aria-labelledby="disclaimer-title">
            <div class="container">
                <div class="disclaimer-section-head fu">
                    <p class="sec-label">Aviso legal y regulatorio</p>
                    <h2 class="h-mix" id="disclaimer-title" style="font-size:clamp(1.6rem,2.8vw,2.4rem);">Información <em>importante</em> sobre nuestros suplementos</h2>
                    <p class="ui-text disclaimer-intro">Los productos mostrados en esta página son complementos alimenticios comercializados por Venture Zone. La información cumple con las buenas prácticas de etiquetado y publicidad exigidas por COFEPRIS (México), la NOM-050-SCFI-2012 y, cuando aplica, por la FDA (Estados Unidos) para <em>dietary supplements</em>.</p>
                </div>
                <div class="disclaimer-box fu" role="note" aria-label="Aviso legal de suplementos alimenticios">
                    <p class="disclaimer-lead">Antes de adquirir o consumir cualquier producto, lee atentamente lo siguiente:</p>
                    <ul class="disclaimer-list">
                        <li><strong>Este producto no es un medicamento.</strong> Los suplementos ofrecidos no están destinados a diagnosticar, tratar, curar ni prevenir ninguna enfermedad.</li>
                        <li><strong>No sustituye una dieta balanceada.</strong> Los complementos alimenticios deben acompañar —no reemplazar— una alimentación variada, equilibrada y un estilo de vida saludable.</li>
                        <li><strong>Consulta con tu médico antes de consumir</strong> cualquier suplemento, especialmente si estás embarazada, lactando, tomas medicamentos, tienes alguna condición de salud o estás bajo supervisión médica.</li>
                        <li><strong>Mantener fuera del alcance de los niños.</strong> El consumo por menores de edad requiere supervisión de un profesional de la salud. Conserva los productos en lugar fresco, seco y protegido de la luz solar directa.</li>
                        <li><strong>No consumir en caso de alergia a alguno de los ingredientes.</strong> Revisa la etiqueta, la tabla de ingredientes y la sección de alérgenos de cada producto antes de usarlo. Suspende el uso y consulta a tu médico ante cualquier reacción adversa.</li>
                        <li><strong>La experiencia puede variar de persona a persona.</strong> Las descripciones de beneficios son orientativas y dependen de factores individuales como dieta, actividad física y estado de salud.</li>
                        <li><strong>Registro sanitario correspondiente.</strong> Los productos Hinode comercializados en Venture Zone cuentan con registro sanitario vigente ante COFEPRIS u otra autoridad competente, según el producto y país de comercialización. Consulta el número de registro en la etiqueta física del producto.</li>
                    </ul>
                    <div class="disclaimer-warnings fu" role="note" aria-label="Advertencias para grupos específicos">
                        <h3 class="h-mix disclaimer-warnings-title">Advertencias para grupos específicos</h3>
                        <ul class="disclaimer-warnings-list">
                            <li><strong>Embarazo y lactancia:</strong> Consulta obligatoriamente a tu médico antes de consumir cualquier suplemento.</li>
                            <li><strong>Niños y adolescentes:</strong> Mantener fuera de su alcance. No administrar sin indicación médica.</li>
                            <li><strong>Alergias e intolerancias:</strong> Lee la lista completa de alérgenos en cada producto. No consumir si eres alérgico a algún ingrediente.</li>
                            <li><strong>Medicamentos e interacciones:</strong> Si tomas medicamentos recetados, anticoagulantes o tienes una condición médica, consulta a tu médico antes de usar suplementos.</li>
                        </ul>
                    </div>
                    <div class="disclaimer-regulatory">
                        <p><strong>Marco regulatorio (México):</strong> Los suplementos alimenticios se regulan conforme a la normativa de la Secretaría de Salud y COFEPRIS. La publicidad e información comercial deben observar la <strong>NOM-050-SCFI-2012</strong> (información comercial — etiquetado general de productos). El registro sanitario es obligatorio para su comercialización.</p>
                        <p><strong>Estados Unidos (FDA):</strong> La FDA clasifica estos productos como <em>dietary supplements</em> y no los evalúa con el mismo rigor que los medicamentos; las declaraciones de salud no han sido evaluadas por la FDA, salvo indicación expresa en el producto.</p>
                        <p>Venture Zone actúa como distribuidor independiente. La información en este sitio es de carácter informativo y no constituye asesoría médica, nutricional ni farmacéutica.</p>
                    </div>
                    <p class="disclaimer-terms-link">
                        <a href="terminos-suplementos.html" class="btn-s">Ver términos y condiciones completos</a>
                    </p>
                </div>
            </div>
        </section>`;
}

function generateCompareHtml() {
  const checkboxes = SUPLEMENTOS.map(p => {
    const label = p.flavor ? `${p.name} — ${p.flavor}` : p.name;
    return `<label class="filter-check compare-check"><input type="checkbox" class="product-compare-input" data-compare-id="${p.id}" value="${p.id}"><span class="filter-check-label">${label} — $${p.price.toLocaleString('es-MX')}</span></label>`;
  }).join('');
  return `
                <div class="compare-panel fu" id="comparePanel">
                    <p class="ui-text" style="margin-bottom:16px;">Marca los productos con <strong>⚖ Comparar</strong> en el catálogo o selecciónalos aquí. Máximo 3 productos.</p>
                    <div class="filter-group-options compare-options" id="compareOptions">${checkboxes}</div>
                    <button type="button" class="btn-p" id="compareSectionOpen" style="margin-top:20px;">Abrir comparación</button>
                </div>`;
}

const featured = SUPLEMENTOS.filter(p => p.featured);
const productsHtml = SUPLEMENTOS.map(productCard).join('\n');
const featuredHtml = featured.map(featuredCard).join('\n');

const categories = [
  { id: 'proteinas', icon: '💪', name: 'Proteínas', desc: 'Apoyo muscular, recuperación y saciedad para tu rutina activa.', highlights: 'Suero, aminoácidos, BCAA', count: categoryCounts.proteinas || 0 },
  { id: 'vitaminas', icon: '🍊', name: 'Vitaminas', desc: 'Micronutrientes esenciales para energía, piel y funciones vitales del organismo.', highlights: 'Complejo B, C, D, E', count: categoryCounts.vitaminas || 0 },
  { id: 'minerales', icon: '⚡', name: 'Minerales', desc: 'Zinc, magnesio, calcio y más para equilibrio metabólico y bienestar.', highlights: 'Zinc, magnesio, hierro', count: categoryCounts.minerales || 0 },
  { id: 'shakes', icon: '🥤', name: 'Shakes Nutricionales', desc: 'Bebidas completas con sabor delicioso y nutrición balanceada en minutos.', highlights: 'Hiber Hake, proteína, vitaminas', count: categoryCounts.shakes || 0 },
  { id: 'energia', icon: '🔋', name: 'Energía', desc: 'Complementos para vitalidad sostenida sin depender de estimulantes extremos.', highlights: 'Vitaminas B, proteínas', count: categoryCounts.energia || 0 },
  { id: 'bienestar-masculino', icon: '👨', name: 'Bienestar Masculino', desc: 'Nutrición adaptada al hombre activo que cuida su salud y rendimiento.', highlights: 'H-MEN, vitaminas, minerales', count: categoryCounts['bienestar-masculino'] || 0, filterCategory: 'shakes' },
  { id: 'bienestar-femenino', icon: '👩', name: 'Bienestar Femenino', desc: 'Apoyo nutricional para el bienestar integral de la mujer moderna.', highlights: 'Antioxidantes, hierro, herbal', count: categoryCounts['bienestar-femenino'] || 0, filterCategory: 'shakes' },
];

const categoryCards = categories.map(c => `<article class="family-card fu">
  <span class="family-card-icon" aria-hidden="true">${c.icon}</span>
  <h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">${c.name}</h3>
  <p class="ui-text" style="margin-bottom:10px;">${c.desc}</p>
  <p class="sec-label">Destacados: ${c.highlights}</p>
  <span class="family-card-count">${c.count} producto${c.count !== 1 ? 's' : ''}</span>
  <a href="#coleccion" class="btn-s" style="margin-top:16px;display:inline-block;" data-filter-category="${c.filterCategory || c.id}">Ver productos</a>
</article>`).join('\n');

const faqItems = [
  { q: '¿Los suplementos Hinode sustituyen una dieta balanceada?', a: 'No. Los suplementos son complementos alimenticios diseñados para apoyar tu nutrición, no para reemplazar comidas ni tratamientos médicos. Deben usarse junto con una alimentación variada y hábitos saludables.' },
  { q: '¿Cuándo debo tomar Hiber Hake?', a: 'Lo ideal es consumirlo en el desayuno o después del entrenamiento. Mezcla 2 cucharadas en 250 ml de leche o agua. Una porción al día es suficiente para la mayoría de las personas.' },
  { q: '¿Puedo combinar H-MEN con SENS HERBALIS?', a: 'Sí, son complementos compatibles que abordan objetivos distintos: energía masculina y bienestar diario. Siempre consulta con un profesional de salud si tomas medicamentos.' },
  { q: '¿Los productos son aptos para personas con alergias?', a: 'Revisa siempre la etiqueta de ingredientes. Si tienes alergias a lácteos, gluten o algún componente herbal, contáctanos antes de comprar para recibir asesoría personalizada.' },
  { q: '¿Cuánto tardan en notarse los beneficios?', a: 'La experiencia varía según cada persona, constancia de uso, dieta y estilo de vida. Se recomienda un uso mínimo de 4–8 semanas, siempre como complemento de una alimentación variada y bajo orientación profesional si es necesario.' },
  { q: '¿Hacen envíos a todo México?', a: 'Sí, realizamos envíos a todo México. Envío gratis en compras mayores a $500 MXN. Entrega estimada de 3–7 días hábiles según tu ubicación.' },
  { q: '¿Los suplementos son originales Hinode?', a: '100% originales. Somos distribuidores Venture Zone con productos directos de la marca Hinode México.' },
  { q: '¿Necesito receta médica?', a: 'Nuestros suplementos son de venta libre como complementos alimenticios. Sin embargo, si tienes condiciones de salud, embarazo o lactancia, consulta a tu médico antes de consumirlos.' },
  { q: '¿Cómo debo almacenar los productos?', a: 'Guarda en lugar fresco y seco, alejado de la luz directa y del alcance de niños. Cierra bien los envases después de cada uso. Los shakes en polvo deben mantenerse libres de humedad.' },
  { q: '¿Ofrecen asesoría personalizada?', a: 'Sí, escríbenos por WhatsApp o completa el formulario de contacto. Te ayudamos a elegir el suplemento ideal según tus objetivos, presupuesto y estilo de vida.' },
];

const faqHtml = faqItems.map((item, i) => `<div class="faq-item" role="listitem"><button type="button" class="faq-question" aria-expanded="false" aria-controls="faq-a${i + 1}" id="faq-q${i + 1}"><span>${item.q}</span><span class="faq-icon" aria-hidden="true">+</span></button><div class="faq-answer" id="faq-a${i + 1}" role="region" aria-labelledby="faq-q${i + 1}"><p>${item.a}</p></div></div>`).join('\n');

const main = `<main id="main-content">
        <section class="hero hero--suplementos" id="inicio">
            <div class="container">
                <div class="hero-grid">
                    <div class="hero-content">
                        <p class="hero-label fu">Venture Zone · Suplementos Hinode</p>
                        <h1 class="hero-title fu">Nutrición que <em>Transforma</em> tu Bienestar</h1>
                        <p class="hero-subtitle fu">Descubre suplementos Hinode de calidad premium: desde shakes nutritivos Hiber Hake hasta fórmulas herbales y vitaminas para cada objetivo de salud. Tu aliado en el camino hacia una vida más plena.</p>
                        <div class="hero-ctas fu">
                            <a href="#coleccion" class="btn-p">Ver Suplementos</a>
                            <a href="#contacto" class="btn-s">Asesoría Gratuita</a>
                        </div>
                        <p class="hero-health-notice fu sec-label" role="note">Complementos alimenticios Hinode · <strong>No son medicamentos</strong> · Consulta a tu médico antes de consumir</p>
                    </div>
                    <div class="hero-media fu fade-right">
                        <video id="suplementosHeroVideo" autoplay muted loop playsinline preload="auto" webkit-playsinline="true" aria-label="Video Hiber Hake — Sabor Fresa">
                            <source src="../videos/Shakefresa.mp4" type="video/mp4">
                        </video>
                        <div id="videoOverlay" class="video-overlay">
                            <button type="button" id="playButton" class="play-button">▶ Reproducir con sonido</button>
                            <p class="video-overlay-hint sec-label">El audio se activa al reproducir</p>
                        </div>
                        <button type="button" id="videoSoundToggle" class="video-sound-btn" aria-label="Activar sonido del video" title="Activar sonido" hidden>🔇</button>
                    </div>
                </div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>

        <div class="mq-wrap" aria-hidden="true">
            <div class="mq-inner">
                <span class="mq-item">Vitaminas<span class="mq-dot">◆</span></span>
                <span class="mq-item">Minerales<span class="mq-dot">◆</span></span>
                <span class="mq-item">Proteínas<span class="mq-dot">◆</span></span>
                <span class="mq-item">Energía<span class="mq-dot">◆</span></span>
                <span class="mq-item">Inmunidad<span class="mq-dot">◆</span></span>
                <span class="mq-item">Bienestar<span class="mq-dot">◆</span></span>
                <span class="mq-item">Salud<span class="mq-dot">◆</span></span>
                <span class="mq-item">Hinode<span class="mq-dot">◆</span></span>
                <span class="mq-item">Vitaminas<span class="mq-dot">◆</span></span>
                <span class="mq-item">Minerales<span class="mq-dot">◆</span></span>
                <span class="mq-item">Proteínas<span class="mq-dot">◆</span></span>
                <span class="mq-item">Energía<span class="mq-dot">◆</span></span>
                <span class="mq-item">Inmunidad<span class="mq-dot">◆</span></span>
                <span class="mq-item">Bienestar<span class="mq-dot">◆</span></span>
                <span class="mq-item">Salud<span class="mq-dot">◆</span></span>
                <span class="mq-item">Hinode<span class="mq-dot">◆</span></span>
            </div>
        </div>

        <section class="section" id="compromiso">
            <div class="container">
                <p class="sec-label fu" style="margin-bottom:16px;">Nuestro Compromiso</p>
                <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);margin-bottom:20px;">Calidad que <em>Transforma</em> tu Salud</h2>
                <div class="grid-2">
                    <div class="fu">
                        <span class="style-emoji" aria-hidden="true">🌿💪</span>
                        <p class="ui-text">En Venture Zone seleccionamos suplementos Hinode con estándares exigentes de calidad. Cada producto pasa por controles para respaldar pureza, seguridad y trazabilidad en tu rutina de bienestar.</p>
                        <p class="ui-text" style="margin-top:16px;">Creemos que la nutrición inteligente es la base de una vida plena. Por eso ofrecemos solo complementos alimenticios originales, respaldados por una marca con décadas de confianza en México y Latinoamérica.</p>
                        <div class="grid-4" style="margin-top:24px;gap:12px;">
                            <div class="cert-badge fu" style="text-align:center;padding:16px;border:1px solid var(--color-border);border-radius:8px;"><span aria-hidden="true" style="font-size:1.5rem;">🏭</span><p class="sec-label" style="margin-top:8px;">GMP</p></div>
                            <div class="cert-badge fu" style="text-align:center;padding:16px;border:1px solid var(--color-border);border-radius:8px;"><span aria-hidden="true" style="font-size:1.5rem;">✅</span><p class="sec-label" style="margin-top:8px;">FDA</p></div>
                            <div class="cert-badge fu" style="text-align:center;padding:16px;border:1px solid var(--color-border);border-radius:8px;"><span aria-hidden="true" style="font-size:1.5rem;">🌱</span><p class="sec-label" style="margin-top:8px;">Orgánico</p></div>
                            <div class="cert-badge fu" style="text-align:center;padding:16px;border:1px solid var(--color-border);border-radius:8px;"><span aria-hidden="true" style="font-size:1.5rem;">🌾</span><p class="sec-label" style="margin-top:8px;">Gluten-free</p></div>
                        </div>
                        <a href="#coleccion" class="btn-s" style="margin-top:24px;display:inline-block;">Explorar suplementos</a>
                    </div>
                    <div class="fu">
                        <div class="quote-hero-wrap" style="margin:0;">
                            <p class="quote-t" style="font-size:clamp(1rem,1.8vw,1.25rem);line-height:1.7;position:relative;z-index:1;">Tu cuerpo es tu hogar. Nutrirlo con calidad no es un lujo — es la inversión más inteligente que puedes hacer cada día.</p>
                        </div>
                    </div>
                </div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>

        <section class="section section-alt" id="categorias">
            <div class="container">
                <div style="text-align:center;margin-bottom:64px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Exploración</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Categorías de <em>Suplementos</em></h2>
                    <p class="ui-text fu" style="max-width:560px;margin:20px auto 0;">Encuentra el complemento ideal explorando por tipo de nutriente y objetivo de salud.</p>
                </div>
                <div class="family-grid">${categoryCards}</div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>

        <section class="section" id="coleccion">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Catálogo</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Nuestra <em>Colección</em></h2>
                    <p class="ui-text fu" style="max-width:560px;margin:20px auto 0;">5 suplementos Hinode seleccionados. Usa los filtros para encontrar tu complemento ideal.</p>
                </div>
                ${generateFiltersHtml(SUPLEMENTOS.length)}${productsHtml}</div>
                        <div class="catalog-no-results" id="noResultsMessage" hidden role="status">
                            <span class="catalog-no-results-icon" aria-hidden="true">🌿</span>
                            <h3 class="h-mix" style="font-size:1.1rem;margin-bottom:12px;">No encontramos suplementos</h3>
                            <p class="ui-text" style="margin-bottom:20px;max-width:400px;">Prueba ajustando o limpiando los filtros para ver más opciones de nuestra colección.</p>
                            <button type="button" class="btn-p" id="filterResetEmpty">Limpiar todos los filtros</button>
                        </div>
                    </div>
                </div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>

        <section class="section" id="destacados">
            <div class="container">
                <div style="text-align:center;margin-bottom:56px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Bestsellers</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Suplementos <em>Destacados</em></h2>
                </div>
                <div class="featured-grid">${featuredHtml}</div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>

        <section class="section section-alt" id="guia">
            <div class="container">
                <div style="text-align:center;margin-bottom:56px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Guía de uso</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Cómo tomar tus <em>Suplementos</em></h2>
                    <p class="ui-text fu" style="max-width:560px;margin:20px auto 0;">Momento ideal, combinaciones, ciclos y la importancia de la constancia como parte de hábitos saludables.</p>
                </div>
                <div class="guide-timeline">${generateGuideHtml()}</div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>

        <section class="section" id="blog">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Consejos</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Tips de <em>Bienestar</em></h2>
                </div>
                <div class="blog-grid">
                    <article class="blog-card fu"><div class="blog-card-media"><img src="../images/shakechocolate.png" alt="Cómo elegir tu suplemento ideal" width="600" height="375" loading="lazy" decoding="async"></div><div class="blog-card-body"><span class="blog-card-cat">Guía</span><h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">Cómo elegir tu suplemento ideal</h3><p class="ui-text" style="margin-bottom:12px;">Define tu objetivo — energía, inmunidad o nutrición — y encuentra el complemento adecuado para tu estilo de vida.</p><span class="blog-card-date">Marzo 2026</span></div></article>
                    <article class="blog-card fu"><div class="blog-card-media"><img src="../images/hmen.jpg" alt="Rutina de bienestar para hombres" width="600" height="375" loading="lazy" decoding="async"></div><div class="blog-card-body"><span class="blog-card-cat">Bienestar</span><h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">Rutina de bienestar para hombres</h3><p class="ui-text" style="margin-bottom:12px;">Combina H-MEN con ejercicio regular, hidratación y descanso como parte de un estilo de vida activo.</p><span class="blog-card-date">Febrero 2026</span></div></article>
                    <article class="blog-card fu"><div class="blog-card-media"><img src="../images/sens.jpg" alt="Apoyo nutricional diario" width="600" height="375" loading="lazy" decoding="async"></div><div class="blog-card-body"><span class="blog-card-cat">Salud</span><h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">Apoyo nutricional para el día a día</h3><p class="ui-text" style="margin-bottom:12px;">SENS HERBALIS y hábitos saludables pueden acompañar tu rutina de bienestar integral.</p><span class="blog-card-date">Enero 2026</span></div></article>
                </div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>

        ${generateIngredientsSectionHtml()}

        <section class="section" id="calidad">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Calidad e ingredientes</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Estándares que <em>Puedes Confiar</em></h2>
                    <p class="ui-text fu" style="max-width:560px;margin:20px auto 0;">Seleccionamos ingredientes con estándares internacionales de pureza y trazabilidad.</p>
                </div>
                <div class="grid-4">
                    <article class="family-card fu" style="text-align:center;">
                        <span class="family-card-icon" aria-hidden="true">🔬</span>
                        <h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">Pureza verificada</h3>
                        <p class="ui-text">Controles de laboratorio en cada lote orientados a verificar pureza y ausencia de contaminantes.</p>
                    </article>
                    <article class="family-card fu" style="text-align:center;">
                        <span class="family-card-icon" aria-hidden="true">🌿</span>
                        <h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">Origen natural</h3>
                        <p class="ui-text">Extractos herbales y nutrientes de fuentes naturales seleccionadas.</p>
                    </article>
                    <article class="family-card fu" style="text-align:center;">
                        <span class="family-card-icon" aria-hidden="true">📋</span>
                        <h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">Etiquetado claro</h3>
                        <p class="ui-text">Información transparente de ingredientes, dosis y modo de uso en cada producto.</p>
                    </article>
                    <article class="family-card fu" style="text-align:center;">
                        <span class="family-card-icon" aria-hidden="true">🏆</span>
                        <h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">Marca líder</h3>
                        <p class="ui-text">Hinode: décadas de experiencia en bienestar y nutrición en Latinoamérica.</p>
                    </article>
                </div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>

        <section class="section" id="comparador">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Herramienta</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Comparador de <em>Productos</em></h2>
                </div>
                ${generateCompareHtml()}
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>

        <section class="section section-alt" id="testimonios">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Reseñas</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Lo que dicen nuestros <em>clientes</em></h2>
                    <p class="sec-label fu" style="margin-top:12px;">* La experiencia individual puede variar. Los testimonios son opiniones personales y no constituyen asesoría médica.</p>
                </div>
                <div class="testimonial-carousel" id="testimonialCarousel">
                    <div class="testimonial-slide is-active"><div class="testimonial-stars" aria-hidden="true">★★★★★</div><p class="ui-text" style="font-style:italic;margin-bottom:16px;">"Hiber Hake Chocolate cambió mis mañanas. Tengo más energía, me siento saciada hasta el mediodía y el sabor es increíble. Ya no salto el desayuno."</p><p class="sec-label">— Laura M. · Hiber Hake Chocolate</p></div>
                    <div class="testimonial-slide"><div class="testimonial-stars" aria-hidden="true">★★★★★</div><p class="ui-text" style="font-style:italic;margin-bottom:16px;">"H-MEN es parte de mi rutina diaria. Llevo 3 meses y noto más vitalidad en el trabajo y el gym. Excelente precio para la calidad Hinode."</p><p class="sec-label">— Ricardo S. · H-MEN</p></div>
                    <div class="testimonial-slide"><div class="testimonial-stars" aria-hidden="true">★★★★★</div><p class="ui-text" style="font-style:italic;margin-bottom:16px;">"SENS HERBALIS forma parte de mi rutina diaria. En temporadas de cambio de clima me da tranquilidad como complemento de mis hábitos saludables."</p><p class="sec-label">— Patricia G. · SENS HERBALIS</p></div>
                    <div class="testimonial-slide"><div class="testimonial-stars" aria-hidden="true">★★★★☆</div><p class="ui-text" style="font-style:italic;margin-bottom:16px;">"Probé los tres sabores de Hiber Hake. Mi favorito es fresa post-entreno. La asesoría por WhatsApp fue muy útil para elegir."</p><p class="sec-label">— Daniel A. · Hiber Hake Fresa</p></div>
                </div>
                <div class="testimonial-dots" id="testimonialDots" role="tablist" aria-label="Testimonios">
                    <button type="button" class="testimonial-dot is-active" aria-selected="true" aria-label="Testimonio 1"></button>
                    <button type="button" class="testimonial-dot" aria-selected="false" aria-label="Testimonio 2"></button>
                    <button type="button" class="testimonial-dot" aria-selected="false" aria-label="Testimonio 3"></button>
                    <button type="button" class="testimonial-dot" aria-selected="false" aria-label="Testimonio 4"></button>
                </div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>

        <section class="section" id="faq">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Ayuda</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Preguntas <em>Frecuentes</em></h2>
                </div>
                <div class="faq-list fu" role="list">${faqHtml}</div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>

        ${generateLegalDisclaimerSection()}

        <section class="section section-alt" id="contacto">
            <div class="container">
                <p class="sec-label fu" style="margin-bottom:16px;">Asesoría personalizada</p>
                <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);margin-bottom:20px;">¿Necesitas <em>orientación</em>?</h2>
                <p class="ui-text fu" style="max-width:600px;margin-bottom:0;">Cuéntanos tu objetivo de salud y te orientamos por WhatsApp sobre suplementos Hinode. No sustituye consulta médica ni nutricional profesional.</p>
                <div class="contact-grid">
                    <div class="fu">
                        <ul class="contact-info-list">
                            <li class="ui-text">📍 Tepic, Nayarit, México</li>
                            <li class="ui-text">📞 +52 (311) 121-31-28</li>
                            <li class="ui-text">✉️ contacto@venturezone.com</li>
                            <li class="ui-text">🕒 Lun - Dom: 24 hrs (WhatsApp) · Respuesta inmediata</li>
                        </ul>
                        <p class="sec-label" style="margin-top:16px;">💳 Aceptamos transferencia, efectivo y tarjeta · Envío gratis +$500</p>
                        <div class="social-links">
                            <a href="https://www.facebook.com/profile.php?id=100083406701528" class="social-link" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook"><img src="../images/facebook.png" alt="" width="24" height="24" loading="lazy" decoding="async"></a>
                            <a href="https://instagram.com/venturezone" class="social-link" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram"><img src="../images/instagram.jpg" alt="" width="24" height="24" loading="lazy" decoding="async"></a>
                            <a href="https://wa.me/523111213128" class="social-link" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp"><img src="../images/Whatapps.jpg" alt="" width="24" height="24" loading="lazy" decoding="async"></a>
                        </div>
                    </div>
                    <div class="fu reservation-form-col">
                    <form class="reservation-form" id="contactForm" novalidate>
                        <div class="field-wrap">
                            <label class="sec-label" style="display:block;margin-bottom:8px;" for="nombre">Nombre completo <span aria-hidden="true">*</span></label>
                            <input type="text" class="f-input" id="nombre" name="nombre" required placeholder="Tu nombre" autocomplete="name" aria-describedby="nombre-error">
                            <span class="field-error" id="nombre-error" role="alert"></span>
                        </div>
                        <div class="field-wrap field-wrap--split">
                            <div>
                                <label class="sec-label" style="display:block;margin-bottom:8px;" for="telefono">Teléfono <span aria-hidden="true">*</span></label>
                                <input type="tel" class="f-input" id="telefono" name="telefono" required placeholder="+52 311 000 0000" autocomplete="tel" aria-describedby="telefono-error">
                                <span class="field-error" id="telefono-error" role="alert"></span>
                            </div>
                            <div>
                                <label class="sec-label" style="display:block;margin-bottom:8px;" for="email">Email</label>
                                <input type="email" class="f-input" id="email" name="email" placeholder="tu@email.com" autocomplete="email" aria-describedby="email-error">
                                <span class="field-error" id="email-error" role="alert"></span>
                            </div>
                        </div>
                        <div class="field-wrap">
                            <label class="sec-label" style="display:block;margin-bottom:8px;" for="objetivoSalud">¿Cuál es tu objetivo de salud? <span aria-hidden="true">*</span></label>
                            <select class="f-input" id="objetivoSalud" name="objetivoSalud" required aria-describedby="objetivoSalud-error" style="cursor:pointer;">
                                <option value="">Selecciona una opción</option>
                                <option value="Energía y vitalidad">Energía y vitalidad</option>
                                <option value="Apoyar bienestar diario">Apoyar bienestar diario</option>
                                <option value="Nutrición / control de peso">Nutrición / control de peso</option>
                                <option value="Bienestar masculino">Bienestar masculino</option>
                                <option value="Bienestar diario">Bienestar diario</option>
                                <option value="Rendimiento deportivo">Rendimiento deportivo</option>
                                <option value="No estoy seguro/a">No estoy seguro/a</option>
                            </select>
                            <span class="field-error" id="objetivoSalud-error" role="alert"></span>
                        </div>
                        <div class="field-wrap field-wrap--split">
                            <div>
                                <label class="sec-label" style="display:block;margin-bottom:8px;" for="presupuesto">Presupuesto aproximado</label>
                                <select class="f-input" id="presupuesto" name="presupuesto" style="cursor:pointer;">
                                    <option value="">Selecciona rango</option>
                                    <option value="Hasta $150">Hasta $150</option>
                                    <option value="$150 – $300">$150 – $300</option>
                                    <option value="$300 – $500">$300 – $500</option>
                                    <option value="Más de $500">Más de $500</option>
                                </select>
                            </div>
                            <div>
                                <label class="sec-label" style="display:block;margin-bottom:8px;" for="paraQuien">¿Para quién es? <span aria-hidden="true">*</span></label>
                                <select class="f-input" id="paraQuien" name="paraQuien" required aria-describedby="paraQuien-error" style="cursor:pointer;">
                                    <option value="">Selecciona</option>
                                    <option value="Para mí (mujer)">Para mí (mujer)</option>
                                    <option value="Para mí (hombre)">Para mí (hombre)</option>
                                    <option value="Para toda la familia">Para toda la familia</option>
                                    <option value="Regalo">Regalo</option>
                                </select>
                                <span class="field-error" id="paraQuien-error" role="alert"></span>
                            </div>
                        </div>
                        <div class="field-wrap">
                            <label class="sec-label" style="display:block;margin-bottom:8px;" for="productoInteres">Producto de interés</label>
                            <select class="f-input" id="productoInteres" name="productoInteres" style="cursor:pointer;">
                                <option value="">Selecciona (opcional)</option>
                                <option value="Hiber Hake — Chocolate">Hiber Hake — Chocolate</option>
                                <option value="Hiber Hake — Vainilla">Hiber Hake — Vainilla</option>
                                <option value="Hiber Hake — Fresa">Hiber Hake — Fresa</option>
                                <option value="H-MEN">H-MEN</option>
                                <option value="SENS HERBALIS">SENS HERBALIS</option>
                                <option value="Necesito recomendación">Necesito recomendación</option>
                            </select>
                        </div>
                        <div class="field-wrap" style="margin-bottom:24px;">
                            <label class="sec-label" style="display:block;margin-bottom:8px;" for="mensaje">Mensaje adicional</label>
                            <textarea class="f-input" id="mensaje" name="mensaje" placeholder="Alergias, medicamentos, objetivos específicos…" aria-describedby="mensaje-error"></textarea>
                            <span class="field-error" id="mensaje-error" role="alert"></span>
                        </div>
                        <button type="submit" class="btn-p" id="contactSubmitBtn" style="width:100%;">Consultar por WhatsApp</button>
                        <p class="sec-label" style="margin-top:12px;text-align:center;">Al enviar, se abrirá WhatsApp con tu consulta. No sustituye consulta médica.</p>
                    </form>
                    <div class="reservation-success" id="contactSuccess" hidden role="status" aria-live="polite">
                        <div class="reservation-success-icon" aria-hidden="true">✓</div>
                        <h3 class="h-mix" style="font-size:1.2rem;margin-bottom:12px;">¡Consulta enviada!</h3>
                        <p class="ui-text" style="margin-bottom:24px;">Se abrió WhatsApp con los datos de tu consulta. Te responderemos pronto.</p>
                        <button type="button" class="btn-s" id="contactResetBtn">Hacer otra consulta</button>
                    </div>
                    </div>
                </div>
            </div>
            ${SECTION_HEALTH_DISCLAIMER}
        </section>
    </main>`;

fs.writeFileSync(OUT, main, 'utf8');
fs.writeFileSync(path.join(__dirname, 'suplementos-data.json'), JSON.stringify(SUPLEMENTOS, null, 2), 'utf8');
const filterLabels = {
  category: categoryLabels,
  goal: goalLabels,
  format: formatLabels,
  gender: genderLabels,
  certification: certificationLabels,
  price: { '0-150': 'Hasta $150', '150-300': '$150 – $300', '300-500': '$300 – $500', '500+': '$500 o más' },
};
fs.writeFileSync(path.join(__dirname, 'suplementos-filter-labels.json'), JSON.stringify(filterLabels, null, 2), 'utf8');
console.log('Generated:', OUT);
console.log('Generated:', path.join(__dirname, 'suplementos-data.json'));
console.log('Generated:', path.join(__dirname, 'suplementos-filter-labels.json'));
