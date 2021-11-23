// 输入一个数组，大小王视为赖子（也就是可当做任何数字的牌，这里把大小王当做0），判断这个数组是不是顺子

/* 1）没有大小王的时候即判断数是否连续；
   2）有大小王的时候，判断数的间隔是否小于王的数量。小于返回true，大于返回false；
   3）有相等的牌、则直接返回false。
*/
function IsContinuous(numbers) {
    if (numbers.length == 0) {
        return false;
    }
    let zero = 0, interval = 0;
    // 先进行排序，否则计算间隔会出现问题
    numbers.sort(function (a, b) {
        return a - b;
    });
    for (let i = 0; i < numbers.length - 1; i++) {
        // 先计算大小王的数量，有的话直接到下一个i，因为不走下面的逻辑了，continue很巧妙
        // 没有大小王则看数是否连续
        if (numbers[i] === 0) {
            zero++;
            continue;
        }
        // 是否有相等的牌
        if (numbers[i + 1] == numbers[i]) {
            return false
        }
        // 计算两数之间的间隔了几个数
        interval += numbers[i + 1] - numbers[i] - 1;
    }
    // 所有数的间隔小于大小王数量
    if (zero >= interval) {
        return true
    }
    return false
} Ç