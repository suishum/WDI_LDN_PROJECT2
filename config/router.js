// Create an Express router
const router = require('express').Router();
const venues = require('../controllers/venues');

// Request listeners
router.get('/', (req, res) => res.render('pages/home'));
router.get('/about', (req, res) => res.render('pages/about'));

router.route('/venues/new')
  .get(venues.new);

router.route('/venues')
  .get(venues.index)
  .post(venues.create);

router.route('/venues/:id')
  .get(venues.show);

// showRoute - get - /venues/:id
// editRoute - get - /venues/:id/edit
// updateRoute - patch/put - /venues/:id
// deleteRoute - delete - /venues/:id

module.exports = router;
