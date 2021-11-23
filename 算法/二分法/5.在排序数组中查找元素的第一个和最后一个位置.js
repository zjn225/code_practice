/*
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]

如果数组中不存在目标值 target，返回 [-1, -1]。
*/

let searchRange = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
            // 关键，匹配到之后开始往mid的左边走，直到匹配到最左边
        } else if (nums[mid] === target) {
            right = mid - 1;
        }
    }
    if (nums[left] !== target) {
        return [-1, -1]
    }
    let res = [left, left];
    // 找到右边的值
    while (nums[++left] === target) {
        res[1] = left
    }
    return res;
};

var searchRange = function (nums, target) {
    return [nums.indexOf(target), nums.lastIndexOf(target)]
};

searchRange([5, 7, 7, 8, 8, 10], 8) // [3,4]
