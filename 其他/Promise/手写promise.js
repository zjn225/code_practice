// 简化版本（不支持异步、不支持链式等）
class Promise {
    constructor(executor) {
        // Promise的内部状态
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        // Promise的内部方法
        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
            }
        };
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
            }
        };
        try {
            // 在executor里面将会执行resolve，reject，进而改变state、value、reason状态
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    then(onFulfilled, onRejected) {
        // 状态为fulfilled，执行onFulfilled，传入成功的值
        if (this.state === 'fulfilled') {
            onFulfilled(this.value);
        };
        // 状态为rejected，执行onRejected，传入失败的原因
        if (this.state === 'rejected') {
            onRejected(this.reason);
        };
    }
}
/* 一般而言就写这个简易版，然后说一下如果要A+规范，还需要做到哪些
* 1.then要支持值穿透, 在then方法里，对两个回调判断，如果是空值，则返回当前状态value / reason
* 2.如果executor里面有异步逻辑，在then方法里，如果是pending状态，统统放到一个数组里暂存，等之后
* 3.链式调用的支持，then方法里会返回一个新的promise
*/


// A+规范版本
/* 
     1、Primise构造函数
    （1）constructor（构造方法）部分
        - 状态、成功失败两个状态的变量以及状态对应回调函数 ，5个
        - resolve方法
        - reject方法
        - 执行传入的excutor(resolve, reject)方法, 执行的时候就必然会触发到以上的resolve和reject方法了
    （2）then和catch方法部分    
        - 成功和失败回调的存储，以及在调用时机
        - then要支持值穿透
        - then要支持链式调用，所以里面会新建一个promise2并返回
        
*/
class Promise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        // 之所以用数组存储回调，是为了解决异步实现；因为new Promise的函数体excutor里面可能会有异步的操作，此时如果执行then的话state还是pending等待状态 
        // 我们就需要在then调用的时候，在pending的时候将成功和失败存到各自的数组，一旦excutor的异步任务结束，就会执行reject或者resolve，这个时候就能遍历这两个数组来执行回调队列
        // 当然如果没有异步，那么自然就用不到这些数组，因为没有异步，执行executor的时候状态直接就变更了，初始化后才能执行then，此时then里就不存在pending状态了
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = value => {
            // 只能由pending状态 => fulfilled状态 (避免调用多次resolve reject)
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };
        let reject = reason => {
            // 只能由pending状态 => rejected状态 (避免调用多次resolve reject)
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };
        // 捕获在excutor执行中抛出的异常，栗子如下
        // new Promise((resolve, reject) => {
        //     throw new Error('error in excutor')
        // })
        try {
            // 执行executor的时候，把resolve和rejected方法传了进去，这就是为什么能在new Promise调用resolve的原因
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    then(onFulfilled, onRejected) {
        // 处理值穿透，如then().then(v=>alert(v))，把then的实参留空且让值可以穿透到后面
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        // 之所以这么大费周章，而不是直接执行onFulfilled或onRejected，是因为要支持链式调用！！！
        // 就是说在then方法里，返回的就是promise（promise2赋值的），这样就支持链式调用了
        let promise2 = new Promise((resolve, reject) => {
            // 规定onFulfilled或onRejected不能同步被调用，也就是这俩回调只能异步执行,所以这里用setTimeout来异步调用
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    try {
                        // 获取到链式之前的onFulfilled返回值为x，resolvePromise将对x进行类型判断
                        // 为什么要传promise2进去? resolvePromise里主要是为了判断是否循环引用
                        let x = onFulfilled(this.value);
                        // 针对x不同类型的情况 进行处理 （普通值、Promise对象、thenable对象/函数，有then方法的函数或对象），本质上最后还是执行的这个传进去的promise2的resolve方法
                        // ！！！！！！来达到改变promise2内部状态（value、reason）的目的，这样promise2.then的时候，拿到的value就是这个value了，反正就是为了链式调用！
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            };
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            };
            // 异步情况下，执行then的时候，如果是pending，统统加进数组
            // 加进去之后什么时候执行呢，首先加进去的逻辑是会执行resolve的，执行resolve的时候就会遍历数组以此执行then的回调了
            if (this.state === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
            };
        });
        return promise2;
    }
    catch(fn) {
        return this.then(null, fn);
    }
}

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理 （普通值、Promise对象、thenable对象/函数，有then方法的函数或对象）
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值，这个参数是重点
 * @param  {[type]} resolve   promise2的resolve方法，传进来方便更改promise2最后的状态，即value、err
 * @param  {[type]} reject    promise2的reject方法，传进来方便更改promise2最后的状态，即value、err
 */

