# js label

代码如下：

```js
for (let i = 0; i < 30; i++) {
  for (let j = 0; j < 30; j++) {
    if (i * j >= 30) {
      console.log('跳出外层循环')
      break;
    }
  }
}
```

如果根据上方代码中所示，那么只会跳出内层循环，如果想要跳出外面的循环，可以添加一个 flag 标记。

```js
let flag = false;
for (let i = 0; i < 30; i++) {
  for (let j = 0; j < 30; j++) {
    if (i * j >= 30) {
      console.log('跳出外层循环');
      flag = true;
      break;
    }
  }
  if (flag) break; // 如果 flag 为 true 跳出外层循环。
}
```

还可以使用jslabel来跳出外层循环。

```js
outer: for (let i = 0; i < 30; i++) {
  for (let j = 0; j < 30; j++) {
    if (i * j >= 30) {
      break outer;
    }
  }
}
```

就比如 `asdsd: a = 124;` 这种也属于 label 标记。不是什么其他语法。