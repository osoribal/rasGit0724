var express = require('express');
var router = express.Router();

//mysql
var mysql = require('mysql');

//file
var fs = require('fs');

//db
var client = mysql.createConnection({
	user : 'root',
	password : '123qwe'
});

client.query('USE App');

router.post('/login', function(req, res, next) {
	var email = req.body.e_mail;
	var userPhone = req.body.phone_number;

	console.log(email + " " + userPhone + "is received");
	//check if a client is already join
	client.query('select * from USER where email = ?',[email], function(err, Uresult, fields){
		if(err)
		{ 
			console.log("login select user fail : " + err)
			res.json(
			{
				success : '0',
				message : 'login_fail',
				result : null
			});
		}
		else
		{ 
			console.log(Uresult);
			console.log(Uresult.length);
			//not join
			if(Uresult == 0)
			{
				console.log(email + " " + userPhone);


				client.query('insert into USER (email, phone_number, request) values (?, ?, ?)', [email, userPhone, '0'], function(err, Iresult, fields){
					if(err)
					{
						console.log("login insert fail : " + err);
						res.json(
						{
							success : '0',
							message : 'join_fail',
							result : null
						});
					}
					else
					{ res.json(
						{
							success : '1',
							message : 'JOIN_OK',
							result : Iresult.insertId
						});
						
					}
				});
			}
			else	//already join
			{ res.json(
				{
					success : '1',
					message : 'LOGIN_OK',
					result : Uresult
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

//	fs.readFile(req.files.userProfileURL.path, function(err, data)){
//		fs.writeFile(filePath, data, function(err){
//			if(err)
//			{ throw err; }
//			else
//			{ res.redirect("bakc"); }
//		});
//
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

	//initial partner informaiton
	client.query('UPDATE USER SET link_id = 0, partner_id = 0, request = 0 where partner_id = ?', [userId], function(err, result, fields){
		if(err)
		{ res.json(
			{
				success : '0',
				message : 'fail',
				result : null
			});
		}
		else
		{	//delete link lisk
			client.query('DELETE from LINK where user1 = ? OR user2 = ?', [userId, userId], function(err, result, fields){
				if(err)
				{res.json(
					{
						success : '0',
						message : 'link delete fail',
						result : null
					});
				}
				else
				{
					//delete my information
					client.query('DELETE from USER where user_id = ?', [userId], function(err, result, fields){
						if(err)
						{res.json(
							{
								success : '0',
								message : 'delete my info fail',
								result : null
							});
						}
						else
						{res.json(
							{
								success : '1',
								message : 'drop out success',
								result : null
							});
						}

					});
				}
			}); 
		}
	});
});

module.exports = router;