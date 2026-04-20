import * as camisetasService from '../services/camisetas.service.js';

export function getAllFiltered(req, res) {
    const filters = req.query;
    res.json(camisetasService.getAllFiltered(filters));
}

export function getById(req, res) {
    const camiseta = camisetasService.getById(req.params.id);

    if (!camiseta) return res.status(404).json({ message: "Not Found" });
    res.json(camiseta);
}