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
		$.each(list, function(index, user) {
			$('#users').append($('<li>').text(user.nick));
		});
		console.log(list);
	});
	
	socket.on('chat history', function(history) {
		$.each(history, function(index, chat) {
			$('#messages').append($('<li>').text(chat.saidBy.nick + ": " + chat.message));
		});
	});
	
	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(msg.saidBy.nick + ": " + msg.message));
	});
	
	function format(chatMsg) {
		
	}
});