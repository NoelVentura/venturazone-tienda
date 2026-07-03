import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'areaperfumes-main.html');

const occasionLabels = { diario: 'día a día', noche: 'noches y citas', especial: 'eventos especiales', deportivo: 'deporte y aire libre', oficina: 'oficina y reuniones' };

const PERFUMES = [
  { id: 'product1', num: 1, name: 'Vibez masculina', line: 'Vibez', tagline: 'Maderas nobles al caer la noche',
    desc: 'Un abrazo de maderas nobles al caer la noche: bergamota chispeante y cardamomo especiado abren con energía masculina, cediendo a un corazón de cedro y vetiver que evoca confianza y presencia. Ámbar y sándalo dejan una estela cálida que perdura con elegancia — ideal para salidas nocturnas donde quieres dejar huella.',
    duration: '6–8 h', projection: 'moderada a intensa', price: 760, img: 'VIBEZI.jpg', gender: 'masculino', family: 'amaderado', occasion: 'noche', season: 'invierno', type: 'Eau de Parfum', rating: 5, featured: false, notes: { top: 'Bergamota, cardamomo', heart: 'Cedro, vetiver', base: 'Ámbar, sándalo' } },
  { id: 'product2', num: 2, name: 'Vibez Femenina', line: 'Vibez', tagline: 'Dulzura luminosa y vibrante',
    desc: 'Como un rayo de sol sobre frutos maduros: mandarina y frutos rojos estallan con alegría antes de revelar un corazón de jazmín y rosa que acaricia los sentidos. Vainilla y almizcle envuelven la piel en un abrazo dulce y radiante — perfecta para iluminar tu rutina diaria con una estela suave que acompaña sin abrumar.',
    duration: '6–7 h', projection: 'suave a moderada', price: 760, img: 'VIBEZIFEM.jpg', gender: 'femenino', family: 'dulce', occasion: 'diario', season: 'todo', type: 'Eau de Parfum', rating: 5, featured: false, notes: { top: 'Frutas rojas, mandarina', heart: 'Jazmín, rosa', base: 'Vainilla, almizcle' } },
  { id: 'product3', num: 3, name: 'Latitud Masculino y Femenino', line: 'Latitud', tagline: 'Magnetismo bajo luces tenues',
    desc: 'Una fragancia que despierta los sentidos con pimienta rosa y bergamota vibrante, evocando encuentros íntimos bajo luces tenues. Lavanda y geranio florecen en el corazón con sensualidad equilibrada, mientras pachulí y ámbar dibujan una estela magnética — seductora, unisex y memorable en cada paso.',
    duration: '7–8 h', projection: 'moderada a intensa', price: 820, img: 'LATTITUDE.jpg', gender: 'unisex', family: 'oriental', occasion: 'noche', season: 'todo', type: 'Eau de Parfum', rating: 5, featured: true, notes: { top: 'Pimienta rosa, bergamota', heart: 'Lavanda, geranio', base: 'Pachulí, ámbar' } },
  { id: 'product4', num: 4, name: 'Latitud Masculino y Femenino', line: 'Latitud', tagline: 'Elegancia de bosque al amanecer',
    desc: 'La elegancia de un bosque al amanecer: limón fresco y nuez moscada abren con luminosidad, cediendo a cedro e iris de profundidad aristocrática. Vetiver y musgo en el fondo crean una firma amaderada envolvente — pensada para bodas, galas y veladas donde cada detalle importa.',
    duration: '7–8 h', projection: 'moderada', price: 820, img: 'LATTITUDE2.jpg', gender: 'unisex', family: 'amaderado', occasion: 'especial', season: 'invierno', type: 'Eau de Parfum', rating: 5, featured: false, notes: { top: 'Limón, nuez moscada', heart: 'Cedro, iris', base: 'Vetiver, musgo' } },
  { id: 'product5', num: 5, name: 'Grace Midnight', line: 'Grace', tagline: 'Dulzura de una noche de confianza',
    desc: 'La dulzura de una noche de confianza: pera jugosa y cítricos luminosos dan la bienvenida a un corazón de rosa y jazmín que susurra feminidad. Vainilla y praliné envuelven como un regalo gourmet, dejando una estela adictiva y cálida — perfecta para citas románticas y noches que merecen ser recordadas.',
    duration: '6–8 h', projection: 'moderada a intensa', price: 845, img: 'GRAVEMIDNIGHT.jpg', gender: 'femenino', family: 'dulce', occasion: 'noche', season: 'invierno', type: 'Eau de Parfum', rating: 5, featured: true, notes: { top: 'Pera, cítricos', heart: 'Rosa, jazmín', base: 'Vainilla, praliné' } },
  { id: 'product6', num: 6, name: 'Grace Rose', line: 'Grace', tagline: 'Un jardín de rosas al amanecer',
    desc: 'Un jardín de rosas al amanecer: bergamota y aldehídos cristalinos abren con frescura aristocrática antes de que rosa y peonía florezcan en el corazón. Musgo y pachulí aportan una base chipre elegante que perdura con distinción — la fragancia ideal para bodas, celebraciones y momentos en que quieres dejar una huella inolvidable.',
    duration: '7–8 h', projection: 'moderada', price: 845, img: 'GRACEROSE.jpg', gender: 'femenino', family: 'floral', occasion: 'especial', season: 'todo', type: 'Eau de Parfum', rating: 5, featured: true, notes: { top: 'Bergamota, aldehídos', heart: 'Rosa, peonía', base: 'Musgo, pachulí' } },
  { id: 'product7', num: 7, name: 'Grace Rose Absoluto', line: 'Grace', tagline: 'La rosa en su máxima expresión',
    desc: 'La rosa en su máxima expresión: rosa búlgara y grosella estallan como pétalos recién cortados, profundizándose en rosa absoluta e iris de una riqueza sin igual. Sándalo y ámbar gris dejan una estela opulenta y sofisticada — una firma floral absoluta para quien busca exclusividad, lujo sensorial y presencia que trasciende el tiempo.',
    duration: '8+ h', projection: 'intensa', price: 1352, img: 'GRACEROSEROJO.jpg', gender: 'femenino', family: 'floral', occasion: 'especial', season: 'todo', type: 'Eau de Parfum', rating: 5, featured: true, notes: { top: 'Rosa búlgara, grosella', heart: 'Rosa absoluta, iris', base: 'Sándalo, ámbar gris' } },
  { id: 'product8', num: 8, name: 'INEBRIANTE', line: 'Inebriante', tagline: 'Potencia y refinamiento masculino',
    desc: 'Potencia y refinamiento en un solo frasco: limón italiano y lavanda fresca abren con energía decidida, cediendo a geranio y cedro de carácter inconfundible. Ámbar y cuero en el fondo construyen una estela intensa y memorable — para el hombre que quiere destacar en cada habitación, con una proyección notable que evoca noches de invierno y sofisticación.',
    duration: '8+ h', projection: 'intensa', price: 1255, img: 'INEBRIANTE.jpg', gender: 'masculino', family: 'amaderado', occasion: 'noche', season: 'invierno', type: 'Eau de Parfum', rating: 5, featured: false, notes: { top: 'Limón, lavanda', heart: 'Geranio, cedro', base: 'Ámbar, cuero' } },
  { id: 'product9', num: 9, name: 'SPOT Masculino y Femenino', line: 'Spot', tagline: 'Frescura mediterránea radiante',
    desc: 'Frescura mediterránea en cada pulverización: naranja y mandarina soleadas dan paso a un corazón de lirio y jazmín delicado que evoca brisa costera. Madera blanca y almizcle dejan una sensación limpia y radiante — tu aliado para el día a día, el verano y quienes buscan elegancia ligera que acompaña con naturalidad.',
    duration: '4–6 h', projection: 'suave a moderada', price: 792, img: 'SPOT.jpg', gender: 'unisex', family: 'floral', occasion: 'diario', season: 'verano', type: 'Eau de Toilette', rating: 4, featured: false, notes: { top: 'Naranja, mandarina', heart: 'Lirio, jazmín', base: 'Madera blanca, almizcle' } },
  { id: 'product10', num: 10, name: 'Feeling Sexy', line: 'Feeling', tagline: 'Magnetismo en estado puro',
    desc: 'Magnetismo en estado puro: bergamota y pimienta despiertan la piel con chispa seductora, mientras rosa y cedro entrelazan sensualidad y fuerza en perfecto equilibrio. Vainilla y ámbar cierran con calidez adictiva — una fragancia unisex para noches de química irresistible, donde cada nota invita a acercarse un poco más.',
    duration: '6–7 h', projection: 'moderada a intensa', price: 877, img: 'FEELING.jpg', gender: 'unisex', family: 'amaderado', occasion: 'noche', season: 'todo', type: 'Eau de Parfum', rating: 5, featured: false, notes: { top: 'Bergamota, pimienta', heart: 'Rosa, cedro', base: 'Vainilla, ámbar' } },
  { id: 'product11', num: 11, name: 'Empire Woman', line: 'Empire', tagline: 'Elegancia imperial en femenino',
    desc: 'Elegancia imperial en femenino: bergamota y frutas brillantes abren con distinción antes de que rosa e ylang-ylang florezcan con gracia atemporal. Musgo y vainilla en el fondo crean una silueta chipre sofisticada — pensada para eventos, reuniones importantes y momentos en que tu presencia habla antes que tú.',
    duration: '7–8 h', projection: 'moderada', price: 915, img: 'EMPIREWOMAN.jpg', gender: 'femenino', family: 'floral', occasion: 'especial', season: 'todo', type: 'Eau de Parfum', rating: 5, featured: false, notes: { top: 'Bergamota, frutas', heart: 'Rosa, ylang-ylang', base: 'Musgo, vainilla' } },
  { id: 'product12', num: 12, name: 'Empire Man', line: 'Empire', tagline: 'Confianza del hombre contemporáneo',
    desc: 'La confianza del hombre contemporáneo: limón vibrante y lavanda fresca abren con claridad, evocando mañanas decisivas y aire limpio. Geranio y especias aportan carácter en el corazón, mientras cedro y vetiver cierran con una base amaderada discreta pero presente — ideal para la oficina, reuniones y el día a día con distinción.',
    duration: '6–8 h', projection: 'moderada', price: 915, img: 'EMPIREHOMBRE.jpg', gender: 'masculino', family: 'amaderado', occasion: 'oficina', season: 'todo', type: 'Eau de Parfum', rating: 5, featured: false, notes: { top: 'Limón, lavanda', heart: 'Geranio, especias', base: 'Cedro, vetiver' } },
  { id: 'product13', num: 13, name: 'Empire Sport y Gold', line: 'Empire', tagline: 'Energía pura en movimiento',
    desc: 'Energía pura en movimiento: limón chispeante y menta revitalizante despiertan los sentidos como una brisa fresca tras el ejercicio. Jengibre y especias en el corazón aportan vitalidad, mientras madera y almizcle dejan una estela limpia y dinámica — tu compañero ideal para el gym, el verano y rutinas activas que exigen frescura constante.',
    duration: '4–5 h', projection: 'suave a moderada', price: 915, img: 'EMPIRESPORT.jpg', gender: 'unisex', family: 'fresco', occasion: 'deportivo', season: 'verano', type: 'Eau de Toilette', rating: 4, featured: false, notes: { top: 'Limón, menta', heart: 'Jengibre, especias', base: 'Madera, almizcle' } },
];

