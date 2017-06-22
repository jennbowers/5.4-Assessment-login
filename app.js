const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const parseurl = require('parseurl');

const app = express();

// fake user login data
var loginData = [
  {username: 'faith', password: 'puppies'}
  , {username: 'jenn', password: 'tiy'}
];

// view engine
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

// app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: 'keyboard cat'
  , resave: false
  , saveUnitialized: true
}));

// checking to see if they are logged in or not when going to '/', and if not, then re-direct them to the login page
app.use(function(req, res, next) {
  var pathname = parseurl(req).pathname;

  if (!req.session.user && pathname != '/login') {
    res.redirect('login');
  } else {
    next();
  }
});


// REQUESTS

// root page
app.get('/', function(req, res) {
  res.send('Thank you for logging in ' + req.session.user.username + '!');
});

app.get('/login', function(req, res) {
  res.render('login', {});
});

// login page, and what happens when they enter information into the form
app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // checking to see if username is valid
  var client = loginData.find(function(user) {
    return user.username == username;
  });

  // checking to see if password matches given username and stores it all in a session
  if (client && client.password == password) {
    req.session.user = client;
  }

  // now that we know they are on record and their password matches up AND we've stored it all in a session we can send it back to the broswer (stored in a cookie) and we tell the browser what to do

  // SO if all that above is true- username and password check out and we're getting that information confirmed via cookie... we redirect to the root page. BUT if it doesn't check out dun dun dun... we go back to the login page to try again.
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.redirect('login');
  }

});


app.listen(3000, function() {
  console.log('Successfully started express application!');
});
