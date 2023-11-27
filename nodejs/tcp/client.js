var net = require('net');
var client = net.connect('4567', 'localhost', function () {
    console.log('已经与服务器连接');
    client.write('Yes\r\n');
});
client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});
client.on('end', function () {
    console.log('客户端连接中断');
});