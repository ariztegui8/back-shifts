// Crear un nuevo turno
export const createAppointment = async (db, { userId, professionalId, date, insurance }) => {
    const collection = db.collection('appointments');
    return await collection.insertOne({
        userId,
        professionalId,
        date,
        insurance,
        status: 'pending'
    });
};

// Listar turnos de un usuario
export const findAppointmentsByUser = async (db, userId) => {
    const collection = db.collection('appointments');
    return await collection.find({ userId }).toArray();
};