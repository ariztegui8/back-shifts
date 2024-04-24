import express from 'express';
import { createUserController, getAllUsersController, loginUser } from '../controllers/userController.js';

const router = express.Router();

const userRoutes = (db) => {
    router.post('/', (req, res) => createUserController(req, res, db));
    router.get('/', (req, res) => getAllUsersController(req, res, db));
    router.post('/login', (req, res) => loginUser(req, res, db));
    return router;
}

export default userRoutes;
