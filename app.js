var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//aaaaaaaaaaa
var routes = require('./routes/index');
var cal = require('./routes/cal');
var chatting = require('./routes/chatting');

//mysql
var mysql = require('mysql');

//db
var client = mysql.createConnection({
	user : 'root',
	password : '123qwe'
});

client.query('USE App');

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
	var linkId = req.body.link_id;
	client.query('select * from letter where link_id = ?',[linkId], function(err, result, fields){
		if(err)
		{ res.json(
			{
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{ res.json(
			{
				success : '1',
				message : 'OK',
				result : result
			});
		}
	})
});
	
app.post('/letter/readletter', function(req, res, next) {
	var letterId = req.body.letter_id;
	client.query('select * from letter where letter_id = ?',[letterId], function(err, result, fields){
		if(err)
		{ res.json(
			{
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{ res.json(
			{
				success : '1',
				message : 'OK',
				result : result
			});
		}
	})
});
app.post('/letter/writeletter', function(req, res, next) {
	var linkId = req.body.link_id;
	var senderId = req.body.user_id;
	var letterContent = req.body.letter_content;
	var letterDate = req.body.date;
	client.query('insert into letter (link_id, sender_id, content, date) value (?, ?, ?, ?)',[linkId, senderId, letterContent, letterDate], function(err, result, fields){
		if(err)
		{ res.json(
			{
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{ res.json(
			{
				success : '1',
				message : 'OK',
				result : null
			});
		}
	})
});
app.post('/letter/deleteletter', function(req, res, next) {
	var letterId = req.body.letter_id;
	client.query('delete from letter where letter_id = ?',[letterId], function(err, result, fields){
		if(err)
		{ res.json(
			{
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{ res.json(
			{
				success : '1',
				message : 'OK',
				result : null
			});
		}
	})
});
app.use('/calendar', cal);
app.use('/chatting', chatting);

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