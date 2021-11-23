// 最大深度

// 1、递归 DFS
function maxDepth(root) {
    // 兜底判断，null节点，返回高度0，并不是递归结束条件！因为如果左右子树是null的话，直接就return 1那里拦截了
    if (root == null) {
        return 0;
    }
    // 递归结束条件：左右子树都不存在，而不是进入递归，所以直接返回1
    if (!root.left && !root.right) {
        return 1;
    }
    if (root.left || root.right) {
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}

// 2、非递归 BFS
// 思路和层序遍历基本一致，少了个res而已
let maxDepth = function (root) {
    if (root == null) return 0;
    // 记录二叉树（根节点，所有左右子树），其实就是记录的深度
    let queue = [root];
    let level = 0;
    // 这个while是遍历每一层
    // 当再次走到这里while的时候，queue已经入栈了新的元素了（同时上一层的也全都出队了）
    while (queue.length) {
        // 当前层的节点数量
        let size = queue.length;
        // 每次遍历当前层的每一个节点使其出队，并将下一层节点入队(这里的遍历是在queue.length的基础上遍历每一个)
        // 只有当前层的每一个遍历完了，即queue的值该出栈的都出完了，同时入了下一层的所有节点，才会走出while循环
        // 为什么是size--呢，因为每次shift后都有push，也就是queue是可能越来越多的，size--保证了刚好遍历完当前层的所有节点
        while (size--) {
            let node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        // 更新层级
        level++;
    }
    return level;
};

// 最小深度
// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。，注意是叶子节点。什么是叶子节点，左右孩子都为空的节点才是叶子节点！（包括根节点）

// 1、递归 DFS
const minDepth = (root) => {
    // 兜底判断，null节点，返回高度0，并不是递归结束条件！因为如果左右子树时null的话，直接就return 1那里拦截了
    if (root == null) {
        return 0;
    }
    // 递归结束条件：左右子树都不存在，而不是进入递归，所以直接返回1
    if (!root.left && !root.right) {
        return 1;
    }
    if (root.left && root.right) { // 左右子树都存在，当前节点的高度1+左右子树递归结果的较小值
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
        // 和最大深度相比，多了两个条件，比如两个子树进去，哪个子树先到叶子节点，自然就return了
    } else if (root.left) {        // 左子树存在，右子树不存在
        return 1 + minDepth(root.left);
    } else if (root.right) {       // 右子树存在，左子树不存在
        return 1 + minDepth(root.right);
    }
};

// 和最大深度递归的区别是：最小深度的递归条件不一样，其他没区别；
// 为什么多了这么多判断条件，如果按照求最大深度一样，会造成这个的问题：https://s3.ax1x.com/2020/12/27/rI22WD.png
// 就像上图的例子；所以如果不是同时有左右子树，就不能左右子树一起进入递归，否则最小深度就计算错了；
// 按上图例子，一开始只有右子树，就只能右子树进入递归


// 2、非递归 BFS，good！！！
let minDepth = function (root) {
    if (root == null) return 0;
    let queue = [root];
    let level = 0;
    while (queue.length) {
        let size = queue.length;
        while (size--) {
            let node = queue.shift();
            // 结束条件：找到叶子节点就立刻返回，与最大深度的唯一的区别
            if (!node.left && !node.right) return level + 1;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        // level ++ 后的值代表着现在已经处理完了几层节点
        level++;
    }
    return level;
};