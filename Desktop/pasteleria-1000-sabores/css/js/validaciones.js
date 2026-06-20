document.addEventListener('DOMContentLoaded', function() {
    
    // Función utilitaria visual
    function controlarError(input, idError, mensaje, activar) {
        const errorEl = document.getElementById(idError);
        if (!input || !errorEl) return;
        if (activar) {
            input.classList.add('input-error');
            errorEl.innerText = mensaje;
            errorEl.style.display = 'block';
        } else {
            input.classList.remove('input-error');
            errorEl.style.display = 'none';
        }
    }

    // Validador RUN Módulo 11 Chileno
    function validarRUN(run) {
        if (!/^[0-9]{7,8}[0-9Kk]$/.test(run)) return false;
        const cuerpo = run.slice(0, -1);
        const dv = run.slice(-1).toUpperCase();
        let suma = 0, mul = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += mul * parseInt(cuerpo.charAt(i));
            mul = mul < 7 ? mul + 1 : 2;
        }
        const dvEsperado = 11 - (suma % 11);
        const dvCalc = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
        return dv === dvCalc;
    }

    // 1. VALIDACIÓN LOGIN
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            let valido = true;
            const correo = document.getElementById('login-correo');
            const pass = document.getElementById('login-pass');

            if (!correo.value || correo.value.length > 100 || !/^[a-zA-Z0-9._%+-]+@(inacap\.cl|inacapmail\.cl|gmail\.com)$/.test(correo.value)) {
                controlarError(correo, 'error-login-correo', 'Correo requerido, máx 100 caracteres y dominios válidos (@inacap.cl, @inacapmail.cl o @gmail.com).', true);
                valido = false;
            } else controlarError(correo, 'error-login-correo', '', false);

            if (!pass.value || pass.value.length < 4 || pass.value.length > 10) {
                controlarError(pass, 'error-login-pass', 'Contraseña requerida (Entre 4 y 10 caracteres).', true);
                valido = false;
            } else controlarError(pass, 'error-login-pass', '', false);

            if (!valido) e.preventDefault();
        });
    }

    // 2. VALIDACIÓN CONTACTO
    const formContacto = document.getElementById('form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', function(e) {
            let valido = true;
            const nombre = document.getElementById('cont-nombre');
            const correo = document.getElementById('cont-correo');
            const comentario = document.getElementById('cont-comentario');

            if (!nombre.value || nombre.value.length > 100) {
                controlarError(nombre, 'error-cont-nombre', 'Nombre obligatorio (Máx 100).', true);
                valido = false;
            } else controlarError(nombre, 'error-cont-nombre', '', false);

            if (correo.value && (!/^[a-zA-Z0-9._%+-]+@(inacap\.cl|profesor\.inacap\.cl|gmail\.com)$/.test(correo.value) || correo.value.length > 100)) {
                controlarError(correo, 'error-cont-correo', 'Dominios válidos: @inacap.cl, @profesor.inacap.cl o @gmail.com (Máx 100).', true);
                valido = false;
            } else controlarError(correo, 'error-cont-correo', '', false);

            if (!comentario.value || comentario.value.length > 500) {
                controlarError(comentario, 'error-cont-comentario', 'Comentario obligatorio (Máx 500).', true);
                valido = false;
            } else controlarError(comentario, 'error-cont-comentario', '', false);

            if (!valido) e.preventDefault();
        });
    }

    // 3. VALIDACIÓN REGISTRO
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(e) {
            let valido = true;
            const run = document.getElementById('reg-run');
            const nombre = document.getElementById('reg-nombre');
            const apellido = document.getElementById('reg-apellido');
            const correo = document.getElementById('reg-correo');
            const direccion = document.getElementById('reg-direccion');

            if (!validarRUN(run.value)) {
                controlarError(run, 'error-reg-run', 'RUN inválido o formato incorrecto (Ej: 19011022K).', true);
                valido = false;
            } else controlarError(run, 'error-reg-run', '', false);

            if (!nombre.value || nombre.value.length > 50) {
                controlarError(nombre, 'error-reg-nombre', 'Nombre obligatorio (Máx 50).', true);
                valido = false;
            } else controlarError(nombre, 'error-reg-nombre', '', false);

            if (!apellido.value || apellido.value.length > 100) {
                controlarError(apellido, 'error-reg-apellido', 'Apellidos obligatorios (Máx 100).', true);
                valido = false;
            } else controlarError(apellido, 'error-reg-apellido', '', false);

            if (!correo.value || !/^[a-zA-Z0-9._%+-]+@(inacap\.cl|profesor\.inacap\.cl|gmail\.com)$/.test(correo.value)) {
                controlarError(correo, 'error-reg-correo', 'Correo inválido con dominio autorizado.', true);
                valido = false;
            } else controlarError(correo, 'error-reg-correo', '', false);

            if (!direccion.value || direccion.value.length > 300) {
                controlarError(direccion, 'error-reg-direccion', 'Dirección obligatoria (Máx 300).', true);
                valido = false;
            } else controlarError(direccion, 'error-reg-direccion', '', false);

            if (!valido) e.preventDefault();
        });
    }

    // 4. VALIDACIÓN MANTENEDOR ADMIN PRODUCTO
    const formAdmin = document.getElementById('form-admin-producto');
    if (formAdmin) {
        formAdmin.addEventListener('submit', function(e) {
            let valido = true;
            const codigo = document.getElementById('prod-codigo');
            const nombre = document.getElementById('prod-nombre');
            const desc = document.getElementById('prod-desc');
            const precio = document.getElementById('prod-precio');
            const stock = document.getElementById('prod-stock');

            if (!codigo.value || codigo.value.length < 3) {
                controlarError(codigo, 'error-prod-codigo', 'Código requerido (Mínimo 3 caract.).', true);
                valido = false;
            } else controlarError(codigo, 'error-prod-codigo', '', false);

            if (!nombre.value || nombre.value.length > 100) {
                controlarError(nombre, 'error-prod-nombre', 'Nombre requerido (Máx 100).', true);
                valido = false;
            } else controlarError(nombre, 'error-prod-nombre', '', false);

            if (desc.value.length > 500) {
                controlarError(desc, 'error-prod-desc', 'La descripción no puede superar los 500 caracteres.', true);
                valido = false;
            } else controlarError(desc, 'error-prod-desc', '', false);

            if (precio.value === "" || parseFloat(precio.value) < 0) {
                controlarError(precio, 'error-prod-precio', 'Precio requerido y mayor o igual a 0.', true);
                valido = false;
            } else controlarError(precio, 'error-prod-precio', '', false);

            if (!stock.value || !Number.isInteger(Number(stock.value)) || parseInt(stock.value) < 0) {
                controlarError(stock, 'error-prod-stock', 'Stock requerido (Solo números enteros >= 0).', true);
                valido = false;
            } else controlarError(stock, 'error-prod-stock', '', false);

            if (!valido) e.preventDefault();
        });
    }
});