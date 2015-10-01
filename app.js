var express = require('express');
var app = express();

// wrappers
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function (req, res) {
  res.sendFile(__dirname + '/admin.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.emit('message', 'welcome');
  socket.on('drink', function (what) {
    console.log('just drinked a ', what);
  });
});

http.listen(3000, function () {
  console.log('running server on porty 3000');
});
