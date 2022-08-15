/*
 * @Author: 卢天宇
 * @Date: 2022-07-30 02:15:50
 * @Description: 
 */
import add from './add';
const a = add(1, 2);

console.log(a);
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() * 10 >= 5 ? resolve(11) : reject(new Error('Invalid number'));
  }, 1000);
})

const fn = () => {
  promise.then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  })
}

