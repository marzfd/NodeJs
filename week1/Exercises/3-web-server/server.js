/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {

  if (req.url == '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('index.html', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  }
  else if (req.url == '/index.js') {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    fs.readFile('index.js', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  }
  else if (req.url == '/style.css') {
    res.writeHead(200, {'Content-Type': 'text/css'});
    fs.readFile('style.css', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  }
  else res.end('Invalid Request!');
});

server.listen(3000);
