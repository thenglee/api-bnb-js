import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send({message: "hello world"})
})


app.listen(3000, () => {
  console.log('Server listening on 3000')
})