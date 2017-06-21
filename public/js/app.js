var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

socket.on('connect', function() {
	console.log('connected to socket.io server!');
});

socket.on('message', function(message) {
	var momentTimeStamp = moment.utc(message.timestamp);
	var $message = $('.messages');

	$message.append('<p><strong>'+message.name+' '+momentTimeStamp.local().format('h:mm a') +'</strong></p>');
	$message.append('<p>'+message.text+'</p>')
});

var $form = $('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]');
	socket.emit('message', {
		name: name,
		text: $message.val()
	});
	$message.val('');
});