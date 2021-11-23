// 输入: 123
// 输出: 321

// 输入: -123
// 输出: -321

// 输入: 120
// 输出: 21

// 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231, 231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

const reverse = (num) => {
    // 非空判断
    if (typeof num !== 'number') {
        return;
    }
    // 极值
    const MAX = Infinity;
    const MIN = -Infinity;

    // 识别数字部分并翻转（正负数）
    const rest =
        num > 0
            ? String(num)
                .split('')
                .reverse()
                .join('')
            : String(num)
                .slice(1)
                .split('')
                .reverse()
                .join('');

    // 转换为正常值，区分正负数
    const result = num > 0 ? parseInt(rest, 10) : 0 - parseInt(rest, 10);

    // 边界情况
    if (result >= MIN && result <= MAX) {
        return result;
    }
    return 0;
};
