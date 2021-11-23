// 是直接插入排序的另外一个升级版, 实质就是分组插入排序
function shellSort(arr) {
    let len = arr.length,
        gap = 1,
        current,
        preIndex;
    while (gap < len / 3) {          //动态定义间隔序列，注意这里是while
        gap = gap * 3 + 1;
    }
    //第一层是逐步减gap
    while (gap > 0) {
        //里面的两层循环是插入排序
        for (let i = gap; i < len; i++) {
            current = arr[i];
            preIndex = i - gap;
            while (preIndex >= 0 && current < arr[preIndex]) {
                arr[preIndex + gap] = arr[preIndex];
                preIndex = preIndex - gap
            }
            arr[preIndex + gap] = current;
        }
        // 缩小gap，比如从5到2
        gap = Math.floor(gap / 3)
    }
    return arr;
}
var arr = [3, 44, 38, 5, 47, 15];
console.log(shellSort(arr));//[3, 5, 15, 38, 44, 47]