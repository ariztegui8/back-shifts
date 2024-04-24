import { createUser, findAllUsers, findUserById, updateUser, findUserByEmail } from '../models/user.js';
import bcrypt from 'bcryptjs';

export const createUserController = async (req, res, db) => {
    try {
        const { email, password, name, apellido, pais } = req.body;
        const userData = {
            email,
            password,
            name,
            apellido,
            pais,
            subscribedAt: new Date()
        };

        const user = await createUser(db, userData);
        res.status(201).send({ message: "Usuario creado exitosamente", userId: user.insertedId });
    } catch (error) {
        console.error('Error al crear usuario', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const getAllUsersController = async (req, res, db) => {
    try {
        const users = await findAllUsers(db);
        res.status(200).send(users);
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const updateUserController = async (req, res, db) => {
    const { id } = req.params;
    const { email, name, apellido, profesion, empresa, pais } = req.body;

    try {
        const userData = {
            email,
            name,
            apellido,
            profesion,
            empresa,
            pais
        };

        const result = await updateUser(db, id, userData);
        if (result.modifiedCount === 1) {
            const updatedUser = await findUserById(db, id);
            if (updatedUser) {
                res.status(200).send(updatedUser);
            } else {
                res.status(404).send({ message: "Usuario actualizado pero no encontrado" });
            }
        } else {
            res.status(404).send({ message: "Usuario no encontrado o sin cambios" });
        }
    } catch (error) {
        console.error('Error al actualizar usuario', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

export const loginUser = async (req, res, db) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(db, email);

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
               
                res.status(200).send({
                    message: "Login exitoso",
                    user: {
                        email: user.email, // Confirma que esto es enviado correctamente
                        name: user.name,
                        apellido: user.apellido,
                        pais: user.pais
                    }
                });
            } else {
                res.status(401).send({ error: "Contraseña incorrecta" });
            }
        } else {
            res.status(404).send({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error('Error al iniciar sesión', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};


