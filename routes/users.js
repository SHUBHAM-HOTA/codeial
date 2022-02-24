const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);

router.get('/post',usersController.post);

router.get('/sign-in',usersController.signin);

router.get('/sign-up',usersController.signup);

router.post('/create',usersController.create);

router.post('/create_session',usersController.createSession);

router.post('/sign_out',usersController.signout);
// exporting the router
module.exports = router;