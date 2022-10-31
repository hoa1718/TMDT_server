const express = require('express');
const router = express.Router();
const controller= require("../controller/Hangsx");

router.get('/', controller.getHang)

module.exports= router;