// 注意。也不是二分法，和上题类似，设头尾两个指针，从头尾开始是因为相差越远乘积越小
// 1,2,3,3.4  2x4 3x3
function FindNumbersWithSum(array, sum) {
    if (array.length < 2)
        return [];
    var plow = 0,
        pHeight = array.length - 1;
    while (plow < pHeight) {
        if (array[plow] + array[pHeight] < sum) {
            plow++;
        } else if (array[plow] + array[pHeight] > sum) {
            pHeight--;
        } else {
            return [array[plow], array[pHeight]];
        }
    }
    return [];
}