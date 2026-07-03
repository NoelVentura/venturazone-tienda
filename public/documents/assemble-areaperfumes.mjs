import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const main = fs.readFileSync(path.join(__dirname, 'areaperfumes-main.html'), 'utf8');
const perfumes = JSON.parse(fs.readFileSync(path.join(__dirname, 'perfumes-data.json'), 'utf8'));

const searchProducts = perfumes.map(p => ({
  name: p.name,
  description: p.tagline || p.desc,
  price: `$${p.price.toLocaleString('es-MX')}`,
  image: `../images/${p.img}`,
}));

const shell = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="Venture Zone — Perfumes HND Hinode. Vibez, Latitud, Grace, Empire, INEBRIANTE y más. Fragancias originales con envío gratis en compras mayores a $500.">
    <meta name="keywords" content="Venture Zone, perfumes, Hinode, HND, fragancias, Vibez, Grace Rose, Empire, Tepic, México">
    <meta name="author" content="Venture Zone">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://venturezone.com/documents/areaperfumes.html">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Venture Zone">
    <meta property="og:title" content="Perfumes HND - Venture Zone">
    <meta property="og:description" content="Colección exclusiva de perfumes Hinode: amaderados, florales, chipres y más. Encuentra tu fragancia ideal.">
    <meta property="og:image" content="../images/GRACEROSE.jpg">
    <meta property="og:url" content="https://venturezone.com/documents/areaperfumes.html">
    <meta property="og:locale" content="es_MX">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Perfumes HND - Venture Zone">
    <meta name="twitter:description" content="Descubre nuestra colección de perfumes HND Hinode. Fragancias elegantes y originales.">
    <meta name="twitter:image" content="../images/GRACEROSE.jpg">
    <title>Perfumes HND - Venture Zone</title>
    <script>
        (function () {
            const stored = localStorage.getItem('theme');
            const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', theme);
            const themeColor = document.querySelector('meta[name="theme-color"]');
            if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
        })();
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles-shared.css">
    <link rel="stylesheet" href="styles-areaperfumes.css">
    <script src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"></script>
    <script src="https://files.bpcontent.cloud/2025/04/21/19/20250421193440-PR19SX7F.js" defer></script>
</head>
<body>
    <div class="page-loader" id="pageLoader" role="status" aria-live="polite" aria-busy="true" aria-label="Cargando sitio">
        <div class="page-loader-inner">
            <span class="page-loader-logo">Venture Zone</span>
            <div class="page-loader-bar" aria-hidden="true"><span></span></div>
            <p class="sec-label">Cargando…</p>
        </div>
    </div>

    <a href="#inicio" class="skip-link">Saltar al contenido principal</a>

    <nav class="site-nav">
        <div class="nav-inner">
            <a href="catalogo-adaptado.html" class="brand">
                Venture Zone
                <span class="brand-tag">Tu bienestar, nuestra pasión</span>
            </a>
            <ul class="nav-links">
                <li><a href="catalogo-adaptado.html" class="nav-a">Catálogo</a></li>
                <li><a href="Cuidadocorporal.html" class="nav-a">Cuidado Corporal</a></li>
                <li><a href="maquillaje.html" class="nav-a">Maquillaje</a></li>
                <li><a href="areaperfumes.html" class="nav-a is-active" aria-current="page">Perfumes</a></li>
                <li><a href="suplementos.html" class="nav-a">Suplementos</a></li>
                <li><a href="catalogo-adaptado.html#tienda" class="nav-a">Tienda</a></li>
                <li><a href="catalogo-adaptado.html#reservas" class="nav-a">Reservas</a></li>
                <li><a href="#contacto" class="nav-a">Contacto</a></li>
            </ul>
            <div class="nav-actions">
                <button class="nav-search-btn" id="searchBtn"><span class="search-label">Buscar</span></button>
                <button id="theme-toggle" type="button" aria-label="Cambiar entre modo claro y oscuro" title="Cambiar tema">
                    <span class="theme-toggle-glass">
                        <span class="theme-toggle-track" aria-hidden="true">
                            <span class="theme-stars"><span></span><span></span><span></span><span></span><span></span></span>
                            <span class="theme-toggle-knob">
                                <svg class="toggle-sun" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g class="sun-rays"><line x1="12" y1="2" x2="12" y2="5" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="19" x2="12" y2="22" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/><line x1="2" y1="12" x2="5" y2="12" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/><line x1="19" y1="12" x2="22" y2="12" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/><line x1="4.2" y1="4.2" x2="6.4" y2="6.4" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/><line x1="17.6" y1="17.6" x2="19.8" y2="19.8" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/><line x1="4.2" y1="19.8" x2="6.4" y2="17.6" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/><line x1="17.6" y1="6.4" x2="19.8" y2="4.2" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/></g><circle cx="12" cy="12" r="4.5" fill="#FBBF24" stroke="#F59E0B" stroke-width="0.5"/></svg>
                                <svg class="toggle-moon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 14.5C16.5 16.8 13.6 18 11 17.2C8.1 16.2 6.5 13.2 7.1 10.2C7.5 8.2 8.8 6.6 10.5 5.7C9.8 7.8 10.2 10.3 11.8 12C13.4 13.7 15.8 14.4 18 14.5Z" fill="#CBD5E1" stroke="#94A3B8" stroke-width="0.5"/></svg>
                            </span>
                        </span>
                        <span class="theme-ripple" aria-hidden="true"></span>
                    </span>
                </button>
                <button class="cart-btn" onclick="openCart()">🛒<span class="cart-count">0</span></button>
                <button class="menu-toggle" id="menuToggle" aria-label="Menú">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
                </button>
            </div>
        </div>
        <div class="mobile-menu" id="mobileMenu">
            <a href="catalogo-adaptado.html" class="nav-a">Catálogo</a>
            <a href="Cuidadocorporal.html" class="nav-a">Cuidado Corporal</a>
            <a href="maquillaje.html" class="nav-a">Maquillaje</a>
            <a href="areaperfumes.html" class="nav-a is-active" aria-current="page">Perfumes</a>
            <a href="suplementos.html" class="nav-a">Suplementos</a>
            <a href="catalogo-adaptado.html#tienda" class="nav-a">Tienda</a>
            <a href="catalogo-adaptado.html#reservas" class="nav-a">Reservas</a>
            <a href="#contacto" class="nav-a">Contacto</a>
        </div>
    </nav>

