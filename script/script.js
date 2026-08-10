/* =========================================================
   PORTAL INMOBILIARIO — script.js
   ========================================================= */

/* ---------------------------------------------------------
   1) DATOS DE LAS PROPIEDADES
   Para cargar una propiedad nueva, copiá un bloque { ... }
   y completá los datos. Las fotos van en la carpeta /fotos.
   categoria: 'temporario' | 'anual' | 'venta'
   whatsapp: número completo con código de país, sin + ni espacios
   --------------------------------------------------------- */

const PROPIEDADES = [
  {
    id: 1,
    categoria: 'temporario',
    titulo: 'Casa 4 ambientes en Junín',
    ubicacion: 'Junín, Buenos Aires, Argentina',
    precio: '$60.000 El día',
    descripcion: 'Casa completamente amoblada. Apocas cuadras del centro de la ciudad, excelente ubicación. Ideal para estadías cortas, turismo o viajes de trabajo.',
    caracteristicas: ['2 Dormitorios','cocina', 'comedor', 'baño', 'Wifi', 'netflix', 'patio cerrado', 'Cochera opcional'],
    fotos: ['fotos/foto01.jpg', 'fotos/foto02.jpg', 'fotos/foto03.jpg', 'fotos/foto04.jpg', 'fotos/foto05.jpg'],
    lat: -34.5875,
    lng: -58.3974, 
    mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.5883628915285!2d-60.94378902409888!3d-34.58928085673618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b8eb26730330b5%3A0x7f21b229df1ed1b3!2sC.%20Italia%2092%2C%20B6022%20Jun%C3%ADn%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sco!4v1786221185951!5m2!1ses!2sco',
    whatsapp: '5492364532283',
  },
  {
    id: 2,
    categoria: 'anual',
    titulo: 'Casa 3 dormitorios en Tigre',
    ubicacion: 'Tigre, Buenos Aires',
    precio: '$ 420.000 / mes',
    descripcion: 'Casa con jardín y parrilla a 5 cuadras de la estación. Apta para familia, contrato anual con garantía propietaria opcional.',
    caracteristicas: ['3 dormitorios', '2 baños', 'Jardín', 'Parrilla'],
    fotos: ['fotos/casa-tigre-1.jpg', 'fotos/casa-tigre-2.jpg'],
    lat: -34.4264,
    lng: -58.5796,
    whatsapp: '5491100000002',
  },
  {
    id: 3,
    categoria: 'venta',
    titulo: 'Loft en Palermo Soho',
    ubicacion: 'Palermo, Buenos Aires',
    precio: 'USD 145.000',
    descripcion: 'Loft a nuevo con doble altura, balcón terraza y cochera fija. A pasos de Plaza Serrano.',
    caracteristicas: ['1 ambiente', 'Balcón', 'Cochera fija', 'A estrenar'],
    fotos: ['fotos/loft-palermo-1.jpg', 'fotos/loft-palermo-2.jpg'],
    lat: -34.5875,
    lng: -58.4257,
    whatsapp: '5491100000003',
  },
  {
    id: 4,
    categoria: 'temporario',
    titulo: 'PH con terraza en Chapinero',
    ubicacion: 'Chapinero, Bogotá',
    precio: 'COP 280.000 / noche',
    descripcion: 'PH renovado con terraza privada, ideal para estadías cortas. A 10 minutos caminando de la zona T.',
    caracteristicas: ['2 ambientes', 'Terraza', 'Wifi', 'Cocina completa'],
    fotos: ['fotos/ph-chapinero-1.jpg', 'fotos/ph-chapinero-2.jpg'],
    lat: 4.6533,
    lng: -74.0625,
    whatsapp: '5731100000004',
  },
  {
    id: 5,
    categoria: 'venta',
    titulo: 'Casa en barrio cerrado, Nordelta',
    ubicacion: 'Nordelta, Buenos Aires',
    precio: 'USD 320.000',
    descripcion: 'Casa de 4 ambientes en barrio cerrado con seguridad 24hs, pileta y quincho propio.',
    caracteristicas: ['4 ambientes', 'Pileta', 'Quincho', 'Seguridad 24hs'],
    fotos: ['fotos/casa-nordelta-1.jpg', 'fotos/casa-nordelta-2.jpg'],
    lat: -34.4019,
    lng: -58.6644,
    whatsapp: '5491100000005',
  },
  {
    id: 6,
    categoria: 'anual',
    titulo: 'Depto 1 dormitorio en Usaquén',
    ubicacion: 'Usaquén, Bogotá',
    precio: 'COP 1.900.000 / mes',
    descripcion: 'Departamento amoblado en edificio con portería. Contrato anual, apto profesional o pareja.',
    caracteristicas: ['1 dormitorio', 'Amoblado', 'Portería', 'Gimnasio'],
    fotos: ['fotos/depto-usaquen-1.jpg', 'fotos/depto-usaquen-2.jpg'],
    lat: 4.6947,
    lng: -74.0300,
    whatsapp: '5731100000006',
  },
];

