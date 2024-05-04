import { associateProfessionalWithObraSocial, getObrasSocialesByProfessional } from '../models/professionalObraSocial.js';

export const associateProfessionalWithObraSocialController = async (req, res, db) => {
    try {
        const { professionalId, obraSocialId } = req.body;
        const result = await associateProfessionalWithObraSocial(db, professionalId, obraSocialId);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error al asociar profesional con obra social', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const getObrasSocialesByProfessionalController = async (req, res, db) => {
    try {
        const obrasSociales = await getObrasSocialesByProfessional(db, req.params.professionalId);
        res.status(200).send(obrasSociales);
    } catch (error) {
        console.error('Error al obtener obras sociales por profesional', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};