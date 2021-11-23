// 也就是找字符串中字典序最大的，有多个一样的就并起来
function getMaxString(str) {
    let result = [];
    result.push(str[0]);  //暂存第一个
    for (let i = 1; i < str.length; i++) {
        while (str[i] > result[result.length - 1] && result.length >= 1) {
            result.pop();
        }
        result.push(str[i]);
    }
    return result.join("");
}

console.log(getMaxString("tesst"));  // tt