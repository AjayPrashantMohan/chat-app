var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function(socket) {
	console.log('User connected via socket.io!');

	socket.on('joinRoom', function(req) {
		clientInfo[socket.id] = req;//socket.id is a dynamic id created by socket
		socket.join(req.room); //joins to the reqired room
		socket.broadcast.to(req.room).emit('message', { //send message that user has joined to other members of the room
			name: 'System',
			text: req.name + ' has joined the chat!',
			timestamp: moment().valueOf()
		});
	});

	socket.on('message', function(message) {
		console.log('Message received: ' + message.text);
		message.timestamp = moment().valueOf(); //moment().valueOf() gives timestamp in milliseconds
		io.to(clientInfo[socket.id].room).emit('message', message); //send message to everybody in group
		
		/*io.emit('message', message);*/ //send message to everybody
		/*socket.broadcast.emit('message',message);*/ //send message to everybody except the one who sent it
	});

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application!',
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function() {
	console.log('Server Started');
});