/*

给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

示例 1:

输入: 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1。
------------------------------------------
示例 2:

输入: 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
说明: 你可以假设 n 不小于 2 且不大于 58。

*/

// 动态规划
var integerBreak = function (n) {
    const dp = new Array(n + 1).fill(1);

    for (let i = 3; i <= n; i++) {
        for (let j = 1; j < i; j++) {
            dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);  // 状态转移方程
        }
    }

    return dp[n];
};

/*

状态数组dp[i]表示：数字 i 拆分为至少两个正整数之和的最大乘积。为了方便计算，dp 的长度是 n + 1，值初始化为 1。

显然dp[2]等于 1 (不存在dp[0]/dp[1])，外层循环从 3 开始遍历，一直到 n 停止。内层循环 j 从 1 开始遍历，一直到 i 之前停止，
它代表着数字 i 可以拆分成 j + (i - j)。但 j * (i - j)不一定是最大乘积，因为i-j不一定大于dp[i - j], 不用为什么，因为dp内部不知情，所以就是不一定！就得比较
为什么！这个很关键，比如dp[10] = Math.max(dp[10], 3 * 7, 3 * dp[7])，这里21显然是小于3 * dp[7]的，dp[7]=12；

最后选择最大的值作为 dp[i] 的结果。


dp[3]
const dp = [1,1,1,1];
dp[3] = Math.max(dp[3], 1*2, 1*dp[2]) ===>  dp[3] = Math.max(1, 1*2, 1*dp[2]) =  2
dp[3] = Math.max(dp[3], 2*1,  2*dp[1])
*/