var express = require('express');
var app = express();

// wrappers
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
  res.end('bienvenue sur index');
});

http.listen(3000, function () {
  console.log('running server on porty 3000');
});
