var socket = io();
socket.on('connect', function () {
    console.log('connected to server');
    socket.emit('createMessage', {
        _from: 'me@me.com',
        _text: 'test mail from me',

    });
});
socket.on('disconnect', function () {
    console.log('disconnected from server');
});
socket.on('newMessage', function (data) {
    console.log("New message:", data);
});