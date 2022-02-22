const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1: load all file into memory, run out of resource ,not work in big file
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (!err) console.log(err);
  //   res.end(data);
  // });

  // Solution 2: Steams
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', chunk => {
  //   res.write(chunk);
  // })
  // readable.on('end', () => {
  //   res.end();
  // });
  // readable.on('error', err => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found!!!");
  // });

  // Solution 3:
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  //readableSource.pipe(writeableDest)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for Request...');
})