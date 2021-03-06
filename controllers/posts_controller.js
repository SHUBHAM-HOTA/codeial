const Post = require('../models/post');
const Comment = require('../models/comment')
const Like = require('../models/like');
//version 1
//here 1 level of call back so no need to async but still doing it so puttng this on comment
// module.exports.create = function(req,res){
//     Post.create({
//         content:req.body.content,
//         user:req.user._id
//     },function(err,post){
//         if(err){console.log('error in creating a post');return}
        
//         return res.redirect('back');
//     });
    
// };


//version 2 with async await
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        //after adding the ajax we are reciving here the form data submitted
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post,
                },
                message: "Post Created!"
            });
        }

        //adding below line for the nofyfication
        req.flash('success','Post Published');
        return res.redirect('back');

    }catch(err){
        //console.log('Error',err);
        req.flash('error',err);
        return;
    }

};


//version 1
//here 2 level of call back so we need to put async await 

// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id,function(err,post){
//         // here .id means converting the object id into string
//         if(post.user == req.user.id){
//             post.remove();
//             Comment.deleteMany({Post:req.params.id},function(err){
//                 return res.redirect('back')
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// };


//version 2 with async await
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){

            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();

            await Comment.deleteMany({Post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                })
            }

            req.flash('success','Post Deleted');
            return res.redirect('back');
        }else{
            req.flash('error','You can not delete this post');
            return res.redirect('back');
        }
    }catch(err){
        // console.log('Error',err);
        req.flash('error',err);
        return res.redirect('back');
    }

};