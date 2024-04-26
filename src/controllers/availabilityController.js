import { createAvailability, findAvailabilityByProfessional } from '../models/availability.js';

export const addAvailability = async (req, res, db) => {
    try {
        const { professionalId, dates } = req.body;
        await createAvailability(db, { professionalId, dates });
        res.status(201).send({ message: 'Disponibilidad creada correctamente' });
    } catch (error) {
        console.error('Error al crear disponibilidad', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const getAvailability = async (req, res, db) => {
    try {
        const { professionalId } = req.params;
        const availability = await findAvailabilityByProfessional(db, professionalId);
        res.status(200).send(availability);
    } catch (error) {
        console.error('Error al obtener disponibilidad', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};