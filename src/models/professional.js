import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

export const createProfessional = async (db, userData) => {
    const collection = db.collection('professional');

    // Hashear la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Crear un objeto con los datos del usuario incluyendo la contraseña hasheada
    const newUser = {
        ...userData,
        password: hashedPassword,
        userType: 'professional',
        subscribedAt: new Date()  // Añadir la fecha de creación
    };

    return await collection.insertOne(newUser);
};

export const findAllProfessional = async (db) => {
    const collection = db.collection('professional');
    return await collection.find({}).toArray();
};

export const findProfessionalById = async (db, id) => {
    const collection = db.collection('professional');
    return await collection.findOne({ _id: new ObjectId(id) });
};

export const updateProfessional = async (db, id, userData) => {
    const collection = db.collection('professional');
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: userData });
};

export const deleteProfessional = async (db, id) => {
    const collection = db.collection('professional');
    return await collection.deleteOne({ _id: new ObjectId(id) });
};

export const findProfessionalByEmail = async (db, email) => {
    const collection = db.collection('professional');
    const user = await collection.findOne({ email });
    console.log("Usuario encontrado por email:", user); 
    return user;
};
