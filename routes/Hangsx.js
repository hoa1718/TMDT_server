const express = require('express');
const router = express.Router();
const controller= require("../controller/Hangsx");

router.get('/', controller.getHang)
router.get('/get/GetHangAdmin', controller.getHangAdmin)
router.post('/Create/CreateHang', controller.postHang)

module.exports= router;