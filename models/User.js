const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User ka naam
  email: { type: String, required: true, unique: true } // Email unique honi chahiye
});

module.exports = mongoose.model('User', userSchema);
