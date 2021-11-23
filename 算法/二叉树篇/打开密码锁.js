
/*
你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。每个拨轮可以自由旋转：例如把 '9' 变为  '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。
锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。
列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。
字符串 target 代表可以解锁的数字，你需要给出最小的旋转次数，如果无论如何不能解锁，返回 -1。

题目中描述的就是我们生活中常见的那种密码锁，若果没有任何约束，最少的拨动次数很好算，就像我们平时开密码锁那样直奔密码拨就行了。
但现在的难点就在于，不能出现 deadends，应该如何计算出最少的转动次数呢？
*/

// 将 s[j] 向上拨动一次
const plusOne = (s, index) => {
    let arr = s.split('')
    let curr = arr[index]
    if (curr === '9') {
        arr[index] = '0'
    } else {
        arr[index] = +arr[index] + 1
    }
    return arr.join('')
}

// 将 s[i] 向下拨动一次
const minusOne = (s, index) => {
    let arr = s.split('')
    let curr = arr[index]
    if (curr === '0') {
        arr[index] = '9'
    } else {
        arr[index] = +arr[index] - 1
    }
    return arr.join('')
}

const openLock = function (deadends, target) {

    let q = []
    let visited = new Set()
    // 转动次数
    let step = 0
    // 设置初始值
    q.push('0000')
    visited.add('0000')

    // 老BFS套路了，多了个deadends的判断 以及 分别加减当前数字入队的操作
    while (q.length) {
        let size = q.length
        while (size--) {
            let currNode = q.shift()
            if (deadends.includes(currNode)) continue
            if (currNode === target) {
                return step
            }
            // 开始遍历当前数字的每一个值，为每个j分别加减一次，如果不在visited里，则入队q
            for (let j = 0; j < currNode.length; j++) {
                let plusNode = plusOne(currNode, j)
                // 比如0000, 0 经过plusOne后 1000
                if (!visited.has(plusNode)) {
                    q.push(plusNode)
                    visited.add(plusNode)
                }

                let minusNode = minusOne(currNode, j)
                if (!visited.has(minusNode)) {
                    q.push(minusNode)
                    visited.add(minusNode)
                }
            }
        }
        // 如果穷举完都没找到目标密码，那就是找不到了
        step++
    }

    return -1
};

openLock(["0201","0101","0102","1212","2002"], "0202") // 6