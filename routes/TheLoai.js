const express = require('express');
const router = express.Router();
const controller= require("../controller/TheLoai");

router.get('/', controller.getTheLoai)
router.post('/Create/CreateLoai', controller.postTheLoai)


module.exports= router;