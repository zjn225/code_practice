/* 
动态规划问题的一般形式就是求最值, 肯定会把所有情况穷举出来，然后在其中得到最值，三要素如下

- 存在「重叠子问题」，如果暴力穷举的话效率会极其低下，所以需要「备忘录」或者「DP table」来优化穷举过程，避免不必要的计算
- 动态规划问题一定会具备「最优子结构」，才能通过子问题的最值得到原问题的最值
- 虽然动态规划的核心思想就是穷举最值，但是问题可以千变万化，穷举所有可行解其实并不是一件容易的事，只有列出正确的「状态转移方程」 才能正确地穷举。

做动态规划题目的一个思维框架是：(自底向上，所以动态规划一般是脱离递归，由循环完成)

1.  明确 base case
2.  明确「状态」
3.  明确「选择」
4.  定义状态转移方程dp

*/

// 现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。
// 斐波那契数列arr[n]=arr[n-1]+arr[n-2]，0 1 1 2 3 5

// 最low的递归方式，多次的重复计算，Fibonacci(4) = Fibonacci(1) + Fibonacci(0) + Fibonacci(1) + Fibonacci(1) + Fibonacci(0);
// 自顶向下
function Fibonacci(n) {
    if (n <= 1) return n;
    else {
        return Fibonacci(n - 1) + Fibonacci(n - 2) // 时间复杂度O(2^n)
    }
}

// 备忘录-递归方法：自顶向下
function fib(n) {
    const hashMap = new Map();
    function _fib(n) {
        if (n === 1 || n === 2) return 1
        if (hashMap.has(n)) return hashMap.get(n) // 每次递归到这里的时候都从Map里取
        const res = _fib(n - 1) + _fib(n - 2)
        hashMap.set(n, res) // 否则就存进Map
        return res
    }
    return _fib(n)
}

// 牺牲空间的循环做法，备忘录法，空间浪费了n-1个，但是时间复杂度O(n), 每一次都把当前值保存在数组里
// 比较接近动态规划思路了，也是从base case开始，自底向上 
function Fibonacci(n) {
    const dp = [0, 1, 1];
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// 空间复杂度降为O(1)，根据斐波那契数列的状态方程，当前状态只和上两个状态相关，其实不需要一个完整的 DP table 来存储所有状态，只要想办法存储之前两个状态即可，不再占用n-1个空间
// 这个技巧就是所谓的 **「状态压缩」** ，如果我们发现状态转移只需要 DP table 中的一部分，那么可以尝试用状态压缩来缩小 DP table 的大小，只记录必要的数据
// 严格来说斐波那契数列并非动态规划问题，因为没有涉及求最值
function fib(n) {
    if (n === 1 || n === 2) return 1
    let prev = 1
    let curr = 1
    for (let i = 3; i <= n; i++) {
        let sum = prev + curr
        prev = curr
        curr = sum
    }
    return curr
}
