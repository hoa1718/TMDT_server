const express = require('express');
const router = express.Router();
const controller= require("../controller/KhachHang");

router.get('/search/SearchKhachHang',controller.getSearchKhachHang)
router.get('/', controller.getKhachHang)
router.post('/:id',controller.updateKhachHang);
router.get("/DiaChi/:id",controller.getDiaChi)

module.exports= router;
