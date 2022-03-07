// importing express
const express = require('express');

// callling the router
const router = express.Router();
router.use('/posts',require('./posts'));

module.exports = router;