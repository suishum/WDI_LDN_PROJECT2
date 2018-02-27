const User = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/new');
}

function createRoute(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.redirect('/login');
      }
      // store the logged in user's ID into the session cookie
      req.session.userId = user._id;
      // flash message
      req.flash('success', `Welcome back ${user.username}!`);
      res.redirect('/venues');
    })
    .catch(next);
}

function deleteRoute(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
