import { createUser, findAllUsers, findUserById, updateUser, findUserByEmail } from '../models/user.js';
import bcrypt from 'bcryptjs';

export const createUserController = async (req, res, db) => {
    try {
        const { email, password, name, apellido, pais, picture } = req.body;
        const userData = {
            email,
            password,
            name,
            apellido,
            pais,
            rol: 'user',
            picture,
            subscribedAt: new Date(),
        };

        const user = await createUser(db, userData);

         if (user.error) {
            res.status(409).send({ message: user.error });  // 409 Conflict o 400 Bad Request podrían ser apropiados aquí
        } else {
            res.status(201).send({ message: "User created successfully", userId: user.insertedId });
        }
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
    const { email, name, apellido, profesion, empresa, pais, picture } = req.body;

    try {
        const userData = {
            email,
            name,
            apellido,
            profesion,
            empresa,
            pais,
            picture,
            rol: 'user',
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
                // Simplificar la respuesta enviada
                res.status(200).send({
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    apellido: user.apellido,
                    pais: user.pais,
                    picture: user.picture,
                    rol: user.rol,
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


