const express = require('express');
const router = express.Router();

//we need passport to authenticate user
const passport = require('passport')

const commentsController = require('../controllers/comments_controller');

// here we are checking the authentication so that the only persion that is signed in can post not others
router.post('/create',passport.checkAuthentication, commentsController.create);

router.get('/destroy/:id',passport.checkAuthentication, commentsController.destroy)

module.exports = router;