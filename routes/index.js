// importing express
const express = require('express');

// callling the router
const router = express.Router();
const homeController = require('../controllers/home_controller')



console.log('router loaded and working fine')


router.get('/',homeController.home)
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


// exporting the router
module.exports = router