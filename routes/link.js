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



router.post('/findpartner', function(req, res, next) {
	var partnerMail = req.body.partner_mail;
	var userId = req.body.user_id;
	client.query('select user_id from USER where email = ?',[partnerMail], function(err, result, fields){
		if(err)
		{ res.json(
			{
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{ 	//find partner success
			if(result == 0)
			{
				//set my request state
				client.query('update USER set request = ? where user_id = ?', [userId, userId], function(err, result, fields){
					if(err)
					{
						res.json(
						{
							success : '0',
							message : 'fail',
							result : null
						});
					}
					else
					{
						client.query('update USER set request = ? where email = ?', [userId, partnerMail], function(err, result, fields){
							if(err)
							{
								res.json(
								{
									success : '0',
									message : 'set_partner_fail',
									result : null
								});
							}
							else
							{
								res.json(
								{
									success : '1',
									message : 'OK',
									result : null
								});	
							}
						});
					}
				});
			}//find partner fail
			else
			{
				res.json(
				{
					success : '1',
					message : 'no',
					result : null
				});
			}
		}
	})
});

//request link to partner
router.post('/linkreq', function(req, res, next) {
	var partnerMail = req.body.partner_mail;
	client.query('update USER set request = 1 where email = ?',[partnerMail], function(err, result, fields){
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

//check link request for me
router.post('/checkreq', function(req, res, next) {
	var userId = req.body.user_id;
	client.query('select request from USER where user_id = ?',[userId], function(err, result, fields){
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

router.post('/link/reply', function(req, res, next) {
	var userId = req.body.user_id;
	client.query('select request from USER where user_id = ?',[userId], function(err, result, fields){
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


module.exports = router;