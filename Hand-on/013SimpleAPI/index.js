const fs = require('fs');
const http = require('http');
// const url = require('url');

// อา่นไฟล์ data.json มาเก็บไว้ที่ data ก่อน
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/') {
    res.end('This is Root');

  } else if (pathName === '/api') {
    //มีการอ่านไฟล์ data.json มาเก็บที่ตัวแปร data แล้วจากบ้างบน เมื่อแสดงก็เรียกตัวแปร data มาแสดงได้เลย  
    res.writeHead(200, { 'Content-type': 'application/json' });   //ระบุว่าข้อมูลที่จะแสดงเป็น json
    res.end(data);         //แสดงข้อมูล

  } else {

    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening to requests on port 3000');
});