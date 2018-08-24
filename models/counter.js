const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the schema
const counterSchema = new Schema({
    counter_day: { type: Number, default: 0 },
});

// Export the model
module.exports = mongoose.model('Counter', counterSchema);