import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

export const createUser = async (db, userData) => {
    const collection = db.collection('users');

    // Hashear la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Crear un objeto con los datos del usuario incluyendo la contraseña hasheada
    const newUser = {
        ...userData,
        password: hashedPassword,
        subscribedAt: new Date()  // Añadir la fecha de creación
    };

    return await collection.insertOne(newUser);
};

export const findAllUsers = async (db) => {
    const collection = db.collection('users');
    return await collection.find({}).toArray();
};

export const findUserById = async (db, id) => {
    const collection = db.collection('users');
    return await collection.findOne({ _id: new ObjectId(id) });
};

export const updateUser = async (db, id, userData) => {
    const collection = db.collection('users');
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: userData });
};

export const deleteUser = async (db, id) => {
    const collection = db.collection('users');
    return await collection.deleteOne({ _id: new ObjectId(id) });
};

export const findUserByEmail = async (db, email) => {
    const collection = db.collection('users');
    const user = await collection.findOne({ email });
    console.log("Usuario encontrado por email:", user); 
    return user;
};
