/*
 * HOTEL DE INSECTOS — CONTENIDO EDITABLE
 * =======================================
 * 1) Para cambiar textos definitivos, funciones ecológicas o rutas de imágenes, edita el array MATERIALES.
 * 2) Para mover un punto del hotel, modifica top y left (valores en porcentaje) de cada material.
 *    Ejemplo: top: 42, left: 64 sitúa el punto al 42 % de alto y 64 % de ancho de la imagen.
 *    Las coordenadas se miden sobre la foto completa, sin recorte.
 * 3) Las rutas propuestas para fotos son assets/insectos/nombre-del-archivo.jpg.
 *    Si una imagen no existe, se muestra automáticamente un respaldo visual, sin iconos rotos.
 * 4) Los textos de INFORMACION_GENERAL y SOBRE_NOSOTROS quedan listos para editarse.
 * 5) Pega el enlace de inserción de Canva en CONFIG_CANVA_EMBED_URL.
 */

const MATERIALES = [
  {
    nombre: "Cañas de bambú", top: 19, left: 64, imagen: "assets/insectos/abeja-solitaria.jpg",
    descripcion: "Los huecos secos de las cañas son pequeñas habitaciones. Muchas abejas solitarias los usan para dejar sus huevos protegidos.",
    funcion: "Ofrecen refugio y lugares de cría a polinizadores como las abejas solitarias."
  },
  {
    nombre: "Paja", top: 39, left: 34, imagen: "assets/insectos/crisopa.jpg",
    descripcion: "La paja crea una maraña ligera y cálida con muchos espacios estrechos donde esconderse.",
    funcion: "Sirve de abrigo para crisopas, mariquitas y otros insectos beneficiosos."
  },
  {
    nombre: "Corteza y piñas", top: 39, left: 62, imagen: "assets/insectos/mariquita.jpg",
    descripcion: "Sus grietas, escamas y relieves forman pasadizos naturales muy parecidos a los del bosque.",
    funcion: "Dan cobijo a mariquitas y pequeños escarabajos que ayudan a controlar pulgones."
  },
  {
    nombre: "Hojas secas", top: 61, left: 37, imagen: "assets/insectos/escarabajo.jpg",
    descripcion: "Una capa de hojas mantiene la humedad y se transforma lentamente en alimento para la vida del suelo.",
    funcion: "Favorece a descomponedores y protege pequeños invertebrados durante el frío."
  },
  {
    nombre: "Tejas", top: 61, left: 70, imagen: "assets/insectos/tijereta.jpg",
    descripcion: "Las tejas crean rendijas secas, oscuras y con una temperatura más estable que el exterior.",
    funcion: "Forman escondites seguros para arañas, tijeretas y otros visitantes nocturnos."
  },
  {
    nombre: "Piedras", top: 82, left: 35, imagen: "assets/insectos/escarabajo-de-suelo.jpg",
    descripcion: "Entre las piedras se conservan pequeños huecos frescos y protegidos, especialmente cerca del suelo.",
    funcion: "Aportan refugio a insectos terrestres y ayudan a conservar microhábitats húmedos."
  },
  {
    nombre: "Ladrillos", top: 82, left: 64, imagen: "assets/insectos/abeja-albanil.jpg",
    descripcion: "Los agujeros de los ladrillos funcionan como túneles y cavidades resistentes frente al tiempo.",
    funcion: "Pueden servir de escondite a abejas solitarias y otros invertebrados que buscan cavidades."
  }
];

/*
 * INFORMACIÓN GENERAL EDITABLE
 * Sustituye titulo y texto por la redacción final del proyecto. Añade o elimina tarjetas
 * si hiciera falta: la cuadrícula se adapta automáticamente.
 */
