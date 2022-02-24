const User = require("../models/user");



module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(user){
                return res.render('profile',{
                    title:"profile page",
                    user_name:user.name,
                    email_id:user.email
                });
            }
            return res.redirect('/users/sign-in');
        });
    }else{
        return res.redirect('/users/sign_in');
    }
};

module.exports.post = function(req,res){
    res.end('<h1>User posts</h1>')
};

//render sign in page
module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title:"user | sign in here"
    });
};

//render sign up page
module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | sign up here"
    });
};

//render sign out page
module.exports.signout = function(req,res){
    //its cookie while changing the cookie and cookie in other places 
    res.cookie('user_id',55);
    return res.render('user_sign_in',{
        title:"user | sign in here"
    });
};


//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding the user in signing up');return};
        
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating the user while signing up');return};
                return res.redirect('/users/sign-in')
            });
        }else{
            return res.redirect('back');
        }
    });
};


//sign in and creat the session for the user
module.exports.createSession = function(req,res){
    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding the user in signing in');return};

        //handle user foud
        if(user){
            //handle password which dont match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
            
        }else{
            //handle user not foud
            return res.redirect('back');
        }
    });
    
    
    //handle password which dont match

    //handle session creation



};