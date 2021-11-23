// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

// 输入: "()"
// 输出: true

// 输入: "()[]{}"
// 输出: true

// 中间插入的情况，中间插入的是完整的就OK

// 输入: "{ [] }"
// 输出: true

// 输入: "( [ ) ]" 
// 输出: false

let isValid = function (s) {
    let map = {
        "(": ")",
        "[": "]",
        "{": "}"
    }
    let leftArr = []
    for (let ch of s) {
        // map有ch，则代表当前值匹配到左括号，顺序保存
        if (map.hasOwnProperty(ch)) {
            leftArr.push(ch);
        } else { 
            // 为右括号时，与数组末位匹配，如果是相等，啥事没有，不相等那就是false
            // 比如leftArr = ['{','[']
            if (ch !== map[leftArr.pop()]) {
                return false;
            }
        }
    }
    return !leftArr.length
}

isValid('{[]}')

// { [] }
// leftArr = [ "{", "[" ]
// "]" 与 末位的 [ 匹配，不过不匹配就凉凉

// 最后返回的数组长度是0，则证明都匹配完了，返回true

// 方式2：
let isValid = function (s) {
    while (s.length) {
        let temp = s;
        s = s.replace('()', '');
        s = s.replace('[]', '');
        s = s.replace('{}', '');
        // 存在无法消去的字符则说明字符串无效
        if (s == temp) return false
    }
    return true;
};