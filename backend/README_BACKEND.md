# TeeLab API REST

API REST desarrollada con Node.js y Express para gestionar el catálogo de camisetas y las comandas (pedidos) de la tienda TeeLab.

---

## Requisitos previos

Tener instalado [Node.js](https://nodejs.org/) en el entorno de desarrollo.

---

## Instalación y puesta en marcha

**1. Instalar dependencias**

```bash
npm i
```

**2. Arrancar el servidor en modo desarrollo**

```bash
npm run dev
```

La API quedará disponible en: `http://localhost:3001/`

### Otros comandos

| Comando | Descripción |
|---|---|
| `npm start` | Arranca en modo producción |
| `npm test` | Ejecuta los tests |

---

## Endpoints disponibles

### Camisetas

**GET** `/api/camisetas`

Devuelve la lista completa de camisetas. Admite filtros y ordenación mediante query parameters:

- `?color=negro` — filtra por color
- `?talla=M` — filtra por talla
- `?sort=precio_asc` — ordena por precio ascendente
- `?q=texto` — búsqueda por texto

**GET** `/api/camisetas/:id`

Devuelve el detalle de una camiseta por su ID.

Ejemplo: `/api/camisetas/TSH01`

---

### Comandas

**GET** `/api/comandas`

Devuelve el listado de todas las comandas registradas.

**GET** `/api/comandas/:id`

Devuelve el detalle y el ticket de una comanda por su ID.

Ejemplo: `/api/comandas/ORD-0001`

**POST** `/api/comandas`

Crea una nueva comanda. El body debe enviarse en formato JSON con la siguiente estructura:

- Datos del cliente
- Dirección de entrega
- Array de items con camiseta, talla, color y cantidad

Devuelve el ticket generado con subtotales y total calculado.