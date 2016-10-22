var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var players = {}

server.listen(3000 , function () {
  console.log('server started');
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', function (req, res) {
  if (req.cookies['player']) {
    return res.redirect('/game');
  }

  res.sendFile(__dirname + '/index.html');
});

app.post('/game', function (req, res) {
  var playerID = req.body.player;
  if (players[playerID]) {
    res.json({error:true, message:'This name already exists. Please try again.'});
  }

  console.log(playerID);

  players[playerID] = {
    name: playerID
  }

  res.cookie('player', playerID, { maxAge: 999999, httpOnly: true });
  res.json({error:false, data:{redirect: '/game'}});
});

app.get('/game', function (req, res) {
  if (!req.cookies['player']) {
    return res.redirect('/');
  }

  res.sendFile(__dirname + '/game.html');
});

// var numPlayers;

// io.on('connection', function (socket) {
//   var ip = socket.handshake.address;
//   console.log(ip);
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });
