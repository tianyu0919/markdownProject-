<!--
 * @Author: tianyu
 * @Date: 2023-02-28 17:25:18
 * @Description: 
-->
# webpack打包方式

> 📝记录：2023年02月28日17:25:47webpack打包方式
> 
> 相关资料: [掘金](https://juejin.cn/post/7203968787325960229)

## umd 格式

`UMD` 是(Universal Module Definition) **通用模块定义的缩写**。`UMD` 是 `AMD` 和 `CommonJS` 的一个糅合。
`AMD` 是浏览器优先，异步加载；`CommonJS` 是服务器优先，同步加载。

`UMD` 同时包含了三种格式，`AMD`、`CommonJS`、和最简单的`window`。

相关配置示例：

```json
{
  output: {
    path: PATH.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
    clean: true,
    library: {
      // name: 'mylib', // * 如果 type 为 module 必须添加 name
      type: 'umd'
    },
    globalObject: 'this' // * 传入全局变量。默认是self
  },
}
```

## AMD

`AMD` 只是一种规范，他需要其他工具的帮助才可以调用。例如 `requestJS` 。
`AMD module` 要求入口 `chunk`（例如，第一个通过`<script>`标签加载的脚本）使用特定的属性来定义, 例如 `define` 与 `require`，这通常由 `RequireJS` 或任何兼容的 `loader`（如almond）提供。否则，直接加载产生的AMD bundle将导致一个错误，如 **define is not defined**。

## Module

`Module` 是ES6的语法，如果需要配置支持 `Module` 的话，则必须要添加 `library.name` 属性，不然会报错，还需要添加一个 `experiments.outputModule` 为 `true`。不然也编译不了。
相关配置如下：

```json
{
  experiments: {
    outputModule: true
  }
  output: {
    path: PATH.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
    clean: true,
    library: {
      name: 'mylib', // * 如果 type 为 module 必须添加 name
      type: 'module'
    },
  },
}
```