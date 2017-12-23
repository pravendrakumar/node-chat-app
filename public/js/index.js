var socket = io();
socket.on('connect', function () {
    console.log('connected to server');
});

//when server not connected
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newMessageLocation', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">Check on map</a>');
    a.attr('href', message.url);
    li.text(`${message.from} :`);
    li.append(a);
    jQuery('#messages').append(li);

});
$('#node-chat-app').on('submit', function (e) {
    e.preventDefault();
    var sendMessage = $('[name=message]');
    socket.emit('createMessage', {
        'from': 'User_' + new Date().getTime(),
        'text': sendMessage.val()
    }, function (data) {
        sendMessage.val('');
        console.log('Got it', data);
    });
    $('[name=message]').val();
});

var sendLocation = $('#send-location');
sendLocation.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not support by your browser!');
    }
    sendLocation.attr('disabled',true).text('Sending location ..');
    navigator.geolocation.getCurrentPosition(function (position) {
        sendLocation.attr('disabled',false).text('Send location');
        socket.emit('newLocationMessage', {
            from: 'user',
            coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        });
    }, function () {
        sendLocation.attr('disabled',false).text('Send location');
        alert('Unable to find your location');
    });
});