import express from 'express';
import cors from 'cors';

import camisetasRouter from './routes/camisetas.routes.js';
import comandasRouter from './routes/comandas.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

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