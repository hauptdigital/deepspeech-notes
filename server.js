require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const { createModel } = require('./src/createModel');
const { createHttpServer, startSocket } = require('./src/socket');
const webSocketPort = process.env.SOCKET_PORT || 4000;

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

// Web microphone socket

const socket = createHttpServer();

socket.listen(webSocketPort, 'localhost', () => {
  console.log('Socket server listening on:', webSocketPort);
});

startSocket(socket);

if (process.env.NODE_ENV === 'production') {
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
}

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
