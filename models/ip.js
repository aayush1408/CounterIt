const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the schema
const ipSchema = new Schema({
    ip: String,
});

// Export the model
module.exports = mongoose.model('Ip', ipSchema);