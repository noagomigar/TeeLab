import * as comandasService from '../services/comandas.service.js';

export function getAll(req, res) {
    const filters = req.query;
    res.json(comandasService.getAll(filters));
}

export function getById(req, res) {
    const comanda = comandasService.getById(req.params.id);

    if (!comanda) return res.status(404).json({ message: "Not Found" });
    res.json(comanda);
}


export function crearComanda(req, res) {
    const result = comandasService.crearComanda(req.body);

    if (result.error) {
        const status = result.status || 400;
        return res.status(status).json({ message: result.error });
    }

    res.status(201).json({ message: "Created", comanda: result.data });
}