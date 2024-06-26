import { createProfessional, getProfessionalById } from '../models/professional.js';
import { ObjectId } from 'mongodb';
import cloudinary from '../cloudinary/cloudinaryConfig.js';

export const createProfessionalController = async (req, res, db) => {
    try {
        const { nombre, apellido, email, domicilio, pais, dni, telefono, matricula, selectedObrasSociales, especialidad} = req.body

        let { availableDates} = req.body;
        try {
            availableDates = availableDates ? JSON.parse(availableDates) : [];
            // selectedObrasSociales = selectedObrasSociales ? JSON.parse(selectedObrasSociales) : [];
            // especialidad = especialidad ? JSON.parse(especialidad) : null;
        } catch (error) {
            console.error('JSON parse error:', error);
            return res.status(400).send({ error: "Invalid JSON format in request" });
        }

        let image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            image = result.secure_url
            // console.log("URL de la imagen subida:", image);
        } else {
            image = process.env.CLOU_DEFAULT_IMAGE_URL
        }

        const professionalData = { nombre, apellido, email, domicilio, pais, dni, telefono, matricula, image, availableDates, selectedObrasSociales, especialidad };
        const result = await createProfessional(db, professionalData);
        if (result.acknowledged) {
            const total = await db.collection('professional').countDocuments();
            const totalPages = Math.ceil(total / 12);

            res.status(201).send({
                message: "Professional creado exitosamente",
                professionalId: result.insertedId,
                imagePath: image,
                currentPage: Math.ceil(total / 12),
                totalPages: totalPages
            });
        } else {
            res.status(400).send({ error: "No se pudo crear el professional" });
        }
    } catch (error) {
        console.error('Error al crear professional', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
}

export const getAllProfessionalController = async (req, res, db) => {
    const { search, sort, page = 1, limit = 12 } = req.query
    const skip = (page - 1) * limit

    let query = {}
    if (search) {
        query = {
            $or: [
                { nombre: { $regex: search, $options: "i" } },
                { apellido: { $regex: search, $options: "i" } },
                { especialidad: { $regex: search, $options: "i" } },
                { matricula: { $regex: search, $options: "i" } }
            ]
        }
    }

    let sortOrder = {}
    if (sort === 'ASC') {
        sortOrder = { nombre: 1 }
    } else if (sort === 'DEC') {
        sortOrder = { nombre: -1 }
    }

    try {
        const professional = await db.collection('professional')
            .find(query)
            .sort(sortOrder)
            .skip(skip)
            .limit(parseInt(limit))
            .toArray()

        const total = await db.collection('professional').countDocuments(query)

        res.status(200).send({
            professional,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        })
    } catch (error) {
        console.error('Error al obtener professional', error)
        res.status(500).send({ error: 'Error interno del servidor' })
    }
}

export const getProfessionalControllerById = async (req, res, db) => {
    try {
        const professional = await getProfessionalById(db, req.params.id)
        if (professional) {
            res.status(200).send(professional)
        } else {
            res.status(404).send({ message: "Professional no encontrado" })
        }
    } catch (error) {
        console.error('Error al obtener el professional', error)
        res.status(500).send({ error: 'Error interno del servidor' })
    }
}

export const updateProfessionalController = async (req, res, db) => {
    const { id } = req.params
    const { nombre, apellido, email, domicilio, pais, dni, telefono, especialidad, matricula } = req.body
    const data = { nombre, apellido, email, domicilio, pais, dni, telefono, especialidad, matricula }

    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path)
        data.image = result.secure_url
    }

    try {
        const result = await db.collection('professional').updateOne({ _id: new ObjectId(id) }, { $set: data })
        if (result.modifiedCount === 1) {
            const updatedProfessional = await db.collection('professional').findOne({ _id: new ObjectId(id) })
            if (updatedProfessional) {
                res.status(200).send(updatedProfessional)
            } else {
                res.status(404).send({ message: "Professional actualizado pero no encontrado" })
            }
        } else {
            res.status(404).send({ message: "Professional no encontrado o sin cambios" })
        }
    } catch (error) {
        console.error('Error al actualizar professional', error)
        res.status(500).send({ error: 'Error interno del servidor' })
    }
}

export const deleteProfessionalController = async (req, res, db) => {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "ID no válido" })
    }

    try {
        const result = await db.collection('professional').deleteOne({ _id: new ObjectId(id) })
        if (result.deletedCount === 1) {
            res.status(200).send({ message: "Professional eliminado exitosamente" })
        } else {
            res.status(404).send({ message: "Professional no encontrado" })
        }
    } catch (error) {
        console.error('Error al eliminar professional', error);
        res.status(500).send({ error: 'Error interno del servidor' })
    }
}
