// 注意：以下的context的作用，如果setTimeout里是function，而不是箭头函数，那么是有用的，因为window.setTimeout，this就是window了
//  如果是箭头函数那么里面的this就是指向外部的this，这个时候可以不用context保存


// ---------------------------------------------------防抖---------------------------------------------------
// 非立即执行版
function debounce(func, wait) {
    let timeout;
    return function (args) {
        const context = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            // 为什么要apply呢，并不是为了改变this，而是利用了apply在执行的时候，会把第二个参数（数组）扁平化传入，比如func(context, [1,2,3]) 等价于 func(1,2,3)
            func.apply(context, args)
        }, wait);
    }
}


// 立即执行版
function debounce(func, wait, immediate = true) {
    let timeout;
    return function (args) {
        const context = this;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            //  一开始的时候还没设置定时器，timer还是null，之后再调用timer就是等于调用次数了
            const callNow = !timeout;
            //  定时器到了后重置timer为null，也就是callNow是true了，又能执行func了
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        }
    }
}

// ---------------------------------------------------节流---------------------------------------------------

// 时间戳版本
function throttle(func, wait) {
    var previous = 0;
    return function (...args) {
        let now = Date.now();
        let context = this;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

// 定时器版
function throttle(func, wait) {
    let timeout;
    return function (args) {
        let context = this;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}

/*
区别：
1、时间戳版本，函数会立即执行
2、定时器版本，函数不会立即执行，在停止触发事件后，函数还会再执行一次。

其实时间戳版和定时器版的节流函数的区别就是，时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候

*/






