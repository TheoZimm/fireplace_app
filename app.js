const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const pug = require('pug');
const index = require('./routes/index');
const thenJade = require('then-jade');
const app = express();
let RFeedEntry = require('./RFeedEntry');
let TFeedEntry = require('./TFeedEntry');

// Define entries by feed
const limit = 5;
/* *Connexion avec Reddit API ***************************** */
const snoowrap = require('snoowrap');

/* Query will be defined by the user */
let query = "csgo";


let rFeed = [];
let tFeed = [];
/* REDDIT START  */
const r = new snoowrap({
    userAgent: 'testing',
    clientId: 'ToYqw8wJljlhNw',
    clientSecret: 'QeVE0pf8qmjZml3No92Y1ZOafCM',
    refreshToken: '22315002-Y7qONUZDQyJEiiBz9Cxz8eQhMHg'
});

/* get user nickname */

let rUsername = "";
r.getMe().name.then(function(data){
  rUsername = data;
  app.set('rUsername', rUsername);
});

/* Reddit custom request */

// Custom research
r.search({query: query, sort: 'top', limit: limit}).then(function(data){

    // Loop through the json

    data.forEach(function(Submission){

        /* For each entry create a new RFeedEntry object*/
        let rFeedEntry = new RFeedEntry(Submission.title, Submission.url, Submission.author.name);

        /* Push the entry to the object array rFeed */
        rFeed.push(rFeedEntry);
    })
    console.log("data from reddit");
    console.log(rFeed);

    // Send this array to the routes
    app.set('rFeed', rFeed);

})

/* END REDDIT */


/* TWITTER API ********** */

const Twitter = require('twitter');

const twit = new Twitter({
  consumer_key: 'jDb4TBs5YDP1ajHrZkHFh8UkA',
  consumer_secret: 'dCE3kPUgj3tkSVCXd8vVzcx5QFcfYsEbwSKaLblug1lAUMU8VR',
  access_token_key: '2698722140-hRjY7ogTrYl3Xvf2jE0fOx56esRu4hNjGmoRwy7',
  access_token_secret: '8kjt0B1rVnx0yWjlFAZ7qtjvcLtcZ6aBN7gGpuMZ9Lv23'
});

// Get the last 5 tweets that contains our query
twit.get('search/tweets', {q: query, count: limit}, function(error, tweets, response) {
    // Loop through the json
    for (let key in tweets.statuses){
        let tweet = tweets.statuses[key];
        /* For each entry create a new RFeedEntry object*/
        console.log(tweet);
        let tFeedEntry = new TFeedEntry(tweet.text, tweet.url, tweet.user.name);

        /* Push the entry to the object array rFeed */
        tFeed.push(tFeedEntry);
    }
    console.log("Data from twitter ");
    console.log(tFeed);

    // Send this array to the routes
    app.set('tFeed', tFeed);

});

// GET the username
let tUsername = "";
twit.get('account/verify_credentials', function(error, tweets, response) {
  tUsername = tweets['screen_name'];
  app.set('tUsername', tUsername);
});


/* END TWITTER */

/*Handle research request from the view */
app.get("/research", function(req,res){
    console.log(req.body);
    res.send('you searched for:' + req.body.research);
});

/* END RESEARCH*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
