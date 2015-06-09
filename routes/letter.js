var express = require('express');
var router = express.Router();

//mysql
var mysql = require('mysql');

//db
var client = mysql.createConnection({
	user : 'root',
	password : '123qwe'
});

client.query('USE App');

router.post('/letterlist', function(req, res, next) {
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
	
router.post('/readletter', function(req, res, next) {
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
router.post('/writeletter', function(req, res, next) {
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
router.post('/deleteletter', function(req, res, next) {
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

module.exports = router;