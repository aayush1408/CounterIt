const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the schema
const counterSchema = new Schema({
    counter: { type: Number },
    id: { type: String }
});

// Export the model
module.exports = mongoose.model('Counter', counterSchema);