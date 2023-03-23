# 手写webpack打包工具

相关链接：[手写webpack核心原理](https://juejin.cn/post/6854573217336541192)

当前的目录结构：
<!-- 创建一个如下所示的目录结构，然后 -->
```text
.
|- src
|   |- index.js
|   |- add.js
|   |- minus.js
|   |_ other.js
|- bundle.js
|_ bundle.ejs
```

首先我们需要先解析、转换代码，在 <kbd>bundle.js</kbd> 文件中写入以下的代码：

## 分析模块

### @babel/parser

使用 `@babel/parser` 转换代码成为语法树。AST。

```js
// * 获取主入口文件
const fs = require("fs");
const parser = require("@babel/parser");

const getModuleInfo = (file) => {
  const body = fs.readFileSync(file, "utf-8");

  const deps = {}; // * 用来收集依赖，后面会用到

  // * 转换为代码树
  const ast = parser.parse(body, {
    sourceType: "module", // * 告诉解析器，解析 module 类型
  });

  // console.log(body);
  // console.log(ast);
};

getModuleInfo("./src/index.js");
```

## 收集依赖

### @babel/traverse

遍历AST，将用到的依赖收集起来。什么意思呢？就是将用 `import` 语句引入的文件路径收集起来。将收集起来的路径放进 `deps` 里面。

继续在 `getModuleInfo` 方法中写入以下，需要 `babel` 的 `traverse` 方法。

```js
const traverse = require("@babel/traverse").default; // * 先引入 traverse 方法，下面会用到

const getModuleInfo = (file) => {
  // * pre code
  // * 转换代码树
  traverse(ast, {
    ImportDeclaration({ node }) {
      // console.log(node);
      const dirname = path.dirname(file);
      const abspath = `./${path.join(dirname, node.source.value)}`;
      deps[node.source.value] = abspath;
    },
  });

  // * pre code
};
```

## ES6转ES5(AST)

继续在 `getModuleInfo` 方法中写入以下，需要 `@babel/core` 和 `@babel/preset-env` 包。先下载下来，然后代码：

```js

const babel = require("@babel/core");

const getModuleInfo = (file) => {
  // * pre code

  // * 传入的 ast 是之前使用 parser.parse 转换的Ast语法树。
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  });
  // console.log(code); // * 已经编译成了ES5的代码。

  // * 返回了一个对象，包括模块的路径、模块的依赖、模块转为es5的代码。
  const moduleInfo = { file, deps, code };
  return moduleInfo;
}
```

## 递归获取所有依赖

完成 `getModuleInfo` 方法。

```js
const getModuleInfo = (file) => {
  const body = fs.readFileSync(file, "utf-8");

  // * 转换为代码树
  const ast = parser.parse(body, {
    sourceType: "module",
  });

  const deps = {};

  traverse(ast, {
    ImportDeclaration({ node }) {
      // console.log(node);
      const dirname = path.dirname(file);
      const abspath = `./${path.join(dirname, node.source.value)}`;
      deps[node.source.value] = abspath;
    },
  });

  // * 将ES6代码转换为ES5
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  // console.log(code);

  // * 返回了一个对象，包括模块的路径、模块的依赖、模块转为es5的代码。
  const moduleInfo = { file, deps, code };
  return moduleInfo;
};
```

当前完成的是 `getModuleInfo` 方法，此方法传入一个路径，返回 { file(路径), deps(依赖), code(解析的代码) }。

### 新增递归方法

完成递归获取所有依赖的方法

```js
// * 递归获取所有依赖
const parseModules = (files) => {
  const entry = getModuleInfo(file); // * 解析当前文件获取三样东西
  const temp = [entry];
  for (let i = 0; i < temp.length; i++) {
    const deps = temp[i].deps; // * 拿到每个依赖项中的依赖
    if (deps) { // * 如果有依赖的话 { key: value } 格式
      for (const key in deps) { // * 拿到每个 key
        if (deps.hasOwnProperty(key)) { // * 判断是否有当前的依赖项
          temp.push(getModuleInfo(deps[key])); // * 在重新添加依赖到总体依赖中。
        }
      }
    }
  }
}
```

### 修改存储形式

将 `parseModules` 函数中的代码改一下，如下：

```js
// * 递归获取所有依赖
const parseModules = (file) => {
  const entry = getModuleInfo(file);
  const temp = [entry];
  // * 新增 depsGraph 对象
  const depsGraph = {};
  for (let i = 0; i < temp.length; i++) {
    const deps = temp[i].deps;
    if (deps) {
      for (const key in deps) {
        if (deps.hasOwnProperty(key)) {
          temp.push(getModuleInfo(deps[key]));
        }
      }
    }
  }

  // * new code
  // * 循环解析完成的数据，并添加到刚才的对象中。
  temp.forEach((moduleInfo) => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code
    };
  });
  // console.log(depsGraph);

  return depsGraph;
};
```

### 创建打包入口

新建一个入口方法 `bundle` 然后定义一个入口文件路径。如下：

```js
const ejs = require("ejs"); // * 找到 ejs 模块

const entry = './src/index.js'; // * 获取入口文件

const bundle = (file) => {
  const depsGraph = parseModules(file);

  let template = ejs.render(fs.readFileSync("./bundle.ejs").toString(), {
    modules: depsGraph, // * 传递解析好的代码到模板文件
    entry, // * 传递入口文件路径到模板文件
  });

  console.log(template);
  // * 输出 bundle.js 文件
  fs.writeFile("./bundle.js", template, (err) => {
    if (err) {
      throw err;
    }
  });
};

bundle(entry);
```

因为使用的是 `ejs` 创造模板文件并打包，所以需要先定义 `ejs` 模板文件。

**bundle.ejs**文件：

```ejs
(function(modules){
  const entry = "<%= entry %>" // * 找到入口文件

  /**
   * @param {string} path
   * @returns {object}
   * @description 根据入口文件路径拿到对应的模块
   */
  function require(path) {
    const [moduleFunction, dependencies] = modules[path]; // * 在传进来的modules中，根据入口文件路径拿到对一个主模块的[方法, 依赖项]
    const module = { exports: { } } // * 创建一个模块的全局变量，后续将传递给每个模块的方法中。

    /**
     * @param {string} depsPath
     * @description 拿到模块的依赖项，并赋值给module.exports
     */
    function localRequire(depsPath) {
      const modulePath = dependencies[depsPath];
      return require(modulePath);
    }

    /**
     * @param {object} localRequire
     * @param {object} module.exports
     * @description 将模块的方法赋值给module.exports
     */
    moduleFunction(localRequire, module.exports);
    return module.exports;
  }

  require(entry);
})({
<% Object.keys(modules).forEach(key => { %>
    "<%= key %>": [(require, exports) => { 
      <%- modules[key].code %>
    }, 
    <%- JSON.stringify(modules[key].deps) %>],
<% }) %>
})
```

OK，到此打包文件已经写好了，使用 `node bundle.js` 命令，使用 `node`运行 <kbd>bundle.js</kbd> 就可以了完成打包了。