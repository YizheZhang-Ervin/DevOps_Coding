var dgram = require('dgram');
var server = dgram.createSocket('udp4');
server.on("message", function (msg, info) {
    console.log("msg:" + msg + ' from ' + info.address + ":" + info.port);
});
server.on("listening", function () {
    var addr = server.address();
    console.log('server listening:' + addr.address + ":" + addr.port);
});
server.bind(12345, 'localhost');