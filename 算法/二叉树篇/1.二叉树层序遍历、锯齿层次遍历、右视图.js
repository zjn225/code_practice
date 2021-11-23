// 普通的层次遍历
// 给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。
// 3
// / \
// 9  20
// /  \
// 15   7

// [
//     [3],
//     [9,20],
//     [15,7]
//   ]

//  方式1 BFS 简洁
function levelOrder(root) {
    if (root == null) return [];
    let stack = [root], res = [];
    while (stack.length) {
        // 出栈
        // 相当于当前要取的
        let node = stack.shift();
        res.push(node.val);
        // 取值
        // 相当于是下次要取的
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    return res;
}

/**
 * stack = [3], 
 * node = 3, res = [3],   stack = [9,20]
 * node = 9, res = [3,9]  stack = [20,15]
 * node = 20 res = [3,9,20] stack = [15,7]
 * node = 15, res = [3,9,20,15]
 */

// 方式2 -（更可定制化）BFS
var levelOrder = function (root) {
    if (!root) return [];
    let stack = [root];
    let res = [];
    let level = 0;
    // 这个while是遍历每一层
    // 当再次走到这里while的时候，queue已经入栈了新的一层的元素了
    while (stack.length) {
        res.push([]); // 因为接下来要入栈，做兜底
        let size = stack.length; // 当前层的节点数量
        // 每次遍历当前层的每一个节点使其出队，并将下一层节点入队(这里的遍历是在queue.length的基础上遍历每一个)
        // 只有当前层的每一个遍历完了，即queue的值该出栈的都出完了，同时入了下一层的所有节点，才会走出while循环
        while (size--) {
            let node = stack.shift();  // 出队
            res[level].push(node.val);// 出队节点的子女入队，注意这里的left和right是指子树的单个节点，而不是整颗左子树
            if (node.left) stack.push(node.left); // 入队
            if (node.right) stack.push(node.right);
        }
        // 更新层级
        level++;
    }
    return res;
};

/**
 * stack = [3]
 * size = 1 
 *     node = 3, res[0] = [3]   stack = [9,20] size = 0此时while结束
 * size = 2
 *     node = 9, res[1] = [9]  stack = [20,15] size = 1
 *     node = 20, res[1] = [9, 20]  stack = [15,7] size = 0
 * size = 3
 *     res[2] = [15,7]
 * 
 * res = [[3], [9,20], [15,7]]
 */

// 给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）
var zigzagLevelOrder = function (root) {
    if (!root) return [];
    let queue = [root];
    let res = [];
    let level = 0;
    // 这个quque.length只是遍历每一层
    // 当再次走到这里while的时候，queue已经入栈了新的一层的元素了
    while (queue.length) {
        res.push([]); // 因为接下来要入栈，做兜底
        let size = queue.length; // 当前层的节点数量
        // 每次遍历当前层的每一个节点，并将下一层节点入队，这里的遍历是在length的基础上遍历每一个
        // 只有当前层的每一个遍历完了，即queue的值该出栈的都出完了，同时入了下一层的所有节点，才会走出while循环
        while (size--) {
            let front = queue.shift();  // 出队
            res[level].push(front.val);// 出队节点的子女入队，注意这里的left和right是指子树的单个节点，而不是整颗左子树
            if (front.left) queue.push(front.left); // 入队
            if (front.right) queue.push(front.right);
        }
        // 仅仅增加下面一行代码即可
        if (level % 2) res[level].reverse();
        level++; // 当前层级
    }
    return res;
};

// 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

// 输入: [1,2,3,null,5,null,4]
// 输出: [1, 3, 4]

// 用上面的方法取得数组res = [[3], [9,20], [15,7]]后，遍历取得每一列的最后一个值就行了

//    1            <---
//  /   \
// 2     3         <---
//  \     \
//   5     4       <---

var rightSideView = function (root) {
    if (!root) return [];
    let queue = [root];
    let res = [];
    while (queue.length) {
        res.push(queue[0].val);
        let size = queue.length;
        while (size--) {
            // 一个size的循环就是一层的遍历，在这一层只拿最右边的结点
            let front = queue.shift();
            if (front.right) queue.push(front.right); // 先让右边的入队，因为上面是shift
            if (front.left) queue.push(front.left);
        }
    }
    return res;
};