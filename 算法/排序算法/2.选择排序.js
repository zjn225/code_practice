// 思路：（扑克牌排序）找到数组中的最小值，并将其放到第一位，然后找到第二小的值放到第二位……以此类推。定一个（而不是j和j+1两两相比），和冒泡一样是向后扫描
function selectionSort(arr) {
    let len = arr.length;
    let minIndex;
    for (let i = 0; i < len - 1; i++) {
        // 从数组的当前项开始，因为左边部分的数组项已经被排序。
        // 先定死minIndex，然后for循环找出比minIndex小的中最小的就交换
        minIndex = i;
        // 类似冒泡排序，冒泡是后面的不用比，所以在len后面-1-j，而这个是前面的不用比，所以在j处操作
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                min = j;
            }
        }
        [arr[min], arr[i]] = [arr[i], arr[min]];
    }
    return arr;
}

selectionSort([2, 4, 1, 7, 5])
//第一轮，minIndex=i=0，i后面的每一项都和arr[minIndex]比。[1,4,2,7,5]
//第二轮，定死minIndex=i=1 . [1,2,4,5,7]
//........