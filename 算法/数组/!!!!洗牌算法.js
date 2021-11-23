// 简单版本，实际上不均匀
let tempArr = [1, 2, 3, 4, 5, '6', 7, '8', 'a', 'b', 'z'].sort(function () {
    return Math.random() > 0.5 ? -1 : 1;
})


// 时间复杂度为O（n）的经典乱序算法
function shuffle(arr) {
    let n = arr.length;
    let newArr = [];
    while (n) {
        // 随机获取一个数组下标
        let key = Math.floor(Math.random() * n--);
        // 把该随机下标对应的值push到新数组里面，原数组删除该值，不删除可能会有重复的
        newArr.push(arr.splice(key, 1)[0]);
    }
    return newArr;
}

shuffle([1, 2, 3, 4, 5, 6])
