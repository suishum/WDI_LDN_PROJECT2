const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}, // foreign key from 'User' schema
  isModerated: { type: Boolean, default: false }
});

commentSchema.methods.isOwnedBy = function(user) {
  return this.user && user._id.equals(this.user._id);
};

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  openingHours: {
    seasons: { type: String },
    monday: { type: Array, 'default': [], required: true },
    tuesday: { type: Array, 'default': [], required: true },
    wednesday: { type: Array, 'default': [], required: true },
    thursday: { type: Array, 'default': [], required: true },
    friday: { type: Array, 'default': [], required: true },
    saturday: { type: Array, 'default': [], required: true },
    sunday: { type: Array, 'default': [], required: true }
  },
  phone: { type: String },
  location: { type: String, required: true },
  // addressLine2: { type: String },
  // city: { type: String, required: true },
  postCode: { type: String },
  map: {
    lat: { type: Number },
    lng: { type: Number }
  },
  // category: { type: String, required: true },
  category: { type: mongoose.Schema.ObjectId, ref: 'Category'},
  description: { type: String },
  image: { type: String },
  website: { type: String },
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Venue', schema);
