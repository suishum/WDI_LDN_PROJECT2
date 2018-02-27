// Create an Express router
const router = require('express').Router();
const venues = require('../controllers/venues');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

// Request listeners
router.get('/', (req, res) => res.render('pages/home'));
router.get('/about', (req, res) => res.render('pages/about'));

router.route('/venues/new')
  .get(secureRoute, venues.new);

router.route('/venues')
  .get(venues.index)
  .post(secureRoute, venues.create);

router.route('/venues/:id')
  .get(venues.show)
  .put(secureRoute, venues.update)
  .delete(secureRoute, venues.delete);

router.route('/venues/:id/edit')
  .get(secureRoute, venues.edit);

router.route('/venues/:id/comments')
  .post(secureRoute, venues.commentsCreate);

router.route('/venues/:id/comments/:commentId')
  .delete(secureRoute, venues.commentsDelete);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/venues/:id/comments/:commentId/moderate')
  .patch(secureRoute, venues.commentsModerate);


// global error catcher, if someone tries to access a page that doesnt exist, the 404 views page will be shown
router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
