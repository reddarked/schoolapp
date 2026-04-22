// ============================================
// SISTEMA DE MENÚ - COMEDOR INSTITUCIONAL
// ============================================

const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual") || "null");
const rol = localStorage.getItem("rol");

if (!usuarioActual) {
    window.location.href = "index.html";
}

const identificadorUsuario = usuarioActual.usuario || usuarioActual.nombreEstudiante || usuarioActual.nombre;

// ============================================
// MENÚS POR DEFECTO
// ============================================
const menusPorDefecto = [
    {
        id: "menu_1",
        dia: "Lunes",
        plato: "Pollo a la plancha con arroz blanco",
        bebida: "Jugo natural de naranja",
        postre: "Gelatina de fresa",
        extra: "Lechuga, tomate y aguacate",
        calorias: 650,
        proteinas: 45,
        precio: 150,
        cupos: 50,
        cuposOriginales: 50,
        imagen: "", // images/pollo-plancha.jpg
        imagenPlaceholder: "Pollo a la Plancha",
        icono: "🍗",
        vegetariano: false,
        sinGluten: true,
        especial: false,
        activo: true
    },
    {
        id: "menu_2",
        dia: "Martes",
        plato: "Pescado frito con tostones",
        bebida: "Limonada natural",
        postre: "Flan de vainilla",
        extra: "Ensalada de pepino",
        calorias: 580,
        proteinas: 38,
        precio: 175,
        cupos: 50,
        cuposOriginales: 50,
        imagen: "", // images/pescado-frito.jpg
        imagenPlaceholder: "Pescado Frito",
        icono: "🐟",
        vegetariano: false,
        sinGluten: true,
        especial: false,
        activo: true
    },
    {
        id: "menu_3",
        dia: "Miércoles",
        plato: "Pollo al horno con papas",
        bebida: "Agua con hielo",
        postre: "Concón con aguacate",
        extra: "Zanahorias al vapor",
        calorias: 720,
        proteinas: 52,
        precio: 160,
        cupos: 50,
        cuposOriginales: 50,
        imagen: "", // images/pollo-horno.jpg
        imagenPlaceholder: "Pollo al Horno",
        icono: "🍗",
        vegetariano: false,
        sinGluten: true,
        especial: false,
        activo: true
    },
    {
        id: "menu_4",
        dia: "Jueves",
        plato: "Carne guisada con arroz moro",
        bebida: "Jugo de chinola",
        postre: "Helado de chocolate",
        extra: "Ensalada mixta fresca",
        calorias: 780,
        proteinas: 55,
        precio: 180,
        cupos: 50,
        cuposOriginales: 50,
        imagen: "", // images/carne-guisada.jpg
        imagenPlaceholder: "Carne Guisada",
        icono: "🥩",
        vegetariano: false,
        sinGluten: false,
        especial: false,
        activo: true
    },
    {
        id: "menu_5",
        dia: "Viernes",
        plato: "Espaguetis a la boloñesa",
        bebida: "Refresco natural",
        postre: "Bizcocho de chocolate",
        extra: "Pan de ajo tostado",
        calorias: 820,
        proteinas: 42,
        precio: 200,
        cupos: 50,
        cuposOriginales: 50,
        imagen: "", // images/espaguetis.jpg
        imagenPlaceholder: "Espaguetis",
        icono: "🍝",
        vegetariano: false,
        sinGluten: false,
        especial: true,
        activo: true
    }
];

// ============================================
// INICIALIZACIÓN
// ============================================
function inicializarDatos() {
    if (!localStorage.getItem("menus")) {
        localStorage.setItem("menus", JSON.stringify(menusPorDefecto));
    }
    // Inicializar saldo del usuario si no existe
    const saldos = JSON.parse(localStorage.getItem("saldos") || "{}");
    if (!saldos[identificadorUsuario]) {
        saldos[identificadorUsuario] = rol === "admin" ? 0 : 500; // Saldo inicial RD$500
        localStorage.setItem("saldos", JSON.stringify(saldos));
    }
}

inicializarDatos();

// ============================================
// RENDERIZADO DE MENÚS
// ============================================
let filtroActual = "todos";
let busquedaActual = "";

function obtenerMenus() {
    return JSON.parse(localStorage.getItem("menus") || "[]");
}

function guardarMenus(menus) {
    localStorage.setItem("menus", JSON.stringify(menus));
}

