require('dotenv').config();
const http = require('http');
const express = require('express');
const path = require('path');
const { initDatabase } = require('./lib/database/database');
const { initSocket } = require('./src/socket');

const port = process.env.PORT || 8080;
const socketPort = process.env.SOCKET_PORT || 4000;

const app = express();

if (process.env.NODE_ENV === 'production') {
  // Web microphone socket

  const server = http.createServer(app);

  initSocket(server);

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

  initDatabase(process.env.DB_URL, process.env.DB_NAME).then(async () => {
    console.log(`Database ${process.env.DB_NAME} is ready`);

    server.listen(port, () =>
      console.log(`Express server app listening at http://localhost:${port}`)
    );
  });
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

  initSocket(socket);

  initDatabase(process.env.DB_URL, process.env.DB_NAME).then(async () => {
    console.log(`Database ${process.env.DB_NAME} is ready`);

    app.listen(port, () =>
      console.log(`Express server app listening at http://localhost:${port}`)
    );
  });
}
