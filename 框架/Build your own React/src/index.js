/* 搞起几个问题
* 何时执行createElement？ 最开始babel发现jsx就会自动执行
* 何时执行render？按道理是作用域最外层的workLoop最先执行，但是其实是render先执行，然后再执行workLoop，为什么？
* 何时执行workLoop？ 浏览器有空就会自动执行workLoop
* 跟踪wipRoot的变化，child是什么时候添加进去的？reconcileChildren里
*/

// 返回一个element，类型是对象，用来描述dom
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}

// 根据fiber创建dom
function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
}

const isEvent = key => key.startsWith("on"); // 是否事件
const isProperty = key => key !== "children" && !isEvent(key); // 是否属性
const isNew = (prev, next) => key => prev[key] !== next[key]; // 是否新属性：新老节点的属性不同
const isGone = (prev, next) => key => !(key in next); // 是否新节点：新节点的没有的key就是新节点

// 小知识点：这里为什么要用柯里化，因为在filter第一个参数里
// arr.filter(isEvent) 等价于 arr.filter((key, value, arr) => isEvent(key, value, arr))
// arr.filter(isNew(p, n)) 等价于 arr.filter((key, value, arr) => {isNew(p, n)((key, value, arr))})

/* 入参栗子
{
  dom: h1,
  prevProps: {},
  nextProps: {
    onClick: () => {},
    style: "user-select: none",
    children: [
      {
        type: "TEXT_ELEMENT",
        props: {
          nodeValue: "Count: ",
          children: [],
        }
      },
      {
          nodeValue: "1",
          children: []
      }
    ]
  }
}

{
  dom: text,
  prevProps: {},
  nextProps: {
    nodeValue: "Count: ",
    children: []
  }
}

{
  dom: text,
  prevProps: {},
  nextProps: {
    nodeValue: 1,
    children: []
  }
}

*/

// 移除旧props的事件监听和属性 + 增加新props的事件监听和属性
function updateDom(dom, prevProps, nextProps) {
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = "";
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

/*每完成一个任务单元都把节点添加到 DOM 上。请记住，浏览器是可以打断渲染流程的，如果还没渲染完整棵树就把节点添加到 DOM，
用户会看到残缺不全的 UI 界面，给人一种很不专业的印象，这肯定不是我们想要的。因此需要重构节点添加到 DOM 这部分代码，整棵树（fiber）渲染完成之后再一次性添加到 DOM，
即 React commit 阶段。*/
function commitRoot() {
  console.log('开始commit', { wipRoot });
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  // 当 fiber 是函数组件时节点不存在 DOM，故需要遍历父节点以找到最近的有 DOM 的节点
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, domParent);
  }
  // 递归子节点和兄弟节点
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    // 当 child 是函数组件时不存在 DOM，故需要递归遍历子节点找到真正的 DOM
    commitDeletion(fiber.child, domParent);
  }
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  };
  deletions = [];
  nextUnitOfWork = wipRoot; // 默认赋值根节点
  console.log('render', { wipRoot, element, container, nextUnitOfWork });
}

let nextUnitOfWork = null; // concurrent Mode并发模式需要拆分工作单元, 就是Fiber节点
let currentRoot = null; // reconcile对比新旧fiber差异的时候，需要保存上一次渲染之后的fiber树；同时，给每个 fiber 节点添加 alternate 属性，指向上一次渲染的 fiber
let wipRoot = null; // 跟踪渲染进行中的根fiber
let deletions = null; // 需要删除的fiber

// Concurrent Mode 并发模式
// 把 render 拆成更细分的单元，每完成一个单元的工作，允许浏览器打断渲染响应更高优先级的的工作，这个过程即 “并发模式”。
function workLoop(deadline) {
  console.log('workLoop-------');
  let shouldYield = false;

  // 只在空闲时间渲染
  // 如果有下一个工作单元 && 浏览器是空闲的
  while (nextUnitOfWork && !shouldYield) {
    console.log('浏览器有空了，开始执行');
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 执行工作单元，同时返回下一个工作单元
    // 回调函数入参 deadline 可以告诉我们在这个渲染周期还剩多少时间可用
    // 剩余时间小于1毫秒就退出回调，等待浏览器再次空闲，是true，浏览器空闲时间不够了，需要执行其他更高优先级的任务，此时会中断渲染
    shouldYield = deadline.timeRemaining() < 1;
  }

  // 没有任务了，提交整颗fiber树，开始生成dom
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  // 通过requestIdleCallback进行workLoop的递归，浏览器会在合适的时候中断任务的执行，去执行其他更高优先级的任务
  requestIdleCallback(workLoop);
}

console.log('作用域最外层，开始执行requestIdleCallback');
// 这里是初次调用， 一旦浏览器空闲，就触发执行单元任务
requestIdleCallback(workLoop);

// 执行工作单元（返回下一个工作单元）具体怎么拆分任务？答案是Fibers
function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  // 有子节点直接返回, 作为下一个工作单元
  if (fiber.child) {
    return fiber.child;
  }
  // 没有子节点则找兄弟节点，兄弟节点也没有找父节点的兄弟节点，循环遍历直至找到为止
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

let wipFiber = null; // 进行渲染中的 fiber 节点
let hookIndex = null; // 当前 hook 的索引，以支持同一个函数组件多次调用 useState

// 渲染函数式组件
function updateFunctionComponent(fiber) {
  debugger;
  wipFiber = fiber; // 更新进行中的 fiber 节点
  hookIndex = 0; // 重置 hook 索引
  wipFiber.hooks = []; // 新增 hooks 数组以支持同一个组件多次调用 useState
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

// 渲染原生标签组件
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}

function useState(initial) {
  // alternate 保存了上一次渲染的 fiber 节点
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial, // 第一次渲染使用入参，第二次渲染复用前一次的状态
    queue: [] // 保存每次 setState 入参的队列
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action(hook.state);
  });

  const setState = action => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

// 对比新旧fiber
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child; // 上次渲染完成之后的fiber节点
  let prevSibling = null;

  // 开始遍历新fiber
  // 判断新旧fiber的type是否一样，得出当前是添加、删除还是更新，从而得出新的fiber结构
  while (index < elements.length || oldFiber != null) {
    const element = elements[index]; // 本次需要渲染的子元素
    let newFiber = null;

    const sameType = oldFiber && element && element.type == oldFiber.type;

    // 同类型节点，只需更新节点 props 即可
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom, // 复用旧节点的 DOM
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE" // 新增属性，在提交/commit 阶段使用
      };
    }
    // 不同类型节点且存在新的元素时，创建新的 DOM 节点
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT" // PLACEMENT 表示需要添加新的节点
      };
    }
    // 不同类型节点，且存在旧的 fiber 节点时，需要移除节点
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    // 更新oldFiber为下一个旧 fiber 节点
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    // 父节点只链接第一个子节点
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      // 兄节点链接弟节点
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

const Didact = {
  createElement,
  render,
  useState
};

/** @jsx Didact.createElement */
// babel编译的时候，里面返回的jsx会走createElement方法, 入参都是babel那里传入的
function Counter() {
  const [state, setState] = Didact.useState(1);
  return (
    <h1 onClick={() => setState(c => c + 1)} style="user-select: none">
      Count: {state}
    </h1>
  );
}

const element = <Counter />;
const container = document.getElementById("root");
console.log('createElement结束', { element, container });
Didact.render(element, container);
