/*
 * @Author: 归宿
 * @Date: 2022-11-14 18:53:05
 * @Description: 
 */
const http = require('http');

http.createServer((req, res) => {
  process.title = '程序员成长指北测试进程';
  res.end(JSON.stringify(process.title));
}).listen(3300);