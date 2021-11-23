/** 特点
 * 
 * 逐步接收参数，并缓存供后期计算使用
 * 不立即计算，延后执行
 * 符合计算的条件，将缓存的参数，统一传递给执行方法
 * 
 * (说白点不执行的方法就是一直return function，如function(){ return (next) => (reducer, initialState) => {...} })
 */

function curry(fn, ...outerArgs) {
    //除去参数fn之外的，即外部参数
    return function (...innerArgs) {
        //这里的参数是为了得到这个匿名函数的参数组成的数组
        return fn.apply(null, [...outerArgs, ...innerArgs]) // apply自带扁平
    }
}

function add(num1, num2) {
    return num1 * num2
}

let curriedAdd = curry(add, 5); //args是[5]，这个时候还没执行到回调函数那里
alert(curriedAdd(3))   //innerArrays是[3]，再次执行，就执行到了回调函数了，相当于add(5, 3)

// -------------------------------------------栗子2------------------------------------------------
function add(...arg) {
    let sum = 0;
    arg.forEach(v => sum += v)
    return sum;
}

function currying(fn) {
    // 第一次执行只为接收fn
    let allArgs = []; // 始终被引用，闭包
    // next函数则为以此接收剩余的所有参数
    let next = (...args) => {
        // 有参数则接收，同时返回内部函数本身，方便下次继续调用
        if (args.length > 0) {
            allArgs = allArgs.concat(args);
            return next;
        } else {
            return fn.apply(null, allArgs);
        }
    }
    return next;
}

const curryAdd = currying(add)
// 不能同时执行两条，因为同一个方法, allArg共用，当然实际生产清一下就行
// curryAdd(1)(2)(3)(4)();
curryAdd(1)(2, 3)(4)();

// -------------------------------------------栗子3------------------------------------------------

// https://segmentfault.com/q/1010000004342477
// 实现add(1)(2, 3)(4)(5) = 15
// 注意哦！这里args就是被引用的变量，和fn构成了闭包
function add(...arg) {
    let sum = 0;
    arg.forEach(v => sum += v)
    return sum;
}

function currying(fn) {
    // 第一次执行只为接收fn
    let allArgs = []; // 始终被引用，闭包
    // next函数则为以此接收剩余的所有参数
    let next = (...args) => {
        // 有参数则接收，同时返回内部函数本身，方便下次继续调用
        if (args.length > 0) {
            allArgs = allArgs.concat(args);
            return next;
        } else {
            return fn.apply(null, allArgs);
        }
    }
    // 当一个对象转换成原始值时，先查看对象是否有valueOf方法，如果有并且返回值是一个原始值， 那么直接返回这个值，否则没有valueOf或返回的不是原始值，那么调用toString方法，返回字符串表示
    // toString会在最后被触发
    next.toString = () => {
        return fn.apply(null, allArgs);
    }
    return next;
}

const curryAdd = currying(add)
curryAdd(1)(2, 3)(4);
