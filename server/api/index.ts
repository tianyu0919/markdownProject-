/*
 * @Author: 归宿
 * @Date: 2022-08-08 11:13:55
 * @Description: 
 */
const MenuRouter = require("./Menu");
const ContentRouter = require('./Content');

const APIRouter = (req: any, res: any) => {
  const { type } = req.params;
  if (type === 'menu') {
    // * 如果是 menu 
    MenuRouter(req, res);
  } else if (type === 'content') {
    ContentRouter(req, res);
  } else {
    res.status(404).send('404 not fount');
  }
};

module.exports = APIRouter;

export default {};