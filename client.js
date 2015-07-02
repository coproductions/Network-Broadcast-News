var net = require('net');
var PORT = 6969;
var ADDRESS = '0.0.0.0'

var client = net.connect({port: PORT}, connectedToServer);

function connectedToServer(){
  console.log('connected to server');
  // client.write(client)
  // client.end();
  process.stdin.pipe(client)

  client.on('data',function(chunk){
    // console.log('yay reciveng data',chunk)
    process.stdout.write(chunk)
  })
}

// client.on('data', function(data) {
//   console.log(data.toString());
//   client.end();
// });
client.on('end', function() {
  console.log('disconnected from server');
});