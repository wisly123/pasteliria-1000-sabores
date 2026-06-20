const infoProductos = [
    { codigo: 'TC001', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, desc: 'Con ganache y avellanas.' },
    { codigo: 'TC002', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Frutas', precio: 50000, desc: 'Frutas frescas y crema chantilly.' },
    { codigo: 'TT001', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Vainilla', precio: 40000, desc: 'Bizcocho clásico con crema pastelera.' },
    { codigo: 'TT002', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Manjar', precio: 42000, desc: 'Tradicional chilena con manjar y nueces.' },
    { codigo: 'PI001', categoria: 'Postres Individuales', nombre: 'Mousse de Chocolate', precio: 5000, desc: 'Cremoso y de alta calidad.' }
];

let carrito = JSON.parse(localStorage.getItem('carrito_1000sabores')) || [];

function renderizarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;
    contenedor.innerHTML = "";
    infoProductos.forEach(p => {
        contenedor.innerHTML += `
            <div class="card-producto">
                <div>
                    <small style="color:var(--acento-chocolate)">${p.categoria}</small>
                    <h3>${p.nombre}</h3>
                    <p style="font-size:0.9rem; margin:10px 0;">${p.desc}</p>
                    <p><strong>$${p.precio.toLocaleString('es-CL')}</strong></p>
                </div>
                <button class="btn-primary" onclick="agregarAlCarrito('${p.codigo}')" style="margin-top:15px;">Añadir</button>
            </div>
        `;
    });
}

window.agregarAlCarrito = function(codigo) {
    const prod = infoProductos.find(p => p.codigo === codigo);
    const item = carrito.find(i => i.codigo === codigo);
    if (item) item.cantidad++;
    else carrito.push({ codigo: prod.codigo, nombre: prod.nombre, precio: prod.precio, cantidad: 1 });
    actualizarCarrito();
};

function actualizarCarrito() {
    localStorage.setItem('carrito_1000sabores', JSON.stringify(carrito));
    const badge = document.getElementById('cart-badge');
    if (badge) badge.innerText = carrito.reduce((s, i) => s + i.cantidad, 0);
    renderizarDetalleCarrito();
}

function renderizarDetalleCarrito() {
    const contenedor = document.getElementById('carrito-detalle');
    if (!contenedor) return;
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }
    let html = '<table style="width:100%; border-collapse:collapse;">';
    let total = 0;
    carrito.forEach(i => {
        let subtotal = i.precio * i.cantidad;
        total += subtotal;
        html += `<tr style="border-bottom:1px solid #ddd; padding:10px 0;">
            <td style="padding:10px 0;">${i.nombre} (x${i.cantidad})</td>
            <td style="text-align:right;">$${subtotal.toLocaleString('es-CL')}</td>
        </tr>`;
    });
    html += `<tr style="font-weight:bold;"><td style="padding-top:15px;">TOTAL:</td><td style="text-align:right; padding-top:15px;">$${total.toLocaleString('es-CL')}</td></tr></table>`;
    contenedor.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarCarrito();
});