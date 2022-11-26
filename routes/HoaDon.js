const express = require('express');
const router = express.Router();
const controller= require("../controller/HoaDon");

router.post('/create',controller.create);
router.get('/SearchHoaDon/',controller.searchHoaDon);
router.get('/:type', controller.getHoaDon);
router.post('/ChapNhanDonHang/:id', controller.chapNhanDonHang);
router.post('/HuyDonHang/:id', controller.huyDonHang);


module.exports= router;