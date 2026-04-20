import express from 'express';
import cors from 'cors';
import path from 'path'; 
import { fileURLToPath } from 'url'; 

import camisetasRouter from './routes/camisetas.routes.js';
import comandasRouter from './routes/comandas.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales 
app.use(express.json());
app.use(cors());

// Log mínimo 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/camisetas', camisetasRouter);
app.use('/api/comandas', comandasRouter);

// Frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/html/productos.html'));
});

// Ruta para el resto de páginas HTML
app.get('/:page.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/html', `${req.params.page}.html`));
});

// Middleware de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error interno del servidor" });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en puerto ${PORT}`);
    });
}

export default app;