const familyLabels = { floral: 'Floral', amaderado: 'Amaderado', citrico: 'Cítrico', oriental: 'Oriental', fresco: 'Fresco', dulce: 'Dulce' };
const familyCounts = {};
PERFUMES.forEach(p => { familyCounts[p.family] = (familyCounts[p.family] || 0) + 1; });

function stars(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }
function esc(s) { return s.replace(/'/g, "\\'").replace(/"/g, '&quot;'); }

function typeSlug(t) {
  const map = { 'Eau de Parfum': 'edp', 'Eau de Toilette': 'edt', 'Colonia': 'colonia' };
  return map[t] || t.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function filterCheckbox(group, value, label, extraClass = '') {
  return `<label class="filter-check ${extraClass}"><input type="checkbox" class="filter-input" data-filter-group="${group}" value="${value}"><span class="filter-check-label">${label}</span></label>`;
}

function familyCheckbox(value, label) {
  return `<label class="filter-check filter-check--family filter-check--${value}"><input type="checkbox" class="filter-input" data-filter-group="family" value="${value}"><span class="filter-dot" aria-hidden="true"></span><span class="filter-check-label">${label}</span></label>`;
}

function generateQuizHtml() {
  return `
                <div class="quiz-panel fu" id="perfumeQuiz">
                    <div class="quiz-progress-wrap" id="quizProgressWrap">
                        <div class="quiz-progress-header">
                            <span class="sec-label" id="quizProgressLabel">Pregunta 1 de 5</span>
                            <span class="sec-label" id="quizProgressPct">20%</span>
                        </div>
                        <div class="quiz-progress-track" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso del quiz">
                            <div class="quiz-progress-fill" id="quizProgressFill" style="width:20%"></div>
                        </div>
                    </div>

                    <div class="quiz-body" id="quizBody">
                        <div class="quiz-step is-active" data-step="0" data-q="gender">
                            <h3 class="h-mix quiz-step-title">¿Para quién es el <em>perfume</em>?</h3>
                            <p class="ui-text quiz-step-hint">Selecciona el perfil que mejor describe al destinatario.</p>
                            <div class="quiz-options">
                                <button type="button" class="quiz-option" data-value="femenino"><span class="quiz-option-icon" aria-hidden="true">👩</span><span class="quiz-option-text"><strong>Mujer</strong><span class="quiz-option-desc">Fragancias femeninas y elegantes</span></span></button>
                                <button type="button" class="quiz-option" data-value="masculino"><span class="quiz-option-icon" aria-hidden="true">👨</span><span class="quiz-option-text"><strong>Hombre</strong><span class="quiz-option-desc">Aromas masculinos con carácter</span></span></button>
                                <button type="button" class="quiz-option" data-value="unisex"><span class="quiz-option-icon" aria-hidden="true">✨</span><span class="quiz-option-text"><strong>Unisex</strong><span class="quiz-option-desc">Versátiles para cualquier persona</span></span></button>
                            </div>
                        </div>
                        <div class="quiz-step" data-step="1" data-q="occasion">
                            <h3 class="h-mix quiz-step-title">¿Qué ocasión <em>principal</em>?</h3>
                            <p class="ui-text quiz-step-hint">Elige el momento en que usarás la fragancia con más frecuencia.</p>
                            <div class="quiz-options">
                                <button type="button" class="quiz-option" data-value="diario"><span class="quiz-option-icon" aria-hidden="true">💼</span><span class="quiz-option-text"><strong>Día a día</strong><span class="quiz-option-desc">Ligera y versátil para tu rutina</span></span></button>
                                <button type="button" class="quiz-option" data-value="noche"><span class="quiz-option-icon" aria-hidden="true">🌙</span><span class="quiz-option-text"><strong>Noche</strong><span class="quiz-option-desc">Seductora e intensa para salidas</span></span></button>
                                <button type="button" class="quiz-option" data-value="especial"><span class="quiz-option-icon" aria-hidden="true">👰</span><span class="quiz-option-text"><strong>Especial</strong><span class="quiz-option-desc">Bodas, eventos y momentos únicos</span></span></button>
                                <button type="button" class="quiz-option" data-value="deportivo"><span class="quiz-option-icon" aria-hidden="true">🏃</span><span class="quiz-option-text"><strong>Deportivo</strong><span class="quiz-option-desc">Fresca y energizante</span></span></button>
                            </div>
                        </div>
                        <div class="quiz-step" data-step="2" data-q="family">
                            <h3 class="h-mix quiz-step-title">¿Qué familia olfativa <em>prefieres</em>?</h3>
                            <p class="ui-text quiz-step-hint">Cada familia tiene un carácter aromático distintivo.</p>
                            <div class="quiz-options quiz-options--family">
                                <button type="button" class="quiz-option quiz-option--rich" data-value="floral"><span class="quiz-option-icon" aria-hidden="true">🌸</span><span class="quiz-option-text"><strong>Floral</strong><span class="quiz-option-desc">Romántico y delicado. Rosa, jazmín, peonía.</span></span></button>
                                <button type="button" class="quiz-option quiz-option--rich" data-value="amaderado"><span class="quiz-option-icon" aria-hidden="true">🌲</span><span class="quiz-option-text"><strong>Amaderado</strong><span class="quiz-option-desc">Cálido y sofisticado. Cedro, sándalo, vetiver.</span></span></button>
                                <button type="button" class="quiz-option quiz-option--rich" data-value="dulce"><span class="quiz-option-icon" aria-hidden="true">🍯</span><span class="quiz-option-text"><strong>Dulce / Gourmand</strong><span class="quiz-option-desc">Adictivo y envolvente. Vainilla, caramelo, praliné.</span></span></button>
                                <button type="button" class="quiz-option quiz-option--rich" data-value="fresco"><span class="quiz-option-icon" aria-hidden="true">🌊</span><span class="quiz-option-text"><strong>Fresco / Acuático</strong><span class="quiz-option-desc">Ligero y revitalizante. Brisa marina y menta.</span></span></button>
                                <button type="button" class="quiz-option quiz-option--rich" data-value="oriental"><span class="quiz-option-icon" aria-hidden="true">🌶️</span><span class="quiz-option-text"><strong>Oriental</strong><span class="quiz-option-desc">Exótico y especiado. Ámbar, vainilla, especias.</span></span></button>
                            </div>
                        </div>
                        <div class="quiz-step" data-step="3" data-q="intensity">
                            <h3 class="h-mix quiz-step-title">¿Qué intensidad <em>prefieres</em>?</h3>
                            <p class="ui-text quiz-step-hint">Define qué tan presente quieres que sea tu fragancia.</p>
                            <div class="quiz-options">
                                <button type="button" class="quiz-option" data-value="suave"><span class="quiz-option-icon" aria-hidden="true">🍃</span><span class="quiz-option-text"><strong>Suave</strong><span class="quiz-option-desc">Discreta, cercana a la piel</span></span></button>
                                <button type="button" class="quiz-option" data-value="moderada"><span class="quiz-option-icon" aria-hidden="true">🌿</span><span class="quiz-option-text"><strong>Moderada</strong><span class="quiz-option-desc">Equilibrada, perceptible sin abrumar</span></span></button>
                                <button type="button" class="quiz-option" data-value="intensa"><span class="quiz-option-icon" aria-hidden="true">🔥</span><span class="quiz-option-text"><strong>Intensa</strong><span class="quiz-option-desc">Marcada, con gran proyección</span></span></button>
                            </div>
                        </div>
                        <div class="quiz-step" data-step="4" data-q="budget">
                            <h3 class="h-mix quiz-step-title">¿Cuál es tu <em>presupuesto</em>?</h3>
                            <p class="ui-text quiz-step-hint">Te recomendaremos opciones dentro de tu rango de precio.</p>
                            <div class="quiz-options">
                                <button type="button" class="quiz-option" data-value="0-800"><span class="quiz-option-text"><strong>Hasta $800</strong><span class="quiz-option-desc">Vibez, SPOT, opciones accesibles</span></span></button>
                                <button type="button" class="quiz-option" data-value="800-1000"><span class="quiz-option-text"><strong>$800 – $1,000</strong><span class="quiz-option-desc">Latitud, Grace, Empire, Feeling</span></span></button>
                                <button type="button" class="quiz-option" data-value="1000-1200"><span class="quiz-option-text"><strong>$1,000 – $1,200</strong><span class="quiz-option-desc">INEBRIANTE y fragancias premium</span></span></button>
                                <button type="button" class="quiz-option" data-value="1200+"><span class="quiz-option-text"><strong>Más de $1,200</strong><span class="quiz-option-desc">Grace Rose Absoluto y exclusivos</span></span></button>
                            </div>
                        </div>
                    </div>

                    <div class="quiz-nav">
                        <button type="button" class="btn-s" id="quizPrevBtn" disabled aria-label="Pregunta anterior">← Anterior</button>
                    </div>

                    <div class="quiz-results" id="quizResults" hidden>
                        <div class="quiz-results-header">
                            <span class="quiz-results-icon" aria-hidden="true">✨</span>
                            <h3 class="h-mix" style="font-size:1.2rem;margin-bottom:8px;">Tus <em>fragancias ideales</em></h3>
                            <p class="ui-text" id="quizResultsSubtitle">Basado en tus preferencias, estas son nuestras mejores recomendaciones.</p>
                        </div>
                        <div class="quiz-results-grid" id="quizResultsList"></div>
                        <div class="quiz-results-actions">
                            <button type="button" class="btn-s" id="quizRestartBtn">↺ Hacer quiz de nuevo</button>
                            <button type="button" class="btn-p" id="quizShareBtn">Compartir resultados</button>
                            <a href="#coleccion" class="btn-s">Ver colección completa</a>
                        </div>
                    </div>
                </div>`;
}

function generatePyramidHtml() {
  const examples = [
    PERFUMES.find(p => p.id === 'product6'),
    PERFUMES.find(p => p.id === 'product8'),
    PERFUMES.find(p => p.id === 'product3'),
    PERFUMES.find(p => p.id === 'product1'),
  ].filter(Boolean);

  const exampleBtns = examples.map((p, i) =>
    `<button type="button" class="olfactory-example-btn${i === 0 ? ' is-active' : ''}" data-perfume-id="${p.id}" aria-pressed="${i === 0 ? 'true' : 'false'}">
      <img src="../images/${p.img}" alt="" width="32" height="40" loading="lazy" decoding="async">
      <span>${p.name}</span>
    </button>`
  ).join('');

  return `
                <div class="olfactory-pyramid-wrap fu">
                    <div class="olfactory-pyramid-layout">
                        <div class="olfactory-pyramid-visual" id="pyramidTriangle" role="tablist" aria-label="Niveles de la pirámide olfativa">
                            <button type="button" role="tab" class="olfactory-layer olfactory-layer--top is-active" data-tier="top" aria-selected="true" aria-controls="pyramidPanel">
                                <span class="olfactory-layer-inner">
                                    <span class="olfactory-layer-icon" aria-hidden="true">✨</span>
                                    <span class="olfactory-layer-title">Notas de Salida</span>
                                    <span class="olfactory-layer-time">0 – 15 min</span>
                                </span>
                            </button>
                            <button type="button" role="tab" class="olfactory-layer olfactory-layer--heart" data-tier="heart" aria-selected="false" aria-controls="pyramidPanel">
                                <span class="olfactory-layer-inner">
                                    <span class="olfactory-layer-icon" aria-hidden="true">🌸</span>
                                    <span class="olfactory-layer-title">Notas de Corazón</span>
                                    <span class="olfactory-layer-time">2 – 4 h</span>
                                </span>
                            </button>
                            <button type="button" role="tab" class="olfactory-layer olfactory-layer--base" data-tier="base" aria-selected="false" aria-controls="pyramidPanel">
                                <span class="olfactory-layer-inner">
                                    <span class="olfactory-layer-icon" aria-hidden="true">💎</span>
                                    <span class="olfactory-layer-title">Notas de Fondo</span>
                                    <span class="olfactory-layer-time">6+ h</span>
                                </span>
                            </button>
                        </div>
                        <div class="olfactory-pyramid-panel" id="pyramidPanel" role="tabpanel" aria-live="polite">
                            <div class="olfactory-panel-content" id="pyramidPanelContent"></div>
                        </div>
                    </div>
                    <div class="olfactory-pyramid-examples">
                        <p class="sec-label" style="margin-bottom:16px;text-align:center;">Ejemplos con perfumes de nuestra colección</p>
                        <div class="olfactory-example-picker" id="pyramidExamplePicker" role="group" aria-label="Seleccionar perfume de ejemplo">${exampleBtns}</div>
                    </div>
                </div>`;
}

function generateFiltersHtml(total) {
  const genders = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'unisex', label: 'Unisex' },
  ];
  const families = [
    { value: 'floral', label: 'Floral' },
    { value: 'amaderado', label: 'Amaderado' },
    { value: 'citrico', label: 'Cítrico' },
    { value: 'oriental', label: 'Oriental' },
    { value: 'fresco', label: 'Fresco / Acuático' },
    { value: 'dulce', label: 'Dulce / Gourmand' },
  ];
  const types = [...new Set(PERFUMES.map(p => p.type))].sort();
  const occasions = [
    { value: 'diario', label: 'Día a día' },
    { value: 'noche', label: 'Noche' },
    { value: 'especial', label: 'Eventos especiales' },
    { value: 'deportivo', label: 'Deporte' },
    { value: 'oficina', label: 'Oficina / Trabajo' },
  ];
  const priceRanges = [
    { value: '0-800', label: 'Hasta $800' },
    { value: '800-900', label: '$800 – $900' },
    { value: '900-1200', label: '$900 – $1,200' },
    { value: '1200+', label: 'Más de $1,200' },
  ];
  const brands = [...new Set(PERFUMES.map(p => p.line))].sort();

  const groups = `
    <fieldset class="filter-group">
      <legend class="filter-group-title">Género</legend>
      <div class="filter-group-options">${genders.map(g => filterCheckbox('gender', g.value, g.label)).join('')}</div>
    </fieldset>
    <fieldset class="filter-group">
      <legend class="filter-group-title">Familia olfativa</legend>
      <div class="filter-group-options filter-group-options--family">${families.map(f => familyCheckbox(f.value, f.label)).join('')}</div>
    </fieldset>
    <fieldset class="filter-group">
      <legend class="filter-group-title">Tipo</legend>
      <div class="filter-group-options">${types.map(t => filterCheckbox('type', typeSlug(t), t)).join('')}</div>
    </fieldset>
    <fieldset class="filter-group">
      <legend class="filter-group-title">Precio</legend>
      <div class="filter-group-options">${priceRanges.map(r => filterCheckbox('price', r.value, r.label, 'filter-check--price')).join('')}</div>
      <div class="filter-price-slider-wrap">
        <label class="sec-label" for="filterPriceMin">Rango personalizado</label>
        <div class="filter-price-slider-labels">
          <span id="filterPriceMinLabel">$760</span>
          <span id="filterPriceMaxLabel">$1,352</span>
        </div>
        <div class="filter-price-slider-inputs">
          <input type="range" class="filter-price-range" id="filterPriceMin" min="760" max="1352" step="10" value="760" aria-label="Precio mínimo">
          <input type="range" class="filter-price-range" id="filterPriceMax" min="760" max="1352" step="10" value="1352" aria-label="Precio máximo">
        </div>
        <label class="filter-check filter-check--slider-toggle">
          <input type="checkbox" class="filter-input" id="filterPriceSliderActive" data-filter-group="priceSlider" value="active">
          <span class="filter-check-label">Usar rango personalizado</span>
        </label>
      </div>
    </fieldset>
    <fieldset class="filter-group">
      <legend class="filter-group-title">Ocasión</legend>
      <div class="filter-group-options">${occasions.map(o => filterCheckbox('occasion', o.value, o.label)).join('')}</div>
    </fieldset>
    <fieldset class="filter-group">
      <legend class="filter-group-title">Marca</legend>
      <div class="filter-group-options filter-group-options--brand">${brands.map(b => filterCheckbox('brand', b, b, 'filter-check--brand')).join('')}</div>
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
                            <p class="catalog-result-count" id="filterResultCount" aria-live="polite">Mostrando <strong>${total}</strong> de ${total} fragancias</p>
                            <div class="catalog-active-filters" id="activeFilterTags" hidden aria-label="Filtros activos"></div>
                            <button type="button" class="btn-s catalog-filters-clear" id="filterReset">Limpiar filtros</button>
                        </div>
                        <div class="grid-3 catalog-grid is-filter-ready" id="perfumesGrid">`;
}

