var net = require('net');
var server = net.createServer(function (socket) {
    socket.on('data', function (data) {
        console.log(data.toString());
        socket.write("HTTP/1.1 OK\r\n");
        socket.write("Content-Type:text/html\r\n");
        var s = "<h1>Hello World</h1>"
        socket.write("Content-length:" + s.length + "\r\n\r\n");
        socket.end(s);
    });
    socket.on('end', function () {
        console.log('连接中断');
    });
});
server.listen(4567, 'localhost', function () {
    address = server.address();
    console.log('被监听的地址信息为%j', address);
});