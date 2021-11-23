/*
给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。

换句话说，第一个字符串的排列之一是第二个字符串的子串。

示例1:

输入: s1 = "ab" s2 = "eidbaooo"
输出: True
解释: s2 包含 s1 的排列之一 ("ba").
 

示例2:

输入: s1= "ab" s2 = "eidboaoo"
输出: False

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

var checkInclusion = function (s1, s2) {
    let left = 0;
    let curValid = 0;
    const [need, window, validSuccess] = getHashAndCount(s1);

    // 开始右移
    for (let right in s2) {
        // 当前右移的元素
        const c = s2[right];
        if (window[c] || window[c] === 0) {
            window[c]++;
            if (need[c] === window[c]) curValid++;
        }
        while (curValid === validSuccess) {
            if ((right - left + 1) === s1.length) return true;
            // 开始左移，条件是：窗口大小不等于s1.length时
            const c = s2[left];
            left++;
            if (window[c]) {
                if (window[c] === need[c]) curValid--;
                window[c]--;
            }
        }
    }
    return false;
};


console.log('result', checkInclusion("ab", "eidbaooo")); // true
console.log('result', checkInclusion("ba", "eidbaooo")); // true
console.log('result', checkInclusion("ab", "eidboaoo")); // false
