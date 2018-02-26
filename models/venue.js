const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  openingHours: [{
    seasons: { type: String },
    monday: { type: Array, 'default': [], required: true },
    tuesday: { type: Array, 'default': [], required: true },
    wednesday: { type: Array, 'default': [], required: true },
    thursday: { type: Array, 'default': [], required: true },
    friday: { type: Array, 'default': [], required: true },
    saturday: { type: Array, 'default': [], required: true },
    sunday: { type: Array, 'default': [], required: true }
  }],
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  postCode: { type: String, required: true },
  phone: { type: String },
  map: [{
    lat: { type: Number },
    lng: { type: Number }
  }],
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  website: { type: String }
});

module.exports = mongoose.model('Venue', schema);
