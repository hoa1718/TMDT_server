const express = require('express')
const app = express()
const port = process.env.port || 4000;
const path= require('path');
const cors = require('cors');
const {connect} = require('./config/db')
const router = require('./routes')

app.use(cors())
app.use(express.static("images"));
const route = require('./routes');
const db= require('./config/db');
db.connect();
app.use(express.static("img"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'img')));

const morgan = require('morgan');
app.use(morgan('combined'))

require('dotenv').config();
connect();

const whitelist = ['http://localhost:4000','http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
route(app);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

router(app)

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening on port ${port}`)
})