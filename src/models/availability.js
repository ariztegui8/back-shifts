import { ObjectId } from 'mongodb';


// Crear disponibilidad para un profesional
export const createAvailability = async (db, { professionalId, dates }) => {
    const collection = db.collection('availabilities');
    return await collection.insertOne({
        professionalId,
        dates
    });
};

// Listar disponibilidad de un profesional
export const findAvailabilityByProfessional = async (db, professionalId) => {
    const collection = db.collection('availabilities');
    return await collection.find({ professionalId }).toArray();
};