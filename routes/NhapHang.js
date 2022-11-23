const express = require('express');
const router = express.Router();
const controller= require("../controller/NhapHang");

router.get('/search/SearchPhieuNhap',controller.getSearchPhieuNhap)
router.get('/', controller.getPhieuNhap)
router.post('/CreatePhieuNhap',controller.createPhieuNhap)

module.exports= router;