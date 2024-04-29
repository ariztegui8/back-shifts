import bcrypt from 'bcryptjs';
import { createAdmin, findAdminByEmail, findAdminById, findAllAdmin, updateAdmin } from '../models/admin.js';


export const createAdminController = async (req, res, db) => {
    try {
        const { email, password, name, apellido, pais, picture } = req.body;
        const adminData = {
            email,
            password,
            name,
            apellido,
            pais,
            rol: 'admin',
            picture,
            subscribedAt: new Date()
        };

        const admin = await createAdmin(db, adminData);
        if (admin.error) {
            res.status(409).send({ message: admin.error });  // 409 Conflict o 400 Bad Request podrían ser apropiados aquí
        } else {
            res.status(201).send({ message: "Admin created successfully", userId: admin.insertedId });
        }
    } catch (error) {
        console.error('Error al crear admin', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const getAllAdminController = async (req, res, db) => {
    try {
        const admins = await findAllAdmin(db);
        res.status(200).send(admins);
    } catch (error) {
        console.error('Error al obtener admins', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const updateAdminController = async (req, res, db) => {
    const { id } = req.params;
    const { email, name, apellido, profesion, empresa, pais, picture } = req.body;

    try {
        const adminData = {
            email,
            name,
            apellido,
            profesion,
            empresa,
            pais,
            picture,
            rol: 'admin',
        };

        const result = await updateAdmin(db, id, adminData);
        if (result.modifiedCount === 1) {
            const adminUpdate = await findAdminById(db, id);
            if (adminUpdate) {
                res.status(200).send(adminUpdate);
            } else {
                res.status(404).send({ message: "Admin actualizado pero no encontrado" });
            }
        } else {
            res.status(404).send({ message: "Admin no encontrado o sin cambios" });
        }
    } catch (error) {
        console.error('Error al actualizar admin', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const loginAdmin = async (req, res, db) => {
    try {
        const { email, password } = req.body;

        const admin = await findAdminByEmail(db, email);

        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);

            if (isMatch) {
               
                res.status(200).send({
                    message: "Login exitoso",
                    admin: {
                        id: user._id,
                        email: user.email, // Confirma que esto es enviado correctamente
                        name: user.name,
                        apellido: user.apellido,
                        pais: user.pais,
                        picture: user.picture,  
                        rol: user.rol,
                    }
                });
            } else {
                res.status(401).send({ error: "Contraseña incorrecta" });
            }
        } else {
            res.status(404).send({ error: "Admin no encontrado" });
        }
    } catch (error) {
        console.error('Error al iniciar sesión', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};


