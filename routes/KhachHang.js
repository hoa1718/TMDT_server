const express = require('express');
const router = express.Router();
const controller= require("../controller/KhachHang");

router.get('/search/SearchKhachHang',controller.getSearchKhachHang)
router.get('/', controller.getKhachHang)
router.post('/:id',controller.updateKhachHang);
router.get("/DiaChi/:id",controller.getDiaChi)
router.get("/search/:id",controller.getKhachHangWID)
router.post("/update/password",controller.changePassword)
router.post("/update/info",controller.changeInfo)
    
module.exports= router;