`;

const footer = `
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Venture Zone. Todos los derechos reservados.</p>
        </div>
    </footer>

    <a href="https://wa.me/523111213128?text=Hola%20Venture%20Zone%2C%20me%20interesan%20los%20perfumes%20HND." class="wa-fab" id="waFab" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
        <span class="wa-fab-pulse" aria-hidden="true"></span>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>

    <div class="search-modal" id="searchModal">
        <div class="search-modal-content">
            <div class="search-modal-header">
                <h3 class="h-mix" style="font-size:1rem;">Buscar Perfumes</h3>
                <button class="search-modal-close" id="searchModalClose">✕</button>
            </div>
            <input type="text" class="search-modal-input" placeholder="Escribe el nombre del perfume..." id="searchModalInput">
            <div id="searchModalResults"></div>
        </div>
    </div>

    <script>
        const PERFUMES_DATA = ${JSON.stringify(perfumes)};

        const themeToggle = document.getElementById('theme-toggle');

        function syncThemeUI(theme) {
            themeToggle?.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
            themeToggle?.setAttribute('title', theme === 'dark' ? 'Modo oscuro activo' : 'Modo claro activo');
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
        }

        function applyTheme(theme, persist = true) {
            document.documentElement.setAttribute('data-theme', theme);
            if (persist) localStorage.setItem('theme', theme);
            syncThemeUI(theme);
        }

        function triggerThemeFx() {
            const ripple = themeToggle?.querySelector('.theme-ripple');
            if (ripple) {
                ripple.classList.remove('is-active');
                void ripple.offsetWidth;
                ripple.classList.add('is-active');
            }
            themeToggle?.classList.add('is-pulsing');
            setTimeout(() => themeToggle?.classList.remove('is-pulsing'), 450);
        }

        themeToggle?.addEventListener('click', () => {
            triggerThemeFx();
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            applyTheme(current === 'light' ? 'dark' : 'light');
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
        });

        const savedTheme = localStorage.getItem('theme');
        const initialTheme = savedTheme || document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(initialTheme);

        const motionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
        const motionOK = !motionMQ.matches;
        if (!motionOK) document.documentElement.classList.add('no-smooth-scroll');
        motionMQ.addEventListener('change', (e) => document.documentElement.classList.toggle('no-smooth-scroll', e.matches));

        function initPageLoader() {
            const loader = document.getElementById('pageLoader');
            if (!loader) return;
            document.body.classList.add('is-loading');
            let hidden = false;
            const hide = () => {
                if (hidden) return;
                hidden = true;
                loader.classList.add('is-hidden');
                loader.setAttribute('aria-busy', 'false');
                loader.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('is-loading');
            };
            const delay = motionOK ? 480 : 0;
            if (document.readyState === 'complete') setTimeout(hide, delay);
            else window.addEventListener('load', () => setTimeout(hide, delay), { once: true });
            setTimeout(hide, 3500);
        }
        initPageLoader();

        function navigateWithPageLoader(url) {
            const loader = document.getElementById('pageLoader');
            if (!loader) { window.location.href = url; return; }
            loader.classList.remove('is-hidden');
            loader.removeAttribute('aria-hidden');
            loader.setAttribute('aria-busy', 'true');
            document.body.classList.add('is-loading');
            setTimeout(() => { window.location.href = url; }, motionOK ? 320 : 0);
        }

        function initPageNavTransition() {
            const isHtmlPageLink = (href) => href && !href.startsWith('#') && !/^https?:\\/\\//i.test(href) && /\\.html(?:[#?]|$)/i.test(href);
            document.querySelectorAll('a[href]').forEach((link) => {
                const href = link.getAttribute('href');
                if (!isHtmlPageLink(href)) return;
                link.addEventListener('click', (e) => {
                    if (e.defaultPrevented || e.button !== 0) return;
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    const dest = new URL(link.href, window.location.href);
                    if (dest.pathname.replace(/\\/$/, '') === window.location.pathname.replace(/\\/$/, '') && !dest.hash) return;
                    e.preventDefault();
                    navigateWithPageLoader(link.href);
                });
            });
        }
        initPageNavTransition();

        function initScrollAnimations() {
            if (!motionOK) {
                document.querySelectorAll('.fu, .section-reveal').forEach(el => el.classList.add('vis'));
                return;
            }
            const fadeObs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('vis');
                    fadeObs.unobserve(entry.target);
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
            document.querySelectorAll('.fu, .section-reveal').forEach(el => fadeObs.observe(el));
            document.querySelectorAll('.grid-2, .grid-3, .grid-4, .grid-auto, .family-grid, #perfumesGrid, .featured-grid, .occasion-grid, .blog-grid').forEach(container => {
                container.querySelectorAll('.fu').forEach((el, i) => { el.style.transitionDelay = \`\${Math.min(i * 0.08, 0.48)}s\`; });
            });
            document.querySelectorAll('.hero .fu').forEach((el, i) => {
                el.style.transitionDelay = \`\${0.12 + i * 0.1}s\`;
                requestAnimationFrame(() => el.classList.add('vis'));
            });
        }

        function initSectionTransitions() {
            if (!motionOK) {
                document.querySelectorAll('.section, .section-alt').forEach(s => s.classList.add('section-vis'));
                return;
            }
            const sectionObs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-vis');
                        sectionObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });
            document.querySelectorAll('.section, .section-alt').forEach(sec => sectionObs.observe(sec));
        }

        function initSmoothScroll() {
            const nav = document.querySelector('.site-nav');
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const hash = anchor.getAttribute('href');
                    if (!hash || hash === '#') return;
                    const target = document.querySelector(hash);
                    if (!target) return;
                    e.preventDefault();
                    const navH = nav?.offsetHeight || 68;
                    const top = target.getBoundingClientRect().top + window.scrollY - navH;
                    window.scrollTo({ top, behavior: motionOK ? 'smooth' : 'auto' });
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                });
            });
        }

        function initButtonRipples() {
            if (!motionOK) return;
            const selectors = '.btn-p, .btn-s, .buy-button, .filter-tab, .nav-search-btn, .faq-question, .quiz-option, .brand-logo-card, .olfactory-layer, .olfactory-example-btn, .quiz-result-card';
            document.addEventListener('click', (e) => {
                const btn = e.target.closest(selectors);
                if (!btn || btn.disabled) return;
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple-fx';
                ripple.style.width = ripple.style.height = \`\${size}px\`;
                ripple.style.left = \`\${e.clientX - rect.left - size / 2}px\`;
                ripple.style.top = \`\${e.clientY - rect.top - size / 2}px\`;
                btn.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
            }, { passive: true });
        }

        function initLazyImages() {
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                const mark = () => img.classList.add('is-loaded');
                if (img.complete) mark();
                else {
                    img.addEventListener('load', mark, { once: true });
                    img.addEventListener('error', mark, { once: true });
                }
            });
        }

        function initFaqAccordion() {
            document.querySelectorAll('.faq-question').forEach(btn => {
                btn.addEventListener('click', () => {
                    const item = btn.closest('.faq-item');
                    const isOpen = item.classList.contains('is-open');
                    document.querySelectorAll('.faq-item').forEach(i => {
                        i.classList.remove('is-open');
                        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
                    });
                    if (!isOpen) {
                        item.classList.add('is-open');
                        btn.setAttribute('aria-expanded', 'true');
                    }
                });
            });
        }

        function initTestimonialCarousel() {
            const carousel = document.getElementById('testimonialCarousel');
            const dotsContainer = document.getElementById('testimonialDots');
            if (!carousel) return;
            const slides = [...carousel.querySelectorAll('.testimonial-slide')];
            if (!slides.length) return;
            let current = 0;
            let intervalId = null;
            const show = (index) => {
                current = (index + slides.length) % slides.length;
                slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
                dotsContainer?.querySelectorAll('.testimonial-dot').forEach((d, i) => {
                    d.classList.toggle('is-active', i === current);
                    d.setAttribute('aria-selected', i === current ? 'true' : 'false');
                });
            };
            const resetInterval = () => {
                clearInterval(intervalId);
                if (motionOK) intervalId = setInterval(() => show(current + 1), 6000);
            };
            dotsContainer?.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
                dot.addEventListener('click', () => { show(i); resetInterval(); });
            });
            show(0);
            resetInterval();
        }

        const PYRAMID_TIERS = {
            top: {
                label: 'Notas de Salida',
                shortLabel: 'Salida',
                duration: '0 – 15 minutos',
                icon: '✨',
                desc: 'Son las primeras impresiones al aplicar el perfume. Notas ligeras y volátiles que evaporan rápidamente, creando el impacto inicial que define la primera percepción de la fragancia.',
                typicalNotes: ['Bergamota', 'Limón', 'Pimienta rosa', 'Mandarina', 'Notas acuáticas', 'Manzana verde'],
            },
            heart: {
                label: 'Notas de Corazón',
                shortLabel: 'Corazón',
                duration: '2 – 4 horas',
                icon: '🌸',
                desc: 'El alma de la fragancia. Emergen cuando las notas de salida se desvanecen y definen el carácter principal del perfume durante la mayor parte de su evolución en la piel.',
                typicalNotes: ['Rosa', 'Jazmín', 'Lavanda', 'Geranio', 'Iris', 'Ylang-ylang'],
            },
            base: {
                label: 'Notas de Fondo',
                shortLabel: 'Fondo',
                duration: '6+ horas',
                icon: '💎',
                desc: 'La base persistente que permanece en la piel mucho después de aplicar el perfume. Aportan profundidad, calidez y la firma olfativa memorable que otros recordarán.',
                typicalNotes: ['Ámbar', 'Sándalo', 'Vainilla', 'Almizcle', 'Vetiver', 'Pachulí'],
            },
        };

        function getPerfumeById(id) {
            return PERFUMES_DATA.find(p => p.id === id);
        }

        function parseNotesString(notesStr) {
            if (!notesStr) return [];
            return notesStr.split(',').map(n => n.trim()).filter(Boolean);
        }

        function renderPyramidPanel(tier, perfume) {
            const panel = document.getElementById('pyramidPanelContent');
            const panelWrap = document.getElementById('pyramidPanel');
            if (!panel) return;

            const data = PYRAMID_TIERS[tier];
            if (!data) return;

            const noteKey = tier === 'top' ? 'top' : tier === 'heart' ? 'heart' : 'base';
            let notes = data.typicalNotes;
            let perfumeBlock = '';

            if (perfume && perfume.notes && perfume.notes[noteKey]) {
                notes = parseNotesString(perfume.notes[noteKey]);
                perfumeBlock = '<div class="olfactory-panel-perfume">' +
                    '<img src="../images/' + perfume.img + '" alt="' + perfume.name + '" width="48" height="60" loading="lazy" decoding="async">' +
                    '<div><p class="sec-label" style="margin-bottom:4px;">Ejemplo real</p>' +
                    '<p class="h-mix" style="font-size:0.9rem;margin-bottom:4px;">' + perfume.name + '</p>' +
                    '<p class="ui-text" style="font-size:0.62rem;">' + (perfume.tagline || perfume.desc.substring(0, 120)) + '</p></div></div>';
            }

            const notesHtml = notes.map(n => '<li>' + n + '</li>').join('');

            panel.classList.remove('is-visible');
            if (panelWrap) panelWrap.classList.add('is-expanded');

            setTimeout(() => {
                panel.innerHTML =
                    '<span class="olfactory-panel-tier olfactory-panel-tier--' + tier + '">' + data.icon + ' ' + data.label + '</span>' +
                    '<h3 class="h-mix" style="font-size:1.15rem;margin-bottom:12px;">El nivel de <em>' + data.shortLabel + '</em></h3>' +
                    '<p class="ui-text">' + data.desc + '</p>' +
                    '<div class="olfactory-panel-duration" role="status"><span aria-hidden="true">⏱</span> Duración estimada: <strong>' + data.duration + '</strong></div>' +
                    '<p class="sec-label" style="margin-bottom:10px;">Notas típicas' + (perfume ? ' en ' + perfume.name : '') + '</p>' +
                    '<ul class="olfactory-panel-notes">' + notesHtml + '</ul>' +
                    perfumeBlock;
                requestAnimationFrame(() => panel.classList.add('is-visible'));
            }, motionOK ? 80 : 0);
        }

        function initPyramid() {
            const layers = document.querySelectorAll('.olfactory-layer');
            const picker = document.getElementById('pyramidExamplePicker');
            if (!layers.length) return;

            let activeTier = 'top';
            let activePerfumeId = picker?.querySelector('.olfactory-example-btn.is-active')?.dataset.perfumeId || 'product6';
            let hoverTier = null;

            const setActiveTier = (tier, fromHover = false) => {
                activeTier = tier;
                layers.forEach(layer => {
                    const isActive = layer.dataset.tier === tier;
                    layer.classList.toggle('is-active', isActive && !fromHover);
                    layer.classList.toggle('is-hovered', fromHover && layer.dataset.tier === tier);
                    layer.classList.toggle('is-expanded', isActive);
                    layer.setAttribute('aria-selected', isActive ? 'true' : 'false');
                });
                const perfume = getPerfumeById(activePerfumeId);
                renderPyramidPanel(tier, perfume);
            };

            layers.forEach(layer => {
                const tier = layer.dataset.tier;

                layer.addEventListener('click', () => setActiveTier(tier));

                layer.addEventListener('mouseenter', () => {
                    if (!motionOK) return;
                    hoverTier = tier;
                    layer.classList.add('is-hovered');
                    const perfume = getPerfumeById(activePerfumeId);
                    renderPyramidPanel(tier, perfume);
                });

                layer.addEventListener('mouseleave', () => {
                    if (!motionOK) return;
                    hoverTier = null;
                    layer.classList.remove('is-hovered');
                    if (activeTier) setActiveTier(activeTier);
                });

                layer.addEventListener('focus', () => setActiveTier(tier));
            });

            picker?.querySelectorAll('.olfactory-example-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    picker.querySelectorAll('.olfactory-example-btn').forEach(b => {
                        b.classList.remove('is-active');
                        b.setAttribute('aria-pressed', 'false');
                    });
                    btn.classList.add('is-active');
                    btn.setAttribute('aria-pressed', 'true');
                    activePerfumeId = btn.dataset.perfumeId;
                    setActiveTier(activeTier);
                });
            });

            document.addEventListener('keydown', (e) => {
                if (!document.getElementById('piramide')?.contains(document.activeElement)) return;
                const order = ['top', 'heart', 'base'];
                const idx = order.indexOf(activeTier);
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    setActiveTier(order[(idx + 1) % order.length]);
                    layers[idx + 1 < order.length ? idx + 1 : 0]?.focus();
                }
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    setActiveTier(order[(idx - 1 + order.length) % order.length]);
                    layers[idx - 1 >= 0 ? idx - 1 : order.length - 1]?.focus();
                }
            });

            setActiveTier('top');
        }

        function priceInRange(price, ranges) {
            if (!ranges.length) return true;
            return ranges.some(range => {
                if (range === '0-800') return price <= 800;
                if (range === '800-900') return price > 800 && price <= 900;
                if (range === '900-1200') return price > 900 && price <= 1200;
                if (range === '1200+') return price > 1200;
                return true;
            });
        }

        const CATALOG_FILTER_LABELS = {
            gender: { masculino: 'Masculino', femenino: 'Femenino', unisex: 'Unisex' },
            family: { floral: 'Floral', amaderado: 'Amaderado', citrico: 'Cítrico', oriental: 'Oriental', fresco: 'Fresco', dulce: 'Dulce' },
            type: { edp: 'Eau de Parfum', edt: 'Eau de Toilette', colonia: 'Colonia' },
            occasion: { diario: 'Día a día', noche: 'Noche', especial: 'Eventos', deportivo: 'Deporte', oficina: 'Oficina' },
            price: { '0-800': 'Hasta $800', '800-900': '$800–$900', '900-1200': '$900–$1,200', '1200+': '+$1,200' },
        };

        const catalogFilterState = {
            gender: [], family: [], type: [], price: [], occasion: [], brand: [],
            priceMin: 760, priceMax: 1352, priceSlider: false,
        };

        let catalogFilterTimer = null;
        const CATALOG_TOTAL = document.querySelectorAll('#perfumesGrid .perfume-card').length || PERFUMES_DATA.length;

        function getCheckedValues(group) {
            return [...document.querySelectorAll('.filter-input[data-filter-group="' + group + '"]:checked')].map(el => el.value);
        }

        function readFilterStateFromDOM() {
            catalogFilterState.gender = getCheckedValues('gender');
            catalogFilterState.family = getCheckedValues('family');
            catalogFilterState.type = getCheckedValues('type');
            catalogFilterState.price = getCheckedValues('price');
            catalogFilterState.occasion = getCheckedValues('occasion');
            catalogFilterState.brand = getCheckedValues('brand');
            catalogFilterState.priceSlider = document.getElementById('filterPriceSliderActive')?.checked || false;
            catalogFilterState.priceMin = parseInt(document.getElementById('filterPriceMin')?.value || '760', 10);
            catalogFilterState.priceMax = parseInt(document.getElementById('filterPriceMax')?.value || '1352', 10);
        }

        function cardMatchesFilters(card) {
            const price = parseInt(card.dataset.price, 10);
            const s = catalogFilterState;
            if (s.gender.length && !s.gender.includes(card.dataset.gender)) return false;
            if (s.family.length && !s.family.includes(card.dataset.family)) return false;
            if (s.type.length && !s.type.includes(card.dataset.type)) return false;
            if (s.occasion.length && !s.occasion.includes(card.dataset.occasion)) return false;
            if (s.brand.length && !s.brand.includes(card.dataset.line)) return false;
            if (s.price.length && !priceInRange(price, s.price)) return false;
            if (s.priceSlider && (price < s.priceMin || price > s.priceMax)) return false;
            return true;
        }

        function countActiveFilters() {
            let n = catalogFilterState.gender.length + catalogFilterState.family.length
                + catalogFilterState.type.length + catalogFilterState.price.length
                + catalogFilterState.occasion.length + catalogFilterState.brand.length;
            if (catalogFilterState.priceSlider) n += 1;
            return n;
        }

        function updateFilterUI(visibleCount) {
            const total = CATALOG_TOTAL;
            const countEl = document.getElementById('filterResultCount');
            const applyCount = document.getElementById('filterApplyCount');
            const badge = document.getElementById('filterActiveBadge');
            const noResults = document.getElementById('noResultsMessage');
            const grid = document.getElementById('perfumesGrid');
            const activeN = countActiveFilters();

            if (countEl) countEl.innerHTML = 'Mostrando <strong>' + visibleCount + '</strong> de ' + total + ' fragancias';
            if (applyCount) applyCount.textContent = visibleCount;
            if (badge) {
                badge.hidden = activeN === 0;
                badge.textContent = activeN;
            }
            if (noResults) noResults.hidden = visibleCount > 0;
            if (grid) grid.style.display = visibleCount === 0 ? 'none' : '';
            renderActiveFilterTags();
        }

        function renderActiveFilterTags() {
            const container = document.getElementById('activeFilterTags');
            if (!container) return;
            const tags = [];
            const addTags = (group, values, labels) => {
                values.forEach(v => {
                    tags.push({ group, value: v, label: labels[v] || v });
                });
            };
            addTags('gender', catalogFilterState.gender, CATALOG_FILTER_LABELS.gender);
            addTags('family', catalogFilterState.family, CATALOG_FILTER_LABELS.family);
            addTags('type', catalogFilterState.type, CATALOG_FILTER_LABELS.type);
            addTags('occasion', catalogFilterState.occasion, CATALOG_FILTER_LABELS.occasion);
            addTags('price', catalogFilterState.price, CATALOG_FILTER_LABELS.price);
            catalogFilterState.brand.forEach(b => tags.push({ group: 'brand', value: b, label: b }));
            if (catalogFilterState.priceSlider) {
                tags.push({ group: 'priceSlider', value: 'slider', label: '$' + catalogFilterState.priceMin + ' – $' + catalogFilterState.priceMax });
            }
            if (!tags.length) { container.hidden = true; container.innerHTML = ''; return; }
            container.hidden = false;
            container.innerHTML = tags.map(t =>
                '<span class="filter-tag">' + t.label +
                '<button type="button" aria-label="Quitar filtro ' + t.label + '" data-remove-group="' + t.group + '" data-remove-value="' + t.value + '">×</button></span>'
            ).join('');
            container.querySelectorAll('[data-remove-group]').forEach(btn => {
                btn.addEventListener('click', () => removeFilterTag(btn.dataset.removeGroup, btn.dataset.removeValue));
            });
        }

        function removeFilterTag(group, value) {
            if (group === 'priceSlider') {
                const slider = document.getElementById('filterPriceSliderActive');
                if (slider) slider.checked = false;
            } else {
                const input = document.querySelector('.filter-input[data-filter-group="' + group + '"][value="' + value + '"]');
                if (input) input.checked = false;
            }
            syncBrandCardsFromFilters();
            applyPerfumeFilters();
        }

        function updateUrlFromFilters() {
            const params = new URLSearchParams();
            const s = catalogFilterState;
            if (s.gender.length) params.set('genero', s.gender.join(','));
            if (s.family.length) params.set('familia', s.family.join(','));
            if (s.type.length) params.set('tipo', s.type.join(','));
            if (s.price.length) params.set('precio', s.price.join(','));
            if (s.occasion.length) params.set('ocasion', s.occasion.join(','));
            if (s.brand.length) params.set('marca', s.brand.join(','));
            if (s.priceSlider) params.set('precioMin', s.priceMin), params.set('precioMax', s.priceMax);
            const qs = params.toString();
            const newUrl = qs ? window.location.pathname + '?' + qs : window.location.pathname;
            history.replaceState(null, '', newUrl);
        }

        function applyFiltersFromUrl() {
            const params = new URLSearchParams(window.location.search);
            const setChecks = (group, param) => {
                const val = params.get(param);
                if (!val) return;
                val.split(',').forEach(v => {
                    const input = document.querySelector('.filter-input[data-filter-group="' + group + '"][value="' + v + '"]');
                    if (input) input.checked = true;
                });
            };
            setChecks('gender', 'genero');
            setChecks('family', 'familia');
            setChecks('type', 'tipo');
            setChecks('price', 'precio');
            setChecks('occasion', 'ocasion');
            setChecks('brand', 'marca');
            const pMin = params.get('precioMin');
            const pMax = params.get('precioMax');
            if (pMin && pMax) {
                const minEl = document.getElementById('filterPriceMin');
                const maxEl = document.getElementById('filterPriceMax');
                const active = document.getElementById('filterPriceSliderActive');
                if (minEl) minEl.value = pMin;
                if (maxEl) maxEl.value = pMax;
                if (active) active.checked = true;
                updatePriceSliderLabels();
            }
            syncBrandCardsFromFilters();
        }

        function syncBrandCardsFromFilters() {
            const brands = getCheckedValues('brand');
            document.querySelectorAll('.brand-logo-card').forEach(btn => {
                btn.classList.toggle('is-active', brands.length === 1 && brands[0] === btn.dataset.brand);
            });
        }

        function applyPerfumeFilters(immediate) {
            clearTimeout(catalogFilterTimer);
            const run = () => {
                readFilterStateFromDOM();
                const grid = document.getElementById('perfumesGrid');
                const cards = [...document.querySelectorAll('#perfumesGrid .perfume-card')];
                if (!cards.length) return;

                if (grid && motionOK) grid.classList.add('is-filtering');

                const transitions = motionOK ? 280 : 0;
                cards.forEach(card => {
                    const shouldShow = cardMatchesFilters(card);
                    if (shouldShow) {
                        card.classList.remove('is-leaving');
                        card.classList.remove('is-hidden');
                    } else if (!card.classList.contains('is-hidden')) {
                        card.classList.add('is-leaving');
                        setTimeout(() => {
                            if (!cardMatchesFilters(card)) card.classList.add('is-hidden');
                            card.classList.remove('is-leaving');
                        }, transitions);
                    }
                });

                setTimeout(() => {
                    let visible = 0;
                    cards.forEach(card => { if (!card.classList.contains('is-hidden')) visible++; });
                    updateFilterUI(visible);
                    updateUrlFromFilters();
                    if (grid) grid.classList.remove('is-filtering');
                }, transitions + 20);
            };
            if (immediate) run();
            else catalogFilterTimer = setTimeout(run, motionOK ? 120 : 0);
        }

        function clearAllFilters() {
            document.querySelectorAll('.filter-input:checked').forEach(el => { el.checked = false; });
            const minEl = document.getElementById('filterPriceMin');
            const maxEl = document.getElementById('filterPriceMax');
            if (minEl) minEl.value = minEl.min;
            if (maxEl) maxEl.value = maxEl.max;
            updatePriceSliderLabels();
            document.querySelectorAll('.brand-logo-card.is-active').forEach(b => b.classList.remove('is-active'));
            applyPerfumeFilters(true);
        }

        function updatePriceSliderLabels() {
            const minEl = document.getElementById('filterPriceMin');
            const maxEl = document.getElementById('filterPriceMax');
            const minLabel = document.getElementById('filterPriceMinLabel');
            const maxLabel = document.getElementById('filterPriceMaxLabel');
            if (!minEl || !maxEl) return;
            let min = parseInt(minEl.value, 10);
            let max = parseInt(maxEl.value, 10);
            if (min > max) { const t = min; min = max; max = t; minEl.value = min; maxEl.value = max; }
            if (minLabel) minLabel.textContent = '$' + min.toLocaleString('es-MX');
            if (maxLabel) maxLabel.textContent = '$' + max.toLocaleString('es-MX');
        }

        function setFilterCheckboxes(group, values) {
            document.querySelectorAll('.filter-input[data-filter-group="' + group + '"]').forEach(el => {
                el.checked = values.includes(el.value);
            });
        }

        function setBrandFilter(brand) {
            document.querySelectorAll('.filter-input[data-filter-group="brand"]').forEach(el => {
                el.checked = el.value === brand;
            });
            syncBrandCardsFromFilters();
            applyPerfumeFilters(true);
            document.getElementById('coleccion')?.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto' });
        }

        function initPerfumeFilters() {
            const grid = document.getElementById('perfumesGrid');
            if (!grid) return;

            document.querySelectorAll('.filter-input').forEach(input => {
                input.addEventListener('change', () => {
                    if (input.dataset.filterGroup === 'brand') syncBrandCardsFromFilters();
                    applyPerfumeFilters();
                });
            });

            ['filterPriceMin', 'filterPriceMax'].forEach(id => {
                document.getElementById(id)?.addEventListener('input', () => {
                    updatePriceSliderLabels();
                    if (document.getElementById('filterPriceSliderActive')?.checked) applyPerfumeFilters();
                });
            });

            ['filterReset', 'filterResetSidebar', 'filterResetEmpty'].forEach(id => {
                document.getElementById(id)?.addEventListener('click', clearAllFilters);
            });

            document.querySelectorAll('[data-filter-family]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    setFilterCheckboxes('family', [link.dataset.filterFamily]);
                    applyPerfumeFilters(true);
                    document.getElementById('coleccion')?.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto' });
                });
            });

            const filtersPanel = document.getElementById('catalogFilters');
            const backdrop = document.getElementById('filterBackdrop');
            const openBtn = document.getElementById('filterMobileOpen');
            const closeBtn = document.getElementById('filterMobileClose');
            const applyBtn = document.getElementById('filterMobileApply');

            function openFilterModal() {
                filtersPanel?.classList.add('is-open');
                backdrop?.classList.add('is-visible');
                backdrop?.removeAttribute('hidden');
                openBtn?.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
            function closeFilterModal() {
                filtersPanel?.classList.remove('is-open');
                backdrop?.classList.remove('is-visible');
                backdrop?.setAttribute('hidden', '');
                openBtn?.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }

            openBtn?.addEventListener('click', openFilterModal);
            closeBtn?.addEventListener('click', closeFilterModal);
            applyBtn?.addEventListener('click', closeFilterModal);
            backdrop?.addEventListener('click', closeFilterModal);

            applyFiltersFromUrl();
            updatePriceSliderLabels();
            applyPerfumeFilters(true);

            window.setBrandFilter = setBrandFilter;
            window.clearCatalogFilters = clearAllFilters;
        }

        function initBrandFilter() {
            document.querySelectorAll('.brand-logo-card').forEach(btn => {
                btn.addEventListener('click', () => {
                    const brand = btn.dataset.brand;
                    const isActive = btn.classList.contains('is-active');
                    document.querySelectorAll('.brand-logo-card').forEach(b => b.classList.remove('is-active'));
                    if (!isActive) {
                        btn.classList.add('is-active');
                        setFilterCheckboxes('brand', [brand]);
                    } else {
                        setFilterCheckboxes('brand', []);
                    }
                    applyPerfumeFilters(true);
                    document.getElementById('coleccion')?.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto' });
                });
            });
        }

        const QUIZ_LABELS = {
            gender: { masculino: 'hombre', femenino: 'mujer', unisex: 'uso unisex' },
            occasion: { diario: 'uso diario', noche: 'salidas nocturnas', especial: 'eventos especiales', deportivo: 'actividad deportiva', oficina: 'entorno profesional' },
            family: { floral: 'familia floral', amaderado: 'notas amaderadas', dulce: 'aromas dulces', fresco: 'frescura acuática', oriental: 'perfil oriental', citrico: 'notas cítricas' },
            intensity: { suave: 'intensidad suave', moderada: 'intensidad moderada', intensa: 'intensidad marcada' },
        };

        function budgetMatches(price, budget) {
            if (!budget) return true;
            if (budget === '0-800') return price <= 800;
            if (budget === '800-1000') return price > 800 && price <= 1000;
            if (budget === '1000-1200') return price > 1000 && price <= 1200;
            if (budget === '1200+') return price > 1200;
            return true;
        }

        function scorePerfumeForQuiz(p, answers) {
            let score = 0;
            const reasons = [];

            if (answers.gender) {
                if (p.gender === answers.gender) {
                    score += 6;
                    reasons.push('Ideal para ' + (QUIZ_LABELS.gender[answers.gender] || answers.gender));
                } else if (p.gender === 'unisex') {
                    score += 3;
                    reasons.push('Versátil y unisex');
                }
            }
            if (answers.occasion && p.occasion === answers.occasion) {
                score += 5;
                reasons.push('Perfecto para ' + (QUIZ_LABELS.occasion[answers.occasion] || answers.occasion));
            }
            if (answers.family && p.family === answers.family) {
                score += 6;
                reasons.push('Coincide con tu preferencia ' + (QUIZ_LABELS.family[answers.family] || answers.family));
            }
            if (answers.intensity === 'intensa' && p.price >= 900) {
                score += 3;
                reasons.push('Intensidad y presencia marcada');
            } else if (answers.intensity === 'suave' && p.price <= 850) {
                score += 3;
                reasons.push('Elegancia discreta y cercana');
            } else if (answers.intensity === 'moderada') {
                score += 2;
                reasons.push('Intensidad equilibrada');
            }
            if (answers.budget && budgetMatches(p.price, answers.budget)) {
                score += 5;
                reasons.push('Dentro de tu presupuesto');
            } else if (answers.budget) {
                const diff = Math.abs(p.price - budgetMidpoint(answers.budget));
                if (diff <= 80) { score += 1; reasons.push('Cerca de tu rango de precio'); }
            }
            if (!reasons.length) reasons.push('Excelente opción de nuestra colección HND');

            return { score, reason: reasons.slice(0, 2).join(' · ') };
        }

        function budgetMidpoint(budget) {
            if (budget === '0-800') return 760;
            if (budget === '800-1000') return 900;
            if (budget === '1000-1200') return 1100;
            if (budget === '1200+') return 1300;
            return 900;
        }

        function saveQuizResults(answers, recommendations) {
            try {
                localStorage.setItem('ventureZoneQuizResults', JSON.stringify({
                    answers,
                    recommendations: recommendations.map(p => ({ id: p.id, name: p.name, line: p.line, price: p.price })),
                    date: Date.now(),
                }));
            } catch (_) { /* storage unavailable */ }
        }

        function showQuizToast(msg) {
            document.querySelector('.quiz-share-toast')?.remove();
            const t = document.createElement('div');
            t.className = 'quiz-share-toast';
            t.setAttribute('role', 'status');
            t.textContent = msg;
            document.body.appendChild(t);
            setTimeout(() => t.remove(), 3200);
        }

        function initPerfumeQuiz() {
            const panel = document.getElementById('perfumeQuiz');
            if (!panel) return;

            const TOTAL_STEPS = 5;
            const steps = [...panel.querySelectorAll('.quiz-step')];
            const quizBody = document.getElementById('quizBody');
            const results = document.getElementById('quizResults');
            const resultsList = document.getElementById('quizResultsList');
            const progressFill = document.getElementById('quizProgressFill');
            const progressLabel = document.getElementById('quizProgressLabel');
            const progressPct = document.getElementById('quizProgressPct');
            const progressTrack = panel.querySelector('.quiz-progress-track');
            const prevBtn = document.getElementById('quizPrevBtn');
            const restartBtn = document.getElementById('quizRestartBtn');
            const shareBtn = document.getElementById('quizShareBtn');
            const progressWrap = document.getElementById('quizProgressWrap');
            const quizNav = panel.querySelector('.quiz-nav');

            const answers = {};
            let currentStep = 0;
            let lastRecommendations = [];

            const updateProgress = (step) => {
                const pct = Math.round(((step + 1) / TOTAL_STEPS) * 100);
                const displayStep = Math.min(step + 1, TOTAL_STEPS);
                if (progressFill) progressFill.style.width = pct + '%';
                if (progressLabel) progressLabel.textContent = 'Pregunta ' + displayStep + ' de ' + TOTAL_STEPS;
                if (progressPct) progressPct.textContent = pct + '%';
                if (progressTrack) {
                    progressTrack.setAttribute('aria-valuenow', String(pct));
                }
            };

            const showStep = (n) => {
                currentStep = n;
                steps.forEach((s, i) => s.classList.toggle('is-active', i === n));
                results.hidden = true;
                if (quizBody) quizBody.hidden = false;
                if (progressWrap) progressWrap.hidden = false;
                if (quizNav) quizNav.hidden = false;
                updateProgress(n);
                if (prevBtn) prevBtn.disabled = n === 0;

                const key = steps[n]?.dataset.q;
                if (key && answers[key]) {
                    const stepEl = steps[n];
                    stepEl.querySelectorAll('.quiz-option').forEach(opt => {
                        opt.classList.toggle('is-selected', opt.dataset.value === answers[key]);
                    });
                }
            };

            const showResults = () => {
                const ranked = [...PERFUMES_DATA]
                    .map(p => {
                        const { score, reason } = scorePerfumeForQuiz(p, answers);
                        return { ...p, score, reason };
                    })
                    .sort((a, b) => b.score - a.score || a.price - b.price)
                    .slice(0, 3);

                lastRecommendations = ranked;
                saveQuizResults(answers, ranked);

                resultsList.innerHTML = ranked.map((p, i) =>
                    '<article class="quiz-result-card">' +
                    '<div class="quiz-result-card-media"><img src="../images/' + p.img + '" alt="' + p.name + '" width="110" height="147" loading="lazy" decoding="async"></div>' +
                    '<div class="quiz-result-card-body">' +
                    '<span class="quiz-result-rank">Recomendación #' + (i + 1) + '</span>' +
                    '<p class="quiz-result-brand">' + p.line + ' · ' + p.type + '</p>' +
                    '<h4 class="h-mix quiz-result-name">' + p.name + '</h4>' +
                    (p.tagline ? '<p class="ui-text" style="font-style:italic;font-size:0.65rem;margin-bottom:10px;color:var(--color-muted);">' + p.tagline + '</p>' : '') +
                    '<p class="quiz-result-why"><strong>¿Por qué?</strong> ' + p.reason + '</p>' +
                    '<p class="ui-text" style="font-size:0.62rem;margin-bottom:12px;line-height:1.7;">' + (p.desc ? p.desc.substring(0, 160) + (p.desc.length > 160 ? '…' : '') : '') + '</p>' +
                    '<p class="quiz-result-price">$' + p.price.toLocaleString('es-MX') + '</p>' +
                    '<button type="button" class="btn-p" onclick="scrollToProduct(\\'' + p.id + '\\')">Ver detalles</button>' +
                    '</div></article>'
                ).join('');

                steps.forEach(s => s.classList.remove('is-active'));
                if (quizBody) quizBody.hidden = true;
                if (progressWrap) progressWrap.hidden = true;
                if (quizNav) quizNav.hidden = true;
                results.hidden = false;
                results.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'nearest' });
            };

            const selectAnswer = (stepIndex, key, value, optionEl) => {
                answers[key] = value;
                const stepEl = steps[stepIndex];
                stepEl.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('is-selected'));
                optionEl.classList.add('is-selected');

                setTimeout(() => {
                    if (stepIndex < steps.length - 1) showStep(stepIndex + 1);
                    else showResults();
                }, motionOK ? 280 : 0);
            };

            steps.forEach((stepEl, stepIndex) => {
                const key = stepEl.dataset.q;
                stepEl.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.addEventListener('click', () => selectAnswer(stepIndex, key, opt.dataset.value, opt));
                });
            });

            prevBtn?.addEventListener('click', () => {
                if (currentStep > 0) showStep(currentStep - 1);
            });

            restartBtn?.addEventListener('click', () => {
                Object.keys(answers).forEach(k => delete answers[k]);
                lastRecommendations = [];
                panel.querySelectorAll('.quiz-option.is-selected').forEach(o => o.classList.remove('is-selected'));
                showStep(0);
            });

            shareBtn?.addEventListener('click', async () => {
                if (!lastRecommendations.length) return;
                const lines = lastRecommendations.map((p, i) =>
                    (i + 1) + '. ' + p.name + ' (' + p.line + ') — $' + p.price.toLocaleString('es-MX')
                );
                const text = 'Mis fragancias recomendadas en Venture Zone:\\n\\n' + lines.join('\\n') + '\\n\\nDescubre la tuya: ' + window.location.href.split('#')[0] + '#recomendador';
                try {
                    if (navigator.share) {
                        await navigator.share({
                            title: 'Mis fragancias ideales — Venture Zone',
                            text,
                            url: window.location.href.split('#')[0] + '#recomendador',
                        });
                    } else if (navigator.clipboard) {
                        await navigator.clipboard.writeText(text);
                        showQuizToast('Resultados copiados al portapapeles');
                    } else {
                        showQuizToast(lines.join(' · '));
                    }
                } catch (err) {
                    if (err.name !== 'AbortError') showQuizToast('No se pudo compartir');
                }
            });

            showStep(0);
        }

        function initContactForm() {
            const form = document.getElementById('contactForm');
            const successPanel = document.getElementById('contactSuccess');
            const resetBtn = document.getElementById('contactResetBtn');
            if (!form) return;

            const rules = {
                nombre: { validate: v => v.trim().length >= 2, message: 'Ingresa al menos 2 caracteres.' },
                telefono: { validate: v => /^[\\d\\s+\\-()]{8,}$/.test(v.trim()), message: 'Introduce un teléfono válido.' },
                email: { validate: v => !v.trim() || /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v.trim()), message: 'Introduce un email válido.' },
                tipoPerfume: { validate: v => v.trim().length > 0, message: 'Selecciona un tipo de perfume.' },
                paraQuien: { validate: v => v.trim().length > 0, message: 'Indica para quién es.' },
                mensaje: { validate: () => true, message: '' }
            };

            function validateField(id, force = false) {
                const input = document.getElementById(id);
                const errorEl = document.getElementById(\`\${id}-error\`);
                if (!input || !rules[id]) return true;
                const rule = rules[id];
                const valid = rule.validate(input.value);
                const touched = input.value.length > 0 || force;
                const showError = !valid && touched;
                input.classList.toggle('is-invalid', showError);
                input.classList.toggle('is-valid', valid && input.value.length > 0);
                input.setAttribute('aria-invalid', showError ? 'true' : 'false');
                if (errorEl) errorEl.textContent = showError ? rule.message : '';
                return valid;
            }

            Object.keys(rules).forEach(id => {
                const input = document.getElementById(id);
                if (!input) return;
                input.addEventListener('input', () => validateField(id));
                input.addEventListener('change', () => validateField(id));
                input.addEventListener('blur', () => validateField(id, true));
            });

            resetBtn?.addEventListener('click', () => {
                form.reset();
                form.hidden = false;
                successPanel.hidden = true;
                form.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
                form.querySelectorAll('[aria-invalid="true"]').forEach(el => el.setAttribute('aria-invalid', 'false'));
                form.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; });
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const ok = Object.keys(rules).every(id => validateField(id, true));
                if (!ok) {
                    form.querySelector('.is-invalid, [aria-invalid="true"]')?.focus();
                    return;
                }
                sendWhatsApp(e);
                form.hidden = true;
                successPanel.hidden = false;
                successPanel.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'nearest' });
            });
        }

        function sendWhatsApp(e) {
            if (e) e.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            const tipoPerfume = document.getElementById('tipoPerfume').value;
            const presupuesto = document.getElementById('presupuesto').value;
            const paraQuien = document.getElementById('paraQuien').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            let text = \`Hola Venture Zone, busco asesoría en perfumes HND.\\n\\n\`;
            text += \`👤 Nombre: \${nombre}\\n\`;
            text += \`📞 Teléfono: \${telefono}\\n\`;
            if (email) text += \`📧 Email: \${email}\\n\`;
            text += \`🌸 Tipo de perfume: \${tipoPerfume}\\n\`;
            if (presupuesto) text += \`💰 Presupuesto: \${presupuesto}\\n\`;
            text += \`🎯 Para quién: \${paraQuien}\\n\`;
            if (mensaje) text += \`\\n💬 Mensaje:\\n\${mensaje}\\n\`;
            text += \`\\n⏱ Espero tu recomendación. ¡Gracias!\`;
            window.open(\`https://wa.me/523111213128?text=\${encodeURIComponent(text)}\`, '_blank', 'noopener,noreferrer');
        }

        function scrollToProduct(id) {
            const card = document.getElementById('card-' + id);
            if (card) {
                card.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'center' });
                card.style.outline = '2px solid var(--accent-vibrant)';
                setTimeout(() => { card.style.outline = ''; }, 2000);
            }
        }

        initScrollAnimations();
        initSectionTransitions();
        initSmoothScroll();
        initButtonRipples();
        initLazyImages();
        initFaqAccordion();
        initTestimonialCarousel();
        initPyramid();
        initPerfumeFilters();
        initBrandFilter();
        initPerfumeQuiz();
        initContactForm();

        const mobileMenu = document.getElementById('mobileMenu');
        const menuToggle = document.getElementById('menuToggle');
        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            menuToggle?.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
        menuToggle?.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileMenu));
        window.addEventListener('resize', () => { if (window.innerWidth >= 1024) closeMobileMenu(); });

        const searchProducts = ${JSON.stringify(searchProducts)};

        document.addEventListener('DOMContentLoaded', function() {
            const searchBtn = document.getElementById('searchBtn');
            const searchModal = document.getElementById('searchModal');
            const searchModalClose = document.getElementById('searchModalClose');
            const searchModalInput = document.getElementById('searchModalInput');
            const searchModalResults = document.getElementById('searchModalResults');
            const productCards = document.querySelectorAll('.product-card');

            function openSearchModal() {
                searchModal.classList.add('active');
                requestAnimationFrame(() => searchModalInput.focus());
                document.body.style.overflow = 'hidden';
            }
            function closeSearchModal() {
                searchModal.classList.remove('active');
                setTimeout(() => { searchModalInput.value = ''; searchModalResults.innerHTML = ''; }, 300);
                document.body.style.overflow = '';
            }
            function performSearch(query) {
                if (query.length < 2) { searchModalResults.innerHTML = '<div class="no-results">Escribe al menos 2 caracteres</div>'; return; }
                const filtered = searchProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
                searchModalResults.innerHTML = filtered.length === 0 ? '<div class="no-results">No se encontraron perfumes</div>' :
                    filtered.map(p => \`<div class="search-modal-result-item" role="button" tabindex="0" onclick="selectProductFromModal('\${p.name.replace(/'/g, "\\\\'")}')"><img src="\${p.image}" alt="" class="search-modal-result-image" loading="lazy" decoding="async" width="56" height="56"><div class="search-modal-result-info"><h4>\${p.name}</h4><p>\${p.description}</p></div><div class="search-modal-result-price">\${p.price}</div></div>\`).join('');
            }
            window.selectProductFromModal = function(productName) {
                closeSearchModal();
                document.querySelectorAll('.filter-input:checked').forEach(el => { el.checked = false; });
                let visible = 0;
                document.querySelectorAll('#perfumesGrid .perfume-card').forEach(card => {
                    const cardName = card.dataset.product || '';
                    const show = cardName.toLowerCase().includes(productName.toLowerCase());
                    card.classList.toggle('is-hidden', !show);
                    if (show) visible++;
                });
                updateFilterUI(visible);
                const target = document.querySelector('#perfumesGrid .perfume-card:not(.is-hidden)');
                target?.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'center' });
                document.getElementById('coleccion')?.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'nearest' });
            };
            searchBtn?.addEventListener('click', openSearchModal);
            searchModalClose?.addEventListener('click', closeSearchModal);
            searchModalInput?.addEventListener('input', function() { performSearch(this.value); });
            searchModal?.addEventListener('click', e => { if (e.target === searchModal) closeSearchModal(); });
            document.addEventListener('keydown', e => { if (e.key === 'Escape' && searchModal?.classList.contains('active')) closeSearchModal(); });

            loadCartFromStorage();
            syncCartWithOtherPages();
        });

        let cartItems = [], cartCount = 0, buttonClicking = false;

        function loadCartFromStorage() {
            const saved = localStorage.getItem('ventureZoneCart');
            if (saved) {
                try { const d = JSON.parse(saved); cartItems = d.items || []; cartCount = d.count || 0; updateCartDisplay(); }
                catch { cartItems = []; cartCount = 0; updateCartDisplay(); }
            }
        }
        function syncCartWithOtherPages() {
            window.addEventListener('storage', e => { if (e.key === 'ventureZoneCart') loadCartFromStorage(); });
        }
        function saveCartToStorage() {
            const d = { items: cartItems, count: cartCount, timestamp: Date.now() };
            localStorage.setItem('ventureZoneCart', JSON.stringify(d));
            localStorage.setItem('venturazone_cart', JSON.stringify(d));
            localStorage.setItem('carrito_venturazone', JSON.stringify(cartItems));
        }
        function increaseQuantity(id) {
            if (buttonClicking) return; buttonClicking = true;
            const el = document.getElementById('quantity' + id.replace('product', ''));
            if (el) el.textContent = parseInt(el.textContent) + 1;
            setTimeout(() => { buttonClicking = false; }, 100);
        }
        function decreaseQuantity(id) {
            if (buttonClicking) return; buttonClicking = true;
            const el = document.getElementById('quantity' + id.replace('product', ''));
            if (el && parseInt(el.textContent) > 1) el.textContent = parseInt(el.textContent) - 1;
            setTimeout(() => { buttonClicking = false; }, 100);
        }
        function getQuantity(id) { return parseInt(document.getElementById('quantity' + id.replace('product', ''))?.textContent) || 1; }

        function addToCart(name, price, id) {
            const qty = getQuantity(id);
            const ex = cartItems.find(i => i.name === name);
            if (ex) ex.quantity += qty; else cartItems.push({ name, price, quantity: qty, id });
            cartCount += qty; updateCartDisplay(); saveCartToStorage(); showCartNotification(name, qty);
        }
        function updateCartDisplay() {
            const el = document.querySelector('.cart-count');
            if (el) { el.textContent = cartCount; el.style.transform = 'scale(1.2)'; setTimeout(() => { el.style.transform = 'scale(1)'; }, 200); }
        }
        function showCartNotification(name, qty) {
            const n = document.createElement('div');
            n.style.cssText = 'position:fixed;top:80px;right:20px;background:var(--surface-inverse);color:var(--text-on-inverse);padding:14px 20px;font-family:Arial;font-size:0.65rem;letter-spacing:.14em;text-transform:uppercase;z-index:10001;animation:slideIn .3s ease-out;border:1px solid var(--border-color);';
            n.textContent = \`✓ \${name}\${qty > 1 ? ' (' + qty + ')' : ''} agregado\`;
            document.body.appendChild(n);
            setTimeout(() => { n.style.animation = 'slideOut .3s ease-in'; setTimeout(() => n.remove(), 300); }, 3000);
        }
        function openCart() {
            if (!cartItems.length) { alert('Tu carrito está vacío'); return; }
            const modal = document.createElement('div');
            modal.className = 'cart-modal-overlay';
            modal.style.cssText = 'position:fixed;inset:0;background:var(--modal-overlay);display:flex;justify-content:center;align-items:center;z-index:10000;';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-label', 'Carrito de compras');
            const box = document.createElement('div');
            box.className = 'cart-modal-box';
            box.style.cssText = 'background:var(--card-bg);border:1px solid var(--border-color);color:var(--text-primary);padding:40px;max-width:500px;width:90%;max-height:80vh;overflow-y:auto;';
            let total = 0;
            let html = '<h2 class="h-mix" style="text-align:center;margin-bottom:8px;font-size:1.2rem;">🛒 Carrito</h2><p class="sec-label" style="text-align:center;margin-bottom:24px;">Ve al catálogo principal para completar tu compra</p>';
            cartItems.forEach((item, i) => {
                const t = item.price * item.quantity; total += t;
                const safeName = item.name.replace(/'/g, "\\\\'");
                html += \`<div style="display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid var(--border-color);gap:12px;flex-wrap:wrap;"><div><h4 style="margin:0;font-size:0.85rem;color:var(--text-primary);">\${item.name}</h4><p class="sec-label" style="margin:4px 0;">$\${item.price} c/u</p></div><div style="display:flex;align-items:center;gap:10px;"><button type="button" onclick="removeFromCart(\${i})" aria-label="Disminuir cantidad" style="border:1px solid var(--border-color);background:var(--card-bg);color:var(--text-primary);width:28px;height:28px;cursor:pointer;">−</button><span style="font-size:0.72rem;">\${item.quantity}</span><button type="button" onclick="addOneFromCart('\${safeName}',\${item.price},'\${item.id||'temp'}')" aria-label="Aumentar cantidad" style="border:1px solid var(--text-primary);background:var(--text-primary);color:var(--bg-primary);width:28px;height:28px;cursor:pointer;">+</button></div><span class="font-display" style="font-style:italic;color:var(--text-primary);">$\${t}</span></div>\`;
            });
            const shippingCost = total >= 500 ? 0 : 50;
            const finalTotal = total + shippingCost;
            html += \`<div style="padding-top:20px;margin-top:12px;border-top:1px solid var(--border-color);"><div style="background:var(--bg-secondary);padding:16px;margin-bottom:20px;border:1px solid var(--border-color);"><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.72rem;letter-spacing:0.1em;"><span>Subtotal:</span><span>$\${total}</span></div><div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.72rem;letter-spacing:0.1em;"><span>Envío:</span><span>\${shippingCost === 0 ? 'GRATIS' : '$' + shippingCost}</span></div><div style="display:flex;justify-content:space-between;font-weight:700;font-size:0.85rem;padding-top:12px;border-top:1px solid var(--border-color);"><span>Total:</span><span>$\${finalTotal}</span></div>\${shippingCost === 0 ? '<p class="sec-label" style="margin:8px 0 0;color:#38a169;">🎉 Envío gratis por compras mayores a $500</p>' : '<p class="sec-label" style="margin:8px 0 0;">Agrega $' + (500 - total) + ' más para envío gratis</p>'}</div><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;"><button type="button" class="btn-s" onclick="clearCart();closeCartModal();" style="padding:12px 20px;">Vaciar</button><button type="button" class="btn-p" onclick="goToCatalog()" style="padding:12px 20px;">Ir al Catálogo para Comprar</button><button type="button" class="btn-s" onclick="closeCartModal()" style="padding:12px 20px;">Cerrar</button></div></div>\`;
            box.innerHTML = html; modal.appendChild(box); document.body.appendChild(modal);
            modal.addEventListener('click', e => { if (e.target === modal) closeCartModal(); });
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') { closeCartModal(); document.removeEventListener('keydown', escHandler); }
            });
        }
        function addOneFromCart(name, price, id) {
            const ex = cartItems.find(i => i.name === name);
            if (ex) { ex.quantity++; cartCount++; updateCartDisplay(); saveCartToStorage(); closeCartModal(); openCart(); }
        }
        function closeCartModal() { document.querySelector('.cart-modal-overlay')?.remove(); }
        function removeFromCart(i) {
            if (cartItems[i].quantity > 1) { cartItems[i].quantity--; cartCount--; }
            else { cartItems.splice(i, 1); cartCount = Math.max(0, cartCount - 1); }
            updateCartDisplay(); saveCartToStorage(); closeCartModal(); openCart();
        }
        function clearCart() { cartItems = []; cartCount = 0; updateCartDisplay(); saveCartToStorage(); }
        function goToCatalog() {
            saveCartToStorage();
            closeCartModal();
            navigateWithPageLoader(new URL('catalogo-adaptado.html', window.location.href).href);
        }

        window.increaseQuantity = increaseQuantity;
        window.decreaseQuantity = decreaseQuantity;
        window.addToCart = addToCart;
        window.openCart = openCart;
        window.closeCartModal = closeCartModal;
        window.removeFromCart = removeFromCart;
        window.clearCart = clearCart;
        window.goToCatalog = goToCatalog;
        window.addOneFromCart = addOneFromCart;
        window.sendWhatsApp = sendWhatsApp;
        window.scrollToProduct = scrollToProduct;

    </script>
</body>
</html>`;

const out = shell + main + footer;
fs.writeFileSync(path.join(__dirname, 'areaperfumes.html'), out, 'utf8');
console.log('Generated: areaperfumes.html (' + out.length + ' bytes)');
