import express from 'express';
import { createObraSocialController, getAllObrasSocialesController } from '../controllers/obraSocialController.js';

const router = express.Router();


const obraSocialRoutes = (db) => {
    router.post('/', (req, res) => createObraSocialController(req, res, db));
    router.get('/', (req, res) => getAllObrasSocialesController(req, res, db));
    return router;
}

export default obraSocialRoutes;