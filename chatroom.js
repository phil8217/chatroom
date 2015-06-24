var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/chatroom.html');
});

var user_count = 0;


io.on('connection', function(socket){

	
	socket.on('add user',function(msg){
		socket.username = msg;
		console.log("new user:"+msg+" logged.");
		io.emit('add user',{
			username: socket.username
		});
	});

	
	socket.on('chat message', function(msg){

		console.log(socket.username+":"+msg);

  		
		io.emit('chat message', {
			username:socket.username,
			msg:msg
		});
	});

	socket.on('disconnect',function(){
		console.log(socket.username+" left.");
		io.emit('user left',{
			username:socket.username
		});
	});


});


http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});

