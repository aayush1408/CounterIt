const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

// Models
const Counter = require('./models/counter');
const UniqueCounter = require('./models/unique_counter');
const MonthCounter = require('./models/month_counter');
const UniqueMonthCounter = require('./models/unique_month_counter');

const mongoURI = `mongodb://${config.username}:${config.password}@ds125372.mlab.com:25372/counter1408`;
mongoose.connect(mongoURI)
mongoose.connection.once('open', () => {
    console.log('Connected to db');
});

let new_counter = new Counter({ counter: 0, id: '1', date: new Date() });
let new_unique_counter = new UniqueCounter({ unique_counter: 0, id: '1' });
let new_month_counter = new MonthCounter({ month_counter: 0, id: '1', date: new Date() });
let new_unique_month_counter = new UniqueMonthCounter({ unique_month_counter: 0, id: '1' });

new_counter.save((err, data) => {
    if (err) throw err;
    console.log(data)
});
new_unique_counter.save((err, data) => {
    if (err) throw err;
    console.log(data)
});
new_month_counter.save((err, data) => {
    if (err) throw err;
    console.log(data)
});
new_unique_month_counter.save((err, data) => {
    if (err) throw err;
    console.log(data)
});
