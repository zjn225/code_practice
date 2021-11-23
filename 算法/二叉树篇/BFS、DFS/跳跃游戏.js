/* 这里有一个非负整数数组  arr，你最开始位于该数组的起始下标  start  处。当你位于下标  i  处时，你可以跳到  i + arr[i] 或者 i - arr[i]。
请你判断自己是否能够跳到对应元素值为 0 的 任一 下标处。

注意，不管是什么情况下，你都无法跳到数组之外。

示例 1：
输入：arr = [4,2,3,0,3,1,2], start = 5
                      (5)
输出：true
解释：
到达值为 0 的下标 3 有以下可能方案：
下标 5 (1，能跳到下标为5+1或5-1的那里) -> 下标 4（3，能跳到下标为4+3或4-3那里） -> 下标 1（2，能跳到下标为1+2或1-2那里） -> 下标 3
下标 5 -> 下标 6 -> 下标 4 -> 下标 1 -> 下标 3


示例 2：
输入：arr = [4,2,3,0,3,1,2], start = 0
输出：true
解释：
到达值为 0 的下标 3 有以下可能方案：
下标 0 -> 下标 4 -> 下标 1 -> 下标 3


示例 3：
输入：arr = [3,0,2,1,2], start = 2
输出：false
解释：无法到达值为 0 的下标 1 处


利用 BFS 的思路，维护一个队列 queue 表示待处理的下标，先把 start 起点放入队列中，然后从起点开始根据起点对应的值分别把左右两边对应的下标放入队列中，
不断循环。形象点来说就是每次跳完一格，都把这格对应的左右两边可跳的下标放入队列里，下次继续跳

1、当左下标小于 0 或者右下标超出数组长度时，就不用放入队列了
2、每次处理完当前的格子后，要用 visited 数组记录下来，下次对于这个处理过的下标就不再放入队列中，如果这个过程中发现了某一格是 0，那么就成功，如果整个循环结束了都没发现，那么就失败
*/

let canReach = function (arr, start) {
    let n = arr.length;
    let visited = [];   // 处理完的丢进去
    let queue = [start]; // 待处理的下标
    while (queue.length) {
        let index = queue.pop();
        let val = arr[index];
        // 成功的条件
        if (val === 0) {
            return true;
        }
        let leftIdx = index - val;
        let rightIdx = index + val;
        if (leftIdx >= 0 && !visited[leftIdx]) {
            queue.push(leftIdx);
        }
        if (rightIdx < n && !visited[rightIdx]) {
            queue.push(rightIdx);
        }
        visited[index] = true;
    }
    return false;
};

// canReach([4,2,3,0,3,1,2], 5)

/**
 * input: arr = [4,2,3,0,3,1,2], start = 5
 *
 * queue = [5]
 *      index = 5, val = 1, leftIdx = 4, rightIdx = 6
 * 
 * queue = [4, 6]， visit[5] = true
 *      index = 6, val = 2, leftIdx = 4, rightIdx = 8
 * 
 * queue = [4, 4], visit[6] = true
 *      index = 4, val = 3, leftIdx = 1, rightIdx = 7
 * 
 * queue = [4, 1], visit[4] = true
 *      index = 1, val = 2, leftIdx = -1, right = 3
 * 
 * queue = [4, 3], visit[1] = true
 *      index = 3, val = 0  =====> success！！！
 */