const Venue = require('../models/venue');
const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

const times = [
  'CLOSED',
  '07:00AM',
  '07:30AM',
  '08:00AM',
  '08:30AM',
  '09:00AM',
  '09:30AM',
  '10:00AM',
  '10:30AM',
  '11:00AM',
  '11:30AM',
  '12:00PM',
  '12:30PM',
  '01:00PM',
  '01:30PM',
  '02:00PM',
  '02:30PM',
  '03:00PM',
  '03:30PM',
  '04:00PM',
  '04:30PM',
  '05:00PM',
  '05:30PM',
  '06:00PM',
  '06:30PM',
  '07:00PM',
  '07:30PM',
  '08:00PM',
  '08:30PM',
  '09:00PM',
  '09:30PM',
  '10:00PM',
  '10:30PM',
  '11:00PM',
  '11:30PM',
  '12:00AM',
  '12:30AM',
  '01:00AM',
  '01:30AM',
  '02:00AM',
  '02:30AM',
  '03:00AM'
];

function indexRoute(req, res) {
  Venue.find()
    .then(venues => res.render('venues/index', { venues }));
}

// newRoute - get - /venues/new
function newRoute(req, res) {
  res.render('venues/new', { days });
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
      res.render('venues/show', { venue, days, times });
    })
    .catch(next);
}

// editRoute - get - /venues/:id/edit
function editRoute(req, res) {
  Venue.findById(req.params.id)
    .then(venue => res.render('venues/edit', { venue, days, times }));
}

// updateRoute - patch/put - /venues/:id
function updateRoute(req, res) {
  Venue.findById(req.params.id)
    .then(venue => Object.assign(venue, req.body))
    .then(venue => venue.save())
    .then(() => res.redirect(`/venues/${req.params.id}`));
}

// deleteRoute - delete - /venues/:id
function deleteRoute(req, res) {
  Venue.findById(req.params.id)
    .then(venue => venue.remove())
    .then(() => res.redirect('/venues'));
}

function commentsCreateRoute(req, res, next) {
  req.body.user = req.currentUser;

  Venue.findById(req.params.id)
    .then(venue => {
      venue.comments.push(req.body);
      return venue.save();
    })
    .then(venue => res.redirect(`/venues/${venue._id}`))
    .catch(next);
}

function commentsDeleteRoute(req, res, next) {
  Venue.findById(req.params.id)
    .then(venue => {
      const comment = venue.comments.id(req.params.commentId);
      comment.remove();
      return venue.save();
    })
    .then(venue => res.redirect(`/venues/${venue._id}`))
    .catch(next);
}

function commentsModerate(req, res, next) {
  if(!req.currentUser.isAdmin){
    req.flash('danger', 'You do not have permission to moderate');
    return res.redirect(`/venues/${req.params.id}`);
  }

  Venue.findById(req.params.id)
    .then(venue => {
      const comment = venue.comments.id(req.params.commentId);
      comment.isModerated = true;
      return venue.save();
    })
    .then(venue => res.redirect(`/venues/${venue._id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentsCreate: commentsCreateRoute,
  commentsDelete: commentsDeleteRoute,
  commentsModerate: commentsModerate
};
