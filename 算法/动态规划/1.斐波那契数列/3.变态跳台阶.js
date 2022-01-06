// 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

/* 1.当有n个台阶时有f(n)种走法。
2.青蛙最后一步要么跨1个台阶要么跨2个台阶.....要么跨第n个台阶。
3.当最后一步跨1个台阶时即之前有n-1个台阶，根据1的假设即n-1个台阶有f(n-1)种走法。
4.当最后一步跨2个台阶时即之前有n-2个台阶，根据1的假设即n-2个台阶有f(n-2 )种走法。
...
  当最后一步跨n个台阶时即之前有0个台阶，那么有f(0)种做法
5.显然n个台阶的走法等于前两种情况的走法之和即f(n)=f(n-1)+f(n-2)+...f(0)。
     而n-1个台阶f(n-1)=f(n-2)+...+f(0)
  得f(n) = 2f(n-1)
*/

// 0 1 2 4 8
function jumpFloorII(number) {
    // write code here
    if (number === 0) {
        return 0
    } else if (number === 1) {
        return 1
    } else {
        let record = [];
        record[1] = 1;
        for (let i = 2; i <= number; i++) {
            record[i] = 2 * record[i - 1];
        }
        return record[number]
    }
}