const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const ejs = require('ejs');

// Instantiate express
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'ejs');

// Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to Database
const mongoURI = `mongodb://${config.username}:${config.password}@ds125372.mlab.com:25372/${config.database}`;
mongoose.connect(mongoURI)
mongoose.connection.once('open', () => {
    console.log('Connected to db');
})

// Import Admin mode;
const Admin = require('./models/admin');


app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


// Setup passport
passport.use(new Strategy(
    function (username, password, cb) {
        Admin.findOne({ username: username }, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));

// serialize admin 
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

// Deserialize admin
passport.deserializeUser(function (id, cb) {
    Admin.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});


// Import routes
const welcome = require('./routes/welcome');
const counter = require('./routes/counter');
const login = require('./routes/login');
const logout = require('./routes/logout');

app.use('/', welcome);
app.use('/counter', counter);
app.use('/login', login);
app.use('/logout', logout);


// Serve port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on a port of ${PORT}`);
});
