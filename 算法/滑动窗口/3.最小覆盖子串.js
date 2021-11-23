/*
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"

输入：s = "a", t = "a"
输出："a"
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

const getHashAndCount = t => {
    const need = {};
    const window = {};
    let valid = 0;
    for (let val of t) {
        // 初始化need
        need[val] ? need[val]++ : need[val] = 1;
        // 初始化window
        !window[val] && (window[val] = 0);
    }
    // 初始化valid
    valid = Object.keys(need).length;
    return [need, window, valid];
};

var minWindow = function (s, t) {
    let left = 0; // 窗口左侧
    let curValid = 0; 
    let start = 0; // start是截取的起始位置
    let len = Infinity; // len是截取的长度
    // 初始化一些属性
    // {A: 1, B: 1, C: 1}, {A: 0, B: 0, C: 0}, 3
    const [need, window, validSuccess] = getHashAndCount(t);
    // 开始右移窗口（right从0开始）
    for (let right in s) {
        // 当前移入窗口的
        const c = s[right];
        // window更新
        if (window[c] || window[c] === 0) {
            window[c]++;
            // curValid数据更新：如果need包含了cur
            (need[c] === window[c]) && curValid++;
        }
        // 在满足valid === need.length之前，也就是直到window包含所有元素时才会结束右移
        // 此时左侧窗口开始收缩(此时窗口window中的就包含了need中所有的字符了)
        // 此时停止增加 right，转而不断增加 left 指针缩小窗口 [left, right)，
        // 直到窗口中的字符串不再符合要求（不包含t中的所有字符了，也就是刚好漏掉了1个的时候）
        while (curValid === validSuccess) {
            // 在这里更新最小覆盖子串
            // 这里记录了最小的覆盖子串的长度，如果移动指针的时候发现大于len，则不会更新start和len
            // 能进入这个if的，都是符合need && 是最小的覆盖子串
            if (right - left < len) {
                start = left;
                len = right - left;
            }
            // 将要移出窗口的
            const c = s[left];
            // 左移窗口 
            left++;
            // 数据更新：每次左移后，如果当前被移出的元素在need里
            if (window[c]) {
                // 无论计数是否相同，窗口的值都会减少
                // 如果两者的计数相同, 则curValid--
                // 因为window里的计数总是会>=need里的计数，当两者相等时，代表此时到达边界值，离开边界值后window就不再包含t中所有的元素了，此时左移结束，进入外层的循环，也就是继续右移
                if (window[c] === need[c]) curValid--;
                window[c]--;
            }
        }
    }
    return len === Infinity ? '' : s.substr(start, len + 1);
};

console.log('result', minWindow("ADOBECODEBANC", "ABC"));
// console.log('result', minWindow("aa", "aa"));
// console.log('result', minWindow("ab", "a"));
// console.log('result', minWindow("abc", "a"));
// console.log('result', minWindow("aa", "a"));