const EventEmitter = require("events");
const http = require('http');

class Sales extends EventEmitter {        // Sales inherit from EventEmitter
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSalex", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSalex", test => {
  console.log(`Custumer name: Akkadate ${test}`);
});

myEmitter.on("newSalex", stock => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit("newSalex", 9);

//----------------------------------------

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request received!!");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another Request 💛");
});

server.on("close", () => {
  console.log("Server closed")
})

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests.....");
});