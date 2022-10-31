const express = require('express');
const router = express.Router();
const controller= require("../controller/phim");

router.get('/', controller.getPhim)

module.exports= router;