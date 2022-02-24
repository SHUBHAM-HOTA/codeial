const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');

app.use(express.urlencoded());

//telling to use the cookie parser
app.use(cookieParser());

app.use(express.static('./assets'));

// telling to use the express layouts
app.use(expressLayouts);

//extract scripts and styles from sub pages into the layout 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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