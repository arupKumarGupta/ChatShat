const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '..', '/public');
const { generateMessage } = require('./utils/message');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(publicPath));
const server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('connected');
    socket.on('disconnect', () => {
        console.log('disconnected from client');
    });
    socket.emit('newMessage', generateMessage('admin', 'Welcome to Chat App'));
    socket.broadcast.emit('newMessage', generateMessage('admin', 'new User Joined'));
    socket.on('createMessage', (message) => {
        console.log('new Message:', message);
        io.emit("newMessage", generateMessage(message.from, message.text));

        /* socket.broadcast.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); */
    });
});
server.listen(port, () => {
    console.log(`Server up on ${port}`);
});