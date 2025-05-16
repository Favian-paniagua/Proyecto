// Array para almacenar productos en el carrito
let carrito = [];

// Función para añadir productos al carrito
document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', () => {
        const producto = button.parentElement;
        const nombre = producto.querySelector('h3').textContent;
        const precio = producto.querySelector('p').textContent;

        carrito.push({ nombre, precio });
        actualizarCarrito();
    });
});

// Actualizar el carrito en la interfaz
function actualizarCarrito() {
    const itemsCarrito = document.querySelector('.items-carrito');
    itemsCarrito.innerHTML = '';

    let total = 0;

    carrito.forEach(item => {
        const elemento = document.createElement('div');
        elemento.innerHTML = `
            <p>${item.nombre} - ${item.precio}</p>
        `;
        itemsCarrito.appendChild(elemento);

        // Sumar precios (eliminando el símbolo $)
        total += parseFloat(item.precio.replace('$', ''));
    });

    document.getElementById('total').textContent = total.toFixed(2);
}