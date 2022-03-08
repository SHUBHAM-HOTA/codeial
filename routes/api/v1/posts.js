const express = require('express');

const router = express.Router();
const passport = require('passport');
const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/',postsApi.index);
//to prevent session cookies to be generated we set the session to be flase
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy);

module.exports = router;

