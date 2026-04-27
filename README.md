# TeeLab 🛍️

[🇪🇸 Español](#-español) | [🇦🇩 Català](#-català) | [🇬🇧 English](#-english)

---

## 🇪🇸 Español

**TeeLab** es una aplicación web e-commerce fullstack para comprar camisetas artísticas, construida con JavaScript vanilla y Node.js + Express.
Explora el catálogo, filtra por talla y color, añade artículos a tu carrito y realiza tu pedido para obtener un ticket.

### **Características Principales**
- Página de catálogo que obtiene las camisetas desde una REST API
- Filtros por talla, color y búsqueda de texto, con ordenación por precio o nombre
- Filtros aplicados en el servidor mediante query params — sin filtrado en el cliente
- Carrito de compra persistente con localStorage
- Página de carrito con subtotales por línea, opción de eliminar artículo y vaciar carrito
- Envío del pedido mediante petición POST que devuelve un ticket imprimible
- Página de ticket con ID de pedido, fecha, estado y líneas de artículos
- Comunicación entre frontend y backend con API CORS habilitado

### **Tecnologías Usadas**
- **Frontend:** HTML, CSS, JavaScript vanilla (fetch + async/await)
- **Backend:** Node.js + Express
- **Almacenamiento:** localStorage
- **Comunicación:** REST API con CORS
- **Arquitectura:** funciones separadas, máximo 15 líneas cada una, con `init()` como punto de entrada

### **Cómo Empezar**

#### Backend
1. Ve a la carpeta del backend e instala las dependencias
```bash
cd backend
npm install
```
2. Inicia el servidor
```bash
node index.js
```
La API estará disponible en `http://localhost:3000`

#### Frontend
1. Abre la carpeta `frontend` con **Live Server** (extensión de VS Code)
2. La app se abrirá automáticamente en tu navegador

> Asegúrate de que el backend está en marcha antes de lanzar el frontend.

### **Endpoints Utilizados**
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/camisetas` | Obtener todas las camisetas |
| GET | `/api/camisetas?talla=M&color=negro&sort=precio_asc` | Obtener camisetas filtradas |
| GET | `/api/camisetas/:id` | Obtener detalle de una camiseta |
| POST | `/api/comandas` | Enviar un pedido |
| GET | `/api/comandas/:id` | Obtener ticket de pedido |

### **Autora**
Noa Gomez I Garcia
[GitHub](https://github.com/noagomigar)

---

## 🇦🇩 Català

**TeeLab** és una aplicació web e-commerce fullstack per comprar samarretes artístiques, construïda amb JavaScript vanilla i Node.js + Express.
Explora el catàleg, filtra per talla i color, afegeix articles al teu carret i realitza la teva comanda per obtenir un tiquet.

### **Característiques Principals**
- Pàgina de catàleg que obté les samarretes des d'una REST API
- Filtres per talla, color i cerca de text, amb ordenació per preu o nom
- Filtres aplicats al servidor mitjançant query params — sense filtrat al client
- Carret de compra persistent amb localStorage
- Pàgina de carret amb subtotals per línia, opció d'eliminar article i buidar carret
- Enviament de la comanda mitjançant petició POST que retorna un tiquet imprimible
- Pàgina de tiquet amb ID de comanda, data, estat i línies d'articles
- Comunicació entre frontend i backend amb API CORS habilitat

### **Tecnologies Usades**
- **Frontend:** HTML, CSS, JavaScript vanilla (fetch + async/await)
- **Backend:** Node.js + Express
- **Emmagatzematge:** localStorage
- **Comunicació:** REST API amb CORS
- **Arquitectura:** funcions separades, màxim 15 línies cadascuna, amb `init()` com a punt d'entrada

### **Com Començar**

#### Backend
1. Ves a la carpeta del backend i instal·la les dependències
```bash
cd backend
npm install
```
2. Inicia el servidor
```bash
node index.js
```
L'API estarà disponible a `http://localhost:3000`

#### Frontend
1. Obre la carpeta `frontend` amb **Live Server** (extensió de VS Code)
2. L'app s'obrirà automàticament al teu navegador

> Assegura't que el backend està en marxa abans de llançar el frontend.

### **Endpoints Utilitzats**
| Mètode | Endpoint | Descripció |
|--------|----------|------------|
| GET | `/api/camisetas` | Obtenir totes les samarretes |
| GET | `/api/camisetas?talla=M&color=negro&sort=precio_asc` | Obtenir samarretes filtrades |
| GET | `/api/camisetas/:id` | Obtenir detall d'una samarreta |
| POST | `/api/comandas` | Enviar una comanda |
| GET | `/api/comandas/:id` | Obtenir tiquet de comanda |

### **Autora**
Noa Gomez I Garcia
[GitHub](https://github.com/noagomigar)

---

## 🇬🇧 English

**TeeLab** is a fullstack e-commerce web app for buying artistic t-shirts, built with vanilla JavaScript and Node.js + Express.
Browse the catalog, filter by size and color, add items to your cart, and place your order to get a ticket.

### **Features**
- Catalog page fetching t-shirts from a REST API
- Filters by size, color and text search, with sorting by price or name
- Filters applied server-side via query params — no client-side filtering
- Persistent shopping cart using localStorage
- Cart page with per-line subtotals, remove item and clear cart options
- Order submission via POST request returning a printable ticket
- Ticket page showing order ID, date, status and line items
- CORS-enabled API communication between frontend and backend

### **Tech Stack**
- **Frontend:** HTML, CSS, Vanilla JavaScript (fetch + async/await)
- **Backend:** Node.js + Express
- **Storage:** localStorage
- **Communication:** REST API with CORS
- **Architecture:** separated functions, max 15 lines each, with `init()` as entry point

### **Getting Started**

#### Backend
1. Go to the backend folder and install dependencies
```bash
cd backend
npm install
```
2. Start the server
```bash
node index.js
```
The API will be available at `http://localhost:3000`

#### Frontend
1. Open the `frontend` folder with **Live Server** (VS Code extension)
2. The app will open in your browser automatically

> Make sure the backend is running before launching the frontend.

### **Endpoints Used**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/camisetas` | Get all t-shirts |
| GET | `/api/camisetas?talla=M&color=negro&sort=precio_asc` | Get filtered t-shirts |
| GET | `/api/camisetas/:id` | Get t-shirt detail |
| POST | `/api/comandas` | Submit an order |
| GET | `/api/comandas/:id` | Get order ticket |

### **Author**
Noa Gomez I Garcia
[GitHub](https://github.com/noagomigar)
