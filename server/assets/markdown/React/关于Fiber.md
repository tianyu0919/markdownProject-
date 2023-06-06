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

React引入这两个API，是为了优化组件的性能和用户体验。例如，React Fiber架构中的调度器就利用了requestIdleCallback来在浏览器空闲时调度组件的更新，避免了长时间的任务阻塞主线程。

## requestIdleCallback

`requestIdleCallback` 会在网页渲染完成后，`CPU` 空闲时执行，不一定每一帧都执行。

`requestIdleCallback` 不适合执行 `DOM` 操作，因为修改了 `DOM` 之后下一帧不一定会触发修改。
`
## requestAnimationFrame

**requestAnimationFrame每次渲染都执行，高优**，页面的渲染是一帧一帧进行的，至少每秒60次（即16.6ms一次）才能肉眼感觉到流畅。所以，网页动画也要这个帧率才能流畅。

用JS来控制时间是不靠谱的，因为JS执行本身还需要时间，而且JS和DOM渲染线程互斥。所以ms级别的时间会出现误差。`requestAnimationFrame`就解决了这个问题，浏览器每次渲染都会执行，不用自己计算时间。


`requestAnimationFrame` 和 `requestIdleCallback` 都是宏任务，它们比 `setTimeout` 更晚触发。

## 使用场景

`requestAnimationFrame` 可用于网页动画。

`requestIdleCallback` 可用于一些低优先级的场景，以代替 `setTimeout` 。例如发送统计数据。但请注意 `requestIdleCallback` 的浏览器兼容性。