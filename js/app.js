/*
 * HOTEL DE INSECTOS — CONTENIDO EDITABLE
 * =======================================
 * 1) Para cambiar textos definitivos, funciones ecológicas o rutas de imágenes, edita el array MATERIALES.
 * 2) Para mover un punto del hotel, modifica top y left (valores en porcentaje) de cada material.
 *    Ejemplo: top: 42, left: 64 sitúa el punto al 42 % de alto y 64 % de ancho de la imagen.
 *    Las coordenadas se miden sobre la foto completa, sin recorte.
 * 3) Las rutas propuestas para fotos son assets/insectos/nombre-del-archivo.jpg.
 *    Si una imagen no existe, se muestra automáticamente un respaldo visual, sin iconos rotos.
 * 4) El contenido de la página "Información" se rellena en INFORMACION_GENERAL, más abajo.
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
  { titulo: "¿Qué es?", texto: "Una estructura con materiales naturales que ofrece cobijo, lugares de cría y descanso a distintos invertebrados." },
  { titulo: "¿Por qué importa?", texto: "Favorece la biodiversidad, ayuda a polinizadores y nos permite observar la naturaleza muy de cerca." },
  { titulo: "¿Cómo cuidarlo?", texto: "Colócalo en un lugar tranquilo y seco. Observa sin molestar a sus habitantes ni retirar sus materiales." }
];

/*
 * ECOESCUELAS: sustituye estos textos de preparación por la información confirmada del equipo.
 * Añade, elimina o reordena tarjetas editando el array secciones.
 */
const ECOESCUELAS = {
  intro: "Este espacio está preparado para incorporar la información del proyecto Ecoescuelas.",
  secciones: [
    { titulo: "¿Qué es?", texto: "Añade aquí la presentación, el centro participante y los objetivos acordados." },
    { titulo: "¿Cuál es su función?", texto: "Añade las actividades, fechas y personas responsables cuando estén confirmadas." },
    { titulo: "Relación con el instituto", texto: "Incluye enlaces, materiales y el contacto oficial que el equipo decida publicar." }
  ]
};

const PREGUNTAS_FRECUENTES = [
  { pregunta: "¿Qué es un hotel de insectos?", respuesta: "Es una estructura con cavidades y materiales que ofrece refugio a distintos invertebrados." },
  { pregunta: "¿Cómo exploro las zonas del hotel?", respuesta: "Entra en “Ver el hotel” y toca cualquiera de los siete puntos para abrir su explicación." },
  { pregunta: "¿El juego es una prueba?", respuesta: "No. Es un reto rápido de reflejos: toca los huéspedes que aparecen para llevarlos al refugio y sumar puntos." },
  { pregunta: "¿Dónde se guardan los récords?", respuesta: "Por ahora se guardan únicamente en el almacenamiento local de este navegador." }
];

/*
 * CONFIGURACIÓN DE PREGUNTAS — completa emailDestino o endpoint antes de publicar el formulario.
 * emailDestino abre el correo del visitante con el mensaje preparado. Para FormSubmit, coloca en
 * endpoint su URL AJAX terminada en el correo verificado. Para EmailJS, cambia proveedor a "emailjs"
 * y completa emailJs. No se envía nada si falta la configuración. Nunca pongas claves privadas aquí.
 */
const CONFIG_PREGUNTAS = {
  emailDestino: "",
  proveedor: "formsubmit",
  // FormSubmit AJAX: endpoint que termina en el correo verificado. EmailJS: API pública del servicio.
  endpoint: "",
  emailJs: { serviceId: "", templateId: "", publicKey: "" }
};

/* Leaderboard: el guardado local funciona ya; sharedEndpoint queda como punto de conexión futura. */
const CONFIG_LEADERBOARD = {
  storageKey: "hotelInsectosLeaderboard",
  sharedEndpoint: ""
};

const HUÉSPEDES_JUEGO = [
  { nombre: "Abeja", icono: "🐝" }, { nombre: "Mariquita", icono: "🐞" },
  { nombre: "Mariposa", icono: "🦋" }, { nombre: "Escarabajo", icono: "🪲" },
  { nombre: "Crisopa", icono: "🦗" }, { nombre: "Abejorro", icono: "🐝" }
];

const $ = (selector) => document.querySelector(selector);
const views = [...document.querySelectorAll(".view")];
let currentView = "bienvenida";
let hotelIlustrado = false;
let introTimer;
let gameTimer = null;
let guestMoveTimer = null;
let gameActive = false;
let gameScoreValue = 0;
let gameComboValue = 0;
let gameSeconds = 30;
let currentGuest = null;

function pushAppState(viewName, modal = null, data = {}, mode = "push") {
  const state = { hotelApp: true, view: viewName, modal, ...data };
  const hash = `#${viewName}${modal ? `/${modal}` : ""}`;
  if (mode === "replace") window.history.replaceState(state, "", hash);
  else window.history.pushState(state, "", hash);
}

