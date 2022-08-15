/*
 * @Author: 归宿
 * @Date: 2022-08-12 14:52:46
 * @Description: 
 */
const mimeTypes = require('../../utils/mimeType');
const PATH = require('path');


function getContentMd(req: any, res: any) {
  const { query } = req;
  const { path } = query;
  console.log(path);
  const ext = path.split('.');
  const fileTypes = mimeTypes[ext[ext.length - 1]] || 'text/plain; charset=utf-8';
  res.set('Content-Type', fileTypes);
  const filePath = PATH.resolve(__dirname, `../../${path}`);
  console.log(filePath);
  res.status(200).sendFile(filePath);
  // res.status(200).send('# Hello World')
}

module.exports = getContentMd;

export default {};