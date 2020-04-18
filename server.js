require('dotenv').config();
const http = require('http');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const socketPort = process.env.SOCKET_PORT || 4000;
const { createModel } = require('./src/model');
const fs = require('fs');
const { processAudioStream, voiceActivityDetection } = require('./src/audio');
const { startSocket } = require('./src/socket');

const app = express();

// Language Model

const modelDirectory = './src/model';

const modelOptions = {
  // The beam width used by the decoder. A larger beam width generates better results at the cost of decoding time.
  BEAM_WIDTH: 1024,
  // The alpha hyperparameter of the CTC decoder. Language Model weight.
  LM_ALPHA: 0.75,
  // The beta hyperparameter of the CTC decoder. Word insertion weight.
  LM_BETA: 1.85,
};

const model = createModel(modelDirectory, modelOptions);

// Process audio demo file

const audioStream = fs.createReadStream('./src/demo_pcm_s16_16000.raw');
processAudioStream(audioStream, model, voiceActivityDetection);

if (process.env.NODE_ENV === 'production') {
  // Web microphone socket

  const server = http.createServer(app);

  startSocket(server);

  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.use(express.static(path.join(__dirname, 'client/storybook-static')));

  // Handle React routing, return all requests to React app
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

  // Setup Handle React routing, return all requests to React app
  app.get('/storybook', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/storybook-static', 'index.html'));
  });

  server.listen(port, () =>
    console.log(`Express server app listening at http://localhost:${port}`)
  );
} /* development */ else {
  // Web microphone socket

  const socket = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('SocketIO');
    res.end();
  });

  socket.listen(socketPort, 'localhost', () => {
    console.log(`SocketIO listening at http://localhost:${socketPort}`);
  });

  startSocket(socket);

  app.listen(port, () =>
    console.log(`Express server app listening at http://localhost:${port}`)
  );
}
