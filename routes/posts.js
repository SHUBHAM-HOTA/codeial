const express = require('express');
const router = express.Router();

//we need passport to authenticate user
const passport = require('passport')

const postsController = require('../controllers/posts_controller');

// here we are checking the authentication so that the only persion that is signed in can post not others
router.post('/create',passport.checkAuthentication,postsController.create);

router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;