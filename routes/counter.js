const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Models
const Counter = require('../models/counter');
const UniqueCounter = require('../models/unique_counter');
const MonthCounter = require('../models/month_counter');
const UniqueMonthCounter = require('../models/unique_month_counter');

// Dispaly the data in counter collections
router.get('/', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
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
                    res.render('counter', { final: final });
                });
            });
        });
    });
});

module.exports = router;