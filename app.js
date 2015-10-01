var express = require('express');
var app = express();

// wrappers
var http = require('http').Server(app);
var io = require('socket.io')(http);

var drinks = [
  {name: 'beer', count: 0},
  {name: 'wine', count: 0},
  {name: 'champagne', count: 0},
  {name: 'cocktail', count: 0}
];

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function (req, res) {
  res.sendFile(__dirname + '/admin.html');
});

io.on('connection', function (socket) {
  io.sockets.emit('welcome', drinks);
  socket.on('command', function (drink) {
    console.log(drink);
    for (var i = 0; i < drinks.length; i++) {
      if (drinks[i].name === drink) {
        console.log('found drink', drink);
        drinks[i].count ++;
      }
    }
    console.log(drinks);
    io.sockets.emit('drinks', drinks);
  });
});

http.listen(3000, function () {
  console.log('running server on porty 3000');
});
