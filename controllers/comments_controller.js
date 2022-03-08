const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer')

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
            // Similar for comments to fetch the user's id!

            //in the video the below line is present but the funciton execPopulate is removed from the library
            //comment = await comment.populate('user', 'name email').execPopulate();
            comment = await comment.populate('user', 'name email');
            commentsMailer.newComment(comment);
            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');



            res.redirect('/');
        }
    }catch(err){
        console.log('Error', err);
        req.flash('error', err);
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


            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}