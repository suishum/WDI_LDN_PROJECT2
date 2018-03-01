const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Venue = require('../models/venue');
let venueData = require('./data/venues');
const User = require('../models/user');
const userData = require('./data/users');
const Category = require('../models/category');
const categoryData = require('./data/categories');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/venues-database', (err, db) => {
  db.dropDatabase();

  Category.create(categoryData)
    // loop through each category
    .then(categories => {
      // and map the venue data by looping through each venue
      venueData = venueData.map(venue => {
        // replace the venue.category field with the object (from categories) where the venue.category matches the category.name
        venue.category = categories.find(category => venue.category === category.name);
        // return the findings and put them back into venue.
        return venue;
      });
      return Venue.create(venueData);
    })
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
