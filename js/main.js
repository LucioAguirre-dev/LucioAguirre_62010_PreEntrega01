// Nombre del archivo: main.js
// Cursante: Lucio Aguirre
// Comision: 62010


// Inicialización de arrays vacíos
const usuarios = [],
    citas = [];
    

// Inicialización de variables numéricas
let idUsuarioCounter = 0,
    idCitaCounter = 0;

// Inicialización de variables de texto
let servicio = '',
    nombreUsuario = '',
    telefonoUsuario = '',
    fechaCita = '',
    horaCita = '';

// Creacion de funciones que se van pidiendo a lo largo del prompt, las ultimas son para validar los datos que pone el usuario
const mostrarMensajeDespedida = () => alert('🖐️ ¡Gracias y hasta luego! 🖐️');
const generarID = () => idUsuarioCounter++;
const generarCitaID = () => idCitaCounter++;
const validarNombre = (nombre) => /^[a-zA-Z\s]{4,}$/.test(nombre);
const validarTelefono = (telefono) => /^[0-9]{10,}$/.test(telefono);
const validarFecha = (fecha) => /^(\d{2}[\/\-]\d{2}[\/\-]\d{4})$/.test(fecha);
const validarHora = (hora) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(hora);

// Función para ingresar datos del usuario
function ingresarDatosUsuario() { 
    nombreUsuario = prompt('👤 ¿Cómo te llamás? 👤:');
    if (nombreUsuario === null) {
        mostrarMensajeDespedida();
        return null;
    }
    while (!validarNombre(nombreUsuario)) {
        nombreUsuario = prompt('👤 Nombre inválido. Ingresá tu nombre usando solo letras (mínimo 4 caracteres): 👤');
        if (nombreUsuario === null) {
            mostrarMensajeDespedida();
            return null;
        }
    }

    telefonoUsuario = prompt('📞 Por favor, ingresá tu teléfono 📞:');
    if (telefonoUsuario === null) {
        mostrarMensajeDespedida();
        return null;
    }
    while (!validarTelefono(telefonoUsuario)) {
        telefonoUsuario = prompt('📞 Teléfono inválido. Ingresá solo números (mínimo 10 caracteres): 📞');
        if (telefonoUsuario === null) {
            mostrarMensajeDespedida();
            return null;
        }
    }

    const usuario = {
        id: generarID(),
        nombre: nombreUsuario,
        telefono: telefonoUsuario
    };
    usuarios.push(usuario);
    return usuario.id;
}

// Función para ingresar datos de la cita
const ingresarDatosCita = () => {
    fechaCita = prompt('📅 ¿En qué fecha querés tu cita? (dd/mm/aaaa o dd-mm-aaaa) 📅:');
    if (fechaCita === null) {
        mostrarMensajeDespedida();
        return false;
    }
    while (!validarFecha(fechaCita)) {
        fechaCita = prompt('📅 Fecha inválida. Ingresá la fecha en el formato dd/mm/aaaa o dd-mm-aaaa 📅:');
        if (fechaCita === null) {
            mostrarMensajeDespedida();
            return false;
        }
    }

    horaCita = prompt('🕒 ¿A qué hora querés tu cita? (HH:MM) 🕒:');
    if (horaCita === null) {
        mostrarMensajeDespedida();
        return false;
    }
    while (!validarHora(horaCita)) {
        horaCita = prompt('🕒 Hora inválida. Ingresá la hora en el formato HH:MM (24 horas) 🕒:');
        if (horaCita === null) {
            mostrarMensajeDespedida();
            return false;
        }
    }

    const cita = {
        id: generarCitaID(),
        fecha: fechaCita,
        hora: horaCita
    };
    citas.push(cita);
    return true;
};

// Función para mostrar el menú principal
function mostrarMenuPrincipal() {
    let opcionMenu = prompt(`🦷 Menú Principal 🦷\n1. 👤 Ver o modificar datos personales 👤\n2. 📅 Ver o modificar cita 📅\n3. 🖐️ Salir 🖐️`);
    if (opcionMenu === null) {
        mostrarMensajeDespedida();
        return false;
    }

    switch (opcionMenu) {
        case '1':
            mostrarUsuario();
            break;
        case '2':
            mostrarCita();
            break;
        case '3':
            mostrarMensajeDespedida();
            return false;
        default:
            alert('😊 Por favor, ingresá una opción válida (1, 2, o 3) 😊');
            break;
    }
    return true;
}

