const Venue = require('../models/venue');

function indexRoute(req, res) {
  Venue.find()
    .then(venues => res.render('venues/index', { venues }));
}

// newRoute - get - /venues/new
function newRoute(req, res) {
  res.render('venues/new');
}

// createRoute - post - /venues
function createRoute(req, res, next) {
  console.log(req.body);
  Venue.create(req.body)
    .then(() => res.redirect('/venues'))
    .catch(next);
}

function showRoute(req, res, next) {
  Venue.findById(req.params.id)
    .populate('comments.user')
    .then(venue => {
      if(!venue) return res.render('pages/404');
      res.render('venues/show', { venue });
    })
    .catch(next);
}

// editRoute - get - /venues/:id/edit
function editRoute(req, res) {
  Venue.findById(req.params.id)
    .then(venue => res.render('venues/edit', { venue }));
}
// updateRoute - patch/put - /venues/:id
// deleteRoute - delete - /venues/:id

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute
};
