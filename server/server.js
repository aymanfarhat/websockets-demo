const express = require('express');
const http = require('http').createServer();
const io = require('socket.io')(http);

const redis = require('redis');
const redisClient = redis.createClient(6379, 'redis', {no_ready_check: true});

//const app = express();
//app.use(express.static('public'));
//
//app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/index.html');
//});
//
//app.post('/create-game', (req, res) => {
//  const gameUniqueId = Math.random().toString(36).substring(2) + Date.now().toString(36);
//
//  redisClient.hmset(gameUniqueId, ['p1_name', 'ayman'], (err, result) => {
//    res.redirect(`/game/${gameUniqueId}`);
//  });
//});
//
//app.get('/room/:roomId', (req, res) => {
//  const roomId = req.params.roomId;
//
//  redisClient.hgetall(roomId, (err, value) => {
//    res.sendFile(__dirname + '/index.html');
//  });
//});
//
//app.listen(3000, () => {
//  console.log('listening on *:3000');
//});

const socketUsernames = {};

io.set('origins', 'localhost:4000');

io.on('connection', (socket) => {
  socket.on('joinRoom', (joinDetails) => {
    const room = joinDetails.room;
    socket.username = joinDetails.username;
    socket.join(room);
 
    const socketList = Object.keys(io.sockets.adapter.rooms[room].sockets);

    socket.in(room).emit('updateRoomCount', socketList);
  });

  socket.on('disconnect', (socket) => {
    //const socketList = Object.keys(io.sockets.adapter.rooms['Hola'].sockets);
    //socket.in(room).emit('updateRoomCount', socketList);
  });
});

http.listen(3000);
