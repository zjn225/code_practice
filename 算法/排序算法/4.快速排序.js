// http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html?bsh_bid=124324679
// （1）在数据集之中，选择一个元素作为"基准"（pivot）。
// （2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
// （3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

// 类似于二叉树的前序遍历
function quick_sort(arr) {
    // 递归结束的条件
    if (arr.length <= 1) {
        return arr;
    }
    let pivotIndex = Math.floor(arr.length / 2);  // 基准值索引
    let pivot = arr.splice(pivotIndex, 1)[0];   // 基准值
    let left = [], right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quick_sort(left).concat([pivot], quick_sort(right));
}

let arr = [5, 6, 2, 1, 3, 8, 7, 1, 2, 3, 4, 7];
console.log(quick_sort(arr));