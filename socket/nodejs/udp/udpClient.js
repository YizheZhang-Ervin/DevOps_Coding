var dgram = require('dgram');
var message = new Buffer("Node.js");
var client = dgram.createSocket("udp4");
client.send(message, 0, message.length, 12345, "localhost", function (err, bytes) {
    client.close();
});