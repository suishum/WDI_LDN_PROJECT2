// add secureRoute to the pages you DO NOT want a unauthenticated user to see (limit access to these routes)
function secureRoute(req, res, next) {
  // check if the user is not logged in
  if(!req.session.userId) {
    // .regenerate clears the session cookie
    return req.session.regenerate(() => {
      // we use danger here cos its a bulma class
      req.flash('danger', 'You must be logged in to do that.');
      res.redirect('/login');
    });
  }
  next();
}

module.exports = secureRoute;
