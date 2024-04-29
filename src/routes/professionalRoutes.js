import express from 'express';
import multer from 'multer';
import { createProfessionalController, deleteProfessionalController, getAllProfessionalController, getProfessionalControllerById, updateProfessionalController } from '../controllers/professionalController.js';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

const router = express.Router();


const professionalRoutes = (db) => {
    router.post('/', upload.single('image'), (req, res) => {
        createProfessionalController(req, res, db)
    })

    router.get('/', (req, res) => {
        getAllProfessionalController(req, res, db)
    })

    router.get('/:id', (req, res) => {
        getProfessionalControllerById(req, res, db)
    })

    router.put('/:id', upload.single('image'), (req, res) => {
        updateProfessionalController(req, res, db)
    })

    router.delete('/:id', (req, res) => {
        deleteProfessionalController(req, res, db)
    })

    return router;
}

export default professionalRoutes;
