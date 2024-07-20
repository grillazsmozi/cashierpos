const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cashier.jkejmzc.mongodb.net/?retryWrites=true&w=majority&appName=cashier/items', {});

const itemSchema = new mongoose.Schema({
  ean: String,
  price: String,
});

const Item = mongoose.model('Item', itemSchema);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

app.get('/terminal', (req,res) => {
  res.sendFile(__dirname + '/public/card.html');
})

io.on('connection', (socket) => {
  console.log('A user connected');

  io.on('card',(value) => {
    console.log('got card')
    io.emit('card',(value))
    console.log('sent card')
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, '192.168.1.110', () => {
  console.log(`Server is running on port ${PORT}`);
});
