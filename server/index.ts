/*
 * @Author: 归宿
 * @Date: 2022-08-05 11:16:22
 * @Description: 
 */
// const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const mimeTypes = require('./utils/mimeType');

const APIRouter = require('./api');

//设置跨域访问
app.all('*', function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By", ' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
  console.log(req.path);
});

app.use(express.static('dist'));
app.use(express.static('/assets/*'));

app.get('/', (req: any, res: any) => {
  res.set('Content-Type', 'text/html');
  res.cookie('xx', 'bar');
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
})

// * assets
app.get('/assets/*', (req: any, res: any) => {
  console.log(req.params);
  const ext = req.params[0].split('.');
  const fileTypes = mimeTypes[ext[ext.length - 1]] || 'text/plain; charset=utf-8';
  res.set('Content-Type', fileTypes);
  const filePath = path.resolve(__dirname, `./assets/${req.params[0]}`);
  console.log(filePath);
  res.sendFile(filePath);
})


// * 接口
app.get('/api/:type/*', (req: any, res: any) => {
  APIRouter(req, res);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})