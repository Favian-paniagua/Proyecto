// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contadorCarrito = document.getElementById('contador');
const itemsCarrito = document.getElementById('items-carrito');
const totalElemento = document.getElementById('total');
const btnPagar = document.getElementById('btn-pagar');

// Actualizar el carrito en la interfaz
function actualizarCarrito() {
    // Mostrar u ocultar "carrito vacío"
    if (carrito.length === 0) {
        itemsCarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        btnPagar.style.display = 'none';
    } else {
        itemsCarrito.innerHTML = '';
        btnPagar.style.display = 'block';
    }

    // Generar HTML para cada producto
    carrito.forEach((producto, index) => {
        const item = document.createElement('div');
        item.className = 'item-carrito';
        item.innerHTML = `
            <div class="item-info">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <h4>${producto.nombre}</h4>
                    <p>Talla: ${producto.talla || 'M'}</p>
                </div>
            </div>
            <div class="item-precio">$${producto.precio}</div>
            <button class="btn-eliminar" data-id="${index}">Eliminar</button>
        `;
        itemsCarrito.appendChild(item);
    });

    // Actualizar contador y total
    contadorCarrito.textContent = carrito.length;
    calcularTotal();

    // Añadir eventos a los botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(button => {
        button.addEventListener('click', eliminarProducto);
    });

    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Calcular el total
function calcularTotal() {
    const total = carrito.reduce((sum, producto) => sum + parseFloat(producto.precio), 0);
    totalElemento.textContent = total.toFixed(2);
}

// Eliminar producto del carrito
function eliminarProducto(e) {
    const id = e.target.getAttribute('data-id');
    carrito.splice(id, 1);
    actualizarCarrito();
}

// Botón de pagar
btnPagar.addEventListener('click', () => {
    alert('¡Gracias por tu compra! Total: $' + totalElemento.textContent);
    carrito = [];
    actualizarCarrito();
});

// Inicializar carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);