var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//aaaaaaaaaaa
var routes = require('./routes/index');
var users = require('./routes/users');

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
	if (req.body.Modi == 1) {
		client.query('update calendar set calendar_name=?, place=?, date=?, hour=?, min=?, reply=?, prealarm=?, sound=? where calendar_id=?',
			[req.body.Name, req.body.Place, req.body.date, req.body.Hour, req.body.Min, req.body.Reply, req.body.Prealarm, req.body.Sound, req.body.Id],
			function(err, rows, fields) {
    			if(err) {
    				res.json(
						{
							success : '0',
							message : 'fail',
							result : null
						}
					);
				} else {
					res.json(
						{
							success : '1',
							message : 'OK',
							result : null
						}
					);
				}
			}
		);
	} else {
		client.query('insert into calendar (link_id, calendar_name, place, date, hour, min, reply, prealarm, sound) values (1, ?, ?, ?, ?, ?, ?, ?, ?)', 
			[req.body.Name, req.body.Place, req.body.date, req.body.Hour, req.body.Min, req.body.Reply, req.body.Prealarm, req.body.Sound], 
			function(err, rows, fields) {
    			if(err) {
    				res.json(
						{
							success : '0',
							message : 'fail',
							result : null
						}
					);
				} else {
					res.json(
						{
							success : '1',
							message : 'OK',
							result : rows.insertId
						}
					);
				}
			}
		);
	}
});
app.post('/calendar/remove', function(req, res, next) {
	client.query('delete from calendar where calendar_id=?', req.body.Id, function(err, rows, fields) {
    			if(err) {
    				res.json(
						{
							success : '0',
							message : 'fail',
							result : null
						}
					);
			} else {
				res.json(
					{
						success : '1',
						message : 'OK',
						result : null
					}
				);
			}
		}
	);
});
app.post('/calendar/list', function(req, res, next) {
	if (req.body.Date == -1) {
		client.query('select * from calendar where DATE(date) between CURDATE() and ADDDATE(CURDATE(), INTERVAL 31 DAY)',
			function(err, rows, fields) {
    			if(err) {
    				res.json(
						{
							success : '0',
							message : 'fail',
							result : null
						}
					);
				} else {
					res.json(
						{
							success : '1',
							message : 'OK',
							result : rows
						}
					);
				}
			}
		);
	} else {
		client.query('select * from calendar where DATE(date)=?', req.body.Date, 
			function(err, rows, fields) {
    			if(err) {
    				res.json(
						{
							success : '0',
							message : 'fail',
							result : null
						}
					);
				} else {
					res.json(
						{
							success : '1',
							message : 'OK',
							result : rows
						}
					);
				}
			}
		);
	}
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
