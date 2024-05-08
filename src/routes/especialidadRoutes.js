import express from 'express';
import { createEspecialidadController, getAllEspecialidadController } from '../controllers/especialidadController.js';

const router = express.Router();


const especialidadRoutes = (db) => {
    router.post('/', (req, res) => createEspecialidadController(req, res, db));
    router.get('/', (req, res) => getAllEspecialidadController(req, res, db));
    return router;
}

export default especialidadRoutes;