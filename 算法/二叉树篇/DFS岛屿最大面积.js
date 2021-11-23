/*
给定一个包含了一些 0 和 1 的非空二维数组  grid 。

一个   岛屿   是由一些相邻的  1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。你可以假设  grid 的四个边缘都被 0（代表水）包围着。

找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为 0 。)

示例 1:

[0,1,1,0,1,0,0,0, 0,0,0,0,0],
[0,1,0,0,1,1,0,0, 1,0,1,0,0],
[0,1,0,0,1,1,0,0, 1,1,1,0,0],
[0,0,0,0,0,0,0,0, 0,0,1,0,0],

对于上面这个给定矩阵应返回  6

示例 2:

[[0,0,0,0,0,0,0,0]]
对于上面这个给定的矩阵, 返回  0。

*/


// 两层循环，如果当前的元素是1，则进行递归查找
let maxAreaOfIsland = function (grid) {
    let x = grid.length, y = grid[0].length
    let max = 0
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            if (grid[i][j] == 1) {
                max = Math.max(max, cntArea(grid, i, j, x, y))
            }
        }
    }
    return max
};

// 递归查找四周是否还有1
let cntArea = (grid, i, j, x, y) => {
    // 1、先检测边界条件，从maxAreaOfIsland进来当然不会触发，但是递归的时候可能会触发边界
    if (i < 0 || i >= x || j < 0 || j >= y || grid[i][j] == 0) return 0
    // 当前这个点的周围的最大岛屿面积
    let cnt = 1  
    // 2、把当前已经计算过的元素至为0，防止重复计算
    grid[i][j] = 0
    // 3、判断上下左右4个方向
    cnt += cntArea(grid, i + 1, j, x, y)
    cnt += cntArea(grid, i - 1, j, x, y)
    cnt += cntArea(grid, i, j + 1, x, y)
    cnt += cntArea(grid, i, j - 1, x, y)
    return cnt
}
