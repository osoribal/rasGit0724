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



//find partner -> if there is partner
//set user and partner request = user_id
router.post('/findpartner', function(req, res, next) {
	console.log('recv data : ',req.body);
	var partnerMail = req.body.partner_mail;
	var userId = req.body.user_id;
	//find partner
	client.query('select user_id from USER where email = ?',[partnerMail], function(err, PFresult, fields){
		if(err)
		{ 
			res.json({
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{ 
			console.log(PFresult);
			//find partner success
			if(PFresult != 0)
			{
				console.log(PFresult);
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
									result : userId
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

router.post('/reply', function(req, res, next) {
	var userId = req.body.user_id;	//reply person
	var reply = req.body.user_reply;	//reply
	var requestId = req.body.request_id;	//request person
	if(reply == 'yes')
	{// link two people.
		//set partner person : partner_id = my_id
		client.query('update USER set partner_id = ? where user_id = ?',[userId, requestId], function(err, result, fields){
			if(err)
			{
				res.json(
					{
						success : '0',
						message : 'set_partner_fail',
						result : null
					});
			}else
			{
				//set reply person : partner_id = request_id
				client.query('update USER set partner_id = ? where user_id = ?', [requestId, userId], function(err, result, fields){
					if(err)
					{
						res.json(
							{
								success : '0',
								message : 'set_me_fail',
								result : null
							});
					}else
					{
						//link success
						client.query('insert into LINK (user1, user2) values (?, ?)', [userId, requestId], function(err, result, fields){
							if(err)
							{
								res.json(
									{
										success : '0',
										message : 'link_fail',
										result : null
									});
							}else
							{
								res.json(
									{
										success : '1',
										message : 'link_success',
										result : result.insertId
									});
							}
						});

					}
				});
			}
		});

	}
	else
	{

	}
});


module.exports = router;