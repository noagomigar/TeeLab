import request from 'supertest';
import app from '../server.js';

describe('Tests de la API de Comandas (Punto Extra)', () => {

    //testT 1: GET comanda inexistente - 404
    test('GET /api/comandas/:id con ID inexistente debería devolver 404', async () => {
        const response = await request(app).get('/api/comandas/ORD-9999');
        
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Not Found");
    });

    //test 2: POST comanda con camisetaId inválido - 400
    test('POST /api/comandas con camisetaId inválido debería devolver 400', async () => {
        const comandaInvalida = {
            cliente: { nombre: "Ana Test", email: "ana@test.com" },
            direccion: { calle: "Calle Falsa 123", cp: "08000", ciudad: "Barcelona" },
            items: [
                {
                    camisetaId: "ID_INVENTADO", 
                    talla: "M",
                    color: "negro",
                    cantidad: 1
                }
            ]
        };

        const response = await request(app)
            .post('/api/comandas')
            .send(comandaInvalida);

        expect(response.status).toBe(400);
    });

    //test 3: POST comanda OK - 201
    test('POST /api/comandas con datos correctos debería devolver 201 y el ticket', async () => {
        const comandaValida = {
            cliente: { nombre: "Ana Test", email: "ana@test.com" },
            direccion: { calle: "Calle Falsa 123", cp: "08000", ciudad: "Barcelona" },
            items: [
                {
                    camisetaId: "TSH01",
                    talla: "M",
                    color: "negro",
                    cantidad: 2
                }
            ]
        };

        const response = await request(app)
            .post('/api/comandas')
            .send(comandaValida);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Created");

        expect(response.body.comanda).toHaveProperty('id');
        expect(response.body.comanda).toHaveProperty('total');
        expect(response.body.comanda.total).toBeGreaterThan(0);
    });

});