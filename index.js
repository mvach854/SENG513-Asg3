var express = require('express');
var app = express();
var http = require('http').Server(app); //createServer
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

let newUserID = 0;
let online = {};
let chat = [];

app.use(express.static(__dirname + '/client'));

http.listen(port, function(){
  console.log('listening on port', port);
});

io.on('connection', function(socket){
  socket.on('new user', function() {
	  newUserID = newUserID + 1;
	  let name = "User" + newUserID;
	  online[socket.id] = {nick: name, nickColour: "black"};
	  socket.emit('chat history', chat);
	  io.emit('update user list', online);
 	  console.log(online[socket.id].nick + " is now connected");
  });
  
  socket.on('chat message', function(msg) {
	  let messageInfo = {message: msg, saidBy: online[socket.id]};
	  chat.push(messageInfo);
	  io.emit('chat message', messageInfo);
  });
  
  socket.on('disconnect', function(){
	  if (online[socket.id] != null) {
		console.log(online[socket.id].nick + " has disconnected");
	  }
	  delete online[socket.id];
	  io.emit('update user list', online);
  });
});
