import { createAppointment, findAppointmentsByUser } from '../models/appointment.js';

export const bookAppointment = async (req, res, db) => {
    try {
        const { userId, professionalId, date, insurance } = req.body;
        await createAppointment(db, { userId, professionalId, date, insurance });
        res.status(201).send({ message: 'Turno reservado correctamente' });
    } catch (error) {
        console.error('Error al reservar turno', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};