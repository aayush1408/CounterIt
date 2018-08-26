const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Models
const Counter = require('../models/counter');
const UniqueCounter = require('../models/unique_counter');
const MonthCounter = require('../models/month_counter');
const UniqueMonthCounter = require('../models/unique_month_counter');
const Ip = require('../models/ip');

// Welcome page
router.get('/', (req, res) => {
    let ip_address = req.ip;
    let date = new Date();
    let current_date = date.getDate();
    let current_month = date.getMonth();
    Counter.findOne({ id: 1 }).then((data) => {
        console.log(data.date.getDate());
        // check whether the data has changed or not
        if (current_date - data.date.getDate() !== 0) {
            Counter.updateOne({ id: 1 }, { $set: { date: date } }).then((data) => {
                console.log('Updated date', date)
            })
        }
    })
    MonthCounter.findOne({ id: 1 }).then((data) => {
        console.log(data.date.getMonth());
        // check whether the month has changed, if yes than update it to 1
        if (current_month - data.date.getMonth() !== 0) {
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
            //  update the unique_counter by one and add the ip to the database
            UniqueCounter.updateOne({ id: 1 }, { $inc: { unique_counter: 1 } }).then((data) => {
                console.log('Updatded unique data', data);
            });
            UniqueMonthCounter.updateOne({ id: 1 }, { $inc: { unique_month_counter: 1 } }).then((data) => {
                console.log('Updatded unique month data', data);
            });
            Counter.update({ id: 1 }, { $inc: { counter: 1 } }).then((data) => {
                console.log('Updatded data', data);
            });
            MonthCounter.update({ id: 1 }, { $inc: { month_counter: 1 } }).then((data) => {
                console.log('Updatded data', data);
            });
            let new_ip = new Ip({ ip: ip_address });
            new_ip.save((err, data) => {
                if (err) throw err;
                res.send(data);
            });
        }
    });
    res.render('welcome')
});

module.exports = router;