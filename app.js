const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const LIMIT = 5;
const twitterService = require('./services/TwitterService');
const redditService = require('./services/RedditService');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* ROUTES */

app.get('/', function (req, res) {
    res.redirect('/search?q=csgo');
    // res.render(
    //     'index',
    //     {title:'FirePlace', rUsername:rUsername, tUsername:tUsername, rFeed:rFeed, tFeed:tFeed}
    // )
});

app.get('/search', function (req, res) {
    console.log(req.query.q);
    let search = req.query.q;
    let count = req.query.count || LIMIT;

    Promise.all([
        twitterService.me(),
        redditService.me(),
        twitterService.get(search, count),
        redditService.get(search, count),

        // then assignate k -> v
    ]).then(([tUsername, rUsername, tFeed, rFeed]) => {
        res.render('index',{ tUsername, rUsername, tFeed, rFeed, search });
    }).catch(err => {
        res.status(500).json({
            code: 500,
            message: err.message,
        });
    });
});

/* END ROUTES*/

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
