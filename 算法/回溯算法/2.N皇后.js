/* n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
    皇后可以攻击同一行、同一列、左上左下右上右下四个方向的任意单位。
    
    给定一个整数 n，返回所有不同的 n 皇后问题的解决方案
    每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

    这个问题和全排列问题差不多，决策树的每一层表示棋盘上的每一行，每个节点可以做出的选择时在该行的任意一列放置一个皇后。
*/
function solveNQueens(n) {
    const res = []

    function backtrack(board, row) {
        // 结束条件
        if (row === n) {
            res.push(board.slice())
            return
        }

        // 固定行，遍历列的每一个值
        for (let col = 0; col < n; col++) {
            // 判断是否可以做选择
            if (!isValid(board, row, col)) continue
            // 当前行：字符串转成了数组
            const letter = board[row].split('')
            // 做选择
            letter[col] = 'Q'
            board[row] = letter.join('')
            // 进入下一行选择
            backtrack(board, row + 1)
            // 撤销选择
            letter[col] = '.'
            board[row] = letter.join('')
        }
    }

    // 是否当前点是否可以放置皇后（是否可以在board[row][col]这个点放置皇后）
    // 皇后是一行一行从上往下放的，所以左下和右下不用检查（还没放皇后）；因为一行只会放一个皇后，所以每行不用检查。也就是最后只用检查上面，左上，右上三个方向。
    function isValid(board, row, col) {
        // 判断当前点垂直方向是否有Q
        for (let i = 0; i < n; i++) {
            if (board[i][col] === 'Q') return false
        }
        // 检查右上方是否有皇后互相冲突, 这个右上方指的是一条对角线（上一行、右一列）(如board[2][0]，看board[1][1]、board[0][2])
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false
        }
        // 检查左上方是否有皇后互相冲突（上一行、左一列）（如board[2][3], 看board[1][2], board[0][1]）
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false
        }
        return true
    }

    // 初始化每一项为 n 个 '.'，backtrack第二个参数是当前行0
    // 也就是初始的传入值是：['....','....','....','....']
    backtrack(Array(n).fill('.'.repeat(n)), 0)

    return res
};

solveNQueens(4);

/** 输出1个二维数组，由多个一维数组（解）组成 [Array(4), Array(4)]
0: ".Q.."
1: "...Q"
2: "Q..."
3: "..Q."

0: "..Q."
1: "Q..."
2: "...Q"
3: ".Q.."
 */