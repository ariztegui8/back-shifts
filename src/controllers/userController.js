
export const addUser = async (req, res, db) => {
    const { email, password} = req.body

    try {
        const result = await db.collection('users').insertOne({
            email,
            password,
            // nombre,
            // apellido,
            // email,
            // profesion,
            // empresa,
            // pais,
            subscribedAt: new Date()
        })
        res.status(201).send({ message: 'Usuario exitoso', id: result.insertedId })
    } catch (error) {
        console.error('Error al agregar usuario', error)
        res.status(500).send({ error: 'Internal server error' })
    }
}

export const listUsers = async (req, res, db) => {
    try {
        const users = await db.collection('users').find().toArray()
        res.status(200).send(users)
    } catch (error) {
        console.error('Error al listar usuario', error)
        res.status(500).send({ error: 'Internal server error' })
    }
}