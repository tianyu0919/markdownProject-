# net转发http和https

默认端口：

- http：80
- https：443

## http

使用 `http` 启动一个服务。例子：

```js
const http = require('http');
const httpPort = 2021;

// * http 回调
function callBack(req, res) {
  // * req 是请求信息
  // * res 是返回信息
}

// * 启动服务
http.createServer(callBack).listen(httpPort);
```

## https

使用 `https` 启动一个服务，但是前提是，需要有 `ssl` 证书，比如已经有了，那么接下来看代码：

```js
const https = require('https');
const httpsPort = 3021;
const fs = require('fs');

const options = {
  key: fs.readFileSync('./ssl/xxx.key'),
  cert: fs.readFileSync('./ssl/xxx.pem')
}

https.createServer(options, callBack).listen(httpsPort);
```

## net

使用 `net` 模块转发 `http` 和 `https` 信息，首先需要启动 `http` 和 `https` 服务，如上面的两处代码。

```js
const net = require('net');
const netPort = 1021;

net.createServer((socket) => {
  socket.once('data', (buf) => {
    console.log(buf[0]);
    // * 注意 https 数据流的第一位是十六进制"16"，转换成十进制就是22。http 数据流是71。
    let address = buf[0] === 22 ? httpsPort : httpPort;

    // * 创建代理
    const proxy = net.createConnection(address, function() {
      proxy.write(buf);
      // * 反向代理的过程，tcp接收的数据交给代理连接，代理连接服务器返回数据交给socket返回给客户端。
      socket.pipe(proxy).pipe(socket);
    });

    // * 监听错误信息
    proxy.on('error', (err) => {
      console.log(err);
    })
  });

  socket.on('err', err => {
    console.log(err);
  })
}).listen(netPort);
```