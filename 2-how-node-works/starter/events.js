const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('newSale', () => {
  console.log('there was a new sale!');
});

myEmitter.on('newSale', () => {
  console.log('Costumer name: Jarek');
});

// myEmitter.on('delay', () => console.log('delay was arrived'));

myEmitter.on('newSale', stock => {
  console.log('on stock ', stock);
});

myEmitter.emit('newSale', 9);

// setTimeout(() => {
//   myEmitter.emit('delay');
// }, 2000);

//

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received!');
  console.log(req.url);
  res.end('Request received');
});

server.on('request', (req, res) => {
  console.log('Another request 😀');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests...');
});
