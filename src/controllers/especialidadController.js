import { createEspecialidad, getAllEspecialidad } from '../models/especialidad.js';

export const createEspecialidadController = async (req, res, db) => {
    try {
        const result = await createEspecialidad(db, req.body);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error al crear Especialidad', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const getAllEspecialidadController = async (req, res, db) => {
    try {
        const especialidades = await getAllEspecialidad(db);
        res.status(200).send(especialidades);
    } catch (error) {
        console.error('Error al obtener obras sociales', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};