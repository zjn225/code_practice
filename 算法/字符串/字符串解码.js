/*

给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

 
示例 1：

输入：s = "3[a]2[bc]"
输出："aaabcbc"
示例 2：

输入：s = "3[a2[c]]"
输出："accaccacc"
示例 3：

输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"
示例 4：

输入：s = "abc3[cd]xyz"
输出："abccdcdcdxyz"

*/

// 思路：1、遇到字母或数字，则一直记录；直到遇到[则入栈，同时清除临时变量的记录；
//       2、遇到]，出栈拼接

var decodeString = function (s) {
    let res = "", num = "";
    let stack = [];
    for (let char of s) {
        // 数字处理：用于后面的倍数计算
        // 这里的>=0会触发字符串转数字，然后+因为是字符串的相加所以是拼接的
        if (char >= 0) {
            num += char;
            // [处理：将当前res和num入栈，入栈后置空res和num，为什么？因为都入栈里保存了，可以理解为res和num只是个工具人，不过在最后没有[的时候res就不是工具人了而是个最终的返回值
            // res和num本质上是[到[之间的字母和数字
        } else if (char === "[") {
            stack.push({ res, num });
            res = "", num = "";
            // ]处理：stack出栈，开始拼接
        } else if (char === "]") {
            // 先处理最近加入的
            let data = stack.pop();
            // data.res是括号外面的字母，data.num是括号外面的数字，res是括号里面的！！
            res = data.res + res.repeat(data.num);
        } else {
            // 字母处理：在res尾部添加char
            res += char;
        }
    }
    return res;
};


/**
 * 
 * s = 3[a2[c]]
 * 遇到字母或数字，则一直记录；直到遇到[则入栈，同时清除临时变量的记录
 * res =  ''; num = 3 ; stack = [{res: "", num: 3}]  res/num = "";
 * res = 'a'; num = 2 ; stack = [{res: "", num: 3}, {res: 'a', num: 2}]; res/num = "";
 * res = 'c'; 遇到]了，开始出栈
 * data = {res: 'a', num: '2'}; res = 'a' + 'c'.repeat('2') = 'acc';
 * 又遇到]了，出栈
 * data = {res: '', num: 3}; res = '' + 'acc'.repeat(3) = 'accaccacc'
 */