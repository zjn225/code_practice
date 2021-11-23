/*

在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 
除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 
如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。

计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。

示例 1:

输入: [3,2,3,null,3,null,1]

     3
    / \
   2   3
    \   \
     3   1
输出: 7
解释:  小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.

示例 2:
输入: [3,4,5,1,3,null,1]

     3
    / \
   4   5
  / \   \
 1   3   1
输出: 9
解释:  小偷一晚能够盗取的最高金额  = 4 + 5 = 9.

*/

/*
打不打劫根节点，会影响打劫一棵树的收益：

打劫根节点，则不能打劫左右子节点，但是能打劫左右子节点的四个子树。
不打劫根节点，则能打劫左子节点和右子节点，收益是打劫左右子树的收益之和

*/

const rob = (root) => {     // 打劫以root为根节点的子树的最大收益
    if (root == null) return 0;
    // 打劫根节点的情况: 根节点的值 + 四个子节点的值
    let robIncludeRoot = root.val;
    // 为什么要if，因为.left.left，怕报错，需要安全获取对象的值
    if (root.left) {
        robIncludeRoot += rob(root.left.left) + rob(root.left.right);
    }
    if (root.right) {
        robIncludeRoot += rob(root.right.left) + rob(root.right.right);
    }
    // 直接.left，就不用if先判断了
    // 不打劫根节点的情况：根节点的左右子节点的值
    const robExcludeRoot = rob(root.left) + rob(root.right);
    // 二者取其大
    return Math.max(robIncludeRoot, robExcludeRoot); 
};
