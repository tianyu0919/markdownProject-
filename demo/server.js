/*
 * @Author: 归宿
 * @Date: 2022-08-09 16:05:48
 * @Description:
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  const { url } = req;
  console.log(url);
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Credentials', true);
  if(url === '/') {
    fs.readFile(path.join(__dirname, './index.html'), (err, data) => {
      if(err){
        return;
      }
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    })
  }else if(url === '/list') {
    res.setHeader('Set-Cookie', 'name=hahha12; domain=.houhou.net');
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.writeHead(200);
    res.end(JSON.stringify({name:'xx',age: 12}));
  }else if(url=== '/redirect') {
    res.setHeader('Set-Cookie', 'name=hahha12; domain=.houhou.net');
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.setHeader('location', '/login.html');
    res.writeHead(302);
    res.end(fs.readFileSync(path.resolve(__dirname, './login.html')))
  }
  else if(url=== '/login.html') {
    res.setHeader('Set-Cookie', 'name=hahha12; domain=.houhou.net');
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.setHeader('location', '/login.html');
    res.writeHead(200);
    res.end(fs.readFileSync(path.resolve(__dirname, './login.html')))
  }
}).listen(3002)