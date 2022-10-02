
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
app.use(morgan('combined'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORTport, () => {
  console.log(`Example app listening on port ${port}`)
})