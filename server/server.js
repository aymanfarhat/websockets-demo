const http = require('http').createServer();
const io = require('socket.io')(http);

const redis = require('redis');
const redisClient = redis.createClient(6379, 'redis', {no_ready_check: true});

const socketUsernames = {};

io.set('origins', '127.0.0.1:8000');

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
