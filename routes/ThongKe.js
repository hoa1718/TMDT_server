const express = require('express');
const router = express.Router();
const controller= require("../controller/ThongKe");

router.get('/', controller.getThongKe)
router.get('/ThongKeThang', controller.getThongKeThang)
router.get('/ThongKeNgay', controller.getThongKeNgay)
router.get('/DonHangChuaXuLy', controller.getDonHangChuaXuLy)
router.get('/DonHangHomNay', controller.getDonHangHomNay)

module.exports= router;