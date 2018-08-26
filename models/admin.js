const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the schema
const adminSchema = new Schema({
    username: { type: String },
    password: { type: String },

});

// Export the model
module.exports = mongoose.model('Admin', adminSchema);