function productCard(p) {
  const qid = p.num;
  const tSlug = typeSlug(p.type);
  const occ = occasionLabels[p.occasion] || p.occasion;
  return `<article class="perfume-card product-card fu" data-product="${esc(p.name)}" data-line="${p.line}" data-gender="${p.gender}" data-family="${p.family}" data-occasion="${p.occasion}" data-season="${p.season}" data-type="${tSlug}" data-price="${p.price}" id="card-${p.id}">
    <div class="perfume-card-media">
      <img src="../images/${p.img}" alt="${esc(p.name)} — ${esc(p.tagline || p.desc)}" width="400" height="533" loading="lazy" decoding="async">
      <div class="perfume-card-notes" aria-hidden="true">
        <strong>Salida:</strong> ${p.notes.top}<br>
        <strong>Corazón:</strong> ${p.notes.heart}<br>
        <strong>Fondo:</strong> ${p.notes.base}
      </div>
    </div>
    <div class="perfume-card-body">
      <span class="perfume-family-tag perfume-family-tag--${p.family}">${familyLabels[p.family] || p.family}</span>
      <h3 class="h-mix" style="font-size:1rem;margin-bottom:6px;">${p.name}</h3>
      <p class="sec-label" style="margin-bottom:8px;">${p.line} · ${p.type}</p>
      <p class="ui-text perfume-card-desc">${p.desc}</p>
      <p class="perfume-card-meta sec-label">Ideal para ${occ} · ${p.duration} · Proyección ${p.projection}</p>
      <p class="perfume-card-notes-preview sec-label">Notas clave: ${p.notes.top.split(',')[0].trim()}, ${p.notes.heart.split(',')[0].trim()}, ${p.notes.base.split(',')[0].trim()}</p>
      <div class="perfume-stars" aria-label="${p.rating} de 5 estrellas">${stars(p.rating)}</div>
      <p class="font-display" style="font-style:italic;font-size:1.1rem;margin:12px 0;">$${p.price.toLocaleString('es-MX')}</p>
      <div class="quantity-selector" style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:14px;">
        <button type="button" class="btn-s" style="padding:6px 12px;min-width:36px;" onclick="decreaseQuantity('${p.id}')" aria-label="Disminuir cantidad">−</button>
        <span class="sec-label" id="quantity${qid}">1</span>
        <button type="button" class="btn-s" style="padding:6px 12px;min-width:36px;" onclick="increaseQuantity('${p.id}')" aria-label="Aumentar cantidad">+</button>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button type="button" class="btn-s" style="flex:1;min-width:120px;" onclick="scrollToProduct('${p.id}')">Ver detalles</button>
        <button type="button" class="btn-p" style="flex:1;min-width:120px;" onclick="addToCart('${esc(p.name)}', ${p.price}, '${p.id}')">Comprar</button>
      </div>
    </div>
  </article>`;
}

