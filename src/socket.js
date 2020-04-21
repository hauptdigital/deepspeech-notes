const io = require('socket.io');
const {
  createStream,
  processAudioStream,
  endAudioStream,
  resetAudioStream,
} = require('./audio.js');

function initSocket(server) {
  const socket = io(server, {});

  socket.on('connection', function (socket) {
    console.log('client connected');

    createStream();

    socket.on('stream-data', function (data) {
      processAudioStream(data, (results) => {
        socket.emit('recognize', results);
      });
    });

    socket.on('stream-end', function () {
      endAudioStream((results) => {
        socket.emit('recognize', results);
      });
    });

    socket.on('stream-reset', function () {
      resetAudioStream();
    });

    socket.once('disconnect', () => {
      console.log('client disconnected');
    });
  });
}

module.exports = {
  initSocket,
};
