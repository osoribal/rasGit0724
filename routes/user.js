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

router.post('/login', function(req, res, next) {
	var email = req.body.e_mail;
	var userPhone = req.body.phone_number;

	//check if a client is already join
	client.query('select * from USER where email = ?',[email], function(err, result, fields){
		if(err)
		{ 
			console.log("login select user fail : " + err)
			res.json(
			{
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{ 
			//not join
			if(result.length == 0)
			{

				client.query('insert into USER (email, phone_number, request) values (?, ?, ?) RETURNING user_id', [email, userPhone, 0], function(err, result, fields){
					if(err)
					{
						console.log("login insert fail : " + err);
						res.json(
						{
							success : '0',
							message : 'fail',
							result : null
						});
					}
					else
					{

						res.json({
							success : '1',
							message : 'JOIN_OK',
							result : result.rows[0].user_id
						});
					}
				});
			}
			else	//already join
			{ res.json(
				{
					success : '1',
					message : 'LOGIN_OK',
					result : null
				});
			}
		}
	});
});

router.post('/profile', function(req, res, next) {
	var userId = req.body.user_id;
	client.query('select * from USER where user_id = ?',[userId], function(err, result, fields){
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
	});
});

router.post('/uploadprofile', function(req, res, next) {
	var userId = req.body.user_id;
	var userName = req.body.user_name;
	var userPhone = req.body.user_phone;
	var userBirth = req.body.user_birth;
	var userProfileURL = req.body.user_profile_url;	

//update문으로 바꿀것.
	client.query('UPDATE USER SET user_name=?, phone_number=?, profile_pic_url=?, birthday=? WHERE user_id=?',
		[userName, userPhone, userProfileURL, userBirth, userId], function(err, result, fields){
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
	});
});

router.post('/dropout', function(req, res, next) {
	var userId = req.body.user_id;

	client.query('delete ',
		[userId, userName, userPhone, userProfileURL, userBirth], function(err, result, fields){
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
	});
});

module.exports = router;