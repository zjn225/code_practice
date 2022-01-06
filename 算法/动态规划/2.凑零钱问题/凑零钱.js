/*
给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
输入：coins = [1, 2, 5], amount = 11
输出：3 
解释：11 = 5 + 5 + 1

输入: amount = 5, coins = [1, 2, 5]
输出：1
解释：5 = 5

- 假设给出的不同面额的硬币是[1, 2, 5]，目标是 120，问最少需要的硬币个数？

- dp[i]: 表示总金额为 i 的时候最优解法的硬币数

- 我们想一下：求总金额 120 有几种方法？下面这个思路关键了 !!!
  一共有 3 种方式，因为我们有 3 种不同面值的硬币。
  1.拿一枚面值为 1 的硬币 + 总金额为 119 的最优解法的硬币数量
    这里我们只需要假设总金额为 119 的最优解法的硬币数有人已经帮我们算好了，
    不需要纠结于此。(虽然一会也是我们自己算，哈哈)
    即：dp[119] + 1
  2.拿一枚面值为 2 的硬币 + 总金额为 118 的最优解法的硬币数
    这里我们只需要假设总金额为 118 的最优解法的硬币数有人已经帮我们算好了
    即：dp[118] + 1
  3.拿一枚面值为 5 的硬币 + 总金额为 115 的最优解法的硬币数
    这里我们只需要假设总金额为 115 的最优解法的硬币数有人已经帮我们算好了
    即：dp[115] + 1
    
  - 所以，总金额为 120 的最优解法就是上面这三种解法中最优的一种，也就是硬币数最少
    的一种，我们下面试着用代码来表示一下：
    
  - 最终求的 dp[120] = Math.min(dp[119] + 1, dp[118] + 1, dp[115] + 1);
  - 然后接下来继续得到dp[0] —— dp[120]的值
    
  - 推导出「状态转移方程」：
    dp[i] = Math.min(dp[i - coin] + 1, dp[i - coin] + 1, ...)
    其中 coin 有多少种可能，我们就需要比较多少次，那么我们到底需要比较多少次呢？
    当然是 coins 数组中有几种不同面值的硬币，就是多少次了~ 遍历 coins 数组，
    分别去对比即可
    
  - 上面方程中的 dp[119]，dp[118]，dp[115] 我们继续用这种思想去分解，
    这就是动态规划了，把这种思想，思考问题的方式理解了，这一类型的题目
    问题都不会太大。
*/

const coinChange = (coins, amount) => {
    let dp = new Array(amount + 1).fill(Infinity)  // 为什么是+1，虽然数组的索引是从0开始的，但是dp里的索引是语义化的，比如dp[11]就代表是凑齐到11枚所需的最少硬币数，而不是dp[10]去表达
    dp[0] = 0
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1)
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
}

coinChange([1, 2, 5], 11)


// 测试专用，看控制台输出理解
function coinChange(coins, amount) {
  let dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let coin of coins) {
      console.log('---------------------------------');
      console.log('外', coin);
      for (let i = coin; i <= amount; i++) {
          let a = dp[i]
          let b = dp[i - coin] + 1
          dp[i] = Math.min(a, b)
          console.log('  内', `dp[${i}]`, a, b, dp[i], '---', i, coin, i - coin, dp);
      }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}

console.log(coinChange([1, 2, 5], 11))

/*
dp[i]表示凑齐到金额为i的硬币最少需要多少枚
外 coin = 1，代表在第一枚硬币为1的前提下，需要至少多少枚才能凑齐到i, 为什么不直接让i等于amount呢，因为要从dp[1]开始求，i也只能从最小开始
*/