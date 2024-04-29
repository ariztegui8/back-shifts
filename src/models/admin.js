import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

export const createAdmin = async (db, adminData) => {
    const collection = db.collection('admin');

    const existingAdmin = await collection.findOne({ email: adminData.email });
    if (existingAdmin) {
        // Retornar un objeto o error indicando que el correo ya está registrado
        return { error: "El email de este admin ya existe" };
    }

    // Hashear la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Crear un objeto con los datos del usuario incluyendo la contraseña hasheada
    const newAdmin = {
        ...adminData,
        password: hashedPassword,
        rol: 'admin',
        subscribedAt: new Date()  // Añadir la fecha de creación
    };

    return await collection.insertOne(newAdmin);
};

export const findAllAdmin = async (db) => {
    const collection = db.collection('admin');
    return await collection.find({}).toArray();
};

export const findAdminById = async (db, id) => {
    const collection = db.collection('admin');
    return await collection.findOne({ _id: new ObjectId(id) });
};

export const updateAdmin = async (db, id, adminData) => {
    const collection = db.collection('admin');
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: adminData });
};

export const deleteAdmin = async (db, id) => {
    const collection = db.collection('admin');
    return await collection.deleteOne({ _id: new ObjectId(id) });
};

export const findAdminByEmail = async (db, email) => {
    const collection = db.collection('admin');
    const admin = await collection.findOne({ email });
    console.log("Admin encontrado por email:", admin); 
    return admin;
};
