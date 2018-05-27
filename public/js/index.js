($, function () {
    var socket = io();
    socket.on('connect', function () {
        console.log('connected to server');
    });
    socket.on('disconnect', function () {
        console.log('disconnected from server');
    });
    socket.on('newMessage', function (data) {
        console.log("New message:", data);
        let li = $(`<li>${data.from}:${data.text}</li>`);
        $('#message-list').append(li);
    });
    $(function () {
        $('#message-form').on('submit', function (e) {
            e.preventDefault();
            socket.emit('createMessage', {
                from: 'User',
                text: $('[name=message]').val()
            }, function (data) {
                console.log(data);
            });
        });
    });
})($);