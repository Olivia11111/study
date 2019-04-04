function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

$(document).ready(function() {
    // Use a "/test" namespace.
    // An application can open a connection on multiple namespaces, and
    // Socket.IO will multiplex all those connections on a single
    // physical channel. If you don't care about multiple channels, you
    // can set the namespace to an empty string.
    namespace = '/test';

    // Connect to the Socket.IO server.
    // The connection URL has the following format:
    //     http[s]://<domain>:<port>[/<namespace>]
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

    // Event handler for new connections.
    // The callback function is invoked when a connection with the
    // server is established.
    socket.on('connect', function() {
        var uuid = createGuid();
        console.log("uuid=", uuid)
        socket.emit('new connect', {uuid: uuid});
    });

    socket.on('my_response', function(msg) {
        $('#log').append('<br>' + $('<div/>').text('Received #' + msg.count + ': ' + msg.data+msg.sid).html());
    });

    var send_msg = function() {
        socket.emit('my_event', {data: 'I\'m connected!'});
    };
});