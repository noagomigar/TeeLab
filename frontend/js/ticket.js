import { loadTicket } from "./storage.js";

function init() {
    renderTicket();
}

//Funcion principal que controla el ticket
function renderTicket() {
    const contenedor = document.getElementById("contenedor-ticket");
    const ticket = loadTicket();

    if (!ticket || !Array.isArray(ticket.items)) {
        contenedor.innerHTML = "<p>No hay ningún pedido reciente para mostrar.</p>";
        return;
    }

    const htmlItems = generateItemsHTML(ticket.items);
    contenedor.innerHTML = generateTicketHTML(ticket, htmlItems);
}

//Genera el HTML de todos los productos
function generateItemsHTML(items) {
    let html = "";
    items.forEach(item => {
        html += `
            <div class="ticket-linea">
                <p>${item.cantidad}x ${item.nombre} (Talla: ${item.talla}, Color: ${item.color})</p>
                <p>Subtotal: ${item.subtotal.toFixed(2)}€</p>
            </div>
            <hr>
        `;
    });
    return html;
}

//Genera el HTML con la info del ticket
function generateTicketHTML(ticket, htmlItems) {
    return `
        <h2>¡Gracias por tu compra!</h2>
        <div class="ticket-info">
            <p><strong>ID Pedido:</strong> ${ticket.id}</p>
            <p><strong>Fecha:</strong> ${new Date(ticket.fecha).toLocaleString()}</p>
            <p><strong>Estado:</strong> ${ticket.estado.toUpperCase()}</p>
        </div>
        
        <h3>Líneas de pedido:</h3>
        <div class="ticket-items">${htmlItems}</div>
        
        <div class="ticket-total">
            <h3>Total Pagado: ${ticket.total.toFixed(2)}€</h3>
        </div>
        
        <a href="productos.html" class="btn-volver">Volver al catálogo</a>
    `;
}

//Inicializamos cuando carga la página
window.onload = init;