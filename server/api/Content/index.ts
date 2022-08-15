/*
 * @Author: 归宿
 * @Date: 2022-08-12 14:52:22
 * @Description: 
 */
const getContent = require('./getContent');

function MenuRouter(req: any, res: any) {
  const { 0: path } = req.params;
  console.log(req.params)
  if (path === 'getContentMd') {
    getContent(req, res);
  }
}

module.exports = MenuRouter;

export default {};