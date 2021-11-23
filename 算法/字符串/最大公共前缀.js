// 输入: ["flower","flow","flight"]
// 输出: "fl"

// 找到多个字符串的公共前缀
// 先定第一个字符串为公共前缀，之后每次都把findCommonPrefix返回的结果作为第一个参数传入
const longestCommonPrefix = function (strs) {
    if (strs.length > 0) {
        let commonPrefix = strs[0];
        for (let i = 1; i < strs.length; i++) {
            commonPrefix = findCommonPrefix(commonPrefix, strs[i]);
        }
        return commonPrefix;
    }
    return '';
};

// 针对两个字符串的对比
function findCommonPrefix(a, b) {
    let i = 0;
    while (i < a.length && i < b.length && a.charAt(i) === b.charAt(i)) {
        i++;
    }
    return i > 0 ? a.substring(0, i) : '';
}

longestCommonPrefix(["flower","flow","flight"])


/*
findCommonPrefix("flower", "flow")
findCommonPrefix("flow", "flow")
findCommonPrefix("flow", "flight")

*/