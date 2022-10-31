const express = require('express');
const router = express.Router();
const controller= require("../controller/KhachHang");

router.get('/', controller.getKhachHang)
router.post('/:id',controller.updateKhachHang);


module.exports= router;