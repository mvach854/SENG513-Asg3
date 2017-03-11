// shorthand for $(document).ready(...) 
$(function() {
	var socket = io();
	
	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});
	
	socket.on('connect', function() {
		socket.emit("new user");
	});
	
	socket.on('update user list', function(list) {
		$('#users').empty();
		$.each(list, function(name, col) {
			$('#users').append($('<li>').text(name));
		});
		console.log(list);
	});
	
	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(msg));
	});
});