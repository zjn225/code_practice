/**
 * 给定两个由一些 闭区间 组成的列表，firstList 和 secondList ，其中 firstList[i] = [starti, endi] 
 * 而 secondList[j] = [startj, endj] 。每个列表的区间列表都是成对 不相交 的，并且 已经排序 ,返回这 两个区间列表的交集
 * 注意，假设a、b列表个数不一定相同，a列表的某一个区间可能会和b列表的多个区间产生多个交集
 */

// 双指针法
const intervalIntersection = (A, B) => {
    const res = [];
    let i = 0;
    let j = 0;
    while (i < A.length && j < B.length) {
        const start = Math.max(A[i][0], B[j][0]); // 交集区间的左端，取它们的较大者
        const end = Math.min(A[i][1], B[j][1]); // 交集区间的右端，取它们的较小者
        if (start <= end) {       // 形成了交集区间的条件
            res.push([start, end]);
        }
        // 因为某个区间可能会和另外一个列表的多个区间产生交集
        // 谁比较小，谁的指针就步进，也就是大的留在原地，等待下一个子区间与他比较，还有机会产生交集
        if (A[i][1] < B[j][1]) {
            i++;
        } else {
            j++;
        }
    }
    return res;
};

/**
 * 输入：firstList  = [[0,2],[5,10],[13,23],[24,25]]
 *      secondList = [[1,5],[8,12],[15,24],[25,26]]
   输出：             [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]


   start=1, end=2 res.push([1,2])

 */