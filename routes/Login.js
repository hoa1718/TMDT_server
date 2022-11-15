const express = require('express');
const router = express.Router();
const controller= require("../controller/Login");

router.post('/authentication',controller.authentication)
router.post('/registration',controller.registration)

module.exports=router;