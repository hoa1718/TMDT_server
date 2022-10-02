
const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
app.use(morgan('combined'))
app.get('/', (req, res) => {
  res.send('Hello Worlddm!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})