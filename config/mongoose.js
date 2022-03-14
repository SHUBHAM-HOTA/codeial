const mongoose = require('mongoose');

//to set up the environment
const env = require('./environment');

//mongoose.connect('mongodb://localhost/codeial_development');
mongoose.connect(`mongodb://localhost/${env.db}`);
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongodb"));

db.once('open',function(){
    console.log('connected to the database:: Mongodb')
});

module.exports = db;