const express = require('express')
const app = express()
const port = process.env.port || 4000;
const path= require('path');
const cors = require('cors');
const {connect} = require('./config/db')
const router = require('./routes')

app.use(cors())
app.use(express.static("images"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'img')));

const morgan = require('morgan');
app.use(morgan('combined'))

require('dotenv').config();
connect();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

router(app)

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening on port ${port}`)
})