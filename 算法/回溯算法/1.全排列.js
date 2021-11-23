/**
 * 输入一个字符串,按字典序打印出该字符串中字符的所有排列。
 * 例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。
 */

/*  典型的回溯算法

1、路径：也就是已经做出的选择。
2、选择列表：也就是你当前可以做的选择。
3、结束条件：也就是到达决策树底层，无法再做选择的条件。

回溯算法的决策树
https://s3.ax1x.com/2020/12/15/rQnqRx.png

套路：
result = []
function backtrack(路径，选择列表) {
    if 满足结束条件：
        result.push(路径)
        return 
    for 选择 in 选择列表：
        做选择
        backtrack(路径，选择列表)
        撤销选择
}
注意了！！！其核心就是 for 循环里面的递归，在递归调用之前「做选择」，在递归调用之后「撤销选择」
*/

// 方法1 - dfs
const permute = (nums) => {
    const res = [];
    // 基于当前的 path，继续选数，直到构建成合法的path，加入解集
    function dfs(path) {
        if (path.length == nums.length) {
            res.push(path.join(''));
            return;
        }
        for (const num of nums) {
            // 判断是否可以做选择（如果路径包含了当前num则不可做选择）
            if (path.includes(num)) continue; // 查找的时间是O(n)，最好别这么写，时间复杂度增加；建议加个对象来记录；用空间换时间
            // 做选择
            path.push(num);
            dfs(path);
            // 撤销选择
            path.pop();
        }
    }
    // 入口
    dfs([]);
    return res;
};

permute(['a', 'b', 'c']) // ["abc", "acb", "bac", "bca", "cab", "cba"]

/* 参照这张图理解：https://s3.ax1x.com/2020/12/18/rJLOAK.png
    每次推入
    递归1：一开始进入dfs时，path是[]，[]的选择是从abc中做选择；此时dfs的返回值也就是abc的全排列, path=[a]，进入dfs
    递归2：a面临选择abc，排除a，path=[a,b]，进入dfs，这个时候求的bc的全排列
    递归3：ab此时面临abc，排除ab，path=[a,b,c]，进入dfs，这个时候当前的递归结束，pop掉c，回到调用这个递归的地方，也就是递归2，又pop了一次，此时path = [a]

    递归2继续：a面临选择abc，排除ab，path=[a,c] ...... 
        
*/

// 方法2

//第一步：分两部分，首先求可能出现在第一个位置的所有字符，这里是a/b/c
//第二步：在第一步每种情况的基础上，保持第一个字符不变，求剩余几位的排列。
function Permutation(str) {
    let strArr = str.split("").sort();  //字母先进行排序
    let result = [];
    //这个for循环是迭代第一部分
    for (let i = 0; i < strArr.length; i++) {
        //当相邻元素相同时，则跳过此次循环
        if ((i > 0) && (strArr[i] === strArr[i - 1])) continue;
        //截取当前元素前面部分, 如''
        let front = strArr.slice(0, i);
        //截取当前元素以及它后面部分，如bc
        let end = strArr.slice(i + 1);
        console.log('c', front, end);
        excuteFind(result, strArr[i], front.concat(end)); //excuteFind([],'a',['b','c'])
    }
    return result;
}

// cur是当前定住的部分，叫做路径，比如a
// strArr是还没处理的选择，比如bc
function excuteFind(result, cur, strArr) {
    // 满足条件，加入当前路径，比如abc
    if (strArr.length == 0) {
        result.push(cur);
    } else {
        // 这个循环是迭代第二部分
        for (let i = 0; i < strArr.length; i++) {
            if ((i > 0) && (strArr[i] === strArr[i - 1])) continue;
            let front = strArr.slice(0, i); // 如''
            let end = strArr.slice(i + 1); // 如'c'
            excuteFind(result, cur + strArr[i], front.concat(end));
            //excuteFind([],'ab',[c]) --> //excuteFind([],'abc',[])--->excuteFind(['abc','ac',[b])
        }
    }
}

Permutation('abc')  // ["abc", "acb", "bac", "bca", "cab", "cba"]