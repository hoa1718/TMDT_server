const express = require('express');
const router = express.Router();
const controller= require("../controller/PhanLoai");

router.get('/', controller.getLoai)

module.exports= router;