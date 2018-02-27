// ========================
// THIRD PARTY DEPENDANCIES
// ========================
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const router = require('./config/router');
const session = require('express-session');
const flash = require('express-flash');
const userAuth = require('./lib/userAuth');
// Create the app by invoking the Express module.
const app = express();
// Set port variable
const PORT = 8000;
// Connect to DB
mongoose.connect('mongodb://localhost/venues-database');

// Configure Express to use EJS
app.set('view engine', 'ejs');
// Tell express to look for your template files in the views folder
app.set('views', `${__dirname}/views`);
// Use Express layouts
app.use(expressLayouts);

// Tell express to look in the public folder for static files
app.use(express.static(`${__dirname}/public`));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// method override must go after bodyParser
app.use(methodOverride(req => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// set up session cookies
app.use(session({
  secret: 'GysHa^72u91sk0P(', // a random key used to encrypt the session cookie, session secret
  resave: false,
  saveUninitialized: false
}));

//set up flash messages, must be AFTER express-session
app.use(flash());

app.use(userAuth);

// Tell Express to use the router
app.use(router);

app.use((err, req, res, next) => { // eslint-disable-line
  console.log(err); //display error in terminal
  if(err.name === 'ValidationError') return res.render('pages/422');
  res.render('pages/500', { err });
});

// Start the app listening out for incoming connections with a console.log
app.listen(PORT, () => console.log(`Up and running on port: ${PORT}`));
