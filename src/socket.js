const http = require('http');
const io = require('socket.io');

function createHttpServer() {
  return http.createServer(function (request, response) {
    response.writeHead(200);
    response.write('SocketIO for microphone');
    response.end();
  });
}

function startSocket(server) {
  const socket = io(server, {});

  socket.on('connection', function (socket) {
    console.log('client connected');

    socket.once('disconnect', () => {
      console.log('client disconnected');
    });
  });
}

module.exports = {
  createHttpServer,
  startSocket,
};
