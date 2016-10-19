var http = require('http')
  , server = http.createServer( handler )
  , io = require('socket.io')( server );

function handler( request, reply ) {
  reply.writeHead(200);
  reply.write("<script type='text/javascript' src='https://cdn.socket.io/socket.io-1.0.0.js'></script>");
  reply.write("<script>var socket = io(); socket.emit('event:hello'); </script>");
  reply.end('Running!');
}

io.on('connection', function( socket ) { 
  socket.on('event:hello', function(){
    socket.emit('event:hello');
    console.log('Received Socket Hello');
  });
});

server.listen( 8000, '192.168.0.6');


/*
Simple Socket Server

To use setup replace 192.168.0.6 with your own Pi's IP address.
Start server (node socket-server.js).
Use the browser to navigate to your Pi's IP address with port.
Check server console to see client sent event 'event:hello'
and server prints to console 'Received Socket Hello'.
Refreshing the browser should generate more console logs.
*/
