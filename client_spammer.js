var net = require('net');
var PORT = 6969;
var ADDRESS = '0.0.0.0'

var client = net.connect({host : '10.0.1.6',port: PORT}, connectedToServer);

function connectedToServer(){
  console.log('connected to server');
  client.setEncoding('utf8');
    process.stdin.setEncoding('utf8');

  // client.write(client)
  // client.end();
  process.stdin.pipe(client)
  process.stdin.on('data', function(chunk){
    if(chunk.substring(0,chunk.length-1) === 'flood'){
      flooder();
    }
  })

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
function flooder(){
  var n=0;
  while(n<1000){
    client.write('spam mofo naosrtioarsnetoiaenrstoienarsotienasroitnesrati');
    n++;
  }
}