function featuredCard(p) {
  const occ = occasionLabels[p.occasion] || p.occasion;
  return `<article class="featured-card fu">
    <div class="featured-card-media"><img src="../images/${p.img}" alt="${esc(p.name)} — ${esc(p.tagline || '')}" width="500" height="667" loading="lazy" decoding="async"></div>
    <div class="featured-card-body">
      <p class="sec-label" style="margin-bottom:8px;">${p.line} · Destacado</p>
      <h3 class="h-mix" style="font-size:1.3rem;margin-bottom:8px;">${p.name}</h3>
      <p class="ui-text" style="font-style:italic;font-size:0.72rem;color:var(--color-muted);margin-bottom:14px;">${p.tagline || ''}</p>
      <p class="ui-text" style="margin-bottom:16px;">${p.desc}</p>
      <p class="sec-label" style="margin-bottom:6px;">Pirámide olfativa</p>
      <p class="ui-text" style="font-size:0.65rem;margin-bottom:12px;">Salida: ${p.notes.top} · Corazón: ${p.notes.heart} · Fondo: ${p.notes.base}</p>
      <p class="sec-label" style="margin-bottom:16px;">Ideal para ${occ} · Duración ${p.duration} · Proyección ${p.projection}</p>
      <p class="font-display" style="font-style:italic;font-size:1.3rem;margin-bottom:20px;">$${p.price.toLocaleString('es-MX')}</p>
      <button type="button" class="btn-p" onclick="addToCart('${esc(p.name)}', ${p.price}, '${p.id}')">Comprar Ahora</button>
    </div>
  </article>`;
}

