var removeCoveredIntervals = function (intervals) {
    intervals.sort((a, b) => {
        // 起点升序（小到大）排列，起点相同时降序排列
        if (a[0] === b[0]) {
            return b[1] - a[1]
        }
        return a[0] - b[0]
    })
    // 记录合并区间的起点和终点
    let left = intervals[0][0];
    let right = intervals[0][1];
    let res = 0
    for (let i = 1; i < intervals.length; i++) {
        // 覆盖
        if (intervals[i][0] >= left && intervals[i][1] <= right) {
            res++
        }
        // 相交, 合并区间
        // 而且排序过的还有一个好处：就是不用管左区间，因为当前元素的左区间一定在上一个元素的左区间后面
        if (intervals[i][0] <= right && intervals[i][1] >= right) {
            right = intervals[i][1]
        }
        // 不相交，把起点和终点更新
        if (right < intervals[i][0]) {
            left = intervals[i][0];
            right = intervals[i][1];
        }
    }
    return intervals.length - res
};

removeCoveredIntervals([[1, 4], [3, 8], [2, 8]])  // 2

/**
 * 排序：[1,4], [2,8], [3,8]
 * 判断当前区间[2,8]，和[1,4]相交，更新右区间
 */