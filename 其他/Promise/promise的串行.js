const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("第1个")
        resolve(1)
    }, 1000)
})
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("第2个")
        resolve(2)
    }, 2000)
})

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("第3个")
        resolve(3)
    }, 3000)
})

const arr = [promise1, promise2, promise3];
// 怎么让如上promise顺序执行，即串行

// reduce方法 + promise
function setPromise(arr) {
    arr.reduce((pre, cur) => {
        return pre.then(cur)
    }, Promise.resolve())
}
// 第二个参数是默认值
// 第一次执行， pre 就是 Promise.resolve()，cur是promise1
// 如果没有默认值，pre = promise1, cur = promise2，不传默认值也不影响，主要是用Promise.resolve()作为默认值就一定会有then方法，避免传入的不是Promise
// 第二次执行，pre是promise.resolve().then(promise1)，cur是promise2
// 第三次执行, pre是promise.resolve().then(promise1).then(promise2), cur是promise3
setPromise(arr)

// async / await 方法
const fn = async function (arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        var result = await arr[i]
        console.log(result)
    }
}

fn(arr)

// reduce + async/await
async function setPromise(arr) {
    arr.reduce((pre, cur) => {
        await pre;
        return cur();
    }, Promise.resolve())
}

// 递归
function promiseQueue(list, index = 0) {
    const len = list.length
    if (index >= 0 && index < len) {
        // 不能完全保证list[index]是一个promise，应该从代码的层面保护，加一层Promise.resolve(list[index]).then(()=>)
        list[index]().then(() => {
            promiseQueue(list, index + 1)
        })
    }
}
promiseQueue(arr)
