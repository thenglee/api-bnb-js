import express from 'express'
import morgan from 'morgan'

import userRoute from './routes/userRoute.js'
import placeRoute from './routes/placeRoute.js'


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', userRoute)
app.use('/api', placeRoute)

app.get('/', (req, res) => {
  res.send({message: "hello world"})
})

export { app }
