const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello world NodeJS Server....');
  res.end();
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server start on Port 3000');
});

// server.listen(3000);