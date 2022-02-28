const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                //handle error here not done yet
                post.comments.push(comment);
                // whenever we update the database we need to call save so that it can know that 
                // this is the finale version and save it here
                post.save();

                res.redirect('/');
            });
        }
    });
};