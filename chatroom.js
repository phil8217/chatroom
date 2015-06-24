var app = require('express')(); 
var http = require('http').Server(app);
var io = require('socket.io')(http);//導入需要的函式酷

app.get('/', function(req, res){//app.get指定訪問路徑對應的回調函數(routing)req,存放請求的所有資訊;res回應請求
	res.sendFile(__dirname + '/chatroom.html');//讀取chatroom.html
});


io.on('connection', function(socket){//啟動socket.io並連練

	
	socket.on('add user',function(msg){//等待觸發add user事件
		socket.username = msg;
		console.log("歡迎"+msg+"加入");
		io.emit('add user',{//傳給CLIENT端add user
			username: socket.username
		});
	});

	
	socket.on('chat message', function(msg){//等待觸發chat message事件

		console.log(socket.username+":"+msg);

  		
		io.emit('chat message', {//回傳CLIENT chat massage
			username:socket.username,
			msg:msg
		});
	});

	socket.on('disconnect',function(){//等待出發disconnect事件
		console.log(socket.username+" 離開了");
		io.emit('user left',{//回傳CLIENT端user left
			username:socket.username
		});
	});


});


http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});

