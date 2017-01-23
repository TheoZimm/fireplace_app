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
        // Catch error 500 and display the error page
    }).catch(err => {
        if (err[0].code == 89){
            err.status = 89;
            res.locals.message = err[0].message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.render('error');
        } else {
        err.status = 500;
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.render('error');
        }
    });
});

/* END ROUTES*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Votre requête n'existe pas ! ");
  err.status = 404;
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 404);
    res.render('error');

});

// catch 500 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error("Erreur interne");
    err.status = 500;
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.render('error');
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
