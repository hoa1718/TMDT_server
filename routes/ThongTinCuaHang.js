const express = require('express');
const router = express.Router();
const controller = require("../controller/ThongTinCuaHang");

router.get('/',controller.getThongTin);
router.post('/CapNhat',controller.updateThongTin);

module.exports = router;