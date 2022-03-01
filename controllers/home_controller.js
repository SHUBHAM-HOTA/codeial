const Post = require('../models/post');
const User = require('../models/user')

module.exports.home = function(req,res){

    // Post.find({},function(err,posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    
    // });

    // putting above lines on comment because we want to fetch complete user info not just user id
    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){

        // all_users is for the users list in home page as friends
        User.find({},function(err,users){
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });

        })

        
    });
}