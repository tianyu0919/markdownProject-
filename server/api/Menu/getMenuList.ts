/*
 * @Author: 归宿
 * @Date: 2022-08-08 14:25:10
 * @Description: 
 */
const fs = require('fs');
const path = require('path');

// * 读取目录
function readDir(dirPath: string) {
  return new Promise<any>((resolve, reject) => {
    const result: any = [];
    let timer: ReturnType<typeof setTimeout> | null;
    function deepReadDir(dirPath: string, data: any) {
      // * 打开目录，生成一个目录流dir
      fs.opendir(dirPath, (err: any, dir: any) => {
        // * 当拿不到东西的时候，直接返回。
        if (!dir) {
          return;
        }
        let dirent = null;
        // * 读取目录中的每一项
        // * dir.readSync() 同步的读取dir中下一个目录项，当没有可读取的目录项时返回null
        while (dirent = dir.readSync()) {
          console.log('我是目录：', dir.path)
          console.log('我是名称：', dirent.name)
          const dirPath = dir.path.split('server')[1];
          // * 加入当前目录项是文件
          if (dirent.isFile()) {
            // console.log(`${dirent.name} 是文件`);
            data.push({
              label: dirent.name,
              path: `${dirPath}/${dirent.name}`,
              key: `${dirPath}/${dirent.name}`
            })
            // data[dirent.name] = {
            //   path: `${dirPath}/${dirent.name}`
            // };
          } else if (dirent.isDirectory()) {
            // console.log(`${dirent.name} 是目录`);
            const dirObj = {
              label: dirent.name,
              children: [],
            }
            data.push(dirObj);
            // data[dirent.name] = {
            //   // path: dirPath,
            //   child: {}
            // };
            deepReadDir(`${dir.path}/${dirent.name}`, dirObj.children);
            // deepReadDir(`${dir.path}/${dirent.name}`, data[dirent.name].child);
          }
        }
        dir.close((err: any) => {
          if (err) {
            console.error(err);
            resolve({ msg: "失败了" });
            return;
          }
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          timer = setTimeout(() => {
            resolve(result);
          }, 500)
          console.log(`已经关闭的目录流: ${dir.path}`);
        })
      })
    }
    deepReadDir(path.resolve(__dirname, dirPath), result);
  })
}

// * 读取目录并打印
function readDirConsole(dirPath: string) {
  const data: any = {};
  function deepReadDir(dirPath: string, indent = 0) {
    // * 打开目录，生成一个目录流dir
    fs.opendir(dirPath, (err: any, dir: any) => {
      if (!dir) {
        return;
      }
      const ar = dir.path.split('/')
      // * 目录
      console.log(`|${new Array(indent).fill('-').join('')}${ar[ar.length - 1]}`);
      let dirent = null;
      // * 读取目录中的每一项
      // * dir.readSync() 同步的读取dir中下一个目录项，当没有可读取的目录项时返回null
      while (dirent = dir.readSync()) {
        // console.log('我是目录：', dir.path)
        // console.log('我是名称：', dirent.name)

        // * 加入当前目录项是文件
        if (dirent.isFile()) {
          // console.log(`${dirent.name} 是文件`);
          console.log(`|${new Array(indent + 2).fill(' ').join('')}|-${dirent.name}`);
          data[dirent.name] = {};
        } else if (dirent.isDirectory()) {
          // console.log(`${dirent.name} 是目录`);
          data[dirent.name] = {
            child: {}
          };
          console.log(`|${new Array(indent).fill('-').join('')}${dirent.name}`);
          // console.log(`|${new Array(indent).fill('-').join('')}${ar[ar.length - 1]}`);
          // console.log(`|${new Array(indent).fill('-').join('')}${ar[ar.length - 1]}`);
          // console.log(`${new Array(indent).fill(' ').join('')}   |-${dirent.name}`);
          deepReadDir(`${dir.path}/${dirent.name}`, indent + 1);
        }
      }
      dir.close((err: any) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log(`已经关闭的目录流: ${dir.path}`);
      })
    })
  }
  deepReadDir(path.resolve(__dirname, dirPath));
  return Promise.resolve(data);
}

// * 获取列表
async function getMenuList(req: any, res: any) {
  res.set('Content-Type', 'application/json');
  console.log('开始咯~~~~~~~~~~~')
  // const data = await readDir("../../assets");
  const data = await readDir("../../assets/markdown");
  console.log(`data====${JSON.stringify(data)}`)
  res.status(200).json({ code: 200, data });
}

module.exports = getMenuList;

export default {};