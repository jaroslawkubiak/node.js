const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // solution 1 - good for small files
  //   fs.readFile('test-file.txt', (err, data) => {
  //     if (err) console.error(err);
  //     res.end(data);
  //   });

  //   solution 2 - with streams, good for big files
  //   tworzymy stream podając plik
  //   const readable = fs.createReadStream('test-file.txt');
  //   // nasłuchujemy na event 'data'
  //   readable.on('data', chunk => {
  //     //zapisujemy gotowy chunk i wysyłamy go do usera
  //     res.write(chunk);
  //   });

  //   // kiedy wczytywanie całego pliku się zakończy, 'end' event jest emitowany
  //   readable.on('end', () => {
  //     res.end();
  //   });

  //   // loging error
  //   readable.on('error', err => {
  //     res.statusCode = 500;
  //     res.end('File not found');
  //   });

  // Solution 3 - using pipe()
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  //potrzebujemy readable żródło i przekazujemy do writable destynacji/celu
});

server.listen(8000, '127.0.0.1', () => {
  console.log('start listening....');
});
