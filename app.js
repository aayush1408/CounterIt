const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

// Models
const Counter = require('./models/counter');
const UniqueCounter = require('./models/unique_counter');
const MonthCounter = require('./models/month_counter');
const UniqueMonthCounter = require('./models/unique_month_counter');

const app = express();

const mongoURI = `mongodb://${config.username}:${config.password}@ds125372.mlab.com:25372/counter1408`;
mongoose.connect(mongoURI)
mongoose.connection.once('open', () => {
    console.log('Connected to db');
})

app.use(express.static(path.join(__dirname, 'client')));

setInterval(function () {
    // set the counter_day to 0 
}, 24 * 60 * 60 * 1000)

setInterval(function () {
    // set the counter_month to 0 
}, 24 * 60 * 60 * 1000 * 30)

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
    let currentDate = new Date();
    // is unique (request.connection.remoteAddress !== ip)
    //  true 
    //  update the unique_counter'by one and add the ip to the database
    // else
    // update the counter only
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on a port of ${PORT}`);
});
