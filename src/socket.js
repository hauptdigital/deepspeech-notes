const io = require('socket.io');

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
  startSocket,
};
