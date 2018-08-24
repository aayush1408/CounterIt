const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the schema
const counterSchema = new Schema({
    unique_counter: { type: Number, default: 0 },
});

// Export the model
module.exports = mongoose.model('UniqueCounter', counterSchema);