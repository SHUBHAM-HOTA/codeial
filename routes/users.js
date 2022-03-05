const express = require('express');
const { authenticate } = require('passport');

const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');


//here passport.checkAuthentication is added so that the user can access the profile page only when logged in 
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
//here we are updating the profile page according to the user fills the form
//router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.post('/update/:id',usersController.update);
router.get('/post',usersController.post);

router.get('/sign-in',usersController.signin);

router.get('/sign-up',usersController.signup);

router.post('/create',usersController.create);

// use passport as a middileware to authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);



//for sign out
router.get('/sign-out',usersController.destroySession);


// exporting the router
module.exports = router;