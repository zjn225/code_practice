/*
小度有一个小写字母组成的字符串s.字符串s已经被写在墙上了.
小度还有很多卡片,每个卡片上有一个小写字母,组成一个字符串t。小度可以选择字符串t中任意一个字符,然
后覆盖在字符串s的一个字符之上。小度想知道在选取一些卡片覆盖s的一些字符之后,可以得到的字典序最大的
字符串是什么。 

输入包括两行,第一行一个字符串s
第二行一个字符串t

fedcba
ee

feeeba
*/

let s = readline();
let t = readline();
function getMaxString(str1, str2) {
    let tempIdx = 0;//直接先定死一个，而不是两层循环
    //字符串->数组->排序->反转，注意不带比较函数的sort就是按字符编码排序的
    let arr = str2.split("");
    arr.sort();
    arr.reverse();//从大到小
    for (let i = 0; i < str1.length; i++) {
        //如果下面数组的元素大于上面数组的，那么和这个大的拼接起来
        if (arr[tempIdx] > str1[i]) {
            str1 = str1.slice(0, i) + arr[tempIdx] + str1.slice(i + 1);
            tempIdx++;
            if (tempIdx === arr.length) {
                return str1;
            }
        }
    }
    return str1;
}
console.log(getMaxString(s, t));