const featured = PERFUMES.filter(p => p.featured);
const productsHtml = PERFUMES.map(productCard).join('\n');
const featuredHtml = featured.map(featuredCard).join('\n');

const families = [
  { id: 'floral', icon: '🌸', name: 'Floral', desc: 'Romántico, femenino y delicado. Evoca jardines en flor.', notes: 'Rosa, jazmín, peonía', count: familyCounts.floral || 0 },
  { id: 'amaderado', icon: '🌲', name: 'Amaderado', desc: 'Cálido, profundo y sofisticado. Notas de bosque y especias.', notes: 'Cedro, sándalo, vetiver', count: familyCounts.amaderado || 0 },
  { id: 'citrico', icon: '🍋', name: 'Cítrico', desc: 'Fresco, vibrante y energizante. Ideal para el día.', notes: 'Limón, bergamota, naranja', count: familyCounts.citrico || 0 },
  { id: 'oriental', icon: '🌶️', name: 'Oriental', desc: 'Exótico, especiado y seductor. Intensidad envolvente.', notes: 'Ámbar, vainilla, especias', count: familyCounts.oriental || 0 },
  { id: 'fresco', icon: '🌊', name: 'Fresco / Acuático', desc: 'Ligero, limpio y revitalizante. Sensación de brisa marina.', notes: 'Notas acuáticas, menta, aloe', count: familyCounts.fresco || 0 },
  { id: 'dulce', icon: '🍯', name: 'Dulce / Gourmand', desc: 'Delicioso, cálido y adictivo. Notas gourmand irresistibles.', notes: 'Vainilla, caramelo, praliné', count: familyCounts.dulce || 0 },
];

