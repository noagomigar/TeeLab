import { addToCart } from "./storage.js";

async function init() {
    //Activamos los eventos del panel que ya está en el HTML
    inicializarEventosFiltros(); 

    const seccionProductos = document.getElementById("contenedor-productos");
    await cargarProductosIniciales(seccionProductos);
}

//Hace una peticion al endpoint de la API especificado para obtener el catálogo de camisetas
async function obtenerCamisetas(link) {
    try {
        let response = await fetch(link);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener datos", error);
    }
}

//Carga la lista de camisetas
async function cargarProductosIniciales(seccion) {
    const listaProductos = await obtenerCamisetas("https://teelab-6jex.onrender.com/api/camisetas");
    if (listaProductos) {
        muestraProductos(listaProductos, seccion);
    } else {
        console.error("No se pudieron cargar los productos");
    }
}

//Muestra los productos
function muestraProductos(productos, contenedor) {
    contenedor.innerHTML = ""; //Vaciamos el contenedor por si venimos de un filtro
    productos.forEach(producto => {
        const articulo = crearArticulo(producto);
        contenedor.appendChild(articulo);
    });
}

//Crea un articulo para un producto con su info
function crearArticulo(producto) {
    const articulo = document.createElement("article");
    articulo.classList.add("producto-card");

    const info = crearImagenYTextos(producto);
    const selTallas = crearSelector(producto.tallas, "Talla", "selector-tallas--tallas");
    const selColores = crearSelector(producto.colores, "Color", "selector-tallas--colores");
    const selCantidad = crearSelectorCantidad();
    const boton = crearBotonCarrito(producto, selTallas, selColores, selCantidad);

    articulo.append(...info, selTallas, selColores, selCantidad, boton);
    return articulo;
}

//Recupera la imagen y descripción de un producto
function crearImagenYTextos(producto) {
    const imagen = document.createElement("img");
    imagen.src = "../" + Object.values(producto.imagenes)[0];
    imagen.alt = producto.nombre;

    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio">${producto.precioBase.toFixed(2)}€</p>
    `;
    return [imagen, infoDiv];
}

//Crea un selector, pasandole las opciones y el tipo (tallas (S, M, L...), colores(Negro, Azul, Blanco...))
// DESPUÉS
function crearSelector(opciones, tipo) {
    const div = document.createElement("div");
    div.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = tipo;

    const select = document.createElement("select");
    select.classList.add("select-moderno");
    select.innerHTML = `<option value="">Elige ${tipo.toLowerCase()}...</option>`;

    opciones.forEach(op => {
        const opt = document.createElement("option");
        opt.value = op;
        opt.textContent = op;
        select.appendChild(opt);
    });

    div.append(label, select);
    return div;
}

//Crea el selector de cantidad
function crearSelectorCantidad() {
    const div = document.createElement("div");
    div.classList.add("cantidad-control");
    div.innerHTML = `
        <span>Cantidad:</span>
        <div class="cantidad-selector">
            <button type="button" class="btn-cantidad" data-action="restar">−</button>
            <input type="number" value="1" min="1" class="input-cantidad-producto" readonly>
            <button type="button" class="btn-cantidad" data-action="sumar">+</button>
        </div>
    `;

    const btnRestar = div.querySelector('[data-action="restar"]');
    const btnSumar = div.querySelector('[data-action="sumar"]');
    const input = div.querySelector('.input-cantidad-producto');

    btnRestar.addEventListener("click", () => {
        if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
    });
    btnSumar.addEventListener("click", () => {
        input.value = parseInt(input.value) + 1;
    });

    return div;
}

//Crea el botón de añadir al carrito
function crearBotonCarrito(producto, divTallas, divColores, divCantidad) {
    const boton = document.createElement("button");
    boton.textContent = "AÑADIR AL CARRITO";
    
    boton.addEventListener("click", () => {
        procesarAñadirCarrito(producto, divTallas, divColores, divCantidad);
    });
    
    return boton;
}

//Añade al carrito un producto
// DESPUÉS
function procesarAñadirCarrito(producto, divTallas, divColores, divCantidad) {
    const talla = divTallas.querySelector("select").value;
    const color = divColores.querySelector("select").value;
    const cantidad = parseInt(divCantidad.querySelector(".input-cantidad-producto").value) || 1;

    if (!talla || !color) {
        return alert("Por favor, selecciona una talla y un color antes de añadir.");
    }

    addToCart({
        camisetaId: producto.id,
        nombre: producto.nombre,
        talla,
        color,
        cantidad,
        precio: producto.precioBase,
        imagen: Object.values(producto.imagenes)[0]
    });

    resetearSeleccion(divTallas, divColores, divCantidad);
}

//Enlaza el HTML estático con la lógica de filtrado (lee los filtros en el dom)
function inicializarEventosFiltros() {
    const inputs = {
        q: document.getElementById("buscar-texto"),
        talla: document.getElementById("filtro-talla"),
        color: document.getElementById("filtro-color"),
        sort: document.getElementById("ordenar-por")
    };

    document.getElementById("btn-aplicar-filtros").addEventListener('click', () => aplicarFiltros(inputs));
    document.getElementById("btn-limpiar-filtros").addEventListener('click', () => limpiarFiltros(inputs));
}

//Hace una peticion con los filtros selecciados (mirando uno por uno cuales están seleccionados) y al final se los añade a la URL
async function aplicarFiltros(inputs) {
    const params = new URLSearchParams();

    if (inputs.q.value.trim()) params.append("q", inputs.q.value.trim());
    if (inputs.talla.value) params.append("talla", inputs.talla.value);
    if (inputs.color.value) params.append("color", inputs.color.value);
    if (inputs.sort.value) params.append("sort", inputs.sort.value);

    const url = `https://teelab-6jex.onrender.com/api/camisetas?${params.toString()}`;
    const listaFiltrada = await obtenerCamisetas(url);

    if (listaFiltrada) {
        const contenedor = document.getElementById("contenedor-productos");
        muestraProductos(listaFiltrada, contenedor);
    }
}

//Resetea los selectores de la camiseta a su estado inicial 
function resetearSeleccion(divTallas, divColores, divCantidad) {
    divTallas.querySelector("select").value = "";
    divColores.querySelector("select").value = "";
    divCantidad.querySelector(".input-cantidad-producto").value = 1;
}

//Borra los filtros actuales
async function limpiarFiltros(inputs) {
    inputs.q.value = "";
    inputs.talla.value = "";
    inputs.color.value = "";
    inputs.sort.value = "";

    const seccion = document.getElementById("contenedor-productos");
    await cargarProductosIniciales(seccion);
}

//Arranque
window.onload = init;