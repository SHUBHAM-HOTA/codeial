// importing express
const express = require('express');

// callling the router
const router = express.Router();
const homeController = require('../controllers/home_controller')


console.log('router loaded and working fine')


router.get('/',homeController.home)

// exporting the router
module.exports = router