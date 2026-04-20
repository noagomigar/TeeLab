export function addToCart(camiseta){
    let newCarrito = loadCart();
    //Buscamos si ya existe un producto exactamente igual en el carrito
    const indiceProducto = newCarrito.findIndex(item => 
        item.camisetaId === camiseta.camisetaId && 
        item.talla === camiseta.talla && 
        item.color === camiseta.color
    );
 
    if (indiceProducto !== -1) {
        //Si el índice no es -1, significa que SÍ lo encontró, y en lugar de añadirlo de nuevo, le sumamos la cantidad
        newCarrito[indiceProducto].cantidad += camiseta.cantidad;
    } else {
        //Si es -1, es un producto totalmente nuevo (o con distinta talla/color), así que lo añadimos al final del carrito
        newCarrito.push(camiseta);
    }

    saveCart(newCarrito);
}

export function saveCart(carrito){
    localStorage.setItem("infoCarrito", JSON.stringify(carrito));
}

export function loadCart(){
    return JSON.parse(localStorage.getItem("infoCarrito")) || [];  
}

//Obtiene los datos del ticket
export function loadTicket() {
    return JSON.parse(localStorage.getItem("ultimoTicket")) || null;
}

export function removeFromCart(index) {
    let carrito = loadCart();
    
    //En la posición index eliminamos 1 elemento
    carrito.splice(index, 1);

    saveCart(carrito);
}

export function decreaseQuantity(index) {
    let carrito = loadCart();
    
    //Si hay más de 1 prodcuto, restamos 1
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
    } else {
        //Si solo queda 1, lo eliminamos del todo
        carrito.splice(index, 1); 
    }
    
    saveCart(carrito);
}