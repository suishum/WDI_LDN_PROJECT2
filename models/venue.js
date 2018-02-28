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
  name: { type: String, required: true, minlength: 2 },
  openingHours: {
    seasons: { type: String, required: true },
    monday: { type: Array, 'default': [], required: true },
    tuesday: { type: Array, 'default': [], required: true },
    wednesday: { type: Array, 'default': [], required: true },
    thursday: { type: Array, 'default': [], required: true },
    friday: { type: Array, 'default': [], required: true },
    saturday: { type: Array, 'default': [], required: true },
    sunday: { type: Array, 'default': [], required: true }
  },
  phone: { type: String, minlength: 2 },
  location: { type: String, required: true, minlength: 2 },
  // addressLine2: { type: String },
  // city: { type: String, required: true },
  postCode: { type: String, required: true },
  map: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  // category: { type: String, required: true },
  category: { type: mongoose.Schema.ObjectId, ref: 'Category'},
  description: { type: String },
  image: { type: String, pattern: 'https?://.+' },
  website: { type: String, pattern: 'https?://.+' },
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Venue', schema);
