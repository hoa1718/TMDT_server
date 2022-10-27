const express = require('express')
const app = express()
const port = process.env.port || 4000;
const path= require('path');
const cors = require('cors');


app.use(express.static("img"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'img')));

const morgan = require('morgan');
app.use(morgan('combined'))

require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening on port ${port}`)
})