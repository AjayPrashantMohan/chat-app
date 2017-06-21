var socket = io();

socket.on('connect',function(){
	console.log('connected to socket.io server!');
});

socket.on('message',function(message){
	var momentTimeStamp = moment.utc(message.timestamp);
	$('.messages').append('<p><strong>'+momentTimeStamp.local().format('h:mm a')+': </strong>'+message.text+'</p>');// .local() will convert timestamp according to the local time zone
});

var $form = $('#message-form');

$form.on('submit',function(event){
	event.preventDefault();
	var $message = $form.find('input[name=message]');
	socket.emit('message',{
		text:$message.val()
	});
	$message.val('');
});