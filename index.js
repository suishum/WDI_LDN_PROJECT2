// ========================
// THIRD PARTY DEPENDANCIES
// ========================
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const router = require('./config/router');
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

// Tell Express to use the router
app.use(router);

// Start the app listening out for incoming connections with a console.log
app.listen(PORT, () => console.log(`Up and running on port: ${PORT}`));