function renderizarMenus() {
    const container = document.getElementById("menuContainer");
    let menus = obtenerMenus().filter(m => m.activo !== false);

    // Aplicar filtros
    if (filtroActual === "vegetariano") {
        menus = menus.filter(m => m.vegetariano);
    } else if (filtroActual === "sin-gluten") {
        menus = menus.filter(m => m.sinGluten);
    } else if (filtroActual === "disponibles") {
        menus = menus.filter(m => m.cupos > 0);
    }

    // Búsqueda
    if (busquedaActual) {
        const q = busquedaActual.toLowerCase();
        menus = menus.filter(m =>
            m.dia.toLowerCase().includes(q) ||
            m.plato.toLowerCase().includes(q) ||
            (m.bebida || "").toLowerCase().includes(q) ||
            (m.postre || "").toLowerCase().includes(q) ||
            (m.extra || "").toLowerCase().includes(q)
        );
    }

    if (menus.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="8" y1="15" x2="16" y2="15"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
                <h3>No hay menús disponibles</h3>
                <p>Intenta con otros filtros o búsqueda</p>
            </div>
        `;
        return;
    }

    container.innerHTML = menus.map(menu => crearCardMenu(menu)).join("");
}

function crearCardMenu(menu) {
    const esAdmin = rol === "admin";
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const calificaciones = JSON.parse(localStorage.getItem("calificaciones") || "{}");
    const ratingData = calificaciones[menu.id] || { total: 0, suma: 0, votos: [] };
    const promedio = ratingData.total > 0 ? (ratingData.suma / ratingData.total).toFixed(1) : "—";

    const yaReservado = reservas.find(r =>
        r.usuario === identificadorUsuario &&
        r.menuId === menu.id &&
        r.fecha === new Date().toISOString().split('T')[0]
    );

    const badges = [];
    if (menu.especial) badges.push('<span class="menu-badge menu-badge-special">Especial</span>');
    if (menu.vegetariano) badges.push('<span class="menu-badge menu-badge-veg">🌱 Veg</span>');
    if (menu.sinGluten) badges.push('<span class="menu-badge menu-badge-sg">🌾 Sin Gluten</span>');
    if (menu.cupos === 0) badges.push('<span class="menu-badge menu-badge-agotado">Agotado</span>');
    else if (menu.cupos < 10) badges.push(`<span class="menu-badge menu-badge-warn">Quedan ${menu.cupos}</span>`);
    else badges.push('<span class="menu-badge">Disponible</span>');

    const imagenHtml = menu.imagen
        ? `<img src="${menu.imagen}" alt="${menu.plato}">`
        : `<div class="image-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p>Imagen de ${menu.imagenPlaceholder || menu.plato}</p>
           </div>`;

    return `
        <div class="menu-card" data-id="${menu.id}">
            ${esAdmin ? `
                <div class="admin-card-controls">
                    <button class="btn-icon btn-edit" onclick="editarMenu('${menu.id}')" title="Editar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" onclick="eliminarMenu('${menu.id}')" title="Eliminar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            ` : ''}

            <div class="menu-header">
                <h2 class="menu-title">Menú del ${menu.dia}</h2>
                <div class="menu-badges">${badges.join('')}</div>
            </div>

            <div class="menu-image">
                ${imagenHtml}
            </div>

            <div class="menu-rating">
                <div class="stars">
                    ${generarEstrellas(ratingData.total > 0 ? Math.round(ratingData.suma / ratingData.total) : 0)}
                </div>
                <span class="rating-info">${promedio} (${ratingData.total} votos)</span>
            </div>

            <div class="menu-content">
                <div class="menu-item">
                    <div class="item-icon">${menu.icono || "🍽️"}</div>
                    <div class="item-text"><strong>Plato fuerte:</strong> ${menu.plato}</div>
                </div>
                ${menu.bebida ? `
                <div class="menu-item">
                    <div class="item-icon">🥤</div>
                    <div class="item-text"><strong>Bebida:</strong> ${menu.bebida}</div>
                </div>` : ''}
                ${menu.postre ? `
                <div class="menu-item">
                    <div class="item-icon">🍰</div>
                    <div class="item-text"><strong>Postre:</strong> ${menu.postre}</div>
                </div>` : ''}
                ${menu.extra ? `
                <div class="menu-item">
                    <div class="item-icon">🥗</div>
                    <div class="item-text"><strong>Extra:</strong> ${menu.extra}</div>
                </div>` : ''}
            </div>

            <div class="menu-footer">
                <div class="menu-info">
                    ${menu.calorias ? `<span class="info-badge">🔥 ${menu.calorias} cal</span>` : ''}
                    ${menu.proteinas ? `<span class="info-badge">💪 ${menu.proteinas}g prot</span>` : ''}
                    <span class="info-badge precio-badge">RD$${menu.precio}</span>
                </div>
                ${!esAdmin ? `
                    <button class="btn btn-reservar ${yaReservado || menu.cupos === 0 ? 'disabled' : ''}"
                        onclick="reservarMenu('${menu.id}')"
                        ${yaReservado || menu.cupos === 0 ? 'disabled' : ''}>
                        <span>${yaReservado ? '✓ Reservado' : menu.cupos === 0 ? 'Agotado' : 'Reservar'}</span>
                    </button>
                ` : `<span class="admin-info">👁 Vista Admin</span>`}
            </div>
        </div>
    `;
}

function generarEstrellas(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
    }
    return html;
}

// ============================================
// INICIO DE PÁGINA
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    const nombre = usuarioActual.nombreEstudiante || usuarioActual.nombre || "Usuario";
    document.getElementById("nombreUsuario").textContent = nombre;

    const badge = document.getElementById("badgeRol");
    if (rol === "admin") {
        badge.textContent = "Administrador";
        badge.classList.add("admin");
        document.getElementById("panelAdmin").style.display = "block";
        document.getElementById("btnMisReservas").style.display = "none";
        document.getElementById("saldoUsuario").style.display = "none";
    } else {
        badge.textContent = "Estudiante";
    }

    mostrarFechaActual();
    actualizarSaldo();
    actualizarNotifBadge();
    renderizarMenus();
});

function mostrarFechaActual() {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = new Date().toLocaleDateString('es-ES', opciones);
    document.getElementById("fechaActual").textContent = fecha.charAt(0).toUpperCase() + fecha.slice(1);
}

// ============================================
// SALDO
// ============================================
function actualizarSaldo() {
    const saldos = JSON.parse(localStorage.getItem("saldos") || "{}");
    const saldo = saldos[identificadorUsuario] || 0;
    document.getElementById("montoSaldo").textContent = `RD$${saldo}`;
}

// ============================================
// RESERVAR MENÚ
// ============================================
function reservarMenu(menuId) {
    const menus = obtenerMenus();
    const menu = menus.find(m => m.id === menuId);
    if (!menu) return;

    if (menu.cupos === 0) {
        mostrarToast("Este menú está agotado", "error");
        return;
    }

    const saldos = JSON.parse(localStorage.getItem("saldos") || "{}");
    const saldoUsuario = saldos[identificadorUsuario] || 0;

    if (saldoUsuario < menu.precio) {
        mostrarToast(`Saldo insuficiente. Necesitas RD$${menu.precio - saldoUsuario} más`, "error");
        return;
    }

    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const hoy = new Date().toISOString().split('T')[0];

    const yaReservado = reservas.find(r =>
        r.usuario === identificadorUsuario &&
        r.menuId === menuId &&
        r.fecha === hoy
    );

    if (yaReservado) {
        mostrarToast("Ya reservaste este menú hoy", "warning");
        return;
    }

    if (!confirm(`¿Confirmar reservación?\n\nMenú: ${menu.dia}\nPrecio: RD$${menu.precio}\n\nSe descontará de tu saldo.`)) return;

    // Crear reserva
    const nuevaReserva = {
        id: "res_" + Date.now(),
        usuario: identificadorUsuario,
        nombreCompleto: usuarioActual.nombreEstudiante || usuarioActual.nombre,
        menuId: menuId,
        dia: menu.dia,
        plato: menu.plato,
        precio: menu.precio,
        fecha: hoy,
        hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        centro: usuarioActual.centroEducativo || "N/A",
        estado: "pendiente",
        calificado: false
    };
    reservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    // Descontar saldo
    saldos[identificadorUsuario] = saldoUsuario - menu.precio;
    localStorage.setItem("saldos", JSON.stringify(saldos));

    // Descontar cupo
    menu.cupos = Math.max(0, menu.cupos - 1);
    guardarMenus(menus);

    // Notificación
    agregarNotificacion(`Reservaste ${menu.dia} - RD$${menu.precio}`, "success");

    mostrarToast(`Menú del ${menu.dia} reservado`, "success");
    actualizarSaldo();
    renderizarMenus();
}

// ============================================
// MIS RESERVACIONES
// ============================================
function verMisReservaciones() {
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]")
        .filter(r => r.usuario === identificadorUsuario)
        .sort((a, b) => new Date(b.fecha + " " + (b.hora || "00:00")) - new Date(a.fecha + " " + (a.hora || "00:00")));

    const lista = document.getElementById("listaMisReservas");

    if (reservas.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                </svg>
                <h3>No tienes reservaciones</h3>
                <p>¡Reserva tu primer menú!</p>
            </div>
        `;
    } else {
        lista.innerHTML = reservas.map(r => {
            const estadoClass = r.estado === "entregado" ? "entregado" : r.estado === "cancelado" ? "cancelado" : "pendiente";
            const estadoText = r.estado === "entregado" ? "Entregado" : r.estado === "cancelado" ? "Cancelado" : "Pendiente";

            return `
                <div class="reserva-item">
                    <div class="reserva-info">
                        <div class="reserva-icon">🍽️</div>
                        <div>
                            <h4>${r.dia} - ${r.plato}</h4>
                            <p>📅 ${r.fecha} ${r.hora || ''} • RD$${r.precio || 0}</p>
                            <span class="estado-badge ${estadoClass}">${estadoText}</span>
                        </div>
                    </div>
                    <div class="reserva-acciones">
                        ${r.estado === "pendiente" ? `
                            <button class="btn-mini btn-danger" onclick="cancelarReserva('${r.id}')">Cancelar</button>
                        ` : ''}
                        ${r.estado === "entregado" && !r.calificado ? `
                            <button class="btn-mini" onclick="calificarMenu('${r.id}', '${r.menuId}')">⭐ Calificar</button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    document.getElementById("modalMisReservas").style.display = "flex";
}

function cerrarMisReservas() {
    document.getElementById("modalMisReservas").style.display = "none";
}

// Cancelar reserva y devolver saldo
function cancelarReserva(reservaId) {
    if (!confirm("¿Cancelar esta reservación? Se devolverá el saldo.")) return;

    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const idx = reservas.findIndex(r => r.id === reservaId);
    if (idx === -1) return;

    const reserva = reservas[idx];
    reserva.estado = "cancelado";

    // Devolver saldo
    const saldos = JSON.parse(localStorage.getItem("saldos") || "{}");
    saldos[reserva.usuario] = (saldos[reserva.usuario] || 0) + (reserva.precio || 0);
    localStorage.setItem("saldos", JSON.stringify(saldos));

    // Devolver cupo
    const menus = obtenerMenus();
    const menu = menus.find(m => m.id === reserva.menuId);
    if (menu) menu.cupos++;
    guardarMenus(menus);

    localStorage.setItem("reservas", JSON.stringify(reservas));

    agregarNotificacion(`Reserva cancelada. +RD$${reserva.precio} devueltos`, "warning");
    mostrarToast("Reserva cancelada y saldo devuelto", "success");
    actualizarSaldo();
    verMisReservaciones();
    renderizarMenus();
}

// Calificar un menú (1-5 estrellas)
function calificarMenu(reservaId, menuId) {
    const rating = parseInt(prompt("Califica este menú del 1 al 5:"), 10);
    if (!rating || rating < 1 || rating > 5) {
        mostrarToast("Calificación inválida", "error");
        return;
    }

    const calificaciones = JSON.parse(localStorage.getItem("calificaciones") || "{}");
    if (!calificaciones[menuId]) calificaciones[menuId] = { total: 0, suma: 0, votos: [] };
    calificaciones[menuId].total++;
    calificaciones[menuId].suma += rating;
    calificaciones[menuId].votos.push({ usuario: identificadorUsuario, rating, fecha: new Date().toISOString() });
    localStorage.setItem("calificaciones", JSON.stringify(calificaciones));

    // Marcar reserva como calificada
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const r = reservas.find(x => x.id === reservaId);
    if (r) r.calificado = true;
    localStorage.setItem("reservas", JSON.stringify(reservas));

    mostrarToast(`Gracias por calificar con ${rating} estrellas`, "success");
    verMisReservaciones();
    renderizarMenus();
}

// ============================================
// FILTROS Y BÚSQUEDA
// ============================================
function filtrarMenus() {
    busquedaActual = document.getElementById("buscarMenu").value;
    renderizarMenus();
}

function aplicarFiltro(filtro, btn) {
    filtroActual = filtro;
    document.querySelectorAll(".filtro-chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderizarMenus();
}

// ============================================
// EDITOR DE MENÚ (ADMIN)
// ============================================
function abrirEditorMenu() {
    document.getElementById("tituloEditor").textContent = "Agregar Nuevo Menú";
    document.getElementById("formEditorMenu").reset();
    document.getElementById("editorId").value = "";
    document.getElementById("modalEditor").style.display = "flex";
}

function editarMenu(menuId) {
    const menu = obtenerMenus().find(m => m.id === menuId);
    if (!menu) return;

    document.getElementById("tituloEditor").textContent = "Editar Menú";
    document.getElementById("editorId").value = menu.id;
    document.getElementById("editorDia").value = menu.dia;
    document.getElementById("editorPlato").value = menu.plato;
    document.getElementById("editorBebida").value = menu.bebida || "";
    document.getElementById("editorPostre").value = menu.postre || "";
    document.getElementById("editorExtra").value = menu.extra || "";
    document.getElementById("editorCalorias").value = menu.calorias || "";
    document.getElementById("editorProteinas").value = menu.proteinas || "";
    document.getElementById("editorPrecio").value = menu.precio || 0;
    document.getElementById("editorCupos").value = menu.cupos || 0;
    document.getElementById("editorImagen").value = menu.imagen || "";
    document.getElementById("editorVegetariano").checked = menu.vegetariano || false;
    document.getElementById("editorSinGluten").checked = menu.sinGluten || false;
    document.getElementById("editorEspecial").checked = menu.especial || false;
    document.getElementById("modalEditor").style.display = "flex";
}

function cerrarEditor() {
    document.getElementById("modalEditor").style.display = "none";
}

function guardarMenuEditor(e) {
    e.preventDefault();
    const id = document.getElementById("editorId").value;
    const menus = obtenerMenus();

    const datos = {
        dia: document.getElementById("editorDia").value,
        plato: document.getElementById("editorPlato").value,
        bebida: document.getElementById("editorBebida").value,
        postre: document.getElementById("editorPostre").value,
        extra: document.getElementById("editorExtra").value,
        calorias: parseInt(document.getElementById("editorCalorias").value) || 0,
        proteinas: parseInt(document.getElementById("editorProteinas").value) || 0,
        precio: parseInt(document.getElementById("editorPrecio").value) || 0,
        cupos: parseInt(document.getElementById("editorCupos").value) || 0,
        imagen: document.getElementById("editorImagen").value,
        vegetariano: document.getElementById("editorVegetariano").checked,
        sinGluten: document.getElementById("editorSinGluten").checked,
        especial: document.getElementById("editorEspecial").checked,
        activo: true
    };

    if (id) {
        // Editar existente
        const idx = menus.findIndex(m => m.id === id);
        if (idx !== -1) {
            menus[idx] = { ...menus[idx], ...datos };
            mostrarToast("Menú actualizado correctamente", "success");
        }
    } else {
        // Agregar nuevo
        datos.id = "menu_" + Date.now();
        datos.cuposOriginales = datos.cupos;
        datos.icono = "🍽️";
        datos.imagenPlaceholder = datos.plato;
        menus.push(datos);
        mostrarToast("Menú agregado correctamente", "success");
    }

    guardarMenus(menus);
    cerrarEditor();
    renderizarMenus();
}

function eliminarMenu(menuId) {
    const menu = obtenerMenus().find(m => m.id === menuId);
    if (!menu) return;
    if (!confirm(`¿Eliminar el menú "${menu.dia}"?\n\nEsta acción no se puede deshacer.`)) return;

    const menus = obtenerMenus().filter(m => m.id !== menuId);
    guardarMenus(menus);
    mostrarToast("Menú eliminado", "success");
    renderizarMenus();
}

// ============================================
// RESERVAS ADMIN
// ============================================
let filtroReservas = "todas";

function verReservasAdmin() {
    document.getElementById("modalReservasAdmin").style.display = "flex";
    renderizarReservasAdmin();
}

function cerrarReservasAdmin() {
    document.getElementById("modalReservasAdmin").style.display = "none";
}

function filtrarReservas(filtro, btn) {
    filtroReservas = filtro;
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderizarReservasAdmin();
}

function renderizarReservasAdmin() {
    let reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const hoy = new Date().toISOString().split('T')[0];

    if (filtroReservas === "hoy") reservas = reservas.filter(r => r.fecha === hoy);
    else if (filtroReservas === "pendientes") reservas = reservas.filter(r => r.estado === "pendiente");
    else if (filtroReservas === "entregadas") reservas = reservas.filter(r => r.estado === "entregado");

    reservas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    const lista = document.getElementById("listaReservasAdmin");
    if (reservas.length === 0) {
        lista.innerHTML = '<p class="empty-msg">No hay reservaciones en esta categoría</p>';
        return;
    }

    lista.innerHTML = reservas.map(r => {
        const estado = r.estado || "pendiente";
        return `
            <div class="reserva-item">
                <div class="reserva-info">
                    <div class="reserva-icon">🍽️</div>
                    <div>
                        <h4>${r.nombreCompleto || r.usuario} - ${r.dia}</h4>
                        <p>🏫 ${r.centro || 'N/A'} • 📅 ${r.fecha} ${r.hora || ''} • RD$${r.precio || 0}</p>
                        <span class="estado-badge ${estado}">${estado.charAt(0).toUpperCase() + estado.slice(1)}</span>
                    </div>
                </div>
                <div class="reserva-acciones">
                    ${estado === "pendiente" ? `
                        <button class="btn-mini btn-success" onclick="marcarEntregada('${r.id}')">✓ Entregada</button>
                        <button class="btn-mini btn-danger" onclick="cancelarReservaAdmin('${r.id}')">Cancelar</button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function marcarEntregada(reservaId) {
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const r = reservas.find(x => x.id === reservaId);
    if (!r) return;
    r.estado = "entregado";
    localStorage.setItem("reservas", JSON.stringify(reservas));
    mostrarToast("Reserva marcada como entregada", "success");
    renderizarReservasAdmin();
}

function cancelarReservaAdmin(reservaId) {
    if (!confirm("¿Cancelar esta reservación del usuario?")) return;
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const r = reservas.find(x => x.id === reservaId);
    if (!r) return;

    r.estado = "cancelado";
    // Devolver saldo
    const saldos = JSON.parse(localStorage.getItem("saldos") || "{}");
    saldos[r.usuario] = (saldos[r.usuario] || 0) + (r.precio || 0);
    localStorage.setItem("saldos", JSON.stringify(saldos));

    // Devolver cupo
    const menus = obtenerMenus();
    const menu = menus.find(m => m.id === r.menuId);
    if (menu) menu.cupos++;
    guardarMenus(menus);

    localStorage.setItem("reservas", JSON.stringify(reservas));
    mostrarToast("Reserva cancelada", "success");
    renderizarReservasAdmin();
    renderizarMenus();
}

// ============================================
// USUARIOS ADMIN
// ============================================
function verUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
    const saldos = JSON.parse(localStorage.getItem("saldos") || "{}");
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";

    if (Object.keys(usuarios).length === 0) {
        lista.innerHTML = '<p class="empty-msg">No hay usuarios registrados</p>';
    } else {
        Object.entries(usuarios).forEach(([usuario, datos]) => {
            const inicial = (datos.nombre || usuario).charAt(0).toUpperCase();
            const fecha = datos.fechaRegistro ? new Date(datos.fechaRegistro).toLocaleDateString('es-ES') : "Sin fecha";
            const saldo = saldos[usuario] || 0;

            const item = document.createElement("div");
            item.className = "usuario-item";
            item.innerHTML = `
                <div class="usuario-info">
                    <div class="usuario-avatar">${inicial}</div>
                    <div class="usuario-detalle">
                        <h4>${datos.nombre || usuario}</h4>
                        <p>@${usuario} • ${datos.rol === "admin" ? "Administrador" : "Usuario"} • Saldo: RD$${saldo}</p>
                        <p class="fecha-registro">Registrado: ${fecha}</p>
                    </div>
                </div>
                <div class="usuario-acciones">
                    ${usuario !== "admin" ? `
                        <button class="btn-mini" onclick="recargarUsuario('${usuario}')">💰 Recargar</button>
                        <button class="btn-eliminar" onclick="eliminarUsuario('${usuario}')">Eliminar</button>
                    ` : '<span class="protegido">Protegido</span>'}
                </div>
            `;
            lista.appendChild(item);
        });
    }

    document.getElementById("modalUsuarios").style.display = "flex";
}

function cerrarModalUsuarios() {
    document.getElementById("modalUsuarios").style.display = "none";
}

function eliminarUsuario(usuario) {
    if (!confirm(`¿Eliminar al usuario "${usuario}"?`)) return;
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
    delete usuarios[usuario];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarToast("Usuario eliminado", "success");
    verUsuarios();
}

// ============================================
// GESTIÓN DE SALDOS
// ============================================
function gestionarSaldos() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
    const estudiantesTemp = JSON.parse(localStorage.getItem("estudiantesTemp") || "[]");
    const saldos = JSON.parse(localStorage.getItem("saldos") || "{}");
    const lista = document.getElementById("listaSaldos");

    const todos = [];
    Object.entries(usuarios).forEach(([u, d]) => {
        if (d.rol !== "admin") todos.push({ id: u, nombre: d.nombre || u, tipo: "Usuario" });
    });

    // Incluir todos los que tienen saldo (incluyendo estudiantes temporales)
    Object.keys(saldos).forEach(k => {
        if (!todos.find(t => t.id === k) && k !== "admin" && k !== "Administrador") {
            todos.push({ id: k, nombre: k, tipo: "Estudiante" });
        }
    });

    if (todos.length === 0) {
        lista.innerHTML = '<p class="empty-msg">No hay usuarios para gestionar</p>';
    } else {
        lista.innerHTML = todos.map(u => {
            const inicial = u.nombre.charAt(0).toUpperCase();
            const saldo = saldos[u.id] || 0;
            return `
                <div class="usuario-item">
                    <div class="usuario-info">
                        <div class="usuario-avatar">${inicial}</div>
                        <div class="usuario-detalle">
                            <h4>${u.nombre}</h4>
                            <p>${u.tipo} • Saldo actual: <strong>RD$${saldo}</strong></p>
                        </div>
                    </div>
                    <div class="usuario-acciones">
                        <button class="btn-mini" onclick="recargarUsuario('${u.id}')">💰 Recargar</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    document.getElementById("modalSaldos").style.display = "flex";
}

function cerrarSaldos() {
    document.getElementById("modalSaldos").style.display = "none";
}

function recargarUsuario(usuario) {
    const monto = parseInt(prompt(`Monto a recargar para ${usuario} (RD$):`), 10);
    if (!monto || monto <= 0) return;

    const saldos = JSON.parse(localStorage.getItem("saldos") || "{}");
    saldos[usuario] = (saldos[usuario] || 0) + monto;
    localStorage.setItem("saldos", JSON.stringify(saldos));

    mostrarToast(`Recargado RD$${monto} a ${usuario}`, "success");
    gestionarSaldos();
    verUsuarios();
}

// ============================================
// ESTADÍSTICAS
// ============================================
function verEstadisticas() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const menus = obtenerMenus();
    const hoy = new Date().toISOString().split('T')[0];

    document.getElementById("totalUsuarios").textContent = Object.keys(usuarios).length;
    document.getElementById("reservasHoy").textContent = reservas.filter(r => r.fecha === hoy && r.estado !== "cancelado").length;
    document.getElementById("totalReservas").textContent = reservas.filter(r => r.estado !== "cancelado").length;
    document.getElementById("totalMenus").textContent = menus.filter(m => m.activo !== false).length;

    const ingresos = reservas
        .filter(r => r.estado !== "cancelado")
        .reduce((sum, r) => sum + (r.precio || 0), 0);
    document.getElementById("ingresosTotal").textContent = `RD$${ingresos}`;

    const conteo = {};
    reservas.forEach(r => {
        if (r.estado !== "cancelado") conteo[r.dia] = (conteo[r.dia] || 0) + 1;
    });
    let masPopular = "-", max = 0;
    Object.entries(conteo).forEach(([d, c]) => { if (c > max) { max = c; masPopular = d; } });
    document.getElementById("menuFavorito").textContent = masPopular;

    document.getElementById("modalEstadisticas").style.display = "flex";
}

function cerrarModalEstadisticas() {
    document.getElementById("modalEstadisticas").style.display = "none";
}

// ============================================
// EXPORTAR CSV
// ============================================
function exportarReporte() {
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    if (reservas.length === 0) {
        mostrarToast("No hay reservaciones para exportar", "warning");
        return;
    }

    const headers = ["ID", "Usuario", "Nombre", "Menú", "Plato", "Precio", "Fecha", "Hora", "Centro", "Estado"];
    const filas = reservas.map(r => [
        r.id, r.usuario, r.nombreCompleto || r.usuario, r.dia, r.plato,
        r.precio || 0, r.fecha, r.hora || '', r.centro || 'N/A', r.estado || 'pendiente'
    ]);

    let csv = headers.join(",") + "\n";
    csv += filas.map(f => f.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte_comedor_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    mostrarToast("Reporte CSV descargado", "success");
}

// ============================================
// NOTIFICACIONES
// ============================================
function obtenerNotificaciones() {
    return JSON.parse(localStorage.getItem("notif_" + identificadorUsuario) || "[]");
}

function agregarNotificacion(texto, tipo = "info") {
    const notifs = obtenerNotificaciones();
    notifs.unshift({
        id: Date.now(),
        texto,
        tipo,
        fecha: new Date().toLocaleString('es-ES'),
        leida: false
    });
    localStorage.setItem("notif_" + identificadorUsuario, JSON.stringify(notifs.slice(0, 20)));
    actualizarNotifBadge();
}

function actualizarNotifBadge() {
    const notifs = obtenerNotificaciones();
    const noLeidas = notifs.filter(n => !n.leida).length;
    const badge = document.getElementById("notifBadge");
    badge.textContent = noLeidas;
    badge.style.display = noLeidas > 0 ? "flex" : "none";
}

function toggleNotificaciones() {
    const panel = document.getElementById("panelNotificaciones");
    if (panel.style.display === "none" || !panel.style.display) {
        const notifs = obtenerNotificaciones();
        const lista = document.getElementById("listaNotificaciones");

        if (notifs.length === 0) {
            lista.innerHTML = '<p class="empty-msg">No tienes notificaciones</p>';
        } else {
            lista.innerHTML = notifs.map(n => `
                <div class="notif-item ${n.leida ? '' : 'nueva'}">
                    <span class="notif-icon-${n.tipo}">${n.tipo === 'success' ? '✓' : n.tipo === 'warning' ? '⚠' : 'ℹ'}</span>
                    <div>
                        <p>${n.texto}</p>
                        <small>${n.fecha}</small>
                    </div>
                </div>
            `).join('');
        }

        // Marcar como leídas
        notifs.forEach(n => n.leida = true);
        localStorage.setItem("notif_" + identificadorUsuario, JSON.stringify(notifs));
        actualizarNotifBadge();

        panel.style.display = "block";
    } else {
        panel.style.display = "none";
    }
}

function limpiarNotificaciones() {
    localStorage.setItem("notif_" + identificadorUsuario, JSON.stringify([]));
    document.getElementById("listaNotificaciones").innerHTML = '<p class="empty-msg">No tienes notificaciones</p>';
    actualizarNotifBadge();
    mostrarToast("Notificaciones limpiadas", "success");
}

// ============================================
// CERRAR SESIÓN
// ============================================
function cerrarSesion() {
    if (!confirm("¿Estás seguro de cerrar sesión?")) return;
    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("rol");
    mostrarToast("Sesión cerrada", "success");
    setTimeout(() => window.location.href = "index.html", 600);
}

// ============================================
// TOAST
// ============================================
function mostrarToast(mensaje, tipo = "success") {
    const toastExistente = document.querySelector(".toast");
    if (toastExistente) toastExistente.remove();

    const iconos = { success: "✓", error: "✕", warning: "⚠" };
    const toast = document.createElement("div");
    toast.className = "toast " + tipo;
    toast.innerHTML = `
        <div class="toast-icon">${iconos[tipo] || "ℹ"}</div>
        <div class="toast-text">${mensaje}</div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = "slideInRight 0.4s ease reverse";
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Cerrar modales con click fuera
window.addEventListener("click", function(e) {
    if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
    }
});

// Cerrar panel de notificaciones al click fuera
document.addEventListener("click", function(e) {
    const panel = document.getElementById("panelNotificaciones");
    if (panel && panel.style.display === "block") {
        if (!e.target.closest(".btn-notif") && !e.target.closest(".panel-notif")) {
            panel.style.display = "none";
        }
    }
});
