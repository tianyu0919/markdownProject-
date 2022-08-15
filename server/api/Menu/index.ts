/*
 * @Author: 归宿
 * @Date: 2022-08-08 10:52:10
 * @Description: 
 */
const getMenuList = require('./getMenuList');

function MenuRouter(req: any, res: any) {
  const { 0: path } = req.params;
  console.log(req.params)
  if (path === 'getMenuList') {
    getMenuList(req, res);
  }
}

module.exports = MenuRouter;

export default {};