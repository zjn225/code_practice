/**
 * 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

[3,3,5,0,0,3,1,4]

如果是多次交易，那么最大利润是8，但是此题是只能2次交易，所以最大利润是6
 */

var maxProfit = function (prices) {
    //第一次 买入卖出的利润
    let buy1 = -prices[0], out1 = 0;
    //继第一次之后，第二次买入卖出的利润
    let buy2 = -prices[0], out2 = 0;
    prices.forEach(item => {
        //第一次买入卖出
        buy1 = Math.max(buy1, -item);
        out1 = Math.max(out1, buy1 + item);
        // 第二次买入卖出, 第一次卖出的利润 - prices[i]
        buy2 = Math.max(buy2, out1 - item);
        // 反正第二次都是取最近的来加减
        out2 = Math.max(out2, buy2 + item);
    })
};