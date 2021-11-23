/*
示例：abcac
输出：3

实例：abbcdb
输出: 3

实例: xyzxyzyy
输出: 3
*/

/* 使用一个数组来维护滑动窗口
遍历字符串，判断字符是否在滑动窗口数组里
a、不在则 push 进数组
b、在则删除滑动窗口数组里相同字符及它前面的所有字符，然后将当前字符 push 进数组
c、然后将 max 更新为当前最长子串的长度

好理解：无脑一个个push，每次push前判断是否存在相同的，存在则先删除
*/

var lengthOfLongestSubstring = function (s) {
    // 滑动窗口
    let arr = [];
    // 最长子串长度
    let max = 0;
    // 遍历字符串
    for (let i = 0; i < s.length; i++) {
        let cur = s[i];
        // 当前字符串是否在滑动窗口里
        let index = arr.indexOf(cur);
        // 在滑动窗口里：删除index之前的所有元素
        // 为什么包括之前呢？因为有重复的就代表重新开始计算子串了，比如abbc，此时新的滑动窗口arr = [bc]，b和b前面的a（ab）被删
        // 也就是相当于更新了无重复子串开始下标，从a变为b（c前面的b）
        if (index !== -1) {
            arr.splice(0, index + 1);
        }
        // 不在滑动窗口则加进去
        arr.push(cur);
        // 更新max值
        max = Math.max(arr.length, max);
    }
    return max;
};

lengthOfLongestSubstring("xyzxyzyy")

/* arr = [abc] max = 3;

    i = 3 , cur = a ，滑动窗口里存在了，此时arr = [bc]，然后push进去 arr = [bca] max = Math.max(3, 3) = 3
    i = 4 , cur = c,  滑动窗口里存在了，此时arr= [a], 然后push进去  arr = [ac]  max = Math.max(2, 3) = 3

*/

/**
 * 不获取max值，要获取具体元素呢
 */

var lengthOfLongestSubstring = function (s) {
    let arr = [];
    let maxArr = [];
    for (let i = 0; i < s.length; i++) {
        let cur = s[i];
        let index = arr.indexOf(cur);
        if (index !== -1) {
            arr.splice(0, index + 1);
        }
        arr.push(cur);
        if (maxArr.length > arr.length) {
            maxArr = maxArr;
        } else {
            // 这里主要要深复制，不然下一次循环arr变化的时候maxArr也会跟着变化
            maxArr = arr.slice();
        }
    }
    return maxArr;
};

lengthOfLongestSubstring("xyzxyzyy")  // xyz