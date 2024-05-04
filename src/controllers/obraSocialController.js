import { createObraSocial, getAllObrasSociales } from '../models/obraSocial.js';

export const createObraSocialController = async (req, res, db) => {
    try {
        const result = await createObraSocial(db, req.body);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error al crear obra social', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const getAllObrasSocialesController = async (req, res, db) => {
    try {
        const obrasSociales = await getAllObrasSociales(db);
        res.status(200).send(obrasSociales);
    } catch (error) {
        console.error('Error al obtener obras sociales', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};