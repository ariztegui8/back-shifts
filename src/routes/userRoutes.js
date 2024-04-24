import express from 'express';
import { addUser, listUsers } from '../controllers/userController.js';

const router = express.Router()

const userRoutes = (db) => {
  router.post('/', (req, res) => addUser(req, res, db))
  router.get('/', (req, res) => listUsers(req, res, db))
  return router
}

export default userRoutes;