// Función para mostrar y modificar datos del usuario
const mostrarUsuario = () => {
    alert(`👤 Tus datos:\nNombre: ${nombreUsuario}\nTeléfono: ${telefonoUsuario}`);
    const modificar = prompt('✏️ ¿Querés modificar tus datos? (sí/no) ✏️');
    if (modificar === null || modificar.toLowerCase() === 'no') {
        return;
    }

    nombreUsuario = prompt('👤 Nuevo nombre: 👤', nombreUsuario);
    if (nombreUsuario === null) {
        mostrarMensajeDespedida();
        return;
    }
    while (!validarNombre(nombreUsuario)) {
        nombreUsuario = prompt('👤 Nombre inválido. Ingresá tu nombre usando solo letras (mínimo 4 caracteres): 👤', nombreUsuario);
        if (nombreUsuario === null) {
            mostrarMensajeDespedida();
            return;
        }
    }

    telefonoUsuario = prompt('📞 Nuevo teléfono: 📞', telefonoUsuario);
    if (telefonoUsuario === null) {
        mostrarMensajeDespedida();
        return;
    }
    while (!validarTelefono(telefonoUsuario)) {
        telefonoUsuario = prompt('📞 Teléfono inválido. Ingresá solo números (mínimo 10 caracteres): 📞', telefonoUsuario);
        if (telefonoUsuario === null) {
            mostrarMensajeDespedida();
            return;
        }
    }
    alert('😊 Tus datos han sido actualizados 😊');
};

// Función para mostrar y modificar/cancelar la cita
const mostrarCita = () => {
    if (citas.length === 0) {
        alert('😊 No tenés ninguna cita programada 😊');
        return;
    }
    const cita = citas[0];
    alert(`📅 Tu cita:\nFecha: ${cita.fecha}\nHora: ${cita.hora}`);
    const modificar = prompt('✏️ ¿Querés modificar tu cita? (sí/no) ✏️');
    if (modificar === null || modificar.toLowerCase() === 'no') {
        const cancelar = prompt('🗑️ ¿Querés cancelar tu cita? (sí/no) 🗑️');
        if (cancelar === null || cancelar.toLowerCase() === 'no') {
            return;
        }
        citas.splice(0, 1);
        alert('🗑️ Tu cita ha sido cancelada 🗑️');
        return;
    }

    fechaCita = prompt('📅 Nueva fecha (dd/mm/aaaa): 📅', cita.fecha);
    if (fechaCita === null) {
        mostrarMensajeDespedida();
        return;
    }
    while (!validarFecha(fechaCita)) {
        fechaCita = prompt('📅 Fecha inválida. Ingresá la fecha en el formato dd/mm/aaaa o dd-mm-aaaa 📅:', cita.fecha);
        if (fechaCita === null) {
            mostrarMensajeDespedida();
            return;
        }
    }

    horaCita = prompt('🕒 Nueva hora (HH:MM): 🕒', cita.hora);
    if (horaCita === null) {
        mostrarMensajeDespedida();
        return;
    }
    while (!validarHora(horaCita)) {
        horaCita = prompt('🕒 Hora inválida. Ingresá la hora en el formato HH:MM (24 horas) 🕒:', cita.hora);
        if (horaCita === null) {
            mostrarMensajeDespedida();
            return;
        }
    }

    cita.fecha = fechaCita;
    cita.hora = horaCita;
    alert('😊 Tu cita ha sido actualizada 😊');
};

// Inicio del programa
const idUsuario = ingresarDatosUsuario();
if (idUsuario !== null) { // Verificar si se ingresaron datos de usuario
    const citaIngresada = ingresarDatosCita(); // Verificar si se ingresaron datos de cita
    if (citaIngresada) { // Si se ingresaron los datos de la cita, mostrar el menú
        let seguir = true; // Variable para controlar el bucle del menú
        while (seguir) { // Bucle del menú principal
            seguir = mostrarMenuPrincipal(); // Mostrar menú y actualizar la variable seguir
        }
    }
}
