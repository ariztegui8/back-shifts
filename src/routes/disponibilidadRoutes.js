import express from 'express';
import { createDisponibilidadController, getDisponibilidadByProfessionalController } from '../controllers/disponibilidadController.js';

const router = express.Router();

const disponibilidadRoutes = (db) => {
    router.post('/', (req, res) => createDisponibilidadController(req, res, db));
    router.get('/:professionalId', (req, res) => getDisponibilidadByProfessionalController(req, res, db));
    return router;
}

export default disponibilidadRoutes;