const INFORMACION_GENERAL = [
  { titulo: "Un refugio construido por materiales", texto: "El hotel reúne cavidades y texturas distintas: cañas, paja, corteza, hojas, tejas, piedras y ladrillos. Cada espacio ofrece condiciones diferentes." },
  { titulo: "Siete materiales, muchos microhábitats", texto: "Los huecos, rendijas y capas protegen del viento y de la lluvia, y crean lugares donde algunos invertebrados pueden descansar o reproducirse." },
  { titulo: "Huéspedes del hotel", texto: "Abejas solitarias, mariquitas, crisopas, escarabajos y otros pequeños animales pueden usar estos refugios. La presencia de huéspedes depende del lugar y de la temporada." },
  { titulo: "Un ecosistema conectado", texto: "Los insectos participan en procesos como la polinización y la descomposición. Un hotel es un recurso educativo que permite observar parte de esas relaciones." },
  { titulo: "Observar con cuidado", texto: "Conviene situar el hotel en un lugar estable, seco y tranquilo. Podemos observar sus cambios sin tocar los nidos ni retirar materiales ocupados." }
];

/* SOBRE NOSOTROS: reemplaza estos marcadores por la presentación acordada del equipo. */
const SOBRE_NOSOTROS = {
  intro: "Este apartado presenta al equipo que ha creado el proyecto. Completa los bloques con información revisada por el grupo.",
  bloques: [
    { titulo: "Nuestro equipo", texto: "[Añadir nombres o presentación colectiva del equipo y del centro.]" },
    { titulo: "Cómo nació la idea", texto: "[Contar brevemente qué motivó este proyecto y qué queríamos aprender.]" },
    { titulo: "Qué queremos compartir", texto: "[Explicar a quién va dirigida la web y qué esperamos que descubra cada visitante.]" }
  ]
};

/*
 * ECOESCUELAS: sustituye estos textos de preparación por la información confirmada del equipo.
 * Añade, elimina o reordena tarjetas editando el array secciones.
 */
const ECOESCUELAS = {
  intro: "Este espacio está preparado para incorporar la información del proyecto Ecoescuelas.",
  secciones: [
    { titulo: "El proyecto", texto: "Añade aquí la presentación, el centro participante y los objetivos acordados." },
    { titulo: "Acciones y calendario", texto: "Añade las actividades, fechas y personas responsables cuando estén confirmadas." },
    { titulo: "Recursos y contacto", texto: "Incluye enlaces, materiales y el contacto oficial que el equipo decida publicar." }
  ]
};

const PREGUNTAS_FRECUENTES = [
  { pregunta: "¿Qué es un hotel de insectos?", respuesta: "Es una estructura con cavidades y materiales que ofrece refugio a distintos invertebrados." },
  { pregunta: "¿Cómo exploro las zonas del hotel?", respuesta: "Entra en “Los 7 materiales del hotel” y toca cualquiera de los siete puntos para abrir su explicación." },
  { pregunta: "¿El juego es una prueba?", respuesta: "No. Es una defensa por carriles: coloca materiales, recoge néctar y evita que las plagas lleguen al hotel." },
  { pregunta: "¿Dónde se guardan los récords?", respuesta: "Por ahora se guardan únicamente en el almacenamiento local de este navegador." }
];

/* Pega aquí la URL pública de inserción de Canva cuando esté disponible. */
const CONFIG_CANVA_EMBED_URL = "";

const $ = (selector) => document.querySelector(selector);
const views = [...document.querySelectorAll(".view")];
let currentView = "bienvenida";
let hotelIlustrado = true;
let currentInfoTab = "video";
let introTimer;

function pushAppState(viewName, modal = null, data = {}, mode = "push") {
  const state = { hotelApp: true, view: viewName, modal, ...data };
  const subroute = modal || data.infoTab || "";
  const hash = `#${viewName}${subroute ? `/${subroute}` : ""}`;
  if (mode === "replace") window.history.replaceState(state, "", hash);
  else window.history.pushState(state, "", hash);
}

