const Post = require('../models/post');
const User = require('../models/user');

//version 1

// module.exports.home = function(req,res){

//     Post.find({},function(err,posts){
//         return res.render('home', {
//             title: "Codeial | Home",
//             posts: posts
//         });
    
//     });


    //version 2
    // putting above lines on comment because we want to fetch complete user info not just user id
    //populate the user of each post

    //putting these lines in comments because we want to use async await and make the code cleaner

// module.exports.home = function(req,res){
//     Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     })
//     .exec(function(err,posts){

//         // all_users is for the users list in home page as friends
//         User.find({},function(err,users){
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts: posts,
//                 all_users: users
//             });

//         })

        
//     });
// }

//version 3
module.exports.home = async function(req,res){
    try{
        // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
        

    }catch(err){
        console.log('Error',err);
        return;
    }
}