const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the schema
const counterSchema = new Schema({
    month_counter: { type: Number },
    id: { type: String },
    date: { type: Date }
});

// Export the model
module.exports = mongoose.model('MonthCounter', counterSchema);