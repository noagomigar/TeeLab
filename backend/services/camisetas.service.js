import { camisetas } from '../data/camisetas.data.js';

export function getAllFiltered(filters) {
    let camisetasPedidas = camisetas;

    if (filters.color) {
        camisetasPedidas = camisetasPedidas.filter(c => c.colores.includes(filters.color));
    }

    if (filters.talla) {
        camisetasPedidas = camisetasPedidas.filter(c => c.tallas.includes(filters.talla));
    }

    if (filters.tag) {
        camisetasPedidas = camisetasPedidas.filter(c => c.tags.includes(filters.tag));
    }

    if (filters.q) {
    const query = filters.q.toLowerCase();
    camisetasPedidas = camisetasPedidas.filter(c => 
        c.nombre.toLowerCase().includes(query) ||
        c.descripcion.toLowerCase().includes(query)
    );
}

    if (filters.sort) {
        camisetasPedidas = getCamisetasOrdenadas(camisetasPedidas, filters.sort);
    }

    return camisetasPedidas;
}

function getCamisetasOrdenadas(camisetasPedidas, sort) {
    switch (sort) {
        case "precio_asc":
            return [...camisetasPedidas].sort((a, b) => a.precioBase - b.precioBase);
            break;
        case "precio_desc":
            return [...camisetasPedidas].sort((a, b) => b.precioBase - a.precioBase);
            break;
        case "nombre_asc":
            return [...camisetasPedidas].sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case "nombre_desc":
            return [...camisetasPedidas].sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        default:
            return { error: "Sort inexistente", status: 400 };
    }
}

export function getById(id) {

    let camisetaEncontrada = camisetas.find(c => c.id === id);

    if (!camisetaEncontrada) {
        return null;
    }
    
    return camisetaEncontrada;
    
}