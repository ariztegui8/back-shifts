import express from 'express';
import { associateProfessionalWithObraSocialController, getObrasSocialesByProfessionalController } from '../controllers/professionalObraSocialController.js';

const router = express.Router();

const professionalObraSocialRoutes = (db) => {
    router.post('/', (req, res) => associateProfessionalWithObraSocialController(req, res, db));
    router.get('/:professionalId', (req, res) => getObrasSocialesByProfessionalController(req, res, db));
    return router;
}

export default professionalObraSocialRoutes;