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
    nombre: "Hojas secas", top: 61, left: 70, imagen: "assets/insectos/escarabajo.jpg",
    descripcion: "Una capa de hojas mantiene la humedad y se transforma lentamente en alimento para la vida del suelo.",
    funcion: "Favorece a descomponedores y protege pequeños invertebrados durante el frío."
  },
  {
    nombre: "Tejas", top: 61, left: 37, imagen: "assets/insectos/tijereta.jpg",
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

const MENSAJES_GUIA = {
  bienvenida: "¡Hola! ¿Quieres empezar a aprender sobre el hotel de insectos?",
  intro: "Prepárate: vamos a entrar en el hotel.",
  hub: "¡Ya estamos dentro! Elige cómo quieres explorar.",
  hotel: "Haz clic en los puntos naranjas. Cada uno esconde una historia.",
  video: "Aquí podrás ver la visita explicada paso a paso.",
  podcast: "A veces, para conocer la naturaleza, también hay que escuchar.",
  info: "Estas páginas son un buen punto de partida para seguir investigando."
};

const $ = (selector) => document.querySelector(selector);
const views = [...document.querySelectorAll(".view")];
const guideBubble = $("#guideBubble");
let currentView = "bienvenida";
let hotelIlustrado = false;
let introTimer;

function setGuide(viewName) {
  guideBubble.style.opacity = "0";
  guideBubble.style.transform = "translateY(5px)";
  window.setTimeout(() => {
    guideBubble.textContent = MENSAJES_GUIA[viewName] || MENSAJES_GUIA.hub;
    guideBubble.style.opacity = "1";
    guideBubble.style.transform = "";
  }, 150);
}

function showView(viewName) {
  closeModal();
  views.forEach((view) => {
    const shouldShow = view.id === viewName;
    view.hidden = !shouldShow;
    view.classList.toggle("is-active", shouldShow);
  });
  // La pizarra guía no debe aparecer ni superponerse mientras se reproduce la intro.
  $("#guiaPizarra").hidden = viewName === "intro";
  currentView = viewName;
  setGuide(viewName);
  window.requestAnimationFrame(fitHotelImage);
  window.scrollTo({ top: 0, behavior: "smooth" });
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

function openMaterial(index) {
  const material = MATERIALES[index];
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
  $(".modal-close").focus();
}

function closeModal() {
  const modal = $("#modalMaterial");
  if (!modal.hidden) {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
}

function goHub() {
  window.clearTimeout(introTimer);
  const intro = $("#intro");
  const video = $("#videoEntrada");
  video.pause();
  if (document.fullscreenElement) document.exitFullscreen?.();
  showView("hub");
}

// Intenta reproducir el vídeo. El evento error y el rechazo de play activan el recorrido visual de respaldo.
function startIntro() {
  showView("intro");
  const intro = $("#intro");
  const video = $("#videoEntrada");
  let movedOn = false;
  const finish = () => { if (!movedOn) { movedOn = true; goHub(); } };
  const useFallback = () => {
    video.style.display = "none";
    // La animación dura unos segundos y después lleva al menú sin dejar la pantalla vacía.
    introTimer = window.setTimeout(finish, 3500);
  };
  video.style.display = "block";
  video.onended = finish;
  video.onerror = useFallback;
  // La intro ocupa la pantalla completa; la pizarra se oculta intencionadamente durante este tramo.
  document.documentElement.requestFullscreen?.().catch(() => { /* En móvil/navegador bloqueado continúa en la propia página. */ });
  const playAttempt = video.play();
  if (playAttempt) playAttempt.catch(useFallback);
  // Protección si el archivo está presente pero tarda demasiado o no responde.
  window.setTimeout(() => { if (video.readyState === 0 && !movedOn) useFallback(); }, 2500);
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
  markImageFallback($("#imagenHotel"), $("#hotelScene"));
  markImageFallback($("#pizarraGuia"), $("#pizarraMarco"));
  document.querySelectorAll(".zoom-frame img").forEach((image) => markImageFallback(image, image.parentElement));
  markImageFallback($("#imagenInsecto"), $("#modalImage"));
  setupMediaFallbacks();

  $("#imagenHotel").addEventListener("load", () => window.requestAnimationFrame(fitHotelImage));
  window.addEventListener("resize", fitHotelImage);
  if (window.ResizeObserver) new ResizeObserver(fitHotelImage).observe($("#hotelScene"));
  if ($("#imagenHotel").complete) window.requestAnimationFrame(fitHotelImage);

  $("#empezar").addEventListener("click", startIntro);
  $("#saltarIntro").addEventListener("click", goHub);
  $("#volverMenu").addEventListener("click", goHub);
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
}

init();
