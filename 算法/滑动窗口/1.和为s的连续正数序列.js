/*
小明很喜欢数学,有一天他在做数学作业时,要求计算出9~16的和,他马上就写出了正确答案是100。但是他并不满足于此,他在想究竟有多少种连续的正数序列的和为100(至少包括两个数)。
没多久,他就得到另一组连续正数和为100的序列:18,19,20,21,22。现在把问题交给你,你能不能也很快的找出所有和为S的连续正数序列? Good Luck!
*/

// 注意。这个不是二分法
// 滑动窗口：就是相当于有一个窗口，窗口的左右两边就是两个指针，我们根据窗口内值之和来确定窗口的位置和宽度。
function FindContinuousSequence(sum) {
    let result = [];
    // 两个起点，相当于动态窗口的两边
    let plow = 1,
        phigh = 2;
    while (plow < phigh) {
        //由于是连续的，差为1的一个序列，那么求和公式是(a0+an)*n/2, an = n
        let cur = (phigh + plow) * (phigh - plow + 1) / 2;
        //相等，那么就将窗口范围的所有数添加进结果集
        if (cur === sum) {
            let resultItem = [];
            for (let i = plow; i <= phigh; i++) {
                resultItem.push(i);
            }
            result.push(resultItem)
            plow++
            //如果当前窗口内的值之和小于sum，那么右边窗口右移一下
        } else if (cur < sum) {
            phigh++
            //如果当前窗口内的值之和大于sum，那么左边窗口右移一下
        } else {
            plow++
        }
    }
    return result;
}

// 暴力法，从1开始定死，然后while循环
function FindContinuousSequence(sum) {
    let result = [];
    for (let i = 1; i < sum; i++) {
        let arr = [i];
        let index = i;
        let count = i;
        while (count <= sum) {
            if (count === sum) {
                result.push(arr);
                break;
            } else {
                index++;
                arr.push(index);
                count += index;
            }
        }
    }
    return result;
}
