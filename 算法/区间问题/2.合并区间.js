/**
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
 * 请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。
 * 
    输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
    输出：[[1,6],[8,10],[15,18]]
    解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]

 */

/**
* @param {number[][]} intervals
* @return {number[][]}
*/
var merge = function (intervals) {
    if (intervals.length === 0) {
        return []
    }
    // 将数组进行升序排序
    intervals.sort(function (a, b) {
        return a[0] - b[0]
    })
    // 结果数组放进第一个数组
    res.push(intervals[0])
    // 从原数组的第一个元素进行遍历，和res的最后一个元素对比，注意不是和intervals数组对比
    for (var i = 1; i < intervals.length; i++) {
        // 如果当前区间的左端点 大于 merge数组最后一个元素的右端点
        if (intervals[i][0] > res[res.length - 1][1]) {
            // 说明这个数组可以直接放进merge数组中
            res.push(intervals[i])
        } else { //当前区间的左端点小于等于最后一个元素的右端点，走到else这里就意味这个条件成立了
            // 如果当前区间的右端点 大于 merge 最后一个右端点
            // 两者成立，那么就是有交集了
            if (intervals[i][1] > res[res.length - 1][1]) {
                // 更新右端点为最大值
                res[res.length - 1][1] = intervals[i][1]
            }
        }
    }
    return res
};

// 初始化res=[[1,3]]
// 比如当前为[2,6], 2 < 3，说明有交集
