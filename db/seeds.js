const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Venue = require('../models/venue');
const venueData = require('./data/venues');
const User = require('../models/user');
const userData = require('./data/users');

mongoose.connect('mongodb://localhost/venues-database', (err, db) => {
  db.dropDatabase();

  Venue.create(venueData)
    .then(venues => {
      console.log(`${venues.length} venues created`);
      console.log(`${venues}`);
      return User.create(userData);
    })
    .then(users => console.log(`${users.length} users created`))
    .then(users => console.log(`${users}`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});

// mongoose.connect('mongodb://localhost/venues-database', (err, db) => {
//   db.dropDatabase();
//
//   Venue.create(venueData)
//     .then(venues => console.log(`${venues.length} venues created`))
//     .then(venues => console.log(`${venues}`)
//     // .catch(err => console.log(err))
//     // .finally(() => mongoose.connection.close());
//     return User.create(userData);
//   );
//     .then(users => console.log(`${users.length} users created`))
//     .then(users => console.log(`${users}`))
//     .catch(err => console.log(err))
//     .finally(() => mongoose.connection.close());
// });
