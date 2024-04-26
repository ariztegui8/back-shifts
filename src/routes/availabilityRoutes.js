import express from 'express';
import { addAvailability, getAvailability } from '../controllers/availabilityController.js';

const availabilityRoutes = (db) => {
    const router = express.Router();

    router.post('/', (req, res) => addAvailability(req, res, db));
    router.get('/:professionalId', (req, res) => getAvailability(req, res, db));

    return router;
}

export default availabilityRoutes;