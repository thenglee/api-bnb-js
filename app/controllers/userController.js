import db from '../db/database.js'
import { isValidEmail, isEmpty } from '../helpers/validation.js'
import {
  successMsg, errorMsg, status
} from '../helpers/status.js'

const getAllUsers = async (req, res) => {
  const getAllUsersQuery = 'SELECT * FROM users ORDER BY id DESC'

  try {
    const { rows } = await db.query(getAllUsersQuery)
    if (!rows[0]) {
      return res.status(400).send('No users found.')
    }
    return res.status(200).json({data: rows})
  } catch (error) {
    console.error(error)
    return res.status(500).send('An error occurred.')
  }
}


const addUser = async (req, res) => {
  const { email, firstname, lastname, contact } = req.body

  if (isEmpty(email) || isEmpty(firstname) || isEmpty(lastname)|| isEmpty(contact)) {
    errorMsg.error = 'Email, first name, last name and contact field cannot be empty'
    return res.status(status.bad).send(errorMsg)
  }

  if (!isValidEmail(email)) {
    errorMsg.error = 'Please enter a valid email'
    return res.status(status.bad).send(errorMsg)
  }

  const createUserQuery = `INSERT INTO
    users(email, first_name, last_name, contact)
    VALUES($1, $2, $3, $4)
    returning *`

  const values = [email, firstname, lastname, contact]

  try {
   const { rows } = await db.query(createUserQuery, values)
   successMsg.data = rows[0]
   return res.status(status.created).json(successMsg)
  } catch (error) {
   console.error(error)
   errorMsg.error = 'Unable to add user.'
   return res.status(status.error).send(errorMsg)
  }
}

export {
  getAllUsers,
  addUser
}