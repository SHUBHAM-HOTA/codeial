const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');


module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:'Invalid Username or Password'
            });
        }
        return res.json(200,{
            message: 'Sign in successfully, here is your token, please keep it safe',
            data:{
                token: jwt.sign(user.toJSON(),evn.jwt_secret,{expiresIn: '1000000'})
                // here passing the token using the jwt library that installed sapretly
            }
        })
    }catch(err){
        console.log('Error',err);
        
        return res.json(500,{
            message: 'internal server error'
        });
    }
    
};