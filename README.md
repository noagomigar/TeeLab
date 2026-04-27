# 🛍️ TeeLab

A fullstack e-commerce web app for buying artistic t-shirts, built with vanilla JavaScript and Node.js + Express.

Browse the catalog, filter by size and color, add items to your cart, and place your order to get a ticket.

## Features

- Catalog page fetching t-shirts from a REST API
- Filters by size, color and text search, with sorting by price or name
- Filters applied server-side via query params — no client-side filtering
- Persistent shopping cart using localStorage
- Cart page with per-line subtotals, remove item and clear cart options
- Order submission via POST request returning a printable ticket
- Ticket page showing order ID, date, status and line items
- CORS-enabled API communication between frontend and backend

## Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript (fetch + async/await)
- **Backend:** Node.js + Express
- **Storage:** localStorage
- **Communication:** REST API with CORS
- **Architecture:** separated functions, max 15 lines each, with `init()` as entry point

## Getting Started

### Backend

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

### Frontend

1. Open the `frontend` folder with **Live Server** (VS Code extension)
2. The app will open in your browser automatically

> Make sure the backend is running before launching the frontend.

## Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/camisetas` | Get all t-shirts |
| GET | `/api/camisetas?talla=M&color=negro&sort=precio_asc` | Get filtered t-shirts |
| GET | `/api/camisetas/:id` | Get t-shirt detail |
| POST | `/api/comandas` | Submit an order |
| GET | `/api/comandas/:id` | Get order ticket |

## Author

[Noa Gomez I Garcia]  
[GitHub](https://github.com/noagomigar)