function renderView(viewName) {
  if (currentView === "juego" && viewName !== "juego" && gameActive) {
    gameActive = false;
    window.clearInterval(gameTimer);
    window.clearInterval(guestMoveTimer);
    $("#gameGuest").disabled = true;
    $("#startGame").disabled = false;
    $("#gameMessage").textContent = "Ronda detenida al salir. Puedes empezar otra cuando quieras.";
  }
  views.forEach((view) => {
    const shouldShow = view.id === viewName;
    view.hidden = !shouldShow;
    view.classList.toggle("is-active", shouldShow);
  });
  currentView = viewName;
  document.body.classList.toggle("is-intro", viewName === "intro");
  window.requestAnimationFrame(fitHotelImage);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showView(viewName, { historyMode = "push" } = {}) {
  if (viewName === currentView && !document.querySelector(".modal:not([hidden])")) return;
  hideAllModals();
  renderView(viewName);
  pushAppState(viewName, null, {}, historyMode);
}

function hideAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => { modal.hidden = true; });
  document.body.style.overflow = "";
}

function restoreHistoryState(state) {
  const validView = state?.hotelApp && views.some((view) => view.id === state.view) ? state.view : "bienvenida";
  if (validView !== "intro") {
    window.clearTimeout(introTimer);
    $("#videoEntrada").pause();
    $("#videoEntrada").currentTime = 0;
  }
  renderView(validView);
  hideAllModals();
  if (!state?.hotelApp || !state.modal) return;
  if (state.modal === "material") renderMaterialModal(state.materialIndex ?? 0, { history: false });
  else if (state.modal === "guia" || state.modal === "pregunta") showUtilityModal(state.modal, { history: false });
}