const ETIQUETAS_CATEGORIA = {
  temporario: 'Alquiler temporario',
  anual: 'Alquiler anual',
  venta: 'En venta',
};

/* ---------------------------------------------------------
   2) ESTADO Y REFERENCIAS AL DOM
   --------------------------------------------------------- */

let filtroActual = 'todas';
let busquedaActual = '';
let galeriaFotos = [];
let galeriaIndice = 0;

const grid = document.getElementById('propiedadesGrid');
const sinResultados = document.getElementById('sinResultados');
const resultadosCount = document.getElementById('resultadosCount');
const filtrosBtns = document.querySelectorAll('.stamp-btn');

/* ---------------------------------------------------------
   3) RENDERIZAR TARJETAS
   --------------------------------------------------------- */

function crearTarjeta(prop) {
  const card = document.createElement('article');
  card.className = 'propiedad-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Ver detalle de ${prop.titulo}`);

  const mensajeWpp = encodeURIComponent(`Hola! Te escribo por "${prop.titulo}" que vi en el portal.`);

  card.innerHTML = `
    <div class="card-img-wrap">
      <img src="${prop.fotos[0]}" alt="${prop.titulo}" loading="lazy">
      <span class="badge badge-${prop.categoria}">${ETIQUETAS_CATEGORIA[prop.categoria]}</span>
    </div>
    <div class="card-body">
      <h3 class="card-titulo">${prop.titulo}</h3>
      <p class="card-ubicacion">📍 ${prop.ubicacion}</p>
      <p class="card-precio">${prop.precio}</p>
      <div class="card-footer">
        <div class="card-caracteristicas">${prop.caracteristicas.slice(0, 2).map(c => `<span>${c}</span>`).join('')}</div>
        <a href="https://wa.me/${prop.whatsapp}?text=${mensajeWpp}" target="_blank" rel="noopener" class="card-whatsapp" aria-label="Consultar por WhatsApp" onclick="event.stopPropagation()">
          <svg viewBox="0 0 32 32" class="icon-whatsapp" aria-hidden="true"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.634.86 5.07 2.316 7.05L4.8 27.2l5.293-1.457A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.627 28 15S22.629 3 16.001 3zm6.964 16.845c-.297.834-1.47 1.53-2.412 1.723-.643.132-1.482.238-4.312-.926-3.622-1.5-5.957-5.166-6.14-5.406-.176-.24-1.469-1.955-1.469-3.73 0-1.775.93-2.646 1.26-3.008.297-.324.65-.406.868-.406.217 0 .434.002.624.012.2.01.469-.076.734.559.297.71 1.008 2.451 1.096 2.629.088.178.146.387.03.626-.117.24-.176.39-.35.6-.176.21-.37.47-.528.63-.176.178-.36.37-.155.727.207.356.917 1.514 1.968 2.452 1.353 1.209 2.494 1.583 2.85 1.762.356.178.563.15.77-.09.207-.24.883-1.03 1.12-1.383.235-.353.47-.294.793-.176.324.117 2.06.972 2.412 1.148.353.178.588.264.674.412.088.15.088.858-.209 1.692z"/></svg>
        </a>
      </div>
    </div>
  `;

  card.addEventListener('click', () => abrirModal(prop));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      abrirModal(prop);
    }
  });

  return card;
}

function normalizarTexto(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // saca los acentos/tildes
    .toLowerCase()
    .trim();
}

function renderizarPropiedades() {
  const texto = normalizarTexto(busquedaActual);

  const filtradas = PROPIEDADES.filter(prop => {
    const coincideCategoria = filtroActual === 'todas' || prop.categoria === filtroActual;
    const coincideTexto = !texto ||
      normalizarTexto(prop.titulo).includes(texto) ||
      normalizarTexto(prop.ubicacion).includes(texto) ||
      normalizarTexto(ETIQUETAS_CATEGORIA[prop.categoria]).includes(texto) ||
      normalizarTexto(prop.categoria).includes(texto);
    return coincideCategoria && coincideTexto;
  });

  grid.innerHTML = '';
  filtradas.forEach(prop => grid.appendChild(crearTarjeta(prop)));

  sinResultados.hidden = filtradas.length > 0;
  grid.style.display = filtradas.length > 0 ? 'grid' : 'none';

  resultadosCount.textContent = filtradas.length === 1
    ? '1 propiedad encontrada'
    : `${filtradas.length} propiedades encontradas`;
}

/* ---------------------------------------------------------
   4) FILTROS POR CATEGORÍA
   --------------------------------------------------------- */

filtrosBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filtrosBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filtroActual = btn.dataset.filtro;
    renderizarPropiedades();
  });
});

