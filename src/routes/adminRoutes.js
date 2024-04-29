import express from 'express';
import { createAdminController, getAllAdminController, loginAdmin } from '../controllers/adminController.js';


const router = express.Router();

const adminRoutes = (db) => {
    router.post('/', (req, res) => createAdminController(req, res, db));
    router.get('/', (req, res) => getAllAdminController(req, res, db));
    router.post('/login', (req, res) => loginAdmin(req, res, db));
    return router;
}

export default adminRoutes;
