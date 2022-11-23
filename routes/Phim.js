const express = require('express');
const router = express.Router();
const controller= require("../controller/Phim");

router.get('/', controller.getPhim)
router.get('/PhimAdmin', controller.getPhimAdmin)
router.post('/Create/CreatePhim', controller.postPhimAdmin)

module.exports= router;
