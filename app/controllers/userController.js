import db from '../db/database.js'

const getAllUsers = async (req, res) => {
  const getAllUsersQuery = 'SELECT * FROM users ORDER BY id DESC'

  try {
    const { rows } = await db.query(getAllUsersQuery)
    if (rows[0] === undefined) {
      return res.status(400).send('No users found.')
    }
    return res.status(200).json({data: rows})
  } catch (error) {
    console.error(error)
    return res.status(500).send('An error occurred.')
  }
  res.status(200).json({ data: 'test'})
}


const addUser = async (req, res) => {
  const { name } = req.body

  if (name === undefined || name === null || name === '') {
    return res.status(400).send('Name is required.')
  }

  const createUserQuery = `INSERT INTO
    users(name)
    VALUES($1)
    returning *`

   const values = [name]

   try {
     const { rows } = await db.query(createUserQuery, values)
     return res.status(201).json({data: rows[0]})
   } catch (error) {
     console.error(error)
     return res.status(500).send('Unable to add user.')
   }
}

export {
  getAllUsers,
  addUser
}