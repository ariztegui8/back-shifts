import express from 'express';
import { bookAppointment } from '../controllers/appointmentController.js';

const appointmentRoutes = (db) => {
    const router = express.Router();

    router.post('/', (req, res) => bookAppointment(req, res, db));

    return router;
}

export default appointmentRoutes;