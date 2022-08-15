/*
 * @Author: 归宿
 * @Date: 2022-08-08 15:12:16
 * @Description: 
 */
const fs = require('fs');
const path = require('path');

// const url = path.resolve(__dirname, './server');


// function readDir(dirPath: string) {
//   // * 打开目录，生成一个目录流dir
//   fs.opendir(dirPath, (err: any, dir: any) => {
//     console.log(dir);
//     console.log('当前打开的目录路径是：' + dir.path);

//     let dirent = null;
//     // * 读取目录中的每一项
//     // * dir.readSync() 同步的读取dir中下一个目录项，当没有可读取的目录项时返回null
//     while (dirent = dir.readSync()) {
//       console.log(dirent);
//       // * 加入当前目录项是文件
//       if (dirent.isFile()) {
//         console.log(`${dirent.name} 是文件`);
//       }
//       if (dirent.isDirectory()) {
//         console.log(`${dirent.name} 是目录`);
//         readDir(path.resolve(dirPath, dirent.name));
//       }
//     }
//     dir.close((err: any) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log('已经关闭目录流');
//     })
//   })
// }

// readDir('./assets');


console.log(path.join(__dirname, './apo'))
export default {};