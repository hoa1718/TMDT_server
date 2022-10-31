const express = require('express')
const app = express()
const port = process.env.port || 4000;
const path= require('path');
const cors = require('cors');
<<<<<<< HEAD
const {connect} = require('./config/db')
const router = require('./routes')

app.use(cors())
app.use(express.static("images"));
=======
const route = require('./routes');
const db= require('./config/dbconnect');
db.connected();
app.use(express.static("img"));
>>>>>>> dfe1c5efc0797f495e85e6a8393a9b2151120a79
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'img')));

const morgan = require('morgan');
app.use(morgan('combined'))

require('dotenv').config();
<<<<<<< HEAD
connect();
=======

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
>>>>>>> dfe1c5efc0797f495e85e6a8393a9b2151120a79
app.get('/', (req, res) => {
  res.send('Hello World!')
})

router(app)

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening on port ${port}`)
})