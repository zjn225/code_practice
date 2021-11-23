
// compose函数返回一个所有函数组合后的函数compose(f, g, h) ==> (...args) => f(g(h(...args)))

function compose(...funcs) {
    if (funcs.length === 1) {
        return funcs[0];
    }
    // 返回一个匿名函数，调用者再加个()才执行
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function M1({ getState, dispatch }) {
    return function (next) {
        return function (action) {
            console.log('A middleware1 开始');
            next(action)
            console.log('B middleware1 结束');
        };
    };
}

const M2 = ({ getState, dispatch }) => next => action => {
    console.log('C middleware2 开始');
    next(action)
    console.log('D middleware2 结束');
}

const M3 = ({ getState, dispatch }) => next => action => {
    console.log('E middleware3 开始');
    next(action)
    console.log('F middleware3 结束');
}


/*
loop1: a = f1, b = f2, ret1 = (...args) => f1(f2(...args))
loop2: a = ret1, b = f3, ret2 = (...args) => ret1(f3(...args)) , 即 ret2 = (...args) => f1(f2(f3(...args)))

相当于：const compost = (...args) => f1(f2(f3(...args)))，返回一个匿名函数
compose(logger, visible, style)(Input); ==> logger(visible(style(Input)))
*/