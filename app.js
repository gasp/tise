var http = require('http');


var server = http.createServer(function (req, res) {
  res.end('plop');
});


server.listen(3000, function () {
  console.log('running server on porty 3000');
});
