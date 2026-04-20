import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import camisetasRouter from './routes/camisetas.routes.js';
import comandasRouter from './routes/comandas.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración para obtener el directorio actual en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares globales
app.use(express.json());
app.use(cors());

// Log mínimo
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// 1. RUTAS DE LA API
app.use('/api/camisetas', camisetasRouter);
app.use('/api/comandas', comandasRouter);

// 2. SERVIR FRONTEND (Archivos estáticos)
// Esto asume que 'frontend' está al mismo nivel que 'backend'
app.use(express.static(path.join(__dirname, '../../frontend')));

// 3. RUTA PARA EL INDEX.HTML (Single Page Application logic)
app.get('/:catchall*', (req, res) => {
    // Si la petición no es para la API, enviamos el HTML
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(__dirname, '../../frontend/html/index.html'));
    }
});

// Middleware de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error interno del servidor" });
});

// Solo arrancar el servidor si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en puerto ${PORT}`);
    });
}

export default app;