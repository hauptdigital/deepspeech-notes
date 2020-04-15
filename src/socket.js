const http = require('http');

function createHttpServer() {
  return http.createServer(function (request, response) {
    response.writeHead(200);
    response.write('websocket for microphone');
    response.end();
  });
}

module.exports = createHttpServer;
