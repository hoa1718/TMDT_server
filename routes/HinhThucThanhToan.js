const express = require('express');
const router = express.Router();
const controller= require("../controller/HinhThucThanhToan");

router.get('/', controller.getThanhToan)

module.exports= router;