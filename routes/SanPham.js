const express = require('express');
const router = express.Router();
const controller= require("../controller/SanPham");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/',controller.getSanPham);
router.get('/search/:search',controller.search);
router.get('/searchSp/:searchSp',controller.searchSp);
router.post('/',controller.createSanPham);
router.get('/:id',controller.getChiTiet);
router.post('/:id',controller.updateSanPham);

module.exports= router;