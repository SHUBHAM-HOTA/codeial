const passport = require('passport');
const { ExtractJwt } = require('passport-jwt/lib');

const env = require('./environment');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_sercret
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id,function(err,user){
        if (err){console.log('Error in finding the user from JWT');return;}

        if(user){
            return done (null,user);
        }else{
            return done(null, false);
            //false means user was not found
        }
    })
}));

module.exports = passport;