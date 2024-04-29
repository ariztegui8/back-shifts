import { ObjectId } from 'mongodb'

export const createProfessional = async (db, data) => {
  const collection = db.collection('professional')
  return await collection.insertOne(data)
}

export const getAllProfessional = async (db) => {
  const collection = db.collection('professional')
  return await collection.find({}).toArray()
}

export const getProfessionalById = async (db, id) => {
  const collection = db.collection('professional');
  return await collection.findOne({ _id: new ObjectId(id) })
}

export const updateProfessional = async (db, id, data) => {
  const collection = db.collection('professional')
  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: data })
}

export const deleteProfessional = async (db, id) => {
  const collection = db.collection('professional')
  return await collection.deleteOne({ _id: new ObjectId(id) })
}