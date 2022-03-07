// importing express
const express = require('express');

// callling the router
const router = express.Router();

router.use('/v1',require('./v1'));  

module.exports = router;