const http = require('http');
const io = require('socket.io');

exports.createHttpServer = () => {
  return http.createServer(function (request, response) {
    response.writeHead(200);
    response.write('websocket for microphone');
    response.end();
  });
};

exports.startSocket = (server) => {
  const socket = io(server, {});

  socket.on('connection', function (socket) {
    console.log('client connected');

    socket.once('disconnect', () => {
      console.log('client disconnected');
    });
  });
};
