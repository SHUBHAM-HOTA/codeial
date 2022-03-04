const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVTAR_PATH = path.join('/uploads/users/avtars');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,

    }

},{
    timestamps:true
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../',AVTAR_PATH));
    },
    filename: function (req, file, cb) {
      
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

//static methods
// added single that means only one file will be uploaded at that instence names avatar
//this is given in documentation
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
// this will tell the controller where it needs to be stored
userSchema.statics.avatarPath = AVTAR_PATH

const User = mongoose.model('User',userSchema);

module.exports = User;