const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');

const app = express();

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

// app.use(express.static(path.join(__dirname, 'client')));


app.get('/', (req, res) => {
    let ip_address = req.ip;
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
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on a port of ${PORT}`);
});
