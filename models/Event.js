const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Event ka naam
  datetime: { type: Date, required: true }, // Kab hona hai event
  location: { type: String, required: true }, // Location ka detail
  capacity: { type: Number, required: true, max: 1000 }, // Max 1000 log allowed
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Registered users ka reference
});

module.exports = mongoose.model('Event', eventSchema);
