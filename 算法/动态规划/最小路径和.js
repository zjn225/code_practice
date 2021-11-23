/* leetcode 64

给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
说明：每次只能向下或者向右移动一步。

示例:

输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。

*/

/**
 * 状态转移方程：dp[i][j] = Min(dp[i-1][j],dp[i][j-1]) + grid[i][j]
 * 
 * 边界条件：
 * i == 0，j == 0 （起点） ===>  dp[i][j]=grid[i][j] 
 * i == 0，j != 0 （第一行）  ===>  dp[i][j] = dp[i][j-1]+grid[i][j]，如dp[0][2] = dp[0][1] + 当前值(1)
 * i != 0，j == 0 （第一列） ==> dp[i][j] = dp[i-1][j]+grid[i][j]，如dp[2][0] = dp[1][0] + 当前值(4)
 * i !=0， j != 0 （第一行第一列之间）==> dp[i][j] = Min(dp[i-1][j],dp[i][j-1])+grid[i][j]，如dp[1,1] = Min( dp[0][1], dp[1][0] ) + grid[1][1] ，也就是说：上方或者左侧看谁最小 + 当前值
 * 
 * 返回值：dp[i][j]的最后一个元素值
 */

var minPathSum = function (grid) {
    var n = grid.length; // 行
    var m = grid[0].length; // 列
    var dp = Array.from(new Array(n), () => new Array(m)); // 最终生成了 n * m 的数组
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            if (i != 0 && j != 0) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            } else if (i == 0 && j != 0) {
                dp[i][j] = dp[i][j - 1] + grid[i][j];
            } else if (i != 0 && j == 0) {
                dp[i][j] = dp[i - 1][j] + grid[i][j];
            } else if (i == 0 && j == 0) {
                dp[i][j] = grid[i][j];
            }
        }
    }
    return dp[n - 1][m - 1];
};