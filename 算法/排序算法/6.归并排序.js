// https://s1.ax1x.com/2020/04/11/GqVqdP.png

/* 先分解，再合并（分治思想的典型应用） */
function mergeSort(arr) {
    let len = arr.length;
    //等于1时跳出递归，也就是不进行merge逻辑了。。因为只有1个还比什么，自己就是最小的
    if (len === 1) {
        return arr;
    }
    //从中间开始分解，并构造左右数组
    let middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);

    //递归分解，递归不是父子作用域关系，不会覆盖之前的同名值
    let leftValue = mergeSort(left);
    let rightValue = mergeSort(right);
    return merge(leftValue, rightValue);
}

//数组的合并函数，将左右两个有序数组合并成有序数组返回
function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            // 为什么要shift？因为left[0]在第一个，当然是shift了，最终组成的res就是升序的了
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    //只剩左数组或右数组时按顺序push就行了
    while (left.length)
        result.push(left.shift());
    while (right.length)
        result.push(right.shift());

    return result;
}

console.log(mergeSort([2, 1, 4, 8, 7, 3]))
