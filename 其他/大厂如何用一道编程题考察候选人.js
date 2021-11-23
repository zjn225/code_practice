// 假设本地机器无法做加减乘除运算，需要通过远程请求让服务端来实现。
// 以加法为例，现有远程API的模拟实现 （远程就是异步的意思了）

const addRemote = async (a, b) => new Promise(resolve => {
    setTimeout(() => resolve(a + b), 1000)
});

// 请实现本地的add方法，调用addRemote，能最优的实现输入数字的加法。
//async function add(...inputs) {
// 你的实现
//}

// 请用示例验证运行结果:
// add(1, 2)
//     .then(result => {
//         console.log(result); // 3
//     });


add(1, 4, 7, 10)
    .then(result => {
        console.log(result); // 10
    })



// 方法1：
async function add(...args) {
    let res = 0;
    if (args.length === 0) return 0;
    if (args.length === 1) return args[0];

    // 这里很巧妙！因为addRemote只接受2个参数，通过这个方法来实现累加
    for (const item of args) {
        res = await addRemote(res, item);
    }
    return res;
}

// 方法2：递归
async function add(...args) {
    let res = 0;
    if (args.length === 0) return res;
    if (args.length === 1) return args[0];

    const a = args.pop();
    const b = args.pop();
    args.push(await addRemote(a, b));
    return add(...args);
}

// Promise链式调用版本
async function add(...args) {
    return args.reduce((pre, cur) => {
        return pre.then(res => {
            return addRemote(res, cur);
        });
        // 注意这个初始值，默认值，也就是pre的第一次就是等于这个
    }, Promise.resolve(0));

}

// 优化：分治 + all 
function add(...args) {
    if (args.length <= 1) return Promise.resolve(args[0])
    const promiseList = [];
    while (args.length) {
        const [a = 0, b = 0] = args.splice(0, 2);
        promiseList.push(addRemote(a, b));
    }
    return Promise.all(promiseList).then(results => {
        return add(...results);
    });
}

/**
 * 比如说1,4,7,10
 *
 * while里的ab首先是1,4，然后是7，10, 此时PromiseList是2个，分别是Promise包裹的5,17
 *
 * 然后执行then，result此时是[5, 17]，然后执行add(...result)
 *
 * 此时进入递归，此时ab分别是5,17，此时Promise是一个，为Promise包裹的5,17
 *
 * 然后执行then，result此时是[22], 然后执行add(...result)
 */