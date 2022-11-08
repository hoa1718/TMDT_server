const express = require('express');
const router = express.Router();
const controller = require("../controller/ThongTinCuaHang");

router.get('/',controller.getThongTin);

module.exports = router;