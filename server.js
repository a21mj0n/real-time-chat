const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  //welcome curren user
  socket.emit('message', 'Welcome to AZCHat')

  //when new user connects
  socket.broadcast.emit('message', 'A user joined the chat')

  // when user is disconnect
  socket.on('disconnect', () => {
    io.emit('message', 'A user is disconnected')
  })

  // lister chat message
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg)
  })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server started at ${PORT}`))
