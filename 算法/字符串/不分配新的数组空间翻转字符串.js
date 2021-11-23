// 输入：["h","e","l","l","o"]
// 输出：["o","l","l","e","h"]

//  方法一：首尾替换法，时间复杂度O(n),空间复杂度O(1)
const reverseString = function (s) {
    for (let i = 0; i < s.length / 2; i++) {
        [s[i], s[s.length - 1 - i]] = [s[s.length - 1 - i], s[i]];
    }
    return s;
};