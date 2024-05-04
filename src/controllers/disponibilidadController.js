import { createDisponibilidad, getDisponibilidadByProfessionalId } from '../models/disponibilidad.js';

export const createDisponibilidadController = async (req, res, db) => {
    try {
        const result = await createDisponibilidad(db, req.body);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error al crear disponibilidad', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const getDisponibilidadByProfessionalController = async (req, res, db) => {
    try {
        const disponibilidad = await getDisponibilidadByProfessionalId(db, req.params.professionalId);
        res.status(200).send(disponibilidad);
    } catch (error) {
        console.error('Error al obtener disponibilidad', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};