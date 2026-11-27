(() => {
  "use strict";

  const STORAGE_KEY = "hotelInsectosAssistantEnabled";
  const GREETING = "¡Hola! Soy el asistente local del proyecto. Puedo ayudarte a explorar el hotel, sus secciones y el juego. Escribe una pregunta o elige una opción rápida.";

  /*
   * BASE DE CONOCIMIENTO LOCAL
   * Edita keywords y respuesta para ampliar los temas. Las rutas corresponden a los
   * botones data-go de index.html; las pestañas de Info usan data-info-tab.
   */
  const ASSISTANT_KNOWLEDGE = {
    quickQuestions: [
      "¿Cómo navego por la web?",
      "¿Cuáles son los 7 materiales?",
      "¿Qué es Ecoescuelas?",
      "¿Cómo funciona el juego y el leaderboard?",
      "¿Cómo abro Canva y los materiales?",
      "¿Cómo vuelvo atrás?"
    ],
    topics: [
      {
        keywords: ["como volver atras", "como vuelvo atras", "vuelvo atras", "volver atras", "boton atras", "gesto atras", "volver", "atras en movil", "salir de la pagina"],
        answer: "El botón o gesto Atrás del navegador recorre los pasos de la web. Si el asistente está abierto, Atrás lo cierra primero. Usa Home para volver al menú de secciones y el botón Inicio para ir a la portada.",
        actions: [{ label: "Abrir Home", route: "hub" }, { label: "Ir a la portada", route: "bienvenida" }]
      },
      {
        keywords: ["como navegar", "navegar por la web", "navego por la web", "como navego", "navegar por la pagina", "menu", "apartados", "secciones", "como usar", "home", "empezar"],
        answer: "Pulsa Empezar en la portada y usa las tarjetas del menú o el botón Apartados. Home abre el menú principal; Inicio vuelve a la portada. En móvil, Atrás recorre las secciones visitadas y cierra primero el asistente si está abierto.",
        actions: [{ label: "Abrir el menú Home", route: "hub" }]
      },
      {
        keywords: ["7 materiales", "siete materiales", "materiales", "puntos del hotel", "hotel de insectos", "imagen real", "foto real", "ilustracion", "canas", "paja", "corteza", "hojas secas", "tejas", "piedras", "ladrillos"],
        answer: "Los siete materiales son cañas de bambú, paja, corteza y piñas, hojas secas, tejas, piedras y ladrillos. En Los 7 materiales del hotel puedes tocar cada punto para leer su explicación. La vista empieza con la ilustración; Ver foto real alterna a la fotografía y permite volver a la ilustración.",
        actions: [{ label: "Explorar los 7 materiales", route: "hotel" }]
      },
      {
        keywords: ["ecoescuelas", "eco escuela", "proyecto ecoescuelas"],
        answer: "Ecoescuelas tiene un espacio preparado para añadir la presentación del proyecto, las acciones y el calendario, y sus recursos. El contenido provisional se edita en el objeto ECOESCUELAS de js/app.js.",
        actions: [{ label: "Abrir Ecoescuelas", route: "ecoescuelas" }]
      },
      {
        keywords: ["juego", "leaderboard", "puntuacion", "record", "apodo", "cronometro", "rescatar huespedes"],
        answer: "En Juego coloca los siete materiales en carriles y columnas, recoge Néctar y evita que cinco vidas se agoten. Pulsa Pausar, Reiniciar o cambia la velocidad entre 1× y 2×. El leaderboard local conserva diez récords con apodo, oleada y puntos.",
        actions: [{ label: "Ir al juego", route: "juego" }]
      },
      {
        keywords: ["video de entrada", "intro", "saltar intro"],
        answer: "En la portada, pulsa Empezar para ver la transición del avión y el vídeo de entrada. Si quieres ir directamente al menú, usa Saltar intro.",
        actions: [{ label: "Ir al menú", route: "hub" }]
      },
      {
        keywords: ["insectos", "huespedes", "abejas", "mariquitas", "crisopas", "polinizadores", "funcion ecologica"],
        answer: "El hotel ofrece cavidades y refugios a algunos invertebrados, como abejas solitarias y mariquitas. Sus espacios pueden apoyar la polinización y otras relaciones del ecosistema. Observa a los huéspedes sin tocar los nidos ni retirar materiales ocupados.",
        actions: [{ label: "Ver materiales y sus funciones", route: "hotel" }, { label: "Leer sobre el ecosistema", route: "info", tab: "desarrollada" }]
      },
      {
        keywords: ["canva", "presentacion", "diapositivas", "pantalla completa", "materiales en la presentacion", "canva y los materiales", "consultar los materiales", "menu interactivo"],
        answer: "Abre Info y elige Presentación de Canva. Allí puedes ampliar el visor a pantalla completa y abrir Consultar los 7 materiales sin salir de la presentación. El enlace se configura en CONFIG_CANVA_EMBED_URL, en js/app.js.",
        actions: [{ label: "Abrir la presentación de Canva", route: "info", tab: "canva" }]
      },
      {
        keywords: ["podcast", "audio", "escuchar"],
        answer: "El pódcast está en Info, en su pestaña Pódcast. El reproductor se activa al añadir el audio assets/podcast.mp3; el título y la descripción provisional se editan en index.html.",
        actions: [{ label: "Abrir Pódcast", route: "info", tab: "podcast" }]
      },
      {
        keywords: ["video del proyecto", "video informativo", "video"],
        answer: "El vídeo del proyecto está en Info, en la pestaña Vídeo. La vista queda preparada para el archivo assets/video-informativo.mp4.",
        actions: [{ label: "Abrir Vídeo", route: "info", tab: "video" }]
      },
      {
        keywords: ["informacion desarrollada", "profundizar", "ecosistema", "microhabitat", "funcion ecologica"],
        answer: "En Info, la pestaña Información desarrollada reúne explicaciones sobre los materiales, los huéspedes y el ecosistema. Sus tarjetas se editan en INFORMACION_GENERAL, en js/app.js.",
        actions: [{ label: "Leer la información desarrollada", route: "info", tab: "desarrollada" }]
      },
      {
        keywords: ["preguntas frecuentes", "faq", "dudas", "pregunta frecuente"],
        answer: "El apartado Preguntas frecuentes reúne respuestas sobre el hotel, cómo explorar sus puntos, el juego y el guardado de récords.",
        actions: [{ label: "Abrir Preguntas frecuentes", route: "preguntas" }]
      },
      {
        keywords: ["sobre nosotros", "equipo", "quienes somos", "quien hizo la web"],
        answer: "Sobre nosotros está preparado para presentar al equipo, contar cómo nació la idea y explicar qué queréis compartir. Los textos se editan en SOBRE_NOSOTROS, dentro de js/app.js.",
        actions: [{ label: "Abrir Sobre nosotros", route: "nosotros" }]
      }
    ],
    fallback: {
      answer: "No encuentro ese tema en mi guía local todavía. Prueba con materiales, Ecoescuelas, juego, Canva, pódcast o navegación. También puedes consultar Preguntas frecuentes.",
      actions: [{ label: "Ver Preguntas frecuentes", route: "preguntas" }]
    }
  };

  const toggle = document.querySelector("#assistantToggle");
  const toggleLabel = document.querySelector("#assistantToggleLabel");
  const panel = document.querySelector("#assistantPanel");
  const closeButton = document.querySelector("#assistantClose");
  const messages = document.querySelector("#assistantMessages");
  const form = document.querySelector("#assistantForm");
  const input = document.querySelector("#assistantInput");
  const quickQuestions = document.querySelector("#assistantQuickQuestions");
  let enabled = false;
  let replyTimer = 0;
  let greetingShown = false;

  function readPreference() {
    try { return localStorage.getItem(STORAGE_KEY) === "true"; }
    catch { return false; }
  }

  function savePreference(value) {
    try { localStorage.setItem(STORAGE_KEY, String(value)); }
    catch { /* El asistente sigue funcionando durante esta sesión si el almacenamiento no está disponible. */ }
  }

  function stripAssistantFlagFromCurrentState() {
    const current = window.history.state;
    if (!current || current.assistantOpen !== true) return;
    const clean = { ...current };
    delete clean.assistantOpen;
    window.history.replaceState(clean, "");
  }

  function addAssistantHistoryEntry() {
    const current = window.history.state;
    if (current?.assistantOpen === true) return;
    const base = current?.hotelApp
      ? current
      : { hotelApp: true, view: document.querySelector(".view.is-active")?.id || "bienvenida", modal: null };
    window.history.pushState({ ...base, assistantOpen: true }, "");
  }

  function updateToggle() {
    toggle.setAttribute("aria-pressed", String(enabled));
    toggle.setAttribute("aria-label", enabled ? "Desactivar asistente local" : "Activar asistente local");
    toggleLabel.textContent = enabled ? "Asistente · Desactivar" : "Asistente · Activar";
    panel.hidden = !enabled;
    panel.inert = !enabled;
  }

  function appendMessage(text, author, actions = []) {
    const row = document.createElement("div");
    row.className = `assistant-message assistant-message-${author}`;
    row.setAttribute("role", author === "assistant" ? "status" : "listitem");
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    row.append(paragraph);

    if (actions.length) {
      const actionList = document.createElement("div");
      actionList.className = "assistant-message-actions";
      actions.forEach((action) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "assistant-action-link";
        button.textContent = action.label;
        button.addEventListener("click", () => navigateTo(action));
        actionList.append(button);
      });
      row.append(actionList);
    }

    messages.append(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function normalize(text) {
    return text.toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[¿?¡!.,;:()]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /*
   * Punto de extensión futuro: aquí se puede incorporar una fuente externa revisada por el equipo.
   * Actualmente toda la resolución es local; no hay fetch, claves ni llamadas de red.
   */
  function resolveAssistantMessage(question) {
    const normalized = normalize(question);
    if (/^(hola|buenas|buenos dias|buenas tardes|buenas noches)$/.test(normalized)) {
      return { answer: "¡Hola! Pregúntame por el hotel, el juego o la navegación de la web.", actions: [] };
    }
    if (/^(gracias|muchas gracias|perfecto gracias)$/.test(normalized)) {
      return { answer: "¡De nada! Si te surge otra duda, aquí tienes la guía rápida.", actions: [] };
    }

    let bestTopic = null;
    let bestScore = 0;
    ASSISTANT_KNOWLEDGE.topics.forEach((topic) => {
      const score = topic.keywords.reduce((total, keyword) => total + (normalized.includes(normalize(keyword)) ? 1 : 0), 0);
      if (score > bestScore) { bestTopic = topic; bestScore = score; }
    });
    return bestTopic || ASSISTANT_KNOWLEDGE.fallback;
  }

  function sendQuestion(question) {
    const cleanQuestion = question.trim().slice(0, 320);
    if (!cleanQuestion || !enabled) return;
    appendMessage(cleanQuestion, "user");
    input.value = "";
    window.clearTimeout(replyTimer);
    replyTimer = window.setTimeout(() => {
      if (!enabled) return;
      const reply = resolveAssistantMessage(cleanQuestion);
      appendMessage(reply.answer, "assistant", reply.actions || []);
    }, 120);
  }

  function navigateTo(action) {
    const route = action.route;
    if (route === "hub") document.querySelector("#volverMenu")?.click();
    else if (route === "bienvenida") document.querySelector("#volverPortada")?.click();
    else {
      const routeButton = [...document.querySelectorAll("[data-go]")].find((button) => button.dataset.go === route);
      routeButton?.click();
    }
    if (action.tab) document.querySelector(`[data-info-tab="${action.tab}"]`)?.click();
    const menu = document.querySelector(".section-nav");
    if (menu) menu.open = false;
  }

  function sameVisibleRoute(state) {
    if (!state?.hotelApp) return false;
    const activeView = document.querySelector(".view.is-active")?.id;
    if (state.view !== activeView) return false;

    const modal = document.querySelector(".modal:not([hidden])");
    const visibleModal = modal?.id === "modalMaterial" ? "material" : modal?.id === "modalGuia" ? "guia" : null;
    if ((state.modal || null) !== visibleModal) return false;
    if (state.view === "info") {
      const selectedTab = document.querySelector("[data-info-tab].is-selected")?.dataset.infoTab || "video";
      if ((state.infoTab || "video") !== selectedTab) return false;
    }
    if (state.modal === "material") {
      const visibleIndex = Number(document.querySelector("#modalNumber")?.textContent.match(/\d+/)?.[0] || 1) - 1;
      if ((state.materialIndex ?? 0) !== visibleIndex) return false;
    }
    return true;
  }

  function setEnabled(value, { historyMode = "none", persist = true, restoreFocus = false } = {}) {
    const wasEnabled = enabled;
    enabled = Boolean(value);
    if (persist) savePreference(enabled);

    if (enabled && !wasEnabled) {
      if (!greetingShown) {
        appendMessage(GREETING, "assistant");
        greetingShown = true;
      }
      if (historyMode === "push") addAssistantHistoryEntry();
    } else if (!enabled && wasEnabled) {
      window.clearTimeout(replyTimer);
      messages.replaceChildren();
      greetingShown = false;
      if (historyMode === "replace") stripAssistantFlagFromCurrentState();
    }

    updateToggle();
    if (restoreFocus) toggle.focus({ preventScroll: true });
  }

  function handleBackNavigation(event) {
    const state = event.state;
    if (state?.assistantOpen === true) {
      // Forward navigation can restore the assistant only if the user still has it enabled.
      if (!enabled && readPreference()) setEnabled(true, { historyMode: "none", persist: false });
      return;
    }
    if (!enabled) return;

    const sameRoute = sameVisibleRoute(state);
    setEnabled(false, { historyMode: "none", persist: true, restoreFocus: true });
    // When only the assistant entry was popped, avoid re-rendering the same view and resetting scroll.
    if (sameRoute) event.stopImmediatePropagation();
  }

  toggle.addEventListener("click", () => {
    if (enabled) setEnabled(false, { historyMode: "replace" });
    else setEnabled(true, { historyMode: "push" });
  });
  closeButton.addEventListener("click", () => setEnabled(false, { historyMode: "replace", restoreFocus: true }));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendQuestion(input.value);
  });
  quickQuestions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-assistant-question]");
    if (button) sendQuestion(button.dataset.assistantQuestion || "");
  });
  window.addEventListener("popstate", handleBackNavigation, true);

  ASSISTANT_KNOWLEDGE.quickQuestions.forEach((question) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "assistant-quick-question";
    button.dataset.assistantQuestion = question;
    button.textContent = question;
    quickQuestions.append(button);
  });

  // Por defecto queda apagado; si el usuario lo dejó activo, se restaura al cargar la página.
  setEnabled(readPreference(), { historyMode: readPreference() ? "push" : "none", persist: false });
})();