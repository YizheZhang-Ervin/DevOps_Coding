var net = require('net');
var server = net.createServer(function (socket) {
    console.log('客户端与服务器端连接已经建立');
    //接收客户端数据，并向客户端返回数据
    socket.on('data', function (data) {
        console.log(data.toString());  //data是buffer,必须转换
        socket.write('hello');  //服务端接收到客户端数据之后返回给客户端"hello"
    });
    socket.on('end', function () {
        console.log('连接中断');
    });
});
server.listen(4567, 'localhost', function () {   //指定localhost，只有本地能访问
    address = server.address();
    console.log('被监听的地址信息为：%j', address);
});