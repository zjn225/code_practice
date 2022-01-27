<!-- A.html -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A</title>
</head>

<body>
    <button type="button" onclick="openB()">B</button>
    <script>
        let maxProfit = function (prices) {
            let sell = 0; // 卖出时的利润
            let buy = -Infinity; // 买入时的利润, 为什么这个就是负的呢，因为买了后自己的利润肯定是负的，因为减去了成本
            prices.forEach((currentPrice, i) => {
                // 每一次遍历可以理解为这个价格currentPrice买入和卖出的，
                // buy就是currentPrice买入的时候，本次交易的利润  和 上次买入的利润 对比   （这个buy必然是负的，因为buy其实就相当于负的成本）
                // sell就是currentPrice卖出的时候，本次交易的利润（）  和 上次卖出的利润对比

                // 买入时的利润，求最大值（上次买入时的利润，本次交易的利润，由于是只有一次买入，因为买之前利润就是0，所以肯定就是-current）
                // （这个buy必然是负的，因为buy其实就相当于负的成本）
                buy = Math.max(buy, -currentPrice);
                // 卖出时利润：求最大值（上次卖出时的最大利润，本次交易的利润 + 上次买入的利润（这个buy必然是负的，因为buy其实就相当于负的成本）,
                // 所以本质就是上次买入的利润 and  本次currentPrice卖出的价格 - 成本，这两个利润的对比
                sell = Math.max(sell, currentPrice + buy);
            })
            return sell;
        };


        console.log(maxProfit([7, 1, 5, 3, 6, 4]))

        /*

        begin {currentPrice: 7, buy: -Infinity, sell: 0}
        end   {currentPrice: 7, buy: -7, sell: 0}
        ---------------------------------------------------
        begin {currentPrice: 1, buy: -7, sell: 0}
        end   {currentPrice: 1, buy: -1, sell: 0}
        ---------------------------------------------------
        begin {currentPrice: 5, buy: -1, sell: 0}
        end   {currentPrice: 5, buy: -1, sell: 4}
        ---------------------------------------------------
        begin {currentPrice: 3, buy: -1, sell: 4}
        end   {currentPrice: 3, buy: -1, sell: 4}
        ---------------------------------------------------
        begin {currentPrice: 6, buy: -1, sell: 4}
        end   {currentPrice: 6, buy: -1, sell: 5}
        ---------------------------------------------------
        begin {currentPrice: 4, buy: -1, sell: 5}
        end   {currentPrice: 4, buy: -1, sell: 5}
        ---------------------------------------------------

        */

    </script>
</body>

</html>