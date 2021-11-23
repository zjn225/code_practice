function bubbleSort(arr) {
    let len = arr.length;
    // len-1是因为j和j+1比，如果len，那么数组就溢出了
    for (let i = 0; i < len - 1; i++) {
        // 遍历数组的前len-i项！！！忽略后面的i项（已排序部分）。
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {        // 相邻元素两两对比
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }
    }
    return arr;
}

bubbleSort([2, 4, 1, 7, 5])  //  n2 n n2

// n2 n n2

function selectionSort(arr) {
    let len = arr.length;
    let minIndex;
    for (let i = 0; i < len - 1; i++) {
        // 从数组的当前项开始，因为左边部分的数组项已经被排序。
        //先定死minIndex，然后for循环找出比minIndex小的中最小的就交换
        minIndex = i;
        //类似冒泡排序，冒泡是后面的不用比，所以在len后面-1-j，而这个是前面的不用比，所以在j处操作
        //一样的道理，j是从i+1开始，所以len-1
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                min = j;
            }
        }
        [arr[min], arr[i]] = [arr[i], arr[min]];
    }
    return arr;
}

selectionSort([2, 4, 1, 7, 5])  // n2 n2 n2 

// n2 n2 n2


function insertionSort(arr) {
    let len = arr.length;
    let preIndex, current;
    //第一个是有序序列，第二个开始才是无序序列,所以从i=1开始
    for (let i = 1; i < len; i++) {
        current = arr[i]; //当前元素，这个变量是要依次和前面的所有比较的，而且最后还要修复arr[preIndex+1]的指针
        preIndex = i - 1; //上一个元素的索引，之所以不写值，是因为要不断-1，与current比较
        //当cur小于前一个时，和前面的每一个进行比较
        while (preIndex >= 0 && current < arr[preIndex]) {
            arr[preIndex + 1] = arr[preIndex]; //比current大的放后面，第一次交换current才等于arr[preIndex+1]，后面就不一样了,很重要的是
            //arr[preIndex]指哪里去了，最后赋值current修复了arr[preIndex+1]的指针
            preIndex--;
        }
        arr[preIndex + 1] = current;
        //循环完毕，得到了适合的位置,修复了arr[preIndex+1]的指针
        //如果current>arr[preIndex]，那么arr[preIndex]是等于current
    }
    return arr;
}

insertionSort([2, 4, 1, 7, 5])  // n2 n n2

// n2 n n2 

function shellSort(arr) {
    let len = arr.length,
        current,
        preIndex,
        gap = 1;
    while (gap < len / 3) {          //动态定义间隔序列，注意这里是while
        gap = gap * 3 + 1;
    }
    //第一层是逐步减gap
    for (gap; gap > 0; gap = Math.floor(gap / 3)) { //逐步减小gap直到gap=0
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
    }
    return arr;
}
var arr = [3, 44, 38, 5, 47, 15];
console.log(shellSort(arr)); 

// nlogn nlogn2 nlogn2

function mergeSort(arr) {
    let len = arr.length;
    //等于1时跳出递归
    if (len === 1) {
        return arr;
    }
    //从中间开始分解，并构造左右数组，和快排的起点和终点不同
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
        //刚开始指针都在最左边
        if (left[0] <= right[0]) {
            //shift相当于指针右移了
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

// nlogn nlogn nlogn

function quickSort(arr, left, right) {
    var len = arr.length,                                                                                                                                     
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;
    // 不能用right=right||0，因为递归时是可能会传入0的
    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
}

function partition(arr, left, right) {
    var pivot = left,                      //设定基准值（pivot）
        index = pivot + 1;                // indexx的默认值
    // 每个值分别和基准值比较，小于基准值则和index交换，最后index再和pivot交换，这样pivot左边的就全是最小的了
    // 小于基准值后index++是因为已经index前面的表示的就是比pivot小的,index本身是没有判断的，所以返回-1
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {           
            swap(arr, i, index); 
            index++;
        }
    }
    swap(arr, pivot, index - 1);
    return index - 1;
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

console.log(quickSort([6, 4, 8, 12, 5, 2]))  // nlogn nlogn n2


function binarySearch(arr, target) {
    //这里的low和hight指的都是下标
    var low = 0,
        high = arr.length - 1;
    while (low <= high) {
        var mid = Math.floor((high + low) / 2);
        if (target == arr[mid]) {
            return mid;
        } else if (target > arr[mid]) {
            low = mid + 1;
        } else if (target < arr[mid]) {
            high = mid - 1;
        } else {
            return -1;
        }
    }
}

var res = binarySearch([1, 2, 3, 4, 5, 6, 7, 8], 7)
console.log("res", res)

// 递归方式
function binary_search2(arr, low, high, target) {
    // 区别是加多一个离开递归的条件
    if (low > high) {
        return -1;
    }
    var mid = Math.floor((high + low) / 2);
    if (arr[mid] == target) {
        return mid;
    } else if (target < arr[mid]) {
        high = mid - 1;
        return binary_search2(arr, low, high, target);
    } else if (target > arr[mid]) {
        low = mid + 1;
        return binary_search2(arr, low, high, target);
    }
}
