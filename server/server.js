const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '..', '/public');
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
});
server.listen(port, () => {
    console.log(`Server up on ${port}`);
});