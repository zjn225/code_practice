/*
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3


换句话说就是求连续区域的个数。
比如左上角4个1就组成了一个陆地，右下角两个1也组成了陆地

符合直觉的做法是用DFS来解：

- 我们需要建立一个 visited 数组用来记录某个位置是否被访问过。
- 对于一个为 1 且未被访问过的位置，我们递归进入其上下左右位置上为 1 的数，将其 visited 变成 true。
重复上述过程
- 找完相邻区域后，我们将结果 res 自增1，然后我们在继续找下一个为 1 且未被访问过的位置，直至遍历完.

但是这道题目只是让我们求连通区域的个数，因此我们其实不需要额外的空间去存储visited信息。
注意到上面的过程，我们对于数字为0的其实不会进行操作的，也就是对我们“没用”。 因此对于已经访问的元素，
我们可以将其置为0即可。

*/

function DFS(grid, i, j, rows, cols) {
    // 超出网格范围 || 当前点是0
    if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1 || grid[i][j] === "0") {
        return;
    }

    // 将当前为1的点，置为0，表示已经访问过了，之后递归的时候就直接return掉了
    grid[i][j] = "0";

    // 判断这个点的上下左右是否为1
    DFS(grid, i + 1, j, rows, cols);
    DFS(grid, i, j + 1, rows, cols);
    DFS(grid, i - 1, j, rows, cols);
    DFS(grid, i, j - 1, rows, cols);
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let res = 0;
    if (!grid.length) return 0
    const rows = grid.length; // 行数
    const cols = grid[0].length; // 列数
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === "1") {
                DFS(grid, i, j, rows, cols);
                res++;
            }
        }
    }
    return res;
};