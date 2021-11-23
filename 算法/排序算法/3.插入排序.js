// 对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。向前扫描,通俗点来说，后面的要依次和它前面的比，一旦比自己小就要交换

function insertionSort(arr) {
    let len = arr.length;
    let preIndex, current;
    //第一个因为只有一个肯定是有序序列，第二个开始才是无序序列,所以从i=1开始
    for (let i = 1; i < len; i++) {
        current = arr[i]; //当前元素，这个变量是要依次和前面的所有比较的，而且最后还要修复arr[preIndex+1]的指针
        preIndex = i - 1; //current的上一个元素的索引，之所以不写值，是因为要不断-1，与current比较
        //cur和前面的每一个进行比较, cur 小于 前一个元素时，则 前一个元素 向前走一步
        while (preIndex >= 0 && current < arr[preIndex]) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
        //循环完毕，得到了适合的位置,修复了arr[preIndex+1]的指针，为什么要修复，不然current和别人一直比较，然后别人往后走，那他自己要去何处？arr[preIndex+1]就是current最后要去的位置
        //如果current>arr[preIndex]，也就是preIndex没--，那么arr[preIndex+1]本来就是等于current
    }
    return arr;
}

insertionSort([2, 4, 1, 7, 5])  //[1,2,4,5,7]

/**
 * current = arr[2] = 1，preIndex = 1 为例
 *
 * arr[2] = 4, preIndex = 0
 * arr[1] = 2, preIndex = -1
 * arr[0] = 1
 */