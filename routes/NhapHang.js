const express = require('express');
const router = express.Router();
const controller= require("../controller/NhapHang");

router.get('/', controller.getPhieuNhap)

module.exports= router;