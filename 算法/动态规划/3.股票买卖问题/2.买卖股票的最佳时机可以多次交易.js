/*给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
*/

// （注意：利润是手里的钱，买进去的，当然你手里就没钱了）
let maxProfit = function (prices) {
    let sell = 0; // 卖出时的利润
    let buy = -Infinity; // 买入时的利润
    prices.forEach(currentPrice => {
        // 买入时的利润，求最大值（上次买入时的利润，本次交易的利润，由于是只有多次买入，所以肯定是上次卖出的利润 - 当前价格）
        buy = Math.max(buy, sell - currentPrice);
        // 卖出时利润：求最大值（上次卖出时的最大利润，本次交易的利润 + 上次买入的利润）
        sell = Math.max(sell, currentPrice + buy);
    })
    return sell;
};