const familyCards = families.map(f => `<article class="family-card fu">
  <span class="family-card-icon" aria-hidden="true">${f.icon}</span>
  <h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">${f.name}</h3>
  <p class="ui-text" style="margin-bottom:10px;">${f.desc}</p>
  <p class="sec-label">Notas típicas: ${f.notes}</p>
  <span class="family-card-count">${f.count} fragancias</span>
  <a href="#coleccion" class="btn-s" style="margin-top:16px;display:inline-block;" data-filter-family="${f.id}">Ver fragancias</a>
</article>`).join('\n');

const brands = ['Vibez', 'Latitud', 'Grace', 'Empire', 'Spot', 'Feeling', 'Inebriante', 'Hinode'];
const brandCards = brands.map(b => `<button type="button" class="brand-logo-card fu" data-brand="${b}">${b}</button>`).join('\n');

const occasions = [
  { icon: '💼', title: 'Día a día', desc: 'Fragancias ligeras y versátiles para tu rutina diaria.', recs: 'Vibez Femenina, SPOT Masculino y Femenino, Empire Sport y Gold' },
  { icon: '💕', title: 'Citas románticas', desc: 'Aromas seductores que dejan una impresión inolvidable.', recs: 'Latitud, Feeling Sexy, Grace Midnight' },
  { icon: '👰', title: 'Bodas y eventos', desc: 'Elegancia atemporal para momentos especiales.', recs: 'Grace Rose, Grace Rose Absoluto, Empire Woman' },
  { icon: '🎉', title: 'Noche de fiesta', desc: 'Intensidad y presencia para brillar toda la noche.', recs: 'INEBRIANTE, Vibez masculina, Grace Midnight' },
  { icon: '🏃', title: 'Deporte y actividad', desc: 'Frescura dinámica que acompaña tu energía.', recs: 'Empire Sport y Gold, SPOT Masculino y Femenino' },
  { icon: '🏢', title: 'Oficina / Trabajo', desc: 'Sofisticación discreta y profesional.', recs: 'Empire Man, Empire Woman, Latitud' },
];
const occasionCards = occasions.map(o => `<article class="occasion-card fu">
  <span class="occasion-icon" aria-hidden="true">${o.icon}</span>
  <h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">${o.title}</h3>
  <p class="ui-text" style="margin-bottom:12px;">${o.desc}</p>
  <p class="occasion-recs"><strong>Recomendados:</strong> ${o.recs}</p>
  <a href="#coleccion" class="btn-s">Ver recomendaciones</a>
</article>`).join('\n');

