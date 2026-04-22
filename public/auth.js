// ============================================
// SISTEMA DE AUTENTICACIÓN - MENU SCHOOL
// ============================================

// Inicializar usuario admin por defecto si no existe
function inicializarAdmin() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
    if (!usuarios["admin"]) {
        usuarios["admin"] = {
            password: "admin123",
            rol: "admin",
            nombre: "Administrador",
            fechaRegistro: new Date().toISOString()
        };
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}

inicializarAdmin();

// Establecer fecha actual por defecto
document.addEventListener("DOMContentLoaded", function() {
    const fechaInput = document.getElementById("fecha");
    if (fechaInput) {
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.value = hoy;
    }
});

// Formulario principal - Entrar como estudiante
document.getElementById("formularioIngreso").addEventListener("submit", function(e) {
    e.preventDefault();

    const datos = {
        centroEducativo: document.getElementById("centroEducativo").value,
        fecha: document.getElementById("fecha").value,
        nombreEstudiante: document.getElementById("nombreEstudiante").value,
        nombreTutor: document.getElementById("nombreTutor").value,
        centroAnterior: document.getElementById("centroAnterior").value,
        rol: "usuario"
    };

    // Guardar datos del estudiante
    localStorage.setItem("usuarioActual", JSON.stringify(datos));
    localStorage.setItem("rol", "usuario");

    mostrarToast("Bienvenido " + datos.nombreEstudiante, "success");

    setTimeout(() => {
        window.location.href = "menu.html";
    }, 800);
});

// Mostrar/ocultar formulario de admin
function toggleLogin() {
    const loginAdmin = document.getElementById("loginAdmin");
    if (loginAdmin.style.display === "none" || loginAdmin.style.display === "") {
        loginAdmin.style.display = "block";
        loginAdmin.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
        loginAdmin.style.display = "none";
    }
}

// Login Administrador
function loginAdmin() {
    const user = document.getElementById("adminUser").value.trim();
    const pass = document.getElementById("adminPass").value;

    if (!user || !pass) {
        mostrarToast("Por favor completa todos los campos", "error");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");

    if (!usuarios[user]) {
        mostrarToast("Este usuario no existe, debes registrarte", "error");
        return;
    }

    if (usuarios[user].password === pass) {
        localStorage.setItem("usuarioActual", JSON.stringify({
            nombre: usuarios[user].nombre || user,
            usuario: user,
            rol: usuarios[user].rol
        }));
        localStorage.setItem("rol", usuarios[user].rol);

        mostrarToast("Bienvenido " + (usuarios[user].rol === "admin" ? "Administrador" : "Usuario"), "success");

        setTimeout(() => {
            window.location.href = "menu.html";
        }, 800);
    } else {
        mostrarToast("Contraseña incorrecta", "error");
    }
}

// Registro de nuevo usuario
function registrarUsuario() {
    const usuario = prompt("Crea un nombre de usuario:");
    if (!usuario || usuario.trim() === "") {
        mostrarToast("Registro cancelado", "warning");
        return;
    }

    const password = prompt("Crea una contraseña (mínimo 4 caracteres):");
    if (!password || password.length < 4) {
        mostrarToast("La contraseña debe tener al menos 4 caracteres", "error");
        return;
    }

    const nombre = prompt("Ingresa tu nombre completo:");
    if (!nombre || nombre.trim() === "") {
        mostrarToast("Nombre requerido", "error");
        return;
    }

    const tipoRol = confirm("¿Deseas registrarte como Administrador?\n\nAceptar = Administrador\nCancelar = Usuario");

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");

    if (usuarios[usuario]) {
        mostrarToast("Este usuario ya existe", "error");
        return;
    }

    usuarios[usuario] = {
        password: password,
        rol: tipoRol ? "admin" : "usuario",
        nombre: nombre,
        fechaRegistro: new Date().toISOString()
    };

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarToast("Usuario registrado correctamente como " + (tipoRol ? "Administrador" : "Usuario"), "success");
}

// Sistema de notificaciones Toast
function mostrarToast(mensaje, tipo = "success") {
    const toastExistente = document.querySelector(".toast");
    if (toastExistente) toastExistente.remove();

    const iconos = {
        success: "✓",
        error: "✕",
        warning: "⚠"
    };

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
