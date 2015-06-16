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

/* GET users listing. */
router.get('/', function(req, res, next) {
	client.query('(select * from chatting where link_id=? order by date desc limit 30) order by date',req.body.LinkId, function(err, rows, fields) {
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
	});
});

module.exports = router;