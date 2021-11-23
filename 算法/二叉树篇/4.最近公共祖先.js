// 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出: 3
// 解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

// 树：https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/15/binarytree.png

// lowestCommonAncestor(root, p, q)表示root为根的树是不是有pq两个子节点
var lowestCommonAncestor = function (root, p, q) {
    // 递归结束条件1：root和左右子树其中一个相等，则代表root就在左子树或者右子树的上一级
    if (root == null || root == p || root == q) return root;
    // 深度遍历，向下递归, 看看左右子树是否有p、q
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    // 如果只有一边存在，则存在的这一边的返回值就是公共祖先节点
    if (left == null) {
        return right
    } else if (right == null) {
        return left
    } else {
        // 如果左边和右边都存在，则说明root就是最近的公共祖先节点。
        return root;
    }
};


/**
 *
     1
   /   \
  2     3
 / \
4   5

root=[1,2,3,4,5] p = 4, q = 3

root          p    q
[1,2,3,4,5]   4    3

left = fn([2], 4, 3)  -->  left = fn(4,4,3) = 4 (∵ root === p)                    --->  4
                           right= fn(5,4,3) --> left = fn(null,4,3)=null          ---> null
                                                right= fn(null,4,3)=null

right = fn([3],4,3) = 3

left和right都存在，所以返回root = 1

 */