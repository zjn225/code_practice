// 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。


/* 1.当有n个台阶时有f(n)种走法。
2.青蛙最后一步要么跨1个台阶要么跨2个台阶。
3.当最后一步跨1个台阶时即之前有n-1个台阶，根据1的假设即n-1个台阶有f(n-1)种走法。
4.当最后一步跨2个台阶时即之前有n-2个台阶，根据1的假设即n-2个台阶有f(n-2 )种走法。
5.显然n个台阶的走法等于前两种情况的走法之和即f(n)=f(n-1)+f(n-2)。
*/

// 1,2,3,5,8

//牺牲空间方法
function jumpFloor(number) {
    if (number <= 2) return number;
    if (number > 2) {
        let record = [];
        record[1] = 1;
        record[2] = 2;
        for (let i = 3; i <= number; i++) {
            record[i] = record[i - 1] + record[i - 2]
        }
        return record[number]
    }
}

function jumpFloor2(number) {
    if (number < 2) return number;
    
}
