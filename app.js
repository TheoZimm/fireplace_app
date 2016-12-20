var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const pug = require('pug');
var index = require('./routes/index');

var app = express();

/* *Connexion avec Reddit API ***************************** */
const snoowrap = require('snoowrap');
const r = new snoowrap({
    userAgent: 'testing',
    clientId: 'ToYqw8wJljlhNw',
    clientSecret: 'QeVE0pf8qmjZml3No92Y1ZOafCM',
    refreshToken: '22315002-Y7qONUZDQyJEiiBz9Cxz8eQhMHg'
});
r.getUser('Muporgu').fetch().then(userInfo => {
    console.log('Reddit infos about the user Muporgu');
    console.log(userInfo.name); // 'not_an_aardvark'
    console.log(userInfo.created_utc); // 1419104352
});

/* ************ end reddit api test */





/* TWITTER API ********** */

var Twitter = require('twitter');

var twit = new Twitter({
    consumer_key: 'jDb4TBs5YDP1ajHrZkHFh8UkA',
    consumer_secret: 'dCE3kPUgj3tkSVCXd8vVzcx5QFcfYsEbwSKaLblug1lAUMU8VR',
    access_token_key: '2698722140-hRjY7ogTrYl3Xvf2jE0fOx56esRu4hNjGmoRwy7',
    access_token_secret: '8kjt0B1rVnx0yWjlFAZ7qtjvcLtcZ6aBN7gGpuMZ9Lv23'
});

// Get last tweet that contains "Eleague"
twit.get('search/tweets', {q: 'Eleague', count: 1}, function(error, tweets, response) {
    console.log('Last tweet about E league :')
    console.log(tweets);
});



/* ***END TWITTER TEST*************/



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
