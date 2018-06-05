($, function () {
    var socket = io();
    socket.on('connect', function () {
        let params = $.deparam(window.location.search);
        socket.emit('join', params, function (error) {
            if (error) {
                alert(error);
                window.location.href = '/';
            } else {
                console.log("No error");
            }
        });
    });
    socket.on('disconnect', function () {
        console.log('disconnected from server');
    });
    socket.on('updateUsersList', function (users) {
        console.log(users);
        let ol = $('<ol></ol>');
        users.forEach(function (name) {
            let singleUser = $('#user').html();
            let html = Mustache.render(singleUser, {
                name
            });
            ol.append(html);
        });

        $('#peopleView').html('').append(ol);
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
        scrollToBottom();
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
        scrollToBottom();
    });

    function scrollToBottom() {
        //selectors and  heights
        var messages = $("#message-list");

        var clientHeight = messages.prop('clientHeight');
        var scrollTop = messages.prop('scrollTop');
        var scrollHeight = messages.prop('scrollHeight');
        var newMessage = messages.children('li:last-child');
        var newMessageHeight = newMessage.innerHeight();
        var lastMessageHeight = newMessage.prev().innerHeight();

        if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            messages.scrollTop(scrollHeight);
        }
    }

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