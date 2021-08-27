import db from '../db/database.js'
import { isEmpty } from '../helpers/validation.js'
import {
  successMsg, errorMsg, status
} from '../helpers/status.js'

const getAllPlaces = async (req, res) => {
  const getAllPlacesQuery = 'SELECT * from places ORDER BY id DESC'

  try {
    const { rows } = await db.query(getAllPlacesQuery)
    if (!rows[0]) {
      return res.status(400).send('No places found.')
    }
    return res.status(200).json({data: rows})

  } catch (error) {
    console.error(error)
    return res.status(500).send('An error occurred.')
  }
}

const addPlace = async (req, res) => {
  const { country, state, city, postalcode,
    name, description, price, user_id } = req.body
  let { available } = req.body

  if (isEmpty(country) || isEmpty(state) || isEmpty(city) || isEmpty(postalcode)
     || isEmpty(name) || isEmpty(price) || isEmpty(user_id)) {
    errorMsg.error = 'Country, state, city, postal code, name, price and user_id cannot be empty.'
    return res.status(status.bad).send(errorMsg)
  }

  if (isEmpty(available)) {
    available = false
  }

  const createPlaceQuery = `INSERT INTO
    places(country, state, city, postal_code,
      name, description, price, available, user_id)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *`

  const values = [country, state, city, postalcode,
    name, description, price, available, user_id]

  try {
    const { rows } = await db.query(createPlaceQuery, values)
    successMsg.data = rows[0]
    return res.status(201).send(successMsg)
  } catch (error) {
    console.error(error)
    errorMsg.error = 'Unable to add place.'
    return res.status(status.error).send(errorMsg)
  }
}

export {
  getAllPlaces,
  addPlace
}