// https://github.com/Alex660/Algorithms-and-data-structures/blob/master/demos/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E4%B8%89%E5%BA%8F%E9%81%8D%E5%8E%86.md

// https://s1.ax1x.com/2020/04/25/Jyy12R.png

// ---------------------------------------------------前序遍历（根 -> 左子树 -> 右子树）----------------------------------------------------

// 1、递归
var preorderTraversal = function (root) {
    let arr = [];
    let traverse = (root) => {
        if (root == null) return;
        arr.push(root.val);
        traverse(root.left);
        traverse(root.right);
    }
    traverse(root);
    return arr;
};

// 2、非递归
/*
     1
   /   \
  2     3
 / \
4   5

1-2-4-5-3
*/

var preorderTraversal = function (root) {
    let res = [];
    if (!root) {
        return res;
    }
    let stack = [root];
    while (stack.length > 0) {
        let curr = stack.pop();
        // 遇到根，直接入结果集
        res.push(curr.val);
        // 先入栈右边，这样后出栈
        if (curr.right) {
            stack.push(curr.right);
        }
        // 后入栈左边，这样先出栈左边 
        if (curr.left) {
            stack.push(curr.left);
        }
    }
    return res;
};

/* cur = 1, res=[1], stack=[3,2]
   cur = 2, res=[1,2] stack=[3] -> stack=[3,5,4]
   cur = 4, res=[1,2,4] stack=[3,5]->stack=[3,5]
   cur = 5, res=[1,2,4,5] stack=[3]
*/

// ---------------------------------------------------中序遍历（左子树 -> 根节点 -> 右子树）---------------------------------------------------

// 1、递归
var inorderTraversal = function (root) {
    let arr = [];
    let traverse = (root) => {
        if (root == null) return;
        traverse(root.left);
        arr.push(root.val);
        traverse(root.right);
    }
    traverse(root);
    return arr;
};

// 2、非递归
/*
     1
   /   \
  2     3
 / \
4   5

4->2->5->1->3
*/

var inorderTraversal = function (root) {
    let res = [];
    let stack = [];
    let curr = root
    while (curr != null || stack.length > 0) {
        // 遇到左子树就先暂存！
        if (curr) {
            stack.push(curr);
            curr = curr.left;
        } else {
            // 没有左子树了，开始出栈, 看右子树
            let node = stack.pop();
            res.push(node.val);
            curr = node.right;
        }
    }
    return res;
};

/**
 * cur = 1,
 * // 遇到左子树就先暂存！
 * stack = [1] cur = 2
 * stack = [1,2] cur = 4
 * stack = [1,2,4] cur = null
 * // 没有左子树了，开始出栈，看右子树
 * res = [4], cur = null
 * res = [4,2] cur = 5 stack = [1]
 * 又有cur了
 * stack = [1,5], cur = null
 * 又没cur了
 * res = [4,2,5], cur = null stack = [1]
 * res = [4,2,5,1], cur = 3
 * 又有cur了
 * stack = 3， cur = null
 * 又没cur了
 * res = [4,2,5,1,3], cur = null, stack = []
 */


// ---------------------------------------------------后序遍历（左子树 -> 右子树 -> 根节点）---------------------------------------------------

// 1、递归
var postorderTraversal = function (root) {
    let arr = [];
    let traverse = (root) => {
        if (root == null) return;
        traverse(root.left);
        traverse(root.right);
        arr.push(root.val);
    }
    traverse(root);
    return arr
};

/*
     1
   /   \
  2     3
 / \
4   5

4->5->2->3->1
*/

// 非递归；和前序遍历类似，这个是root在最后面；中序因为在中间，所以不能这样操作
var postorderTraversal = function (root) {
    let res = [];
    let stack = [root];
    if (!root) {
        return res;
    }
    while (stack.length > 0) {
        let node = stack.pop();
        res.unshift(node.val);
        if (node.left) {
            stack.push(node.left);
        }
        if (node.right) {
            stack.push(node.right);
        }
        // 所以最后顺序是右左根
    }
    return res;
};

// cur = 1, res = [1]  stack = [1] -> [2, 3]
// cur = 3, res = [3,1] stack = [2] -> [2]
// cur = 2, res = [2,3,1] stack = [] -> [4, 5]
// cur = 5, res = [5,2,3,1], stack=[4] -> [4]
// [4,5,2,3,1]