function renderView(viewName) {
  document.body.classList.toggle("is-game-view", viewName === "juego");
  views.forEach((view) => {
    const shouldShow = view.id === viewName;
    view.hidden = !shouldShow;
    view.classList.toggle("is-active", shouldShow);
  });
  currentView = viewName;
  window.dispatchEvent(new CustomEvent("hotel:viewchange", { detail: { view: viewName } }));
  document.body.classList.toggle("is-intro", viewName === "intro");
  syncActiveNavigation(viewName);
  window.requestAnimationFrame(fitHotelImage);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showView(viewName, { historyMode = "push" } = {}) {
  if (viewName === currentView && !document.querySelector(".modal:not([hidden])")) return;
  leaveCanvaFullscreen();
  hideAllModals();
  $(".section-nav").open = false;
  renderView(viewName);
  const stateData = viewName === "info" ? { infoTab: currentInfoTab } : {};
  pushAppState(viewName, null, stateData, historyMode);
}

function syncActiveNavigation(viewName) {
  document.querySelectorAll("[data-go]").forEach((button) => {
    const selected = button.dataset.go === viewName;
    button.classList.toggle("is-current", selected);
    if (selected) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  const homeButton = $("#volverMenu");
  const isHub = viewName === "hub";
  homeButton.classList.toggle("is-current", isHub);
  if (isHub) homeButton.setAttribute("aria-current", "page");
  else homeButton.removeAttribute("aria-current");
}

function setInfoTab(tabName, { history = true, focus = false } = {}) {
  const tab = document.querySelector(`[data-info-tab="${tabName}"]`);
  const validTab = tab ? tabName : "video";
  currentInfoTab = validTab;
  document.querySelectorAll("[data-info-tab]").forEach((button) => {
    const selected = button.dataset.infoTab === validTab;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  document.querySelectorAll(".info-panel").forEach((panel) => {
    panel.hidden = panel.id !== `infoPanel${validTab[0].toUpperCase()}${validTab.slice(1)}`;
  });
  if (history && currentView === "info") pushAppState("info", null, { infoTab: validTab });
  if (focus) tab?.focus();
}

function hideAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => { modal.hidden = true; });
  document.body.style.overflow = "";
}

function restoreHistoryState(state) {
  leaveCanvaFullscreen();
  const validView = state?.hotelApp && views.some((view) => view.id === state.view) ? state.view : "bienvenida";
  if (validView !== "intro") {
    window.clearTimeout(introTimer);
    $("#videoEntrada").pause();
    $("#videoEntrada").currentTime = 0;
  }
  renderView(validView);
  if (validView === "info") setInfoTab(state.infoTab || "video", { history: false });
  hideAllModals();
  if (!state?.hotelApp || !state.modal) return;
  if (state.modal === "material") renderMaterialModal(state.materialIndex ?? 0, { history: false });
  else if (state.modal === "guia") showUtilityModal(state.modal, { history: false });
}

function showUtilityModal(kind, { history = true } = {}) {
  hideAllModals();
  const modal = $("#modalGuia");
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  if (history) pushAppState(currentView, kind, currentView === "info" ? { infoTab: currentInfoTab } : {});
  modal.querySelector(".modal-close").focus();
}

function markImageFallback(image, container) {
  // No se usa { once: true }: el visitante puede abrir varios materiales con fotos aún pendientes.
  image.addEventListener("error", () => container.classList.add("is-missing"));
  image.addEventListener("load", () => container.classList.remove("is-missing"));
  // La imagen puede haber fallado antes de que se registre el listener (por ejemplo, desde la caché).
  if (image.complete && !image.naturalWidth) container.classList.add("is-missing");
}

// Crea los 7 puntos. No hay coordenadas en CSS: todas están agrupadas en MATERIALES arriba.
function buildHotspots() {
  const container = $("#puntosHotel");
  MATERIALES.forEach((material, index) => {
    const point = document.createElement("button");
    point.type = "button";
    point.className = "hotspot";
    point.style.top = `${material.top}%`;
    point.style.left = `${material.left}%`;
    point.textContent = index + 1;
    point.setAttribute("aria-label", `Abrir información: ${material.nombre}`);
    point.addEventListener("click", () => openMaterial(index));
    container.append(point);
  });
}

function renderGeneralInfo() {
  const container = $("#infoCards");
  INFORMACION_GENERAL.forEach((item, index) => {
    const card = document.createElement("article");
    const number = document.createElement("span");
    const title = document.createElement("h3");
    const text = document.createElement("p");
    number.textContent = String(index + 1).padStart(2, "0");
    title.textContent = item.titulo;
    text.textContent = item.texto;
    card.append(number, title, text);
    container.append(card);
  });
}

function renderAbout() {
  $("#aboutIntro").textContent = SOBRE_NOSOTROS.intro;
  const container = $("#aboutCards");
  SOBRE_NOSOTROS.bloques.forEach((item, index) => {
    const card = document.createElement("article");
    const number = document.createElement("span");
    const title = document.createElement("h3");
    const text = document.createElement("p");
    number.textContent = String(index + 1).padStart(2, "0");
    title.textContent = item.titulo;
    text.textContent = item.texto;
    card.append(number, title, text);
    container.append(card);
  });
}

function renderEcoescuelas() {
  $("#ecoIntro").textContent = ECOESCUELAS.intro;
  const container = $("#ecoCards");
  ECOESCUELAS.secciones.forEach((item, index) => {
    const card = document.createElement("article");
    card.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><h3></h3><p></p>`;
    card.querySelector("h3").textContent = item.titulo;
    card.querySelector("p").textContent = item.texto;
    container.append(card);
  });
}

function renderFaq() {
  const container = $("#faqList");
  PREGUNTAS_FRECUENTES.forEach((item, index) => {
    const details = document.createElement("details");
    details.className = "faq-item";
    if (index === 0) details.open = true;
    const summary = document.createElement("summary");
    const answer = document.createElement("p");
    summary.textContent = item.pregunta;
    answer.textContent = item.respuesta;
    details.append(summary, answer);
    container.append(details);
  });
}

function configureCanvaEmbed() {
  const placeholder = $("#canvaPlaceholder");
  const iframe = $("#canvaPresentation");
  const embedUrl = CONFIG_CANVA_EMBED_URL.trim();
  if (!embedUrl) return;
  try {
    const url = new URL(embedUrl);
    if (url.protocol !== "https:" || !(url.hostname === "canva.com" || url.hostname.endsWith(".canva.com"))) {
      throw new Error("Usa el enlace seguro de inserción de Canva.");
    }
    iframe.src = url.href;
    iframe.hidden = false;
    placeholder.hidden = true;
  } catch {
    placeholder.querySelector("strong").textContent = "Revisa el enlace de Canva";
    placeholder.querySelector("p").textContent = "Pega un enlace HTTPS de inserción de Canva en CONFIG_CANVA_EMBED_URL, en js/app.js.";
  }
}

function updateCanvaFullscreenButton() {
  const viewer = $(".canva-layout");
  const button = $("#canvaFullscreen");
  const expanded = document.fullscreenElement === viewer || viewer.classList.contains("is-expanded");
  button.setAttribute("aria-pressed", String(expanded));
  button.textContent = expanded ? "Salir de pantalla completa" : "Ver presentación a pantalla completa";
}

async function toggleCanvaFullscreen() {
  const viewer = $(".canva-layout");
  if (document.fullscreenElement === viewer) {
    await document.exitFullscreen?.();
    return;
  }
  if (viewer.classList.contains("is-expanded")) {
    viewer.classList.remove("is-expanded");
    updateCanvaFullscreenButton();
    return;
  }
  if (viewer.requestFullscreen) {
    try {
      await viewer.requestFullscreen();
      return;
    } catch {
      // Algunos móviles no permiten pantalla completa: el modo expandido mantiene los controles.
    }
  }
  viewer.classList.add("is-expanded");
  updateCanvaFullscreenButton();
}

function leaveCanvaFullscreen() {
  const viewer = $(".canva-layout");
  viewer.classList.remove("is-expanded");
  if (document.fullscreenElement === viewer) {
    document.exitFullscreen?.().catch(() => { /* El navegador conserva el control de la salida. */ });
  }
}

async function openCanvaMaterial(index) {
  const viewer = $(".canva-layout");
  if (document.fullscreenElement === viewer) {
    try { await document.exitFullscreen(); } catch { return; }
    if (document.fullscreenElement === viewer) return;
  }
  viewer.classList.remove("is-expanded");
  updateCanvaFullscreenButton();
  renderMaterialModal(index);
}

// Ajusta el contenedor de puntos al rectángulo visible de la imagen completa.
// Así object-fit: contain nunca deja los puntos desplazados en las bandas laterales/superiores.
function fitHotelImage() {
  const scene = $("#hotelScene");
  const stage = $("#hotelStage");
  const image = $("#imagenHotel");
  if (!image.naturalWidth || !image.naturalHeight || !scene.clientWidth || !scene.clientHeight) return;
  const scale = Math.min(scene.clientWidth / image.naturalWidth, scene.clientHeight / image.naturalHeight);
  stage.style.width = `${Math.round(image.naturalWidth * scale)}px`;
  stage.style.height = `${Math.round(image.naturalHeight * scale)}px`;
}

function renderMaterialModal(index, { history = true } = {}) {
  const material = MATERIALES[index];
  if (!material) return;
  const modal = $("#modalMaterial");
  const image = $("#imagenInsecto");
  const imageBox = $("#modalImage");
  $("#modalNumber").textContent = `Material ${String(index + 1).padStart(2, "0")}`;
  $("#modalTitle").textContent = material.nombre;
  $("#modalDescription").textContent = material.descripcion;
  $("#modalFunction").textContent = material.funcion;
  imageBox.classList.remove("is-missing");
  image.src = material.imagen;
  image.alt = `Ejemplo de insecto asociado a ${material.nombre}`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  if (history) pushAppState(currentView, "material", {
    materialIndex: index,
    ...(currentView === "info" ? { infoTab: currentInfoTab } : {})
  });
  $(".modal-close").focus();
}

function openMaterial(index) {
  renderMaterialModal(index);
}

function closeModal() {
  if (document.querySelector(".modal:not([hidden])")) {
    if (window.history.state?.hotelApp && window.history.state.modal) window.history.back();
    else hideAllModals();
  }
}

function goHub() {
  window.clearTimeout(introTimer);
  const video = $("#videoEntrada");
  video.pause();
  video.currentTime = 0;
  if (document.fullscreenElement) document.exitFullscreen?.();
  showView("hub", { historyMode: "replace" });
}

function toggleHotelImage() {
  hotelIlustrado = !hotelIlustrado;
  const image = $("#imagenHotel");
  image.src = hotelIlustrado ? "assets/hotel-animado.png" : "assets/hotel-real.jpg";
  image.alt = hotelIlustrado
    ? "Ilustración interactiva de un hotel de insectos con siete zonas"
    : "Fotografía interactiva de un hotel de insectos con siete zonas";
  $("#alternarHotel").textContent = hotelIlustrado ? "Ver foto real" : "Ver versión ilustrada";
}

function playIntroVideo() {
  showView("intro");
  const video = $("#videoEntrada");
  let movedOn = false;
  const finish = () => { if (!movedOn) { movedOn = true; goHub(); } };
  const useFallback = () => {
    video.style.display = "none";
    // La animación dura unos segundos y después lleva al menú sin dejar la pantalla vacía.
    introTimer = window.setTimeout(finish, 3500);
  };
  video.style.display = "block";
  video.currentTime = 0;
  video.onended = finish;
  video.onerror = useFallback;
  document.documentElement.requestFullscreen?.().catch(() => { /* En móvil/navegador bloqueado continúa en la propia página. */ });
  const playAttempt = video.play();
  if (playAttempt) playAttempt.catch(useFallback);
  // Protección si el archivo está presente pero tarda demasiado o no responde.
  window.setTimeout(() => { if (video.readyState === 0 && !movedOn) useFallback(); }, 2500);
}

// El avión atraviesa la bienvenida y su llegada inicia directamente el vídeo de entrada.
function startIntro() {
  const welcome = $("#bienvenida");
  const button = $("#empezar");
  const plane = $("#avionTransicion");
  button.disabled = true;
  welcome.classList.add("is-flying");
  plane.addEventListener("animationend", () => {
    welcome.classList.remove("is-flying");
    button.disabled = false;
    playIntroVideo();
  }, { once: true });
}

function setupMediaFallbacks() {
  const videoInfo = $("#videoInformativo");
  const podcast = $("#audioPodcast");
  // El panel muestra un aviso amigable mientras el archivo multimedia no exista.
  videoInfo.addEventListener("canplay", () => {
    videoInfo.classList.remove("is-unavailable");
    videoInfo.parentElement.querySelector(".media-empty").hidden = true;
  });
  videoInfo.addEventListener("error", () => videoInfo.classList.add("is-unavailable"));
  podcast.addEventListener("canplay", () => {
    podcast.closest(".audio-panel").querySelector("h3").textContent = "Pódcast disponible";
    podcast.closest(".audio-panel").querySelector("p").textContent = "Pulsa reproducir para escucharlo.";
    $("#podcastPending").hidden = true;
    podcast.hidden = false;
  });
  podcast.addEventListener("error", () => {
    podcast.hidden = true;
    $("#podcastPending").hidden = false;
  });
}

function init() {
  buildHotspots();
  renderGeneralInfo();
  renderAbout();
  renderEcoescuelas();
  renderFaq();
  configureCanvaEmbed();
  updateCanvaFullscreenButton();
  markImageFallback($("#imagenHotel"), $("#hotelScene"));
  document.querySelectorAll(".zoom-frame img").forEach((image) => markImageFallback(image, image.parentElement));
  markImageFallback($("#imagenInsecto"), $("#modalImage"));
  setupMediaFallbacks();

  $("#imagenHotel").addEventListener("load", () => window.requestAnimationFrame(fitHotelImage));
  window.addEventListener("resize", fitHotelImage);
  if (window.ResizeObserver) new ResizeObserver(fitHotelImage).observe($("#hotelScene"));
  if ($("#imagenHotel").complete) window.requestAnimationFrame(fitHotelImage);

  $("#empezar").addEventListener("click", startIntro);
  $("#saltarIntro").addEventListener("click", goHub);
  $("#volverMenu").addEventListener("click", () => showView("hub"));
  $("#volverPortada").addEventListener("click", () => showView("bienvenida"));
  $("#abrirGuia").addEventListener("click", () => showUtilityModal("guia"));
  $("#alternarHotel").addEventListener("click", toggleHotelImage);
  document.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => {
    showView(button.dataset.go);
    $(".section-nav").open = false;
  }));
  document.querySelectorAll("[data-info-tab]").forEach((button) => {
    button.addEventListener("click", () => setInfoTab(button.dataset.infoTab));
  });
  $(".info-tabs").addEventListener("keydown", (event) => {
    const tabs = [...document.querySelectorAll("[data-info-tab]")];
    const currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex < 0) return;
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    setInfoTab(tabs[nextIndex].dataset.infoTab, { focus: true });
  });
  document.querySelectorAll("[data-material-index]").forEach((button) => {
    button.addEventListener("click", () => openCanvaMaterial(Number(button.dataset.materialIndex)));
  });
  $("#canvaFullscreen").addEventListener("click", toggleCanvaFullscreen);
  document.addEventListener("fullscreenchange", updateCanvaFullscreenButton);
  document.querySelectorAll("[data-close-modal]").forEach((node) => node.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
  window.addEventListener("popstate", (event) => restoreHistoryState(event.state));
  // La bienvenida es la raíz interna: el primer atrás del dispositivo sale de ella de forma normal.
  window.history.replaceState({ hotelApp: true, view: "bienvenida", modal: null }, "", "#bienvenida");
}

init();
