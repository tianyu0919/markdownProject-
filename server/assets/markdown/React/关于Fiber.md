# 关于React的Fiber

Fiber也叫纤程，跟Process(进程)、Thread(线程)、Coroutine(协程)同为操作系统中程序的执行过程。

React中Fiber采用了代数效应。代数效应是函数式编程中的概念，用于将副作用从函数调用中分离。

React16版本之前是 Stack Reconciler 栈协调器，栈协调器是没办法中断的。

React16版本之前是只有 Reconciler(协调器)、Renderer(渲染器)。

React16版本即之后是 Fiber Reconciler，有三个节点特征 return 父节点信息。sibling 兄弟节点。children 子节点。

React16版本即之后是新增 Scheduler(调度器)。

**Scheduler(调度器)** 的作用是排序需要更新的优先级，将更高级别的更新，添加到协调器栈中。如果协调器正在Diff算法，发现新的更高的更新，那么调度器会将新的更高级别的更新添加到协调器栈中。

**Reconciler(协调器)** 是用来接受更新，并创建虚拟DOM树，且将需要更新的dom标记上Update。然后将标记了的虚拟DOM交给渲染器。

**Renderer(渲染器)** 是接受到协调器的通知，查看哪些被标记Update的虚拟DOM，然后执行更新DOM操作。

总结：

1. Fiber是React新一代协调（Reconciliation）引擎，同时也是一种数据结构。
2. 一个Fiber代表一个工作单元，可以设置不同的优先级。
3. 基于Fiber，可以用循环的方式遍历组件树，替代了老式递归方式的遍历。


React 16版本之后使用 Fiber 控制协调器使用的是：requestIdleCallback 和 requestAnimationFrame。

**requestIdleCallback 安排在空闲期间调用低优先级函数， requestAnimationFrame 安排在下一个动画帧调用高优先级函数。**

使用这些之后就可以自定义调用堆栈的行为以优化呈现UI，随意中断调用堆栈并手动操作堆栈帧，巨大优势。

React Fiber 的目的就是堆栈的重新实现，专门用于React组件。可以将单个Fiber视为虚拟堆栈框架。

React引入这两个API，是为了优化组件的性能和用户体验。例如，React Fiber架构中的调度器就利用了requestIdleCallback来在浏览器空闲时调度组件的更新，避免了长时间的任务阻塞主线程。

## Fiber的工作原理

Fiber的含义：

1. 静态的数据结构
2. 动态的工作单元
3. 架构

Fiber使用双缓存的工作机制。`current`是当前的`RootFiber`，当有新的更新时，创建一个新的`RootFiber`，他们两个`RootFiber`之间使用`alternate`连接，`current`将会指向新的`RootFiber`，当再次更新时候，基于`alternate`再次创建一个`RootFiber`，且使用Diff算法，更新需要更新的地方，`current`也将指向修改之后的`RootFiber`，以此类推。

Fiber被称为静态的数据结构，又被称为动态的工作单元。它包含了所有的组件类型和状态。

在React中，使用`ReactDom.render()`之后，会生成一个`FiberRootNode`，和`RootFiber`，每调用一次`ReactDOM.render()`都会生成一个`RootFiber(根节点)`，而`FiberRootNode`只会生成一次，`FiberRootNode`是用来管理这些`RootFiber`的。`FiberRootNode.current`指向的是`RootFiber`，他们每个节点都可以当做是一个`Fiber`，`父节点.child`指的是子节点。`节点.sibling`指的是兄弟节点，`子节点.return`指的是父节点，而`RootFiber.stateNode`指向的是`FiberRootNode`。为什么使用`return`当做父节点呢。因为在React16之前，使用的是递归操作。先从根节点递到子节点，然后从子节点一路归到父节点。在`Fiber Reconciler`中使用遍历的形式，实现可中断的递归。所以也复用了这种思想。

## requestIdleCallback

`requestIdleCallback` 会在网页渲染完成后，`CPU` 空闲时执行，不一定每一帧都执行。

`requestIdleCallback` 不适合执行 `DOM` 操作，因为修改了 `DOM` 之后下一帧不一定会触发修改。

## requestAnimationFrame

**requestAnimationFrame每次渲染都执行，高优**，页面的渲染是一帧一帧进行的，至少每秒60次（即16.6ms一次）才能肉眼感觉到流畅。所以，网页动画也要这个帧率才能流畅。

用JS来控制时间是不靠谱的，因为JS执行本身还需要时间，而且JS和DOM渲染线程互斥。所以ms级别的时间会出现误差。`requestAnimationFrame`就解决了这个问题，浏览器每次渲染都会执行，不用自己计算时间。


`requestAnimationFrame` 和 `requestIdleCallback` 都是宏任务，它们比 `setTimeout` 更晚触发。

## 使用场景

`requestAnimationFrame` 可用于网页动画。

`requestIdleCallback` 可用于一些低优先级的场景，以代替 `setTimeout` 。例如发送统计数据。但请注意 `requestIdleCallback` 的浏览器兼容性。