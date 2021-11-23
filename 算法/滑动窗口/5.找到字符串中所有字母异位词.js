/*
给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

说明：

字母异位词指字母相同，但排列不同的字符串。
不考虑答案输出的顺序。

示例 1:

输入:
s: "cbaebabacd" p: "abc"

输出:
[0, 6]

解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。


示例 2:

输入:
s: "abab" p: "ab"

输出:
[0, 1, 2]

解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。
*/

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
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

var findAnagrams = function (s, p) {
    let left = 0;
    let curValid = 0;
    const [need, window, validSuccess] = getHashAndCount(p);
    const res = [];

    for (let right in s) {
        const c = s[right];
        if (window[c] || window[c] === 0) {
            window[c]++;
            if (need[c] === window[c]) curValid++;
        }
        while (curValid === validSuccess) {
            if ((right - left + 1) === p.length) res.push(left);
            const c = s[left];
            left++;
            if (window[c]) {
                if (window[c] === need[c]) curValid--;
                window[c]--;
            }
        }
    }
    return res;
};

console.log('result', findAnagrams("cbaebabacd", "abc")); // [0, 6]
