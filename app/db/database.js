import pg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pg

dotenv.config()

const databaseConfig = { connectionString: process.env.DATABASE_URL }
const pool = new Pool(databaseConfig)

pool.on('connect', () => {
  console.log('Connected to the db')
})

const query = (query, params) => pool.query(query, params)

const db = { query }

export default db