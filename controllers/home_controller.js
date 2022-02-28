const Post = require('../models/post');

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
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });
}