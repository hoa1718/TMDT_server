const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const path= require('path');
const cors = require('cors');
const router = require('./routes');
const db= require('./config/dbconnect');
db.connected();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'img')));

const morgan = require('morgan');
app.use(morgan('combined'))

require('dotenv').config();

// const whitelist = ['https://tmdt-21-server.herokuapp.com/','http://localhost:3000','https://tmdt-admin.herokuapp.com/','https://tmdt-admin.herokuapp.com/login','http://localhost:4000'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions));

app.use(cors());
router(app)

app.get('/', (req, res) => {
  res.send('Nhom 21!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
