/* 
"42"  ->  42
"-42" -> -42
"4193 with words" -> 4193
"words and 987" -> 0
*/

const myTtoi2 = (str) => {
    const newStr = str.trim();
    if(parseInt(newStr)) {
        console.log("res: ", parseInt(newStr) )
    }
}

// 用正则提取需要的字符
const myAtoi = function (str) {
    const result = str.trim().match(/^(-|\+)?\d+/g);
    return result
};
