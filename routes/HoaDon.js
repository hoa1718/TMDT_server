const express = require('express');
const router = express.Router();
const controller= require("../controller/HoaDon");

router.post('/create', controller.create)
module.exports= router;