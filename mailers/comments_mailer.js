const nodemailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);
    //send mail is the predefined function

    nodemailer.transporter.sendMail({
        from:'shubham.ophota2@gmail.com',
        to : comment.user.email,
        subject: 'new comment published',
        html: '<h1> Your comment is now published !</h1>'
    },(err,info)=>{
        if(err){
            console.log('Error in sending the mail')
            return;
        };
        console.log('Message send',info);
        return;
    });
}

//this funciton will send a mail when ever the comment is made so 
// we need to call this funciton from the comments controller