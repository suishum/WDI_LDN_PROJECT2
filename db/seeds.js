const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Venue = require('../models/venue');
const venueData = require('./data/venues');

mongoose.connect('mongodb://localhost/venues-database', (err, db) => {
  db.dropDatabase();
  Venue.create(venueData)
    .then(venues => console.log(`${venues.length} venues created`))
    .then(venues => console.log(`${venues}`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
