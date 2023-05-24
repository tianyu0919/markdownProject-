# 关于React的Fiber

react 16版本之前是 Stack Reconciler 栈调和器，栈调和器是没办法中断的。

react 16版本之后是 Fiber Reconciler，有三个节点特征 return 父节点信息。sibling 兄弟节点。children 子节点。

总结：

1. Fiber是React新一代调和（Reconciliation）引擎，同时也是一种数据结构。
2. 一个Fiber代表一个工作单元，可以设置不同的优先级。
3. 基于Fiber，可以用循环的方式遍历组件树，替代了老式递归方式的遍历。


React 16版本之后使用 Fiber 控制调和器使用的是：requestIdleCallback 和 requestAnimationFrame。

**requestIdleCallback 安排在空闲期间调用低优先级函数， requestAnimationFrame 安排在下一个动画帧调用高优先级函数。**

使用这些之后就可以自定义调用堆栈的行为以优化呈现UI，随意中断调用堆栈并手动操作堆栈帧，巨大优势。

React Fiber 的目的就是堆栈的重新实现，专门用于React组件。可以将单个Fiber视为虚拟堆栈框架。


## requestIdleCallback

## requestAnimationFrame