var io = require('socket.io')();

//mysql
var mysql = require('mysql');

//db
var client = mysql.createConnection({
	user : 'root',
	password : '123qwe'
});

client.query('USE App');

io.on('connection', function(socket) {
	console.log('user connected');

	//join event
	socket.on('join', function(data) {
		console.log('user join room : ' + data);
		socket.join(data);
	});

	//message event
	socket.on('message', function(data) {
		console.log('user send message : ' + data.MESSAGE);
		client.query('insert into chatting (link_id, sender_id, message, picture, date) values (?, ?, ?, ?, NOW())', 
			[data.LINK_ID, data.SENDER_ID, data.MESSAGE, data.PICTURE], 
			function(err, rows, fields) {
    			if(err) {
    				console.log('chatting insert error : ' + err);
				} else {
				}
			}
		);
		data.DATE = new Date();
		io.sockets.in(data.LINK_ID).emit('message', data);
	});
});

module.exports = io;
