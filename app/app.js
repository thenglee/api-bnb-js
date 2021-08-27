import express from 'express'
import morgan from 'morgan'

import userRoute from './routes/userRoute.js'


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', userRoute)

app.get('/', (req, res) => {
  res.send({message: "hello world"})
})

export { app }
