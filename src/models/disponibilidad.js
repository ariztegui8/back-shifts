export const createDisponibilidad = async (db, data) => {
    const collection = db.collection('disponibilidad');
    return await collection.insertOne(data);
};

export const getDisponibilidadByProfessionalId = async (db, professionalId) => {
    const collection = db.collection('disponibilidad');
    return await collection.find({ professionalId }).toArray();
};