const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res, next) {
  if (!req.body.profile) req.body.profile = 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg';

  User.create(req.body)
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.redirect('/login');
      }
      // store the logged in user's ID into the session cookie
      req.session.userId = user._id;
      // flash message
      req.flash('success', `Welcome ${user.username}!`);
      res.redirect('/venues');
    })
    .catch(next);
  // req.flash('success', 'Account successfully created! You can now log in.');
}

module.exports = {
  new: newRoute,
  create: createRoute
};
