var net = require('net');
// var fs = require('fs');
var PORT = 6969;
var ADDRESS = '0.0.0.0'
// var allSocketsConnected = [];
var socketId = 0;
var connectedSocketCache = {};
var activeUsernames = {};

var server = net.createServer(socketConnected);
server.listen(PORT, function(){
  console.log('server bound to ',PORT)
})


// for (var key in connectedSocketCache){
//   // process.stdin.write(connectedSocketCache[key]);
//   connectedSocketCache[key].write
// }

function socketConnected(socket){
  socketId++;
  socket.id = socketId;
  connectedSocketCache[socketId] = socket;
  socket.write('please enter username: ')
  // connectedSocketCachesocketId
  // allSocketsConnected.push(socket);
  console.log('sockets connected',Object.keys(connectedSocketCache));

  socket.on('end', function(){
    delete connectedSocketCache[socket.id];
    delete activeUsernames[socket.username];
    console.log('socket with id:'+socket.id+' just disconnected')
    console.log('connectedSocketCache after disconnected',Object.keys(connectedSocketCache))
  });
  socket.setEncoding('utf8');
  socket.on('data',function(chunk){
    console.log('connectedSocketCache all connected',Object.keys(connectedSocketCache))
    process.stdout.write(chunk);
    if(!socket.username){
      if(chunk.substring(0, chunk.length - 1).toLowerCase() === 'admin'){
        socket.write('you are not privileged to use this username \n please enter a different username:')
      }
      else if(chunk.substring(0, chunk.length - 1) in activeUsernames){
        socket.write('This username is already taken \n please enter a different username:')
      }
      else{
        socket.username = chunk.substring(0, chunk.length - 1);
        activeUsernames[socket.username] = true;
      }
      // console.log(socket)
      // console.log('logging chunk',chunk)
      // console.log('new username given: '+socket.username)
    }
    else{
      for(var k in connectedSocketCache){
        // console.log('username',socket.username,'after username')
        connectedSocketCache[k].write(socket.username +' said : '+chunk);
      }
    }
    // console.log('logging chunk',chunk)
    // console.log('allsockets',allSocketsConnected)
    console.log('all connected users: ',Object.keys(activeUsernames))
  });
  process.stdin.on('data',function(chunk){
    for(var k in connectedSocketCache){
      connectedSocketCache[k].write('admin said : '+chunk);
    }
  })



  // 'admin: '+process.stdin.pipe(socket);
  // client.end();
}