import { comandas } from '../data/comandas.data.js';
import { camisetas } from '../data/camisetas.data.js';

export function crearComanda(comanda) {
    const errorDeValidacion = validarComanda(comanda);

    if (errorDeValidacion) {
        return { error: errorDeValidacion, status: 400 };
    }

    comandas.push(comanda);
    const nuevoTicket = crearTicket(comanda);

    return { data: nuevoTicket };
}

function validarComanda(comanda) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!comanda || typeof comanda !== "object") return "Body inválido";
    if (!comanda.cliente.nombre || !comanda.cliente.email || !comanda.items) return "Faltan campos: id, nombre, curso";
    if (comanda.cliente.nombre.length < 2) return "El nombre tiene que tener mínimo 2 carácteres"
    if (!emailRegex.test(comanda.cliente.email)) return "El formato del email es inválido"
    if (comanda.items.length < 1) return "Items tiene que tener al menos un elemento"

    for (const camiseta of comanda.items) {
        const comprobacionCamiseta = comprobarCamiseta(camiseta);

        if(comprobacionCamiseta) return comprobacionCamiseta;
    }

    return null;
}

function comprobarCamiseta(camiseta) {
    
    let camisetaDatos = camisetas.find(c => c.id === camiseta.camisetaId);

    if (camiseta.cantidad < 1) return "La cantidad de la camiseta tiene que ser mayor o igual a uno";
    if (!Number.isInteger(camiseta.cantidad)) return "La cantidad de la camiseta tiene que ser un entero";

  
    if (!camisetaDatos) return "El ID de la camiseta debe existir en el catalogo";
    if (!camisetaDatos.tallas.includes(camiseta.talla)) return "La talla tiene que estar dentro de las tallas de la camiseta";
    if (!camisetaDatos.colores.includes(camiseta.color)) return "El color tiene que ser uno de los colores disponibles para la camiseta";
    
    return null;
}

function crearTicket(comanda) {
    const id = `ORD-${String(comandas.length + 1).padStart(4, '0')}`;

    let ticket = {};
    
    ticket.id = id;
    ticket.fecha = new Date().toISOString();
    ticket.estado = "recibida";
    ticket.items = [];
    ticket.total = 0;
    

    for(const camiseta of comanda.items) {
        
        let camisetaDatos = camisetas.find(c => c.id === camiseta.camisetaId);
        let nuevaCamiseta = {};

        nuevaCamiseta.camisetaId = camisetaDatos.id;
        nuevaCamiseta.nombre = camisetaDatos.nombre;
        nuevaCamiseta.talla = camiseta.talla;
        nuevaCamiseta.color = camiseta.color;
        nuevaCamiseta.cantidad = camiseta.cantidad;
        nuevaCamiseta.precioUnitario = camisetaDatos.precioBase;
        nuevaCamiseta.subtotal = camisetaDatos.precioBase * camiseta.cantidad;

        ticket.total += nuevaCamiseta.subtotal;

        ticket.items.push(nuevaCamiseta);
    }
    return ticket;
}

export function getAll() {
  return comandas;
}

export function getById(id) {
    
    const comandaEncontrada = comandas.find(c => c.id === id);
    
    if(!comandaEncontrada) {
         return null;
    }

    return  comandaEncontrada;
}