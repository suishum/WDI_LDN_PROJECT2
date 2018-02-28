const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true }
});

// can only be used on categories
schema.virtual('capTitle')
  .get(function getTitle() {
    return this.name.charAt(0).toUpperCase() + this.name.slice(1);
  });

module.exports = mongoose.model('Category', schema);
