//const { redirect } = require("express/lib/response");
const User = require("../models/user");


//no need to add async await because there is only one callback function
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title:"profile page",
            profile_user:user
        });
    });
    
};

//version 1
// module.exports.update = function(req,res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
//             return res.redirect('back');
//         });
//     }else{
//         req.flash('error','Unauthorized');    
//         return res.status(401).send('Unauthorized');
//     }
// }

// module.exports.post = function(req,res){
//     res.end('<h1>User posts</h1>')
// };

//version 2 with async await because adding the file upload too
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvtar(req,res,function(err){
                if(err){console.log('****multer err',err)}
                //console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    // this is saving the path of uploaded file
                    //into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
    }
        
    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
        
};


//render sign in page
module.exports.signin = function(req,res){
    // if already signed in then redirect to the profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"user | sign in here"
    });
};

//render sign up page
module.exports.signup = function(req,res){
    // if already signed in then redirect to the profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"Codeial | sign up here"
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


//sign in and create the session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
};

module.exports.destroySession = function(req,res){
    req.flash('success','You have Logged out');
    req.logout();
    return res.redirect('/');
};