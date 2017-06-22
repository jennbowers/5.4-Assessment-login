const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');
var session = require('express-session');
var parseurl = require('parseurl');

const app = express();

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



app.listen(3000, function() {
  console.log('Successfully started express application!');
});