function showUtilityModal(kind, { history = true } = {}) {
  hideAllModals();
  const modal = kind === "guia" ? $("#modalGuia") : $("#modalPregunta");
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  if (history) pushAppState(currentView, kind);
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

function readLeaderboard() {
  try {
    const data = JSON.parse(localStorage.getItem(CONFIG_LEADERBOARD.storageKey) || "[]");
    return Array.isArray(data) ? data.filter((entry) => Number.isFinite(entry.score) && typeof entry.name === "string") : [];
  } catch {
    return [];
  }
}

function renderLeaderboard() {
  const list = $("#leaderboardList");
  const entries = readLeaderboard().sort((a, b) => b.score - a.score).slice(0, 10);
  list.replaceChildren();
  if (!entries.length) {
    const empty = document.createElement("li");
    empty.className = "leaderboard-empty";
    empty.textContent = "Aún no hay puntuaciones. ¡Inicia una ronda!";
    list.append(empty);
    return;
  }
  entries.forEach((entry) => {
    const row = document.createElement("li");
    const name = document.createElement("span");
    const score = document.createElement("strong");
    name.textContent = entry.name;
    score.textContent = `${entry.score} pts`;
    row.append(name, score);
    list.append(row);
  });
}

function placeGuest() {
  const guest = $("#gameGuest");
  currentGuest = HUÉSPEDES_JUEGO[Math.floor(Math.random() * HUÉSPEDES_JUEGO.length)];
  $("#gameGuestIcon").textContent = currentGuest.icono;
  $("#gameGuestName").textContent = currentGuest.nombre;
  guest.style.left = `${14 + Math.random() * 68}%`;
  guest.style.top = `${15 + Math.random() * 63}%`;
  guest.classList.remove("is-arriving");
  void guest.offsetWidth;
  guest.classList.add("is-arriving");
}

function updateGameStats() {
  $("#gameScore").textContent = String(gameScoreValue);
  $("#gameTime").textContent = String(gameSeconds);
  $("#gameCombo").textContent = String(gameComboValue);
}

function finishGame() {
  gameActive = false;
  window.clearInterval(gameTimer);
  window.clearInterval(guestMoveTimer);
  $("#gameGuest").disabled = true;
  $("#startGame").disabled = false;
  $("#gameMessage").textContent = `¡Ronda terminada! Has conseguido ${gameScoreValue} puntos.`;
  if (gameScoreValue > 0) {
    const name = $("#playerName").value.trim().slice(0, 18) || "Explorador/a";
    const entries = [...readLeaderboard(), { name, score: gameScoreValue, date: new Date().toISOString() }]
      .sort((a, b) => b.score - a.score).slice(0, 10);
    try {
      localStorage.setItem(CONFIG_LEADERBOARD.storageKey, JSON.stringify(entries));
    } catch {
      $("#gameMessage").textContent += " No se pudo guardar el récord en este navegador.";
    }
    renderLeaderboard();
  }
}

function startGame() {
  window.clearInterval(gameTimer);
  window.clearInterval(guestMoveTimer);
  gameActive = true;
  gameScoreValue = 0;
  gameComboValue = 0;
  gameSeconds = 30;
  $("#gameGuest").disabled = false;
  $("#startGame").disabled = true;
  $("#gameMessage").textContent = "¡Rápido! Toca los huéspedes para llevarlos al refugio.";
  updateGameStats();
  placeGuest();
  guestMoveTimer = window.setInterval(placeGuest, 1350);
  gameTimer = window.setInterval(() => {
    gameSeconds -= 1;
    updateGameStats();
    if (gameSeconds <= 0) finishGame();
  }, 1000);
}

function rescueGuest() {
  if (!gameActive || !currentGuest) return;
  gameComboValue += 1;
  gameScoreValue += 10 + Math.min(gameComboValue - 1, 10) * 2;
  $("#gameMessage").textContent = `${currentGuest.nombre} ya está a salvo. ¡Sigue así!`;
  updateGameStats();
  placeGuest();
}

async function submitQuestion(event) {
  event.preventDefault();
  const form = $("#questionForm");
  const status = $("#questionStatus");
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const destination = CONFIG_PREGUNTAS.emailDestino.trim();
  const endpoint = CONFIG_PREGUNTAS.endpoint.trim();
  const submit = form.querySelector("[type=submit]");

  if (!endpoint && !destination) {
    status.textContent = "El formulario está preparado, pero el equipo aún debe configurar su correo o endpoint en js/app.js.";
    status.className = "form-status is-error";
    return;
  }

  submit.disabled = true;
  status.textContent = "Preparando tu pregunta…";
  status.className = "form-status";
  try {
    if (endpoint || CONFIG_PREGUNTAS.proveedor === "emailjs") {
      let requestUrl = endpoint;
      let requestOptions;
      if (CONFIG_PREGUNTAS.proveedor === "emailjs") {
        const { serviceId, templateId, publicKey } = CONFIG_PREGUNTAS.emailJs;
        if (!serviceId || !templateId || !publicKey) throw new Error("Falta configurar EmailJS.");
        requestUrl ||= "https://api.emailjs.com/api/v1.0/email/send";
        requestOptions = {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: serviceId, template_id: templateId, user_id: publicKey,
            template_params: {
              from_name: values.get("name"), from_email: values.get("email"),
              message: values.get("question"), to_email: destination
            }
          })
        };
      } else {
        // FormSubmit AJAX recibe JSON y usa el correo verificado dentro de la URL de endpoint.
        const formSubmitPayload = Object.fromEntries(values.entries());
        formSubmitPayload._subject = "Pregunta sobre el Hotel de Insectos";
        formSubmitPayload._replyto = values.get("email");
        requestOptions = {
          method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formSubmitPayload)
        };
      }
      const response = await fetch(requestUrl, requestOptions);
      if (!response.ok) throw new Error("No se pudo enviar la pregunta.");
      status.textContent = "¡Pregunta enviada! Gracias por escribirnos.";
      status.className = "form-status is-success";
      form.reset();
    } else {
      const subject = encodeURIComponent("Pregunta sobre el Hotel de Insectos");
      const body = encodeURIComponent(`Nombre: ${values.get("name")}\nCorreo: ${values.get("email")}\n\n${values.get("question")}`);
      window.location.href = `mailto:${encodeURIComponent(destination)}?subject=${subject}&body=${body}`;
      status.textContent = "Se abrió tu aplicación de correo. Revisa el mensaje y pulsa Enviar para completarlo.";
      status.className = "form-status is-success";
    }
  } catch (error) {
    status.textContent = "No se pudo enviar. Comprueba tu conexión o inténtalo más tarde.";
    status.className = "form-status is-error";
  } finally {
    submit.disabled = false;
  }
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
  if (history) pushAppState(currentView, "material", { materialIndex: index });
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
    podcast.hidden = false;
  });
  podcast.addEventListener("error", () => { podcast.hidden = true; });
}

function init() {
  buildHotspots();
  renderGeneralInfo();
  renderEcoescuelas();
  renderFaq();
  renderLeaderboard();
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
  $("#volverMenu").addEventListener("click", () => showView("bienvenida"));
  $("#abrirGuia").addEventListener("click", () => showUtilityModal("guia"));
  $("#abrirPregunta").addEventListener("click", () => showUtilityModal("pregunta"));
  $("#questionForm").addEventListener("submit", submitQuestion);
  $("#startGame").addEventListener("click", startGame);
  $("#gameGuest").addEventListener("click", rescueGuest);
  document.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.go)));
  $("#alternarHotel").addEventListener("click", () => {
    hotelIlustrado = !hotelIlustrado;
    const image = $("#imagenHotel");
    image.src = hotelIlustrado ? "assets/hotel-animado.png" : "assets/hotel-real.jpg";
    image.alt = hotelIlustrado ? "Ilustración de un hotel de insectos con siete zonas" : "Hotel de insectos con siete zonas interactivas";
    $("#alternarHotel").textContent = hotelIlustrado ? "Ver foto real" : "Ver versión ilustrada";
  });
  document.querySelectorAll("[data-close-modal]").forEach((node) => node.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
  window.addEventListener("popstate", (event) => restoreHistoryState(event.state));
  // La bienvenida es la raíz interna: el primer atrás del dispositivo sale de ella de forma normal.
  window.history.replaceState({ hotelApp: true, view: "bienvenida", modal: null }, "", "#bienvenida");
}

init();
