/**
 *   区间用长度为2的数字数组表示，如[2, 5]表示区间2到5（包括2和5）；
 *   区间不限定方向，如[5, 2]等同于[2, 5]；
 *   实现`getIntersection 函数`
 *   可接收多个区间，并返回所有区间的交集（用区间表示），如空集用null表示
 * 示例：
 *   getIntersection([5, 2], [4, 9], [3, 6]); // [4, 5]
 *   getIntersection([1, 7], [8, 9]); // null
 */

// 前奏：求多个数组的交集（注意，是数组，而不是区间）
function intersect(...args) {
    if (args.length === 0) {
        return [];
    }

    if (args.length === 1) {
        return args[0];
    }

    return args.reduce((pre, cur) => {
        // [1,2,3].filter(item => [4,3,2].includes(item)) = [2,3]
        // [2,3].filter(item => [7,8,3,2].includes(item)) = [2,3]
        return pre.filter(item => cur.includes(item));
    })
}

console.log(intersect([1, 2, 3], [4, 3, 2], [7, 8, 3, 2])); // [2,3]

// 正式：求多个区间的交集
function getIntersection(...arg) {
    // 排序
    arg = arg.map(item => item.sort((a, b) => {
        return a - b;
    }))

    let left = -Infinity;
    let right = Infinity;
    // 左边而言，取所有数组的最大值；右边而言，取所有数组的最小值
    arg.forEach(item => {
        const [start, end] = item;
        left = Math.max(left, start);
        right = Math.min(right, end);
    })

    if (left > right) return null;
    return [left, right]
}

console.log(getIntersection([2, 5], [4, 9], [3, 6])); // [4,5]
console.log(getIntersection([1, 7], [8, 9])); // null