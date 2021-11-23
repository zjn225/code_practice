/**
 * 输入：nums = [3,4,2,7], target = 9
输出：[2,3]
解释：因为 nums[2] + nums[3] == 9 ，返回 [2,3]
 */

var twoSum = function (nums, target) {
    if (!nums) return [];
    const m = new Map();
    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        // 获取对当前与该值匹配的数值, 暂存
        const matchNum = target - current;
        // 判断目标值是否在字典中
        if (m.has(matchNum)) {
            // 是，在返回目标值的坐标和当前数值的坐标
            return [m.get(matchNum), i]
        }
        // 不在字典中，则放入字典，key为数值，value为下标
        m.set(current, i)
    }
};

/**
 *
{
    3: 0,
    4: 1,
    2: 2,
}
这个时候m.has()就成立了，matchNum是9-7=2，m.has(2) === true
 */