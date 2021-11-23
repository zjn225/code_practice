// 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
// 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

/*
例如 ：值如下
[
    [1 2 09 10]
    [3 4 11 12]
    [5 7 12 14]
    [6 9 14 16]
    [7 10 15 19]
]

找14
*/

//arr.length是行数，arr[0].length是列数


function Find(target, array) {
    // 从第一行开始，遍历每一行
    for (let i = 0; i < array.length; i++) {   
        let low = 0,
            high = array[i].length - 1;
        // 遍历每一行的每个元素
        // 为什么是<=，因为初始化right的赋值是nums.length - 1，即最后一个元素的索引，而不是.length
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (target === array[i][mid]) {
                return true
            } else if (target > array[i][mid]) {
                low = mid + 1
            } else if (target < array[i][mid]) {
                high = mid - 1
            } else {
                return false;
            }
        }
    }
}
// low = 0 ; hight = 4; mid = 2;
// low = 1 ; hight = 4; mid = 2;
// low = 2 ; hight = 4; mid = 3;
// low = 3; hight = 4; mid = 3