// Links del footer que también filtran
document.querySelectorAll('[data-filtro-link]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const valor = link.dataset.filtroLink;
    filtrosBtns.forEach(b => b.classList.toggle('active', b.dataset.filtro === valor));
    filtroActual = valor;
    renderizarPropiedades();
    document.getElementById('propiedades').scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------------------------------------------------------
   5) BUSCADOR
   --------------------------------------------------------- */

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  busquedaActual = searchInput.value;
  renderizarPropiedades();
  document.getElementById('propiedades').scrollIntoView({ behavior: 'smooth' });
});

/* ---------------------------------------------------------
   6) MODAL DE PROPIEDAD + GALERÍA DE FOTOS
   --------------------------------------------------------- */

const modalOverlay = document.getElementById('modalOverlay');
const modalCerrar = document.getElementById('modalCerrar');
const modalImgPrincipal = document.getElementById('modalImgPrincipal');
const modalBadge = document.getElementById('modalBadge');
const modalTitulo = document.getElementById('modalTitulo');
const modalUbicacion = document.getElementById('modalUbicacion');
const modalPrecio = document.getElementById('modalPrecio');
const modalDescripcion = document.getElementById('modalDescripcion');
const modalCaracteristicas = document.getElementById('modalCaracteristicas');
const modalMapa = document.getElementById('modalMapa');
const modalWhatsapp = document.getElementById('modalWhatsapp');
const galeriaDots = document.getElementById('galeriaDots');
const galeriaPrev = document.getElementById('galeriaPrev');
const galeriaNext = document.getElementById('galeriaNext');

function abrirModal(prop) {
  modalBadge.textContent = ETIQUETAS_CATEGORIA[prop.categoria];
  modalBadge.className = `badge badge-${prop.categoria}`;
  modalTitulo.textContent = prop.titulo;
  modalUbicacion.textContent = `📍 ${prop.ubicacion}`;
  modalPrecio.textContent = prop.precio;
  modalDescripcion.textContent = prop.descripcion;

  modalCaracteristicas.innerHTML = prop.caracteristicas.map(c => `<li>${c}</li>`).join('');

  // Mapa: si la propiedad trae un link de Google Maps (mapaEmbed) se usa ese,
  // más preciso porque apunta a la dirección exacta. Si no, se arma uno
  // genérico con OpenStreetMap a partir de lat/lng.
  if (prop.mapaEmbed) {
    modalMapa.src = prop.mapaEmbed;
  } else {
    const delta = 0.01;
    const bbox = `${prop.lng - delta},${prop.lat - delta},${prop.lng + delta},${prop.lat + delta}`;
    modalMapa.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${prop.lat},${prop.lng}`;
  }

  const mensajeWpp = encodeURIComponent(`Hola! Te escribo por "${prop.titulo}" que vi en el portal.`);
  modalWhatsapp.href = `https://wa.me/${prop.whatsapp}?text=${mensajeWpp}`;

  galeriaFotos = prop.fotos;
  galeriaIndice = 0;
  actualizarGaleria();

  modalOverlay.classList.add('abierto');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  modalOverlay.classList.remove('abierto');
  document.body.style.overflow = '';
}

function actualizarGaleria() {
  modalImgPrincipal.src = galeriaFotos[galeriaIndice];
  modalImgPrincipal.alt = modalTitulo.textContent;

  galeriaDots.innerHTML = galeriaFotos
    .map((_, i) => `<span class="${i === galeriaIndice ? 'activo' : ''}" data-i="${i}"></span>`)
    .join('');

  const multiplesFotos = galeriaFotos.length > 1;
  galeriaPrev.style.display = multiplesFotos ? 'flex' : 'none';
  galeriaNext.style.display = multiplesFotos ? 'flex' : 'none';

  galeriaDots.querySelectorAll('span').forEach(dot => {
    dot.addEventListener('click', () => {
      galeriaIndice = parseInt(dot.dataset.i, 10);
      actualizarGaleria();
    });
  });
}

galeriaPrev.addEventListener('click', () => {
  galeriaIndice = (galeriaIndice - 1 + galeriaFotos.length) % galeriaFotos.length;
  actualizarGaleria();
});

galeriaNext.addEventListener('click', () => {
  galeriaIndice = (galeriaIndice + 1) % galeriaFotos.length;
  actualizarGaleria();
});

modalCerrar.addEventListener('click', cerrarModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) cerrarModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('abierto')) cerrarModal();
});

/* ---------------------------------------------------------
   7) MENÚ MÓVIL
   --------------------------------------------------------- */

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('abierto');
});

mainNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('abierto'));
});

/* ---------------------------------------------------------
   8) INICIALIZACIÓN
   --------------------------------------------------------- */

document.getElementById('year').textContent = new Date().getFullYear();
renderizarPropiedades();