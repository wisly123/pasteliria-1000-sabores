document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('form-login');
    const inputCorreo = document.getElementById('login-correo');
    const inputPass = document.getElementById('login-pass');

    // Función auxiliar para mostrar los errores visualmente
    function mostrarError(input, idError, mensaje) {
        const contenedorError = document.getElementById(idError);
        input.style.border = "2px solid #D32F2F"; // Borde rojo de alerta
        contenedorError.innerText = mensaje;
        contenedorError.style.display = "block"; // Muestra el texto
    }

    // Función auxiliar para limpiar los errores si todo está bien
    function limpiarError(input, idError) {
        const contenedorError = document.getElementById(idError);
        input.style.border = "1px solid #B0BEC5"; // Restaura borde normal
        contenedorError.innerText = "";
        contenedorError.style.display = "none"; // Esconde el texto
    }

    // 1. FUNCIÓN QUE VALIDA EL CORREO
    function validarCorreo() {
        const correo = inputCorreo.value.trim();
        
        // Regla: Requerido
        if (correo === "") {
            mostrarError(inputCorreo, 'error-login-correo', 'El correo electrónico es obligatorio.');
            return false;
        }
        
        // Regla: Máximo 100 caracteres
        if (correo.length > 100) {
            mostrarError(inputCorreo, 'error-login-correo', 'El correo no puede tener más de 100 caracteres.');
            return false;
        }
        
        // Regla: Solo dominios @inacap.cl, @inacapmail.cl y @gmail.com
        // Usamos una Expresión Regular (Regex) para verificar el final del correo
        const regexDominios = /^[a-zA-Z0-9._%+-]+@(inacap\.cl|inacapmail\.cl|gmail\.com)$/;
        if (!regexDominios.test(correo)) {
            mostrarError(inputCorreo, 'error-login-correo', 'Dominio no permitido. Use @inacap.cl, @inacapmail.cl o @gmail.com');
            return false;
        }

        // Si pasa todos los filtros, limpiamos el error
        limpiarError(inputCorreo, 'error-login-correo');
        return true;
    }

    // 2. FUNCIÓN QUE VALIDA LA CONTRASEÑA
    function validarContrasena() {
        const pass = inputPass.value;

        // Regla: Requerido
        if (pass === "") {
            mostrarError(inputPass, 'error-login-pass', 'La contraseña es obligatoria.');
            return false;
        }

        // Regla: Entre 4 y 10 caracteres
        if (pass.length < 4 || pass.length > 10) {
            mostrarError(inputPass, 'error-login-pass', 'La contraseña debe tener entre 4 y 10 caracteres.');
            return false;
        }

        // Si pasa todos los filtros, limpiamos el error
        limpiarError(inputPass, 'error-login-pass');
        return true;
    }

    // VALIDACIÓN EN TIEMPO REAL: Evalúa mientras el usuario escribe
    inputCorreo.addEventListener('input', validarCorreo);
    inputPass.addEventListener('input', validarContrasena);

    // VALIDACIÓN AL ENVIAR EL FORMULARIO
    formulario.addEventListener('submit', function(event) {
        // Ejecutamos ambas validaciones
        const correoValido = validarCorreo();
        const passValida = validarContrasena();

        // Si alguna de las dos falla, detenemos el envío del formulario
        if (!correoValido || !passValida) {
            event.preventDefault(); // Evita que la página se recargue
            console.log("Formulario bloqueado: Datos inválidos.");
        } else {
            alert("¡Validación exitosa! Iniciando sesión...");
            // Aquí puedes redireccionar al home o al admin-dashboard si lo deseas
        }
    });
});