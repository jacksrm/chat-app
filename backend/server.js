const app = require('./app');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

let messages = [];

io.on('connection', socket => {
  console.log(`Conectado ao socket: ${socket.id}`);

  socket.emit('chatHistory', messages);

  socket.on('sendMessage', data => {
    messages.push(data);

    socket.broadcast.emit('receivedMessage', data);
  });
});

server.listen(3333);