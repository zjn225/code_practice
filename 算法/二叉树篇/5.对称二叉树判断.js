// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

// 1
// / \
// 2   2
// / \ / \
// 3  4 4  3

var isSymmetric = function (root) {
    let help = (node1, node2) => {
        // 都为空，即只有一个根节点
        if (!node1 && !node2) return true;
        // 只要有一个节点是空，或者两个节点值不相等
        if (!node1 || !node2 || node1.val !== node2.val) return false;
        return help(node1.left, node2.right) && help(node1.right, node2.left);
    }
    if (root == null) return true;
    return help(root.left, root.right);
};

// 非递归
// 用一个队列保存访问过的节点，每次取出两个节点，进行比较。
var isSymmetric = function (root) {
    if (root == null) return true;
    let queue = [root.left, root.right];
    let node1, node2;
    while (queue.length) {
        node1 = queue.shift();
        node2 = queue.shift();
        // 两节点均为空
        if (!node1 && !node2) continue;
        // 只要有一个节点是空，或者两个节点值不相等
        if (!node1 || !node2 || node1.val !== node2.val) return false;
        queue.push(node1.left);
        queue.push(node2.right);
        queue.push(node1.right);
        queue.push(node2.left);
    }
    return true;
};


/*()
给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例 1:

输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
示例 2:

输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false

*/

// DFS深度优先遍历就是直接递归比较，把 left 和 right 节点也视为一棵树。继续调用 isSameTree 方法。
var isSameTree = function (p, q) {
    // 两个递归结束条件：结构判断：要么两棵树都是空（true），要么一棵树有值另一棵树是空（false）
    if (!p && !q) return true;
    if ((p && !q) || (!p && q)) return false;

    // 进入递归条件：两棵树都有值（结构相同）的情况下 ---> 判断节点值是否相等
    if (isSameTree(p.left, q.left) && isSameTree(p.right, q.right)) {
        return p.val === q.val;
    } else {
        return false;
    }
};