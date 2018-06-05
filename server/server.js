const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {
    Users
} = require('./utils/users');
const publicPath = path.join(__dirname, '..', '/public');
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');

const {
    isValidString
} = require('./utils/validation');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(publicPath));
var users = new Users();
const server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('connected');
    socket.on('disconnect', () => {
        console.log('disconnected from client');
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left!`));
        }
    });

    socket.on('join', (params, callback) => {
        if (!isValidString(params.name) || !isValidString(params.room)) {
            return callback('Room and Name are required Fields');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('admin', 'Welcome to Chat App'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined`));
        callback();
    });


    socket.on('createMessage', (message, callback) => {

        io.emit("newMessage", generateMessage(message.from, message.text));
        callback('from the server');
        /* socket.broadcast.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); */
    });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
    });


});
server.listen(port, () => {
    console.log(`Server up on ${port}`);
});