function resolvePromise(promise2, x, resolve, reject) {
    // 如果从onFulfilled中返回的x 就是promise2本身 就会导致循环引用报错，自己等待自己，一辈子等不完
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 成功和失败只能调用一个 所以设定一个called来防止多次调用
    let called;
    // 如果x是一个对象或者函数 那么他就有可能是promise 需要注意 typeof null也是 object 所以需要排除掉
    // 先获得x中的then 如果这一步发生异常了，那么就直接把异常原因reject掉
    if (x && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            // 如果then是个函数 那么就调用then 并且把成功回调和失败回调传进去；如果then是函数，就默认当作是promise了
            if (typeof then === 'function') {
                // x，因为x.then是个函数，那么x就认为是promise了，也就是Promise作为上下文，执行then方法，y为成功或失败的值
                // 开始执行then方法，结果可能有可能仍然是promise，所以需要递归调用resolvePromise这个方法 直到返回值不是一个promise
                // 至于为什么用call，因为then.xxx时，this是window而不是Promise本身了，用了call之后相当于x.then(y => {})
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                })
                // 如果x有then，但是又不是对象或函数，那么也直接把x作为promise2的成功value resolve掉
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        // 如果x是一个普通值 那么就直接把x作为promise2的成功value resolve掉
        resolve(x);
    }
}


// resolve方法
Promise.resolve = (param) => {
    // 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。相当于做了个副本
    if (param instanceof Promise) return param;
    // 如果参数不是promise实例，最终返回的还是一个promise
    return new Promise((resolve, reject) => {
        // 参数是一个thenable对象，执行thenable对象的then方法
        if (param && param.then && typeof param.then === 'function') {
            param.then(resolve, reject);
        } else {
            // resolve，当前promise实例的value值就是param了
            resolve(param);
        }
    })
}

//reject方法
Promise.reject = function (val) {
    return new Promise((resolve, reject) => {
        reject(val)
    });
}

//race方法 
// Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
// 如Promise.race([p1, p2, p3]).then(onFulfilled)，直接for循环遍历数组，然后看谁最先执行到resolve，这个resolve是new Promise这个实例里的方法，resolve之后的value存储在实例里
// 这样之后的.then方法里由于支持链式调用，拿到的就是这个value
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        };
    })
}

//all方法(获取所有的promise，都执行then，把结果放到数组，当i和promises数组的长度一样时，表示传入的所有Promise都处理好了)
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let index = 0;
        let len = promises.length;
        if (len === 0) {
            resolve(result);
            return;
        }
        for (let i = 0; i < len; i++) {
            // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise，包裹后必然会有then方法，因为Promise.resolve方法返回了一层Promise实例
            Promise.resolve(promise[i]).then(data => {
                result[i] = data;
                index++;
                if (index === len) resolve(result);
            }).catch(err => {
                reject(err);
            })
        }
    })
}


// 不管前面的 Promise 是fulfilled还是rejected，都会执行回调函数callback。
// 因为resolve是在实例化构造函数的时候传进去的
Promise.finally = (callback) => {
    // 这个this是当前实例
    return this.then(
        () => Promise.resolve(callback()),
        () => Promise.reject(callback()),
    )
    // return this.then(
    //     value => this.constructor.resolve(callback()).then(() => value),
    //     reason => this.constructor.resolve(callback()).then(() => { throw reason })
    // )
}

// 无论Promise对象的回调链以then方法还是catch方法结尾，只要最后一个方法抛出错误，
// 都有可能无法捕获到。为此，Promise提供了一个done方法，它总是处于回掉链的尾端，保证抛出任何可能出现的错误。
Promise.done = () => {
    this.then(onFulfilled, onRejected).catch(function (error) {
        setTimeout(function () {
            throw error;
        }, 0);
    });
}

Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = Promise;


// 使用
let promise = new Promise((resolve, reject) => {
    console.log('1')
    resolve("这是value") // 更改pending状态为resolved
    reject("这是reason") // 更改pending状态为resolved
})

// 普通的then和catch
promise.then((value) => {
    console.log('success1', value)
}).catch(e => {
    console.log("error", e)
})

// 循环引用实例
let p = new Promise(resolve => {
    resolve(0);
});
let p2 = p.then(data => {
    return p2;
})


// 链式调用实例
// x相当于是1，promise2相当于是p.then(data => {return 1})
// 因为返回的是1，那么直接resolve(1)，1作为promise2的返回值，那么data2就是1了
// 如果return promise()，那么走的逻辑就是最复杂的那一块了
p.then(data => {
    return 1;
}).then(data2 => {
    return 2;
})


