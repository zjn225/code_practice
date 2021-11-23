// 例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。给一个数组，返回它的最大连续子序列的和

function FindGreatestSumOfSubArray(array) {
    let max = array[0],
        total = array[0];
    for (let i = 1; i < array.length; i++) {
        if (total <= 0) {
            total = array[i];
        } else {
            total += array[i];
        }
        max = Math.max(max, total);
    }
    return max;
}

FindGreatestSumOfSubArray([6, -3, -2, 7, -15, 1, 2, 2])

// max,total 6 3
// max,total 6 1
// max,total 8 8
// max,total 8 -7
// max,total 8 1
// max,total 8 3
// max,total 8 5