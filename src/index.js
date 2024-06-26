import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import professionalRoutes from './routes/professionalRoutes.js';
import professionalObraSocialRoutes from './routes/professionalObraSocialRoutes.js';
import obraSocialRoutes from './routes/obraSocialRoutes.js';
import especialidadRoutes from './routes/especialidadRoutes.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const urlMongo = `${process.env.MONGO_URL}?retryWrites=true&w=majority`

const client = new MongoClient(urlMongo)

async function main() {
  try {
    await client.connect()
    console.log('Conectado a la base de datos')
    const db = client.db('shifts')

    app.use('/api/authUser', userRoutes(db))
    app.use('/api/authAdmin', adminRoutes(db))
    app.use('/api/professional', professionalRoutes(db))
    app.use('/api/professionalObraSocial', professionalObraSocialRoutes(db))
    app.use('/api/obraSocial', obraSocialRoutes(db))
    app.use('/api/especialidad', especialidadRoutes(db))

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`)
    })
  } catch (error) {
    console.error('Error conectando a la base de datos:', error)
    process.exit(1)
  }
}

main()
