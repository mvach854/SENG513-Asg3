var express = require('express');
var app = express();
var http = require('http').Server(app); //createServer
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

let newUserID;
let online = {};
let chat = [];

app.use(express.static(__dirname + '/client'));

http.listen(port, function(){
  console.log('listening on port', port);
  newUserID = 0;
});

io.on('connection', function(socket){
  socket.on('new user', function() {
	  let newID = newUserID + 1;
	  let name = "User" + newID;
	  online[socket.id] = {nick: name, nickColour: "black"};
	  io.emit('update user list', online);
 	  console.log(online[socket.id].nick + " is now connected");
  });
  
  socket.on('chat message', function(msg) {
	  io.emit('chat message', msg);
	  console.log('message', msg);
  });
  
  socket.on('disconnect', function(){
	  if (online[socket.id] != null) {
		console.log(online[socket.id].nick + " has disconnected");
	  }
	  delete online[socket.id];
	  io.emit('update user list', online);
  });
});
