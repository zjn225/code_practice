// 题目：n个数字（0,1,…,n-1）形成一个圆圈，从数字0开始，每次从这个圆圈中删除第m个数字（第一个为当前数字本身，第二个为当前数字的下一个数字）。
// 当一个数字删除后，从被删除数字的下一个继续删除第m个数字。求出在这个圆圈中剩下的最后一个数字。

function LastRemaining_Solution(n, m) {
    if (n < 1 || m < 1) {
        return -1;
    }
    let arr = [];
    let index = 0;
    //先加入数组
    for (let i = 0; i < n; i++) {
        arr.push(i)
    }
    while (arr.length > 1) {
        index = (index + m - 1) % arr.length; //一开始删除的就是(m-1) % n
        arr.splice(index, 1);
    }
    // 留下了数组的最后一个
    return arr[0]
}


