var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/user/login', function(req, res, next) {
	res.send('/user/login sending complete');
});
app.post('/link/findpartner', function(req, res, next) {
	res.send('/link/findpartner sending complete');
});
app.post('/link/request', function(req, res, next) {
	res.send('/link/request sending complete');
});
app.post('/link/reply', function(req, res, next) {
	res.send('/link/reply sending complete');
});
app.post('/letter/letterlist', function(req, res, next) {
	res.send('/letter/letterlist sending complete');
});
app.post('/letter/readletter', function(req, res, next) {
	res.send('/letter/readletter sending complete');
});
app.post('/letter/writeletter', function(req, res, next) {
	res.send('/letter/writeletter sending complete');
});
app.post('/letter/deleteletter', function(req, res, next) {
	res.send('/letter/deleteletter sending complete');
});
app.post('/calendar/add', function(req, res, next) {
	var mode = req.param.Modi;
	console.log(mode);
	res.send(mode);
});
app.post('/calendar/remove', function(req, res, next) {
	res.send('/calendar/remove sending complete');
});
app.post('/calendar/list', function(req, res, next) {
	res.send('/calendar/list sending complete');
});
app.get('/chatting', function(req, res, next) {
	res.send('/chatting sending complete');
});
app.post('/user/profile', function(req, res, next) {
	res.send('/user/profile sending complete');
});
app.post('/user/uploadprofile', function(req, res, next) {
	res.send('/user/uploadprofile sending complete');
});
app.get('/notice', function(req, res, next) {
	res.send('/notice sending complete');
});
app.post('/user/dropout', function(req, res, next) {
	res.send('/user/dropout sending complete');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
