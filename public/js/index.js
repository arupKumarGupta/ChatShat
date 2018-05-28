($, function () {
    var socket = io();
    socket.on('connect', function () {
        console.log('connected to server');
    });
    socket.on('disconnect', function () {
        console.log('disconnected from server');
    });
    socket.on('newMessage', function (data) {

        let messageTime = moment(data.createdAt).format('hh:mm a');
        let simpleMessageTemplate = $('#simpleMessage').html();
        let html = Mustache.render(simpleMessageTemplate, {
            from: data.from,
            text: data.text,
            createdAt: messageTime
        });
        $('#message-list').append(html);
    });

    socket.on('newLocationMessage', function (locationData) {
        let messageTime = moment(locationData.createdAt).format('hh:mm a');
        let locationMessageTemplate = $('#locationMessage').html();
        let html = Mustache.render(locationMessageTemplate, {
            from: locationData.from,
            url: locationData.url,
            createdAt: messageTime
        });

        $('#message-list').append(html);
    });

    $(function () {
        var message = $('[name=message]');
        $('#message-form').on('submit', function (e) {
            e.preventDefault();
            socket.emit('createMessage', {
                from: 'User',
                text: message.val()
            }, function (data) {
                console.log(data);
            });
            message.val('').focus();
        });
        let locationBtn = $('#send-location');
        locationBtn.click(function (e) {
            if (!navigator.geolocation) {
                return alert('Geolocation not supported by your browser!');
            }
            locationBtn.text("Sending Location...");
            locationBtn.attr('disabled', 'disabled');
            navigator.geolocation.getCurrentPosition(function (position) {
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                locationBtn.text("Send Location");
                locationBtn.removeAttr('disabled');

            }, function () {
                alert("Unable to fetch location");
                locationBtn.removeAttr('disabled');
                locationBtn.text("Send Location");
            });

        });
    });
})($);