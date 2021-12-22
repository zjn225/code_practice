Promise.retry = async (fn, times) => {
    while (times > 0) {
        try {
            const res = await fn()
            console.log(res)
            return
        } catch (e) {
            console.log('try again...')
            times--
        }
    }
    console.log('Error: No more times, now rejected.')
}



// 方法2：在 catch () 中递归执行函数  不推荐
Promise.retry = function (fn, times) {
    fn().then(res => {
        console.log(res)
    }).catch(e => {
        if (times > 0) {
            console.log('try again...')
            Promise.retry(fn, times - 1)
        } else {
            console.log('Error: No more times, now rejected.')
        }
    })
}

// 测试
const test = function () {
    return new Promise((resolve, reject) => {
        reject(new Error(num))
    })
}

Promise.retry(test, 5)