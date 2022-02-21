const fs = require('fs');
const http = require('http');
const url = require('url');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the Overview');
  } else if (pathName === '/product') {
    res.end('This is product');

  } else if (pathName === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);

  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });

    res.end('<h1>Page not found!</h1>');
  }


});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});