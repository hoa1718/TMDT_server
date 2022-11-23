const express = require('express');
const router = express.Router();
const controller= require("../controller/GiaoHang");

router.get('/SearchGiaoHang/',controller.searchGiaoHang);
router.get('/', controller.getGiaoHang);
router.post('/GiaoThanhCong/:id', controller.giaoThanhCong);
router.post('/GiaoThatBai/:id', controller.giaoThatBai);

module.exports= router;