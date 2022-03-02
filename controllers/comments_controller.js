const { redirect } = require('express/lib/response');
const Comment = require('../models/comment');
const Post = require('../models/post');

// //version 1
// module.exports.create = function(req,res){
//     Post.findById(req.body.post,function(err,post){
//         if (post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             },function(err,comment){
//                 //handle error here not done yet
//                 post.comments.push(comment);
//                 // whenever we update the database we need to call save so that it can know that 
//                 // this is the finale version and save it here
//                 post.save();

//                 res.redirect('/');
//             });
//         }
//     });
// };

//version 2 with async await
module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            res.redirect('/');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}

// // version 1
// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id,function(err,comment){
//         if (comment.user ==  req.user.id){

//             let postId = comment.post;
//             comment.remove();
//             // $ this is the inbuit syntax we are using 
//             Post.findByIdAndUpdate(postId,{$pull: {comments:req.params.id}},function(err,post){
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     });
// }

// version 2 with async await
module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}