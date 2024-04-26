import express from 'express';
import { createProfessionalController, getAllProfessionalController, loginProfessional } from '../controllers/professionalController.js';

const router = express.Router();

const professionalRoutes = (db) => {
    router.post('/', (req, res) => createProfessionalController(req, res, db));
    router.get('/', (req, res) => getAllProfessionalController(req, res, db));
    router.post('/login', (req, res) => loginProfessional(req, res, db));
    return router;
}

export default professionalRoutes;
