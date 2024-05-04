export const associateProfessionalWithObraSocial = async (db, professionalId, obraSocialId) => {
    const collection = db.collection('professionalObraSocial');
    return await collection.insertOne({ professionalId, obraSocialId });
};

export const getObrasSocialesByProfessional = async (db, professionalId) => {
    const collection = db.collection('professionalObraSocial');
    return await collection.find({ professionalId }).toArray();
};