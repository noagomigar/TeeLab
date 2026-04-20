import { loadCart, saveCart, removeFromCart, decreaseQuantity } from "./storage.js";

function init() {
    renderCart();
    setupEventListenersToButtons();
}

//Botones principales (eventos estaticos)
function setupEventListenersToButtons() {
    const btnVaciar = document.getElementById("btn-vaciar-carrito");
    btnVaciar.addEventListener("click", clearCart);

    const btnFinalizar = document.getElementById("btn-finalizar-compra");
    btnFinalizar.addEventListener("click", finalizePurchase);
}

//Limpia el carrito
function clearCart() {
    saveCart([]);
    renderCart();
}

//Renderizar el carrito
function renderCart() {
    const carrito = loadCart() || [];
    const tbody = document.getElementById('lista-carrito');
    //Vacia lo que hay en la tabla para poder volverla a cargar bien
    tbody.innerHTML = '';
    //Carga el carrito dependiendo de si esta vacío o no
    if (carrito.length === 0) {
        renderEmptyCart(tbody);
    } else {
        renderCartItems(carrito, tbody);
    }
}

//Renderizar carrito vacío
function renderEmptyCart(tbody) {
    tbody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align: center; padding: 30px;">
                Tu carrito está vacío. ¡Añade algunas camisetas!
            </td>
        </tr>`;
    document.getElementById('total-carrito').textContent = '0.00€';
}

//Renderizar carrito con productos
function renderCartItems(carrito, tbody) {
    let totalCompra = 0;

    carrito.forEach((producto, index) => {
        const filaData = createRowData(producto, index);
        totalCompra += filaData.subtotal;

        const btnEliminar = filaData.tr.querySelector('.btn-eliminar');
        const btnRestar = filaData.tr.querySelector('.btn-restar');

        btnEliminar.addEventListener('click', (e) => { removeFromCart(index); renderCart() });
        btnRestar.addEventListener('click', (e) => { decreaseQuantity(index); renderCart() });

        tbody.appendChild(filaData.tr);
    });

    document.getElementById('total-carrito').textContent = `${totalCompra.toFixed(2)}€`;
}

//Crear una nueva fila por cada prodcuto
function createRowData(producto, index) {
    const cantidad = producto.cantidad || 1;
    const subtotal = producto.precio * cantidad;
    const urlImagen = getProductImage(producto);

    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td><img src="../${urlImagen}" alt="${producto.nombre}" class="img-carrito"></td>
    <td>
        <h4>${producto.nombre}</h4>
        <p>Talla: ${producto.talla || 'No definida'} | Color: ${producto.color || 'No definido'}</p>
    </td>
    <td>${producto.precio.toFixed(2)}€</td>
    <td>${cantidad}</td>
    <td class="subtotal-linea">${subtotal.toFixed(2)}€</td>
    <td class="accion-btns">
        <button class="btn-restar" data-index="${index}">-1</button>
        <button class="btn-eliminar" data-index="${index}">Eliminar todo</button>
    </td>
`;

    return { tr, subtotal };
}

//Obtener la URL de la imagen del producto
function getProductImage(producto) {
    if (producto.imagenes && typeof producto.imagenes === 'object') {
        return Object.values(producto.imagenes)[0];
    }
    return producto.imagen || "https://via.placeholder.com/80";
}

//Carga el carrito y realiza la compra simprie que el carrito no este vacío
async function finalizePurchase() {
    const carritoGuardado = loadCart();

    if (carritoGuardado.length === 0) {
        alert("El carrito está vacío. No puedes finalizar la compra.");
        return;
    }

    const comanda = buildOrderPayload(carritoGuardado);
    await sendOrder(comanda);
}

//Crea el JSON con la info a la API
function buildOrderPayload(carritoGuardado) {
    return {
        cliente: { nombre: "Usuario Demo", email: "usuario@teelab.com" },
        direccion: "Calle Falsa 123, Barcelona",
        items: carritoGuardado.map(item => ({
            camisetaId: item.camisetaId,
            talla: item.talla,
            color: item.color,
            cantidad: item.cantidad
        }))
    };
}

//Intenta hacer una peticion con una promesa a la API para enviar la comanda y si no da error 
async function sendOrder(comanda) {
    try {
        const response = await fetch("https://teelab-backend.onrender.com/api/comandas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comanda)
        });

        await handleOrderResponse(response);

    } catch (error) {
        console.error("Error al enviar la comanda:", error);
        alert("Hubo un problema de conexión con el servidor.");
    }
}

//Si la respuesta es correcta vacía el carrito y actualiza el ticket lo guarda en el localStorage para pasarle la info a la pantalla de ticket
async function handleOrderResponse(response) {
    const resultado = await response.json();

    if (response.ok) {
        alert("¡Compra realizada con éxito!");
        saveCart([]);
        localStorage.setItem("ultimoTicket", JSON.stringify(resultado.comanda));
        window.location.href = "ticket.html";
    } else {
        alert("Error en la comanda: " + resultado.message);
    }
}

//Ejecución al cargar la página
window.onload = init;