const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');


// userd for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// const MongoStore = require('connect-mongo')(session) this line is shown in the video but 
//its for older version so we need to remove the session from here and add mongourl like below line
//mongoUrl:'mongodb://localhost:27017/codeial_development',
const MongoStore = require('connect-mongo');

//used for sass
const sassMiddleware = require('node-sass-middleware');

//used for flash massages
const flash = require('connect-flash');

const customMware = require('./config/middleware')

//setting up the chat server to be used with socket.io 
//we will pass this chat server(the below one) to the chat soket file
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is runnning on port: 5000')

//for resolving has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource
//also added app.use line and one line in chat_socket to resolve the issue
const cors = require('cors');

//to set path for environment 
const path = require('path');

//we need to put some settings in sass
if(env.name == 'development'){
    app.use(sassMiddleware({
        //sourse is the source where to pick up the scss files to convert into css
        //src:'./assets/scss',
        src: path.join(__dirname, env.asset_path, 'scss'),
        //destination where do i need to put my css files
        //dest:'./assets/css',
        dest: path.join(__dirname, env.asset_path, 'css'),
        //do you want to show if there is any error that is not converted 
        //set it to false when running in the producntion mode
        debug:true,
        //we want in to be in multiple lines
        outputStyle:'extended',
        //we are using the middleware so where the server should look for the css files
        prefix:'/css'
    }));
}



app.use(express.urlencoded());

//telling to use the cookie parser
app.use(cookieParser());
app.use(cors());
app.use(express.static(env.asset_path));

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// telling to use the express layouts
app.use(expressLayouts);

//extract scripts and styles from sub pages into the layout 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');



// mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    //saveUninitialized is false becuase when the user in not logged in then we dont want
    //to save the extra data on the session cookie.
    saveUninitialized: false,
    //when the user is logged in then we dont want to change the data in the session cookie
    //that is why the resave is set to false
    resave:false,
    // telling the time in milliseconds
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore(
        {
        mongoUrl:'mongodb://localhost:27017/codeial_development',
        //mongooseConnection: db, this line was needed in older version
        autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect mongodb setup ok');
        }
    ) 
}));

// telling the app to use passsport and session
app.use(passport.initialize());
app.use(passport.session());

// this will go to passport-local-strategy and check if the user is signed in or not
//this will act as a middilewere 
//so that the user is acceseble in the views
app.use(passport.setAuthenticatedUser);

//this is for the flash and we need to place this after the session because this uses session cookies
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'))


app.listen(port,function(err){
    if(err){
        // here new menthod is used to write err in between string the key before 1 is used here
        // this method is called interpolation
        // this evaluetes the word inside the bracket after doller like ${2+2} will be 3
        console.log(`Error in running the server:,${err}`);
    }
    console.log(`server is running on port: ${port}`);
});