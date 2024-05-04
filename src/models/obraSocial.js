export const createObraSocial = async (db, data) => {
    const collection = db.collection('obraSocial');
    return await collection.insertOne(data);
};

export const getAllObrasSociales = async (db) => {
    const collection = db.collection('obraSocial');
    return await collection.find({}).toArray();
};