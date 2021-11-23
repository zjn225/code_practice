// ------------------------------------------------------------事件模型------------------------------------------------------------
let Event = {
    // 添加事件
    addEvent(ele, type, handler) {
        if (ele.addEventListener) {
            ele.addEventListener(type, handler, false)
        } else if (ele.attachEvent) {
            ele.attachEvent("on" + type, handler)
        } else {
            ele["on" + type] = handler
        }
    },
    // 移除事件
    removeEvent(ele, type, handler) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, handler)
        } else if (ele.detachEvent) {
            ele.detachEvent("on" + type, handler)
        } else {
            ele["on" + type] = handler
        }
    },
    // 阻止事件冒泡
    stopPropagation(ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation()
        } else {
            ev.cancelBubble = true;
        }
    },
    // 阻止默认事件
    preventDefault(ev) {
        if (ev.preventDefault) {
            ev.preventDefault()
        } else {
            ev.returnValue = false
        }
    },
    // 获取事件对象
    getEvent(ev) {
        return ev ? ev : window.event
    },
    // 获取事件目标
    getTarget(ev) {
        return ev.target ? ev.target : ev.srcElement
    }
}

// ------------------------------------------------------------观察者模式------------------------------------------------------------

//观察者，定义好更新的方法就行
class Observer {
    constructor(fn) {
        this.update = fn
    }
}
//被观察者，定义添加观察者、通知的方法
class Subject {
    constructor() {
        this.observers = []          //观察者队列    
    }
    addObserver(observer) {
        this.observers.push(observer)//往观察者队列添加观察者    
    }
    notify() {                       //通知所有观察者,实际上是把观察者的update()都执行了一遍       
        this.observers.forEach(observer => {
            observer.update()            //依次取出观察者,并执行观察者的update方法        
        })
    }
}

var subject = new Subject()       //被观察者
const update = () => { console.log('被观察者发出通知') }  //收到广播时要执行的方法
var ob1 = new Observer(update)    //观察者1
var ob2 = new Observer(update)    //观察者2
subject.addObserver(ob1)          //观察者1订阅subject的通知
subject.addObserver(ob2)          //观察者2订阅subject的通知
subject.notify()                  //发出广播,执行所有观察者的update方法



// ------------------------------------------------------------发布订阅模式：EventEmitter------------------------------------------------------------

//每次返回this，保证了链式调用
class EventEmitter {
    constructor() {
        // handlers是一个map，用于存储事件与回调之间的对应关系
        this.handlers = {}
    }

    // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
    on(eventName, cb) {
        // 先检查一下目标事件名有没有对应的监听函数队列
        if (!this.handlers[eventName]) {
            // 如果没有，那么首先初始化一个监听函数队列
            this.handlers[eventName] = []
        }

        // 把回调函数推入目标事件的监听函数队列里去, 为什么是push，因为一个事件可能会有多个回调，要按顺序执行
        this.handlers[eventName].push(cb)
        return this
    }

    // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
    emit(eventName, ...args) {
        // 检查目标事件是否有监听函数队列
        if (this.handlers[eventName]) {
            // 如果有，则逐个调用队列里的回调函数
            this.handlers[eventName].forEach((callback) => {
                callback(...args)
            })
        }
        return this
    }

    // 移除某个事件回调队列里的指定回调函数
    off(eventName, cb) {
        const callbacks = this.handlers[eventName]
        const index = callbacks.indexOf(cb)
        if (index !== -1) {
            callbacks.splice(index, 1)
        }
        return this
    }

    // 为事件注册单次监听器
    once(eventName, cb) {
        // 对回调函数进行包装，使其先执行，然后自动被移除
        const wrapper = (...args) => {
            // argc传入的是个数组，如['arg1','arg2']
            cb(...args)
            this.off(eventName, wrapper)
        }
        this.on(eventName, wrapper)
        return this
    }
}
/******************************结束写代码******************************/
var bus = new EventEmitter()

bus.on('test', function (x) { console.log(x) }).emit('test', '你好，这是测试')

bus.once('once', function () { console.log('我不会说两次话') })
bus.emit('once', ['arg1', 'arg2'])
bus.emit('once')

var s = function () { console.log('测试删除，出现一次就成功了') }
bus.on('s', s)
bus.emit('s')
bus.off('s', s)
bus.emit('s')