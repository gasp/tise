var express = require('express');
var app = express();

// wrappers
var http = require('http').Server(app);
var io = require('socket.io')(http);

var drinks = [
  {name: 'beer', count: 0, price: 5},
  {name: 'wine', count: 0, price: 7},
  {name: 'champagne', count: 0, price: 15},
  {name: 'cocktail', count: 0, price: 10}
];

var prices = function (drinks) {
  var total = 0;
  for (var i = 0; i < drinks.length; i++) {
    total = total + drinks[i].count;
  }
  for (var j = 0; j < drinks.length; j++) {
    drinks[j].percent = Math.floor(drinks[j].count/total*100);
  }
  return drinks;
};

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function (req, res) {
  res.sendFile(__dirname + '/admin.html');
});

io.on('connection', function (socket) {
  socket.emit('drinks', drinks);
  socket.on('command', function (drink) {
    for (var i = 0; i < drinks.length; i++) {
      if (drinks[i].name === drink) {
        drinks[i].count ++;
      }
    }
    drinks = prices(drinks);
    io.sockets.emit('drinks', drinks);
  });
});

http.listen(3000, function () {
  console.log('running server on porty 3000');
});
