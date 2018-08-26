const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const ejs = require('ejs');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'ejs');

// Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const mongoURI = `mongodb://${config.username}:${config.password}@ds125372.mlab.com:25372/counter1408`;
mongoose.connect(mongoURI)
mongoose.connection.once('open', () => {
    console.log('Connected to db');
})

// Models
const Counter = require('./models/counter');
const UniqueCounter = require('./models/unique_counter');
const MonthCounter = require('./models/month_counter');
const UniqueMonthCounter = require('./models/unique_month_counter');
const Ip = require('./models/ip');
const Admin = require('./models/admin');

passport.use(new Strategy(
    function (username, password, cb) {
        Admin.findOne({ username: username }, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    Admin.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

// Welcome page
app.get('/', (req, res) => {
    let ip_address = req.ip;
    let date = new Date();
    let current_date = date.getDate();
    let current_month = date.getMonth();
    Counter.findOne({ id: 1 }).then((data) => {
        console.log(data.date.getDate());
        if (current_date - data.date.getDate() != 0) {
            Counter.updateOne({ id: 1 }, { $set: { date: date } }).then((data) => {
                console.log('Updated date', date)
            })
        }
    })
    MonthCounter.findOne({ id: 1 }).then((data) => {
        console.log(data.date.getMonth());
        if (current_month > data.date.getMonth()) {
            MonthCounter.updateOne({ id: 1 }, { $set: { date: date } }).then((data) => {
                console.log('Updated data', data);
            })
        }
    })
    console.log(current_date);
    console.log(current_month);
    Ip.findOne({ ip: ip_address }, (err, data) => {
        if (data) {
            Counter.update({ id: 1 }, { $inc: { counter: 1 } }).then((data) => {
                console.log('Updatded data', data);
            })
            MonthCounter.update({ id: 1 }, { $inc: { month_counter: 1 } }).then((data) => {
                console.log('Updatded data', data);
            })
        }
        else {
            //  update the unique_counter'by one and add the ip to the database
            UniqueCounter.updateOne({ id: 1 }, { $inc: { unique_counter: 1 } }).then((data) => {
                console.log('Updatded unique data', data);
            });
            UniqueMonthCounter.updateOne({ id: 1 }, { $inc: { unique_month_counter: 1 } }).then((data) => {
                console.log('Updatded unique month data', data);
            })
            Counter.update({ id: 1 }, { $inc: { counter: 1 } }).then((data) => {
                console.log('Updatded data', data);
            })
            MonthCounter.update({ id: 1 }, { $inc: { month_counter: 1 } }).then((data) => {
                console.log('Updatded data', data);
            })
            let new_ip = new Ip({ ip: ip_address });
            new_ip.save((err, data) => {
                if (err) throw err;
                res.send(data);
            })
        }
    });
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/counter', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    let final = { counter: '', month_counter: '', unique_counter: '', unique_month_counter: '' };
    Counter.findOne({ id: 1 }, (err, data) => {
        if (err) throw err;
        final.counter = data.counter;
        MonthCounter.findOne({ id: 1 }, (err, data) => {
            if (err) throw err;
            final.month_counter = data.month_counter;
            UniqueCounter.findOne({ id: 1 }, (err, data) => {
                if (err) throw err;
                final.unique_counter = data.unique_counter;
                UniqueMonthCounter.findOne({ id: 1 }, (err, data) => {
                    if (err) throw err;
                    final.unique_month_counter = data.unique_month_counter;
                    res.render('index', { final: final });
                });
            });
        });
    });
});
app.get('/login',
    function (req, res) {
        res.render('login');
    });

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/counter');
    });

app.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/login');
    });


// Serve port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on a port of ${PORT}`);
});
