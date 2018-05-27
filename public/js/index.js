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

    socket.on('newLocationMessage', function (locationData) {
        let li = $(`<li>${locationData.from}:</li>`);
        let a = $('<a target="_blank">Open in maps</a>')
        a.attr('href', locationData.url);
        li.append(a);
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
        let locationBtn = $('#send-location');
        locationBtn.click(function (e) {
            if (!navigator.geolocation) {
                return alert('Geolocation not supported by your browser!');
            }
            navigator.geolocation.getCurrentPosition(function (position) {
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, function () {
                alert("Unable to fetch location")
            });

        });
    });
})($);