const main = `<main id="main-content">
        <section class="hero hero--perfumes" id="inicio">
            <div class="container">
                <div class="hero-grid">
                    <div class="hero-content">
                        <p class="hero-label fu">Venture Zone · Perfumes HND</p>
                        <h1 class="hero-title fu">El Arte de las <em>Fragancias</em></h1>
                        <p class="hero-subtitle fu">Descubre la colección Hinode de perfumes exclusivos: desde notas amaderadas envolventes hasta florales elegantes. Cada fragancia cuenta una historia sensorial única.</p>
                        <div class="hero-ctas fu">
                            <a href="#coleccion" class="btn-p">Explorar Fragancias</a>
                            <a href="#recomendador" class="btn-s">Encontrar mi Perfume</a>
                        </div>
                    </div>
                    <div class="hero-media fu fade-right" aria-hidden="true">
                        <img src="../images/GRACEROSE.jpg" alt="" width="600" height="750" loading="eager" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block;">
                    </div>
                </div>
            </div>
        </section>

        <div class="mq-wrap" aria-hidden="true">
            <div class="mq-inner">
                <span class="mq-item">Floral<span class="mq-dot">◆</span></span>
                <span class="mq-item">Amaderado<span class="mq-dot">◆</span></span>
                <span class="mq-item">Cítrico<span class="mq-dot">◆</span></span>
                <span class="mq-item">Oriental<span class="mq-dot">◆</span></span>
                <span class="mq-item">Fresco<span class="mq-dot">◆</span></span>
                <span class="mq-item">Elegante<span class="mq-dot">◆</span></span>
                <span class="mq-item">Seductor<span class="mq-dot">◆</span></span>
                <span class="mq-item">Hinode<span class="mq-dot">◆</span></span>
                <span class="mq-item">Floral<span class="mq-dot">◆</span></span>
                <span class="mq-item">Amaderado<span class="mq-dot">◆</span></span>
                <span class="mq-item">Cítrico<span class="mq-dot">◆</span></span>
                <span class="mq-item">Oriental<span class="mq-dot">◆</span></span>
                <span class="mq-item">Fresco<span class="mq-dot">◆</span></span>
                <span class="mq-item">Elegante<span class="mq-dot">◆</span></span>
                <span class="mq-item">Seductor<span class="mq-dot">◆</span></span>
                <span class="mq-item">Hinode<span class="mq-dot">◆</span></span>
            </div>
        </div>

        <section class="section" id="enfoque">
            <div class="container">
                <p class="sec-label fu" style="margin-bottom:16px;">Nuestra Filosofía</p>
                <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);margin-bottom:20px;">El Arte de las <em>Fragancias</em></h2>
                <div class="grid-2">
                    <div class="fu">
                        <span class="style-emoji" aria-hidden="true">🌸✨</span>
                        <p class="ui-text">En Venture Zone seleccionamos fragancias HND que transforman cada momento en una experiencia sensorial. Desde aromas amaderados envolventes hasta chipres elegantes, cada perfume es una obra de arte olfativa.</p>
                        <p class="ui-text" style="margin-top:16px;">Nuestra pasión por la perfumería nos impulsa a ofrecerte una colección curada de fragancias originales Hinode — perfumes que expresan personalidad, sofisticación y distinción.</p>
                        <a href="#coleccion" class="btn-s" style="margin-top:24px;display:inline-block;">Descubre nuestra colección</a>
                    </div>
                    <div class="fu">
                        <div class="quote-hero-wrap" style="margin:0;">
                            <p class="quote-t" style="font-size:clamp(1rem,1.8vw,1.25rem);line-height:1.7;position:relative;z-index:1;">Un perfume no solo se huele, se siente. Es la firma invisible que acompaña cada paso, cada recuerdo, cada momento especial de tu vida.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section-alt" id="familias">
            <div class="container">
                <div style="text-align:center;margin-bottom:64px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Exploración</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Familias <em>Olfativas</em></h2>
                    <p class="ui-text fu" style="max-width:560px;margin:20px auto 0;">Encuentra tu aroma ideal explorando las familias olfativas que componen nuestra colección HND.</p>
                </div>
                <div class="family-grid">${familyCards}</div>
            </div>
        </section>

        <section class="section" id="coleccion">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Catálogo</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Nuestra <em>Colección</em></h2>
                    <p class="ui-text fu" style="max-width:560px;margin:20px auto 0;">13 fragancias HND exclusivas. Usa los filtros para encontrar tu aroma ideal.</p>
                </div>
                ${generateFiltersHtml(PERFUMES.length)}${productsHtml}</div>
                        <div class="catalog-no-results" id="noResultsMessage" hidden role="status">
                            <span class="catalog-no-results-icon" aria-hidden="true">🌸</span>
                            <h3 class="h-mix" style="font-size:1.1rem;margin-bottom:12px;">No encontramos fragancias</h3>
                            <p class="ui-text" style="margin-bottom:20px;max-width:400px;">Prueba ajustando o limpiando los filtros para ver más opciones de nuestra colección.</p>
                            <button type="button" class="btn-p" id="filterResetEmpty">Limpiar todos los filtros</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section-alt" id="piramide">
            <div class="container">
                <div style="text-align:center;margin-bottom:56px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Educación</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Entendiendo las <em>Fragancias</em></h2>
                    <p class="ui-text fu" style="max-width:560px;margin:20px auto 0;">La pirámide olfativa describe cómo evoluciona un perfume en tu piel. Explora cada nivel y descubre las notas de fragancias reales de nuestra colección.</p>
                </div>
                ${generatePyramidHtml()}
            </div>
        </section>

        <section class="section" id="destacados">
            <div class="container">
                <div style="text-align:center;margin-bottom:56px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Bestsellers</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Fragancias del <em>Mes</em></h2>
                </div>
                <div class="featured-grid">${featuredHtml}</div>
            </div>
        </section>

        <section class="section section-alt" id="recomendador">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Guía personalizada</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Encuentra tu <em>Fragancia Ideal</em></h2>
                    <p class="ui-text fu" style="max-width:560px;margin:20px auto 0;">Responde 5 preguntas y descubre las fragancias HND perfectas para ti.</p>
                </div>
                ${generateQuizHtml()}
            </div>
        </section>

        <section class="section" id="marcas">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Líneas exclusivas</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Marcas que <em>Manejamos</em></h2>
                    <p class="ui-text fu" style="max-width:560px;margin:20px auto 0;">Fragancias HND de las líneas más reconocidas. Haz clic para filtrar por marca.</p>
                </div>
                <div class="brands-grid" id="brandsGrid">${brandCards}</div>
            </div>
        </section>

        <section class="section section-alt" id="ocasiones">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Para cada momento</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Perfumes para Cada <em>Momento</em></h2>
                </div>
                <div class="occasion-grid">${occasionCards}</div>
            </div>
        </section>

        <section class="section" id="testimonios">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Reseñas</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Lo que dicen nuestros <em>clientes</em></h2>
                </div>
                <div class="testimonial-carousel" id="testimonialCarousel">
                    <div class="testimonial-slide is-active"><div class="testimonial-stars" aria-hidden="true">★★★★★</div><p class="ui-text" style="font-style:italic;margin-bottom:16px;">"Grace Rose es simplemente espectacular. Elegante, femenina y con una duración increíble. Mi perfume favorito sin duda."</p><p class="sec-label">— María G. · Grace Rose</p></div>
                    <div class="testimonial-slide"><div class="testimonial-stars" aria-hidden="true">★★★★★</div><p class="ui-text" style="font-style:italic;margin-bottom:16px;">"INEBRIANTE es la fragancia masculina perfecta. Sofisticada, amaderada y con mucha personalidad. Siempre recibo cumplidos."</p><p class="sec-label">— Carlos R. · INEBRIANTE</p></div>
                    <div class="testimonial-slide"><div class="testimonial-stars" aria-hidden="true">★★★★★</div><p class="ui-text" style="font-style:italic;margin-bottom:16px;">"Compré Latitud para mi pareja y ambos lo amamos. Es unisex de verdad, seductor y versátil para cualquier ocasión."</p><p class="sec-label">— Ana L. · Latitud</p></div>
                    <div class="testimonial-slide"><div class="testimonial-stars" aria-hidden="true">★★★★☆</div><p class="ui-text" style="font-style:italic;margin-bottom:16px;">"Empire Sport es ideal para el gym y el día a día. Fresco, energizante y no agobia. Excelente relación calidad-precio."</p><p class="sec-label">— Roberto M. · Empire Sport y Gold</p></div>
                </div>
                <div class="testimonial-dots" id="testimonialDots" role="tablist" aria-label="Testimonios">
                    <button type="button" class="testimonial-dot is-active" aria-selected="true" aria-label="Testimonio 1"></button>
                    <button type="button" class="testimonial-dot" aria-selected="false" aria-label="Testimonio 2"></button>
                    <button type="button" class="testimonial-dot" aria-selected="false" aria-label="Testimonio 3"></button>
                    <button type="button" class="testimonial-dot" aria-selected="false" aria-label="Testimonio 4"></button>
                </div>
            </div>
        </section>

        <section class="section section-alt" id="faq">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Ayuda</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Preguntas <em>Frecuentes</em></h2>
                </div>
                <div class="faq-list fu">
                    <div class="faq-item"><button type="button" class="faq-question" aria-expanded="false">¿Cuál es la diferencia entre Eau de Parfum y Eau de Toilette?<span class="faq-icon" aria-hidden="true">+</span></button><div class="faq-answer"><p>Eau de Parfum (EDP) tiene mayor concentración de esencia (15–20%), mayor duración (6–8 h) e intensidad. Eau de Toilette (EDT) es más ligera (5–15%), ideal para el día con 4–6 h de permanencia.</p></div></div>
                    <div class="faq-item"><button type="button" class="faq-question" aria-expanded="false">¿Cómo hago que mi perfume dure más?<span class="faq-icon" aria-hidden="true">+</span></button><div class="faq-answer"><p>Aplica en puntos de pulso (muñecas, cuello, detrás de orejas), sobre piel hidratada y sin frotar. Guarda el frasco alejado del calor y la luz directa.</p></div></div>
                    <div class="faq-item"><button type="button" class="faq-question" aria-expanded="false">¿Dónde debo aplicar el perfume?<span class="faq-icon" aria-hidden="true">+</span></button><div class="faq-answer"><p>En zonas donde la piel esté más cálida: pulsos, cuello, detrás de las orejas y zona del escote. Evita frotar para no alterar las notas.</p></div></div>
                    <div class="faq-item"><button type="button" class="faq-question" aria-expanded="false">¿Los perfumes tienen fecha de vencimiento?<span class="faq-icon" aria-hidden="true">+</span></button><div class="faq-answer"><p>Los perfumes no caducan como los alimentos, pero su calidad puede disminuir tras 3–5 años si no se almacenan correctamente. Mantén el frasco cerrado, fresco y alejado de la luz.</p></div></div>
                    <div class="faq-item"><button type="button" class="faq-question" aria-expanded="false">¿Ofrecen muestras o decants?<span class="faq-icon" aria-hidden="true">+</span></button><div class="faq-answer"><p>Consulta disponibilidad de muestras escribiéndonos por WhatsApp. Te ayudamos a elegir antes de comprar el frasco completo.</p></div></div>
                    <div class="faq-item"><button type="button" class="faq-question" aria-expanded="false">¿Hacen envíos?<span class="faq-icon" aria-hidden="true">+</span></button><div class="faq-answer"><p>Sí, realizamos envíos a todo México. Envío gratis en compras mayores a $500 MXN. Entrega estimada de 3–7 días hábiles.</p></div></div>
                    <div class="faq-item"><button type="button" class="faq-question" aria-expanded="false">¿Los perfumes son originales?<span class="faq-icon" aria-hidden="true">+</span></button><div class="faq-answer"><p>100% originales Hinode/HND. Somos distribuidores autorizados Venture Zone con productos directos de la marca.</p></div></div>
                    <div class="faq-item"><button type="button" class="faq-question" aria-expanded="false">¿Tienen garantía?<span class="faq-icon" aria-hidden="true">+</span></button><div class="faq-answer"><p>Sí, garantía de autenticidad y satisfacción. Si recibes un producto dañado o incorrecto, contáctanos dentro de los primeros 7 días.</p></div></div>
                </div>
            </div>
        </section>

        <section class="section" id="blog">
            <div class="container">
                <div style="text-align:center;margin-bottom:48px;">
                    <p class="sec-label fu" style="margin-bottom:16px;">Consejos</p>
                    <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);">Tips del Mundo de las <em>Fragancias</em></h2>
                </div>
                <div class="blog-grid">
                    <article class="blog-card fu"><div class="blog-card-media"><img src="../images/GRACEROSE.jpg" alt="Cómo elegir tu perfume signature" width="600" height="375" loading="lazy" decoding="async"></div><div class="blog-card-body"><span class="blog-card-cat">Guía</span><h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">Cómo elegir tu perfume signature</h3><p class="ui-text" style="margin-bottom:12px;">Descubre cómo encontrar la fragancia que mejor representa tu personalidad y estilo de vida.</p><span class="blog-card-date">Marzo 2026</span></div></article>
                    <article class="blog-card fu"><div class="blog-card-media"><img src="../images/EMPIREWOMAN.jpg" alt="Tendencias en perfumería 2026" width="600" height="375" loading="lazy" decoding="async"></div><div class="blog-card-body"><span class="blog-card-cat">Tendencias</span><h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">Las tendencias en perfumería 2026</h3><p class="ui-text" style="margin-bottom:12px;">Notas gourmand, amaderadas y acuáticas dominan las preferencias de este año.</p><span class="blog-card-date">Enero 2026</span></div></article>
                    <article class="blog-card fu"><div class="blog-card-media"><img src="../images/VIBEZI.jpg" alt="Cómo almacenar perfumes" width="600" height="375" loading="lazy" decoding="async"></div><div class="blog-card-body"><span class="blog-card-cat">Cuidado</span><h3 class="h-mix" style="font-size:1rem;margin-bottom:10px;">Cómo almacenar correctamente tus perfumes</h3><p class="ui-text" style="margin-bottom:12px;">Protege tus fragancias del calor, la luz y el aire para preservar su calidad por años.</p><span class="blog-card-date">Diciembre 2025</span></div></article>
                </div>
            </div>
        </section>

        <section class="section section-alt" id="contacto">
            <div class="container">
                <p class="sec-label fu" style="margin-bottom:16px;">Contacto</p>
                <h2 class="h-mix fu" style="font-size:clamp(1.8rem,3vw,2.8rem);margin-bottom:20px;">¿Listo para encontrar tu <em>fragancia</em>?</h2>
                <p class="ui-text fu" style="max-width:600px;margin-bottom:0;">Cuéntanos qué perfume buscas y te asesoramos por WhatsApp con recomendaciones personalizadas.</p>
                <div class="contact-grid">
                    <div class="fu">
                        <ul class="contact-info-list">
                            <li class="ui-text">📍 Centro de la Ciudad, Tepic, Nayarit, México</li>
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
                            <label class="sec-label" style="display:block;margin-bottom:8px;" for="tipoPerfume">¿Qué tipo de perfume buscas? <span aria-hidden="true">*</span></label>
                            <select class="f-input" id="tipoPerfume" name="tipoPerfume" required aria-describedby="tipoPerfume-error" style="cursor:pointer;">
                                <option value="">Selecciona una opción</option>
                                <option value="Floral">Floral</option>
                                <option value="Amaderado">Amaderado</option>
                                <option value="Cítrico / Fresco">Cítrico / Fresco</option>
                                <option value="Oriental / Especiado">Oriental / Especiado</option>
                                <option value="Dulce / Gourmand">Dulce / Gourmand</option>
                                <option value="No estoy seguro/a">No estoy seguro/a</option>
                            </select>
                            <span class="field-error" id="tipoPerfume-error" role="alert"></span>
                        </div>
                        <div class="field-wrap field-wrap--split">
                            <div>
                                <label class="sec-label" style="display:block;margin-bottom:8px;" for="presupuesto">Presupuesto aproximado</label>
                                <select class="f-input" id="presupuesto" name="presupuesto" style="cursor:pointer;">
                                    <option value="">Selecciona rango</option>
                                    <option value="Hasta $800">Hasta $800</option>
                                    <option value="$800 – $1,000">$800 – $1,000</option>
                                    <option value="$1,000 – $1,300">$1,000 – $1,300</option>
                                    <option value="Más de $1,300">Más de $1,300</option>
                                </select>
                            </div>
                            <div>
                                <label class="sec-label" style="display:block;margin-bottom:8px;" for="paraQuien">¿Para quién es? <span aria-hidden="true">*</span></label>
                                <select class="f-input" id="paraQuien" name="paraQuien" required aria-describedby="paraQuien-error" style="cursor:pointer;">
                                    <option value="">Selecciona</option>
                                    <option value="Para mí (mujer)">Para mí (mujer)</option>
                                    <option value="Para mí (hombre)">Para mí (hombre)</option>
                                    <option value="Regalo para mujer">Regalo para mujer</option>
                                    <option value="Regalo para hombre">Regalo para hombre</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                                <span class="field-error" id="paraQuien-error" role="alert"></span>
                            </div>
                        </div>
                        <div class="field-wrap" style="margin-bottom:24px;">
                            <label class="sec-label" style="display:block;margin-bottom:8px;" for="mensaje">Mensaje adicional</label>
                            <textarea class="f-input" id="mensaje" name="mensaje" placeholder="Ocasión, fragancias que te gustan, alergias…" aria-describedby="mensaje-error"></textarea>
                            <span class="field-error" id="mensaje-error" role="alert"></span>
                        </div>
                        <button type="submit" class="btn-p" id="contactSubmitBtn" style="width:100%;">Consultar por WhatsApp</button>
                        <p class="sec-label" style="margin-top:12px;text-align:center;">Al enviar, se abrirá WhatsApp con tu consulta.</p>
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
        </section>
    </main>`;

fs.writeFileSync(OUT, main, 'utf8');
fs.writeFileSync(path.join(__dirname, 'perfumes-data.json'), JSON.stringify(PERFUMES, null, 2), 'utf8');
console.log('Generated:', OUT);
