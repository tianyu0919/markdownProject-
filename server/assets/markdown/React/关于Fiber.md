# 关于React的Fiber

react 16版本之前是 Stack Reconciler 栈调和器，栈调和器是没办法中断的。

react 16版本之后是 Fiber Reconciler，有三个节点特征 return 父节点信息。sibling 兄弟节点。children 子节点。

总结：

1. Fiber是React新一代调和（Reconciliation）引擎，同时也是一种数据结构。
2. 一个Fiber代表一个工作单元，可以设置不同的优先级。
3. 基于Fiber，可以用循环的方式遍历组件树，替代了老式递归方式的遍历。