//mysql
var mysql = require('mysql');

//db
var client = mysql.createConnection({
	user : 'root',
	password : '123qwe'
});

client.query('USE App');


exports.add = function(req,res){
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
}
exports.remove = function(req,res){
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
}

exports.list = function(req,res){
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
}
