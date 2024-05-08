export const createEspecialidad = async (db, data) => {
    const collection = db.collection('especialidad');
    return await collection.insertOne(data);
};

export const getAllEspecialidad = async (db) => {
    const collection = db.collection('especialidad');
    return await collection.find({}).toArray();
};