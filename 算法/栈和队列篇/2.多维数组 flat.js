
// [1, [2, [3, [4, 5]]], 6] -> [1, 2, 3, 4, 5, 6]


// 手写
const flatten = (arr) => {
    let result = [];
    arr.forEach((item, i) => {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));
        } else {
            result.push(arr[i])
        }
    })
    return result;
};

const arr = [1, [2, [3, 4]]];
console.log(flatten(arr));

// reduce写法
let flatten = (nestedList) => nestedList.reduce((pre, cur) =>
    pre.concat(Array.isArray(cur) ? flatten(cur) : cur), []
)

// es10的flat
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

// 扩展运算符
function iterTree2(arr) {
    // 逐级扁平化
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
        console.log(arr);
    }
    return arr;
}

iterTree2([1, [2, [3, 4]]])

// 第一次执行some为true，arr = [1,2,[3,4]]
// 第二次执行some为true，arr = [1,2,3,4]