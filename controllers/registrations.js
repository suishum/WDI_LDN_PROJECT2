const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res, next) {
  User.create(req.body)
    .then(() => res.redirect('/venues'))
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute
};
