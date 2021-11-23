// 输入一个非递减排序的数组（递增或者011111这种）的一个旋转，输出旋转数组的最小元素。 

// 例如旋转数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。

/*
* 传进去旋转数组，注意旋转数组的特性：
* 1.包含两个有序序列
* 2.最小数一定位于第二个序列的开头，是两个序列的分割线
* 3.前序列的值都>=后序列的值
* 定义把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

那么这道题本质上就是输入一个旋转数组。寻找这个旋转数组的分割点，即是从哪里开始分割的
*/

//二分法思想，中间值和最后值对比，来判断是哪部分翻转了
function minNumberInRotateArray(numbers) {
    if (!numbers.length) return 0;
    let low = 0;
    let high = numbers.length - 1;
    while (low < high) {
        var mid = Math.floor((high + low) / 2);
        // 递减，[3,4,5,1,2]，那么最小值在右区间
        if (numbers[mid] > numbers[high]) {
            low = mid + 1;
            // 既然出现相等了，就表示是有相同数字的递增数组， [1,0,1,1,1] 或者[1,1,1,0,1],不好判断最小值在左还是右区间，这时只一个一个试 ，所以是hight - 1，而不是mid - 1
        } else if (numbers[mid] === numbers[high]) {
            high = high - 1;
            // [1, 1, 1, 2, 3, 4, 5] 
            // 情况1：numbers[mid] < numbers[high]，此时最小数字一定就是array[mid]或者在mid的左边。因为右边是递增的。最小的只能在左边
            // 情况2：而且避免了边界条件，如[4,6]，mid - 1 = -1
            // 综上，hight 不能等于 mid - 1
        } else {
            high = mid;
        }
    }
    return numbers[low];
}

minNumberInRotateArray([5, 6, 7, 3, 4]) // 3
