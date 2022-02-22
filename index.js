const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require('./routes'))


//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        // here new menthod is used to write err in between string the key before 1 is used here
        // this method is called interpolation
        // this evaluetes the word inside the bracket after doller like ${2+2} will be 3
        console.log(`Error in running the server:,${err}`);
    }
    console.log(`server is running on port: ${port}`);
});