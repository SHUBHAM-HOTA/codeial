module.exports.profile = function(req,res){
    return res.render('profile',{
        title:"profile page"
    });
};

module.exports.post = function(req,res){
    res.end('<h1>User posts</h1>')
};